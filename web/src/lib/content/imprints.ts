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

/** Active journals published under an imprint, alphabetical by title
 * (project brief §33 -- no documented editorial order exists). */
export function getJournalsForImprint(imprintSlug: string) {
  return getJournalsByImprint(imprintSlug)
    .filter((j) => j.status === 'active')
    .sort((a, b) => a.title.localeCompare(b.title));
}
