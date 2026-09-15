// Real-browser interaction QA per project brief §51. Complements
// browser-check.mjs (which sweeps viewports for overflow/console
// errors) with actual pointer/keyboard interaction against the global
// shell: header mega menu, mobile nav, language selector, footer links.
//
// Usage: node tests/interaction-check.mjs (run after `npm run build`).

import { setup, teardown, BASE } from './_helpers.mjs';

const checks = [];
function record(name, pass, detail = '') {
  checks.push({ name, pass, detail });
}

async function main() {
  const { server, browser, usedFallback } = await setup();
  if (usedFallback) {
    console.log(`Note: falling back to cached Chromium build: ${usedFallback}`);
  }

  // ---- Desktop: mega menu (pointer, click-outside, Escape, keyboard) ----
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });

    const publishingSummary = page.locator('.desktop-nav summary', { hasText: 'Publishing' });
    const publishingDetails = page.locator('.desktop-nav details', { has: page.locator('summary', { hasText: 'Publishing' }) });

    await publishingSummary.click();
    record('desktop mega menu opens on click', await publishingDetails.evaluate((el) => el.open));

    await page.locator('body').click({ position: { x: 5, y: 5 } });
    record('desktop mega menu closes on click-outside', !(await publishingDetails.evaluate((el) => el.open)));

    await publishingSummary.click();
    await page.keyboard.press('Escape');
    const closedAfterEscape = !(await publishingDetails.evaluate((el) => el.open));
    const focusReturnedToSummary = await page.evaluate(
      () => document.activeElement?.textContent?.trim() === 'Publishing'
    );
    record('desktop mega menu closes on Escape', closedAfterEscape);
    record('focus returns to trigger after Escape', focusReturnedToSummary);

    await publishingSummary.focus();
    await page.keyboard.press('Enter');
    record('desktop mega menu opens via keyboard (Enter on summary)', await publishingDetails.evaluate((el) => el.open));

    const infraSummary = page.locator('.desktop-nav summary', { hasText: 'Infrastructure' });
    await infraSummary.click();
    const publishingStillOpen = await publishingDetails.evaluate((el) => el.open);
    record('opening a second mega menu closes the first (exclusive)', !publishingStillOpen);

    await page.close();
  }

  // ---- Desktop: language selector ----
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });

    const langSummary = page.locator('.site-header__lang summary');
    await langSummary.click();
    const langDetails = page.locator('.site-header__lang details');
    record('language selector opens', await langDetails.evaluate((el) => el.open));

    const jaHref = await page.locator('.site-header__lang a', { hasText: '日本語' }).getAttribute('href');
    const enHref = await page.locator('.site-header__lang a', { hasText: 'English' }).getAttribute('href');
    record(
      'non-English locale link resolves to a real (canonical) URL, not a 404 stub',
      jaHref === '/ja/',
      `href="${jaHref}"`
    );
    record('English locale link points at current page', enHref === '/', `href="${enHref}"`);

    await page.close();
  }

  // ---- Mobile: nav open, nested accordion, close ----
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });

    await page.locator('[data-open-mobile-nav]').click();
    const dialog = page.locator('#mobile-nav');
    record('mobile nav opens', await dialog.evaluate((el) => el.open));

    const publishingAccordion = page.locator('#mobile-nav details', { has: page.locator('summary', { hasText: 'Publishing' }) });
    await publishingAccordion.locator('summary').click();
    record('mobile nested accordion opens', await publishingAccordion.evaluate((el) => el.open));
    record(
      'mobile nested accordion reveals real sublinks',
      await page.locator('#mobile-nav a', { hasText: 'Journals' }).first().isVisible()
    );

    await page.locator('[data-close-mobile-nav]').click();
    record('mobile nav closes via close button', !(await dialog.evaluate((el) => el.open)));

    await page.close();
  }

  // ---- Homepage: no console/page errors, no >=400, no overflow (interaction pass) ----
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const consoleErrors = [];
    page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
    page.on('pageerror', (err) => consoleErrors.push(String(err)));
    const response = await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    record('homepage HTTP status < 400', (response?.status() ?? 0) < 400, `status=${response?.status()}`);
    record('homepage no horizontal overflow', overflow <= 0, `overflow=${overflow}px`);
    record('homepage no console/page errors', consoleErrors.length === 0, JSON.stringify(consoleErrors));
    await page.close();
  }

  // ---- Footer: major internal links resolve ----
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    const hrefs = await page.locator('.site-footer a[href^="/"]').evaluateAll((els) => els.map((e) => e.getAttribute('href')));
    const uniqueHrefs = [...new Set(hrefs)];
    for (const href of uniqueHrefs) {
      const res = await page.request.get(BASE + href);
      record(`footer link resolves: ${href}`, res.status() < 400, `status=${res.status()}`);
    }
    await page.close();
  }

  await teardown({ server, browser });

  const failed = checks.filter((c) => !c.pass);
  console.log(`Ran ${checks.length} interaction checks.`);
  for (const c of checks) {
    console.log(`  ${c.pass ? 'PASS' : 'FAIL'} - ${c.name}${c.detail ? ' (' + c.detail + ')' : ''}`);
  }
  if (failed.length) {
    console.log(`\n${failed.length} check(s) FAILED.`);
  } else {
    console.log('\nAll interaction checks PASSED.');
  }
  process.exit(failed.length === 0 ? 0 : 1);
}

main();
