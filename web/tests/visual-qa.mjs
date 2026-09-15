// Visual QA screenshot capture per project brief §48/§49/§50. Saves
// PNGs to the path given as argv[2] (defaults to ./tests/screenshots).
// This script only captures -- a human/agent then inspects the files
// with an image viewer; it does not itself judge the layout.
import { setup, teardown, BASE } from './_helpers.mjs';
import { mkdirSync } from 'node:fs';

const OUT = process.argv[2] || './tests/screenshots';
mkdirSync(OUT, { recursive: true });

async function main() {
  const { server, browser, usedFallback } = await setup();
  if (usedFallback) console.log(`Using cached Chromium: ${usedFallback}`);

  // Full-page homepage at each required width (project brief §50).
  for (const width of [390, 768, 1024, 1440, 1728, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${OUT}/homepage-${width}.png`, fullPage: true });
    await page.close();
    console.log(`homepage-${width}.png`);
  }

  // Header states (project brief §48), desktop viewport.
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${OUT}/header-closed.png` });
    console.log('header-closed.png');

    await page.locator('.desktop-nav summary', { hasText: 'Publishing' }).click();
    await page.waitForTimeout(200); // let the open animation settle before capturing
    await page.screenshot({ path: `${OUT}/header-publishing-open.png` });
    console.log('header-publishing-open.png');

    await page.locator('.desktop-nav summary', { hasText: 'Infrastructure' }).click();
    await page.waitForTimeout(200);
    await page.screenshot({ path: `${OUT}/header-infrastructure-open.png` });
    console.log('header-infrastructure-open.png');

    await page.locator('body').click({ position: { x: 5, y: 5 } });
    await page.locator('.site-header__lang summary').click();
    await page.waitForTimeout(100);
    await page.screenshot({ path: `${OUT}/header-language-open.png` });
    console.log('header-language-open.png');

    await page.close();
  }

  // Mobile navigation states (project brief §48/§13).
  {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.locator('[data-open-mobile-nav]').click();
    await page.screenshot({ path: `${OUT}/mobile-nav-open.png` });
    console.log('mobile-nav-open.png');

    await page.locator('#mobile-nav details', { has: page.locator('summary', { hasText: 'Publishing' }) }).locator('summary').click();
    await page.screenshot({ path: `${OUT}/mobile-nav-nested-open.png` });
    console.log('mobile-nav-nested-open.png');

    await page.close();
  }

  // Footer at the three required widths (project brief §49).
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.locator('.site-footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(150); // let scroll settle before measuring -- a stale
    // boundingBox() read produced a mis-clipped screenshot missing the top of the
    // footer in an earlier run (see docs/HOMEPAGE.md visual-QA notes).
    await page.screenshot({ path: `${OUT}/footer-${width}.png`, clip: await page.locator('.site-footer').boundingBox() });
    await page.close();
    console.log(`footer-${width}.png`);
  }

  await teardown({ server, browser });
}

main();
