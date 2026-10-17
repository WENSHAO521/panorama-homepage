// Checks public/_redirects against the built site: every rule must point at
// a page that exists in dist (or an absolute https URL), and no rule may
// shadow a real page.
// Run after `npm run build`; needs no browser.
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const DIST = path.resolve(process.env.PREVIEW_DIST_DIR ?? 'dist');
const rules = readFileSync(path.join(DIST, '_redirects'), 'utf8')
  .split('\n')
  .filter((line) => line.trim() && !line.startsWith('#'))
  .map((line) => line.trim().split(/\s+/));

const pageExists = (route) => existsSync(path.join(DIST, route, 'index.html'));
const failures = [];
const seen = new Set();

for (const [from, to, code] of rules) {
  if (seen.has(from)) failures.push(`duplicate source ${from}`);
  seen.add(from);
  if (!['301', '302'].includes(code)) failures.push(`${from}: unexpected status ${code}`);
  if (from.endsWith('/*')) {
    if (!to.endsWith('/:splat')) failures.push(`${from}: catch-all without :splat`);
    else if (!pageExists(to.slice(0, -':splat'.length))) failures.push(`${from}: locale root ${to} missing`);
    continue;
  }
  if (!/^https:\/\//.test(to) && !pageExists(to)) failures.push(`${from} -> ${to}: target page missing`);
  if (existsSync(path.join(DIST, from)) && !from.endsWith('/')) failures.push(`${from}: shadows a built file`);
  if (from.endsWith('/') && pageExists(from)) failures.push(`${from}: shadows a built page`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  console.error(`\n${failures.length} redirect problem(s) in ${rules.length} rules.`);
  process.exit(1);
}
console.log(`All ${rules.length} redirects point at built pages.`);
