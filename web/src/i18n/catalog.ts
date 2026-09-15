import type { LocaleCode } from './config';
import type { Imprint } from '@/types';

type ImprintCopy = {
  scope: string;
  description: string;
  disciplines: string[];
};

const imprintCopy: Record<string, Partial<Record<LocaleCode, ImprintCopy>>> = {
  ridgeline: {
    'zh-hans': { scope: '技术、工程与人工智能', description: '面向技术、工程与应用人工智能研究的 Panorama Scholarly Group 品牌，关注更具人本性、可持续性与公平性的未来。', disciplines: ['技术', '工程', '人工智能'] },
    'zh-hant': { scope: '技術、工程與人工智能', description: '面向技術、工程與應用人工智能研究的 Panorama Scholarly Group 品牌，關注更具人本性、可持續性與公平性的未來。', disciplines: ['技術', '工程', '人工智能'] },
    ja: { scope: 'テクノロジー・工学・AI', description: 'テクノロジー、工学、応用AI研究を扱うPanorama Scholarly Groupのインプリント。より人間的で持続可能、公平な未来に向けた研究を刊行します。', disciplines: ['テクノロジー', '工学', '人工知能'] },
    ko: { scope: '기술·공학·인공지능', description: '기술, 공학, 응용 인공지능 연구를 위한 Panorama Scholarly Group의 임프린트로, 더 인간적이고 지속 가능하며 공정한 미래를 지향합니다.', disciplines: ['기술', '공학', '인공지능'] },
    de: { scope: 'Technologie, Ingenieurwesen & KI', description: 'Das Imprint der Panorama Scholarly Group für Forschung zu Technologie, Ingenieurwesen und angewandter KI – für eine menschlichere, nachhaltigere und gerechtere Zukunft.', disciplines: ['Technologie', 'Ingenieurwesen', 'Künstliche Intelligenz'] },
    fr: { scope: 'Technologie, ingénierie et IA', description: 'La marque éditoriale de Panorama Scholarly Group consacrée aux recherches en technologie, ingénierie et IA appliquée, pour un avenir plus humain, durable et équitable.', disciplines: ['Technologie', 'Ingénierie', 'Intelligence artificielle'] },
    es: { scope: 'Tecnología, ingeniería e IA', description: 'El sello de Panorama Scholarly Group dedicado a la investigación en tecnología, ingeniería e inteligencia artificial aplicada para un futuro más humano, sostenible y equitativo.', disciplines: ['Tecnología', 'Ingeniería', 'Inteligencia artificial'] },
    ru: { scope: 'Технологии, инженерия и ИИ', description: 'Импринт Panorama Scholarly Group для исследований в области технологий, инженерии и прикладного ИИ — ради более гуманного, устойчивого и справедливого будущего.', disciplines: ['Технологии', 'Инженерия', 'Искусственный интеллект'] },
    ar: { scope: 'التكنولوجيا والهندسة والذكاء الاصطناعي', description: 'علامة Panorama Scholarly Group المتخصصة في أبحاث التكنولوجيا والهندسة والذكاء الاصطناعي التطبيقي من أجل مستقبل أكثر إنسانية واستدامة وإنصافًا.', disciplines: ['التكنولوجيا', 'الهندسة', 'الذكاء الاصطناعي'] },
  },
  'health-nexus': {
    'zh-hans': { scope: '医学与健康科学', description: '面向医学、公共卫生与健康科学研究的 Panorama Scholarly Group 品牌。', disciplines: ['医学', '公共卫生', '数字健康与医学人工智能'] },
    'zh-hant': { scope: '醫學與健康科學', description: '面向醫學、公共衛生與健康科學研究的 Panorama Scholarly Group 品牌。', disciplines: ['醫學', '公共衛生', '數碼健康與醫學人工智能'] },
    ja: { scope: '医学・健康科学', description: '医学、公衆衛生、健康科学研究のためのPanorama Scholarly Groupインプリントです。', disciplines: ['医学', '公衆衛生', 'デジタルヘルス・医療AI'] },
    ko: { scope: '의학·보건과학', description: '의학, 공중보건, 보건과학 연구를 위한 Panorama Scholarly Group의 임프린트입니다.', disciplines: ['의학', '공중보건', '디지털 헬스·의료 AI'] },
    de: { scope: 'Medizin & Gesundheitswissenschaften', description: 'Das Imprint der Panorama Scholarly Group für Forschung in Medizin, öffentlicher Gesundheit und Gesundheitswissenschaften.', disciplines: ['Medizin', 'Öffentliche Gesundheit', 'Digitale Gesundheit & medizinische KI'] },
    fr: { scope: 'Médecine et sciences de la santé', description: 'La marque éditoriale de Panorama Scholarly Group consacrée à la médecine, à la santé publique et aux sciences de la santé.', disciplines: ['Médecine', 'Santé publique', 'Santé numérique et IA médicale'] },
    es: { scope: 'Medicina y ciencias de la salud', description: 'El sello de Panorama Scholarly Group dedicado a la investigación en medicina, salud pública y ciencias de la salud.', disciplines: ['Medicina', 'Salud pública', 'Salud digital e IA médica'] },
    ru: { scope: 'Медицина и науки о здоровье', description: 'Импринт Panorama Scholarly Group для исследований в области медицины, общественного здоровья и наук о здоровье.', disciplines: ['Медицина', 'Общественное здоровье', 'Цифровое здравоохранение и медицинский ИИ'] },
    ar: { scope: 'الطب وعلوم الصحة', description: 'علامة Panorama Scholarly Group المتخصصة في أبحاث الطب والصحة العامة وعلوم الصحة.', disciplines: ['الطب', 'الصحة العامة', 'الصحة الرقمية والذكاء الاصطناعي الطبي'] },
  },
  'verdant-science': {
    'zh-hans': { scope: '可持续发展、环境与生命科学', description: '面向可持续发展、环境科学与生命科学研究的 Panorama Scholarly Group 品牌。', disciplines: ['可持续发展', '环境科学', '生命科学'] },
    'zh-hant': { scope: '可持續發展、環境與生命科學', description: '面向可持續發展、環境科學與生命科學研究的 Panorama Scholarly Group 品牌。', disciplines: ['可持續發展', '環境科學', '生命科學'] },
    ja: { scope: '持続可能性・環境・生命科学', description: '持続可能性、環境科学、生命科学研究を扱うPanorama Scholarly Groupのインプリントです。', disciplines: ['持続可能性', '環境科学', '生命科学'] },
    ko: { scope: '지속가능성·환경·생명과학', description: '지속가능성, 환경과학, 생명과학 연구를 위한 Panorama Scholarly Group의 임프린트입니다.', disciplines: ['지속가능성', '환경과학', '생명과학'] },
    de: { scope: 'Nachhaltigkeit, Umwelt & Lebenswissenschaften', description: 'Das Imprint der Panorama Scholarly Group für Forschung zu Nachhaltigkeit, Umwelt und Lebenswissenschaften.', disciplines: ['Nachhaltigkeit', 'Umweltwissenschaften', 'Lebenswissenschaften'] },
    fr: { scope: 'Durabilité, environnement et sciences de la vie', description: 'La marque éditoriale de Panorama Scholarly Group consacrée aux recherches sur la durabilité, l’environnement et les sciences de la vie.', disciplines: ['Durabilité', 'Sciences de l’environnement', 'Sciences de la vie'] },
    es: { scope: 'Sostenibilidad, medio ambiente y ciencias de la vida', description: 'El sello de Panorama Scholarly Group dedicado a la investigación sobre sostenibilidad, medio ambiente y ciencias de la vida.', disciplines: ['Sostenibilidad', 'Ciencias ambientales', 'Ciencias de la vida'] },
    ru: { scope: 'Устойчивое развитие, окружающая среда и науки о жизни', description: 'Импринт Panorama Scholarly Group для исследований в области устойчивого развития, окружающей среды и наук о жизни.', disciplines: ['Устойчивое развитие', 'Науки об окружающей среде', 'Науки о жизни'] },
    ar: { scope: 'الاستدامة والبيئة وعلوم الحياة', description: 'علامة Panorama Scholarly Group المتخصصة في أبحاث الاستدامة والبيئة وعلوم الحياة.', disciplines: ['الاستدامة', 'علوم البيئة', 'علوم الحياة'] },
  },
  charter: {
    'zh-hans': { scope: '政策、法律与治理', description: '面向政策、法律与治理研究的 Panorama Scholarly Group 品牌。', disciplines: ['公共政策', '法律', '治理'] },
    'zh-hant': { scope: '政策、法律與治理', description: '面向政策、法律與治理研究的 Panorama Scholarly Group 品牌。', disciplines: ['公共政策', '法律', '治理'] },
    ja: { scope: '政策・法・ガバナンス', description: '政策、法、ガバナンス研究のためのPanorama Scholarly Groupインプリントです。', disciplines: ['公共政策', '法学', 'ガバナンス'] },
    ko: { scope: '정책·법·거버넌스', description: '정책, 법, 거버넌스 연구를 위한 Panorama Scholarly Group의 임프린트입니다.', disciplines: ['공공정책', '법학', '거버넌스'] },
    de: { scope: 'Politik, Recht & Governance', description: 'Das Imprint der Panorama Scholarly Group für Forschung zu Politik, Recht und Governance.', disciplines: ['Öffentliche Politik', 'Recht', 'Governance'] },
    fr: { scope: 'Politiques publiques, droit et gouvernance', description: 'La marque éditoriale de Panorama Scholarly Group consacrée aux recherches sur les politiques publiques, le droit et la gouvernance.', disciplines: ['Politiques publiques', 'Droit', 'Gouvernance'] },
    es: { scope: 'Política, derecho y gobernanza', description: 'El sello de Panorama Scholarly Group dedicado a la investigación sobre políticas públicas, derecho y gobernanza.', disciplines: ['Políticas públicas', 'Derecho', 'Gobernanza'] },
    ru: { scope: 'Политика, право и управление', description: 'Импринт Panorama Scholarly Group для исследований в области политики, права и управления.', disciplines: ['Государственная политика', 'Право', 'Управление'] },
    ar: { scope: 'السياسات والقانون والحوكمة', description: 'علامة Panorama Scholarly Group المتخصصة في أبحاث السياسات والقانون والحوكمة.', disciplines: ['السياسات العامة', 'القانون', 'الحوكمة'] },
  },
  threnody: {
    'zh-hans': { scope: '人文学科、艺术与哲学', description: '面向人文学科、艺术与哲学研究的 Panorama Scholarly Group 品牌。', disciplines: ['人文学科', '艺术', '哲学'] },
    'zh-hant': { scope: '人文學科、藝術與哲學', description: '面向人文學科、藝術與哲學研究的 Panorama Scholarly Group 品牌。', disciplines: ['人文學科', '藝術', '哲學'] },
    ja: { scope: '人文学・芸術・哲学', description: '人文学、芸術、哲学研究のためのPanorama Scholarly Groupインプリントです。', disciplines: ['人文学', '芸術', '哲学'] },
    ko: { scope: '인문학·예술·철학', description: '인문학, 예술, 철학 연구를 위한 Panorama Scholarly Group의 임프린트입니다.', disciplines: ['인문학', '예술', '철학'] },
    de: { scope: 'Geisteswissenschaften, Kunst & Philosophie', description: 'Das Imprint der Panorama Scholarly Group für Forschung in Geisteswissenschaften, Kunst und Philosophie.', disciplines: ['Geisteswissenschaften', 'Kunst', 'Philosophie'] },
    fr: { scope: 'Sciences humaines, arts et philosophie', description: 'La marque éditoriale de Panorama Scholarly Group consacrée aux recherches en sciences humaines, arts et philosophie.', disciplines: ['Sciences humaines', 'Arts', 'Philosophie'] },
    es: { scope: 'Humanidades, artes y filosofía', description: 'El sello de Panorama Scholarly Group dedicado a la investigación en humanidades, artes y filosofía.', disciplines: ['Humanidades', 'Artes', 'Filosofía'] },
    ru: { scope: 'Гуманитарные науки, искусство и философия', description: 'Импринт Panorama Scholarly Group для исследований в области гуманитарных наук, искусства и философии.', disciplines: ['Гуманитарные науки', 'Искусство', 'Философия'] },
    ar: { scope: 'العلوم الإنسانية والفنون والفلسفة', description: 'علامة Panorama Scholarly Group المتخصصة في أبحاث العلوم الإنسانية والفنون والفلسفة.', disciplines: ['العلوم الإنسانية', 'الفنون', 'الفلسفة'] },
  },
};

export function getLocalizedImprint(imprint: Imprint, locale = 'en'): Imprint {
  const localized = imprintCopy[imprint.slug]?.[locale as LocaleCode];
  return localized ? { ...imprint, ...localized } : imprint;
}

export function getLocalizedImprints(imprints: Imprint[], locale = 'en'): Imprint[] {
  return imprints.map((imprint) => getLocalizedImprint(imprint, locale));
}
