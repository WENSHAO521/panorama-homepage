// Rasterises the outlined wordmark SVGs (see build-wordmark.py) into
// transparent PNGs for people who cannot use vector files.
// Run from web/: node scripts/brand/render-wordmark-png.mjs
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const DIR = path.resolve('public/brand/psg/wordmark');
const WIDTH = 2400;
const SLUGS = ['panorama-wordmark', 'panorama-wordmark-inverse', 'panorama-wordmark-black'];

let browser;
try {
  browser = await chromium.launch();
} catch {
  browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
}
const page = await browser.newPage();
for (const slug of SLUGS) {
  const svg = await readFile(path.join(DIR, `${slug}.svg`), 'utf8');
  const [, w, h] = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  const height = Math.round((WIDTH * Number(h)) / Number(w));
  await page.setViewportSize({ width: WIDTH, height });
  await page.setContent(
    `<style>html,body{margin:0;background:transparent}svg{display:block;width:${WIDTH}px;height:${height}px}</style>${svg}`,
  );
  await page.screenshot({ path: path.join(DIR, `${slug}.png`), omitBackground: true });
  console.log(`${slug}.png  ${WIDTH} x ${height}`);
}
await browser.close();
