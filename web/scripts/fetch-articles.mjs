// Refreshes article metadata from each journal's own OAI-PMH endpoint.
//
// Every journal is queried independently at:
//   https://journals.panorama-sg.com/{journal}/oai
//
// The shared /index/oai endpoint is deliberately not used. A
// journal can fail or return malformed metadata without blocking the rest of
// the portfolio, and the homepage still has the last known good JSON payload.

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { containsRetractionMarker, isRetractedArticle } from '../src/lib/articleFilter.mjs';

const WEB_ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const JOURNALS_PATH = path.join(WEB_ROOT, 'src', 'data', 'journals.json');
const OUTPUT_PATH = path.join(WEB_ROOT, 'src', 'data', 'articles.json');
const JOURNAL_PLATFORM_ORIGIN = 'https://journals.panorama-sg.com';
// The corporate search catalogue needs the complete article metadata that the
// journal platforms expose, not only the three records shown on the homepage.
// OAI-PMH is still bounded defensively so a malformed endpoint cannot create
// an unbounded refresh; the bound is deliberately much larger than the normal
// OJS feed size.
const MAX_OAI_PAGES_PER_JOURNAL = 250;
const REQUEST_DELAY_MS = 250;
const REQUEST_TIMEOUT_MS = 30000;

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

function normalizeJournalPlatformUrl(value) {
  return String(value || '').replace(
    `${JOURNAL_PLATFORM_ORIGIN}/index.php/`,
    `${JOURNAL_PLATFORM_ORIGIN}/`,
  );
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^$()|[\]\\]/g, '\\$&');
}

function decodeXml(value) {
  return String(value || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&#([0-9]+);/g, (_, code) => String.fromCodePoint(parseInt(code, 10)))
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function stripMarkup(value) {
  return decodeXml(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function compactText(value, maxLength = 280) {
  const text = stripMarkup(value);
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + '…';
}

function extractBlocks(source, localName) {
  const tag = escapeRegExp(localName);
  const pattern = new RegExp(
    '<(?:[A-Za-z_][\\w.-]*:)?' + tag + '\\b[^>]*>[\\s\\S]*?<\\/(?:[A-Za-z_][\\w.-]*:)?' + tag + '\\s*>',
    'gi'
  );
  return String(source || '').match(pattern) || [];
}

function extractValues(source, localName) {
  const tag = escapeRegExp(localName);
  const pattern = new RegExp(
    '<(?:[A-Za-z_][\\w.-]*:)?' + tag + '\\b[^>]*>([\\s\\S]*?)<\\/(?:[A-Za-z_][\\w.-]*:)?' + tag + '\\s*>',
    'gi'
  );
  const values = [];
  let match;
  while ((match = pattern.exec(String(source || ''))) !== null) {
    const value = stripMarkup(match[1]);
    if (value) values.push(value);
  }
  return values;
}

function normalizeDate(value) {
  const match = String(value || '').match(/(\d{4})-(\d{2})-(\d{2})/);
  return match ? match[1] + '-' + match[2] + '-' + match[3] : '';
}

function loadJournals() {
  const data = readJson(JOURNALS_PATH);
  const journals = Array.isArray(data) ? data : data.journals || [];
  return journals
    .filter((journal) => journal.status !== 'retired' && journal.journalUrl)
    .map((journal) => {
      const journalUrl = normalizeJournalPlatformUrl(journal.journalUrl).replace(/\/$/, '');
      const slug = journal.slug || journal.id || journalUrl.split('/').pop();
      return {
        title: journal.title,
        slug,
        journalUrl,
        oaiUrl: journalUrl + '/oai',
      };
    });
}

function articleUrlFromIdentifiers(identifiers) {
  const articleUrl = identifiers.find((value) => (
    /^https?:\/\//i.test(value) && /\/article\/view\//i.test(value)
  ));
  if (articleUrl) return normalizeJournalPlatformUrl(articleUrl);
  return normalizeJournalPlatformUrl(identifiers.find((value) => /^https?:\/\//i.test(value)) || '');
}

function doiFromIdentifiers(identifiers) {
  const doiValue = identifiers.find((value) => /10\.\d{4,9}\//i.test(value));
  if (!doiValue) return '';
  const match = doiValue.match(/10\.\d{4,9}\/\S+/i);
  return match ? match[0].replace(/[.,;]+$/, '') : '';
}

function doiUrl(doi) {
  return doi ? 'https://doi.org/' + doi : '';
}

function parseOaiRecords(xml, journal) {
  const records = [];
  for (const block of extractBlocks(xml, 'record')) {
    const header = extractBlocks(block, 'header')[0] || '';
    if (/status\s*=\s*["']deleted["']/i.test(header)) continue;

    const metadata = extractBlocks(block, 'metadata')[0] || block;
    const titles = extractValues(metadata, 'title');
    const creators = extractValues(metadata, 'creator');
    const descriptions = extractValues(metadata, 'description');
    const dates = extractValues(metadata, 'date');
    const identifiers = extractValues(metadata, 'identifier');
    const relations = extractValues(metadata, 'relation');
    const subjects = extractValues(metadata, 'subject');
    const types = extractValues(metadata, 'type');
    const rights = extractValues(metadata, 'rights');
    const headerDate = extractValues(header, 'datestamp')[0] || '';
    const title = titles[0] || '';
    const markerFields = [
      ...titles,
      ...descriptions,
      ...subjects,
      ...types,
      ...relations,
      ...rights,
      ...extractValues(metadata, 'label'),
      ...extractValues(metadata, 'note'),
      ...extractValues(metadata, 'status'),
      ...extractValues(header, 'status'),
    ];
    if (markerFields.some(containsRetractionMarker)) continue;

    const sourceUrl = articleUrlFromIdentifiers(identifiers) || articleUrlFromIdentifiers(relations);
    const doi = doiFromIdentifiers(identifiers) || doiFromIdentifiers(relations);
    const url = doiUrl(doi) || sourceUrl;
    if (!title || !url) continue;

    records.push({
      id: doi || url,
      doi,
      title: compactText(title, 220),
      authors: creators.slice(0, 12),
      journal: journal.title,
      journalSlug: journal.slug,
      journalUrl: journal.journalUrl,
      publishedAt: normalizeDate(dates[0] || headerDate),
      // Prefer the journal platform's article landing page when OJS exposes
      // it. The DOI remains available separately for citation and fallback.
      url: sourceUrl || url,
      journalArticleUrl: sourceUrl,
      summary: compactText(descriptions.join(' ')) || 'Read the full article at the journal platform.',
    });
  }
  return records;
}

function resumptionTokenFrom(xml) {
  const token = extractValues(xml, 'resumptionToken')[0] || '';
  return token.trim();
}

async function fetchOaiRecords(journal) {
  let token = '';
  const records = [];
  for (let pageNumber = 0; pageNumber < MAX_OAI_PAGES_PER_JOURNAL; pageNumber += 1) {
    const endpoint = new URL(journal.oaiUrl);
    endpoint.searchParams.set('verb', 'ListRecords');
    if (token) {
      endpoint.searchParams.set('resumptionToken', token);
    } else {
      endpoint.searchParams.set('metadataPrefix', 'oai_dc');
    }

    const response = await fetch(endpoint, {
      headers: {
        Accept: 'application/xml,text/xml',
        'User-Agent': 'PanoramaSiteDataBot/1.0 (+https://panorama-sg.com)',
      },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    const xml = await response.text();
    if (!response.ok) throw new Error('HTTP ' + response.status);
    if (/<(?:\\w+:)?error\\b/i.test(xml)) {
      const code = xml.match(/code=["']([^"']+)["']/i);
      if (code && code[1] === 'noRecordsMatch') return records;
      throw new Error('OAI ' + (code ? code[1] : 'error'));
    }

    records.push(...parseOaiRecords(xml, journal));
    token = resumptionTokenFrom(xml);
    if (!token) break;
  }
  return records;
}

function sortAndLimit(records) {
  const today = new Date().toISOString().slice(0, 10);
  const byId = new Map();
  records
    .filter((record) => !isRetractedArticle(record))
    .filter((record) => !record.publishedAt || record.publishedAt <= today)
    .forEach((record) => byId.set(record.id, record));
  return Array.from(byId.values())
    .sort((a, b) => String(b.publishedAt || '').localeCompare(String(a.publishedAt || '')));
}

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function main() {
  const existingPayload = existsSync(OUTPUT_PATH) ? readJson(OUTPUT_PATH) : { articles: [] };
  const records = [];

  for (const journal of loadJournals()) {
    try {
      const items = await fetchOaiRecords(journal);
      console.log('[ok] ' + journal.slug.padEnd(16) + items.length + ' OAI article records');
      records.push(...items);
    } catch (error) {
      console.warn('[skip] ' + journal.slug.padEnd(16) + String(error.message || error).slice(0, 100));
    }
    await sleep(REQUEST_DELAY_MS);
  }

  const articles = sortAndLimit(records);
  if (articles.length === 0) {
    const fallbackArticles = Array.isArray(existingPayload.articles)
      ? existingPayload.articles
      : [];
    const cleanedFallback = sortAndLimit(fallbackArticles);
    const removedFallbackCount = fallbackArticles.filter(isRetractedArticle).length;

    if (removedFallbackCount > 0) {
      writeFileSync(
        OUTPUT_PATH,
        JSON.stringify({
          ...existingPayload,
          maxItems: null,
          articles: cleanedFallback,
        }, null, 2) + '\n',
        'utf-8',
      );
      console.log('Removed ' + removedFallbackCount + ' retracted article(s) from the fallback payload.');
    }

    console.warn('No articles harvested from journal-specific OAI feeds; keeping the existing payload.');
    if (cleanedFallback.length === 0) {
      console.warn('There is no article fallback payload yet.');
    }
    return;
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    source: 'Journal-specific OAI-PMH feeds (oai_dc)',
    maxItems: null,
    articles,
  };
  writeFileSync(OUTPUT_PATH, JSON.stringify(payload, null, 2) + '\n', 'utf-8');
  console.log('Wrote ' + articles.length + ' articles to ' + OUTPUT_PATH);
}

main().catch((error) => {
  console.error('Article refresh failed; existing payload left untouched:', error);
  process.exit(0);
});
