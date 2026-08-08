// Refreshes data/announcements.json with entries scraped from each
// journal's native OJS "Announcements" page (journals.panorama-sg.com
// puts every journal behind a Cloudflare JS challenge that a plain HTTP
// request can't pass, so this uses a real headless browser via
// Playwright, matching what a real visitor's browser would render).
//
// Auto-fetched entries only carry the announcement's original posting
// language (stored under the "en" key, which is also the fallback key
// the homepage's render logic already uses) -- no machine translation.
// Hand-written multilingual entries already in data/announcements.json
// are preserved: this script only adds/updates entries whose id starts
// with "auto-", it never touches anything else.

import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT_DIR = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const JOURNALS_PATH = path.join(ROOT_DIR, 'data', 'journals.json');
const OUTPUT_PATH = path.join(ROOT_DIR, 'data', 'announcements.json');

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const MAX_PER_JOURNAL = 5;
const NAV_TIMEOUT_MS = 30000;

function loadJournals() {
    const data = JSON.parse(readFileSync(JOURNALS_PATH, 'utf-8'));
    return data.journals.map((j) => ({
        title: j.title,
        slug: j.slug || j.journalUrl.replace(/\/$/, '').split('/').pop(),
        journalUrl: j.journalUrl,
    }));
}

function classifyType(title) {
    const t = title.toLowerCase();
    if (t.includes('call for papers') || t.includes('call for submissions')) return 'call-for-papers';
    if (t.includes('launch')) return 'news';
    return 'notice';
}

function idFor(slug, detailUrl) {
    const m = detailUrl.match(/\/announcement\/view\/(\d+)/);
    const suffix = m ? m[1] : Buffer.from(detailUrl).toString('base64url').slice(0, 10);
    return `auto-${slug.toLowerCase()}-${suffix}`;
}

async function scrapeJournal(page, journal) {
    const listUrl = `${journal.journalUrl.replace(/\/$/, '')}/announcement`;
    await page.goto(listUrl, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT_MS });

    const summaries = await page.evaluate(() => {
        const items = Array.from(document.querySelectorAll('.announcements > article.announcement-summary'));
        return items.map((el) => {
            const link = el.querySelector('h2.media-heading a');
            const dateEl = el.querySelector('p.date');
            const bodyEl = el.querySelector('.media-body > p:not(.date)');
            return {
                title: (link && link.textContent || '').trim(),
                href: link ? link.href : '',
                date: (dateEl && dateEl.textContent || '').replace(/\s+/g, ' ').trim(),
                summary: (bodyEl && bodyEl.textContent || '').trim(),
            };
        }).filter((it) => it.title && it.href);
    });

    const results = [];
    for (const item of summaries.slice(0, MAX_PER_JOURNAL)) {
        let body = item.summary;
        let isoDate = normalizeListDate(item.date);
        try {
            await page.goto(item.href, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT_MS });
            const detail = await page.evaluate(() => {
                const desc = document.querySelector('.announcement-full .description');
                const dateEl = document.querySelector('.announcement-full small.date');
                const paragraphs = desc
                    ? Array.from(desc.querySelectorAll('p')).map((p) => p.textContent.trim()).filter(Boolean)
                    : [];
                return {
                    text: paragraphs.length ? paragraphs.join('\n\n') : (desc ? desc.textContent.trim() : ''),
                    postedRaw: (dateEl && dateEl.textContent || '').trim(),
                };
            });
            if (detail.text) body = detail.text;
            const detailIso = normalizePostedDate(detail.postedRaw);
            if (detailIso) isoDate = detailIso;
        } catch (e) {
            // Detail page failed to load; fall back to the list-page summary/date already captured.
        }

        results.push({
            id: idFor(journal.slug, item.href),
            date: isoDate,
            type: classifyType(item.title),
            pinned: false,
            title: { en: item.title },
            body: { en: body },
            link: item.href,
        });
    }
    return results;
}

function normalizeListDate(raw) {
    const m = raw.match(/(\d{4})-(\d{2})-(\d{2})/);
    return m ? `${m[1]}-${m[2]}-${m[3]}` : '';
}

function normalizePostedDate(raw) {
    // "Posted on 2026-05-04 05:57:01"
    const m = raw.match(/(\d{4})-(\d{2})-(\d{2})/);
    return m ? `${m[1]}-${m[2]}-${m[3]}` : '';
}

function mergeAnnouncements(existing, fetched) {
    const byId = new Map();
    for (const a of existing) byId.set(a.id, a);
    for (const a of fetched) byId.set(a.id, a);

    const merged = Array.from(byId.values());
    merged.sort((a, b) => {
        if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
        return (b.date || '').localeCompare(a.date || '');
    });
    return merged;
}

async function main() {
    const journals = loadJournals();
    const existingPayload = JSON.parse(readFileSync(OUTPUT_PATH, 'utf-8'));
    const existing = existingPayload.announcements || [];

    const browser = await chromium.launch();
    const page = await browser.newPage({ userAgent: USER_AGENT });

    const fetched = [];
    for (const journal of journals) {
        try {
            const items = await scrapeJournal(page, journal);
            console.log(`[ok] ${journal.slug.padEnd(12)} ${items.length} announcements`);
            fetched.push(...items);
        } catch (e) {
            console.warn(`[skip] ${journal.slug.padEnd(12)} failed: ${String(e.message || e).slice(0, 100)}`);
        }
    }

    await browser.close();

    if (fetched.length === 0) {
        console.warn('No announcements harvested; leaving existing data/announcements.json untouched.');
        return;
    }

    const merged = mergeAnnouncements(existing, fetched);
    const payload = { announcements: merged };
    writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2) + '\n', 'utf-8');
    console.log(`Wrote ${merged.length} total announcements (${fetched.length} auto-fetched this run) to ${OUTPUT_PATH}`);
}

main().catch((e) => {
    console.error('Announcement refresh failed, existing data/announcements.json left untouched:', e);
    process.exit(0);
});
