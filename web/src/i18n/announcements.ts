import { badgesUrl, declarationUrl, signersUrl } from './research-assessment';
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
    title: 'Panorama Scholarly Group 网站焕新，带来更完善的数字体验',
    description: '2026年9月15日，Panorama Scholarly Group 完成了网站界面的全面更新，使集团网站及旗下编辑品牌的视觉和使用体验更加一致、清晰。',
    intro: '2026年9月15日，Panorama Scholarly Group 完成了网站界面的全面更新。',
    paragraphs: [
      '此次更新让集团网站与旗下编辑品牌采用更统一的视觉和导航体系，并进一步厘清出版、研究、基础设施、标准及集团学术服务之间的关系。',
      '更新还优化了响应式布局以及重点操作和信息的呈现方式，让作者、编辑、研究人员和读者在不同设备上都能更清楚地浏览网站。',
    ],
    changesTitle: '此次更新包括',
    changes: [
      '统一集团网站与旗下编辑品牌的视觉风格。',
      '理清核心栏目中的导航和信息层级。',
      '优化响应式布局，提升不同屏幕尺寸下的使用体验。',
      '统一呈现重要操作、公告和学术资源。',
    ],
    closing: '随着 Panorama Scholarly Group 的出版与研究网络不断发展，我们将持续评估并改进网站。',
  },
  'zh-hant': {
    title: 'Panorama Scholarly Group 網站煥新，帶來更完善的數碼體驗',
    description: '2026年9月15日，Panorama Scholarly Group 全面更新網站介面，讓集團網站及旗下編輯品牌的視覺與使用體驗更一致、更清晰。',
    intro: '2026年9月15日，Panorama Scholarly Group 完成網站介面的全面更新。',
    paragraphs: [
      '是次更新讓集團網站與旗下編輯品牌採用更一致的視覺與導覽系統，並進一步釐清出版、研究、基礎設施、標準及集團學術服務之間的關係。',
      '更新亦改善了響應式版面，以及重要操作和資訊的呈現方式，讓作者、編輯、研究人員和讀者在不同裝置上都能更清晰地瀏覽網站。',
    ],
    changesTitle: '是次更新包括',
    changes: [
      '統一集團網站與旗下編輯品牌的視覺風格。',
      '理順核心欄目的導覽和資訊層級。',
      '改善響應式版面，提升不同螢幕尺寸下的使用體驗。',
      '以更一致的方式呈現重要操作、公告和學術資源。',
    ],
    closing: '隨著 Panorama Scholarly Group 的出版與研究網絡持續發展，我們會繼續檢視並改善網站。',
  },
  ja: {
    title: 'Panorama Scholarly Groupのウェブサイトを刷新',
    description: '2026年9月15日、Panorama Scholarly Groupはウェブサイトのユーザーインターフェースを全面的に更新し、グループサイトと各出版ブランドをより一貫性のある、分かりやすい体験へと改めました。',
    intro: '2026年9月15日、Panorama Scholarly Groupはウェブサイトのユーザーインターフェースを全面的に更新しました。',
    paragraphs: [
      'グループサイトと各出版ブランドのデザインおよびナビゲーションを統一し、出版、研究、インフラ、基準、学術サービスの関係を分かりやすくしました。',
      'レスポンシブレイアウトと主要な操作・情報の見せ方も見直し、著者、編集者、研究者、読者がさまざまな端末から明確にサイトを利用できるようにしました。',
    ],
    changesTitle: '主な更新内容',
    changes: [
      'グループサイトと各出版ブランドで一貫したビジュアル表現を採用。',
      '主要セクションのナビゲーションと情報の階層を整理。',
      '画面サイズを問わず安定して利用できるレスポンシブレイアウトに改善。',
      '主要な操作、告知、学術資料の見せ方を統一。',
    ],
    closing: 'Panorama Scholarly Groupの出版・研究ネットワークの発展に合わせ、今後もウェブサイトを継続的に見直し、改善していきます。',
  },
  ko: {
    title: 'Panorama Scholarly Group 웹사이트의 새로운 디지털 경험',
    description: '2026년 9월 15일, Panorama Scholarly Group은 웹사이트 사용자 인터페이스를 전면 개편해 그룹 사이트와 각 출판 브랜드에서 더 일관되고 명확한 경험을 제공하게 되었습니다.',
    intro: '2026년 9월 15일, Panorama Scholarly Group은 웹사이트 사용자 인터페이스의 전면 개편을 완료했습니다.',
    paragraphs: [
      '이번 개편으로 그룹 사이트와 각 출판 브랜드의 시각 체계와 탐색 방식을 통일하고, 출판·연구·인프라·기준·그룹 학술 서비스의 관계를 더 명확히 했습니다.',
      '반응형 레이아웃과 주요 작업 및 정보의 표시 방식도 다듬어 저자, 편집자, 연구자와 독자가 다양한 기기에서 사이트를 더 쉽게 이용할 수 있도록 했습니다.',
    ],
    changesTitle: '주요 개편 내용',
    changes: [
      '그룹 사이트와 출판 브랜드 전반의 시각 언어를 통일했습니다.',
      '핵심 영역의 탐색 구조와 정보 위계를 명확히 했습니다.',
      '화면 크기에 따라 안정적으로 작동하도록 반응형 레이아웃을 개선했습니다.',
      '주요 작업, 공지와 학술 자료를 더 일관된 방식으로 제시합니다.',
    ],
    closing: 'Panorama Scholarly Group의 출판 및 연구 네트워크가 발전함에 따라 웹사이트를 계속 검토하고 개선하겠습니다.',
  },
  de: {
    title: 'Ein neues digitales Erlebnis für die Panorama Scholarly Group',
    description: 'Am 15. September 2026 hat die Panorama Scholarly Group die Benutzeroberfläche ihrer Website umfassend überarbeitet. Dadurch wirken der Gruppenauftritt und die redaktionellen Imprints einheitlicher und sind klarer zu nutzen.',
    intro: 'Am 15. September 2026 hat die Panorama Scholarly Group die Benutzeroberfläche ihrer Website umfassend überarbeitet.',
    paragraphs: [
      'Die Überarbeitung vereinheitlicht Gestaltung und Navigation der Gruppenwebsite und ihrer redaktionellen Imprints. Sie macht auch den Zusammenhang zwischen Publizieren, Forschung, Infrastruktur, Standards und den wissenschaftlichen Diensten der Gruppe deutlicher.',
      'Zudem wurden responsive Layouts sowie die Darstellung wichtiger Aktionen und Informationen verbessert. So können Autorinnen und Autoren, Herausgeber, Forschende und Lesende die Website auf verschiedenen Geräten leichter nutzen.',
    ],
    changesTitle: 'Die Überarbeitung umfasst',
    changes: [
      'Eine einheitlichere Gestaltung der Gruppenwebsite und ihrer redaktionellen Imprints.',
      'Eine klarere Navigation und Informationshierarchie in den zentralen Bereichen.',
      'Responsive Layouts für eine verlässlichere Nutzung auf unterschiedlichen Bildschirmgrößen.',
      'Eine einheitlichere Darstellung wichtiger Aktionen, Mitteilungen und wissenschaftlicher Ressourcen.',
    ],
    closing: 'Mit der Weiterentwicklung des Publikations- und Forschungsnetzwerks der Panorama Scholarly Group werden wir die Website weiterhin prüfen und verbessern.',
  },
  fr: {
    title: 'Une nouvelle expérience numérique pour Panorama Scholarly Group',
    description: 'Le 15 septembre 2026, Panorama Scholarly Group a achevé une refonte complète de l’interface de son site. Celle-ci rend l’expérience plus cohérente et plus claire sur le site du groupe et les marques éditoriales.',
    intro: 'Le 15 septembre 2026, Panorama Scholarly Group a achevé une refonte complète de l’interface de son site.',
    paragraphs: [
      'Cette refonte harmonise l’identité visuelle et la navigation du site du groupe et de ses marques éditoriales. Elle clarifie aussi les liens entre édition, recherche, infrastructures, normes et services scientifiques du groupe.',
      'Les mises en page adaptatives et la présentation des actions et informations clés ont également été améliorées. Auteurs, rédacteurs, chercheurs et lecteurs peuvent ainsi parcourir le site plus clairement sur différents appareils.',
    ],
    changesTitle: 'La refonte comprend',
    changes: [
      'Une identité visuelle plus cohérente sur le site du groupe et ses marques éditoriales.',
      'Une navigation et une hiérarchie de l’information plus claires dans les principales rubriques.',
      'Des mises en page adaptatives pour une expérience plus fiable sur tous les écrans.',
      'Une présentation plus homogène des actions clés, des annonces et des ressources scientifiques.',
    ],
    closing: 'Nous continuerons à examiner et à améliorer le site au fil du développement du réseau éditorial et scientifique de Panorama Scholarly Group.',
  },
  es: {
    title: 'Una nueva experiencia digital para Panorama Scholarly Group',
    description: 'El 15 de septiembre de 2026, Panorama Scholarly Group completó una renovación integral de la interfaz de su sitio web para ofrecer una experiencia más clara y coherente en el sitio del grupo y sus sellos editoriales.',
    intro: 'El 15 de septiembre de 2026, Panorama Scholarly Group completó una renovación integral de la interfaz de su sitio web.',
    paragraphs: [
      'La renovación unifica el diseño y la navegación del sitio del grupo y sus sellos editoriales. También aclara la relación entre publicación, investigación, infraestructura, normas y servicios académicos del grupo.',
      'Además, mejora los diseños adaptables y la presentación de las acciones y la información clave para que autores, editores, investigadores y lectores puedan recorrer el sitio con mayor claridad desde distintos dispositivos.',
    ],
    changesTitle: 'La renovación incluye',
    changes: [
      'Un lenguaje visual más coherente en el sitio del grupo y sus sellos editoriales.',
      'Una navegación y una jerarquía de información más claras en las secciones principales.',
      'Diseños adaptables para ofrecer una experiencia más fiable en distintos tamaños de pantalla.',
      'Una presentación más unificada de acciones, anuncios y recursos académicos clave.',
    ],
    closing: 'Seguiremos revisando y mejorando el sitio a medida que evolucione la red editorial y de investigación de Panorama Scholarly Group.',
  },
  ru: {
    title: 'Обновлённый цифровой опыт Panorama Scholarly Group',
    description: '15 сентября 2026 года Panorama Scholarly Group завершила масштабное обновление интерфейса сайта. Оно сделало работу с сайтом группы и её издательскими направлениями более последовательной и понятной.',
    intro: '15 сентября 2026 года Panorama Scholarly Group завершила масштабное обновление интерфейса сайта.',
    paragraphs: [
      'Обновление унифицировало оформление и навигацию сайта группы и её издательских направлений. Оно также прояснило связь между публикациями, исследованиями, инфраструктурой, стандартами и научными сервисами группы.',
      'Мы доработали адаптивную компоновку и представление важных действий и сведений, чтобы авторам, редакторам, исследователям и читателям было удобнее пользоваться сайтом на разных устройствах.',
    ],
    changesTitle: 'В обновление вошли',
    changes: [
      'Более единый визуальный стиль сайта группы и её издательских направлений.',
      'Понятная навигация и структура информации в основных разделах.',
      'Адаптивная компоновка для надёжной работы на экранах разных размеров.',
      'Единый способ представления важных действий, объявлений и научных ресурсов.',
    ],
    closing: 'По мере развития издательской и исследовательской сети Panorama Scholarly Group мы продолжим проверять и улучшать сайт.',
  },
  ar: {
    title: 'تجربة رقمية متجددة لـ Panorama Scholarly Group',
    description: 'في 15 سبتمبر 2026، أكملت Panorama Scholarly Group تحديثًا شاملًا لواجهة موقعها، لتوفير تجربة أوضح وأكثر اتساقًا عبر موقع المجموعة وعلاماتها التحريرية.',
    intro: 'في 15 سبتمبر 2026، أكملت Panorama Scholarly Group تحديثًا شاملًا لواجهة موقعها.',
    paragraphs: [
      'وحّد التحديث المظهر والتنقل في موقع المجموعة وعلاماتها التحريرية، كما أوضح الصلة بين النشر والبحث والبنية التحتية والمعايير والخدمات العلمية للمجموعة.',
      'وحسّن أيضًا التخطيطات المتجاوبة وطريقة عرض الإجراءات والمعلومات المهمة، ليتمكن المؤلفون والمحررون والباحثون والقراء من استخدام الموقع بوضوح أكبر على مختلف الأجهزة.',
    ],
    changesTitle: 'يشمل التحديث',
    changes: [
      'لغة بصرية أكثر اتساقًا في موقع المجموعة وعلاماتها التحريرية.',
      'تنقل أوضح وتسلسل أفضل للمعلومات في الأقسام الأساسية.',
      'تخطيطات متجاوبة لتجربة أكثر موثوقية على أحجام الشاشات المختلفة.',
      'عرض موحّد للإجراءات والإعلانات والموارد العلمية المهمة.',
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
    title: 'Panorama Scholarly Group 签署 DORA 宣言',
    description: 'Panorama Scholarly Group Ltd 已签署《旧金山研究评估宣言》（DORA），重申其致力于负责任的科研评估，并认可多样化的学术贡献。',
    intro: 'Panorama Scholarly Group Ltd 欣然宣布，已签署《旧金山研究评估宣言》（DORA）。',
    paragraphs: [
      '作为机构签署方，我们支持负责任的科研评估。在参考适当的定性与定量证据基础上，我们将综合考量学术成果的质量、意义、开放性、诚信及其更广泛的贡献。',
      '这项承诺将指导集团持续完善编辑指引、期刊信息、元数据和对外沟通。签署宣言并不构成认证，也不保证任何具体的编辑或研究结果；它记录的是我们持续改进的公开承诺。',
    ],
    changesTitle: '我们的承诺包括',
    changes: [
      '认可作者、编辑、审稿人和研究群体所作出的多样贡献。',
      '负责任、透明并结合具体情境使用指标，不以指标取代专家判断。',
      '随着出版项目发展，持续审视相关政策、指引、工作流程和对外沟通。',
      '公开这项承诺，并定期检视其落实情况。',
    ],
    resourcesTitle: '相关资源',
    resources: [
      { label: '阅读 DORA 宣言', href: declarationUrl },
      { label: '查看 DORA 签署方', href: signersUrl },
      { label: 'DORA 标识使用指引', href: badgesUrl },
    ],
    closing: '下方提供 DORA 宣言及官方签署方资源。我们欢迎继续探讨如何实现公平、透明且负责任的科研评估。',
  },
  'zh-hant': {
    title: 'Panorama Scholarly Group 簽署 DORA 宣言',
    description: 'Panorama Scholarly Group Ltd 已簽署《舊金山研究評估宣言》（DORA），重申其致力於負責任的科研評估，並認可多元的學術貢獻。',
    intro: 'Panorama Scholarly Group Ltd 欣然宣布，已簽署《舊金山研究評估宣言》（DORA）。',
    paragraphs: [
      '作為機構簽署方，我們支持負責任的科研評估。在參考適切的定性與定量證據之餘，我們亦會考量學術成果的質素、重要性、開放性、誠信及更廣泛的貢獻。',
      '這項承諾將指引集團持續完善編輯指引、期刊資訊、元資料及對外溝通。簽署宣言並不構成認證，也不保證任何特定的編輯或研究結果；它記錄的是我們持續改進的公開承諾。',
    ],
    changesTitle: '我們的承諾包括',
    changes: [
      '肯定作者、編輯、審稿人及研究社群所作出的多元貢獻。',
      '負責任、透明並因應情境使用指標，不以指標取代專業判斷。',
      '隨著出版計劃發展，持續檢視相關政策、指引、工作流程及對外溝通。',
      '公開這項承諾，並定期檢視其落實情況。',
    ],
    resourcesTitle: '相關資源',
    resources: [
      { label: '閱讀 DORA 宣言', href: declarationUrl },
      { label: '查看 DORA 簽署方', href: signersUrl },
      { label: 'DORA 標誌使用指引', href: badgesUrl },
    ],
    closing: '下方提供 DORA 宣言及官方簽署方資源。我們歡迎繼續探討如何實踐公平、透明且負責任的科研評估。',
  },
  ja: {
    title: 'Panorama Scholarly GroupがDORAに署名',
    description: 'Panorama Scholarly Group Ltdは研究評価に関するサンフランシスコ宣言（DORA）に署名し、責任ある研究評価と多様な学術的貢献の認識への取り組みを改めて表明しました。',
    intro: 'Panorama Scholarly Group Ltdは、研究評価に関するサンフランシスコ宣言（DORA）への署名をお知らせします。',
    paragraphs: [
      '組織署名者として、私たちは責任ある研究評価を支持します。適切な質的・量的根拠を踏まえ、学術成果の質、意義、公開性、誠実性、そしてより広い貢献を総合的に考慮します。',
      'この方針は、グループ全体の編集指針、各誌の情報、メタデータ、対外発信の整備に反映されます。署名は認証ではなく、特定の編集判断や研究成果を保証するものでもありません。継続的な改善への公開の約束を示すものです。',
    ],
    changesTitle: '私たちの取り組み',
    changes: [
      '著者、編集者、査読者、研究コミュニティによる多様な貢献を認識します。',
      '指標を専門家の判断の代わりにせず、責任を持って透明かつ文脈に即して用います。',
      '出版プログラムの発展に応じて、関連方針、指針、業務手順、対外発信を見直します。',
      'この約束を公開し、その実施状況を継続的に確認します。',
    ],
    resourcesTitle: '関連資料',
    resources: [
      { label: 'DORA宣言を読む', href: declarationUrl },
      { label: 'DORA署名機関を見る', href: signersUrl },
      { label: 'DORAバッジの案内', href: badgesUrl },
    ],
    closing: 'DORA宣言と署名機関の公式情報は以下から確認できます。公正で透明性のある責任ある研究評価について、今後も対話を続けていきます。',
  },
  ko: {
    title: 'Panorama Scholarly Group, DORA 선언에 서명',
    description: 'Panorama Scholarly Group Ltd는 연구 평가에 관한 샌프란시스코 선언(DORA)에 서명하며 책임 있는 연구 평가와 다양한 학술적 기여의 인정에 대한 의지를 재확인했습니다.',
    intro: 'Panorama Scholarly Group Ltd가 연구 평가에 관한 샌프란시스코 선언(DORA)에 서명했습니다.',
    paragraphs: [
      '기관 서명 단체로서 책임 있는 연구 평가를 지지합니다. 적절한 정성적·정량적 근거와 함께 학술 활동의 질, 중요성, 개방성, 진실성, 더 넓은 기여를 종합적으로 고려하겠습니다.',
      '이 약속은 그룹 전반의 편집 지침, 학술지 정보, 메타데이터와 대외 소통을 발전시키는 데 반영됩니다. 서명은 인증이나 특정 편집·연구 결과의 보증이 아니며, 지속적인 개선을 위한 공개 약속을 뜻합니다.',
    ],
    changesTitle: '우리의 약속은 다음과 같습니다',
    changes: [
      '저자, 편집자, 심사자와 연구 공동체의 다양한 기여를 인정합니다.',
      '지표를 전문가 판단의 대체물로 삼지 않고 책임 있고 투명하게 맥락에 맞춰 사용합니다.',
      '출판 프로그램이 발전함에 따라 관련 정책, 지침, 업무 절차와 대외 소통을 검토합니다.',
      '이 약속을 공개하고 이행 상황을 지속적으로 살펴봅니다.',
    ],
    resourcesTitle: '관련 자료',
    resources: [
      { label: 'DORA 선언문 읽기', href: declarationUrl },
      { label: 'DORA 서명 기관 보기', href: signersUrl },
      { label: 'DORA 배지 안내', href: badgesUrl },
    ],
    closing: '아래에서 DORA 선언문과 공식 서명 기관 자료를 확인할 수 있습니다. 공정하고 투명하며 책임 있는 연구 평가에 관한 대화를 이어가겠습니다.',
  },
  de: {
    title: 'Panorama Scholarly Group unterzeichnet DORA',
    description: 'Panorama Scholarly Group Ltd hat die San Francisco Declaration on Research Assessment (DORA) unterzeichnet und bekräftigt damit ihr Bekenntnis zu verantwortungsvoller Forschungsbewertung und zur Anerkennung vielfältiger wissenschaftlicher Beiträge.',
    intro: 'Panorama Scholarly Group Ltd gibt bekannt, die San Francisco Declaration on Research Assessment (DORA) unterzeichnet zu haben.',
    paragraphs: [
      'Als institutionelle Unterzeichnerin unterstützen wir eine verantwortungsvolle Bewertung von Forschung. Auf Grundlage geeigneter qualitativer und quantitativer Belege berücksichtigen wir Qualität, Bedeutung, Offenheit und Integrität wissenschaftlicher Arbeiten sowie ihren weiterreichenden Beitrag.',
      'Diese Verpflichtung prägt die Weiterentwicklung redaktioneller Leitlinien, Zeitschrifteninformationen, Metadaten und der öffentlichen Kommunikation in der Gruppe. Die Unterzeichnung ist weder eine Zertifizierung noch eine Garantie für bestimmte redaktionelle oder wissenschaftliche Ergebnisse; sie dokumentiert unser öffentliches Bekenntnis zur kontinuierlichen Verbesserung.',
    ],
    changesTitle: 'Zu unserem Bekenntnis gehört',
    changes: [
      'Die unterschiedlichen Beiträge von Autorinnen und Autoren, Herausgebern, Gutachtern und Forschungsgemeinschaften anzuerkennen.',
      'Kennzahlen verantwortungsvoll, transparent und im jeweiligen Kontext zu nutzen, statt sie an die Stelle fachlicher Urteile zu setzen.',
      'Relevante Richtlinien, Hinweise, Abläufe und öffentliche Mitteilungen mit der Weiterentwicklung unseres Programms zu überprüfen.',
      'Unser Bekenntnis sichtbar zu halten und seine Umsetzung regelmäßig zu prüfen.',
    ],
    resourcesTitle: 'Weiterführende Informationen',
    resources: [
      { label: 'Die DORA-Erklärung lesen', href: declarationUrl },
      { label: 'DORA-Unterzeichner ansehen', href: signersUrl },
      { label: 'Hinweise zum DORA-Siegel', href: badgesUrl },
    ],
    closing: 'Die DORA-Erklärung und die offiziellen Informationen zu den Unterzeichnern finden Sie unten. Wir begrüßen den weiteren Austausch über eine faire, transparente und verantwortungsvolle Forschungsbewertung.',
  },
  fr: {
    title: 'Panorama Scholarly Group signe la DORA',
    description: 'Panorama Scholarly Group Ltd a signé la Déclaration de San Francisco sur l’évaluation de la recherche (DORA), réaffirmant son engagement en faveur d’une évaluation responsable et de la reconnaissance de la diversité des contributions scientifiques.',
    intro: 'Panorama Scholarly Group Ltd annonce avoir signé la Déclaration de San Francisco sur l’évaluation de la recherche (DORA).',
    paragraphs: [
      'En tant que signataire institutionnel, nous soutenons une évaluation responsable de la recherche. En nous appuyant sur des éléments qualitatifs et quantitatifs adaptés, nous prendrons en compte la qualité, la portée, l’ouverture et l’intégrité des travaux, ainsi que leur contribution plus large.',
      'Cet engagement guidera l’évolution des consignes éditoriales, des informations sur les revues, des métadonnées et de la communication du groupe. Il ne constitue ni une certification ni une garantie de résultat éditorial ou scientifique ; il rend public notre engagement en faveur de l’amélioration continue.',
    ],
    changesTitle: 'Notre engagement consiste notamment à',
    changes: [
      'Reconnaître la diversité des contributions des auteurs, rédacteurs, évaluateurs et communautés de recherche.',
      'Utiliser les indicateurs de manière responsable, transparente et contextualisée, sans les substituer au jugement expert.',
      'Réexaminer les politiques, consignes, processus et communications concernés au fil du développement de notre programme éditorial.',
      'Rendre cet engagement visible et suivre sa mise en œuvre dans la durée.',
    ],
    resourcesTitle: 'Ressources associées',
    resources: [
      { label: 'Lire la déclaration DORA', href: declarationUrl },
      { label: 'Voir les signataires de DORA', href: signersUrl },
      { label: 'Guide sur le badge DORA', href: badgesUrl },
    ],
    closing: 'La déclaration DORA et les ressources officielles sur les signataires sont accessibles ci-dessous. Nous souhaitons poursuivre le dialogue sur une évaluation de la recherche équitable, transparente et responsable.',
  },
  es: {
    title: 'Panorama Scholarly Group firma DORA',
    description: 'Panorama Scholarly Group Ltd ha firmado la Declaración de San Francisco sobre la Evaluación de la Investigación (DORA), reafirmando su compromiso con una evaluación responsable y con el reconocimiento de las diversas contribuciones académicas.',
    intro: 'Panorama Scholarly Group Ltd anuncia que ha firmado la Declaración de San Francisco sobre la Evaluación de la Investigación (DORA).',
    paragraphs: [
      'Como entidad firmante, apoyamos una evaluación responsable de la investigación. Junto con pruebas cualitativas y cuantitativas adecuadas, tendremos en cuenta la calidad, importancia, apertura e integridad de los trabajos académicos, así como su contribución más amplia.',
      'Este compromiso orientará el desarrollo de las directrices editoriales, la información de las revistas, los metadatos y las comunicaciones públicas del grupo. No es una certificación ni garantiza un resultado editorial o de investigación concreto; deja constancia de nuestro compromiso público con la mejora continua.',
    ],
    changesTitle: 'Nuestro compromiso incluye',
    changes: [
      'Reconocer las distintas contribuciones de autores, editores, revisores y comunidades de investigación.',
      'Usar las métricas de forma responsable, transparente y contextualizada, sin sustituir el criterio experto.',
      'Revisar las políticas, orientaciones, flujos de trabajo y comunicaciones pertinentes a medida que evolucione nuestro programa editorial.',
      'Mantener visible este compromiso y revisar su aplicación con el tiempo.',
    ],
    resourcesTitle: 'Recursos relacionados',
    resources: [
      { label: 'Leer la declaración DORA', href: declarationUrl },
      { label: 'Consultar las entidades firmantes', href: signersUrl },
      { label: 'Guía sobre el distintivo DORA', href: badgesUrl },
    ],
    closing: 'A continuación están disponibles la declaración DORA y los recursos oficiales para las entidades firmantes. Queremos mantener el diálogo sobre una evaluación de la investigación justa, transparente y responsable.',
  },
  ru: {
    title: 'Panorama Scholarly Group подписала DORA',
    description: 'Panorama Scholarly Group Ltd подписала Сан-Францисскую декларацию об оценке научных исследований (DORA), подтвердив приверженность ответственному оцениванию исследований и признанию разнообразного научного вклада.',
    intro: 'Panorama Scholarly Group Ltd сообщает о подписании Сан-Францисской декларации об оценке научных исследований (DORA).',
    paragraphs: [
      'Как организация-подписант, мы поддерживаем ответственную оценку исследований. Наряду с уместными качественными и количественными данными мы будем учитывать качество, значимость, открытость и добросовестность научных работ, а также их более широкий вклад.',
      'Это обязательство будет учитываться при разработке редакционных рекомендаций, сведений о журналах, метаданных и публичных сообщений группы. Подписание не является сертификацией и не гарантирует конкретного редакционного или исследовательского результата; оно фиксирует наше публичное обязательство постоянно совершенствоваться.',
    ],
    changesTitle: 'Наши обязательства включают',
    changes: [
      'Признание разнообразного вклада авторов, редакторов, рецензентов и исследовательских сообществ.',
      'Ответственное, прозрачное и контекстное применение показателей, которые не заменяют экспертную оценку.',
      'Пересмотр соответствующих политик, рекомендаций, рабочих процессов и публичных сообщений по мере развития издательской программы.',
      'Открытое информирование об этом обязательстве и регулярная оценка его выполнения.',
    ],
    resourcesTitle: 'Связанные ресурсы',
    resources: [
      { label: 'Прочитать декларацию DORA', href: declarationUrl },
      { label: 'Список подписантов DORA', href: signersUrl },
      { label: 'Рекомендации по знаку DORA', href: badgesUrl },
    ],
    closing: 'Ниже доступны текст декларации DORA и официальные материалы о подписантах. Мы приветствуем дальнейший диалог о справедливой, прозрачной и ответственной оценке исследований.',
  },
  ar: {
    title: 'وقّعت Panorama Scholarly Group على DORA',
    description: 'وقّعت Panorama Scholarly Group Ltd على إعلان سان فرانسيسكو لتقييم البحوث (DORA)، مؤكدة التزامها بالتقييم المسؤول للبحوث والاعتراف بتنوع الإسهامات العلمية.',
    intro: 'يسرّ Panorama Scholarly Group Ltd أن تعلن توقيعها على إعلان سان فرانسيسكو لتقييم البحوث (DORA).',
    paragraphs: [
      'بصفتنا جهة مؤسسية موقّعة، ندعم التقييم المسؤول للبحوث. وإلى جانب الأدلة النوعية والكمية المناسبة، سنراعي جودة الأعمال العلمية وأهميتها وانفتاحها ونزاهتها وإسهامها الأوسع.',
      'سيوجّه هذا الالتزام تطوير الإرشادات التحريرية ومعلومات الدوريات والبيانات الوصفية والاتصالات العامة للمجموعة. ولا يمثّل التوقيع اعتمادًا أو ضمانًا لأي نتيجة تحريرية أو بحثية بعينها؛ بل يوثّق التزامنا العلني بالتحسين المستمر.',
    ],
    changesTitle: 'يشمل التزامنا',
    changes: [
      'الاعتراف بتنوع إسهامات المؤلفين والمحررين والمحكّمين ومجتمعات البحث.',
      'استخدام المقاييس بمسؤولية وشفافية وفي سياقها، من دون أن تحل محل التقدير المتخصص.',
      'مراجعة السياسات والإرشادات وسير العمل والاتصالات العامة ذات الصلة مع تطور برنامج النشر.',
      'إبقاء هذا الالتزام معلنًا ومراجعة تنفيذه بمرور الوقت.',
    ],
    resourcesTitle: 'موارد ذات صلة',
    resources: [
      { label: 'اقرأ إعلان DORA', href: declarationUrl },
      { label: 'اطّلع على الجهات الموقّعة', href: signersUrl },
      { label: 'إرشادات شارة DORA', href: badgesUrl },
    ],
    closing: 'يتوفر أدناه إعلان DORA والموارد الرسمية الخاصة بالجهات الموقّعة. ونرحب بمواصلة الحوار حول تقييم البحوث بصورة عادلة وشفافة ومسؤولة.',
  },
};

export function getDoraSignatoryCopy(locale = 'en'): DoraSignatoryCopy {
  return doraSignatoryCopy[locale as LocaleCode] ?? doraSignatoryCopy.en;
}

export function getGroupAnnouncementCopy(id: string, locale = 'en') {
  const copy = id === 'website-ui-update-2026' ? getWebsiteUiUpdateCopy(locale)
    : id === 'dora-signatory-2026' ? getDoraSignatoryCopy(locale)
    : undefined;
  return copy ? { title: copy.title, summary: copy.description } : undefined;
}
