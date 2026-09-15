import journalsData from '@/data/journals.json';
import type { Journal } from '@/types';

const journals = journalsData as Journal[];

export function getAllJournals(): Journal[] {
  return journals;
}

/** Excludes `retired` records -- what the directory, search index, and imprint
 * journal lists all mean by "journals" unless a retired title is explicitly
 * being surfaced (e.g. GPPGR's own detail page). See docs/JOURNAL-DATA-AUDIT.md. */
export function getActiveJournals(): Journal[] {
  return journals.filter((j) => j.status === 'active');
}

export function getJournalBySlug(slug: string): Journal | undefined {
  return journals.find((j) => j.slug === slug);
}

export function getJournalsByImprint(imprintSlug: string): Journal[] {
  return journals.filter((j) => j.imprint === imprintSlug);
}

export function getJournalsByDiscipline(discipline: string): Journal[] {
  return journals.filter((j) => j.disciplines.includes(discipline));
}

/** Sorted alphabetically -- the directory's discipline filter vocabulary,
 * derived from data rather than hand-maintained (project brief §12). */
export function getJournalDisciplines(): string[] {
  const set = new Set<string>();
  journals.forEach((j) => j.disciplines.forEach((d) => set.add(d)));
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function getJournalStatuses(): Journal['status'][] {
  const set = new Set<Journal['status']>();
  journals.forEach((j) => set.add(j.status));
  return [...set];
}

/** See docs/HOMEPAGE.md §Featured journal selection for the per-journal rationale. */
export function getFeaturedJournals(): Journal[] {
  return journals.filter((j) => j.featured === true);
}

/**
 * Deterministic related-journal ranking (project brief §25): same imprint
 * first, then shared-discipline count, ties broken alphabetically by title.
 * Never the journal itself, never retired titles, capped by `limit`.
 */
export function getRelatedJournals(journal: Journal, limit = 4): Journal[] {
  return journals
    .filter((j) => j.slug !== journal.slug && j.status === 'active')
    .map((j) => {
      const sharedDisciplines = j.disciplines.filter((d) => journal.disciplines.includes(d)).length;
      const sameImprint = j.imprint === journal.imprint ? 1 : 0;
      return { journal: j, score: sameImprint * 100 + sharedDisciplines };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.journal.title.localeCompare(b.journal.title))
    .slice(0, limit)
    .map((entry) => entry.journal);
}
