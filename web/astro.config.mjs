import { defineConfig } from 'astro/config';

// Round 1 foundation config. i18n routing config, adapters, and integrations
// (image optimization, sitemap, etc.) are added as later rounds bring in
// real content and deployment targets — see docs/rebuild/ARCHITECTURE.md.
export default defineConfig({
  site: 'https://panorama-sg.com',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-hans', 'zh-hant', 'ja', 'ko', 'de', 'fr', 'es', 'ru', 'ar'],
    fallback: {
      'zh-hans': 'en',
      'zh-hant': 'en',
      ja: 'en',
      ko: 'en',
      de: 'en',
      fr: 'en',
      es: 'en',
      ru: 'en',
      ar: 'en',
    },
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'rewrite',
    },
  },
});
