export interface Partner {
  name: string;
  logo: string;
  url?: string;
}

export interface PartnerCategory {
  title: string;
  titleKey: string;
  partners: Partner[];
}

export const partnerCategories: PartnerCategory[] = [
  {
    title: 'Standards & Identifiers',
    titleKey: 'partners.standards',
    partners: [
      { name: 'Crossref', logo: 'https://assets.crossref.org/logo/crossref-logo-200.svg', url: 'https://www.crossref.org' },
      { name: 'DOI', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/DOI_Foundation.svg/330px-DOI_Foundation.svg.png', url: 'https://www.doi.org' },
      { name: 'ISSN', logo: 'https://portal.issn.org/sites/all/themes/customissn/img/img_0160x0050px_logo_issn.svg', url: 'https://www.issn.org' },
      { name: 'ISNI', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/ISNI_logo_recreation.svg/800px-ISNI_logo_recreation.svg.png', url: 'https://www.isni.org' }
    ]
  },
  {
    title: 'Indexing & Abstracting',
    titleKey: 'partners.indexing',
    partners: [
      { name: 'Google Scholar', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Google_Scholar_logo.png', url: 'https://scholar.google.com' },
      { name: 'Scilit', logo: 'https://www.scilit.com/_ipx/q_80&s_120x48/scilit.svg', url: 'https://www.scilit.com' },
      { name: 'Dimensions', logo: 'https://www.dimensions.ai/wp-content/themes/dimensions-2023.1/dist/images/dimensions-2024-logo.png', url: 'https://www.dimensions.ai' },
      { name: 'Semantic Scholar', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Semantic_Scholar_logo.svg/330px-Semantic_Scholar_logo.svg.png', url: 'https://www.semanticscholar.org' },
      { name: 'OUCI', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Open_Ukrainian_Citation_Index_logo.png/330px-Open_Ukrainian_Citation_Index_logo.png', url: 'https://ouci.dntb.gov.ua' },
      { name: 'ICI', logo: 'https://journals.indexcopernicus.com/img/ici2.png', url: 'https://journals.indexcopernicus.com' },
      { name: 'BASE', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/BASE_search_engine_logo.svg/330px-BASE_search_engine_logo.svg.png', url: 'https://base-search.net' },
      { name: 'OpenAlex', logo: 'https://i0.wp.com/blog.openalex.org/wp-content/uploads/2025/09/image-3.png', url: 'https://openalex.org' }
    ]
  },
  {
    title: 'Discovery & Visibility',
    titleKey: 'partners.discovery',
    partners: [
      { name: 'WorldCat', logo: 'https://search.worldcat.org/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F29926%2F1603118905-worldcat-logo.png&w=1920&q=75', url: 'https://www.worldcat.org' },
      { name: 'OpenAIRE', logo: 'https://www.openaire.eu/templates/yootheme/cache/27/Logo_Horizontal-27555593.webp', url: 'https://www.openaire.eu' },
      { name: 'PKP', logo: 'https://pkp.sfu.ca/wp-content/uploads/2022/10/logo.svg', url: 'https://pkp.sfu.ca' },
      { name: 'ResearchGate', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/ResearchGate_logo.svg/330px-ResearchGate_logo.svg.png', url: 'https://www.researchgate.net' }
    ]
  },
  {
    title: 'Archiving & Preservation',
    titleKey: 'partners.archiving',
    partners: [
      { name: 'CLOCKSS', logo: 'https://clockss.org/wp-content/uploads/2023/04/clockss-logo.png', url: 'https://clockss.org' },
      { name: 'LOCKSS', logo: 'https://www.lockss.org/sites/g/files/sbiybj27616/files/2024-03/lockss-program-800x235_0.png', url: 'https://www.lockss.org' },
      { name: 'DNB', logo: 'https://www.dnb.de/SiteGlobals/Frontend/DNBWeb/Images/logo.svg', url: 'https://www.dnb.de' },
      { name: 'Zenodo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Zenodo-gradient-square.svg/220px-Zenodo-gradient-square.svg.png', url: 'https://zenodo.org' }
    ]
  }
];
