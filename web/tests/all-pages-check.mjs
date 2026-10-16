// Real-browser sweep of every generated page in every locale.
// Run after `npm run build`; unlike browser-check.mjs, this derives routes
// from dist so newly added pages automatically enter the sweep.
import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { setup, teardown, BASE } from './_helpers.mjs';

const DIST = path.resolve(process.env.PREVIEW_DIST_DIR ?? 'dist');
const WIDTHS = [320, 360, 600, 768, 1024, 1440];
const CONCURRENCY = 4;
const LOCALES = new Set(['zh-hans', 'zh-hant', 'ja', 'ko', 'de', 'fr', 'es', 'ru', 'ar']);
const KOREAN_COPY_ERRORS = {
  '/imprints/verdant-science/': ['살아 있는 지구를 위한 살아 있는 지구.'],
  '/imprints/charter/research/': ['편집 결정은 학술적 가치, 범위와의 관련성, 학술 기록의 무결성을 기준으로 합니다.'],
};
const TRANSLATION_MARKERS = {
  '/': [
    'Engineering systems and their applications.',
    'Research for a resilient and just transition.',
    'Digital health and medical AI.',
    'People, institutions and societal change.',
    'Philosophy, culture and global dialogue.',
    'Panorama Scholarly Group Ltd has signed the San Francisco Declaration on Research Assessment (DORA)',
  ],
  '/journals/': [
    'Publishes original research and critical reviews on political economy',
    'Computational Social Sciences Review (CSSR) is an international peer-reviewed journal',
    'Publishes interdisciplinary research that advances educational theory',
    'An international, peer-reviewed, open-access journal dedicated to advancing research at the intersection of social cognition',
  ],
  '/imprints/ridgeline/journals/': ['Advancing research and practice across complex engineered systems'],
  '/imprints/charter/journals/': ['Computational Social Sciences Review (CSSR) is an international peer-reviewed journal'],
  '/imprints/threnody/': ['A journal of sound, listening, and the cultural imagination.'],
  '/imprints/threnody/research/': [
    'Humanities and arts research does not become less rigorous because its objects are historical',
    'Threnody supports scholarship that makes its reasoning visible',
  ],
  '/news/': [
    'Panorama Scholarly Group Ltd has signed the San Francisco Declaration on Research Assessment (DORA)',
    'Panorama Scholarly Group completed a comprehensive update to the user interface of its website',
  ],
  '/news/website-ui-update/': [
    'On 15 September 2026, Panorama Scholarly Group completed a comprehensive update to the user interface of its website.',
    'The update brings the Group website and its editorial imprints into a more consistent visual and navigational system.',
    'A more consistent visual language across the Group website and its editorial imprints.',
  ],
  '/news/dora-signatory-2026/': [
    'Panorama Scholarly Group Ltd is pleased to announce that it has signed the San Francisco Declaration on Research Assessment (DORA).',
    'As an organizational signatory, we support responsible research assessment.',
    'Recognising the varied contributions of authors, editors, reviewers, and research communities.',
  ],
};

async function pageRoutes(directory, relative = '') {
  const routes = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const nextRelative = path.join(relative, entry.name);
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) routes.push(...await pageRoutes(fullPath, nextRelative));
    else if (entry.name === 'index.html') {
      const pageDirectory = path.dirname(nextRelative);
      routes.push(pageDirectory === '.' ? '/' : `/${pageDirectory.replaceAll(path.sep, '/')}/`);
    }
  }
  return routes;
}

async function main() {
  const routes = [...new Set(await pageRoutes(DIST))].sort();
  if (!routes.length) throw new Error(`No built pages found under ${DIST}; run npm run build first.`);

  const { server, browser, usedFallback } = await setup();
  if (usedFallback) console.log(`Using cached Chromium build: ${usedFallback}`);

  const context = await browser.newContext({ viewport: { width: WIDTHS[0], height: 900 } });
  const pages = await Promise.all(Array.from({ length: CONCURRENCY }, () => context.newPage()));
  const failures = [];
  const translationCandidates = new Map();

  for (const width of WIDTHS) {
    await Promise.all(pages.map(async (page, worker) => {
      await page.setViewportSize({ width, height: 900 });
      for (let index = worker; index < routes.length; index += CONCURRENCY) {
        const route = routes[index];
        const consoleErrors = [];
        const pageErrors = [];
        let active = { consoleErrors, pageErrors };
        const onConsole = (msg) => { if (msg.type() === 'error') active?.consoleErrors.push(msg.text()); };
        const onPageError = (err) => active?.pageErrors.push(String(err));
        page.on('console', onConsole);
        page.on('pageerror', onPageError);

        let status = null;
        let audit = null;
        let navError = null;
        try {
          const response = await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 20000 });
          status = response?.status() ?? null;
          await page.evaluate(() => new Promise(requestAnimationFrame));
          const routeLocale = route.split('/').filter(Boolean)[0];
          const expected = LOCALES.has(routeLocale) ? routeLocale : 'en';
          const canonicalRoute = expected === 'en' ? route : route.slice(`/${expected}`.length) || '/';
          audit = await page.evaluate(({ translationMarkers, koreanCopyErrors }) => {
            const doc = document.documentElement;
            const lang = doc.lang.toLowerCase();
            const main = document.querySelector('main');
            const headings = [...(main ?? doc).querySelectorAll('h1,h2,h3,h4')]
              .filter((el) => el.getClientRects().length)
              .map((el) => {
                const s = getComputedStyle(el);
                const size = parseFloat(s.fontSize);
                const spacing = s.letterSpacing === 'normal' ? 0 : parseFloat(s.letterSpacing);
                const ratio = parseFloat(s.lineHeight) / size;
                const tag = el.tagName.toLowerCase();
                const cjk = /^(zh|ja|ko)/.test(lang);
                const minimum = lang === 'ar' ? (tag === 'h1' || tag === 'h2' ? 1.44 : 1.39)
                  : cjk ? 1.21
                  : tag === 'h1' ? 1.13 : tag === 'h2' ? 1.17 : tag === 'h3' ? 1.21 : 1.23;
                return { tag, text: el.innerText.trim().slice(0, 80), ratio, spacing, lineBreak: s.lineBreak, hyphens: s.hyphens, minimum };
              });

            const prose = [...(main ?? doc).querySelectorAll('p,li,blockquote,figcaption')]
              .filter((el) => !el.matches('.text-overline,.text-caption,[class*="kicker"],[class*="eyebrow"],[class*="label"],[class*="meta"]'))
              .filter((el) => el.getClientRects().length)
              .map((el) => {
                const s = getComputedStyle(el);
                return { text: el.innerText.trim().slice(0, 80), ratio: parseFloat(s.lineHeight) / parseFloat(s.fontSize), hyphens: s.hyphens, lineBreak: s.lineBreak };
              });

            const wrappedControls = [...document.querySelectorAll('nav a,button,[role="button"]')]
              .filter((el) => el.getClientRects().length)
              .map((el) => {
                const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
                const tops = new Set();
                let node;
                while ((node = walker.nextNode())) {
                  if (!node.textContent.trim() || node.parentElement.closest('.visually-hidden,[aria-hidden="true"],[hidden]')) continue;
                  const range = document.createRange();
                  range.selectNode(node);
                  for (const rect of range.getClientRects()) tops.add(Math.round(rect.top));
                }
                const text = el.innerText.replace(/\s+/g, ' ').trim();
                const hasCjk = /[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/.test(text);
                return { text, lines: tops.size, hasCjk };
              })
              .filter((item) => item.lines >= 3 && (item.hasCjk ? [...item.text].length <= 12 : item.text.split(/\s+/).length <= 2));

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const narrowCjkLinks = [...document.querySelectorAll('a,button,[role="button"]')]
              .filter((el) => el.getClientRects().length)
              .flatMap((el) => {
                const findings = [];
                const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
                let node;
                while ((node = walker.nextNode())) {
                  const text = node.textContent.replace(/\s+/g, ' ').trim();
                  if (!text || node.parentElement.closest('.visually-hidden,[aria-hidden="true"],[hidden]')) continue;
                  const chars = [...text];
                  const cjkChars = chars.filter((char) => /[\u3400-\u9fff\u3040-\u30ff\uac00-\ud7af]/.test(char)).length;
                  if (cjkChars < 3 || cjkChars > 12) continue;
                  const textElement = node.parentElement ?? el;
                  const style = getComputedStyle(textElement);
                  context.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
                  const spacing = style.letterSpacing === 'normal' ? 0 : parseFloat(style.letterSpacing);
                  const textWidth = context.measureText(text).width + spacing * chars.length;
                  const range = document.createRange();
                  range.selectNodeContents(node);
                  const lines = new Set([...range.getClientRects()].map((rect) => Math.round(rect.top)));
                  const width = textElement.getBoundingClientRect().width;
                  if (lines.size >= cjkChars && textWidth <= width + 2) {
                    findings.push({ text, lines: lines.size, cjkChars, textWidth, width });
                  }
                }
                return findings;
              })

            const infrastructureLinks = [...document.querySelectorAll('.infra-hero__nav a')].map((el) => {
              const s = getComputedStyle(el);
              return { text: el.innerText.trim(), whiteSpace: s.whiteSpace, flexShrink: s.flexShrink };
            });

            const mainText = main?.innerText ?? '';
            const untranslatedMarkers = translationMarkers.filter((marker) => mainText.includes(marker));
            const normalizedMainText = mainText.replace(/\s+/g, ' ');
            const koreanCopyIssues = lang.startsWith('ko')
              ? [
                  ...koreanCopyErrors.filter((marker) => normalizedMainText.includes(marker)),
                  ...(normalizedMainText.match(/\b\d+\s+개\s+(?:학술지|저널|투고처)/g) ?? []),
                ]
              : [];

            const englishMarkers = /\b(the|and|of|for|with|is|are|we|our|that|this|from|by|across|while|into|their|its|as)\b/gi;
            const localMarkers = {
              de: /\b(der|die|das|und|für|mit|von|zu|wir|ist|sind|den|dem|ein|eine|im|am|bei|als|nicht)\b/gi,
              fr: /\b(le|la|les|des|du|et|un|une|pour|avec|dans|nous|vous|est|sont|qui|que|au|aux|notre)\b/gi,
              es: /\b(el|la|los|las|de|y|para|con|en|una|uno|un|por|que|del|al|nuestro|nuestra)\b/gi,
            };
            const translationCandidates = [];
            if (lang !== 'en') {
              for (const el of [...(main ?? doc).querySelectorAll('h1,h2,h3,p,li,blockquote,button,a')]) {
                if (!el.getClientRects().length) continue;
                const text = el.innerText.replace(/\s+/g, ' ').trim();
                const words = text.match(/[A-Za-z']+/g) ?? [];
                if (text.length < 48 || words.length < 8) continue;
                const hasLocalScript = lang.startsWith('zh') ? /[\u3400-\u9fff]/.test(text)
                  : lang === 'ja' ? /[\u3040-\u30ff\u3400-\u9fff]/.test(text)
                  : lang === 'ko' ? /[\uac00-\ud7af]/.test(text)
                  : lang === 'ru' ? /[\u0400-\u04ff]/.test(text)
                  : lang === 'ar' ? /[\u0600-\u06ff]/.test(text)
                  : false;
                const englishCount = (text.match(englishMarkers) ?? []).length;
                const localCount = localMarkers[lang] ? (text.match(localMarkers[lang]) ?? []).length : 0;
                if ((!hasLocalScript && englishCount >= 3) || (localMarkers[lang] && englishCount >= 4 && localCount === 0)) {
                  translationCandidates.push({ text, tag: el.tagName.toLowerCase() });
                }
              }
            }

            return {
              lang,
              dir: doc.dir || 'ltr',
              overflow: doc.scrollWidth - doc.clientWidth,
              hasMain: Boolean(main),
              headings,
              prose,
              wrappedControls,
              narrowCjkLinks,
              infrastructureLinks,
              untranslatedMarkers,
              koreanCopyIssues,
              translationCandidates,
            };
          }, {
            translationMarkers: TRANSLATION_MARKERS[canonicalRoute] ?? [],
            koreanCopyErrors: KOREAN_COPY_ERRORS[canonicalRoute] ?? [],
          });

          const actual = audit.lang.replaceAll('_', '-');
          const expectedDir = expected === 'ar' ? 'rtl' : 'ltr';
          const headingIssues = audit.headings.filter((h) => h.ratio < h.minimum || h.spacing < -0.01);
          const cjk = /^(zh-hans|zh-hant|ja|ko)$/.test(expected);
          const proseIssues = audit.prose.filter((p) => p.ratio < 1.3 || p.hyphens !== (cjk || expected === 'ar' ? 'none' : 'auto'));
          const languageBreakIssues = audit.headings.filter((h) => cjk && h.lineBreak !== (expected === 'ko' ? 'normal' : 'strict'));
          const issues = [];
          if (!audit.hasMain) issues.push('missing <main>');
          if (actual !== expected) issues.push(`lang=${audit.lang}, expected ${expected}`);
          if (audit.dir !== expectedDir) issues.push(`dir=${audit.dir}, expected ${expectedDir}`);
          if (audit.overflow > 1) issues.push(`horizontal overflow ${audit.overflow}px`);
          if (headingIssues.length) issues.push(`heading rhythm/tracking ${JSON.stringify(headingIssues)}`);
          if (proseIssues.length) issues.push(`prose spacing/wrapping ${JSON.stringify(proseIssues.slice(0, 3))}`);
          if (languageBreakIssues.length) issues.push(`CJK heading line-break ${JSON.stringify(languageBreakIssues)}`);
          if (audit.wrappedControls.length) issues.push(`controls stack vertically ${JSON.stringify(audit.wrappedControls)}`);
          if (audit.narrowCjkLinks.length) issues.push(`CJK link text breaks despite sufficient width ${JSON.stringify(audit.narrowCjkLinks)}`);
          if (audit.infrastructureLinks.some((link) => link.whiteSpace !== 'nowrap' || link.flexShrink !== '0')) issues.push(`infrastructure links may split or shrink ${JSON.stringify(audit.infrastructureLinks)}`);
          if (expected !== 'en' && audit.untranslatedMarkers.length) issues.push(`known English copy remains ${JSON.stringify(audit.untranslatedMarkers)}`);
          if (audit.koreanCopyIssues.length) issues.push(`Korean copy regression ${JSON.stringify(audit.koreanCopyIssues)}`);
          if (consoleErrors.length) issues.push(`console ${JSON.stringify(consoleErrors)}`);
          if (pageErrors.length) issues.push(`pageerror ${JSON.stringify(pageErrors)}`);
          if (navError || (status !== null && status >= 400) || issues.length) failures.push({ route, width, status, navError, issues });

          for (const candidate of audit.translationCandidates) {
            const key = `${audit.lang}|${candidate.text}`;
            if (!translationCandidates.has(key)) translationCandidates.set(key, { locale: audit.lang, route, ...candidate });
          }
        } catch (err) {
          navError = String(err);
          failures.push({ route, width, status, navError, issues: [] });
        } finally {
          active = null;
          page.off('console', onConsole);
          page.off('pageerror', onPageError);
        }
      }
    }));
  }

  await context.close();
  await teardown({ server, browser });

  const report = { routes: routes.length, widths: WIDTHS, failures, translationCandidates: [...translationCandidates.values()] };
  const reportPath = path.join(DIST, '_all-pages-report.json');
  await writeFile(reportPath, JSON.stringify(report, null, 2));

  console.log(`Checked ${routes.length} generated pages across ${WIDTHS.length} viewport widths (${routes.length * WIDTHS.length} page/width combinations).`);
  if (translationCandidates.size) {
    const byLocale = Object.groupBy([...translationCandidates.values()], (candidate) => candidate.locale);
    console.log(`Translation candidates for human review (${translationCandidates.size} unique strings; heuristic only): ${Object.entries(byLocale).map(([locale, items]) => `${locale}: ${items.length}`).join(', ')}`);
    for (const candidate of [...translationCandidates.values()].slice(0, 20)) console.log(`  [${candidate.locale}] ${candidate.route} ${candidate.tag}: ${candidate.text}`);
    console.log(`Full candidate list: ${reportPath}`);
  } else {
    console.log('No likely untranslated long text found by the language-script heuristic.');
  }
  if (failures.length) {
    console.log(`\nFAIL: ${failures.length} page/width problem(s):`);
    const byIssue = new Map();
    for (const failure of failures) for (const issue of failure.issues) {
      const key = issue.split(' ')[0];
      byIssue.set(key, (byIssue.get(key) ?? 0) + 1);
    }
    console.log(`Issue counts: ${[...byIssue].map(([issue, count]) => `${issue}: ${count}`).join(', ')}`);
    for (const failure of failures.slice(0, 40)) console.log(`  ${failure.route} @ ${failure.width}px -> status=${failure.status ?? 'none'} ${failure.navError ?? ''} ${failure.issues.join('; ')}`);
    if (failures.length > 40) console.log(`Remaining details: ${reportPath}`);
  } else {
    console.log('PASS: every page loaded, matched its locale, had no horizontal overflow/runtime errors, and passed the typography checks.');
  }
  process.exitCode = failures.length ? 1 : 0;
}

main();
