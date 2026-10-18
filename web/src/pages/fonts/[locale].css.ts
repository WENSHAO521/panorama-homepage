// Self-hosted heading faces for the non-Latin locales, one stylesheet per
// locale (/fonts/zh-hans.css ...). Each family ships as ~100 unicode-range
// slices and the browser downloads only the slices a page's headings use.
// Latin pages never link a stylesheet from here (see ScriptFonts.astro).
import type { APIRoute } from 'astro';
import scCss from '@fontsource/noto-serif-sc/400.css?raw';
import tcCss from '@fontsource/noto-serif-tc/400.css?raw';
import jpCss from '@fontsource/noto-serif-jp/400.css?raw';
import krCss from '@fontsource/noto-serif-kr/400.css?raw';
import arCss from '@fontsource/noto-naskh-arabic/400.css?raw';
import { scriptFontLocales } from '@/components/global/scriptFontLocales';

const fileUrls = {
  ...import.meta.glob('/node_modules/@fontsource/noto-serif-sc/files/*-400-normal.woff2', { query: '?url&no-inline', import: 'default', eager: true }),
  ...import.meta.glob('/node_modules/@fontsource/noto-serif-tc/files/*-400-normal.woff2', { query: '?url&no-inline', import: 'default', eager: true }),
  ...import.meta.glob('/node_modules/@fontsource/noto-serif-jp/files/*-400-normal.woff2', { query: '?url&no-inline', import: 'default', eager: true }),
  ...import.meta.glob('/node_modules/@fontsource/noto-serif-kr/files/*-400-normal.woff2', { query: '?url&no-inline', import: 'default', eager: true }),
  ...import.meta.glob('/node_modules/@fontsource/noto-naskh-arabic/files/*-400-normal.woff2', { query: '?url&no-inline', import: 'default', eager: true }),
} as Record<string, string>;

const byFileName = new Map(Object.entries(fileUrls).map(([path, url]) => [path.split('/').pop()!, url]));

const cssByLocale: Record<(typeof scriptFontLocales)[number], string> = {
  'zh-hans': scCss,
  'zh-hant': tcCss,
  ja: jpCss,
  ko: krCss,
  ar: arCss,
};

// Point each rule at the emitted woff2 and drop the .woff fallback (every
// browser the site supports reads woff2).
function rewrite(css: string) {
  return css.replace(
    /src: url\(\.\/files\/([^)]+\.woff2)\) format\('woff2'\)(?:, url\([^)]+\) format\('woff'\))?;/g,
    (_, file: string) => `src: url(${byFileName.get(file)}) format('woff2');`,
  );
}

export function getStaticPaths() {
  return scriptFontLocales.map((locale) => ({ params: { locale } }));
}

export const GET: APIRoute = ({ params }) =>
  new Response(rewrite(cssByLocale[params.locale as keyof typeof cssByLocale]), {
    headers: { 'Content-Type': 'text/css; charset=utf-8' },
  });
