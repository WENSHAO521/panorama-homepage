// Real-browser QA per project brief §30/§36. Not a Playwright Test
// Runner suite (that dependency isn't installed and this shouldn't add
// one just for this) -- uses the `playwright` driver package directly
// against a built-and-previewed static site.
//
// Checks, per route/width:
//   - page loads (HTTP 200, no thrown navigation error)
//   - no horizontal overflow (scrollWidth > clientWidth on <html>)
//   - no runtime console errors or page errors
//
// The homepage gets the full responsive sweep from project brief §30
// (320/360/390/430/768/1024/1280/1440/1728/1920); every other route
// gets the three reference widths (390/768/1440) for regression
// coverage without an unnecessarily long run.
//
// Usage: node tests/browser-check.mjs (run after `npm run build`; it
// starts and stops its own `astro preview` server on port 4321).

import { setup, teardown, BASE } from './_helpers.mjs';

const ROUTES = [
  '/',
  '/publishing/',
  '/journals/',
  '/imprints/',
  '/imprints/ridgeline/',
  '/imprints/health-nexus/',
  '/imprints/health-nexus/journals/',
  '/imprints/health-nexus/research/',
  '/imprints/health-nexus/for-authors/',
  '/imprints/health-nexus/about/',
  '/books/',
  '/research/',
  '/infrastructure/',
  '/standards/',
  '/standards/ethics/',
  '/news/',
  '/about/',
  '/about/contact/',
  '/privacy/',
  '/search/',
  '/specimen/typography/',
  '/specimen/color/',
  '/specimen/spacing/',
  '/specimen/grid/',
];
const DEFAULT_WIDTHS = [390, 768, 1440];
const HOMEPAGE_WIDTHS = [320, 360, 390, 430, 768, 1024, 1280, 1440, 1728, 1920];

async function main() {
  const { server, browser, usedFallback } = await setup();
  if (usedFallback) {
    console.log(`Note: falling back to cached Chromium build not matching this Playwright version's pin: ${usedFallback}`);
  }

  const results = [];

  for (const route of ROUTES) {
    const widths = route === '/' ? HOMEPAGE_WIDTHS : DEFAULT_WIDTHS;
    for (const width of widths) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const consoleErrors = [];
      const pageErrors = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('pageerror', (err) => pageErrors.push(String(err)));

      let status = null;
      let overflow = null;
      let navError = null;
      try {
        const response = await page.goto(BASE + route, { waitUntil: 'networkidle', timeout: 15000 });
        status = response ? response.status() : null;
        overflow = await page.evaluate(() => {
          const doc = document.documentElement;
          return doc.scrollWidth - doc.clientWidth;
        });
      } catch (err) {
        navError = String(err);
      }

      results.push({ route, width, status, overflow, consoleErrors, pageErrors, navError });
      await page.close();
    }
  }

  await teardown({ server, browser });

  const failures = results.filter(
    (r) => r.navError || (r.status && r.status >= 400) || (r.overflow ?? 0) > 0 || r.consoleErrors.length || r.pageErrors.length
  );

  console.log(`Checked ${results.length} (route x width) combinations across ${ROUTES.length} routes.`);
  if (failures.length === 0) {
    console.log('PASS: no navigation errors, no HTTP >=400, no horizontal overflow, no console/page errors.');
  } else {
    console.log(`FAIL: ${failures.length} problem(s) found:`);
    for (const f of failures) {
      console.log(`  ${f.route} @ ${f.width}px -> status=${f.status} overflow=${f.overflow}px navError=${f.navError ?? 'none'} consoleErrors=${JSON.stringify(f.consoleErrors)} pageErrors=${JSON.stringify(f.pageErrors)}`);
    }
  }

  process.exit(failures.length === 0 ? 0 : 1);
}

main();
