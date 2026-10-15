import { badgesUrl, declarationUrl, signersUrl } from './research-assessment';

export interface WebsiteUiUpdateCopy {
  title: string;
  description: string;
  intro: string;
  paragraphs: string[];
  changesTitle: string;
  changes: string[];
  closing: string;
}

const websiteUiUpdateCopy: WebsiteUiUpdateCopy = {
  title: 'A renewed digital experience for Panorama Scholarly Group',
  description: 'Panorama Scholarly Group completed a comprehensive update to the user interface of its website on 15 September 2026, bringing a more consistent and clearer experience across the Group site and its editorial imprints.',
  intro: 'On 15 September 2026, Panorama Scholarly Group completed a comprehensive update to the user interface of its website.',
  paragraphs: [
    "The update brings the Group website and its editorial imprints into a more consistent visual and navigational system. It clarifies the relationship between publishing, research, infrastructure, standards, and the Group's scholarly services.",
    'It also refines responsive layouts and the presentation of key actions and information, so that authors, editors, researchers, and readers can move through the site with greater clarity across devices.',
  ],
  changesTitle: 'The update includes',
  changes: [
    'A more consistent visual language across the Group website and its editorial imprints.',
    'Clearer navigation and information hierarchy across core sections.',
    'Responsive layouts designed for a more reliable experience across screen sizes.',
    'A more unified presentation of key actions, announcements, and scholarly resources.',
  ],
  closing: "We will continue to review and refine the website as Panorama Scholarly Group's publishing and research network develops.",
};

export function getWebsiteUiUpdateCopy(): WebsiteUiUpdateCopy {
  return websiteUiUpdateCopy;
}

export interface DoraSignatoryCopy {
  title: string;
  description: string;
  intro: string;
  paragraphs: string[];
  changesTitle: string;
  changes: string[];
  resourcesTitle: string;
  resources: Array<{ label: string; href: string }>;
  closing: string;
}

const doraSignatoryCopy: DoraSignatoryCopy = {
  title: 'Panorama Scholarly Group signs DORA',
  description: 'Panorama Scholarly Group Ltd has signed the San Francisco Declaration on Research Assessment (DORA), reaffirming its commitment to responsible research assessment and the recognition of diverse scholarly contributions.',
  intro: 'Panorama Scholarly Group Ltd is pleased to announce that it has signed the San Francisco Declaration on Research Assessment (DORA).',
  paragraphs: [
    'As an organizational signatory, we support responsible research assessment. Alongside appropriate qualitative and quantitative evidence, we will consider the quality, significance, openness, integrity, and broader contribution of scholarly work.',
    'This commitment will inform the development of editorial guidance, journal information, metadata, and public communications across the Group. It is not a certification or a guarantee of any particular editorial or research outcome; it records our public commitment to continuous improvement.',
  ],
  changesTitle: 'Our commitment includes',
  changes: [
    'Recognising the varied contributions of authors, editors, reviewers, and research communities.',
    'Using metrics responsibly, transparently, and in context, rather than as a substitute for expert judgement.',
    'Reviewing relevant policies, guidance, workflows, and public communications as our publishing programme develops.',
    'Keeping this commitment visible and reviewing its implementation over time.',
  ],
  resourcesTitle: 'Related resources',
  resources: [
    { label: 'Read the DORA declaration', href: declarationUrl },
    { label: 'View DORA signatories', href: signersUrl },
    { label: 'DORA badge guidance', href: badgesUrl },
  ],
  closing: 'The DORA declaration and official signatory resources are available below. We welcome continued dialogue about fair, transparent, and responsible research assessment.',
};

export function getDoraSignatoryCopy(): DoraSignatoryCopy {
  return doraSignatoryCopy;
}
