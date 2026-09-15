import type { LocaleCode } from './config';

export interface LegalChromeCopy {
  eyebrow: string;
  documentInformation: string;
  publishedBy: string;
  lastUpdated: string;
  questions: string;
  contactGroup: string;
  updatedDate: string;
  onThisPage: string;
  questionsAboutPage: string;
  relatedPages: string;
  defaultRailTitle: string;
  defaultRailText: string;
  defaultRelatedEditorial: string;
  defaultRelatedEthics: string;
  defaultRelatedContact: string;
}

const copy: Record<LocaleCode, LegalChromeCopy> = {
  en: {
    eyebrow: 'Panorama Scholarly Group / Legal', documentInformation: 'Document information', publishedBy: 'Published by', lastUpdated: 'Last updated', questions: 'Questions', contactGroup: 'Contact the group', updatedDate: '14 September 2026', onThisPage: 'On this page', questionsAboutPage: 'Questions about this page', relatedPages: 'Related pages', defaultRailTitle: 'A clear record', defaultRailText: 'These pages explain the standards and responsibilities that accompany the group’s public website.', defaultRelatedEditorial: 'Editorial Standards', defaultRelatedEthics: 'Publication Ethics', defaultRelatedContact: 'Contact',
  },
  'zh-hans': {
    eyebrow: 'Panorama Scholarly Group / 法律与政策', documentInformation: '文档信息', publishedBy: '发布方', lastUpdated: '最近更新', questions: '问题咨询', contactGroup: '联系集团', updatedDate: '2026年9月14日', onThisPage: '本页内容', questionsAboutPage: '对本页有疑问？', relatedPages: '相关页面', defaultRailTitle: '清晰、可追溯的记录', defaultRailText: '本页面说明集团公共网站所适用的标准与责任。', defaultRelatedEditorial: '编辑标准', defaultRelatedEthics: '出版伦理', defaultRelatedContact: '联系我们',
  },
  'zh-hant': {
    eyebrow: 'Panorama Scholarly Group / 法律與政策', documentInformation: '文件資訊', publishedBy: '發布方', lastUpdated: '最近更新', questions: '問題查詢', contactGroup: '聯絡集團', updatedDate: '2026年9月14日', onThisPage: '本頁內容', questionsAboutPage: '對本頁有疑問？', relatedPages: '相關頁面', defaultRailTitle: '清晰、可追溯的記錄', defaultRailText: '本頁說明集團公共網站所適用的標準與責任。', defaultRelatedEditorial: '編輯標準', defaultRelatedEthics: '出版倫理', defaultRelatedContact: '聯絡我們',
  },
  ja: {
    eyebrow: 'Panorama Scholarly Group / 法務・方針', documentInformation: '文書情報', publishedBy: '発行者', lastUpdated: '最終更新', questions: 'お問い合わせ', contactGroup: 'グループに問い合わせる', updatedDate: '2026年9月14日', onThisPage: 'このページの内容', questionsAboutPage: 'このページについてのお問い合わせ', relatedPages: '関連ページ', defaultRailTitle: '明確な記録', defaultRailText: 'グループの公開ウェブサイトに適用される基準と責任を説明します。', defaultRelatedEditorial: '編集基準', defaultRelatedEthics: '出版倫理', defaultRelatedContact: 'お問い合わせ',
  },
  ko: {
    eyebrow: 'Panorama Scholarly Group / 법률 및 정책', documentInformation: '문서 정보', publishedBy: '발행 주체', lastUpdated: '최종 업데이트', questions: '문의', contactGroup: '그룹에 문의하기', updatedDate: '2026년 9월 14일', onThisPage: '이 페이지의 내용', questionsAboutPage: '이 페이지에 관한 문의', relatedPages: '관련 페이지', defaultRailTitle: '명확한 기록', defaultRailText: '그룹의 공개 웹사이트에 적용되는 기준과 책임을 설명합니다.', defaultRelatedEditorial: '편집 기준', defaultRelatedEthics: '출판 윤리', defaultRelatedContact: '문의',
  },
  de: {
    eyebrow: 'Panorama Scholarly Group / Rechtliches', documentInformation: 'Dokumentinformationen', publishedBy: 'Herausgegeben von', lastUpdated: 'Zuletzt aktualisiert', questions: 'Fragen', contactGroup: 'Gruppe kontaktieren', updatedDate: '14. September 2026', onThisPage: 'Auf dieser Seite', questionsAboutPage: 'Fragen zu dieser Seite', relatedPages: 'Verwandte Seiten', defaultRailTitle: 'Ein klarer Datensatz', defaultRailText: 'Diese Seiten erläutern die Standards und Verantwortlichkeiten für die öffentliche Website der Gruppe.', defaultRelatedEditorial: 'Redaktionsstandards', defaultRelatedEthics: 'Publikationsethik', defaultRelatedContact: 'Kontakt',
  },
  fr: {
    eyebrow: 'Panorama Scholarly Group / Informations juridiques', documentInformation: 'Informations sur le document', publishedBy: 'Publié par', lastUpdated: 'Dernière mise à jour', questions: 'Questions', contactGroup: 'Contacter le groupe', updatedDate: '14 septembre 2026', onThisPage: 'Sur cette page', questionsAboutPage: 'Une question sur cette page', relatedPages: 'Pages associées', defaultRailTitle: 'Un dossier clair', defaultRailText: 'Ces pages présentent les normes et responsabilités applicables au site public du groupe.', defaultRelatedEditorial: 'Normes éditoriales', defaultRelatedEthics: 'Éthique de la publication', defaultRelatedContact: 'Contact',
  },
  es: {
    eyebrow: 'Panorama Scholarly Group / Información legal', documentInformation: 'Información del documento', publishedBy: 'Publicado por', lastUpdated: 'Última actualización', questions: 'Preguntas', contactGroup: 'Contactar con el grupo', updatedDate: '14 de septiembre de 2026', onThisPage: 'En esta página', questionsAboutPage: 'Preguntas sobre esta página', relatedPages: 'Páginas relacionadas', defaultRailTitle: 'Un registro claro', defaultRailText: 'Estas páginas explican las normas y responsabilidades aplicables al sitio web público del grupo.', defaultRelatedEditorial: 'Normas editoriales', defaultRelatedEthics: 'Ética de la publicación', defaultRelatedContact: 'Contacto',
  },
  ru: {
    eyebrow: 'Panorama Scholarly Group / Правовая информация', documentInformation: 'Сведения о документе', publishedBy: 'Опубликовано', lastUpdated: 'Последнее обновление', questions: 'Вопросы', contactGroup: 'Связаться с группой', updatedDate: '14 сентября 2026 г.', onThisPage: 'На этой странице', questionsAboutPage: 'Вопросы по этой странице', relatedPages: 'Связанные страницы', defaultRailTitle: 'Понятная запись', defaultRailText: 'На этих страницах изложены стандарты и обязанности, применимые к публичному сайту группы.', defaultRelatedEditorial: 'Редакционные стандарты', defaultRelatedEthics: 'Публикационная этика', defaultRelatedContact: 'Контакты',
  },
  ar: {
    eyebrow: 'Panorama Scholarly Group / معلومات قانونية', documentInformation: 'معلومات الوثيقة', publishedBy: 'الجهة الناشرة', lastUpdated: 'آخر تحديث', questions: 'الاستفسارات', contactGroup: 'تواصل مع المجموعة', updatedDate: '14 سبتمبر 2026', onThisPage: 'في هذه الصفحة', questionsAboutPage: 'استفسارات حول هذه الصفحة', relatedPages: 'صفحات ذات صلة', defaultRailTitle: 'سجل واضح', defaultRailText: 'توضح هذه الصفحات المعايير والمسؤوليات المطبقة على الموقع العام للمجموعة.', defaultRelatedEditorial: 'المعايير التحريرية', defaultRelatedEthics: 'أخلاقيات النشر', defaultRelatedContact: 'اتصل بنا',
  },
};

export function getLegalChromeCopy(locale = 'en'): LegalChromeCopy {
  return copy[locale as LocaleCode] ?? copy.en;
}
