import type { LocaleCode } from './config';

const declarationUrl = 'https://sfdora.org/read/';
const signUrl = 'https://sfdora.org/sign/';
const badgesUrl = 'https://sfdora.org/resource/dora-badges/';

interface AssessmentCard {
  title: string;
  body: string;
}

interface AssessmentSection {
  title: string;
  paragraphs: string[];
  intro?: string;
  cards?: AssessmentCard[];
}

export interface ResearchAssessmentCopy {
  title: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLede: string;
  scopeLabel: string;
  scopeText: string;
  scopeLink: string;
  navLabel: string;
  nav: {
    purpose: string;
    principles: string;
    indicators: string;
    publishing: string;
    implementation: string;
  };
  railLabel: string;
  railStatement: string;
  railMeta: string;
  railNote: string;
  sections: {
    purpose: AssessmentSection;
    principles: AssessmentSection;
    indicators: AssessmentSection;
    publishing: AssessmentSection;
    implementation: AssessmentSection;
  };
  doraLogoAlt: string;
  doraCaption: string;
  declarationLinkLabel: string;
  signLinkLabel: string;
  badgesLinkLabel: string;
  relatedTitle: string;
  relatedIntro: string;
  relatedLinks: AssessmentCard[];
  footer: string;
}

const copy: Record<LocaleCode, ResearchAssessmentCopy> = {
  en: {
    title: 'Responsible Research Assessment',
    metaDescription: 'Panorama Scholarly Group’s commitment to responsible research assessment and the principles of the San Francisco Declaration on Research Assessment.',
    heroEyebrow: 'Responsible research assessment',
    heroTitle: 'Evaluate the work, not the venue.',
    heroLede: 'Panorama Scholarly Group supports the San Francisco Declaration on Research Assessment (DORA) and is developing publishing practices that recognise quality, integrity, openness, and contribution beyond journal-based metrics.',
    scopeLabel: 'Group-level commitment',
    scopeText: 'Applies across journals, books, scholarly services, and the editorial practices maintained by Panorama Scholarly Group.',
    scopeLink: 'Read the commitment',
    navLabel: 'On this page',
    nav: { purpose: 'Purpose and scope', principles: 'Our principles', indicators: 'Indicators in context', publishing: 'Publishing practice', implementation: 'Implementation and review' },
    railLabel: 'A more complete record',
    railStatement: 'Quality is not a number attached to a journal.',
    railMeta: 'DORA-aligned publishing practice',
    railNote: 'This statement describes our current commitment and the areas we will continue to improve.',
    sections: {
      purpose: {
        title: 'Purpose and scope',
        paragraphs: [
          'Research is communicated through many forms: articles, books, data, software, methods, reviews, public scholarship, and contributions to policy and practice. Responsible assessment should be able to see that range rather than reducing quality to the identity or rank of a publication venue.',
          'This group-level commitment applies to the editorial and publishing practices maintained by Panorama Scholarly Group and its imprints. It complements our Editorial Standards and Publication Ethics policy; it does not replace the scope or decision criteria of an individual journal or book project.',
        ],
      },
      principles: {
        title: 'Three principles guide our approach',
        intro: 'We use DORA as a practical framework for improving how scholarly work is described, assessed, and presented to authors, editors, reviewers, readers, and partners.',
        paragraphs: [],
        cards: [
          { title: 'Assess the work on its merits.', body: 'Editorial and publishing decisions should attend to the work’s question, evidence, method, reasoning, originality, clarity, and contribution, not to the reputation of the venue alone.' },
          { title: 'Use indicators responsibly.', body: 'Quantitative information can provide useful context, but it is not a substitute for expert judgement. Indicators should be clear, transparent, specific, contextual, and fair.' },
          { title: 'Recognise diverse contributions.', body: 'Research quality and influence may be expressed through data, software, methods, review, teaching, policy, practice, community engagement, and other contributions alongside publications.' },
        ],
      },
      indicators: {
        title: 'Indicators belong in context',
        paragraphs: [
          'We do not use Journal Impact Factor, journal rank, citation counts, or similar indicators as stand-alone proxies for the quality of an individual article, author, or researcher. A journal-level measure describes a journal-level pattern; it does not determine the value of every work published there.',
          'Where quantitative indicators are relevant, we will explain what they measure, identify their limitations, and interpret them alongside the content and context of the work. We will avoid presenting a single number as a complete account of scholarly quality or impact.',
        ],
      },
      publishing: {
        title: 'What this means for our publications',
        paragraphs: [
          'We will continue to make article-level information, contributor roles, research outputs, licensing, corrections, and other signals of scholarly value easier to understand and discover. The relevant information may differ by journal, discipline, and publication type.',
          'Our promotional and editorial communications should describe the work itself and its contribution. We will not present a journal-based metric as a guarantee of the quality, importance, or likely reception of a particular submission or publication.',
        ],
      },
      implementation: {
        title: 'Implementation and review',
        paragraphs: [
          'This statement is a public commitment to continuous improvement, not a certification or claim that every practice is complete. We will review relevant author guidance, journal information, metadata, promotional language, and editorial workflows as the publishing programme develops.',
          'Questions about this commitment can be directed to Panorama Scholarly Group. We welcome constructive feedback from authors, editors, reviewers, librarians, researchers, and readers about how responsible assessment can be made clearer and more useful.',
        ],
      },
    },
    doraLogoAlt: 'DORA: San Francisco Declaration on Research Assessment',
    doraCaption: 'DORA is a global initiative supporting practical and robust approaches to research assessment. The mark links to the official declaration and is used here as a reference to the principles described on this page.',
    declarationLinkLabel: 'Read the DORA declaration',
    signLinkLabel: 'Sign DORA',
    badgesLinkLabel: 'DORA badge guidance',
    relatedTitle: 'Related standards',
    relatedIntro: 'Responsible assessment sits alongside the standards that govern editorial decisions, research integrity, and the care of the scholarly record.',
    relatedLinks: [
      { title: 'Editorial Standards', body: 'Editorial judgement, peer review, authorship, disclosure, and corrections.', },
      { title: 'Publication Ethics', body: 'Research integrity, fair editorial practice, and stewardship of the published record.', },
      { title: 'Scholarly Infrastructure', body: 'Identifiers, metadata, discovery, preservation, and the visibility of research outputs.', },
    ],
    footer: 'This statement is informed by the San Francisco Declaration on Research Assessment (DORA). DORA is not a regulator or accreditation body; signing is a voluntary public commitment to responsible research assessment.',
  },
  'zh-hans': {
    title: '负责任的研究评价',
    metaDescription: 'Panorama Scholarly Group 关于负责任研究评价及《旧金山研究评价宣言》原则的集团级承诺。',
    heroEyebrow: '负责任的研究评价',
    heroTitle: '评价研究成果，而不是评价发表场所。',
    heroLede: 'Panorama Scholarly Group 支持《旧金山研究评价宣言》（DORA），并持续完善出版实践，以在期刊指标之外，更完整地识别成果的质量、诚信、开放性与学术贡献。',
    scopeLabel: '集团级承诺',
    scopeText: '适用于 Panorama Scholarly Group 及其出版品牌所维护的期刊、图书、学术服务与编辑出版实践。',
    scopeLink: '阅读承诺',
    navLabel: '本页内容',
    nav: { purpose: '目的与适用范围', principles: '我们的原则', indicators: '在语境中使用指标', publishing: '出版实践', implementation: '实施与审查' },
    railLabel: '更完整的学术记录',
    railStatement: '质量不是附着在期刊上的一个数字。',
    railMeta: '符合 DORA 原则的出版实践',
    railNote: '本声明说明我们当前的承诺以及将持续改进的领域。',
    sections: {
      purpose: { title: '目的与适用范围', paragraphs: ['研究通过多种形式传播，包括论文、图书、数据、软件、方法、综述、公共学术成果，以及对政策和实践的贡献。负责任的评价应当看见这种多样性，而不应将质量简化为发表场所的身份或排名。', '本集团级承诺适用于 Panorama Scholarly Group 及其出版品牌所维护的编辑与出版实践。它与《编辑标准》和《出版伦理》政策相互补充，但不取代具体期刊或图书项目的学科范围与决定标准。'] },
      principles: { title: '三项原则指导我们的做法', intro: '我们将 DORA 作为改进学术成果描述、评价和呈现方式的实践框架，服务于作者、编辑、审稿人、读者与合作伙伴。', paragraphs: [], cards: [
        { title: '依据成果本身进行评价。', body: '编辑和出版决策应关注研究问题、证据、方法、推理、原创性、清晰度和贡献，而不是仅依据发表场所的声誉。' },
        { title: '负责任地使用指标。', body: '定量信息可以提供有用的背景，但不能替代专业判断。指标应当清晰、透明、具体、符合语境且公平。' },
        { title: '承认多元学术贡献。', body: '研究质量和影响可以体现为数据、软件、方法、评审、教学、政策、实践、社区参与及其他贡献，而不只体现为论文。' },
      ] },
      indicators: { title: '指标必须置于语境中', paragraphs: ['我们不将期刊影响因子、期刊排名、引用次数或类似指标，单独作为评价单篇文章、作者或研究人员质量的替代依据。期刊层面的指标描述的是期刊层面的模式，不能决定其中每项成果的价值。', '在定量指标确有相关性的情况下，我们会说明其测量对象和局限，并结合成果内容及其语境进行解释。我们不会把单一数字呈现为学术质量或影响力的完整说明。'] },
      publishing: { title: '这对我们的出版意味着什么', paragraphs: ['我们将持续提高文章层面信息、贡献者角色、研究成果、许可信息、更正信息及其他学术价值信号的可理解性和可发现性。具体信息会根据期刊、学科和出版类型有所不同。', '我们的宣传和编辑沟通应当说明成果本身及其贡献。我们不会把期刊指标作为某项投稿或出版物质量、重要性或可能反响的保证。'] },
      implementation: { title: '实施与审查', paragraphs: ['本声明是持续改进的公开承诺，不是认证，也不表示所有实践已经完成。随着出版项目发展，我们将审查作者指南、期刊信息、元数据、宣传语言和编辑流程。', '如对本承诺有疑问，可联系 Panorama Scholarly Group。我们欢迎作者、编辑、审稿人、馆员、研究人员和读者提出建设性意见，帮助我们使负责任的研究评价更加清晰和有用。'] },
    },
    doraLogoAlt: 'DORA：旧金山研究评价宣言',
    doraCaption: 'DORA 是一项支持改进研究评价实践的全球倡议。本标识链接至官方宣言，在此作为本页所述原则的参考标识使用。',
    declarationLinkLabel: '阅读 DORA 宣言', signLinkLabel: '签署 DORA', badgesLinkLabel: 'DORA 标识使用说明',
    relatedTitle: '相关标准', relatedIntro: '负责任的研究评价与编辑决策、研究诚信及学术记录维护标准相互衔接。',
    relatedLinks: [{ title: '编辑标准', body: '编辑判断、同行评审、作者署名、利益披露与勘误。' }, { title: '出版伦理', body: '研究诚信、公平编辑实践与已出版学术记录维护。' }, { title: '学术基础设施', body: '标识符、元数据、发现、保存与研究成果的可见性。' }],
    footer: '本声明参考《旧金山研究评价宣言》（DORA）。DORA 不是监管机构或认证机构；签署是对负责任研究评价的自愿公开承诺。',
  },
  'zh-hant': {
    title: '負責任的研究評估',
    metaDescription: 'Panorama Scholarly Group 關於負責任研究評估及《舊金山研究評估宣言》原則的集團級承諾。',
    heroEyebrow: '負責任的研究評估', heroTitle: '評估研究成果，而不是評估發表場所。',
    heroLede: 'Panorama Scholarly Group 支持《舊金山研究評估宣言》（DORA），並持續完善出版實踐，以在期刊指標之外，更完整地識別成果的質量、誠信、開放性與學術貢獻。',
    scopeLabel: '集團級承諾', scopeText: '適用於 Panorama Scholarly Group 及其出版品牌所維護的期刊、圖書、學術服務與編輯出版實踐。', scopeLink: '閱讀承諾',
    navLabel: '本頁內容', nav: { purpose: '目的與適用範圍', principles: '我們的原則', indicators: '在語境中使用指標', publishing: '出版實踐', implementation: '實施與審查' },
    railLabel: '更完整的學術記錄', railStatement: '質量不是附著在期刊上的一個數字。', railMeta: '符合 DORA 原則的出版實踐', railNote: '本聲明說明我們目前的承諾以及將持續改進的領域。',
    sections: {
      purpose: { title: '目的與適用範圍', paragraphs: ['研究通過多種形式傳播，包括論文、圖書、數據、軟件、方法、綜述、公共學術成果，以及對政策和實踐的貢獻。負責任的評估應當看見這種多樣性，而不應將質量簡化為發表場所的身份或排名。', '本集團級承諾適用於 Panorama Scholarly Group 及其出版品牌所維護的編輯與出版實踐。它與《編輯標準》和《出版倫理》政策相互補充，但不取代具體期刊或圖書項目的學科範圍與決定標準。'] },
      principles: { title: '三項原則指導我們的做法', intro: '我們將 DORA 作為改進學術成果描述、評估和呈現方式的實踐框架，服務於作者、編輯、審稿人、讀者與合作夥伴。', paragraphs: [], cards: [{ title: '依據成果本身進行評估。', body: '編輯和出版決策應關注研究問題、證據、方法、推理、原創性、清晰度和貢獻，而不是僅依據發表場所的聲譽。' }, { title: '負責任地使用指標。', body: '定量信息可以提供有用的背景，但不能替代專業判斷。指標應當清晰、透明、具體、符合語境且公平。' }, { title: '承認多元學術貢獻。', body: '研究質量和影響可以體現為數據、軟件、方法、評審、教學、政策、實踐、社區參與及其他貢獻，而不只體現為論文。' }] },
      indicators: { title: '指標必須置於語境中', paragraphs: ['我們不將期刊影響因子、期刊排名、引用次數或類似指標，單獨作為評估單篇文章、作者或研究人員質量的替代依據。期刊層面的指標描述的是期刊層面的模式，不能決定其中每項成果的價值。', '在定量指標確有相關性的情況下，我們會說明其測量對象和局限，並結合成果內容及其語境進行解釋。我們不會把單一數字呈現為學術質量或影響力的完整說明。'] },
      publishing: { title: '這對我們的出版意味著什麼', paragraphs: ['我們將持續提高文章層面信息、貢獻者角色、研究成果、授權信息、更正信息及其他學術價值信號的可理解性和可發現性。具體信息會根據期刊、學科和出版類型有所不同。', '我們的宣傳和編輯溝通應當說明成果本身及其貢獻。我們不會把期刊指標作為某項投稿或出版物質量、重要性或可能反響的保證。'] },
      implementation: { title: '實施與審查', paragraphs: ['本聲明是持續改進的公開承諾，不是認證，也不表示所有實踐已經完成。隨著出版項目發展，我們將審查作者指南、期刊信息、元數據、宣傳語言和編輯流程。', '如對本承諾有疑問，可聯絡 Panorama Scholarly Group。我們歡迎作者、編輯、審稿人、館員、研究人員和讀者提出建設性意見，幫助我們使負責任的研究評估更加清晰和有用。'] },
    },
    doraLogoAlt: 'DORA：舊金山研究評估宣言', doraCaption: 'DORA 是一項支持改進研究評估實踐的全球倡議。本標識連結至官方宣言，在此作為本頁所述原則的參考標識使用。', declarationLinkLabel: '閱讀 DORA 宣言', signLinkLabel: '簽署 DORA', badgesLinkLabel: 'DORA 標識使用說明', relatedTitle: '相關標準', relatedIntro: '負責任的研究評估與編輯決策、研究誠信及學術記錄維護標準相互銜接。', relatedLinks: [{ title: '編輯標準', body: '編輯判斷、同行評審、作者署名、利益披露與勘誤。' }, { title: '出版倫理', body: '研究誠信、公平編輯實踐與已出版學術記錄維護。' }, { title: '學術基礎設施', body: '標識符、元數據、發現、保存與研究成果的可見性。' }], footer: '本聲明參考《舊金山研究評估宣言》（DORA）。DORA 不是監管機構或認證機構；簽署是對負責任研究評估的自願公開承諾。',
  },
  ja: {
    title: '責任ある研究評価', metaDescription: 'Panorama Scholarly Groupによる責任ある研究評価とサンフランシスコ研究評価宣言（DORA）の原則への取り組み。', heroEyebrow: '責任ある研究評価', heroTitle: '評価するのは掲載先ではなく、研究そのものです。', heroLede: 'Panorama Scholarly Groupはサンフランシスコ研究評価宣言（DORA）を支持し、ジャーナル指標だけでは捉えられない質、誠実性、開放性、貢献を認識する出版実践を整備します。', scopeLabel: 'グループ共通の取り組み', scopeText: 'Panorama Scholarly Groupと各インプリントが担う学術誌、書籍、学術サービス、編集・出版実践に適用します。', scopeLink: '取り組みを読む', navLabel: 'このページ', nav: { purpose: '目的と範囲', principles: '基本原則', indicators: '指標の文脈', publishing: '出版実践', implementation: '実施と見直し' }, railLabel: 'より完全な学術記録', railStatement: '質は、学術誌に付された一つの数字ではありません。', railMeta: 'DORAに沿った出版実践', railNote: 'この声明は現在の取り組みと、継続して改善する領域を示します。', sections: {
      purpose: { title: '目的と範囲', paragraphs: ['研究は、論文、書籍、データ、ソフトウェア、方法、レビュー、公共的な学術活動、政策や実践への貢献など、多様な形で共有されます。責任ある評価はその多様性を捉え、掲載先の名称や順位だけに質を還元するものではありません。', 'このグループ共通の取り組みは、Panorama Scholarly Groupと各インプリントが担う編集・出版実践に適用します。編集基準および出版倫理方針を補完するものであり、個別の学術誌や書籍企画の分野範囲・判断基準に取って代わるものではありません。'] },
      principles: { title: '三つの原則', intro: 'DORAを、学術成果の記述、評価、提示方法を改善するための実践的な枠組みとして用います。', paragraphs: [], cards: [{ title: '成果そのものを評価する。', body: '編集・出版の判断では、研究課題、証拠、方法、推論、独創性、明確さ、貢献を重視し、掲載先の名声だけに依存しません。' }, { title: '指標を責任ある形で使う。', body: '定量情報は文脈を補うものですが、専門的判断の代わりにはなりません。指標は明確で透明性があり、具体的で文脈に即し、公平であるべきです。' }, { title: '多様な貢献を認める。', body: '研究の質や影響は、出版物に加え、データ、ソフトウェア、方法、査読、教育、政策、実践、社会との関わりなどにも表れます。' }] },
      indicators: { title: '指標は文脈の中で用いる', paragraphs: ['Journal Impact Factor、学術誌の順位、引用数などを、個々の論文、著者、研究者の質を示す単独の代理指標として使用しません。学術誌の指標が示すのは学術誌全体の傾向であり、そこに掲載された個々の成果の価値を決めるものではありません。', '定量指標を用いる場合は、何を測るものかと限界を説明し、成果の内容と文脈とともに解釈します。一つの数字を学術的な質や影響の全体像として示すことは避けます。'] },
      publishing: { title: '出版実践への反映', paragraphs: ['論文レベルの情報、貢献者の役割、研究成果、ライセンス、訂正、その他の学術的価値を示す情報を、より分かりやすく発見しやすい形で提供できるよう改善します。具体的な情報は学術誌、分野、出版形式によって異なります。', '広報および編集上の案内では、成果そのものとその貢献を説明します。学術誌の指標を、特定の投稿や出版物の質、重要性、反響を保証するものとして示しません。'] },
      implementation: { title: '実施と見直し', paragraphs: ['この声明は継続的な改善への公開の取り組みであり、認証でも、すべての実践が完了したという主張でもありません。出版プログラムの発展に合わせ、著者向け案内、学術誌情報、メタデータ、広報表現、編集ワークフローを見直します。', 'この取り組みへの質問はPanorama Scholarly Groupまでお寄せください。著者、編集者、査読者、図書館員、研究者、読者から、責任ある研究評価をより明確で有用にするための建設的な意見を歓迎します。'] },
    }, doraLogoAlt: 'DORA: サンフランシスコ研究評価宣言', doraCaption: 'DORAは研究評価の実践的で堅牢な改善を支援する国際的な取り組みです。このマークは公式宣言にリンクし、本ページの原則を参照するために使用しています。', declarationLinkLabel: 'DORA宣言を読む', signLinkLabel: 'DORAに署名する', badgesLinkLabel: 'DORAバッジの案内', relatedTitle: '関連する基準', relatedIntro: '責任ある研究評価は、編集判断、研究公正、学術記録の管理に関する基準と連動します。', relatedLinks: [{ title: '編集基準', body: '編集判断、査読、著者表示、開示、訂正。' }, { title: '出版倫理', body: '研究公正、公平な編集実践、公開記録の管理。' }, { title: '学術基盤', body: '識別子、メタデータ、発見、保存、研究成果の可視性。' }], footer: 'この声明はサンフランシスコ研究評価宣言（DORA）を踏まえています。DORAは規制機関や認証機関ではなく、署名は責任ある研究評価への任意の公開コミットメントです。',
  },
  ko: {
    title: '책임 있는 연구 평가', metaDescription: 'Panorama Scholarly Group의 책임 있는 연구 평가와 샌프란시스코 연구 평가 선언(DORA) 원칙에 대한 그룹 차원의 약속.', heroEyebrow: '책임 있는 연구 평가', heroTitle: '평가해야 할 것은 게재처가 아니라 연구입니다.', heroLede: 'Panorama Scholarly Group은 샌프란시스코 연구 평가 선언(DORA)을 지지하며, 저널 지표만으로는 포착하기 어려운 연구의 질, 진실성, 개방성, 기여를 인정하는 출판 관행을 발전시킵니다.', scopeLabel: '그룹 차원의 약속', scopeText: 'Panorama Scholarly Group과 각 임프린트가 운영하는 저널, 도서, 학술 서비스와 편집·출판 관행에 적용됩니다.', scopeLink: '약속의 내용 읽기', navLabel: '이 페이지', nav: { purpose: '목적과 범위', principles: '우리의 원칙', indicators: '맥락 속 지표', publishing: '출판 관행', implementation: '이행과 검토' }, railLabel: '더 완전한 학술 기록', railStatement: '질은 저널에 붙은 하나의 숫자가 아닙니다.', railMeta: 'DORA에 부합하는 출판 관행', railNote: '이 성명은 현재의 약속과 앞으로 계속 개선할 영역을 설명합니다.', sections: {
      purpose: { title: '목적과 범위', paragraphs: ['연구는 논문, 도서, 데이터, 소프트웨어, 방법론, 리뷰, 공공 학술 활동, 정책과 실천에 대한 기여 등 다양한 형태로 공유됩니다. 책임 있는 평가는 이러한 다양성을 포착해야 하며, 질을 게재처의 이름이나 순위로 축소해서는 안 됩니다.', '이 그룹 차원의 약속은 Panorama Scholarly Group과 각 임프린트가 유지하는 편집·출판 관행에 적용됩니다. 편집 기준 및 출판 윤리 정책을 보완하지만, 개별 저널이나 도서 프로젝트의 분야 범위와 판단 기준을 대신하지 않습니다.'] },
      principles: { title: '세 가지 원칙', intro: 'DORA를 학술 성과를 설명하고 평가하며 제시하는 방식을 개선하기 위한 실천적 틀로 활용합니다.', paragraphs: [], cards: [{ title: '성과 자체의 가치를 평가합니다.', body: '편집·출판 결정은 연구 질문, 증거, 방법, 추론, 독창성, 명확성, 기여를 살펴보며 게재처의 명성에만 의존하지 않습니다.' }, { title: '지표를 책임 있게 사용합니다.', body: '정량 정보는 맥락을 보완할 수 있지만 전문가의 판단을 대신하지 않습니다. 지표는 명확하고 투명하며 구체적이고 맥락에 맞으며 공정해야 합니다.' }, { title: '다양한 기여를 인정합니다.', body: '연구의 질과 영향은 출판물뿐 아니라 데이터, 소프트웨어, 방법, 심사, 교육, 정책, 실천, 사회 참여 등으로도 나타날 수 있습니다.' }] },
      indicators: { title: '지표는 맥락 속에서 사용합니다.', paragraphs: ['Journal Impact Factor, 저널 순위, 인용 수 또는 유사한 지표를 개별 논문, 저자 또는 연구자의 질을 대신하는 단독 기준으로 사용하지 않습니다. 저널 수준의 지표는 저널 전체의 경향을 설명할 뿐, 그 안에 실린 각 성과의 가치를 결정하지 않습니다.', '정량 지표가 관련되는 경우 무엇을 측정하는지와 한계를 설명하고, 성과의 내용 및 맥락과 함께 해석합니다. 하나의 숫자를 학술적 질이나 영향의 완전한 설명으로 제시하지 않습니다.'] },
      publishing: { title: '출판 관행에 반영하는 내용', paragraphs: ['논문 수준의 정보, 기여자 역할, 연구 산출물, 라이선스, 정정 및 학술적 가치를 보여 주는 정보를 더 이해하기 쉽고 발견하기 쉬운 방식으로 제공하도록 계속 개선합니다. 구체적인 정보는 저널, 분야, 출판 유형에 따라 달라질 수 있습니다.', '홍보와 편집 안내에서는 성과 자체와 그 기여를 설명합니다. 저널 기반 지표를 특정 투고물이나 출판물의 질, 중요성 또는 예상 반응을 보장하는 수단으로 제시하지 않습니다.'] },
      implementation: { title: '이행과 검토', paragraphs: ['이 성명은 지속적인 개선에 대한 공개 약속이며 인증이나 모든 관행이 이미 완성되었다는 주장이 아닙니다. 출판 프로그램이 발전함에 따라 저자 안내, 저널 정보, 메타데이터, 홍보 문구 및 편집 업무 흐름을 검토합니다.', '이 약속에 관한 질문은 Panorama Scholarly Group으로 보내 주십시오. 책임 있는 연구 평가를 더 명확하고 유용하게 만들기 위한 저자, 편집자, 심사자, 사서, 연구자, 독자의 건설적인 의견을 환영합니다.'] },
    }, doraLogoAlt: 'DORA: 샌프란시스코 연구 평가 선언', doraCaption: 'DORA는 연구 평가를 실질적이고 견고하게 개선하기 위한 국제적 이니셔티브입니다. 이 표시는 공식 선언으로 연결되며 이 페이지의 원칙을 참고하기 위해 사용합니다.', declarationLinkLabel: 'DORA 선언 읽기', signLinkLabel: 'DORA 서명하기', badgesLinkLabel: 'DORA 배지 안내', relatedTitle: '관련 기준', relatedIntro: '책임 있는 연구 평가는 편집 결정, 연구 진실성, 학술 기록 관리에 관한 기준과 함께 작동합니다.', relatedLinks: [{ title: '편집 기준', body: '편집 판단, 동료심사, 저자 표시, 공개 및 정정.' }, { title: '출판 윤리', body: '연구 진실성, 공정한 편집 관행 및 공개 기록 관리.' }, { title: '학술 인프라', body: '식별자, 메타데이터, 검색, 보존 및 연구 성과의 가시성.' }], footer: '이 성명은 샌프란시스코 연구 평가 선언(DORA)을 바탕으로 합니다. DORA는 규제기관이나 인증기관이 아니며, 서명은 책임 있는 연구 평가에 대한 자발적 공개 약속입니다.',
  },
  de: {
    title: 'Verantwortungsvolle Forschungsbewertung', metaDescription: 'Die Verpflichtung der Panorama Scholarly Group zu verantwortungsvoller Forschungsbewertung und den Grundsätzen der San Francisco Declaration on Research Assessment.', heroEyebrow: 'Verantwortungsvolle Forschungsbewertung', heroTitle: 'Bewertet wird die Arbeit, nicht der Publikationsort.', heroLede: 'Die Panorama Scholarly Group unterstützt die San Francisco Declaration on Research Assessment (DORA) und entwickelt Publikationspraktiken weiter, die Qualität, Integrität, Offenheit und Beiträge über zeitschriftenbasierte Kennzahlen hinaus berücksichtigen.', scopeLabel: 'Gruppenweite Verpflichtung', scopeText: 'Gilt für Zeitschriften, Bücher, wissenschaftliche Dienste sowie die von der Panorama Scholarly Group gepflegten redaktionellen und verlegerischen Praktiken.', scopeLink: 'Die Verpflichtung lesen', navLabel: 'Auf dieser Seite', nav: { purpose: 'Zweck und Geltungsbereich', principles: 'Unsere Grundsätze', indicators: 'Kennzahlen im Kontext', publishing: 'Publikationspraxis', implementation: 'Umsetzung und Überprüfung' }, railLabel: 'Ein vollständigerer wissenschaftlicher Datensatz', railStatement: 'Qualität ist keine Zahl, die einer Zeitschrift angeheftet wird.', railMeta: 'DORA-orientierte Publikationspraxis', railNote: 'Diese Erklärung beschreibt unsere gegenwärtige Verpflichtung und die Bereiche, die wir weiterentwickeln werden.', sections: {
      purpose: { title: 'Zweck und Geltungsbereich', paragraphs: ['Forschung wird in vielen Formen vermittelt: in Artikeln, Büchern, Daten, Software, Methoden, Reviews, öffentlicher Wissenschaft sowie Beiträgen zu Politik und Praxis. Eine verantwortungsvolle Bewertung muss diese Vielfalt berücksichtigen und Qualität darf nicht auf den Namen oder Rang eines Publikationsortes reduziert werden.', 'Diese gruppenweite Verpflichtung gilt für die redaktionellen und verlegerischen Praktiken der Panorama Scholarly Group und ihrer Imprints. Sie ergänzt unsere Editorial Standards und unsere Publikationsethik, ersetzt aber nicht den fachlichen Geltungsbereich oder die Entscheidungskriterien einer einzelnen Zeitschrift oder eines Buchprojekts.'] },
      principles: { title: 'Drei Grundsätze leiten unseren Ansatz', intro: 'Wir nutzen DORA als praktischen Rahmen, um die Beschreibung, Bewertung und Darstellung wissenschaftlicher Arbeiten zu verbessern.', paragraphs: [], cards: [{ title: 'Die Arbeit nach ihrem eigenen Wert bewerten.', body: 'Redaktionelle und verlegerische Entscheidungen sollen Fragestellung, Evidenz, Methode, Argumentation, Originalität, Klarheit und Beitrag berücksichtigen, nicht allein das Ansehen des Publikationsortes.' }, { title: 'Kennzahlen verantwortungsvoll verwenden.', body: 'Quantitative Angaben können Kontext liefern, ersetzen aber kein fachliches Urteil. Kennzahlen sollen klar, transparent, spezifisch, kontextbezogen und fair sein.' }, { title: 'Vielfältige Beiträge anerkennen.', body: 'Qualität und Wirkung können sich neben Publikationen auch in Daten, Software, Methoden, Begutachtung, Lehre, Politik, Praxis und gesellschaftlichem Engagement zeigen.' }] },
      indicators: { title: 'Kennzahlen gehören in ihren Kontext', paragraphs: ['Wir verwenden den Journal Impact Factor, Zeitschriftenrankings, Zitationszahlen oder vergleichbare Kennzahlen nicht als alleinige Ersatzmaße für die Qualität einzelner Artikel, Autoren oder Forschender. Eine Kennzahl auf Zeitschriftenebene beschreibt ein Muster der Zeitschrift, nicht den Wert jeder darin veröffentlichten Arbeit.', 'Wenn quantitative Kennzahlen relevant sind, erläutern wir ihren Gegenstand und ihre Grenzen und interpretieren sie gemeinsam mit Inhalt und Kontext der Arbeit. Eine einzelne Zahl wird nicht als vollständige Darstellung wissenschaftlicher Qualität oder Wirkung präsentiert.'] },
      publishing: { title: 'Was dies für unsere Publikationen bedeutet', paragraphs: ['Wir verbessern fortlaufend die Verständlichkeit und Auffindbarkeit von Informationen auf Artikelebene, Beitragsrollen, Forschungsergebnissen, Lizenzen, Korrekturen und weiteren Hinweisen auf wissenschaftlichen Wert. Die konkreten Informationen können je nach Zeitschrift, Fachgebiet und Publikationstyp variieren.', 'In unserer Kommunikation und unseren redaktionellen Hinweisen beschreiben wir die Arbeit selbst und ihren Beitrag. Zeitschriftenbezogene Kennzahlen werden nicht als Garantie für Qualität, Bedeutung oder erwartete Resonanz einer Einreichung oder Publikation dargestellt.'] },
      implementation: { title: 'Umsetzung und Überprüfung', paragraphs: ['Diese Erklärung ist eine öffentliche Verpflichtung zur kontinuierlichen Verbesserung, keine Zertifizierung und keine Behauptung, dass jede Praxis bereits abgeschlossen ist. Mit der Entwicklung unseres Publikationsprogramms überprüfen wir Autoreninformationen, Zeitschriftenseiten, Metadaten, Werbesprache und redaktionelle Abläufe.', 'Fragen zu dieser Verpflichtung können an die Panorama Scholarly Group gerichtet werden. Wir begrüßen konstruktives Feedback von Autoren, Redakteuren, Gutachtern, Bibliotheken, Forschenden und Lesern.'] },
    }, doraLogoAlt: 'DORA: San Francisco Declaration on Research Assessment', doraCaption: 'DORA ist eine globale Initiative für praktische und belastbare Ansätze der Forschungsbewertung. Die Marke verlinkt auf die offizielle Erklärung und dient hier als Hinweis auf die auf dieser Seite beschriebenen Grundsätze.', declarationLinkLabel: 'DORA-Erklärung lesen', signLinkLabel: 'DORA unterzeichnen', badgesLinkLabel: 'Hinweise zu DORA-Badges', relatedTitle: 'Verwandte Standards', relatedIntro: 'Verantwortungsvolle Forschungsbewertung ergänzt die Standards für redaktionelle Entscheidungen, Forschungsintegrität und die Pflege des wissenschaftlichen Datensatzes.', relatedLinks: [{ title: 'Editorial Standards', body: 'Redaktionelles Urteil, Peer Review, Autorenschaft, Offenlegung und Korrekturen.' }, { title: 'Publikationsethik', body: 'Forschungsintegrität, faire redaktionelle Praxis und Pflege des veröffentlichten Datensatzes.' }, { title: 'Wissenschaftliche Infrastruktur', body: 'Identifikatoren, Metadaten, Auffindbarkeit, Bewahrung und Sichtbarkeit von Forschungsergebnissen.' }], footer: 'Diese Erklärung orientiert sich an der San Francisco Declaration on Research Assessment (DORA). DORA ist keine Regulierungs- oder Akkreditierungsstelle; eine Unterzeichnung ist eine freiwillige öffentliche Verpflichtung zu verantwortungsvoller Forschungsbewertung.',
  },
  fr: {
    title: 'Évaluation responsable de la recherche', metaDescription: 'L’engagement de Panorama Scholarly Group en faveur d’une évaluation responsable de la recherche et des principes de la San Francisco Declaration on Research Assessment.', heroEyebrow: 'Évaluation responsable de la recherche', heroTitle: 'Évaluer le travail, pas le lieu de publication.', heroLede: 'Panorama Scholarly Group soutient la San Francisco Declaration on Research Assessment (DORA) et développe des pratiques éditoriales qui reconnaissent la qualité, l’intégrité, l’ouverture et la contribution au-delà des indicateurs fondés sur les revues.', scopeLabel: 'Engagement du groupe', scopeText: 'S’applique aux revues, aux livres, aux services savants et aux pratiques éditoriales et de publication maintenues par Panorama Scholarly Group.', scopeLink: 'Lire l’engagement', navLabel: 'Sur cette page', nav: { purpose: 'Objet et champ', principles: 'Nos principes', indicators: 'Les indicateurs en contexte', publishing: 'Pratique éditoriale', implementation: 'Mise en œuvre et révision' }, railLabel: 'Un dossier scientifique plus complet', railStatement: 'La qualité n’est pas un chiffre attaché à une revue.', railMeta: 'Pratique éditoriale alignée sur DORA', railNote: 'Cette déclaration présente notre engagement actuel et les domaines que nous continuerons à améliorer.', sections: {
      purpose: { title: 'Objet et champ', paragraphs: ['La recherche se transmet sous de nombreuses formes : articles, livres, données, logiciels, méthodes, revues de littérature, travaux savants destinés au public, ainsi que contributions aux politiques et aux pratiques. Une évaluation responsable doit reconnaître cette diversité et ne pas réduire la qualité au nom ou au rang du lieu de publication.', 'Cet engagement s’applique aux pratiques éditoriales et de publication de Panorama Scholarly Group et de ses labels. Il complète nos normes éditoriales et notre politique d’éthique de la publication, sans remplacer le champ ni les critères de décision propres à une revue ou à un projet de livre.'] },
      principles: { title: 'Trois principes orientent notre démarche', intro: 'Nous utilisons DORA comme cadre pratique pour améliorer la manière dont les travaux savants sont décrits, évalués et présentés.', paragraphs: [], cards: [{ title: 'Évaluer le travail selon ses mérites.', body: 'Les décisions éditoriales et de publication doivent considérer la question, les preuves, la méthode, le raisonnement, l’originalité, la clarté et la contribution du travail, et non la seule réputation du lieu de publication.' }, { title: 'Utiliser les indicateurs avec discernement.', body: 'Les informations quantitatives peuvent apporter un contexte, mais elles ne remplacent pas le jugement expert. Les indicateurs doivent être clairs, transparents, précis, contextualisés et équitables.' }, { title: 'Reconnaître la diversité des contributions.', body: 'La qualité et l’influence peuvent aussi s’exprimer par les données, les logiciels, les méthodes, l’évaluation, l’enseignement, les politiques publiques, la pratique et l’engagement social.' }] },
      indicators: { title: 'Les indicateurs doivent être contextualisés', paragraphs: ['Nous n’utilisons pas le Journal Impact Factor, les classements de revues, le nombre de citations ou des indicateurs comparables comme substituts autonomes à la qualité d’un article, d’un auteur ou d’un chercheur. Un indicateur au niveau de la revue décrit une tendance de la revue, non la valeur de chaque travail qui y est publié.', 'Lorsque des indicateurs quantitatifs sont pertinents, nous expliquons ce qu’ils mesurent et leurs limites, puis les interprétons avec le contenu et le contexte du travail. Nous ne présentons pas un chiffre unique comme une description complète de la qualité ou de l’impact scientifique.'] },
      publishing: { title: 'Ce que cela signifie pour nos publications', paragraphs: ['Nous continuerons à rendre plus visibles et plus compréhensibles les informations au niveau de l’article, les rôles des contributeurs, les résultats de recherche, les licences, les corrections et les autres signes de valeur scientifique. Les informations pertinentes peuvent varier selon la revue, la discipline et le type de publication.', 'Nos communications promotionnelles et éditoriales doivent décrire le travail lui-même et sa contribution. Nous ne présenterons pas un indicateur fondé sur la revue comme une garantie de qualité, d’importance ou de réception probable d’une soumission ou d’une publication.'] },
      implementation: { title: 'Mise en œuvre et révision', paragraphs: ['Cette déclaration est un engagement public d’amélioration continue, et non une certification ni l’affirmation que toutes les pratiques sont achevées. Nous réviserons les informations destinées aux auteurs, les pages des revues, les métadonnées, le langage promotionnel et les flux éditoriaux au fil de l’évolution de notre programme de publication.', 'Les questions relatives à cet engagement peuvent être adressées à Panorama Scholarly Group. Nous accueillons les retours constructifs des auteurs, éditeurs, évaluateurs, bibliothécaires, chercheurs et lecteurs.'] },
    }, doraLogoAlt: 'DORA: San Francisco Declaration on Research Assessment', doraCaption: 'DORA est une initiative mondiale qui soutient des approches pratiques et robustes de l’évaluation de la recherche. Le logo renvoie à la déclaration officielle et sert ici de référence aux principes présentés sur cette page.', declarationLinkLabel: 'Lire la déclaration DORA', signLinkLabel: 'Signer DORA', badgesLinkLabel: 'Guide des badges DORA', relatedTitle: 'Normes connexes', relatedIntro: 'L’évaluation responsable de la recherche complète les normes relatives aux décisions éditoriales, à l’intégrité de la recherche et à la gestion du dossier scientifique.', relatedLinks: [{ title: 'Normes éditoriales', body: 'Jugement éditorial, évaluation par les pairs, paternité, déclarations et corrections.' }, { title: 'Éthique de la publication', body: 'Intégrité de la recherche, pratique éditoriale équitable et gestion du dossier publié.' }, { title: 'Infrastructure scientifique', body: 'Identifiants, métadonnées, découverte, conservation et visibilité des résultats.' }], footer: 'Cette déclaration s’inspire de la San Francisco Declaration on Research Assessment (DORA). DORA n’est ni un organisme de réglementation ni un organisme d’accréditation ; la signature constitue un engagement public volontaire en faveur d’une évaluation responsable de la recherche.',
  },
  es: {
    title: 'Evaluación responsable de la investigación', metaDescription: 'Compromiso de Panorama Scholarly Group con la evaluación responsable de la investigación y los principios de la San Francisco Declaration on Research Assessment.', heroEyebrow: 'Evaluación responsable de la investigación', heroTitle: 'Evaluar el trabajo, no el lugar de publicación.', heroLede: 'Panorama Scholarly Group apoya la San Francisco Declaration on Research Assessment (DORA) y desarrolla prácticas editoriales que reconocen la calidad, la integridad, la apertura y la contribución más allá de los indicadores basados en revistas.', scopeLabel: 'Compromiso del grupo', scopeText: 'Se aplica a las revistas, los libros, los servicios académicos y las prácticas editoriales mantenidas por Panorama Scholarly Group y sus sellos.', scopeLink: 'Leer el compromiso', navLabel: 'En esta página', nav: { purpose: 'Finalidad y alcance', principles: 'Nuestros principios', indicators: 'Indicadores en contexto', publishing: 'Práctica editorial', implementation: 'Aplicación y revisión' }, railLabel: 'Un registro académico más completo', railStatement: 'La calidad no es un número unido a una revista.', railMeta: 'Práctica editorial alineada con DORA', railNote: 'Esta declaración describe nuestro compromiso actual y los ámbitos que seguiremos mejorando.', sections: {
      purpose: { title: 'Finalidad y alcance', paragraphs: ['La investigación se comunica de muchas formas: artículos, libros, datos, software, métodos, revisiones, divulgación académica y contribuciones a las políticas y las prácticas. Una evaluación responsable debe reconocer esa diversidad y no reducir la calidad al nombre o la posición del lugar de publicación.', 'Este compromiso se aplica a las prácticas editoriales y de publicación de Panorama Scholarly Group y sus sellos. Complementa nuestras normas editoriales y nuestra política de ética de la publicación, pero no sustituye el alcance ni los criterios de decisión de una revista o un proyecto editorial concreto.'] },
      principles: { title: 'Tres principios orientan nuestro enfoque', intro: 'Utilizamos DORA como marco práctico para mejorar cómo se describen, evalúan y presentan los trabajos académicos.', paragraphs: [], cards: [{ title: 'Evaluar el trabajo por sus méritos.', body: 'Las decisiones editoriales y de publicación deben considerar la pregunta, las pruebas, el método, el razonamiento, la originalidad, la claridad y la contribución del trabajo, no solo la reputación del lugar de publicación.' }, { title: 'Usar los indicadores responsablemente.', body: 'La información cuantitativa puede aportar contexto, pero no sustituye al criterio experto. Los indicadores deben ser claros, transparentes, específicos, contextualizados y justos.' }, { title: 'Reconocer contribuciones diversas.', body: 'La calidad y la influencia también pueden expresarse mediante datos, software, métodos, revisión, docencia, políticas públicas, práctica y participación social.' }] },
      indicators: { title: 'Los indicadores deben interpretarse en contexto', paragraphs: ['No utilizamos el Journal Impact Factor, las clasificaciones de revistas, el número de citas ni indicadores similares como sustitutos independientes de la calidad de un artículo, autor o investigador. Un indicador de revista describe un patrón de la revista, no el valor de cada trabajo publicado en ella.', 'Cuando los indicadores cuantitativos resulten pertinentes, explicaremos qué miden y cuáles son sus limitaciones, y los interpretaremos junto con el contenido y el contexto del trabajo. No presentaremos una única cifra como descripción completa de la calidad o el impacto académico.'] },
      publishing: { title: 'Qué significa para nuestras publicaciones', paragraphs: ['Seguiremos mejorando la visibilidad y la comprensión de la información a nivel de artículo, las funciones de los colaboradores, los resultados de investigación, las licencias, las correcciones y otras señales de valor académico. La información concreta puede variar según la revista, la disciplina y el tipo de publicación.', 'Nuestra comunicación promocional y editorial debe describir el trabajo y su contribución. No presentaremos un indicador basado en la revista como garantía de la calidad, importancia o recepción probable de una propuesta o publicación.'] },
      implementation: { title: 'Aplicación y revisión', paragraphs: ['Esta declaración es un compromiso público de mejora continua, no una certificación ni una afirmación de que todas las prácticas estén completas. Revisaremos las orientaciones para autores, la información de las revistas, los metadatos, el lenguaje promocional y los flujos editoriales a medida que evolucione nuestro programa de publicación.', 'Las preguntas sobre este compromiso pueden dirigirse a Panorama Scholarly Group. Agradecemos los comentarios constructivos de autores, editores, revisores, bibliotecarios, investigadores y lectores.'] },
    }, doraLogoAlt: 'DORA: San Francisco Declaration on Research Assessment', doraCaption: 'DORA es una iniciativa mundial que apoya enfoques prácticos y sólidos para la evaluación de la investigación. El logotipo enlaza con la declaración oficial y se utiliza aquí como referencia de los principios de esta página.', declarationLinkLabel: 'Leer la declaración DORA', signLinkLabel: 'Firmar DORA', badgesLinkLabel: 'Guía de insignias DORA', relatedTitle: 'Normas relacionadas', relatedIntro: 'La evaluación responsable de la investigación complementa las normas sobre decisiones editoriales, integridad de la investigación y cuidado del registro académico.', relatedLinks: [{ title: 'Normas editoriales', body: 'Criterio editorial, revisión por pares, autoría, declaraciones y correcciones.' }, { title: 'Ética de la publicación', body: 'Integridad de la investigación, práctica editorial justa y cuidado del registro publicado.' }, { title: 'Infraestructura académica', body: 'Identificadores, metadatos, descubrimiento, preservación y visibilidad de los resultados.' }], footer: 'Esta declaración se inspira en la San Francisco Declaration on Research Assessment (DORA). DORA no es un organismo regulador ni de acreditación; firmarla es un compromiso público voluntario con la evaluación responsable de la investigación.',
  },
  ru: {
    title: 'Ответственная оценка исследований', metaDescription: 'Обязательство Panorama Scholarly Group поддерживать ответственную оценку исследований и принципы Сан-Францисской декларации об оценке исследований.', heroEyebrow: 'Ответственная оценка исследований', heroTitle: 'Оценивается работа, а не место её публикации.', heroLede: 'Panorama Scholarly Group поддерживает Сан-Францисскую декларацию об оценке исследований (DORA) и развивает издательские практики, которые учитывают качество, добросовестность, открытость и вклад за пределами журнальных показателей.', scopeLabel: 'Обязательство группы', scopeText: 'Применяется к журналам, книгам, научным сервисам и редакционно-издательским практикам Panorama Scholarly Group и её импринтов.', scopeLink: 'Прочитать обязательство', navLabel: 'На этой странице', nav: { purpose: 'Цель и область', principles: 'Наши принципы', indicators: 'Показатели в контексте', publishing: 'Издательская практика', implementation: 'Реализация и пересмотр' }, railLabel: 'Более полная научная запись', railStatement: 'Качество не является числом, прикреплённым к журналу.', railMeta: 'Издательская практика в соответствии с DORA', railNote: 'В этом заявлении описаны наши текущие обязательства и направления дальнейшего совершенствования.', sections: {
      purpose: { title: 'Цель и область', paragraphs: ['Исследования распространяются в разных формах: в статьях, книгах, данных, программном обеспечении, методах, обзорах, публичной научной работе, а также во вкладе в политику и практику. Ответственная оценка должна учитывать это разнообразие, а не сводить качество к названию или рейтингу места публикации.', 'Это обязательство распространяется на редакционные и издательские практики Panorama Scholarly Group и её импринтов. Оно дополняет наши редакционные стандарты и политику публикационной этики, но не заменяет предметную область и критерии принятия решений конкретного журнала или книжного проекта.'] },
      principles: { title: 'Три принципа нашего подхода', intro: 'Мы используем DORA как практическую основу для совершенствования описания, оценки и представления научных результатов.', paragraphs: [], cards: [{ title: 'Оценивать работу по существу.', body: 'Редакционные и издательские решения должны учитывать вопрос, доказательства, метод, рассуждение, оригинальность, ясность и вклад работы, а не только репутацию места публикации.' }, { title: 'Ответственно использовать показатели.', body: 'Количественные сведения могут давать контекст, но не заменяют экспертное суждение. Показатели должны быть ясными, прозрачными, конкретными, контекстными и справедливыми.' }, { title: 'Признавать разнообразие вкладов.', body: 'Качество и влияние могут проявляться в данных, программном обеспечении, методах, рецензировании, преподавании, политике, практике и общественном взаимодействии наряду с публикациями.' }] },
      indicators: { title: 'Показатели должны рассматриваться в контексте', paragraphs: ['Мы не используем Journal Impact Factor, рейтинги журналов, число цитирований и подобные показатели как самостоятельную замену оценке качества отдельной статьи, автора или исследователя. Показатель на уровне журнала описывает тенденцию журнала, а не ценность каждой опубликованной в нём работы.', 'Когда количественные показатели уместны, мы объясняем, что они измеряют, указываем их ограничения и интерпретируем их вместе с содержанием и контекстом работы. Одно число не представляется как исчерпывающее описание научного качества или влияния.'] },
      publishing: { title: 'Что это означает для наших публикаций', paragraphs: ['Мы продолжим делать более понятными и доступными сведения на уровне статьи, роли участников, результаты исследований, лицензии, исправления и другие признаки научной ценности. Конкретный набор сведений может различаться в зависимости от журнала, дисциплины и типа публикации.', 'В рекламных и редакционных материалах следует описывать саму работу и её вклад. Показатель, связанный с журналом, не будет представляться как гарантия качества, значимости или предполагаемого восприятия рукописи или публикации.'] },
      implementation: { title: 'Реализация и пересмотр', paragraphs: ['Это заявление является публичным обязательством к постоянному совершенствованию, а не сертификацией и не утверждением, что все практики уже завершены. По мере развития издательской программы мы будем пересматривать руководства для авторов, информацию о журналах, метаданные, рекламные формулировки и редакционные процессы.', 'Вопросы об этом обязательстве можно направлять в Panorama Scholarly Group. Мы приветствуем конструктивные предложения авторов, редакторов, рецензентов, библиотекарей, исследователей и читателей.'] },
    }, doraLogoAlt: 'DORA: Сан-Францисская декларация об оценке исследований', doraCaption: 'DORA: глобальная инициатива, поддерживающая практические и надёжные подходы к оценке исследований. Логотип ведёт к официальной декларации и используется здесь как ссылка на изложенные принципы.', declarationLinkLabel: 'Прочитать декларацию DORA', signLinkLabel: 'Подписать DORA', badgesLinkLabel: 'Руководство по значкам DORA', relatedTitle: 'Связанные стандарты', relatedIntro: 'Ответственная оценка исследований дополняет стандарты редакционных решений, научной добросовестности и ведения научной записи.', relatedLinks: [{ title: 'Редакционные стандарты', body: 'Редакционное суждение, рецензирование, авторство, раскрытие информации и исправления.' }, { title: 'Публикационная этика', body: 'Научная добросовестность, справедливая редакционная практика и ведение опубликованной записи.' }, { title: 'Научная инфраструктура', body: 'Идентификаторы, метаданные, поиск, сохранность и видимость результатов.' }], footer: 'Это заявление основано на Сан-Францисской декларации об оценке исследований (DORA). DORA не является регулирующим или аккредитационным органом; подписание представляет собой добровольное публичное обязательство к ответственной оценке исследований.',
  },
  ar: {
    title: 'التقييم المسؤول للبحوث', metaDescription: 'التزام Panorama Scholarly Group بالتقييم المسؤول للبحوث وبمبادئ إعلان سان فرانسيسكو بشأن تقييم البحوث.', heroEyebrow: 'التقييم المسؤول للبحوث', heroTitle: 'نقيّم العمل، لا مكان نشره.', heroLede: 'تدعم Panorama Scholarly Group إعلان سان فرانسيسكو بشأن تقييم البحوث (DORA)، وتطوّر ممارسات نشر تعترف بالجودة والنزاهة والانفتاح والإسهام بما يتجاوز مؤشرات الدوريات.', scopeLabel: 'التزام على مستوى المجموعة', scopeText: 'ينطبق على الدوريات والكتب والخدمات العلمية والممارسات التحريرية والنشرية التي تديرها Panorama Scholarly Group وعلاماتها.', scopeLink: 'اقرأ الالتزام', navLabel: 'في هذه الصفحة', nav: { purpose: 'الغرض والنطاق', principles: 'مبادئنا', indicators: 'المؤشرات في سياقها', publishing: 'ممارسة النشر', implementation: 'التنفيذ والمراجعة' }, railLabel: 'سجل علمي أكثر اكتمالاً', railStatement: 'الجودة ليست رقماً ملحقاً بدورية.', railMeta: 'ممارسة نشر متوافقة مع DORA', railNote: 'يوضح هذا البيان التزامنا الحالي والمجالات التي سنواصل تحسينها.', sections: {
      purpose: { title: 'الغرض والنطاق', paragraphs: ['تُنقل البحوث في أشكال كثيرة، منها المقالات والكتب والبيانات والبرمجيات والمناهج والمراجعات والإسهام العلمي العام والمساهمات في السياسات والممارسات. ينبغي للتقييم المسؤول أن يرى هذا التنوع، لا أن يختزل الجودة في اسم مكان النشر أو ترتيبه.', 'ينطبق هذا الالتزام على الممارسات التحريرية والنشرية التي تحافظ عليها Panorama Scholarly Group وعلاماتها. وهو يكمل معاييرنا التحريرية وسياسة أخلاقيات النشر، لكنه لا يحل محل نطاق أي دورية أو مشروع كتاب ومعايير قراره الخاصة.'] },
      principles: { title: 'ثلاثة مبادئ توجه نهجنا', intro: 'نستخدم DORA إطاراً عملياً لتحسين طريقة وصف الأعمال العلمية وتقييمها وعرضها على المؤلفين والمحررين والمراجعين والقراء والشركاء.', paragraphs: [], cards: [{ title: 'تقييم العمل وفق مزاياه.', body: 'ينبغي للقرارات التحريرية والنشرية أن تراعي السؤال والأدلة والمنهج والاستدلال والأصالة والوضوح والإسهام، لا سمعة مكان النشر وحدها.' }, { title: 'استخدام المؤشرات بمسؤولية.', body: 'قد توفر المعلومات الكمية سياقاً مفيداً، لكنها لا تحل محل الحكم المتخصص. وينبغي أن تكون المؤشرات واضحة وشفافة ومحددة وملائمة للسياق وعادلة.' }, { title: 'الاعتراف بتنوع الإسهامات.', body: 'قد تظهر جودة البحث وتأثيره في البيانات والبرمجيات والمناهج والتحكيم والتعليم والسياسات والممارسة والمشاركة المجتمعية إلى جانب المنشورات.' }] },
      indicators: { title: 'توضع المؤشرات في سياقها', paragraphs: ['لا نستخدم معامل تأثير الدورية أو تصنيفات الدوريات أو عدد الاستشهادات أو المؤشرات المماثلة بديلاً منفرداً عن جودة المقال أو المؤلف أو الباحث. فالمؤشر على مستوى الدورية يصف نمطاً على مستوى الدورية، ولا يحدد قيمة كل عمل منشور فيها.', 'عندما تكون المؤشرات الكمية ذات صلة، نوضح ما تقيسه وحدودها، ونفسرها إلى جانب محتوى العمل وسياقه. ولا نقدم رقماً واحداً بوصفه وصفاً كاملاً للجودة أو التأثير العلمي.'] },
      publishing: { title: 'ماذا يعني ذلك لمنشوراتنا', paragraphs: ['سنواصل تحسين قابلية فهم واكتشاف المعلومات على مستوى المقال، وأدوار المساهمين، ومخرجات البحث، والتراخيص، والتصحيحات، وغيرها من الإشارات إلى القيمة العلمية. وقد تختلف المعلومات بحسب الدورية والتخصص ونوع المنشور.', 'ينبغي لاتصالاتنا الترويجية والتحريرية أن تصف العمل نفسه وإسهامه. ولن نعرض مؤشراً قائماً على الدورية ضماناً لجودة أو أهمية أو استقبال متوقع لمخطوط أو منشور معين.'] },
      implementation: { title: 'التنفيذ والمراجعة', paragraphs: ['يمثل هذا البيان التزاماً عاماً بالتحسين المستمر، وليس شهادة أو ادعاء بأن جميع الممارسات قد اكتملت. وسنراجع إرشادات المؤلفين ومعلومات الدوريات والبيانات الوصفية واللغة الترويجية ومسارات العمل التحريرية مع تطور برنامج النشر.', 'يمكن توجيه الأسئلة المتعلقة بهذا الالتزام إلى Panorama Scholarly Group. ونرحب بالملاحظات البناءة من المؤلفين والمحررين والمراجعين وأمناء المكتبات والباحثين والقراء.'] },
    }, doraLogoAlt: 'DORA: إعلان سان فرانسيسكو بشأن تقييم البحوث', doraCaption: 'DORA مبادرة عالمية تدعم مناهج عملية ومتينة لتقييم البحوث. يرتبط الشعار بالإعلان الرسمي ويُستخدم هنا للإشارة إلى المبادئ الواردة في هذه الصفحة.', declarationLinkLabel: 'اقرأ إعلان DORA', signLinkLabel: 'وقّع على DORA', badgesLinkLabel: 'إرشادات شارات DORA', relatedTitle: 'معايير ذات صلة', relatedIntro: 'يتكامل التقييم المسؤول للبحوث مع معايير القرارات التحريرية ونزاهة البحث ورعاية السجل العلمي.', relatedLinks: [{ title: 'المعايير التحريرية', body: 'الحكم التحريري والتحكيم وتأليف الأعمال والإفصاح والتصحيحات.' }, { title: 'أخلاقيات النشر', body: 'نزاهة البحث والممارسة التحريرية العادلة ورعاية السجل المنشور.' }, { title: 'البنية التحتية العلمية', body: 'المعرّفات والبيانات الوصفية والاكتشاف والحفظ وظهور مخرجات البحث.' }], footer: 'يسترشد هذا البيان بإعلان سان فرانسيسكو بشأن تقييم البحوث (DORA). DORA ليست جهة تنظيم أو اعتماد؛ ويشكّل التوقيع التزاماً عاماً طوعياً بالتقييم المسؤول للبحوث.',
  },
};

export function getResearchAssessmentCopy(locale = 'en'): ResearchAssessmentCopy {
  return copy[locale as LocaleCode] ?? copy.en;
}

export { declarationUrl, signUrl, badgesUrl };
