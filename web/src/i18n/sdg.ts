import type { LocaleCode } from './config';

export interface SdgReferenceCopy {
  sectionLabel: string;
  title: string;
  body: string;
  agendaLabel: string;
  siteLabel: string;
  guidelinesLabel: string;
  imageAlt: string;
  disclaimer: string;
}

export const sdgAgendaUrl = 'https://sdgs.un.org/2030agenda';
export const sdgSiteUrl = 'https://www.un.org/sustainabledevelopment';
export const sdgGuidelinesUrl = 'https://www.un.org/sustainabledevelopment/wp-content/uploads/2023/09/E_SDG_Guidelines_Sep20238.pdf';

const copy: Record<LocaleCode, SdgReferenceCopy> = {
  en: {
    sectionLabel: 'Sustainable development',
    title: 'Research in conversation with the 2030 Agenda.',
    body: 'Some journals in our publishing programme use the Sustainable Development Goals as a reference for relevant research and editorial communication. This page links to official United Nations source materials and does not imply United Nations endorsement of Panorama Scholarly Group or any of its publications.',
    agendaLabel: 'Read the 2030 Agenda',
    siteLabel: 'Visit the UN SDG site',
    guidelinesLabel: 'Review the SDG logo guidelines',
    imageAlt: 'Sustainable Development Goals logo for use by non-United Nations entities, without the United Nations emblem',
    disclaimer: 'The content of this publication has not been approved by the United Nations and does not reflect the views of the United Nations or its officials or Member States.',
  },
  'zh-hans': {
    sectionLabel: '可持续发展',
    title: '让研究回应《2030年议程》。',
    body: '我们的部分期刊将可持续发展目标作为相关研究与编辑传播的参考框架。本页链接至联合国发布的官方资料，不表示联合国对 Panorama Scholarly Group 或其任何出版物的认可。',
    agendaLabel: '阅读《2030年议程》',
    siteLabel: '访问联合国可持续发展目标网站',
    guidelinesLabel: '查看可持续发展目标标识使用指南',
    imageAlt: '供非联合国实体使用的不含联合国徽的可持续发展目标标识',
    disclaimer: '本出版物内容未经联合国批准，不代表联合国、其官员或会员国的观点。',
  },
  'zh-hant': {
    sectionLabel: '可持續發展',
    title: '讓研究回應《2030年議程》。',
    body: '我們的部分期刊將可持續發展目標作為相關研究與編輯傳播的參考框架。本頁連結至聯合國發布的官方資料，不表示聯合國對 Panorama Scholarly Group 或其任何出版物的認可。',
    agendaLabel: '閱讀《2030年議程》',
    siteLabel: '瀏覽聯合國可持續發展目標網站',
    guidelinesLabel: '查看可持續發展目標標識使用指南',
    imageAlt: '供非聯合國實體使用的不含聯合國徽的可持續發展目標標識',
    disclaimer: '本出版物內容未經聯合國批准，不代表聯合國、其官員或會員國的觀點。',
  },
  ja: {
    sectionLabel: '持続可能な開発',
    title: '研究を2030アジェンダにつなぐ。',
    body: '当グループの一部の学術誌では、関連する研究および編集上の発信において、持続可能な開発目標を参照枠組みとして用いています。本ページは国際連合が公開する公式資料へのリンクを案内するものであり、Panorama Scholarly Groupまたはいずれの出版物についても、国際連合による承認を示すものではありません。',
    agendaLabel: '2030アジェンダを読む',
    siteLabel: '国連のSDGs公式サイトを見る',
    guidelinesLabel: 'SDGロゴ使用ガイドラインを確認',
    imageAlt: '国連エンブレムを含まない、非国連団体向けの持続可能な開発目標ロゴ',
    disclaimer: '本出版物の内容は国際連合の承認を受けたものではなく、国際連合、その職員または加盟国の見解を反映するものではありません。',
  },
  ko: {
    sectionLabel: '지속 가능한 발전',
    title: '연구를 2030 의제와 연결합니다.',
    body: '우리 출판 프로그램의 일부 학술지는 관련 연구와 편집 커뮤니케이션에서 지속가능발전목표를 참고 틀로 활용합니다. 이 페이지는 유엔이 공개한 공식 자료로 연결되며, Panorama Scholarly Group 또는 그 출판물에 대한 유엔의 지지를 의미하지 않습니다.',
    agendaLabel: '2030 의제 읽기',
    siteLabel: '유엔 SDGs 공식 사이트 방문',
    guidelinesLabel: 'SDG 로고 사용 지침 확인',
    imageAlt: '유엔 엠블럼이 없는 비유엔 기관용 지속가능발전목표 로고',
    disclaimer: '이 출판물의 내용은 유엔의 승인을 받은 것이 아니며, 유엔과 그 관계자 또는 회원국의 견해를 반영하지 않습니다.',
  },
  de: {
    sectionLabel: 'Nachhaltige Entwicklung',
    title: 'Forschung im Dialog mit der Agenda 2030.',
    body: 'Einige Zeitschriften unseres Verlagsprogramms nutzen die Ziele für nachhaltige Entwicklung als Referenzrahmen für einschlägige Forschung und redaktionelle Kommunikation. Diese Seite verweist auf die offiziellen Materialien der Vereinten Nationen und stellt keine Billigung der Panorama Scholarly Group oder ihrer Veröffentlichungen durch die Vereinten Nationen dar.',
    agendaLabel: 'Agenda 2030 lesen',
    siteLabel: 'UN-Website zu den SDGs',
    guidelinesLabel: 'Leitlinien zur Verwendung des SDG-Logos',
    imageAlt: 'Logo der Ziele für nachhaltige Entwicklung für Nicht-UN-Organisationen ohne UN-Emblem',
    disclaimer: 'Der Inhalt dieser Veröffentlichung wurde nicht von den Vereinten Nationen genehmigt und gibt nicht die Ansichten der Vereinten Nationen, ihrer Amtsträger oder ihrer Mitgliedstaaten wieder.',
  },
  fr: {
    sectionLabel: 'Développement durable',
    title: 'La recherche en dialogue avec l’Agenda 2030.',
    body: 'Certaines revues de notre programme éditorial utilisent les objectifs de développement durable comme cadre de référence pour les recherches concernées et la communication éditoriale. Cette page renvoie vers les ressources officielles des Nations Unies et ne constitue pas une approbation de Panorama Scholarly Group ou de ses publications par les Nations Unies.',
    agendaLabel: 'Lire l’Agenda 2030',
    siteLabel: 'Consulter le site des ODD de l’ONU',
    guidelinesLabel: 'Consulter les directives d’utilisation du logo des ODD',
    imageAlt: 'Logo des objectifs de développement durable destiné aux entités non affiliées à l’ONU, sans emblème des Nations Unies',
    disclaimer: 'Le contenu de cette publication n’a pas été approuvé par les Nations Unies et ne reflète pas les vues des Nations Unies, de leurs responsables ou de leurs États Membres.',
  },
  es: {
    sectionLabel: 'Desarrollo sostenible',
    title: 'La investigación en diálogo con la Agenda 2030.',
    body: 'Algunas revistas de nuestro programa editorial utilizan los Objetivos de Desarrollo Sostenible como marco de referencia para las investigaciones pertinentes y la comunicación editorial. Esta página enlaza con los materiales oficiales de las Naciones Unidas y no implica que las Naciones Unidas respalden a Panorama Scholarly Group ni ninguna de sus publicaciones.',
    agendaLabel: 'Leer la Agenda 2030',
    siteLabel: 'Visitar el sitio de los ODS de la ONU',
    guidelinesLabel: 'Consultar las directrices de uso del logotipo de los ODS',
    imageAlt: 'Logotipo de los Objetivos de Desarrollo Sostenible para entidades no pertenecientes a las Naciones Unidas, sin el emblema de la ONU',
    disclaimer: 'El contenido de esta publicación no ha sido aprobado por las Naciones Unidas y no refleja las opiniones de las Naciones Unidas, sus funcionarios ni sus Estados Miembros.',
  },
  ru: {
    sectionLabel: 'Устойчивое развитие',
    title: 'Исследования в контексте Повестки дня до 2030 года.',
    body: 'Некоторые журналы нашей издательской программы используют Цели устойчивого развития как справочную основу для соответствующих исследований и редакционных материалов. На этой странице приведены ссылки на официальные материалы ООН; это не означает, что ООН одобряет Panorama Scholarly Group или какие-либо её публикации.',
    agendaLabel: 'Читать Повестку дня до 2030 года',
    siteLabel: 'Перейти на сайт ООН о ЦУР',
    guidelinesLabel: 'Ознакомиться с правилами использования логотипа ЦУР',
    imageAlt: 'Логотип Целей устойчивого развития для организаций, не относящихся к системе ООН, без эмблемы ООН',
    disclaimer: 'Содержание этой публикации не было одобрено Организацией Объединённых Наций и не отражает мнения ООН, её должностных лиц или государств-членов.',
  },
  ar: {
    sectionLabel: 'التنمية المستدامة',
    title: 'بحث يتفاعل مع خطة عام 2030.',
    body: 'تستخدم بعض الدوريات في برنامجنا للنشر أهداف التنمية المستدامة إطاراً مرجعياً للبحوث ذات الصلة وللتواصل التحريري. تحيل هذه الصفحة إلى المواد الرسمية للأمم المتحدة، ولا تعني تأييد الأمم المتحدة لـ Panorama Scholarly Group أو لأي من منشوراتها.',
    agendaLabel: 'اقرأ خطة عام 2030',
    siteLabel: 'زر موقع أهداف التنمية المستدامة للأمم المتحدة',
    guidelinesLabel: 'راجع إرشادات استخدام شعار أهداف التنمية المستدامة',
    imageAlt: 'شعار أهداف التنمية المستدامة المخصص للكيانات غير التابعة للأمم المتحدة من دون شعار الأمم المتحدة',
    disclaimer: 'لم تعتمد الأمم المتحدة محتوى هذا المنشور، ولا يعكس آراء الأمم المتحدة أو مسؤوليها أو دولها الأعضاء.',
  },
};

export function getSdgReferenceCopy(locale = 'en'): SdgReferenceCopy {
  return copy[locale as LocaleCode] ?? copy.en;
}
