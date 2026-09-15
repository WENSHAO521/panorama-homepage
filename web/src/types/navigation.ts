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
}

export interface RedirectRule {
  from: string;
  to: string | null;
  type: 301 | 410 | 'review';
  notes?: string;
}
