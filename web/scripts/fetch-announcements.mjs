// Refreshes the normalized announcement feed used by the homepage.
//
// Sources:
//   1. Public announcements sections on the Research Institute and POSI sites.
//   2. The Panorama Scholarly Books notice banner.
//   3. Each journal's native OJS announcements page.
//
// The corporate site remains static and build-safe: this script runs in the
// weekly workflow and commits only the small normalized JSON payload.

import { chromium } from 'playwright';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const WEB_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const JOURNALS_PATH = path.join(WEB_ROOT, 'src', 'data', 'journals.json');
const OUTPUT_PATH = path.join(WEB_ROOT, 'src', 'data', 'announcements.json');
const RESEARCH_URL = 'https://research.panorama-sg.com/';
const POSI_URL = 'https://posi.panorama-sg.com/';
const BOOKS_URL = 'https://books.panorama-sg.com/';
const USER_AGENT = 'Mozilla/5.0 (compatible; PanoramaSiteDataBot/1.0; +https://panorama-sg.com)';
const MAX_ITEMS = 5;
const MAX_PER_JOURNAL = 5;
const NAV_TIMEOUT_MS = 30000;

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

function compactText(value, maxLength = 260) {
  const text = String(value || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

function normalizeDate(raw) {
  const value = String(raw || '');
  const isoMatch = value.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) return isoMatch[1] + '-' + isoMatch[2] + '-' + isoMatch[3];

  const monthNames = {
    january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
    july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
  };
  const longMatch = value.match(/(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{4})/i);
  if (!longMatch) return '';
  const month = monthNames[longMatch[2].toLowerCase()];
  return longMatch[3] + '-' + String(month).padStart(2, '0') + '-' + String(longMatch[1]).padStart(2, '0');
}

function classifyType(title) {
  const value = String(title || '').toLowerCase();
  if (value.includes('call for paper') || value.includes('call for submission')) {
    return 'Call for papers';
  }
  if (value.includes('recruit')) return 'Recruitment';
  if (value.includes('launch') || value.includes('open')) return 'Notice';
  return 'Update';
}

function idFor(source, slug, detailUrl) {
  const parsed = new URL(detailUrl);
  const announcementId = parsed.pathname.match(/\/announcement\/view\/(\d+)/);
  if (announcementId) return 'auto-' + slug.toLowerCase() + '-' + announcementId[1];
  const sourceSlug = source + '-' + slug.toLowerCase();
  const suffix = Buffer.from(detailUrl).toString('base64url').slice(0, 12);
  return 'auto-' + sourceSlug + '-' + suffix;
}

function loadJournals() {
  const data = readJson(JOURNALS_PATH);
  const journals = Array.isArray(data) ? data : data.journals || [];
  return journals
    .filter((journal) => journal.status !== 'retired' && journal.journalUrl)
    .map((journal) => ({
      title: journal.title,
      slug: journal.slug || journal.id || journal.journalUrl.replace(/\/$/, '').split('/').pop(),
      journalUrl: journal.journalUrl,
    }));
}

async function waitForRenderedPage(page) {
  try {
    await page.waitForLoadState('networkidle', { timeout: 8000 });
  } catch {
    // Cloudflare and third-party requests can keep the network busy. The DOM
    // is still useful after the initial document has loaded.
  }
}

async function scrapeLinkedPlatform(page, platform) {
  await page.goto(platform.url, {
    waitUntil: 'domcontentloaded',
    timeout: NAV_TIMEOUT_MS,
  });
  await waitForRenderedPage(page);

  const items = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href*="/announcements/"]'));
    return anchors.map((link) => {
      let card = link;
      for (let depth = 0; depth < 6 && card; depth += 1) {
        const text = (card.textContent || '').replace(/\s+/g, ' ').trim();
        const heading = card.querySelector('h1, h2, h3, h4, h5');
        if (heading && /\d{4}-\d{2}-\d{2}/.test(text)) break;
        card = card.parentElement;
      }

      const root = card || link.parentElement || link;
      const headingText = Array.from(root.querySelectorAll('h1, h2, h3, h4, h5'))
        .map((node) => (node.textContent || '').replace(/\s+/g, ' ').trim())
        .find((value) => value && !/^(announcements|all announcements)$/i.test(value));
      const rawText = (root.textContent || '').replace(/\s+/g, ' ').trim();
      const paragraphs = Array.from(root.querySelectorAll('p'))
        .map((node) => (node.textContent || '').replace(/\s+/g, ' ').trim())
        .filter((value) => value && !/read more|all announcements/i.test(value));
      const title = headingText || (link.textContent || '').replace(/\s+/g, ' ').trim();
      const summary = paragraphs.find((value) => value !== title) || '';

      return {
        title,
        href: link.href,
        date: (rawText.match(/\d{4}-\d{2}-\d{2}/) || [''])[0],
        summary,
      };
    }).filter((item) => (
      item.title &&
      item.href &&
      !/^(read more|all announcements)$/i.test(item.title) &&
      item.date
    ));
  });

  const seen = new Set();
  return items
    .filter((item) => {
      if (seen.has(item.href)) return false;
      seen.add(item.href);
      return true;
    })
    .map((item) => ({
      id: idFor(platform.source, platform.source, item.href),
      source: platform.source,
      sourceLabel: platform.sourceLabel,
      type: classifyType(item.title),
      title: compactText(item.title, 180),
      summary: compactText(item.summary || item.title),
      date: normalizeDate(item.date),
      href: item.href,
  }));
}

async function scrapeBooksNotice(page) {
  await page.goto(BOOKS_URL, {
    waitUntil: 'domcontentloaded',
    timeout: NAV_TIMEOUT_MS,
  });
  await waitForRenderedPage(page);

  const item = await page.evaluate(() => {
    const lines = (document.body.innerText || '')
      .split(/\r?\n/)
      .map((line) => line.replace(/\s+/g, ' ').trim())
      .filter(Boolean);
    const index = lines.findIndex((line) => /^Notice\s*[—-]/i.test(line));
    if (index < 0) return null;
    return {
      title: lines[index].replace(/^Notice\s*[—-]\s*/i, ''),
      summary: lines.slice(index + 1, index + 3).join(' '),
      raw: lines.slice(index, index + 3).join(' '),
    };
  });

  if (!item || !item.title) return [];
  return [{
    id: idFor('books', 'books', BOOKS_URL + '#notice-' + item.title),
    source: 'books',
    sourceLabel: 'Panorama Scholarly Books',
    type: 'Notice',
    title: compactText(item.title, 180),
    summary: compactText(item.summary || item.title),
    date: normalizeDate(item.raw),
    href: BOOKS_URL,
  }];
}

async function scrapeJournal(page, journal) {
  const listUrl = journal.journalUrl.replace(/\/$/, '') + '/announcement';
  await page.goto(listUrl, {
    waitUntil: 'domcontentloaded',
    timeout: NAV_TIMEOUT_MS,
  });
  await waitForRenderedPage(page);

  const summaries = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('.announcements > article.announcement-summary'));
    return items.map((element) => {
      const link = element.querySelector('h2.media-heading a');
      const dateElement = element.querySelector('p.date');
      const bodyElement = element.querySelector('.media-body > p:not(.date)');
      return {
        title: link ? (link.textContent || '').replace(/\s+/g, ' ').trim() : '',
        href: link ? link.href : '',
        date: dateElement ? (dateElement.textContent || '').replace(/\s+/g, ' ').trim() : '',
        summary: bodyElement ? (bodyElement.textContent || '').replace(/\s+/g, ' ').trim() : '',
      };
    }).filter((item) => item.title && item.href);
  });

  const results = [];
  for (const item of summaries.slice(0, MAX_PER_JOURNAL)) {
    let summary = item.summary;
    let date = normalizeDate(item.date);

    try {
      await page.goto(item.href, {
        waitUntil: 'domcontentloaded',
        timeout: NAV_TIMEOUT_MS,
      });
      await waitForRenderedPage(page);
      const detail = await page.evaluate(() => {
        const description = document.querySelector('.announcement-full .description');
        const dateElement = document.querySelector('.announcement-full small.date');
        const paragraphs = description
          ? Array.from(description.querySelectorAll('p'))
            .map((node) => (node.textContent || '').replace(/\s+/g, ' ').trim())
            .filter(Boolean)
          : [];
        return {
          summary: paragraphs.join(' ') || (description ? description.textContent || '' : ''),
          date: dateElement ? dateElement.textContent || '' : '',
        };
      });
      if (detail.summary) summary = detail.summary;
      date = normalizeDate(detail.date) || date;
    } catch {
      // The list-page summary/date still gives us a useful announcement.
    }

    results.push({
      id: idFor('journals', journal.slug, item.href),
      source: 'journals',
      sourceLabel: journal.title,
      type: classifyType(item.title),
      title: compactText(item.title, 180),
      summary: compactText(summary || item.title),
      date,
      href: item.href,
    });
  }
  return results;
}

function mergeAndLimit(existing, fetched) {
  const successfulSources = new Set(fetched.map((item) => item.source));
  const sourceFallbacks = existing.filter((item) => (
    item.fallback && !successfulSources.has(item.source)
  ));
  const byId = new Map();
  [...sourceFallbacks, ...fetched].forEach((item) => byId.set(item.id, item));

  return Array.from(byId.values())
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
    .slice(0, MAX_ITEMS);
}

async function main() {
  const existingPayload = existsSync(OUTPUT_PATH) ? readJson(OUTPUT_PATH) : { announcements: [] };
  const existing = existingPayload.announcements || [];
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ userAgent: USER_AGENT });
  const fetched = [];

  try {
    const linkedPlatforms = [
      {
        url: RESEARCH_URL,
        source: 'research',
        sourceLabel: 'Panorama Research Institute',
      },
      {
        url: POSI_URL,
        source: 'posi',
        sourceLabel: 'POSI — Panorama Open Scholarly Index',
      },
    ];

    for (const platform of linkedPlatforms) {
      try {
        const items = await scrapeLinkedPlatform(page, platform);
        console.log('[ok] ' + platform.source.padEnd(16) + items.length + ' announcements');
        fetched.push(...items);
      } catch (error) {
        console.warn('[skip] ' + platform.source.padEnd(16) + String(error.message || error).slice(0, 100));
      }
    }

    try {
      const items = await scrapeBooksNotice(page);
      console.log('[ok] books'.padEnd(20) + items.length + ' announcements');
      fetched.push(...items);
    } catch (error) {
      console.warn('[skip] books ' + String(error.message || error).slice(0, 100));
    }

    for (const journal of loadJournals()) {
      try {
        const items = await scrapeJournal(page, journal);
        console.log('[ok] ' + journal.slug.padEnd(16) + items.length + ' announcements');
        fetched.push(...items);
      } catch (error) {
        console.warn('[skip] ' + journal.slug.padEnd(16) + String(error.message || error).slice(0, 100));
      }
    }
  } finally {
    await browser.close();
  }

  if (fetched.length === 0) {
    console.warn('No announcements harvested; keeping the existing payload.');
    return;
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    maxItems: MAX_ITEMS,
    announcements: mergeAndLimit(existing, fetched),
  };
  writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2) + '\n', 'utf-8');
  console.log('Wrote ' + payload.announcements.length + ' announcements to ' + OUTPUT_PATH);
}

main().catch((error) => {
  console.error('Announcement refresh failed; existing payload left untouched:', error);
  process.exit(0);
});
