import { getNavigationLabels } from '@/i18n/navigation';
import { localizePath } from '@/i18n/utils';

/** Imprints whose Research and For-authors pages use ImprintRouteSectionPage. */
export type RouteImprint = 'ridgeline' | 'verdant-science';
type Copy = [key: string, fallback: string];

interface RouteArea {
  titleKey: string;
  title: string;
  bodyKey: string;
  body: string;
  /** Journal slugs that publish in this area. */
  journals: string[];
}

interface RouteContent {
  wallpaper: string;
  research: { title: Copy[]; lede: Copy };
  authors: { title: Copy[]; lede: Copy };
  areasKicker: Copy;
  areasMeta: Copy;
  areas: RouteArea[];
  exploreKey: string;
  submitKey: string;
  footerTagline: string;
}

// Hero copy reuses each landing page's purpose and author blocks, which are
// already translated for every locale.
export const routeSectionContent: Record<RouteImprint, RouteContent> = {
  ridgeline: {
    wallpaper: '/images/publishing/ridgeline-wallpaper-1920.webp',
    research: {
      title: [['purposeTitleOne', 'Knowledge'], ['purposeTitleTwo', 'across disciplines'], ['purposeTitleThree', 'for real-world progress.']],
      lede: ['purposeBody', 'Ridgeline publishes rigorous, independent research at the intersection of technology, engineering and society. The challenges we face require more than single-discipline answers.'],
    },
    authors: {
      title: [['authorsTitleOne', 'Help shape a more'], ['authorsTitleTwo', 'livable tomorrow.']],
      lede: ['authorsBody', 'We welcome original research, reviews and perspectives from around the world.'],
    },
    areasKicker: ['areasKicker', 'What we publish'],
    areasMeta: ['areasMeta', 'Disciplines for a brighter tomorrow.'],
    areas: [
      { titleKey: 'section.area.ai.title', title: 'Artificial Intelligence', bodyKey: 'section.area.ai.body', body: 'Methods, systems and social consequences.', journals: ['afs'] },
      { titleKey: 'section.area.engineering.title', title: 'Engineering Systems', bodyKey: 'section.area.engineering.body', body: 'Design, operation and performance in context.', journals: ['jesa'] },
      { titleKey: 'section.area.sustainability.title', title: 'Sustainability', bodyKey: 'section.area.sustainability.body', body: 'Evidence for resilient people, institutions and environments.', journals: ['pfr'] },
      { titleKey: 'section.area.society.title', title: 'Society & Governance', bodyKey: 'section.area.society.body', body: 'Policy, ethics and institutions in practice.', journals: ['afs'] },
      { titleKey: 'section.area.frontiers.title', title: 'Interdisciplinary Frontiers', bodyKey: 'section.area.frontiers.body', body: 'Research at boundaries where disciplines meet.', journals: ['pfr'] },
    ],
    exploreKey: 'exploreJournals',
    submitKey: 'submitResearch',
    footerTagline: 'Ideas for a more livable tomorrow.',
  },
  'verdant-science': {
    wallpaper: '/images/publishing/verdant-science-wallpaper-1600.webp',
    research: {
      title: [['researchTitle', 'Research today for a more resilient tomorrow.']],
      lede: ['researchBody', 'Verdant Science publishes rigorous, solution-oriented research that bridges environmental systems, human communities, and long-term planetary wellbeing.'],
    },
    authors: {
      title: [['authorsTitle', 'A trusted home for impactful research.']],
      lede: ['authorsBody', 'We welcome original research, reviews, and perspectives that make complex environmental and life-science questions clearer, more useful, and more open to the communities they affect.'],
    },
    areasKicker: ['section.about.fieldsKicker', 'Fields of inquiry'],
    areasMeta: ['section.about.fieldsMeta', 'Connected questions across a living planet.'],
    areas: [
      { titleKey: 'section.field.climate.title', title: 'Climate and Earth systems', bodyKey: 'section.field.climate.body', body: 'Climate dynamics, sustainability transitions, environmental data, and planetary change.', journals: ['csgs'] },
      { titleKey: 'section.field.food.title', title: 'Food and agriculture', bodyKey: 'section.field.food.body', body: 'Food safety, resilient supply chains, nutrition, and the future of sustainable production.', journals: ['fsss'] },
      { titleKey: 'section.field.land.title', title: 'Land and biodiversity', bodyKey: 'section.field.land.body', body: 'Landscapes, ecosystems, conservation, and the relationships that sustain living systems.', journals: ['csgs', 'rggd'] },
      { titleKey: 'section.field.rural.title', title: 'Rural governance', bodyKey: 'section.field.rural.body', body: 'Institutions, communities, policy, and practical routes to inclusive green development.', journals: ['rggd'] },
      { titleKey: 'section.field.health.title', title: 'Health and activity', bodyKey: 'section.field.health.body', body: 'Movement, wellbeing, public life, and the social conditions of healthier communities.', journals: ['ses'] },
    ],
    exploreKey: 'exploreJournals',
    submitKey: 'submitManuscript',
    footerTagline: 'Research for a more resilient world.',
  },
};

/** The five-item imprint menu, pointing at real pages for every item. */
export function getImprintNavigation(slug: RouteImprint, locale: string) {
  const labels = getNavigationLabels(locale);
  const base = `/imprints/${slug}/`;
  return [
    { key: 'home', label: labels.home, href: localizePath(base, locale) },
    { key: 'journals', label: labels.journals, href: localizePath(`${base}journals/`, locale) },
    { key: 'research', label: labels.research, href: localizePath(`${base}research/`, locale) },
    { key: 'for-authors', label: labels.forAuthors, href: localizePath(`${base}for-authors/`, locale) },
    { key: 'about', label: labels.about, href: localizePath(`${base}about/`, locale) },
  ];
}
