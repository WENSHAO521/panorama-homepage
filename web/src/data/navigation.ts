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
import { localizePath } from '@/i18n/utils';

const imprints = imprintsData as Imprint[];

export const primaryNav: NavItem[] = [
  { label: 'Home', path: '/' },
  {
    label: 'Publishing',
    path: '/publishing/',
    children: [
      {
        label: 'Explore',
        children: [
          { label: 'Journals', path: '/journals/', description: '24 journals across five imprints' },
          { label: 'Imprints', path: '/imprints/', description: 'Five editorial identities, one group' },
        ],
      },
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
      { label: 'POSI', path: externalSystems.posi, external: true, description: 'Open indexing, lifecycle ratings, and citation analytics' },
      { label: 'Profiles', path: externalSystems.profiles, external: true, description: 'Public profiles for editors, reviewers, and contributors' },
      { label: 'Credentials', path: externalSystems.credentials, external: true, description: 'Verification for editorial and reviewer credentials' },
    ],
  },
  { label: 'Books', path: '/books/' },
  {
    label: 'Standards',
    path: '/standards/',
    children: [
      { label: 'Editorial Standards', path: '/standards/editorial/', description: 'Editorial judgment, peer review, and the scholarly record' },
      { label: 'Publication Ethics', path: '/standards/ethics/', description: 'Research integrity, concerns, and ethical practice' },
      { label: 'Open Access Policy', path: '/standards/open-access/', description: 'Access, licensing, and reuse of scholarly work' },
      { label: 'Accessibility', path: '/accessibility/', description: 'Accessible public information and digital publishing' },
    ],
  },
  { label: 'Announcements', path: '/news/' },
  {
    label: 'About',
    path: '/about/',
    children: [
      { label: 'Governance', path: '/about/governance/', description: 'Accountability that protects independent work' },
      { label: 'Partnerships', path: '/about/partnerships/', description: 'Relationships that extend scholarly reach' },
      { label: 'Contact', path: '/about/contact/', description: 'Find the right team for your question' },
    ],
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
    items: [
      { label: 'Journals', path: '/journals/' },
      { label: 'Books', path: '/books/' },
      { label: 'Imprints', path: '/imprints/' },
    ],
  },
  {
    title: 'Research & infrastructure',
    items: [
      { label: 'Research Institute', path: '/research/' },
      { label: 'Infrastructure', path: '/infrastructure/' },
      { label: 'POSI', path: externalSystems.posi, external: true },
      { label: 'Profiles', path: externalSystems.profiles, external: true },
    ],
  },
  {
    title: 'Standards',
    items: [
      { label: 'Overview', path: '/standards/' },
      { label: 'Editorial Standards', path: '/standards/editorial/' },
      { label: 'Publication Ethics', path: '/standards/ethics/' },
      { label: 'Open Access', path: '/standards/open-access/' },
    ],
  },
  {
    title: 'Group',
    items: [
      { label: 'About', path: '/about/' },
      { label: 'Governance', path: '/about/governance/' },
      { label: 'Partnerships', path: '/about/partnerships/' },
      { label: 'Contact', path: '/about/contact/' },
      { label: 'Announcements', path: '/news/' },
    ],
  },
];

// Research and infrastructure share one footer column so the footer can expose
// the main destinations without becoming a five-column wall of links. The
// platform row below provides the visual route to the same scholarly systems.
// Credentials has no approved logo asset (see docs/ASSET-AUDIT.md), so it
// remains available from the header's Infrastructure menu only.
export const footerPlatformLogos: { label: string; path: string; logo: string }[] = [
  { label: 'Research Institute', path: externalSystems.research, logo: '/brand/psg/platforms/research-institute-logo.svg' },
  { label: 'POSI', path: externalSystems.posi, logo: '/brand/psg/platforms/posi-logo.svg' },
  { label: 'Profiles', path: externalSystems.profiles, logo: '/brand/psg/platforms/editorial-directory-logo-transparent.png' },
];

export const legalNav: NavItem[] = [
  { label: 'Privacy', path: '/privacy/' },
  { label: 'Terms', path: '/terms/' },
  { label: 'Accessibility', path: '/accessibility/' },
];

function localizeItem(item: NavItem, locale: string): NavItem {
  const labels = getNavigationLabels(locale);
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
    Accessibility: labels.accessibility,
    'Research Institute': labels.researchInstitute,
    Profiles: labels.profiles,
    Credentials: labels.credentials,
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
