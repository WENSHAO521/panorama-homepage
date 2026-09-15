// Single source of truth for organisation-level facts. Values below are
// taken verbatim from the legacy site's own Organization JSON-LD
// (git history: about.html, harvested before the legacy HTML was
// removed from the working tree) -- not fabricated.

export const site = {
  name: 'Panorama Scholarly Group',
  legalName: 'Panorama Scholarly Group Ltd',
  shortName: 'PSG',
  url: 'https://panorama-sg.com',
  email: 'contact@panorama-sg.com',
  address: {
    streetAddress: 'Room 1508, 15/F, Office Tower II, Grand Plaza, 625 Nathan Road, Mong Kok, Hong Kong',
    addressLocality: 'Hong Kong',
    addressCountry: 'HK',
  },
  offices: [
    {
      id: 'hong-kong',
      label: {
        en: 'Hong Kong Office',
        'zh-hans': '香港办事处',
        'zh-hant': '香港辦事處',
        ja: '香港オフィス',
        ko: '홍콩 사무소',
        de: 'Büro Hongkong',
        fr: 'Bureau de Hong Kong',
        es: 'Oficina de Hong Kong',
        ru: 'Представительство в Гонконге',
        ar: 'مكتب هونغ كونغ',
      },
      streetAddress: {
        en: 'Room 1508, 15/F, Office Tower II, Grand Plaza, 625 Nathan Road, Mong Kok, Hong Kong',
        'zh-hans': '香港旺角弥敦道625号雅兰中心办公楼二期15楼1508室',
        'zh-hant': '香港旺角彌敦道625號雅蘭中心辦公樓二期15樓1508室',
        ja: '香港・旺角・彌敦道625号 雅蘭センター オフィスタワーII 15階 1508室',
        ko: '홍콩 몽콕 네이선 로드 625, 그랜드 플라자 오피스 타워 II, 15층 1508호',
        de: 'Raum 1508, 15. Stock, Office Tower II, Grand Plaza, 625 Nathan Road, Mong Kok, Hongkong',
        fr: 'Bureau 1508, 15e étage, Office Tower II, Grand Plaza, 625 Nathan Road, Mong Kok, Hong Kong',
        es: 'Oficina 1508, 15.º piso, Office Tower II, Grand Plaza, 625 Nathan Road, Mong Kok, Hong Kong',
        ru: 'Офис 1508, 15-й этаж, Office Tower II, Grand Plaza, 625 Nathan Road, Монгкок, Гонконг',
        ar: 'الغرفة 1508، الطابق 15، Office Tower II، Grand Plaza، 625 Nathan Road، مونغ كوك، هونغ كونغ',
      },
      addressLocality: {
        en: 'Hong Kong',
        'zh-hans': '香港',
        'zh-hant': '香港',
        ja: '香港',
        ko: '홍콩',
        de: 'Hongkong',
        fr: 'Hong Kong',
        es: 'Hong Kong',
        ru: 'Гонконг',
        ar: 'هونغ كونغ',
      },
      addressCountry: 'HK',
    },
    {
      id: 'nanjing',
      label: {
        en: 'China Office',
        'zh-hans': '中国办事处',
        'zh-hant': '中國辦事處',
        ja: '中国オフィス',
        ko: '중국 사무소',
        de: 'Büro China',
        fr: 'Bureau de Chine',
        es: 'Oficina de China',
        ru: 'Представительство в Китае',
        ar: 'مكتب الصين',
      },
      streetAddress: {
        en: 'Room 1106, Building 3, No. 9 Tianxing West Road, Jiangning District, Nanjing, China',
        'zh-hans': '中国南京市江宁区天行西路9号3幢1106室',
        'zh-hant': '中國南京市江寧區天行西路9號3幢1106室',
        ja: '中国・南京市江寧区天行西路9号 3棟1106室',
        ko: '중국 난징시 장닝구 톈싱서로 9호 3동 1106호',
        de: 'Raum 1106, Gebäude 3, Nr. 9 Tianxing West Road, Bezirk Jiangning, Nanjing, China',
        fr: 'Bureau 1106, bâtiment 3, nº 9, Tianxing West Road, district de Jiangning, Nanjing, Chine',
        es: 'Oficina 1106, edificio 3, n.º 9, Tianxing West Road, distrito de Jiangning, Nanjing, China',
        ru: 'Офис 1106, здание 3, № 9, Tianxing West Road, район Цзяннин, Нанкин, Китай',
        ar: 'الغرفة 1106، المبنى 3، رقم 9، Tianxing West Road، منطقة Jiangning، نانجينغ، الصين',
      },
      addressLocality: {
        en: 'Nanjing, China',
        'zh-hans': '中国南京',
        'zh-hant': '中國南京',
        ja: '中国・南京',
        ko: '중국 난징',
        de: 'Nanjing, China',
        fr: 'Nanjing, Chine',
        es: 'Nanjing, China',
        ru: 'Нанкин, Китай',
        ar: 'نانجينغ، الصين',
      },
      addressCountry: 'CN',
    },
  ],
} as const;

export interface LocalizedOffice {
  id: string;
  label: string;
  streetAddress: string;
  addressLocality: string;
  addressCountry: string;
}

/** Return office labels and addresses in the requested supported locale. */
export function getOfficeDirectory(locale = 'en'): LocalizedOffice[] {
  return site.offices.map((office) => ({
    id: office.id,
    label: office.label[locale as keyof typeof office.label] ?? office.label.en,
    streetAddress: office.streetAddress[locale as keyof typeof office.streetAddress] ?? office.streetAddress.en,
    addressLocality: office.addressLocality[locale as keyof typeof office.addressLocality] ?? office.addressLocality.en,
    addressCountry: office.addressCountry,
  }));
}

// Independent PSG subdomains/systems (see docs/ARCHITECTURE.md §OJS Boundary
// and External PSG Systems). The corporate site may link to these; it must
// never depend on them to render its own core pages.
export const externalSystems = {
  journals: 'https://journals.panorama-sg.com',
  books: 'https://books.panorama-sg.com',
  research: 'https://research.panorama-sg.com',
  posi: 'https://posi.panorama-sg.com',
  profiles: 'https://profiles.panorama-sg.com',
  credentials: 'https://credentials.panorama-sg.com',
} as const;

export const corporateStructure = {
  group: 'Panorama Scholarly Group',
  divisions: [
    {
      id: 'publishing',
      name: 'Scholarly Publishing',
      path: '/publishing/',
      description: 'Five editorial imprints and 24 peer-reviewed journals across the sciences, humanities, and policy.',
    },
    {
      id: 'research',
      name: 'Panorama Research Institute',
      path: '/research/',
      description: "PSG's research division, operating independently at research.panorama-sg.com.",
    },
    {
      id: 'infrastructure',
      name: 'Scholarly Infrastructure',
      path: '/infrastructure/',
      description: 'Open-science tooling and indexing/archiving infrastructure, including POSI.',
    },
    {
      id: 'partnerships',
      name: 'Partnerships',
      path: '/about/partnerships/',
      description: 'Institutional and library partnerships supporting open, accountable scholarship.',
    },
  ],
} as const;
