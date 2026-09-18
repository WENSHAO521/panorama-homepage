import type { LocaleCode } from './config';
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

const websiteUiUpdateCopy: Record<LocaleCode, WebsiteUiUpdateCopy> = {
  en: {
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
  },
  'zh-hans': {
    title: 'Panorama Scholarly Group 完成官网界面的全面更新',
    description: 'Panorama Scholarly Group 于 2026 年 9 月 15 日完成官网用户界面的全面更新，为集团主站及旗下编辑品牌带来更加统一、清晰的浏览体验。',
    intro: '2026 年 9 月 15 日，Panorama Scholarly Group 完成了官网用户界面的全面更新。',
    paragraphs: [
      '本次更新使集团主站与旗下编辑品牌采用更加统一的视觉与导航体系，并进一步明确出版、研究、基础设施、标准与集团学术服务之间的关系。',
      '同时，我们优化了响应式布局以及重点操作和信息的呈现方式，让作者、编辑、研究人员与读者能够在不同设备上更加清晰地浏览网站。',
    ],
    changesTitle: '本次更新包括',
    changes: [
      '统一集团主站与旗下编辑品牌的视觉语言。',
      '梳理核心板块的导航结构与信息层级。',
      '优化不同屏幕尺寸下的响应式布局。',
      '统一重点操作、公告与学术资源的呈现方式。',
    ],
    closing: '随着 Panorama Scholarly Group 出版与研究网络的发展，我们将持续审视并优化官网体验。',
  },
  'zh-hant': {
    title: 'Panorama Scholarly Group 完成網站介面的全面更新',
    description: 'Panorama Scholarly Group 於 2026 年 9 月 15 日完成網站使用者介面的全面更新，為集團主站及旗下編輯品牌帶來更一致、更清晰的瀏覽體驗。',
    intro: '2026 年 9 月 15 日，Panorama Scholarly Group 完成了網站使用者介面的全面更新。',
    paragraphs: [
      '本次更新讓集團主站與旗下編輯品牌採用更一致的視覺與導覽系統，並進一步釐清出版、研究、基礎設施、標準與集團學術服務之間的關係。',
      '同時，我們優化了響應式版面，以及重要操作與資訊的呈現方式，讓作者、編輯、研究人員與讀者能在不同裝置上更清楚地瀏覽網站。',
    ],
    changesTitle: '本次更新包括',
    changes: [
      '統一集團主站與旗下編輯品牌的視覺語言。',
      '梳理核心版塊的導覽結構與資訊層級。',
      '優化不同螢幕尺寸下的響應式版面。',
      '統一重要操作、公告與學術資源的呈現方式。',
    ],
    closing: '隨著 Panorama Scholarly Group 出版與研究網絡的發展，我們將持續檢視並優化網站體驗。',
  },
  ja: {
    title: 'Panorama Scholarly Group、ウェブサイトのユーザーインターフェースを刷新',
    description: 'Panorama Scholarly Groupは2026年9月15日、ウェブサイトのユーザーインターフェースを全面的に更新し、グループサイトと各編集インプリントをより一貫して明確に閲覧できる環境を整えました。',
    intro: '2026年9月15日、Panorama Scholarly Groupはウェブサイトのユーザーインターフェースを全面的に更新しました。',
    paragraphs: [
      '今回の更新では、グループサイトと各編集インプリントに、より一貫したビジュアルとナビゲーションの体系を整えました。出版、研究、インフラ、基準、そしてグループの学術サービスの関係も、より明確に示しています。',
      'また、レスポンシブレイアウトと主要な操作・情報の見せ方を見直し、著者、編集者、研究者、読者がさまざまな端末からより明確にサイトを利用できるようにしました。',
    ],
    changesTitle: '今回の更新内容',
    changes: [
      'グループサイトと各編集インプリントにおけるビジュアル表現の統一。',
      '主要セクションのナビゲーションと情報階層の整理。',
      '画面サイズに応じたレスポンシブレイアウトの改善。',
      '主要な操作、告知、学術リソースの見せ方の統一。',
    ],
    closing: 'Panorama Scholarly Groupの出版・研究ネットワークの発展に合わせ、今後もウェブサイトの検証と改善を続けていきます。',
  },
  ko: {
    title: 'Panorama Scholarly Group 웹사이트 사용자 인터페이스 개편',
    description: 'Panorama Scholarly Group은 2026년 9월 15일 웹사이트 사용자 인터페이스를 전면 개편하여 그룹 사이트와 편집 임프린트 전반에 더 일관되고 명확한 이용 경험을 마련했습니다.',
    intro: '2026년 9월 15일, Panorama Scholarly Group은 웹사이트 사용자 인터페이스를 전면 개편했습니다.',
    paragraphs: [
      '이번 개편을 통해 그룹 웹사이트와 편집 임프린트 전반에 더욱 일관된 시각 체계와 탐색 구조를 적용했습니다. 출판, 연구, 인프라, 기준, 그룹의 학술 서비스가 어떻게 연결되는지도 더 명확하게 제시했습니다.',
      '또한 반응형 레이아웃과 주요 기능 및 정보의 표현 방식을 다듬어 저자, 편집자, 연구자, 독자가 다양한 기기에서 사이트를 더 명확하게 이용할 수 있도록 했습니다.',
    ],
    changesTitle: '이번 개편의 주요 내용',
    changes: [
      '그룹 웹사이트와 편집 임프린트 전반의 시각 언어 통일.',
      '핵심 섹션의 탐색 구조와 정보 계층 정리.',
      '화면 크기에 맞춘 반응형 레이아웃 개선.',
      '주요 기능, 공지, 학술 자료의 표현 방식 통일.',
    ],
    closing: 'Panorama Scholarly Group의 출판 및 연구 네트워크가 발전함에 따라 웹사이트를 지속적으로 점검하고 개선하겠습니다.',
  },
  de: {
    title: 'Panorama Scholarly Group erneuert seine digitale Benutzeroberfläche',
    description: 'Panorama Scholarly Group hat die Benutzeroberfläche seiner Website am 15. September 2026 umfassend aktualisiert und damit eine einheitlichere und klarere Nutzung der Gruppenseite und ihrer redaktionellen Imprints geschaffen.',
    intro: 'Am 15. September 2026 hat Panorama Scholarly Group die Benutzeroberfläche seiner Website umfassend aktualisiert.',
    paragraphs: [
      'Mit dieser Aktualisierung erhalten die Gruppenseite und ihre redaktionellen Imprints ein einheitlicheres visuelles und navigatives System. Die Beziehungen zwischen Publizieren, Forschung, Infrastruktur, Standards und den wissenschaftlichen Dienstleistungen der Gruppe werden klarer dargestellt.',
      'Darüber hinaus wurden responsive Layouts sowie die Darstellung zentraler Aktionen und Informationen überarbeitet, damit Autorinnen und Autoren, Herausgeberinnen und Herausgeber, Forschende und Leserinnen und Leser die Website auf unterschiedlichen Geräten klarer nutzen können.',
    ],
    changesTitle: 'Die Aktualisierung umfasst',
    changes: [
      'Eine einheitlichere visuelle Sprache für die Gruppenseite und ihre redaktionellen Imprints.',
      'Eine klarere Navigation und Informationshierarchie in den zentralen Bereichen.',
      'Responsive Layouts für eine verlässlichere Nutzung auf unterschiedlichen Bildschirmgrößen.',
      'Eine einheitlichere Darstellung zentraler Aktionen, Mitteilungen und wissenschaftlicher Ressourcen.',
    ],
    closing: 'Wir werden die Website auch künftig prüfen und weiterentwickeln, während sich das Publikations- und Forschungsnetzwerk von Panorama Scholarly Group entwickelt.',
  },
  fr: {
    title: 'Panorama Scholarly Group renouvelle son expérience numérique',
    description: 'Le 15 septembre 2026, Panorama Scholarly Group a achevé une mise à jour complète de l’interface de son site web afin d’offrir une expérience plus cohérente et plus claire sur le site du groupe et ses marques éditoriales.',
    intro: 'Le 15 septembre 2026, Panorama Scholarly Group a achevé une mise à jour complète de l’interface de son site web.',
    paragraphs: [
      'Cette mise à jour dote le site du groupe et ses marques éditoriales d’un système visuel et d’une navigation plus cohérents. Elle clarifie également les liens entre l’édition, la recherche, les infrastructures, les standards et les services scientifiques du groupe.',
      'Les mises en page adaptatives ainsi que la présentation des actions et informations essentielles ont aussi été affinées, afin que les auteurs, éditeurs, chercheurs et lecteurs puissent parcourir le site plus clairement sur tous les appareils.',
    ],
    changesTitle: 'La mise à jour comprend',
    changes: [
      'Un langage visuel plus cohérent sur le site du groupe et ses marques éditoriales.',
      'Une navigation et une hiérarchie de l’information plus claires dans les sections principales.',
      'Des mises en page adaptatives conçues pour une expérience plus fiable sur toutes les tailles d’écran.',
      'Une présentation harmonisée des actions clés, des annonces et des ressources scientifiques.',
    ],
    closing: 'Nous continuerons à examiner et à améliorer le site au fil du développement du réseau éditorial et scientifique de Panorama Scholarly Group.',
  },
  es: {
    title: 'Panorama Scholarly Group renueva su experiencia digital',
    description: 'El 15 de septiembre de 2026, Panorama Scholarly Group completó una actualización integral de la interfaz de su sitio web para ofrecer una experiencia más coherente y clara en el sitio del grupo y sus sellos editoriales.',
    intro: 'El 15 de septiembre de 2026, Panorama Scholarly Group completó una actualización integral de la interfaz de su sitio web.',
    paragraphs: [
      'La actualización incorpora un sistema visual y de navegación más coherente en el sitio del grupo y sus sellos editoriales. También hace más clara la relación entre la publicación, la investigación, la infraestructura, los estándares y los servicios académicos del grupo.',
      'Asimismo, se han perfeccionado los diseños adaptativos y la presentación de las acciones y la información esenciales, para que autores, editores, investigadores y lectores puedan recorrer el sitio con mayor claridad desde cualquier dispositivo.',
    ],
    changesTitle: 'La actualización incluye',
    changes: [
      'Un lenguaje visual más coherente en el sitio del grupo y sus sellos editoriales.',
      'Una navegación y una jerarquía de la información más claras en las secciones principales.',
      'Diseños adaptativos pensados para una experiencia más fiable en distintos tamaños de pantalla.',
      'Una presentación unificada de las acciones principales, los anuncios y los recursos académicos.',
    ],
    closing: 'Seguiremos revisando y perfeccionando el sitio a medida que se desarrolle la red editorial y de investigación de Panorama Scholarly Group.',
  },
  ru: {
    title: 'Panorama Scholarly Group обновила цифровой интерфейс',
    description: '15 сентября 2026 года Panorama Scholarly Group завершила комплексное обновление интерфейса своего веб-сайта, сделав работу с сайтом группы и её редакционными импринтами более последовательной и понятной.',
    intro: '15 сентября 2026 года Panorama Scholarly Group завершила комплексное обновление интерфейса своего веб-сайта.',
    paragraphs: [
      'Обновление объединяет сайт группы и её редакционные импринты в более последовательную визуальную и навигационную систему. Теперь яснее показана связь между издательской деятельностью, исследованиями, инфраструктурой, стандартами и научными сервисами группы.',
      'Кроме того, были доработаны адаптивные макеты и представление ключевых действий и сведений, чтобы авторы, редакторы, исследователи и читатели могли удобнее и понятнее пользоваться сайтом на разных устройствах.',
    ],
    changesTitle: 'Обновление включает',
    changes: [
      'Более последовательный визуальный язык сайта группы и её редакционных импринтов.',
      'Более понятную навигацию и иерархию информации в основных разделах.',
      'Адаптивные макеты для более надёжной работы на экранах разных размеров.',
      'Единое представление ключевых действий, объявлений и научных ресурсов.',
    ],
    closing: 'Мы продолжим проверять и совершенствовать сайт по мере развития издательской и исследовательской сети Panorama Scholarly Group.',
  },
  ar: {
    title: 'تجربة رقمية متجددة لـ Panorama Scholarly Group',
    description: 'في 15 سبتمبر 2026، أكملت Panorama Scholarly Group تحديثًا شاملًا لواجهة موقعها الإلكتروني، لتوفير تجربة أكثر اتساقًا ووضوحًا عبر موقع المجموعة وعلاماتها التحريرية.',
    intro: 'في 15 سبتمبر 2026، أكملت Panorama Scholarly Group تحديثًا شاملًا لواجهة موقعها الإلكتروني.',
    paragraphs: [
      'يوحّد هذا التحديث الموقع الإلكتروني للمجموعة وعلاماتها التحريرية ضمن منظومة بصرية وملاحية أكثر اتساقًا، كما يوضح العلاقة بين النشر والبحث والبنية التحتية والمعايير والخدمات العلمية التي تقدمها المجموعة.',
      'وشمل التحديث أيضًا تحسين التخطيطات المتجاوبة وطريقة عرض الإجراءات والمعلومات الأساسية، بما يتيح للمؤلفين والمحررين والباحثين والقراء تصفح الموقع بوضوح أكبر عبر مختلف الأجهزة.',
    ],
    changesTitle: 'يشمل التحديث',
    changes: [
      'لغة بصرية أكثر اتساقًا عبر موقع المجموعة وعلاماتها التحريرية.',
      'تنقلًا أوضح وتسلسلًا أكثر وضوحًا للمعلومات في الأقسام الأساسية.',
      'تخطيطات متجاوبة لتوفير تجربة أكثر موثوقية على مختلف أحجام الشاشات.',
      'عرضًا موحدًا للإجراءات الأساسية والإعلانات والموارد العلمية.',
    ],
    closing: 'سنواصل مراجعة الموقع وتحسينه مع تطور شبكة النشر والبحث التابعة لـ Panorama Scholarly Group.',
  },
};

export function getWebsiteUiUpdateCopy(locale = 'en'): WebsiteUiUpdateCopy {
  return websiteUiUpdateCopy[locale as LocaleCode] ?? websiteUiUpdateCopy.en;
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

const doraSignatoryCopy: Record<LocaleCode, DoraSignatoryCopy> = {
  en: {
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
  },
  'zh-hans': {
    title: 'Panorama Scholarly Group 签署《旧金山科研评估宣言》（DORA）',
    description: 'Panorama Scholarly Group Ltd 已签署《旧金山科研评估宣言》（DORA），重申其对负责任科研评估以及认可多元学术贡献的承诺。',
    intro: 'Panorama Scholarly Group Ltd 欣然宣布，集团已签署《旧金山科研评估宣言》（San Francisco Declaration on Research Assessment，简称 DORA）。',
    paragraphs: [
      '作为机构签署方，我们支持以负责任的方式开展科研评估。除适当的定性和定量证据外，我们还将综合考察学术工作的质量、重要性、开放性、诚信以及更广泛的贡献。',
      '这项承诺将指导我们持续完善集团旗下期刊的编辑指引、期刊信息、元数据和相关传播内容。本公告不构成认证，也不保证任何特定的编辑或科研结果，而是公开记录我们持续改进的承诺。',
    ],
    changesTitle: '我们的承诺包括',
    changes: [
      '认可作者、编辑、审稿人及研究社群所作出的多元贡献。',
      '以负责任、透明且结合具体语境的方式使用指标，不将指标作为专家判断的替代。',
      '随着出版项目发展，持续审查相关政策、指南、工作流程和公开沟通内容。',
      '公开呈现这项承诺，并持续检视其落实情况。',
    ],
    resourcesTitle: '相关资源',
    resources: [
      { label: '阅读 DORA 宣言', href: declarationUrl },
      { label: '查看 DORA 签署方', href: signersUrl },
      { label: '查看 DORA 徽章使用说明', href: badgesUrl },
    ],
    closing: '下方提供 DORA 宣言及官方签署方资源。我们欢迎围绕公平、透明且负责任的科研评估持续开展交流。',
  },
  'zh-hant': {
    title: 'Panorama Scholarly Group 簽署《舊金山科研評估宣言》（DORA）',
    description: 'Panorama Scholarly Group Ltd 已簽署《舊金山科研評估宣言》（DORA），重申其對負責任科研評估及認可多元學術貢獻的承諾。',
    intro: 'Panorama Scholarly Group Ltd 欣然宣布，集團已簽署《舊金山科研評估宣言》（San Francisco Declaration on Research Assessment，簡稱 DORA）。',
    paragraphs: [
      '作為機構簽署方，我們支持以負責任的方式進行科研評估。除適當的定性與定量證據外，我們亦會綜合考慮學術工作的質量、重要性、開放性、誠信及更廣泛的貢獻。',
      '這項承諾將指導我們持續完善集團旗下期刊的編輯指引、期刊資訊、元資料及相關公開內容。本公告不構成認證，也不保證任何特定的編輯或科研結果，而是公開記錄我們持續改進的承諾。',
    ],
    changesTitle: '我們的承諾包括',
    changes: [
      '認可作者、編輯、審稿人及研究社群所作出的多元貢獻。',
      '以負責任、透明並結合具體語境的方式使用指標，不以指標取代專業判斷。',
      '隨著出版項目發展，持續檢視相關政策、指引、工作流程及公開溝通內容。',
      '公開呈現這項承諾，並持續檢視其落實情況。',
    ],
    resourcesTitle: '相關資源',
    resources: [
      { label: '閱讀 DORA 宣言', href: declarationUrl },
      { label: '查看 DORA 簽署方', href: signersUrl },
      { label: '查看 DORA 徽章使用說明', href: badgesUrl },
    ],
    closing: '下方提供 DORA 宣言及官方簽署方資源。我們歡迎就公平、透明及負責任的科研評估持續交流。',
  },
  ja: {
    title: 'Panorama Scholarly Group、研究評価に関するサンフランシスコ宣言（DORA）に署名',
    description: 'Panorama Scholarly Group Ltd は、研究評価に関するサンフランシスコ宣言（DORA）に署名し、責任ある研究評価と多様な学術的貢献の認識に取り組む姿勢を改めて示しました。',
    intro: 'Panorama Scholarly Group Ltd は、研究評価に関するサンフランシスコ宣言（San Francisco Declaration on Research Assessment、DORA）に署名したことをお知らせします。',
    paragraphs: [
      '組織署名者として、私たちは責任ある研究評価を支持します。適切な定性的・定量的根拠とあわせて、学術的成果の質、意義、開放性、誠実性、そしてより広い貢献を考慮していきます。',
      'この取り組みは、グループ全体における編集方針、ジャーナル情報、メタデータ、公開情報の整備に反映されます。これは認証や特定の編集・研究成果を保証するものではなく、継続的な改善に向けた私たちの公開の約束を示すものです。',
    ],
    changesTitle: '私たちの取り組み',
    changes: [
      '著者、編集者、査読者、研究コミュニティによる多様な貢献を認識すること。',
      '指標を責任ある、透明性のある、文脈に即した方法で用い、専門的判断の代替としないこと。',
      '出版プログラムの発展に応じて、関連する方針、ガイダンス、業務フロー、公開情報を見直すこと。',
      'この取り組みを明示し、その実施状況を継続的に確認すること。',
    ],
    resourcesTitle: '関連資料',
    resources: [
      { label: 'DORA宣言を読む', href: declarationUrl },
      { label: 'DORA署名者一覧を見る', href: signersUrl },
      { label: 'DORAバッジの使用指針', href: badgesUrl },
    ],
    closing: 'DORA宣言および公式の署名者向け資料を以下に掲載しています。公正で透明性があり、責任ある研究評価について、今後も対話を続けていきます。',
  },
  ko: {
    title: 'Panorama Scholarly Group, 연구평가에 관한 샌프란시스코 선언(DORA)에 서명',
    description: 'Panorama Scholarly Group Ltd는 연구평가에 관한 샌프란시스코 선언(DORA)에 서명하고, 책임 있는 연구평가와 다양한 학술적 기여의 인정을 위한 의지를 다시 확인했습니다.',
    intro: 'Panorama Scholarly Group Ltd가 연구평가에 관한 샌프란시스코 선언(San Francisco Declaration on Research Assessment, DORA)에 서명했음을 알려드립니다.',
    paragraphs: [
      '기관 서명자로서 Panorama Scholarly Group은 책임 있는 연구평가를 지지합니다. 적절한 정성적·정량적 근거와 함께 학술적 성과의 질, 중요성, 개방성, 연구의 진실성, 그리고 더 넓은 기여를 종합적으로 고려하겠습니다.',
      '이 약속은 그룹 전반의 편집 지침, 저널 정보, 메타데이터, 공개 커뮤니케이션을 발전시키는 과정에 반영됩니다. 이는 인증이나 특정 편집·연구 결과에 대한 보증이 아니라, 지속적인 개선을 위한 우리의 공개적 약속을 기록하는 것입니다.',
    ],
    changesTitle: '우리의 약속은 다음을 포함합니다',
    changes: [
      '저자, 편집자, 심사자, 연구 공동체가 만들어 내는 다양한 기여를 인정합니다.',
      '지표를 책임 있고 투명하며 맥락에 맞는 방식으로 사용하고, 전문가의 판단을 대신하는 수단으로 사용하지 않습니다.',
      '출판 프로그램이 발전함에 따라 관련 정책, 지침, 업무 절차, 공개 커뮤니케이션을 검토합니다.',
      '이 약속을 공개적으로 제시하고 그 이행을 지속적으로 점검합니다.',
    ],
    resourcesTitle: '관련 자료',
    resources: [
      { label: 'DORA 선언문 읽기', href: declarationUrl },
      { label: 'DORA 서명 단체 보기', href: signersUrl },
      { label: 'DORA 배지 사용 지침', href: badgesUrl },
    ],
    closing: '아래에서 DORA 선언문과 공식 서명 단체 자료를 확인할 수 있습니다. 공정하고 투명하며 책임 있는 연구평가에 관한 대화를 계속 이어가겠습니다.',
  },
  de: {
    title: 'Panorama Scholarly Group unterzeichnet die San Francisco Declaration on Research Assessment (DORA)',
    description: 'Panorama Scholarly Group Ltd hat die San Francisco Declaration on Research Assessment (DORA) unterzeichnet und bekräftigt damit sein Engagement für verantwortungsvolle Forschungsbewertung und die Anerkennung vielfältiger wissenschaftlicher Beiträge.',
    intro: 'Panorama Scholarly Group Ltd gibt bekannt, dass das Unternehmen die San Francisco Declaration on Research Assessment (DORA) unterzeichnet hat.',
    paragraphs: [
      'Als institutioneller Unterzeichner befürworten wir eine verantwortungsvolle Forschungsbewertung. Neben geeigneten qualitativen und quantitativen Nachweisen werden wir die Qualität, Bedeutung, Offenheit, Integrität und den weiterreichenden Beitrag wissenschaftlicher Arbeit berücksichtigen.',
      'Diese Verpflichtung wird in die Entwicklung redaktioneller Leitlinien, von Zeitschrifteninformationen, Metadaten und öffentlichen Mitteilungen in der gesamten Gruppe einfließen. Sie stellt weder eine Zertifizierung noch eine Garantie für ein bestimmtes redaktionelles oder wissenschaftliches Ergebnis dar, sondern dokumentiert unser öffentliches Bekenntnis zur kontinuierlichen Verbesserung.',
    ],
    changesTitle: 'Unsere Verpflichtung umfasst',
    changes: [
      'Die Anerkennung der unterschiedlichen Beiträge von Autorinnen und Autoren, Herausgeberinnen und Herausgebern, Gutachterinnen und Gutachtern sowie Forschungsgemeinschaften.',
      'Die verantwortungsvolle, transparente und kontextbezogene Nutzung von Kennzahlen, die nicht an die Stelle fachlicher Beurteilung treten.',
      'Die Überprüfung einschlägiger Richtlinien, Leitfäden, Arbeitsabläufe und öffentlicher Kommunikation im Zuge der Entwicklung unseres Publikationsprogramms.',
      'Die sichtbare Darstellung dieser Verpflichtung und die regelmäßige Prüfung ihrer Umsetzung.',
    ],
    resourcesTitle: 'Weiterführende Informationen',
    resources: [
      { label: 'Die DORA-Erklärung lesen', href: declarationUrl },
      { label: 'DORA-Unterzeichner anzeigen', href: signersUrl },
      { label: 'Hinweise zur Nutzung des DORA-Badges', href: badgesUrl },
    ],
    closing: 'Die DORA-Erklärung und die offiziellen Informationen für Unterzeichner finden Sie unten. Wir begrüßen den weiteren Austausch über eine faire, transparente und verantwortungsvolle Forschungsbewertung.',
  },
  fr: {
    title: 'Panorama Scholarly Group signe la San Francisco Declaration on Research Assessment (DORA)',
    description: 'Panorama Scholarly Group Ltd a signé la San Francisco Declaration on Research Assessment (DORA), réaffirmant son engagement en faveur d’une évaluation responsable de la recherche et de la reconnaissance de la diversité des contributions scientifiques.',
    intro: 'Panorama Scholarly Group Ltd annonce avoir signé la San Francisco Declaration on Research Assessment (DORA).',
    paragraphs: [
      'En tant que signataire institutionnel, nous soutenons une évaluation responsable de la recherche. En complément d’éléments qualitatifs et quantitatifs appropriés, nous prendrons en compte la qualité, la portée, l’ouverture, l’intégrité et la contribution plus large des travaux scientifiques.',
      'Cet engagement guidera l’élaboration des orientations éditoriales, des informations sur les revues, des métadonnées et des communications publiques du groupe. Il ne constitue ni une certification ni une garantie d’un résultat éditorial ou scientifique particulier, mais rend public notre engagement en faveur d’une amélioration continue.',
    ],
    changesTitle: 'Notre engagement comprend',
    changes: [
      'La reconnaissance de la diversité des contributions des auteurs, éditeurs, évaluateurs et communautés de recherche.',
      'L’utilisation responsable, transparente et contextualisée des indicateurs, sans les substituer au jugement des spécialistes.',
      'La révision des politiques, orientations, procédures et communications publiques pertinentes au fil du développement de notre programme éditorial.',
      'La présentation publique de cet engagement et le suivi régulier de sa mise en œuvre.',
    ],
    resourcesTitle: 'Ressources associées',
    resources: [
      { label: 'Lire la déclaration DORA', href: declarationUrl },
      { label: 'Voir les signataires de DORA', href: signersUrl },
      { label: 'Consulter les recommandations relatives au badge DORA', href: badgesUrl },
    ],
    closing: 'La déclaration DORA et les ressources officielles destinées aux signataires sont disponibles ci-dessous. Nous sommes favorables à la poursuite du dialogue sur une évaluation de la recherche équitable, transparente et responsable.',
  },
  es: {
    title: 'Panorama Scholarly Group firma la San Francisco Declaration on Research Assessment (DORA)',
    description: 'Panorama Scholarly Group Ltd ha firmado la San Francisco Declaration on Research Assessment (DORA), reafirmando su compromiso con una evaluación responsable de la investigación y con el reconocimiento de la diversidad de las contribuciones académicas.',
    intro: 'Panorama Scholarly Group Ltd anuncia que ha firmado la San Francisco Declaration on Research Assessment (DORA).',
    paragraphs: [
      'Como organización signataria, apoyamos una evaluación responsable de la investigación. Además de las evidencias cualitativas y cuantitativas pertinentes, tendremos en cuenta la calidad, la importancia, la apertura, la integridad y la contribución más amplia de los trabajos académicos.',
      'Este compromiso orientará el desarrollo de las directrices editoriales, la información de las revistas, los metadatos y las comunicaciones públicas del Grupo. No constituye una certificación ni garantiza un resultado editorial o de investigación concreto; deja constancia pública de nuestro compromiso con la mejora continua.',
    ],
    changesTitle: 'Nuestro compromiso incluye',
    changes: [
      'Reconocer las diversas contribuciones de autores, editores, revisores y comunidades de investigación.',
      'Utilizar los indicadores de forma responsable, transparente y contextualizada, sin sustituir el criterio experto.',
      'Revisar las políticas, directrices, procedimientos y comunicaciones públicas pertinentes a medida que se desarrolle nuestro programa editorial.',
      'Mantener visible este compromiso y revisar periódicamente su aplicación.',
    ],
    resourcesTitle: 'Recursos relacionados',
    resources: [
      { label: 'Leer la declaración DORA', href: declarationUrl },
      { label: 'Ver las organizaciones signatarias de DORA', href: signersUrl },
      { label: 'Consultar las directrices del distintivo DORA', href: badgesUrl },
    ],
    closing: 'A continuación se ofrecen la declaración DORA y los recursos oficiales para las organizaciones signatarias. Seguimos abiertos al diálogo sobre una evaluación de la investigación justa, transparente y responsable.',
  },
  ru: {
    title: 'Panorama Scholarly Group подписала Сан-Францисскую декларацию об оценке научных исследований (DORA)',
    description: 'Panorama Scholarly Group Ltd подписала Сан-Францисскую декларацию об оценке научных исследований (DORA), подтвердив приверженность ответственному оцениванию исследований и признанию разнообразного вклада в науку.',
    intro: 'Panorama Scholarly Group Ltd объявляет о подписании Сан-Францисской декларации об оценке научных исследований (DORA).',
    paragraphs: [
      'Как организация, подписавшая декларацию, мы поддерживаем ответственное оценивание исследований. Наряду с уместными качественными и количественными свидетельствами мы будем учитывать качество, значимость, открытость, добросовестность и более широкий вклад научной работы.',
      'Эта приверженность будет учитываться при разработке редакционных рекомендаций, информации о журналах, метаданных и публичных материалов группы. Она не является сертификацией и не гарантирует конкретного редакционного или исследовательского результата, а фиксирует наше публичное обязательство постоянно совершенствовать практику.',
    ],
    changesTitle: 'Наша приверженность включает',
    changes: [
      'Признание разнообразного вклада авторов, редакторов, рецензентов и исследовательских сообществ.',
      'Ответственное, прозрачное и контекстное использование показателей, которые не заменяют экспертное суждение.',
      'Проверку соответствующих политик, рекомендаций, рабочих процессов и публичных материалов по мере развития нашей издательской программы.',
      'Открытое представление этой приверженности и регулярную оценку её реализации.',
    ],
    resourcesTitle: 'Связанные ресурсы',
    resources: [
      { label: 'Прочитать декларацию DORA', href: declarationUrl },
      { label: 'Посмотреть подписантов DORA', href: signersUrl },
      { label: 'Рекомендации по использованию знака DORA', href: badgesUrl },
    ],
    closing: 'Ниже доступны текст декларации DORA и официальные материалы для подписантов. Мы приветствуем дальнейший диалог о справедливом, прозрачном и ответственном оценивании исследований.',
  },
  ar: {
    title: 'توقيع Panorama Scholarly Group على إعلان سان فرانسيسكو لتقييم البحوث (DORA)',
    description: 'وقّعت Panorama Scholarly Group Ltd إعلان سان فرانسيسكو لتقييم البحوث (DORA)، مؤكدةً من جديد التزامها بالتقييم المسؤول للبحوث والاعتراف بتنوع الإسهامات العلمية.',
    intro: 'يسرّ Panorama Scholarly Group Ltd أن تعلن توقيعها على إعلان سان فرانسيسكو لتقييم البحوث (DORA).',
    paragraphs: [
      'وبصفتنا جهة موقّعة مؤسسية، فإننا ندعم التقييم المسؤول للبحوث. وإلى جانب الأدلة النوعية والكمية المناسبة، سنأخذ في الاعتبار جودة العمل العلمي وأهميته وانفتاحه ونزاهته وإسهامه الأوسع.',
      'وسيوجّه هذا الالتزام تطوير الإرشادات التحريرية ومعلومات الدوريات والبيانات الوصفية ومواد التواصل العامة في المجموعة. ولا يمثّل هذا الالتزام اعتمادًا أو ضمانًا لأي نتيجة تحريرية أو بحثية محددة، بل يوثّق التزامنا العلني بالتحسين المستمر.',
    ],
    changesTitle: 'يشمل التزامنا',
    changes: [
      'الاعتراف بتنوع إسهامات المؤلفين والمحررين والمحكّمين ومجتمعات البحث.',
      'استخدام المؤشرات بطريقة مسؤولة وشفافة تراعي السياق، من دون أن تحل محل الحكم المتخصص.',
      'مراجعة السياسات والإرشادات وإجراءات العمل ومواد التواصل العامة ذات الصلة مع تطور برنامجنا للنشر.',
      'إتاحة هذا الالتزام بوضوح ومراجعة مدى تنفيذه بصورة مستمرة.',
    ],
    resourcesTitle: 'موارد ذات صلة',
    resources: [
      { label: 'اقرأ إعلان DORA', href: declarationUrl },
      { label: 'اعرض الجهات الموقعة على DORA', href: signersUrl },
      { label: 'إرشادات استخدام شارة DORA', href: badgesUrl },
    ],
    closing: 'يتوفر أدناه إعلان DORA والموارد الرسمية الخاصة بالجهات الموقعة. ونرحّب بمواصلة الحوار حول تقييم البحوث بصورة عادلة وشفافة ومسؤولة.',
  },
};

export function getDoraSignatoryCopy(locale = 'en'): DoraSignatoryCopy {
  return doraSignatoryCopy[locale as LocaleCode] ?? doraSignatoryCopy.en;
}
