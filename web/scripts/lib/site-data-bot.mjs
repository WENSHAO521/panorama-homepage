// Shared plumbing for the weekly site-data harvest scripts.
//
// 1. Bot pass header. The Panorama sub-sites sit behind Cloudflare, which
//    challenges GitHub Actions runners. When SITE_DATA_BOT_TOKEN is set, every
//    request to a panorama-sg.com host carries `X-Panorama-Bot: <token>`, which
//    a Cloudflare WAF skip rule lets through (see docs/SITE-DATA-FEEDS.md). The
//    header is never sent to any other host.
// 2. Problem report. Scripts record each source that was blocked or errored.
//    When SITE_DATA_REPORT names a file, problems are appended to it as JSON
//    lines so the workflow can fail the run after committing what it did get.

import { appendFileSync } from 'node:fs';

export const BOT_HEADER = 'X-Panorama-Bot';
const BOT_TOKEN = String(process.env.SITE_DATA_BOT_TOKEN || '').trim();

export function hasBotToken() {
  return BOT_TOKEN.length > 0;
}

export function isPanoramaHost(url) {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host === 'panorama-sg.com' || host.endsWith('.panorama-sg.com');
  } catch {
    return false;
  }
}

/** Headers to merge into a fetch() to `url`. Empty unless it is a Panorama host. */
export function botHeadersFor(url) {
  return BOT_TOKEN && isPanoramaHost(url) ? { [BOT_HEADER]: BOT_TOKEN } : {};
}

/** Adds the bot header to a Playwright page's requests to Panorama hosts only. */
export async function installBotHeader(page) {
  if (!BOT_TOKEN) return;
  await page.route('**/*', (route) => {
    const request = route.request();
    if (!isPanoramaHost(request.url())) return route.continue();
    return route.continue({ headers: { ...request.headers(), [BOT_HEADER.toLowerCase()]: BOT_TOKEN } });
  });
}

/**
 * Records a source that could not be harvested.
 * severity 'error' fails the workflow; 'warning' is only listed in the summary.
 */
export function reportProblem(script, source, message, severity = 'error') {
  const reportPath = process.env.SITE_DATA_REPORT;
  if (!reportPath) return;
  const line = JSON.stringify({ script, source, severity, message: String(message).slice(0, 200) });
  appendFileSync(reportPath, line + '\n', 'utf-8');
}

/** Compares two payload lists; the scripts build entries with a fixed key order. */
export function sameContent(a, b) {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}
