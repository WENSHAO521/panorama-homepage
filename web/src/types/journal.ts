export interface Journal {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  imprint: string;
  disciplines: string[];
  issn?: string;
  eissn?: string;
  status: 'active' | 'forthcoming' | 'archived' | 'retired';
  openAccess: boolean;
  frequency?: string;
  description?: string;
  cover?: string;
  journalUrl: string;
  submissionUrl?: string;
  note?: string;
  /**
   * Explicit, documented homepage-curation flag -- not an editorial
   * ranking. Exactly one per imprint, each with a confirmed real ISSN
   * and no known data-quality flag (see docs/HOMEPAGE.md §Featured
   * journal selection for the full rationale per journal).
   */
  featured?: boolean;
}
