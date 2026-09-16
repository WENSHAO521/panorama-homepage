export interface Journal {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  imprint: string;
  disciplines: string[];
  issn?: string | null;
  eissn?: string | null;
  status: 'active' | 'forthcoming' | 'archived' | 'retired';
  openAccess: boolean;
  /** The reuse licence currently documented for the journal or item. */
  license?: string | null;
  licenseUrl?: string;
  /** Article-level notices take precedence over the journal-level summary. */
  licenseScope?: 'journal' | 'article';
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
