import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { site } from '@/data/site';
import { locales } from '@/i18n/config';
import { localizePath } from '@/i18n/utils';
import { getAllImprints } from '@/lib/content/imprints';

/**
 * The sitemap is generated during the Astro build so it cannot drift from the
 * public route tree. Static .astro pages are discovered from src/pages; the
 * two data-driven route families are added from the same sources as their
 * page generators.
 */
const pageSourceFiles = import.meta.glob('/src/pages/**/*.astro', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

const excludedRoutes = new Set([
  '/search/',
]);

function routeFromPageSource(filePath: string): string | null {
  const normalized = filePath.replaceAll('\\', '/');
  const relativePath = normalized
    .replace(/^\/src\/pages\//, '')
    .replace(/\.astro$/, '');

  // Dynamic pages are expanded from their source data below.
  if (!relativePath || relativePath.split('/').some((segment) => segment.startsWith('['))) {
    return null;
  }

  const segments = relativePath.split('/').filter((segment) => segment !== 'index');
  const route = segments.length === 0 ? '/' : `/${segments.join('/')}/`;

  // Specimen pages are internal design references and are not production pages.
  if (route.startsWith('/specimen/') || excludedRoutes.has(route)) return null;
  return route;
}

function escapeXml(value: string): string {
  return value.replace(/[<>&'\"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[character] ?? character);
}

async function getCanonicalRoutes(): Promise<string[]> {
  const staticRoutes = Object.keys(pageSourceFiles)
    .map(routeFromPageSource)
    .filter((route): route is string => Boolean(route));

  const imprintRoutes = getAllImprints().map((imprint) => `/imprints/${imprint.slug}/`);
  const newsRoutes = (await getCollection('news')).map((post) => `/news/${post.id}/`);

  return [...new Set([...staticRoutes, ...imprintRoutes, ...newsRoutes])].sort();
}

export const GET: APIRoute = async () => {
  const canonicalRoutes = await getCanonicalRoutes();
  const localizedUrls = locales.flatMap((locale) =>
    canonicalRoutes.map((route) => new URL(localizePath(route, locale.code), `${site.url}/`).href),
  );
  const urls = [...new Set(localizedUrls)].sort();

  const entries = urls
    .map((url) => `  <url>\n    <loc>${escapeXml(url)}</loc>\n  </url>`)
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
