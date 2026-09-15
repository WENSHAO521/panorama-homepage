// Build-time static search index. The catalogue is assembled from the same
// data and copy used by the pages themselves, then searched in the browser so
// the public site remains deployable as a static site.
import type { APIRoute } from 'astro';
import articleData from '@/data/articles.json';
import announcementData from '@/data/announcements.json';
import partnerData from '@/data/partners.json';
import { corporateStructure, externalSystems, getOfficeDirectory, site } from '@/data/site';
import { getContent, getContentStrings } from '@/i18n/content';
import { locales, type LocaleCode } from '@/i18n/config';
import { getLocalizedImprint } from '@/i18n/catalog';
import { getImprintCopyStrings, type ImprintSlug } from '@/i18n/imprints';
import { getAboutCopy, getContactCopy, getGovernanceCopy, getPartnershipsCopy } from '@/i18n/group';
import { getResearchCopy } from '@/i18n/pages';
import { getInfrastructureCopy } from '@/i18n/infrastructure';
import { getBooksCopy, getPublishingCopy } from '@/i18n/sections';
import { getAllImprints } from '@/lib/content/imprints';
import { getAllJournals } from '@/lib/content/journals';
import { isRetractedArticle } from '@/lib/articleFilter.mjs';

const pageSourceFiles = import.meta.glob('/src/pages/**/*.astro', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const homepageSourceFiles = import.meta.glob('/src/components/homepage/*.astro', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const imprintSourceFiles = import.meta.glob('/src/components/imprint/*.astro', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface SearchRecord {
  type: 'article' | 'journal' | 'imprint' | 'announcement' | 'page';
  title: string;
  description: string;
  url: string;
  keywords: string[];
  /** Full searchable copy, kept separate from the short result description. */
  content?: string;
  locale?: LocaleCode;
  meta?: string;
  external?: boolean;
}

function flattenStrings(value: unknown, output: string[] = []): string[] {
  if (typeof value === 'string') {
    output.push(value);
  } else if (Array.isArray(value)) {
    value.forEach((item) => flattenStrings(item, output));
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach((item) => flattenStrings(item, output));
  }
  return output;
}

function compactText(values: unknown[]): string {
  return flattenStrings(values)
    .map((value) => value.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join(' ');
}

function uniqueStrings(values: unknown[]): string[] {
  const seen = new Set<string>();
  return flattenStrings(values)
    .map((value) => value.replace(/\s+/g, ' ').trim())
    .filter((value) => {
      if (!value || seen.has(value)) return false;
      seen.add(value);
      return true;
    });
}

/** Strip Astro structure while preserving the visible copy in static pages. */
function extractSourceText(source: string): string {
  return source
    .replace(/^---[\s\S]*?---/, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/\{[\s\S]*?\}/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function routeFromPageSource(filePath: string): string | null {
  const normalized = filePath.replaceAll('\\', '/');
  const route = normalized.replace(/^\/src\/pages/, '').replace(/\.astro$/, '');
  if (!route || route.includes('[')) return null;
  if (route === '/index') return '/';
  return `${route.replace(/\/+$/, '')}/`;
}

const pageContentByRoute = new Map<string, string>();
Object.entries(pageSourceFiles).forEach(([filePath, source]) => {
  const route = routeFromPageSource(filePath);
  if (route) pageContentByRoute.set(route, extractSourceText(source));
});

const homepageComponentContent = Object.values(homepageSourceFiles)
  .map(extractSourceText)
  .join(' ');

const imprintComponentContent = new Map<string, string>();
const imprintComponentPrefixes: Array<[string, string]> = [
  ['Ridgeline', 'ridgeline'],
  ['HealthNexus', 'health-nexus'],
  ['VerdantScience', 'verdant-science'],
  ['Charter', 'charter'],
  ['Threnody', 'threnody'],
];
Object.entries(imprintSourceFiles).forEach(([filePath, source]) => {
  const fileName = filePath.split('/').pop() ?? '';
  const match = imprintComponentPrefixes.find(([prefix]) => fileName.startsWith(prefix));
  if (!match) return;
  const current = imprintComponentContent.get(match[1]) ?? '';
  imprintComponentContent.set(match[1], `${current} ${extractSourceText(source)}`.trim());
});

function pageBody(path: string): string {
  const componentText = path === '/'
    ? homepageComponentContent
    : path.startsWith('/imprints/')
      ? imprintComponentContent.get(path.split('/')[2]) ?? ''
      : '';
  return compactText([pageContentByRoute.get(path) ?? '', componentText]);
}

// These pages have their own locale-aware copy records below. The remaining
// institutional and policy pages use their canonical page copy and are kept
// as shared records so they do not appear ten times in every result set.
const localizedPagePaths = new Set([
  '/',
  '/publishing/',
  '/books/',
  '/research/',
  '/infrastructure/',
  '/about/',
  '/about/governance/',
  '/about/partnerships/',
  '/about/contact/',
  '/journals/',
  '/imprints/',
]);

// Core institutional pages. Titles and descriptions remain short result copy;
// the complete visible page text is added to `content` below.
const corePages: SearchRecord[] = [
  { type: 'page', title: 'Panorama Scholarly Group', description: 'Independent scholarly publishing, research, and infrastructure organisation operating five editorial imprints and 24 peer-reviewed journals.', url: '/', keywords: ['home', 'panorama scholarly group', 'psg'] },
  { type: 'page', title: 'Scholarly Publishing', description: "Panorama Scholarly Group's publishing division: five editorial imprints across technology, health, environment, policy, and the humanities.", url: '/publishing/', keywords: ['publishing', 'imprints', 'journals', 'books'] },
  { type: 'page', title: 'About the Group', description: 'Panorama Scholarly Group brings publishing, research, and scholarly infrastructure together to support a more connected scholarly record.', url: '/about/', keywords: ['about', 'organisation', 'group'] },
  { type: 'page', title: 'Governance', description: 'How Panorama Scholarly Group structures accountability, editorial independence, and responsible stewardship of scholarly work.', url: '/about/governance/', keywords: ['governance', 'structure', 'accountability'] },
  { type: 'page', title: 'Partnerships', description: 'Institutional, library, and scholarly-service relationships that extend the reach of Panorama Scholarly Group publications.', url: '/about/partnerships/', keywords: ['partnerships', 'collaboration', 'libraries'] },
  { type: 'page', title: 'Contact', description: 'Contact Panorama Scholarly Group about publishing, research, infrastructure, and partnerships.', url: '/about/contact/', keywords: ['contact', 'email', 'address'] },
  { type: 'page', title: 'Standards', description: "Panorama Scholarly Group's editorial, ethics, and open-access standards.", url: '/standards/', keywords: ['standards', 'policy'] },
  { type: 'page', title: 'Editorial Standards', description: "Panorama Scholarly Group's editorial standards.", url: '/standards/editorial/', keywords: ['editorial', 'peer review', 'standards'] },
  { type: 'page', title: 'Publication Ethics', description: "Panorama Scholarly Group's group-wide policy for research integrity, ethical editorial practice, and stewardship of the scholarly record.", url: '/standards/ethics/', keywords: ['ethics', 'misconduct', 'integrity', 'authorship', 'retraction'] },
  { type: 'page', title: 'Open Access Policy', description: "Panorama Scholarly Group's policy for open access, copyright, licensing, fees, and responsible reuse of scholarly works.", url: '/standards/open-access/', keywords: ['open access', 'copyright', 'licensing', 'creative commons', 'oa'] },
  { type: 'page', title: 'Books', description: 'Institutional book publications from Panorama Scholarly Group.', url: '/books/', keywords: ['books', 'monographs'] },
  { type: 'page', title: 'Panorama Research Institute', description: 'Panorama Research Institute, the research division of Panorama Scholarly Group.', url: '/research/', keywords: ['research', 'institute'] },
  { type: 'page', title: 'Scholarly Infrastructure', description: "Panorama Scholarly Group's infrastructure division, including indexing, archiving, and the POSI open-science platform.", url: '/infrastructure/', keywords: ['infrastructure', 'posi', 'indexing', 'archiving'] },
  { type: 'page', title: 'Announcements', description: 'Announcements from Panorama Scholarly Group and its scholarly platforms.', url: '/news/', keywords: ['news', 'announcements', 'updates'] },
  { type: 'page', title: 'Privacy Policy', description: 'How Panorama Scholarly Group handles information connected with the public corporate website.', url: '/privacy/', keywords: ['privacy', 'personal data', 'information'] },
  { type: 'page', title: 'Terms of Use', description: 'Terms that govern access to and use of the Panorama Scholarly Group website.', url: '/terms/', keywords: ['terms', 'use', 'website'] },
  { type: 'page', title: 'Accessibility', description: "Panorama Scholarly Group's accessibility statement.", url: '/accessibility/', keywords: ['accessibility', 'wcag'] },
];

const imprintSectionRoutes: Record<string, string[]> = {
  ridgeline: ['about', 'journals'],
  'health-nexus': ['about', 'for-authors', 'journals', 'research'],
  'verdant-science': ['about', 'journals'],
  charter: ['about', 'for-authors', 'journals', 'research'],
  threnody: ['about', 'for-authors', 'journals', 'research'],
};

const imprintSectionLabels: Record<string, string> = {
  about: 'About',
  'for-authors': 'For authors',
  journals: 'Journals',
  research: 'Research',
};

function makePageRecord(
  locale: LocaleCode,
  path: string,
  title: string,
  description: string,
  keywords: unknown[],
  copy: unknown[] = [],
): SearchRecord {
  return {
    type: 'page',
    title,
    description,
    url: path,
    keywords: uniqueStrings([title, ...keywords]),
    content: compactText([copy, pageBody(path)]),
    locale,
  };
}

function buildLocalizedRecords(locale: LocaleCode): SearchRecord[] {
  const t = getContent(locale);
  const publishing = getPublishingCopy(locale);
  const books = getBooksCopy(locale);
  const research = getResearchCopy(locale);
  const infrastructure = getInfrastructureCopy(locale);
  const about = getAboutCopy(locale);
  const governance = getGovernanceCopy(locale);
  const partnerships = getPartnershipsCopy(locale);
  const contact = getContactCopy(locale);
  const localizedImprints = getAllImprints().map((imprint) => getLocalizedImprint(imprint, locale));

  const pageRecords = [
    makePageRecord(locale, '/', 'Panorama Scholarly Group', t('home.heroLede', 'Independent scholarly publishing, research, and infrastructure.'), ['home', 'group', 'publishing', 'research', 'infrastructure'], [getContentStrings(locale), corporateStructure, site]),
    makePageRecord(locale, '/publishing/', publishing.title, publishing.metaDescription, ['publishing', 'journals', 'imprints', 'books'], [publishing, corporateStructure.divisions[0]]),
    makePageRecord(locale, '/books/', books.title, books.metaDescription, ['books', 'monographs', 'authors', 'editors'], [books, externalSystems.books]),
    makePageRecord(locale, '/research/', research.title, research.metaDescription, ['research', 'institute', 'fellows', 'programmes'], [research, corporateStructure.divisions[1], externalSystems.research]),
    makePageRecord(locale, '/infrastructure/', infrastructure.title, infrastructure.metaDescription, ['infrastructure', 'indexing', 'archiving', 'preservation', 'posi'], [infrastructure, partnerData, externalSystems, corporateStructure.divisions[2]]),
    makePageRecord(locale, '/about/', about.title, about.metaDescription, ['about', 'group', 'organisation', 'mission'], [about, corporateStructure, site]),
    makePageRecord(locale, '/about/governance/', governance.title, governance.metaDescription, ['governance', 'accountability', 'editorial independence'], [governance, corporateStructure]),
    makePageRecord(locale, '/about/partnerships/', partnerships.title, partnerships.metaDescription, ['partnerships', 'libraries', 'institutions'], [partnerships, partnerData]),
    makePageRecord(locale, '/about/contact/', contact.title, contact.metaDescription, ['contact', 'email', 'office', 'address'], [contact, getOfficeDirectory(locale), site.email, site.legalName]),
    makePageRecord(locale, '/journals/', t('journals.title', 'Our journals'), t('journals.metaDescription', 'Explore the journals of Panorama Scholarly Group.'), ['journals', 'articles', 'periodicals', 'research'], [t('journals.overline'), t('journals.lede'), getAllJournals()]),
    makePageRecord(locale, '/imprints/', t('imprints.editorialImprints', 'Editorial imprints'), t('imprints.metaDescription', 'Explore the editorial imprints of Panorama Scholarly Group.'), ['imprints', 'brands', 'editorial identities'], [t('imprints.titleOne'), t('imprints.titleTwo'), t('imprints.lede'), localizedImprints]),
  ];

  const imprintRecords: SearchRecord[] = localizedImprints.map((imprint) => {
    const brand = imprint.slug as ImprintSlug;
    const path = `/imprints/${imprint.slug}/`;
    return {
      type: 'imprint',
      title: imprint.name,
      description: imprint.description,
      url: path,
      keywords: uniqueStrings([imprint.scope, imprint.disciplines ?? [], 'imprint', 'brand']),
      content: compactText([imprint, getImprintCopyStrings(brand, locale), pageBody(path)]),
      locale,
    };
  });

  const sectionRecords: SearchRecord[] = localizedImprints.flatMap((imprint) => {
    const brand = imprint.slug as ImprintSlug;
    return (imprintSectionRoutes[imprint.slug] ?? []).map((section) => {
      const path = `/imprints/${imprint.slug}/${section}/`;
      const sectionLabel = imprintSectionLabels[section] ?? section;
      return makePageRecord(
        locale,
        path,
        `${imprint.name} — ${sectionLabel}`,
        imprint.description,
        [imprint.name, imprint.scope, sectionLabel, imprint.disciplines ?? []],
        [imprint, getImprintCopyStrings(brand, locale)],
      );
    });
  });

  return [...pageRecords, ...imprintRecords, ...sectionRecords];
}

function buildSharedRecords(): SearchRecord[] {
  const journalRecords: SearchRecord[] = getAllJournals().map((journal) => {
    const imprint = getAllImprints().find((item) => item.slug === journal.imprint);
    return {
      type: 'journal',
      title: journal.title,
      description: journal.description ?? `${journal.title}, a Panorama Scholarly Group journal.`,
      url: journal.journalUrl,
      keywords: uniqueStrings([
        journal.shortTitle ?? journal.id,
        journal.imprint,
        imprint?.name,
        imprint?.scope,
        ...journal.disciplines,
        journal.issn,
        journal.status,
      ]),
      content: compactText([journal, imprint]),
      meta: [imprint?.name, journal.status, journal.issn].filter(Boolean).join(' / '),
      external: true,
    };
  });

  const articleRecords: SearchRecord[] = articleData.articles
    .filter((article) => !isRetractedArticle(article))
    .map((article) => {
      const journalArticleUrl = 'journalArticleUrl' in article && typeof article.journalArticleUrl === 'string'
        ? article.journalArticleUrl
        : '';
      const articleUrl = journalArticleUrl || article.url;
      return {
        type: 'article',
        title: article.title,
        description: article.summary,
        url: articleUrl,
        keywords: uniqueStrings([
          article.doi,
          article.journal,
          article.journalSlug,
          article.journalUrl,
          article.publishedAt,
          ...(article.authors ?? []),
        ]),
        content: compactText([article.title, article.summary, article.authors, article.journal, article.doi, article.journalUrl]),
        meta: [article.journal, article.publishedAt, article.doi ? `DOI ${article.doi}` : ''].filter(Boolean).join(' / '),
        external: true,
      };
    });

  const announcementRecords: SearchRecord[] = announcementData.announcements.map((announcement) => ({
    type: 'announcement',
    title: announcement.title,
    description: announcement.summary,
    url: announcement.href,
    keywords: uniqueStrings([announcement.source, announcement.sourceLabel, announcement.type, announcement.date]),
    content: compactText([announcement.title, announcement.summary, announcement.sourceLabel, announcement.type, announcement.date]),
    meta: [announcement.sourceLabel.replace(/\s+[—–]\s+/g, ' / '), announcement.type, announcement.date]
      .filter(Boolean)
      .join(' / '),
    external: true,
  }));

  const sharedPageRecords = corePages
    .filter((record) => !localizedPagePaths.has(record.url))
    .map((record) => ({
      ...record,
      content: compactText([record, pageBody(record.url)]),
    }));

  return [...sharedPageRecords, ...journalRecords, ...articleRecords, ...announcementRecords];
}

function buildIndex(): SearchRecord[] {
  const localizedRecords = locales.flatMap((locale) => buildLocalizedRecords(locale.code));
  return [...localizedRecords, ...buildSharedRecords()];
}

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(buildIndex()), {
    headers: { 'Content-Type': 'application/json' },
  });
};
