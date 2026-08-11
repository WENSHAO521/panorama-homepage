// Refreshes each journal's `description` field in data/journals.json by
// scraping the short editorial blurb from its own OJS homepage hero banner
// (`<p class="jc-hero-desc">`), which is what the journal's own theme
// displays as its self-description. journals.panorama-sg.com sits behind a
// Cloudflare JS challenge, so this uses a real headless browser via
// Playwright (matching fetch_announcements.mjs) rather than plain HTTP.
//
// The hero blurb is regex-extracted straight from the page's HTML source
// rather than read off the live DOM, because on some journals the jQuery
// snippet that injects the `#jc-hero` section into the page doesn't run
// (no console error either -- the markup just sits inert as a template
// string inside an inline <script>), even though the text itself is
// present in the response either way.
//
// Replaces scripts/fetch-journal-descriptions.ps1, which used
// Invoke-WebRequest (blocked by Cloudflare on every run -- explains why
// several journals were stuck with an empty description) and hard-cut
// results at 520 characters regardless of word boundaries (explains the
// mid-word "...communicat..." truncation some descriptions had).

import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT_DIR = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const JOURNALS_PATH = path.join(ROOT_DIR, 'data', 'journals.json');

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const NAV_TIMEOUT_MS = 30000;

// GPPGR's own OJS homepage currently ships the default, uncustomized OJS
// theme with no hero banner and a blank "About the Journal" page -- there
// is no editorial description to scrape yet. This one-off is written to
// match the house style of every other journal's own hero blurb, from the
// journal's title and its own indexing.html-adjacent category ("Policy").
// Replace with the real scraped text once GPPGR's site is populated.
const MANUAL_OVERRIDES = {
    GPPGR: 'Global Public Policy & Governance Review (GPPGR) is an international peer-reviewed journal dedicated to public policy analysis, governance, public administration, and comparative institutional research.',
};

function decodeEntities(text) {
    return text
        .replace(/&amp;/g, '&')
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function extractHeroDesc(html) {
    const m = html.match(/<p class="jc-hero-desc">([\s\S]*?)<\/p>/);
    if (!m) return '';
    const text = m[1].replace(/<[^>]+>/g, '').replace(/\$\{[^}]*\}/g, '');
    return decodeEntities(text);
}

function extractMetaDescription(html) {
    const m = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
        || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
    return m ? decodeEntities(m[1]) : '';
}

function loadJournals() {
    const data = JSON.parse(readFileSync(JOURNALS_PATH, 'utf-8'));
    return data;
}

async function fetchDescription(page, journal) {
    if (MANUAL_OVERRIDES[journal.id]) {
        return { description: MANUAL_OVERRIDES[journal.id], source: journal.journalUrl + ' (manual, no live content yet)' };
    }

    const url = journal.journalUrl;
    try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT_MS });
        const html = await page.content();
        const hero = extractHeroDesc(html);
        if (hero.length >= 60) return { description: hero, source: url };
        const meta = extractMetaDescription(html);
        if (meta.length >= 60) return { description: meta, source: url };
    } catch (e) {
        console.warn(`[skip] ${journal.id} homepage failed: ${String(e.message || e).slice(0, 120)}`);
    }
    return null;
}

async function main() {
    const payload = loadJournals();
    const browser = await chromium.launch();
    const page = await browser.newPage({ userAgent: USER_AGENT });

    let updated = 0;
    for (const journal of payload.journals) {
        const result = await fetchDescription(page, journal);
        if (result) {
            const changed = journal.description !== result.description;
            journal.description = result.description;
            journal.descriptionSource = result.source;
            if (changed) updated++;
            console.log(`[ok] ${journal.id.padEnd(8)} ${result.description.length} chars${changed ? ' (updated)' : ''}`);
        } else {
            console.warn(`[keep] ${journal.id.padEnd(8)} no usable description found, keeping existing value`);
        }
    }

    await browser.close();

    payload.harvestedAt = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
    payload.source = "Panorama journal home pages (hero banner blurb)";
    writeFileSync(JOURNALS_PATH, JSON.stringify(payload, null, 4) + '\n', 'utf-8');
    console.log(`Wrote ${payload.journals.length} journal records (${updated} descriptions changed) to ${JOURNALS_PATH}`);
}

main().catch((e) => {
    console.error('Journal description refresh failed, existing data/journals.json left untouched:', e);
    process.exit(0);
});
