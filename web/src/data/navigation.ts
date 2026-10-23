// Single source of truth for site navigation -- header, mega menus,
// mobile nav, and footer all read from here. Nothing below is
// hard-coded a second time in a component.
//
// Mega-menu content note (see docs/NAVIGATION.md for the full
// per-category rationale): Publishing, Infrastructure, Standards and About
// get `children` (real destinations only -- no placeholder items). Research,
// Books, Journals and News stay plain links. "Index"
// (mentioned in earlier planning as a fourth
// infrastructure platform) is deliberately omitted: the only verified
// source of PSG's external subdomains is the legacy site's own
// Organization JSON-LD (`web/src/data/site.ts`), and it does not list
// an `index.panorama-sg.com` -- adding it here would be fabricating a
// URL, which the project brief prohibits.
import type { NavItem } from '@/types';
import { externalSystems } from '@/data/site';
import imprintsData from '@/data/imprints.json';
import type { Imprint } from '@/types';
import { getNavigationLabels } from '@/i18n/navigation';
import { getInfrastructureCopy } from '@/i18n/infrastructure';
import { localizePath } from '@/i18n/utils';

const imprints = imprintsData as Imprint[];

// Section children shared by the header menu, the page sub-nav strip
// (SectionSubnav.astro) and the footer, so the three never list different
// pages. The first entry of each list is the section landing page; the menu
// leaves it out because the mega panel already links it as its overview row.
export type SectionKey = 'publishing' | 'infrastructure' | 'standards' | 'about';

export const sectionNav: Record<SectionKey, { label: string; items: NavItem[] }> = {
  publishing: {
    label: 'Publishing',
    items: [
      { label: 'Overview', path: '/publishing/' },
      { label: 'Journals', path: '/journals/', description: '24 journals across five imprints' },
      { label: 'Imprints', path: '/imprints/', description: 'Five editorial identities, one group' },
    ],
  },
  // On-page anchors: Infrastructure is one long page, so its strip jumps
  // between sections instead of between pages.
  infrastructure: {
    label: 'Infrastructure',
    items: [
      { label: 'DOI registration', path: '/infrastructure/#doi', description: 'Crossref registration under prefix 10.63802' },
      { label: 'Discovery and indexing', path: '/infrastructure/#discovery', description: 'Indexes and discovery services that list our journals' },
      { label: 'Preservation', path: '/infrastructure/#preservation', description: 'CLOCKSS, LOCKSS, and PKP preservation networks' },
      { label: 'Identifiers', path: '/infrastructure/#identifiers', description: 'ISSN, ISNI, and national library records' },
    ],
  },
  standards: {
    label: 'Standards',
    items: [
      { label: 'Overview', path: '/standards/' },
      { label: 'Editorial Standards', path: '/standards/editorial/', description: 'Editorial judgment, peer review, and the scholarly record' },
      { label: 'Publication Ethics', path: '/standards/ethics/', description: 'Research integrity, concerns, and ethical practice' },
      { label: 'Open Access', path: '/standards/open-access/', description: 'Access, licensing, and reuse of scholarly work' },
      { label: 'Research Assessment', path: '/standards/research-assessment/', description: 'DORA, responsible metrics, and scholarly contribution' },
      { label: 'DOI Allocation', path: '/standards/doi-policy/', description: 'When and how articles and datasets receive a DOI' },
      { label: 'Accessibility', path: '/accessibility/', description: 'Accessible public information and digital publishing' },
    ],
  },
  about: {
    label: 'About',
    items: [
      { label: 'About the Group', path: '/about/' },
      { label: 'Governance', path: '/about/governance/', description: 'Accountability that protects independent work' },
      { label: 'Partnerships', path: '/about/partnerships/', description: 'Relationships that extend scholarly reach' },
      { label: 'Contact', path: '/about/contact/', description: 'Find the right team for your question' },
    ],
  },
};

const sectionChildren = (key: SectionKey) => sectionNav[key].items.slice(key === 'infrastructure' ? 0 : 1);

const independentPlatforms: NavItem[] = [
  { label: 'POSI', path: externalSystems.posi, external: true, description: 'Open indexing, lifecycle ratings, and citation analytics' },
  { label: 'Profiles', path: externalSystems.profiles, external: true, description: 'Public profiles for editors, reviewers, and contributors' },
  { label: 'Credentials', path: externalSystems.credentials, external: true, description: 'Verification for editorial and reviewer credentials' },
];

export const primaryNav: NavItem[] = [
  {
    label: 'Publishing',
    path: '/publishing/',
    children: [
      { label: 'Explore', children: sectionChildren('publishing') },
      {
        label: 'Imprints',
        children: imprints.map((imprint) => ({
          label: imprint.name,
          path: `/imprints/${imprint.slug}/`,
          description: {
            ridgeline: 'Technology, engineering, and applied AI',
            'health-nexus': 'Medicine, health, and population wellbeing',
            'verdant-science': 'Environment and life sciences',
            charter: 'Policy, law, and governance',
            threnody: 'Humanities, arts, and philosophy',
          }[imprint.slug],
        })),
      },
    ],
  },
  { label: 'Research', path: '/research/' },
  {
    label: 'Infrastructure',
    path: '/infrastructure/',
    children: [
      { label: 'On this site', children: sectionChildren('infrastructure') },
      { label: 'Independent platforms', children: independentPlatforms },
    ],
  },
  { label: 'Books', path: '/books/' },
  {
    label: 'Standards',
    path: '/standards/',
    children: sectionChildren('standards'),
  },
  { label: 'Announcements', path: '/news/' },
  {
    label: 'About',
    path: '/about/',
    children: sectionChildren('about'),
  },
];

export const utilityNav: NavItem[] = [
  { label: 'Journals', path: '/journals/' },
  { label: 'Search', path: '/search/' },
];

export interface FooterGroup {
  title: string;
  items: NavItem[];
}

export const footerGroups: FooterGroup[] = [
  {
    title: 'Publishing',
    items: [...sectionNav.publishing.items, { label: 'Books', path: '/books/' }],
  },
  {
    title: 'Research & infrastructure',
    items: [
      { label: 'Research Institute', path: '/research/' },
      { label: 'Infrastructure', path: '/infrastructure/' },
      ...independentPlatforms.map(({ description, ...item }) => item),
    ],
  },
  {
    title: 'Standards',
    items: sectionNav.standards.items,
  },
  {
    title: 'Group',
    items: [...sectionNav.about.items, { label: 'Announcements', path: '/news/' }],
  },
];

// Research and infrastructure share one footer column so the footer can expose
// the main destinations without becoming a five-column wall of links. The
// platform row below provides the visual route to the same scholarly systems.
// Credentials has no approved logo asset (see docs/ASSET-AUDIT.md), so it
// appears in the footer as a text link only.
export const footerPlatformLogos: { label: string; path: string; logo: string; wide?: boolean }[] = [
  { label: 'Research Institute', path: externalSystems.research, logo: '/brand/psg/platforms/research-institute-logo.svg' },
  { label: 'POSI', path: externalSystems.posi, logo: '/brand/psg/platforms/posi-logo.svg', wide: true },
  { label: 'Profiles', path: externalSystems.profiles, logo: '/brand/psg/platforms/editorial-directory-logo-transparent.png' },
];

export const legalNav: NavItem[] = [
  { label: 'Privacy', path: '/privacy/' },
  { label: 'Terms', path: '/terms/' },
  { label: 'Accessibility', path: '/accessibility/' },
];

function localizeItem(item: NavItem, locale: string): NavItem {
  const labels = getNavigationLabels(locale);
  const infrastructure = getInfrastructureCopy(locale);
  const labelMap: Record<string, string> = {
    Home: labels.home,
    Publishing: labels.publishing,
    Research: labels.research,
    Infrastructure: labels.infrastructure,
    Books: labels.books,
    Standards: labels.standards,
    Announcements: labels.announcements,
    About: labels.about,
    Journals: labels.journals,
    Search: labels.search,
    Imprints: labels.imprints,
    Explore: labels.explore,
    'About the Group': labels.aboutGroup,
    Governance: labels.governance,
    Partnerships: labels.partnerships,
    Contact: labels.contact,
    Overview: labels.overview,
    'Editorial Standards': labels.editorialStandards,
    'Publication Ethics': labels.publicationEthics,
    'Open Access': labels.openAccess,
    'Open Access Policy': labels.openAccess,
    'Research Assessment': labels.researchAssessment,
    Accessibility: labels.accessibility,
    'Research Institute': labels.researchInstitute,
    Profiles: labels.profiles,
    Credentials: labels.credentials,
    'DOI Allocation': labels.doiAllocation,
    'On this site': labels.onThisSite,
    'Independent platforms': labels.independentPlatforms,
    'DOI registration': infrastructure.doi,
    'Discovery and indexing': infrastructure.discovery,
    Preservation: infrastructure.preservation,
    Identifiers: infrastructure.identifiers,
  };

  return {
    ...item,
    label: labelMap[item.label] ?? item.label,
    path: item.path && !item.external ? localizePath(item.path, locale) : item.path,
    // Descriptions are intentionally omitted until their full translations
    // are reviewed; this prevents a localized menu from mixing languages.
    description: locale === 'en' ? item.description : undefined,
    children: item.children?.map((child) => localizeItem(child, locale)),
  };
}

export function getPrimaryNav(locale = 'en'): NavItem[] {
  return primaryNav.map((item) => localizeItem(item, locale));
}

export function getSectionNav(key: SectionKey, locale = 'en'): { label: string; items: NavItem[] } {
  const section = sectionNav[key];
  return {
    label: localizeItem({ label: section.label }, locale).label,
    items: section.items.map((item) => localizeItem(item, locale)),
  };
}

export function getUtilityNav(locale = 'en'): NavItem[] {
  return utilityNav.map((item) => localizeItem(item, locale));
}

export function getFooterGroups(locale = 'en'): FooterGroup[] {
  const labels = getNavigationLabels(locale);
  return footerGroups.map((group) => ({
    ...group,
    title: group.title === 'Research & infrastructure' ? labels.footerResearchInfrastructure : group.title === 'Group' ? labels.footerGroup : localizeItem({ label: group.title }, locale).label,
    items: group.items.map((item) => localizeItem(item, locale)),
  }));
}

export function getLegalNav(locale = 'en'): NavItem[] {
  const labels = getNavigationLabels(locale);
  return legalNav.map((item) => ({
    ...item,
    label: item.label === 'Privacy' ? labels.privacy : item.label === 'Terms' ? labels.terms : labels.accessibility,
    path: localizePath(item.path!, locale),
  }));
}
