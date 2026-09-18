import type { LocaleCode } from './config';

export interface NavigationLabels {
  home: string;
  publishing: string;
  research: string;
  infrastructure: string;
  books: string;
  standards: string;
  announcements: string;
  about: string;
  journals: string;
  forAuthors: string;
  search: string;
  imprints: string;
  explore: string;
  aboutGroup: string;
  governance: string;
  partnerships: string;
  contact: string;
  overview: string;
  editorialStandards: string;
  publicationEthics: string;
  openAccess: string;
  researchAssessment: string;
  accessibility: string;
  researchInstitute: string;
  profiles: string;
  credentials: string;
  footerResearchInfrastructure: string;
  footerGroup: string;
  privacy: string;
  terms: string;
  tagline: string;
  platforms: string;
  platformDescription: string;
  legal: string;
  allRightsReserved: string;
}

const en: NavigationLabels = {
  home: 'Home',
  publishing: 'Publishing',
  research: 'Research',
  infrastructure: 'Infrastructure',
  books: 'Books',
  standards: 'Standards',
  announcements: 'Announcements',
  about: 'About',
  journals: 'Journals',
  forAuthors: 'For authors',
  search: 'Search',
  imprints: 'Imprints',
  explore: 'Explore',
  aboutGroup: 'About the Group',
  governance: 'Governance',
  partnerships: 'Partnerships',
  contact: 'Contact',
  overview: 'Overview',
  editorialStandards: 'Editorial Standards',
  publicationEthics: 'Publication Ethics',
  openAccess: 'Open Access',
  researchAssessment: 'Research Assessment',
  accessibility: 'Accessibility',
  researchInstitute: 'Research Institute',
  profiles: 'Profiles',
  credentials: 'Credentials',
  footerResearchInfrastructure: 'Research & infrastructure',
  footerGroup: 'Group',
  privacy: 'Privacy',
  terms: 'Terms',
  tagline: 'Advancing scholarship, connecting perspectives.',
  platforms: 'Panorama platforms',
  platformDescription: 'Research, infrastructure, and scholarly exchange.',
  legal: 'Legal',
  allRightsReserved: 'All rights reserved.',
};

const labels: Record<LocaleCode, NavigationLabels> = {
  en,
  'zh-hans': {
    home: '首页', publishing: '出版', research: '研究', infrastructure: '学术基础设施', books: '图书', standards: '标准', announcements: '公告', about: '关于', journals: '期刊', forAuthors: '作者指南', search: '搜索', imprints: '出版品牌', explore: '探索', aboutGroup: '关于集团', governance: '治理', partnerships: '合作伙伴', contact: '联系我们', overview: '概览', editorialStandards: '编辑标准', publicationEthics: '出版伦理', openAccess: '开放获取', researchAssessment: '科研评估（DORA）', accessibility: '无障碍', researchInstitute: '研究院', profiles: '学术档案', credentials: '资质核验', footerResearchInfrastructure: '研究与基础设施', footerGroup: '集团', privacy: '隐私', terms: '条款', tagline: '推进学术发展，连接多元视角。', platforms: 'Panorama 平台', platformDescription: '研究、基础设施与学术交流。', legal: '法律信息', allRightsReserved: '版权所有。',
  },
  'zh-hant': {
    home: '首頁', publishing: '出版', research: '研究', infrastructure: '學術基礎設施', books: '圖書', standards: '標準', announcements: '公告', about: '關於', journals: '期刊', forAuthors: '作者指南', search: '搜尋', imprints: '出版品牌', explore: '探索', aboutGroup: '關於集團', governance: '治理', partnerships: '合作夥伴', contact: '聯絡我們', overview: '概覽', editorialStandards: '編輯標準', publicationEthics: '出版倫理', openAccess: '開放取用', researchAssessment: '科研評估（DORA）', accessibility: '無障礙', researchInstitute: '研究院', profiles: '學術檔案', credentials: '資格核驗', footerResearchInfrastructure: '研究與基礎設施', footerGroup: '集團', privacy: '私隱', terms: '條款', tagline: '推進學術發展，連結多元視角。', platforms: 'Panorama 平台', platformDescription: '研究、基礎設施與學術交流。', legal: '法律資訊', allRightsReserved: '版權所有。',
  },
  ja: {
    home: 'ホーム', publishing: '出版', research: '研究', infrastructure: '学術基盤', books: '書籍', standards: '基準', announcements: 'お知らせ', about: '概要', journals: '学術誌', forAuthors: '著者の方へ', search: '検索', imprints: '出版ブランド', explore: '見る', aboutGroup: 'グループについて', governance: 'ガバナンス', partnerships: 'パートナーシップ', contact: 'お問い合わせ', overview: '概要', editorialStandards: '編集基準', publicationEthics: '出版倫理', openAccess: 'オープンアクセス', researchAssessment: '研究評価（DORA）', accessibility: 'アクセシビリティ', researchInstitute: '研究所', profiles: 'プロフィール', credentials: '資格確認', footerResearchInfrastructure: '研究・学術基盤', footerGroup: 'グループ', privacy: 'プライバシー', terms: '利用規約', tagline: '学術を前進させ、多様な視点をつなぐ。', platforms: 'Panorama プラットフォーム', platformDescription: '研究、学術基盤、知の交流。', legal: '法的情報', allRightsReserved: '無断転載を禁じます。',
  },
  ko: {
    home: '홈', publishing: '출판', research: '연구', infrastructure: '학술 인프라', books: '도서', standards: '기준', announcements: '공지사항', about: '소개', journals: '저널', forAuthors: '저자를 위한 안내', search: '검색', imprints: '출판 브랜드', explore: '둘러보기', aboutGroup: '그룹 소개', governance: '거버넌스', partnerships: '파트너십', contact: '문의', overview: '개요', editorialStandards: '편집 기준', publicationEthics: '출판 윤리', openAccess: '오픈 액세스', researchAssessment: '연구평가(DORA)', accessibility: '접근성', researchInstitute: '연구소', profiles: '프로필', credentials: '자격 검증', footerResearchInfrastructure: '연구·학술 인프라', footerGroup: '그룹', privacy: '개인정보 보호', terms: '이용 약관', tagline: '학술을 발전시키고 다양한 관점을 연결합니다.', platforms: 'Panorama 플랫폼', platformDescription: '연구, 학술 인프라, 지식 교류.', legal: '법적 고지', allRightsReserved: '모든 권리 보유.',
  },
  de: {
    home: 'Startseite', publishing: 'Publizieren', research: 'Forschung', infrastructure: 'Infrastruktur', books: 'Bücher', standards: 'Standards', announcements: 'Ankündigungen', about: 'Über uns', journals: 'Zeitschriften', forAuthors: 'Für Autoren', search: 'Suche', imprints: 'Verlagsmarken', explore: 'Entdecken', aboutGroup: 'Über die Gruppe', governance: 'Governance', partnerships: 'Partnerschaften', contact: 'Kontakt', overview: 'Überblick', editorialStandards: 'Redaktionsstandards', publicationEthics: 'Publikationsethik', openAccess: 'Open Access', researchAssessment: 'Forschungsbewertung (DORA)', accessibility: 'Barrierefreiheit', researchInstitute: 'Forschungsinstitut', profiles: 'Profile', credentials: 'Nachweise', footerResearchInfrastructure: 'Forschung & Infrastruktur', footerGroup: 'Gruppe', privacy: 'Datenschutz', terms: 'Nutzungsbedingungen', tagline: 'Wissenschaft voranbringen, Perspektiven verbinden.', platforms: 'Panorama-Plattformen', platformDescription: 'Forschung, Infrastruktur und wissenschaftlicher Austausch.', legal: 'Rechtliches', allRightsReserved: 'Alle Rechte vorbehalten.',
  },
  fr: {
    home: 'Accueil', publishing: 'Édition', research: 'Recherche', infrastructure: 'Infrastructures', books: 'Livres', standards: 'Normes', announcements: 'Annonces', about: 'À propos', journals: 'Revues', forAuthors: 'Pour les auteurs', search: 'Rechercher', imprints: 'Labels éditoriaux', explore: 'Explorer', aboutGroup: 'À propos du groupe', governance: 'Gouvernance', partnerships: 'Partenariats', contact: 'Contact', overview: 'Aperçu', editorialStandards: 'Normes éditoriales', publicationEthics: 'Éthique de la publication', openAccess: 'Accès ouvert', researchAssessment: 'Évaluation de la recherche (DORA)', accessibility: 'Accessibilité', researchInstitute: 'Institut de recherche', profiles: 'Profils', credentials: 'Vérification des qualifications', footerResearchInfrastructure: 'Recherche & infrastructures', footerGroup: 'Groupe', privacy: 'Confidentialité', terms: 'Conditions d’utilisation', tagline: 'Faire progresser les savoirs, relier les perspectives.', platforms: 'Plateformes Panorama', platformDescription: 'Recherche, infrastructures et échanges savants.', legal: 'Mentions légales', allRightsReserved: 'Tous droits réservés.',
  },
  es: {
    home: 'Inicio', publishing: 'Publicación', research: 'Investigación', infrastructure: 'Infraestructura', books: 'Libros', standards: 'Normas', announcements: 'Anuncios', about: 'Acerca de', journals: 'Revistas', forAuthors: 'Para autores', search: 'Buscar', imprints: 'Sellos editoriales', explore: 'Explorar', aboutGroup: 'Sobre el grupo', governance: 'Gobernanza', partnerships: 'Colaboraciones', contact: 'Contacto', overview: 'Resumen', editorialStandards: 'Normas editoriales', publicationEthics: 'Ética de la publicación', openAccess: 'Acceso abierto', researchAssessment: 'Evaluación de la investigación (DORA)', accessibility: 'Accesibilidad', researchInstitute: 'Instituto de Investigación', profiles: 'Perfiles', credentials: 'Verificación de credenciales', footerResearchInfrastructure: 'Investigación e infraestructura', footerGroup: 'Grupo', privacy: 'Privacidad', terms: 'Condiciones de uso', tagline: 'Impulsamos el conocimiento y conectamos perspectivas.', platforms: 'Plataformas Panorama', platformDescription: 'Investigación, infraestructura e intercambio académico.', legal: 'Información legal', allRightsReserved: 'Todos los derechos reservados.',
  },
  ru: {
    home: 'Главная', publishing: 'Издательская деятельность', research: 'Исследования', infrastructure: 'Инфраструктура', books: 'Книги', standards: 'Стандарты', announcements: 'Объявления', about: 'О группе', journals: 'Журналы', forAuthors: 'Авторам', search: 'Поиск', imprints: 'Издательские направления', explore: 'Обзор', aboutGroup: 'О группе', governance: 'Управление', partnerships: 'Партнёрства', contact: 'Контакты', overview: 'Обзор', editorialStandards: 'Редакционные стандарты', publicationEthics: 'Публикационная этика', openAccess: 'Открытый доступ', researchAssessment: 'Оценка исследований (DORA)', accessibility: 'Доступность', researchInstitute: 'Исследовательский институт', profiles: 'Профили', credentials: 'Проверка квалификации', footerResearchInfrastructure: 'Исследования и инфраструктура', footerGroup: 'Группа', privacy: 'Конфиденциальность', terms: 'Условия использования', tagline: 'Развиваем науку, соединяем перспективы.', platforms: 'Платформы Panorama', platformDescription: 'Исследования, инфраструктура и научный обмен.', legal: 'Правовая информация', allRightsReserved: 'Все права защищены.',
  },
  ar: {
    home: 'الرئيسية', publishing: 'النشر', research: 'البحث', infrastructure: 'البنية التحتية', books: 'الكتب', standards: 'المعايير', announcements: 'الإعلانات', about: 'من نحن', journals: 'الدوريات', forAuthors: 'للمؤلفين', search: 'بحث', imprints: 'العلامات التحريرية', explore: 'استكشف', aboutGroup: 'عن المجموعة', governance: 'الحوكمة', partnerships: 'الشراكات', contact: 'اتصل بنا', overview: 'نظرة عامة', editorialStandards: 'المعايير التحريرية', publicationEthics: 'أخلاقيات النشر', openAccess: 'الوصول المفتوح', researchAssessment: 'تقييم البحوث (DORA)', accessibility: 'إمكانية الوصول', researchInstitute: 'معهد البحوث', profiles: 'الملفات التعريفية', credentials: 'التحقق من المؤهلات', footerResearchInfrastructure: 'البحث والبنية التحتية', footerGroup: 'المجموعة', privacy: 'الخصوصية', terms: 'شروط الاستخدام', tagline: 'النهوض بالمعرفة وربط وجهات النظر.', platforms: 'منصات Panorama', platformDescription: 'البحث والبنية التحتية والتبادل العلمي.', legal: 'معلومات قانونية', allRightsReserved: 'جميع الحقوق محفوظة.',
  },
};

export function getNavigationLabels(locale: string): NavigationLabels {
  return labels[locale as LocaleCode] ?? labels.en;
}
