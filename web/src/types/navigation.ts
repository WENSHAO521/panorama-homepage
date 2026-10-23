export interface NavItem {
  label: string;
  /** Omit for a pure grouping node (a mega-menu column heading with no link of its own). */
  path?: string;
  description?: string;
  /** True for a link to an independent PSG subdomain -- opens in a new tab (see ExternalLink.astro). */
  external?: boolean;
  /**
   * One level = a flat dropdown/mega-menu column. Two levels = the parent
   * renders each child as its own mega-menu column (see MegaMenu.astro).
   */
  children?: NavItem[];
  /** Imprint colour for a mega-menu row (the Publishing menu's imprint list). */
  accent?: string;
  /** Number of active journals, shown beside an imprint row. */
  count?: number;
  /** Journal cover paths for a mega-menu cover column (a column with no children). */
  covers?: string[];
}

export interface RedirectRule {
  from: string;
  to: string | null;
  type: 301 | 410 | 'review';
  notes?: string;
}
