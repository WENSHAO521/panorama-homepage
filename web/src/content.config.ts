// Astro Content Collections config (Astro 5+ convention: src/content.config.ts,
// not src/content/config.ts). Three collections per the project brief §9 —
// news, pages, policies. All three are empty in Version 1: no news items,
// static pages, or policy documents have been migrated from the legacy
// site yet (that's bulk content migration, explicitly deferred past V1 —
// see project brief §31). Schemas exist so Round 2+ has a typed contract
// to write content against.
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const news = defineCollection({
  loader: glob({ pattern: ['**/*.{md,mdx}', '!README.md'], base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    imprint: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: ['**/*.{md,mdx}', '!README.md'], base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const policies = defineCollection({
  loader: glob({ pattern: ['**/*.{md,mdx}', '!README.md'], base: './src/content/policies' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    effectiveDate: z.coerce.date().optional(),
  }),
});

export const collections = { news, pages, policies };
