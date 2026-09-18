// Static site search (project brief §37/§39). Fetches the build-time
// search-index.json once, ranks entirely client-side, and keeps the
// URL's `?q=` in sync via history.replaceState so results are
// shareable/reload-safe without a full navigation per keystroke.
// Isolated from scripts/nav-behavior.ts on purpose (project brief §48) --
// unrelated concerns, unrelated lifecycles.
import type { SearchRecord } from '@/pages/search-index.json';
import type { SearchClientCopy } from '@/i18n/utility';

const TYPE_ORDER: SearchRecord['type'][] = ['article', 'journal', 'announcement', 'imprint', 'page'];
const RESULTS_PER_PAGE = 40;

const FALLBACK_COPY: SearchClientCopy = {
  typeLabels: { article: 'Article', announcement: 'Announcement', journal: 'Journal', imprint: 'Imprint', page: 'Page' },
  initialStatus: 'Search the group catalogue to begin.',
  searchingStatus: 'Searching the group catalogue…',
  unavailableStatus: 'Search is temporarily unavailable.',
  loadFailure: 'We could not load the catalogue right now. Please try again shortly.',
  noResults: 'No results found for “{query}”.',
  try: 'Try',
  or: 'or',
  browseJournals: 'browsing journals',
  exploreImprints: 'exploring imprints',
  resultsSummary: '{count} results for “{query}”',
  resultsPageSummary: '{base}. Page {page} of {pages}.',
  paginationLabel: 'Search results pages',
  previousPage: 'Previous',
  nextPage: 'Next',
  pageStatus: 'Page {page} of {pages}',
  resultCountSingular: '{count} result',
  resultCountPlural: '{count} results',
  opensNewTab: 'opens in a new tab',
};

function escapeHtml(value: string): string {
  const span = document.createElement('span');
  span.textContent = value;
  return span.innerHTML;
}

function queryTerms(query: string): string[] {
  return query
    .toLowerCase()
    .split(/\s+/)
    .map((term) => term.trim())
    .filter(Boolean);
}

function score(record: SearchRecord, query: string): number {
  const q = query.toLowerCase().trim();
  const terms = queryTerms(q);
  const title = record.title.toLowerCase();
  const keywords = record.keywords.map((keyword) => keyword.toLowerCase());
  const description = record.description.toLowerCase();
  const content = (record.content ?? '').toLowerCase();
  const searchable = [title, description, content, ...keywords].join(' ');
  if (!terms.every((term) => searchable.includes(term))) return 0;

  let value = 10;
  if (title === q) value += 100;
  else if (title.startsWith(q)) value += 80;
  else if (title.includes(q)) value += 60;

  value += terms.reduce((total, term) => {
    if (title.includes(term)) return total + 20;
    if (keywords.some((keyword) => keyword.includes(term))) return total + 12;
    if (description.includes(term)) return total + 4;
    return total;
  }, 0);

  return value;
}

function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));
}

function localizeInternalUrl(url: string, locale: string): string {
  if (locale === 'en' || !url.startsWith('/') || url.startsWith('//')) return url;
  const prefix = `/${locale}`;
  if (url === prefix || url.startsWith(`${prefix}/`)) return url;
  return `${prefix}${url}`;
}

async function main() {
  const form = document.querySelector<HTMLFormElement>('[data-search-form]');
  const input = document.querySelector<HTMLInputElement>('[data-search-input]');
  const resultsElement = document.querySelector<HTMLElement>('[data-search-results]');
  const statusElement = document.querySelector<HTMLElement>('[data-search-status]');
  const emptyElement = document.querySelector<HTMLElement>('[data-search-empty]');
  const paginationElement = document.querySelector<HTMLElement>('[data-search-pagination]');
  const previousPageButton = document.querySelector<HTMLButtonElement>('[data-search-previous]');
  const nextPageButton = document.querySelector<HTMLButtonElement>('[data-search-next]');
  const pageStatusElement = document.querySelector<HTMLElement>('[data-search-page-status]');
  if (!form || !input || !resultsElement || !statusElement || !emptyElement) return;

  const searchPage = document.querySelector<HTMLElement>('[data-search-locale]');
  const locale = searchPage?.dataset.searchLocale ?? (document.documentElement.lang.toLowerCase() || 'en');
  let copy = FALLBACK_COPY;
  const rawCopy = searchPage?.dataset.searchCopy;
  if (rawCopy) {
    try {
      copy = { ...FALLBACK_COPY, ...JSON.parse(rawCopy) } as SearchClientCopy;
    } catch {
      copy = FALLBACK_COPY;
    }
  }

  // Keep stable, non-null references for the nested render helpers. TypeScript
  // cannot preserve the outer guard's narrowing through those closures.
  const results = resultsElement;
  const status = statusElement;
  const empty = emptyElement;

  let index: SearchRecord[] | null = null;
  let searchSequence = 0;
  let rankedResults: Array<{ record: SearchRecord; s: number }> = [];
  let activeQuery = '';
  let activePage = 1;
  let totalPages = 0;

  function hidePagination() {
    if (paginationElement) paginationElement.hidden = true;
    if (previousPageButton) previousPageButton.disabled = true;
    if (nextPageButton) nextPageButton.disabled = true;
    if (pageStatusElement) pageStatusElement.textContent = '';
  }

  function updatePageUrl(page: number) {
    const url = new URL(window.location.href);
    if (page > 1) url.searchParams.set('page', String(page));
    else url.searchParams.delete('page');
    window.history.replaceState({}, '', url);
  }

  async function loadIndex(): Promise<SearchRecord[]> {
    if (index) return index;
    const res = await fetch('/search-index.json');
    index = ((await res.json()) as SearchRecord[]).filter((record) => (
      !record.locale || record.locale === locale
    ));
    return index;
  }

  function renderEmptyNoQuery() {
    rankedResults = [];
    activeQuery = '';
    activePage = 1;
    totalPages = 0;
    hidePagination();
    results.innerHTML = '';
    empty.hidden = false;
    status.textContent = copy.initialStatus;
  }

  function renderNoResults(query: string) {
    rankedResults = [];
    activeQuery = '';
    activePage = 1;
    totalPages = 0;
    hidePagination();
    results.innerHTML = '';
    empty.hidden = true;
    status.textContent = copy.noResults.replace('{query}', query);
    results.innerHTML = `
      <p class="search-no-results">
        ${interpolate(copy.noResults, { query: escapeHtml(query) })} ${copy.try} <a href="${localizeInternalUrl('/journals/', locale)}">${copy.browseJournals}</a> ${copy.or} <a href="${localizeInternalUrl('/imprints/', locale)}">${copy.exploreImprints}</a>.
      </p>`;
  }

  function renderResults(records: Array<{ record: SearchRecord; s: number }>, query: string, requestedPage: number) {
    const total = records.length;
    const pages = Math.max(1, Math.ceil(total / RESULTS_PER_PAGE));
    const page = Math.min(Math.max(requestedPage, 1), pages);
    const visibleRecords = records.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE);
    const resultLabel = interpolate(copy.resultsSummary, { count: total, query });
    status.textContent = pages > 1
      ? interpolate(copy.resultsPageSummary, { base: resultLabel, page, pages })
      : resultLabel;
    empty.hidden = true;
    rankedResults = records;
    activeQuery = query;
    activePage = page;
    totalPages = pages;
    if (paginationElement) paginationElement.hidden = pages <= 1;
    if (previousPageButton) previousPageButton.disabled = page <= 1;
    if (nextPageButton) nextPageButton.disabled = page >= pages;
    if (pageStatusElement) pageStatusElement.textContent = interpolate(copy.pageStatus, { page, pages });

    const groups = TYPE_ORDER
      .map((type) => ({ type, records: visibleRecords.filter(({ record }) => record.type === type) }))
      .filter((group) => group.records.length > 0);

    results.innerHTML = groups.map(({ type, records: groupRecords }) => `
      <section class="search-results__group" aria-labelledby="search-group-${type}">
        <div class="search-results__group-head">
          <h2 id="search-group-${type}">${copy.typeLabels[type]}</h2>
          <span class="search-results__count">${interpolate(groupRecords.length === 1 ? copy.resultCountSingular : copy.resultCountPlural, { count: groupRecords.length })}</span>
        </div>
        <ol class="search-results__list">
          ${groupRecords.map(({ record }) => `
            <li class="search-result">
              <a class="search-result__link" href="${escapeHtml(record.external ? record.url : localizeInternalUrl(record.url, locale))}"${record.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>
                <span>
                  <span class="search-result__type text-caption">${copy.typeLabels[record.type]}</span>
                  ${record.meta ? `<span class="search-result__meta">${escapeHtml(record.meta)}</span>` : ''}
                </span>
                <span class="search-result__body">
                  <span class="search-result__title">${escapeHtml(record.title)}</span>
                  <span class="search-result__desc text-body-sm u-text-muted">${escapeHtml(record.description)}</span>
                  ${record.external ? `<span class="visually-hidden"> (${copy.opensNewTab})</span>` : ''}
                </span>
              </a>
            </li>`).join('')}
        </ol>
      </section>`).join('');
  }

  async function runSearch(query: string, updateUrl: boolean, requestedPage = 1) {
    const sequence = ++searchSequence;
    const trimmed = query.trim();
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (trimmed) url.searchParams.set('q', trimmed);
      else url.searchParams.delete('q');
      url.searchParams.delete('page');
      window.history.replaceState({}, '', url);
    }

    if (!trimmed) {
      renderEmptyNoQuery();
      return;
    }

    empty.hidden = true;
    status.textContent = copy.searchingStatus;
    rankedResults = [];
    activeQuery = '';
    activePage = 1;
    totalPages = 0;
    hidePagination();
    let records: SearchRecord[];
    try {
      records = await loadIndex();
    } catch {
      if (sequence !== searchSequence) return;
      status.textContent = copy.unavailableStatus;
      results.innerHTML = `<p class="search-no-results">${copy.loadFailure}</p>`;
      return;
    }
    if (sequence !== searchSequence) return;
    const ranked = records
      .map((record) => ({ record, s: score(record, trimmed) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s || a.record.title.localeCompare(b.record.title));

    if (ranked.length === 0) renderNoResults(trimmed);
    else renderResults(ranked, trimmed, requestedPage);
  }

  previousPageButton?.addEventListener('click', () => {
    if (activePage <= 1 || rankedResults.length === 0) return;
    renderResults(rankedResults, activeQuery, activePage - 1);
    updatePageUrl(activePage);
    previousPageButton.focus();
  });

  nextPageButton?.addEventListener('click', () => {
    if (activePage >= totalPages || rankedResults.length === 0) return;
    renderResults(rankedResults, activeQuery, activePage + 1);
    updatePageUrl(activePage);
    nextPageButton.focus();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    runSearch(input.value, true);
  });

  input.addEventListener('input', () => {
    runSearch(input.value, true);
  });

  const initialUrl = new URL(window.location.href);
  const initialQuery = initialUrl.searchParams.get('q') ?? '';
  const initialPage = Math.max(1, Number.parseInt(initialUrl.searchParams.get('page') ?? '1', 10) || 1);
  input.value = initialQuery;
  runSearch(initialQuery, false, initialPage);
}

main();
