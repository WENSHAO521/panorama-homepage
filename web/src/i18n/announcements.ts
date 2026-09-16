import type { LocaleCode } from './config';

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
