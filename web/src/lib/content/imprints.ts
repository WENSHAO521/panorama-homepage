import imprintsData from '@/data/imprints.json';
import type { Imprint } from '@/types';
import { getJournalsByImprint } from './journals';

const imprints = imprintsData as Imprint[];

export function getAllImprints(): Imprint[] {
  return imprints;
}

export function getImprintBySlug(slug: string): Imprint | undefined {
  return imprints.find((i) => i.slug === slug);
}

/** Active journals under an imprint, alphabetized by title for the page locale. */
export function getJournalsForImprint(imprintSlug: string, locale = 'en') {
  const collator = new Intl.Collator(locale);
  return getJournalsByImprint(imprintSlug)
    .filter((j) => j.status === 'active')
    .sort((a, b) => collator.compare(a.title, b.title) || a.slug.localeCompare(b.slug, 'en'));
}
