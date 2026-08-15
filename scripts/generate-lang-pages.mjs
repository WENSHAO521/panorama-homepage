// Generates real, crawlable per-language static pages (e.g. zh/about.html,
// ja/journals.html) from the 9 English root pages. Translation itself is not
// reimplemented here -- each page is loaded in a real headless browser and
// the site's own window.setLanguage(lang) (site.js) is invoked, so the
// output always matches live client-side behavior exactly. The result is
// then post-processed to root-relativize asset paths and inject
// self-referential canonical + hreflang tags.
//
// Safe to re-run any time after content/copy changes -- output is fully
// regenerated and overwritten on every run.
//
// Usage: node scripts/generate-lang-pages.mjs [--pilot]
//   --pilot restricts the run to about.html x zh, for fast iteration.

import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const BASE_URL = 'https://panorama-sg.com';
const PORT = 8791;

const ALL_PAGES = [
    'index.html', 'about.html', 'contact.html', 'editorial-board-application.html',
    'for-authors.html', 'indexing.html', 'journals.html', 'open-access-policy.html',
    'publication-ethics.html', 'privacy-policy.html',
];
const ALL_LANGS = ['zh', 'zh-cn', 'ja', 'ko', 'ru', 'es', 'fr', 'de', 'ar'];

const HREFLANG = {
    en: 'en', zh: 'zh-Hant', 'zh-cn': 'zh-Hans', ja: 'ja', ko: 'ko',
    ru: 'ru', es: 'es', fr: 'fr', de: 'de', ar: 'ar',
};

const PILOT = process.argv.includes('--pilot');
const PAGES = PILOT ? ['about.html'] : ALL_PAGES;
const LANGS = PILOT ? ['zh'] : ALL_LANGS;

const MIME = {
    '.html': 'text/html; charset=utf-8', '.js': 'application/javascript',
    '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon',
};

function startServer() {
    const server = http.createServer((req, res) => {
        const urlPath = decodeURIComponent(req.url.split('?')[0]);
        const filePath = path.join(ROOT_DIR, urlPath === '/' ? 'index.html' : urlPath);
        fs.readFile(filePath, (err, data) => {
            if (err) { res.writeHead(404); res.end('Not found'); return; }
            const ext = path.extname(filePath);
            res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
            res.end(data);
        });
    });
    return new Promise((resolve) => server.listen(PORT, '127.0.0.1', () => resolve(server)));
}

function slugFor(pageFile) {
    return pageFile === 'index.html' ? '' : pageFile;
}

function urlFor(lang, pageFile) {
    const slug = slugFor(pageFile);
    return lang === 'en' ? `${BASE_URL}/${slug}` : `${BASE_URL}/${lang}/${slug}`;
}

function hreflangBlock(pageFile) {
    const lines = ['en', ...ALL_LANGS].map(
        (lang) => `    <link rel="alternate" hreflang="${HREFLANG[lang]}" href="${urlFor(lang, pageFile)}">`
    );
    lines.push(`    <link rel="alternate" hreflang="x-default" href="${urlFor('en', pageFile)}">`);
    return lines.join('\n');
}

// Replaces the existing canonical + og:url lines with a self-referential
// canonical, a full hreflang cross-link block, and a corrected og:url.
// Idempotent: strips any hreflang block left by a previous run (the source
// root pages get patched in place, so re-running must not stack blocks).
function injectHreflangBlock(html, pageFile, lang) {
    const canonicalRe = /<link rel="canonical" href="[^"]*">/;
    const ogUrlRe = /<meta property="og:url" content="[^"]*">/;
    const existingHreflangRe = /(\n[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*">)+/;
    if (!canonicalRe.test(html) || !ogUrlRe.test(html)) {
        throw new Error(`${pageFile} (${lang}): missing canonical or og:url line, cannot inject hreflang block`);
    }
    html = html.replace(existingHreflangRe, '');
    html = html.replace(canonicalRe, `<link rel="canonical" href="${urlFor(lang, pageFile)}">\n${hreflangBlock(pageFile)}`);
    html = html.replace(ogUrlRe, `<meta property="og:url" content="${urlFor(lang, pageFile)}">`);
    return html;
}

// Root-relativizes asset/data paths that are only valid from the repo root;
// page-to-page links (href="journals.html" etc.) are deliberately untouched
// since they correctly resolve as siblings within the same language folder.
function rootRelativize(html) {
    const replacements = [
        [/href="favicon\.svg"/g, 'href="/favicon.svg"'],
        [/href="favicon\.png"/g, 'href="/favicon.png"'],
        [/href="manifest\.json"/g, 'href="/manifest.json"'],
        [/href="institutional\.css\?v=/g, 'href="/institutional.css?v='],
        [/src="site\.js\?v=/g, 'src="/site.js?v='],
        [/src="assets\/logos\//g, 'src="/assets/logos/'],
        [/href="assets\/logos\//g, 'href="/assets/logos/'],
        [/src="QKFM\//g, 'src="/QKFM/'],
        [/data\/articles\.json/g, '/data/articles.json'],
        [/data\/journals\.json/g, '/data/journals.json'],
        [/data\/posi_stats\.json/g, '/data/posi_stats.json'],
        [/data\/announcements\.json/g, '/data/announcements.json'],
    ];
    for (const [re, replacement] of replacements) html = html.replace(re, replacement);
    return html;
}

async function generate() {
    const server = await startServer();
    const browser = await chromium.launch();
    const page = await browser.newPage();
    let count = 0;

    try {
        for (const pageFile of PAGES) {
            for (const lang of LANGS) {
                await page.goto(`http://127.0.0.1:${PORT}/${pageFile}`, { waitUntil: 'networkidle' });
                await page.evaluate((l) => window.setLanguage(l), lang);
                await page.evaluate((l) => document.documentElement.setAttribute('data-page-lang', l), lang);
                await page.waitForTimeout(300);

                let html = await page.content();
                html = rootRelativize(html);
                html = injectHreflangBlock(html, pageFile, lang);

                const outDir = path.join(ROOT_DIR, lang);
                fs.mkdirSync(outDir, { recursive: true });
                fs.writeFileSync(path.join(outDir, pageFile), html, 'utf-8');
                count++;
                console.log(`  ${lang}/${pageFile}`);
            }
        }

        // Patch the English root pages with the same hreflang cross-link block.
        for (const pageFile of PAGES) {
            const filePath = path.join(ROOT_DIR, pageFile);
            let html = fs.readFileSync(filePath, 'utf-8');
            html = injectHreflangBlock(html, pageFile, 'en');
            fs.writeFileSync(filePath, html, 'utf-8');
            console.log(`  (root) ${pageFile}`);
        }
    } finally {
        await browser.close();
        server.close();
    }

    console.log(`\nGenerated ${count} language page(s) across ${PAGES.length} page(s) x ${LANGS.length} language(s), patched ${PAGES.length} root page(s).`);
}

generate().catch((err) => { console.error(err); process.exit(1); });
