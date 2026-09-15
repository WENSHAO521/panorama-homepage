// JSON-LD builders. Organization has been used since BaseLayout existed.
// BreadcrumbList and Periodical are added in Round 6 (Publishing/Journals/
// Imprints), now that pages exist with real data to carry them --
// ScholarlyArticle is still not used (project brief §43: a journal TITLE
// is not an article). Periodical only sets properties the dataset
// actually confirms (see docs/JOURNAL-DATA-AUDIT.md) -- no fabricated
// identifiers, no impact/indexing claims (brief §68).
import { site, externalSystems } from '@/data/site';
import type { Journal } from '@/types';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/brand/psg/logo.svg`,
    email: site.email,
    address: site.offices.map((office) => ({
      '@type': 'PostalAddress',
      streetAddress: office.streetAddress.en,
      addressLocality: office.addressLocality.en,
      addressCountry: office.addressCountry,
    })),
    sameAs: Object.values(externalSystems),
  };
}

export function breadcrumbJsonLd(trail: { label: string; path?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.path ? { item: `${site.url}${crumb.path}` } : {}),
    })),
  };
}

export function periodicalJsonLd(journal: Journal, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Periodical',
    name: journal.title,
    url: `${site.url}${path}`,
    ...(journal.issn ? { issn: journal.issn } : {}),
    ...(journal.description ? { description: journal.description } : {}),
    publisher: { '@type': 'Organization', name: site.name, legalName: site.legalName },
  };
}
