// Refreshes the normalized announcement feed used by the homepage.
//
// Sources:
//   1. Public announcements sections on the Research Institute and POSI sites.
//   2. The Panorama Scholarly Books notice banner.
//   3. Each journal's native OJS announcements, read over plain HTTP (Atom
//      feed first, then the announcement list HTML) and only falling back to
//      the headless browser when both are unavailable.
//
// The corporate site remains static and build-safe: this script runs in the
// weekly workflow and commits only the small normalized JSON payload.

import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
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
const MAX_ITEMS = 12;
const MAX_PER_SOURCE = 3;
const MAX_PER_JOURNAL = 5;
const NAV_TIMEOUT_MS = 30000;
const FETCH_TIMEOUT_MS = 20000;
const CHALLENGE_WAIT_MS = 15000;

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
  // Hash the whole URL: a prefix of its encoding is identical for every page
  // on the same host, which made distinct announcements overwrite each other.
  const suffix = createHash('sha1').update(detailUrl).digest('hex').slice(0, 12);
  return 'auto-' + sourceSlug + '-' + suffix;
}

function decodeEntities(value) {
  const named = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  return String(value || '').replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    if (entity[0] === '#') {
      const code = entity[1].toLowerCase() === 'x'
        ? parseInt(entity.slice(2), 16)
        : parseInt(entity.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    return named[entity.toLowerCase()] ?? match;
  });
}

function htmlToText(value) {
  return decodeEntities(String(value || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:!?)])/g, '$1')
    .trim();
}

function isChallengePage(title, body = '') {
  return /just a moment|attention required|checking your browser|cf-chl|challenge-platform/i
    .test(String(title) + ' ' + String(body).slice(0, 5000));
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'text/html,application/atom+xml,application/xml;q=0.9,*/*;q=0.8',
    },
    redirect: 'follow',
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
  const text = await response.text();
  if (isChallengePage('', text)) throw new Error('blocked by bot challenge (HTTP ' + response.status + ')');
  if (!response.ok) throw new Error('HTTP ' + response.status);
  return text;
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

  // A non-interactive Cloudflare check usually clears itself after a few
  // seconds; give it that chance before reading the DOM.
  if (isChallengePage(await page.title())) {
    try {
      await page.waitForFunction(
        () => !/just a moment|attention required|checking your browser/i.test(document.title),
        null,
        { timeout: CHALLENGE_WAIT_MS },
      );
      await page.waitForLoadState('domcontentloaded');
    } catch {
      // Still challenged; describePage() reports it when nothing is found.
    }
  }
}

async function describePage(page) {
  const title = await page.title().catch(() => '');
  const blocked = isChallengePage(title);
  return (blocked ? 'blocked by bot challenge, ' : '') + 'page title "' + compactText(title, 60) + '"';
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
  const results = items
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
  return { items: results, note: results.length ? '' : await describePage(page) };
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

  if (!item || !item.title) return { items: [], note: await describePage(page) };
  return { items: [{
    id: idFor('books', 'books', BOOKS_URL + '#notice-' + item.title),
    source: 'books',
    sourceLabel: 'Panorama Scholarly Books',
    type: 'Notice',
    title: compactText(item.title, 180),
    summary: compactText(item.summary || item.title),
    date: normalizeDate(item.raw),
    href: BOOKS_URL,
  }], note: '' };
}

function journalItem(journal, item) {
  return {
    id: idFor('journals', journal.slug, item.href),
    source: 'journals',
    sourceLabel: journal.title,
    type: classifyType(item.title),
    title: compactText(item.title, 180),
    summary: compactText(item.summary || item.title),
    date: normalizeDate(item.date),
    href: item.href,
  };
}

// OJS AnnouncementFeedGatewayPlugin. Carries full text and dates, so no
// per-announcement requests are needed.
async function fetchJournalFeed(journal) {
  const base = journal.journalUrl.replace(/\/$/, '');
  const xml = await fetchText(base + '/gateway/plugin/AnnouncementFeedGatewayPlugin/atom');
  if (!/<feed[\s>]/i.test(xml)) throw new Error('announcement feed is not Atom');

  const tag = (entry, name) => {
    const match = entry.match(new RegExp('<' + name + '\\b[^>]*>([\\s\\S]*?)</' + name + '>', 'i'));
    return match ? match[1] : '';
  };
  const entries = xml.match(/<entry\b[\s\S]*?<\/entry>/gi) || [];
  return entries.map((entry) => {
    const link = entry.match(/<link\b[^>]*rel=["']alternate["'][^>]*>/i)
      || entry.match(/<link\b[^>]*>/i);
    const href = link ? decodeEntities((link[0].match(/href=["']([^"']+)["']/i) || [])[1] || '') : '';
    return {
      title: htmlToText(decodeEntities(tag(entry, 'title'))),
      href: href ? new URL(href, base + '/').href : '',
      date: tag(entry, 'published') || tag(entry, 'updated'),
      summary: htmlToText(decodeEntities(tag(entry, 'content') || tag(entry, 'summary'))),
    };
  }).filter((item) => item.title && item.href);
}

// The announcement list page, parsed without a browser. Tolerates both the
// default and Bootstrap-based OJS themes.
async function fetchJournalListHtml(journal) {
  const listUrl = journal.journalUrl.replace(/\/$/, '') + '/announcement';
  const html = await fetchText(listUrl);
  // Each summary runs until the next one starts (or the list ends), which
  // avoids having to balance nested <div>s with a regular expression.
  const opener = /<(?:article|div|li)\b[^>]*class=["'][^"']*announcement[_-]summary[^"']*["'][^>]*>/gi;
  const starts = Array.from(html.matchAll(opener), (match) => match.index);
  const blocks = starts.map((start, index) => {
    const end = starts[index + 1] ?? start + 6000;
    const chunk = html.slice(start, end);
    const listEnd = chunk.search(/<\/(?:section|main|ul|ol)>|class=["'][^"']*(?:cmp_pagination|pagination)/i);
    return listEnd > 0 ? chunk.slice(0, listEnd) : chunk;
  });

  return blocks.map((block) => {
    const heading = block.match(/<h[2-4]\b[^>]*>([\s\S]*?)<\/h[2-4]>/i);
    const anchor = (heading ? heading[1] : block).match(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
    if (!anchor) return null;
    const title = htmlToText(anchor[2]);
    const text = htmlToText(block);
    const summaryHtml = block.match(/<(div|p)\b[^>]*class=["'](?:[^"']*\s)?(summary|description)(?:\s[^"']*)?["'][^>]*>([\s\S]*?)<\/\1>/i);
    const summary = summaryHtml
      ? htmlToText(summaryHtml[3])
      : htmlToText(block
        .replace(/<h[2-4]\b[\s\S]*?<\/h[2-4]>/i, ' ')
        .replace(/<(\w+)\b[^>]*class=["'][^"']*\bdate\b[^"']*["'][^>]*>[\s\S]*?<\/\1>/gi, ' ')
        .replace(/<a\b[^>]*class=["'][^"']*read[_-]?more[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, ' '));
    return {
      title,
      href: new URL(decodeEntities(anchor[1]), listUrl).href,
      date: text,
      summary: summary.replace(/\s*read more\s*$/i, ''),
    };
  }).filter((item) => item && item.title && item.href);
}

async function scrapeJournal(page, journal) {
  const notes = [];

  try {
    const items = await fetchJournalFeed(journal);
    if (items.length) {
      return { items: items.slice(0, MAX_PER_JOURNAL).map((item) => journalItem(journal, item)), note: 'atom feed' };
    }
    notes.push('feed empty');
  } catch (error) {
    notes.push('feed: ' + String(error.message || error).slice(0, 60));
  }

  try {
    const items = await fetchJournalListHtml(journal);
    if (items.length) {
      return { items: items.slice(0, MAX_PER_JOURNAL).map((item) => journalItem(journal, item)), note: 'list html' };
    }
    notes.push('list html empty');
  } catch (error) {
    notes.push('list html: ' + String(error.message || error).slice(0, 60));
  }

  const browserResult = await scrapeJournalInBrowser(page, journal);
  if (!browserResult.items.length) browserResult.note = notes.concat(browserResult.note).join('; ');
  return browserResult;
}

async function scrapeJournalInBrowser(page, journal) {
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
  if (!summaries.length) return { items: [], note: 'browser: ' + await describePage(page) };

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

    results.push({ ...journalItem(journal, { ...item, summary }), date });
  }
  return { items: results, note: 'browser' };
}

// Journals share one `source`, so each journal is its own feed for merging.
function feedKey(item) {
  return item.source === 'journals' ? 'journals:' + item.sourceLabel : item.source;
}

function mergeAndLimit(existing, fetched) {
  // A feed that returned nothing this run (blocked, down, or empty) keeps
  // what it had before instead of silently dropping off the site.
  const refreshedFeeds = new Set(fetched.map(feedKey));
  const carriedOver = existing.filter((item) => item.fallback || !refreshedFeeds.has(feedKey(item)));
  const byId = new Map();
  [...carriedOver, ...fetched].forEach((item) => byId.set(item.id, item));

  const perFeed = new Map();
  return Array.from(byId.values())
    .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
    .filter((item) => {
      if (item.fallback) return true;
      const count = perFeed.get(feedKey(item)) || 0;
      perFeed.set(feedKey(item), count + 1);
      return count < MAX_PER_SOURCE;
    })
    .slice(0, MAX_ITEMS);
}

function logResult(label, result) {
  const line = '[ok] ' + label.padEnd(16) + String(result.items.length).padStart(2) + ' announcements';
  const message = result.note ? line + '  (' + result.note + ')' : line;
  if (result.items.length) console.log(message);
  else console.warn(message.replace('[ok]', '[--]'));
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
        const result = await scrapeLinkedPlatform(page, platform);
        logResult(platform.source, result);
        fetched.push(...result.items);
      } catch (error) {
        console.warn('[skip] ' + platform.source.padEnd(16) + String(error.message || error).slice(0, 100));
      }
    }

    try {
      const result = await scrapeBooksNotice(page);
      logResult('books', result);
      fetched.push(...result.items);
    } catch (error) {
      console.warn('[skip] books ' + String(error.message || error).slice(0, 100));
    }

    for (const journal of loadJournals()) {
      try {
        const result = await scrapeJournal(page, journal);
        logResult(journal.slug, result);
        fetched.push(...result.items);
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
