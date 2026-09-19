import type { ImageMetadata } from 'astro';

import BASE from '@/assets/index-logos/BASE.png';
import CLOCKSS from '@/assets/index-logos/CLOCKSS.png';
import CJWK from '@/assets/index-logos/CJWK.png';
import Crossref from '@/assets/index-logos/Crossref.svg';
import Dimensions from '@/assets/index-logos/Dimensions.png';
import DNB from '@/assets/index-logos/DNB.svg';
import DOIFoundation from '@/assets/index-logos/DOI_Foundation.png';
import GoogleScholar from '@/assets/index-logos/Google_Scholar.png';
import HongKongLibrary from '@/assets/index-logos/ft_logo.png';
import ICIIJournalsMasterList from '@/assets/index-logos/ICI_JML.png';
import ISNI from '@/assets/index-logos/ISNI.png';
import ISSN from '@/assets/index-logos/ISSN.png';
import CASHLLogo from '@/assets/index-logos/library-logo.png';
import JandLAcademicGroup from '@/assets/partners/jandl-academic-group-logo.png';
import LOCKSS from '@/assets/index-logos/LOCKSS.png';
import OpenAIRE from '@/assets/index-logos/OpenAIRE.svg';
import OpenAlex from '@/assets/index-logos/OpenAlex.png';
import PKP from '@/assets/index-logos/PKP.svg';
import PhilPapers from '@/assets/index-logos/PhilPapers.svg';
import SemanticScholar from '@/assets/index-logos/Semantic_Scholar.png';
import OUCI from '@/assets/index-logos/OUCI.webp';
import ZDB from '@/assets/index-logos/ZDB.gif';
import Zenodo from '@/assets/index-logos/Zenodo.svg';

const indexLogoAssets: Record<string, ImageMetadata> = {
  '/indexes/BASE.png': BASE,
  '/indexes/CLOCKSS.png': CLOCKSS,
  '/indexes/CJWK.png': CJWK,
  '/indexes/Crossref.svg': Crossref,
  '/indexes/Dimensions.png': Dimensions,
  '/indexes/DNB.svg': DNB,
  '/indexes/DOI_Foundation.png': DOIFoundation,
  '/indexes/Google_Scholar.png': GoogleScholar,
  '/indexes/ft_logo.png': HongKongLibrary,
  '/indexes/ICI_JML.png': ICIIJournalsMasterList,
  '/indexes/ISNI.png': ISNI,
  '/indexes/ISSN.png': ISSN,
  '/partners/library-logo.png': CASHLLogo,
  '/partners/jandl-academic-group-logo.png': JandLAcademicGroup,
  '/indexes/LOCKSS.png': LOCKSS,
  '/indexes/OpenAIRE.svg': OpenAIRE,
  '/indexes/OpenAlex.png': OpenAlex,
  '/indexes/PKP.svg': PKP,
  '/indexes/PhilPapers.svg': PhilPapers,
  '/indexes/Semantic_Scholar.png': SemanticScholar,
  '/indexes/OUCI.webp': OUCI,
  '/indexes/ZDB.gif': ZDB,
  '/indexes/Zenodo.svg': Zenodo,
};

export function getIndexLogoAsset(path?: string | null): ImageMetadata | undefined {
  return path ? indexLogoAssets[path] : undefined;
}
