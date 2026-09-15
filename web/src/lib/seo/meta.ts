// Reusable SEO helpers, consumed by BaseLayout and page frontmatter.
// Deliberately thin: no structured-data generation for content types
// that don't exist yet (Periodical/ScholarlyArticle/Book schema is
// Round 12, once the content model is real).
import { site } from '@/data/site';

export interface PageMeta {
  title: string;
  description: string;
  path: string;
}

export function canonicalUrl(path: string): string {
  return `${site.url}${path}`;
}

export function pageTitle(title: string): string {
  return `${title} | ${site.name}`;
}
