import type { LocaleCode } from './config';

interface StandardsItem {
  index: string;
  title: string;
  description: string;
  href: string;
  action: string;
}

interface StandardsCard {
  title: string;
  body: string;
}

export interface StandardsPageCopy {
  title: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLede: string;
  readEditorial: string;
  exploreFramework: string;
  asideAria: string;
  asideLabel: string;
  asideStatement: string;
  asideMeta: string;
  navLabel: string;
  navOverview: string;
  standards: StandardsItem[];
  frameworkTitle: string;
  frameworkBody: string;
  commitments: StandardsCard[];
  directoryTitle: string;
  directoryBody: string;
  workflowTitle: string;
  workflowBody: string;
  workflow: StandardsCard[];
  contactTitle: string;
  contactBody: string;
  contactAction: string;
}

const links = {
  editorial: '/standards/editorial/',
  ethics: '/standards/ethics/',
  openAccess: '/standards/open-access/',
  accessibility: '/accessibility/',
  researchAssessment: '/standards/research-assessment/',
};

const copy: Record<LocaleCode, StandardsPageCopy> = {
  en: {
    title: 'Standards',
    metaDescription: 'Panorama Scholarly Group’s editorial, ethics, open-access, and accessibility standards for responsible scholarly publishing.',
    heroEyebrow: 'Publishing standards',
    heroTitle: 'Trustworthy scholarship starts with clear standards.',
    heroLede: 'Our standards guide editorial judgment, research integrity, access, and stewardship of the scholarly record across Panorama Scholarly Group.',
    readEditorial: 'Read editorial standards',
    exploreFramework: 'Explore the framework',
    asideAria: 'Standards framework summary',
    asideLabel: 'A shared framework',
    asideStatement: 'Independent judgment. Responsible practice. A reliable scholarly record.',
    asideMeta: 'For authors, editors, reviewers, and readers across journals, books, and scholarly works.',
    navLabel: 'Standards',
    navOverview: 'Overview',
    standards: [
      { index: '01', title: 'Editorial Standards', description: 'How editorial decisions, peer review, authorship, disclosure, and corrections are handled.', href: links.editorial, action: 'Read editorial standards' },
      { index: '02', title: 'Publication Ethics', description: 'A group-wide framework for research integrity, ethical review, fair editorial practice, and correction of the scholarly record.', href: links.ethics, action: 'Read publication ethics' },
      { index: '03', title: 'Open Access Policy', description: 'The access, copyright, licensing, fees, and responsible-reuse terms that govern open scholarly works.', href: links.openAccess, action: 'Read the open access policy' },
      { index: '04', title: 'Accessibility', description: 'How we design public information and digital publishing experiences for people with different needs.', href: links.accessibility, action: 'Read the accessibility statement' },
      { index: '05', title: 'Responsible Research Assessment', description: 'Panorama Scholarly Group Ltd’s DORA commitment to responsible metrics and recognition of diverse scholarly contributions.', href: links.researchAssessment, action: 'Read the DORA statement' },
    ],
    frameworkTitle: 'Four commitments guide every publication.',
    frameworkBody: 'These commitments apply across our journals, books, and scholarly works. They shape decisions before publication and the care taken after work enters the public record.',
    commitments: [
      { title: 'Editorial independence', body: 'Editorial decisions are based on scholarly merit, relevance, evidence, and the stated scope of the publication.' },
      { title: 'Research integrity', body: 'We expect accurate reporting, responsible authorship, appropriate disclosure, and honest engagement with concerns.' },
      { title: 'Transparency', body: 'Readers should be able to understand how work was assessed, supported, changed, and connected to its contributors.' },
      { title: 'Stewardship', body: 'We preserve the version of record and make corrections, updates, expressions of concern, and retractions visible.' },
    ],
    directoryTitle: 'Find the standard you need.',
    directoryBody: 'Each policy addresses a distinct part of responsible publishing. Together, they describe how we make decisions, respond to concerns, widen access, and keep published work useful.',
    workflowTitle: 'From submission to the scholarly record.',
    workflowBody: 'Standards work as a connected process. Clear expectations help people make sound decisions, and visible stewardship helps readers understand the status of published work.',
    workflow: [
      { title: 'Assess', body: 'A publication defines its scope and criteria, then considers the fit, quality, and integrity of each submission.' },
      { title: 'Review', body: 'Editors appoint appropriate reviewers and weigh the evidence while protecting confidentiality and fair treatment.' },
      { title: 'Publish', body: 'Accepted work is prepared with clear metadata, contributor information, licensing, and links to relevant statements.' },
      { title: 'Maintain', body: 'The published record is corrected when new information requires an update or a formal notice.' },
    ],
    contactTitle: 'Need help finding the right policy?',
    contactBody: 'Start with the relevant standard above. If you are unsure which journal, imprint, or publishing team should receive a question, we can help route it.',
    contactAction: 'Contact the group',
  },
  'zh-hans': {
    title: '出版标准',
    metaDescription: 'Panorama Scholarly Group 关于负责任学术出版的编辑、伦理、开放获取与无障碍标准。',
    heroEyebrow: '出版标准',
    heroTitle: '可信的学术出版，始于清晰的标准。',
    heroLede: '我们的标准为 Panorama Scholarly Group 的编辑判断、研究诚信、学术获取与学术记录维护提供共同依据。',
    readEditorial: '阅读编辑标准',
    exploreFramework: '了解标准框架',
    asideAria: '标准框架摘要',
    asideLabel: '共同框架',
    asideStatement: '独立判断。负责任的实践。可靠的学术记录。',
    asideMeta: '适用于期刊、图书及其他学术成果的作者、编辑、审稿人和读者。',
    navLabel: '标准',
    navOverview: '概览',
    standards: [
      { index: '01', title: '编辑标准', description: '说明编辑决策、同行评审、作者署名、利益披露与勘误如何处理。', href: links.editorial, action: '阅读编辑标准' },
      { index: '02', title: '出版伦理', description: '关于研究诚信、伦理审查、公平编辑实践与学术记录更正的集团级框架。', href: links.ethics, action: '阅读出版伦理' },
      { index: '03', title: '开放获取政策', description: '规范开放学术成果的获取、版权、许可、费用与负责任再利用。', href: links.openAccess, action: '阅读开放获取政策' },
      { index: '04', title: '无障碍声明', description: '说明我们如何为具有不同需求的人设计公共信息与数字出版体验。', href: links.accessibility, action: '阅读无障碍声明' },
      { index: '05', title: '负责任的研究评价', description: 'Panorama Scholarly Group Ltd 对 DORA 的公开承诺，强调负责任地使用指标并承认多元学术贡献。', href: links.researchAssessment, action: '阅读 DORA 声明' },
    ],
    frameworkTitle: '四项承诺，贯穿每一项出版工作。',
    frameworkBody: '这些承诺适用于我们的期刊、图书及其他学术成果，既影响出版前的决策，也指导成果进入公共记录后的维护。',
    commitments: [
      { title: '编辑独立', body: '编辑决策以学术价值、相关性、证据以及出版物明确的范围为依据。' },
      { title: '研究诚信', body: '我们要求准确报告、负责任的作者署名、适当的利益披露，并以诚实态度处理疑虑。' },
      { title: '透明度', body: '读者应能够了解成果如何被评估、获得何种支持、发生过哪些变更，以及与哪些贡献者相关。' },
      { title: '学术记录维护', body: '我们保存正式记录版本，并公开呈现勘误、更新、关注声明与撤稿信息。' },
    ],
    directoryTitle: '查找所需的标准。',
    directoryBody: '每项政策都回应负责任出版的一个具体方面。它们共同说明我们如何作出决策、回应疑虑、扩大获取，并保持已发表成果的持续可用性。',
    workflowTitle: '从投稿到学术记录。',
    workflowBody: '标准是一套相互衔接的流程。清晰的预期帮助参与者作出稳妥判断，透明的记录维护则帮助读者理解已发表成果的状态。',
    workflow: [
      { title: '评估', body: '出版物先明确范围与标准，再评估每项投稿的匹配度、质量与诚信状况。' },
      { title: '审查', body: '编辑邀请合适的审稿人，在保护保密性与公平对待的同时权衡证据。' },
      { title: '出版', body: '接受的成果将配备清晰的元数据、贡献者信息、许可信息及相关政策链接。' },
      { title: '维护', body: '当新信息需要更新或正式通知时，我们会对已发表记录进行更正。' },
    ],
    contactTitle: '需要帮助找到适用政策？',
    contactBody: '请先查看上方相关标准。如果不确定问题应提交给哪本期刊、哪个品牌或哪支出版团队，我们可以协助分流。',
    contactAction: '联系集团',
  },
  'zh-hant': {
    title: '出版標準',
    metaDescription: 'Panorama Scholarly Group 關於負責任學術出版的編輯、倫理、開放取用與無障礙標準。',
    heroEyebrow: '出版標準', heroTitle: '可信的學術出版，始於清晰的標準。',
    heroLede: '我們的標準為 Panorama Scholarly Group 的編輯判斷、研究誠信、學術取用與學術記錄維護提供共同依據。',
    readEditorial: '閱讀編輯標準', exploreFramework: '了解標準框架', asideAria: '標準框架摘要', asideLabel: '共同框架',
    asideStatement: '獨立判斷。負責任的實踐。可靠的學術記錄。', asideMeta: '適用於期刊、圖書及其他學術成果的作者、編輯、審稿人和讀者。', navLabel: '標準', navOverview: '概覽',
    standards: [
      { index: '01', title: '編輯標準', description: '說明編輯決策、同行評審、作者署名、利益披露與勘誤如何處理。', href: links.editorial, action: '閱讀編輯標準' },
      { index: '02', title: '出版倫理', description: '關於研究誠信、倫理審查、公平編輯實踐與學術記錄更正的集團級框架。', href: links.ethics, action: '閱讀出版倫理' },
      { index: '03', title: '開放取用政策', description: '規範開放學術成果的取用、版權、授權、費用與負責任再利用。', href: links.openAccess, action: '閱讀開放取用政策' },
      { index: '04', title: '無障礙聲明', description: '說明我們如何為具有不同需要的人設計公共資訊與數碼出版體驗。', href: links.accessibility, action: '閱讀無障礙聲明' },
      { index: '05', title: '負責任的研究評估', description: 'Panorama Scholarly Group Ltd 對 DORA 的公開承諾，強調負責任地使用指標並承認多元學術貢獻。', href: links.researchAssessment, action: '閱讀 DORA 聲明' },
    ],
    frameworkTitle: '四項承諾，貫穿每一項出版工作。', frameworkBody: '這些承諾適用於我們的期刊、圖書及其他學術成果，既影響出版前的決策，也指導成果進入公共記錄後的維護。',
    commitments: [
      { title: '編輯獨立', body: '編輯決策以學術價值、相關性、證據以及出版物明確的範圍為依據。' },
      { title: '研究誠信', body: '我們要求準確報告、負責任的作者署名、適當的利益披露，並以誠實態度處理疑慮。' },
      { title: '透明度', body: '讀者應能夠了解成果如何被評估、獲得何種支持、發生過哪些變更，以及與哪些貢獻者相關。' },
      { title: '學術記錄維護', body: '我們保存正式記錄版本，並公開呈現勘誤、更新、關注聲明與撤稿資訊。' },
    ],
    directoryTitle: '查找所需的標準。', directoryBody: '每項政策都回應負責任出版的一個具體方面。它們共同說明我們如何作出決策、回應疑慮、擴大取用，並保持已發表成果的持續可用性。',
    workflowTitle: '從投稿到學術記錄。', workflowBody: '標準是一套相互銜接的流程。清晰的預期幫助參與者作出穩妥判斷，透明的記錄維護則幫助讀者理解已發表成果的狀態。',
    workflow: [
      { title: '評估', body: '出版物先明確範圍與標準，再評估每項投稿的匹配度、質量與誠信狀況。' },
      { title: '審查', body: '編輯邀請合適的審稿人，在保護保密性與公平對待的同時權衡證據。' },
      { title: '出版', body: '接受的成果將配備清晰的元數據、貢獻者資訊、授權資訊及相關政策連結。' },
      { title: '維護', body: '當新資訊需要更新或正式通知時，我們會對已發表記錄進行更正。' },
    ],
    contactTitle: '需要幫助找到適用政策？', contactBody: '請先查看上方相關標準。如果不確定問題應提交給哪本期刊、哪個品牌或哪支出版團隊，我們可以協助分流。', contactAction: '聯絡集團',
  },
  ja: {
    title: '出版基準', metaDescription: 'Panorama Scholarly Groupが責任ある学術出版のために定める編集、倫理、オープンアクセス、アクセシビリティの基準。',
    heroEyebrow: '出版基準', heroTitle: '信頼できる学術は、明確な基準から始まります。', heroLede: '私たちの基準は、Panorama Scholarly Group全体の編集判断、研究公正、アクセス、学術記録の管理を導きます。',
    readEditorial: '編集基準を読む', exploreFramework: '枠組みを見る', asideAria: '出版基準の概要', asideLabel: '共有する枠組み', asideStatement: '独立した判断。責任ある実践。信頼できる学術記録。', asideMeta: '学術誌、書籍、その他の学術成果に関わる著者、編集者、査読者、読者のための基準です。', navLabel: '基準', navOverview: '概要',
    standards: [
      { index: '01', title: '編集基準', description: '編集判断、査読、著者表示、開示、訂正の扱いを示します。', href: links.editorial, action: '編集基準を読む' },
      { index: '02', title: '出版倫理', description: '研究公正、倫理審査、公平な編集実践、学術記録の訂正に関するグループ共通の枠組みです。', href: links.ethics, action: '出版倫理を読む' },
      { index: '03', title: 'オープンアクセス方針', description: '公開された学術成果に適用されるアクセス、著作権、ライセンス、料金、責任ある再利用の条件です。', href: links.openAccess, action: 'オープンアクセス方針を読む' },
      { index: '04', title: 'アクセシビリティ', description: '異なるニーズを持つ人が利用できる公共情報とデジタル出版体験の設計方針です。', href: links.accessibility, action: '声明を読む' },
      { index: '05', title: '責任ある研究評価', description: 'Panorama Scholarly Group LtdによるDORAへの公開の取り組み。指標を責任ある形で用い、多様な学術的貢献を認めます。', href: links.researchAssessment, action: 'DORA声明を読む' },
    ],
    frameworkTitle: '四つの約束が、すべての出版物を導きます。', frameworkBody: 'これらの約束は学術誌、書籍、その他の学術成果に共通します。出版前の判断と、成果が公開記録に加わった後の管理を形づくります。',
    commitments: [
      { title: '編集の独立性', body: '編集判断は学術的価値、関連性、証拠、出版物が掲げる範囲に基づきます。' },
      { title: '研究公正', body: '正確な報告、責任ある著者表示、適切な開示、懸念への誠実な対応を求めます。' },
      { title: '透明性', body: '読者が研究の評価、支援、変更、貢献者との関係を理解できるようにします。' },
      { title: '記録の管理', body: '正式な記録を保存し、訂正、更新、懸念表明、撤回を明確に示します。' },
    ],
    directoryTitle: '必要な基準を探す。', directoryBody: '各方針は責任ある出版の一側面を扱います。併せて読むことで、判断、懸念への対応、アクセスの拡大、公開成果の有用性を保つ方法が分かります。',
    workflowTitle: '投稿から学術記録へ。', workflowBody: '基準はつながったプロセスとして機能します。明確な期待は適切な判断を支え、透明な記録管理は公開成果の状態を読者に伝えます。',
    workflow: [
      { title: '評価', body: '出版物は範囲と基準を定め、各投稿の適合性、質、公正性を検討します。' },
      { title: '査読', body: '編集者は適切な査読者を選び、秘密保持と公平な扱いを守りながら証拠を評価します。' },
      { title: '出版', body: '採択された成果には、明確なメタデータ、貢献者情報、ライセンス、関連方針へのリンクを付します。' },
      { title: '維持', body: '新しい情報により更新や正式な通知が必要になった場合、公開記録を訂正します。' },
    ],
    contactTitle: '適切な方針を探すお手伝いが必要ですか。', contactBody: 'まず上の関連基準をご覧ください。どの学術誌、インプリント、出版チームに問い合わせるべきか分からない場合は、適切な窓口をご案内します。', contactAction: 'グループに問い合わせる',
  },
  ko: {
    title: '출판 기준', metaDescription: '책임 있는 학술 출판을 위한 Panorama Scholarly Group의 편집·윤리·오픈 액세스·접근성 기준입니다.',
    heroEyebrow: '출판 기준', heroTitle: '신뢰할 수 있는 학술은 분명한 기준에서 시작됩니다.', heroLede: '우리의 기준은 Panorama Scholarly Group 전반의 편집 판단, 연구 진실성, 접근성, 학술 기록 관리를 안내합니다.',
    readEditorial: '편집 기준 읽기', exploreFramework: '프레임워크 살펴보기', asideAria: '출판 기준 요약', asideLabel: '공유하는 프레임워크', asideStatement: '독립적 판단. 책임 있는 실천. 신뢰할 수 있는 학술 기록.', asideMeta: '학술지, 도서 및 기타 학술 저술의 저자·편집자·심사자·독자를 위한 기준입니다.', navLabel: '기준', navOverview: '개요',
    standards: [
      { index: '01', title: '편집 기준', description: '편집 결정, 동료심사, 저자 표시, 공개와 정정의 처리 방식을 설명합니다.', href: links.editorial, action: '편집 기준 읽기' },
      { index: '02', title: '출판 윤리', description: '연구 진실성, 윤리 검토, 공정한 편집 관행과 학술 기록 정정을 위한 그룹 공통 프레임워크입니다.', href: links.ethics, action: '출판 윤리 읽기' },
      { index: '03', title: '오픈 액세스 정책', description: '공개 학술 저작물에 적용되는 접근, 저작권, 라이선스, 비용 및 책임 있는 재사용 조건입니다.', href: links.openAccess, action: '오픈 액세스 정책 읽기' },
      { index: '04', title: '접근성', description: '서로 다른 필요를 가진 사람이 이용할 수 있는 공공 정보와 디지털 출판 경험의 설계 원칙입니다.', href: links.accessibility, action: '접근성 성명 읽기' },
      { index: '05', title: '책임 있는 연구 평가', description: '책임 있는 지표 사용과 다양한 학술적 기여의 인정을 위한 Panorama Scholarly Group Ltd의 DORA 공개 약속입니다.', href: links.researchAssessment, action: 'DORA 성명 읽기' },
    ],
    frameworkTitle: '네 가지 약속이 모든 출판물을 이끕니다.', frameworkBody: '이 약속은 학술지, 도서 및 기타 학술 저작물 전반에 적용됩니다. 출판 전의 판단과 공개 기록에 들어온 뒤의 관리 모두를 형성합니다.',
    commitments: [
      { title: '편집 독립성', body: '편집 결정은 학술적 가치, 관련성, 증거와 해당 출판물의 명시된 범위에 근거합니다.' },
      { title: '연구 진실성', body: '정확한 보고, 책임 있는 저자 표시, 적절한 공개와 우려에 대한 성실한 대응을 기대합니다.' },
      { title: '투명성', body: '독자가 저작물이 어떻게 평가되고 지원·변경되었으며 어떤 기여자와 연결되는지 이해할 수 있어야 합니다.' },
      { title: '기록 관리', body: '공식 기록 버전을 보존하고 정정, 업데이트, 우려 표명 및 철회 정보를 명확히 표시합니다.' },
    ],
    directoryTitle: '필요한 기준을 찾아보세요.', directoryBody: '각 정책은 책임 있는 출판의 한 측면을 다룹니다. 함께 읽으면 판단, 우려 대응, 접근 확대와 공개 저작물의 유용성을 유지하는 방식을 이해할 수 있습니다.',
    workflowTitle: '투고에서 학술 기록까지.', workflowBody: '기준은 연결된 과정으로 작동합니다. 분명한 기대는 건전한 판단을 돕고, 투명한 기록 관리는 공개 저작물의 상태를 독자에게 알려 줍니다.',
    workflow: [
      { title: '평가', body: '출판물은 범위와 기준을 정한 뒤 각 투고의 적합성, 품질과 진실성을 검토합니다.' },
      { title: '심사', body: '편집자는 적절한 심사자를 배정하고 비밀 유지와 공정한 대우를 지키며 증거를 검토합니다.' },
      { title: '출판', body: '게재가 결정된 저작물에는 명확한 메타데이터, 기여자 정보, 라이선스와 관련 정책 링크를 제공합니다.' },
      { title: '관리', body: '새로운 정보로 업데이트나 공식 공지가 필요해지면 공개 기록을 정정합니다.' },
    ],
    contactTitle: '적절한 정책을 찾는 데 도움이 필요하신가요?', contactBody: '먼저 위의 관련 기준을 확인하세요. 어느 학술지, 임프린트 또는 출판 팀에 문의해야 할지 확실하지 않다면 적절한 창구로 안내해 드립니다.', contactAction: '그룹에 문의하기',
  },
  de: {
    title: 'Standards', metaDescription: 'Redaktions-, Ethik-, Open-Access- und Barrierefreiheitsstandards der Panorama Scholarly Group für verantwortungsvolles wissenschaftliches Publizieren.',
    heroEyebrow: 'Publikationsstandards', heroTitle: 'Vertrauenswürdige Wissenschaft beginnt mit klaren Standards.', heroLede: 'Unsere Standards leiten redaktionelle Entscheidungen, Forschungsintegrität, Zugang und die Pflege des wissenschaftlichen Protokolls in der gesamten Panorama Scholarly Group.',
    readEditorial: 'Redaktionsstandards lesen', exploreFramework: 'Den Rahmen ansehen', asideAria: 'Zusammenfassung des Standardrahmens', asideLabel: 'Ein gemeinsamer Rahmen', asideStatement: 'Unabhängiges Urteil. Verantwortliche Praxis. Ein verlässliches wissenschaftliches Protokoll.', asideMeta: 'Für Autoren, Herausgeber, Gutachter und Leser von Zeitschriften, Büchern und wissenschaftlichen Werken.', navLabel: 'Standards', navOverview: 'Überblick',
    standards: [
      { index: '01', title: 'Redaktionsstandards', description: 'Wie redaktionelle Entscheidungen, Peer Review, Autorschaft, Offenlegung und Korrekturen behandelt werden.', href: links.editorial, action: 'Redaktionsstandards lesen' },
      { index: '02', title: 'Publikationsethik', description: 'Ein gruppenweiter Rahmen für Forschungsintegrität, ethische Prüfung, faire Redaktion und die Korrektur des wissenschaftlichen Protokolls.', href: links.ethics, action: 'Publikationsethik lesen' },
      { index: '03', title: 'Open-Access-Richtlinie', description: 'Zugangs-, Urheberrechts-, Lizenz-, Gebühren- und Wiederverwendungsbedingungen für offene wissenschaftliche Werke.', href: links.openAccess, action: 'Open-Access-Richtlinie lesen' },
      { index: '04', title: 'Barrierefreiheit', description: 'Wie wir öffentliche Informationen und digitale Publikationserlebnisse für unterschiedliche Bedürfnisse gestalten.', href: links.accessibility, action: 'Barrierefreiheit lesen' },
      { index: '05', title: 'Verantwortungsvolle Forschungsbewertung', description: 'Das öffentliche DORA-Bekenntnis der Panorama Scholarly Group Ltd zu verantwortungsvollen Kennzahlen und vielfältigen wissenschaftlichen Beiträgen.', href: links.researchAssessment, action: 'DORA-Erklärung lesen' },
    ],
    frameworkTitle: 'Vier Verpflichtungen leiten jede Veröffentlichung.', frameworkBody: 'Diese Verpflichtungen gelten für unsere Zeitschriften, Bücher und wissenschaftlichen Werke. Sie prägen Entscheidungen vor der Veröffentlichung und die Sorgfalt danach.',
    commitments: [
      { title: 'Redaktionelle Unabhängigkeit', body: 'Redaktionelle Entscheidungen beruhen auf wissenschaftlichem Wert, Relevanz, Evidenz und dem erklärten Umfang der Publikation.' },
      { title: 'Forschungsintegrität', body: 'Wir erwarten genaue Berichterstattung, verantwortliche Autorschaft, angemessene Offenlegung und einen offenen Umgang mit Bedenken.' },
      { title: 'Transparenz', body: 'Leser sollen nachvollziehen können, wie eine Arbeit bewertet, unterstützt, geändert und mit ihren Mitwirkenden verbunden wurde.' },
      { title: 'Pflege des Protokolls', body: 'Wir bewahren die Version of Record und machen Korrekturen, Aktualisierungen, Bedenken und Rücknahmen sichtbar.' },
    ],
    directoryTitle: 'Den passenden Standard finden.', directoryBody: 'Jede Richtlinie behandelt einen eigenen Teil verantwortungsvollen Publizierens. Zusammen zeigen sie, wie wir entscheiden, auf Bedenken reagieren, Zugang erweitern und veröffentlichte Arbeiten nützlich halten.',
    workflowTitle: 'Von der Einreichung zum wissenschaftlichen Protokoll.', workflowBody: 'Standards wirken als zusammenhängender Prozess. Klare Erwartungen unterstützen gute Entscheidungen; sichtbare Pflege erklärt Lesern den Status veröffentlichter Arbeiten.',
    workflow: [
      { title: 'Prüfen', body: 'Eine Publikation legt Umfang und Kriterien fest und bewertet Passung, Qualität und Integrität jeder Einreichung.' },
      { title: 'Begutachten', body: 'Herausgeber wählen geeignete Gutachter aus und wägen die Evidenz unter Wahrung von Vertraulichkeit und Fairness ab.' },
      { title: 'Veröffentlichen', body: 'Angenommene Arbeiten erhalten klare Metadaten, Angaben zu Mitwirkenden, Lizenzen und Links zu relevanten Erklärungen.' },
      { title: 'Pflegen', body: 'Das veröffentlichte Protokoll wird korrigiert, wenn neue Informationen eine Aktualisierung oder formelle Mitteilung erfordern.' },
    ],
    contactTitle: 'Hilfe beim Finden der richtigen Richtlinie?', contactBody: 'Beginnen Sie mit dem passenden Standard oben. Wenn unklar ist, welche Zeitschrift, welches Imprint oder welches Publikationsteam zuständig ist, leiten wir Ihre Frage weiter.', contactAction: 'Gruppe kontaktieren',
  },
  fr: {
    title: 'Normes', metaDescription: 'Les normes éditoriales, éthiques, d’accès ouvert et d’accessibilité de Panorama Scholarly Group pour une publication scientifique responsable.',
    heroEyebrow: 'Normes de publication', heroTitle: 'Une recherche digne de confiance commence par des normes claires.', heroLede: 'Nos normes encadrent le jugement éditorial, l’intégrité de la recherche, l’accès et la gestion du dossier scientifique dans tout Panorama Scholarly Group.',
    readEditorial: 'Lire les normes éditoriales', exploreFramework: 'Explorer le cadre', asideAria: 'Résumé du cadre de référence', asideLabel: 'Un cadre partagé', asideStatement: 'Jugement indépendant. Pratique responsable. Un dossier scientifique fiable.', asideMeta: 'Pour les auteurs, éditeurs, évaluateurs et lecteurs de revues, de livres et de travaux scientifiques.', navLabel: 'Normes', navOverview: 'Aperçu',
    standards: [
      { index: '01', title: 'Normes éditoriales', description: 'Le traitement des décisions éditoriales, de l’évaluation par les pairs, de l’auteur, des déclarations et des corrections.', href: links.editorial, action: 'Lire les normes éditoriales' },
      { index: '02', title: 'Éthique de la publication', description: 'Un cadre commun pour l’intégrité de la recherche, l’examen éthique, une pratique éditoriale équitable et la correction du dossier scientifique.', href: links.ethics, action: 'Lire l’éthique de la publication' },
      { index: '03', title: 'Politique d’accès ouvert', description: 'Les conditions d’accès, de droit d’auteur, de licence, de frais et de réutilisation responsable des travaux ouverts.', href: links.openAccess, action: 'Lire la politique d’accès ouvert' },
      { index: '04', title: 'Accessibilité', description: 'La manière dont nous concevons l’information publique et les expériences éditoriales numériques pour des besoins différents.', href: links.accessibility, action: 'Lire la déclaration d’accessibilité' },
      { index: '05', title: 'Évaluation responsable de la recherche', description: 'L’engagement public de Panorama Scholarly Group Ltd envers DORA, les indicateurs responsables et la diversité des contributions savantes.', href: links.researchAssessment, action: 'Lire la déclaration DORA' },
    ],
    frameworkTitle: 'Quatre engagements guident chaque publication.', frameworkBody: 'Ces engagements s’appliquent à nos revues, livres et travaux scientifiques. Ils orientent les décisions avant la publication et le soin apporté au dossier ensuite.',
    commitments: [
      { title: 'Indépendance éditoriale', body: 'Les décisions éditoriales reposent sur la valeur scientifique, la pertinence, les preuves et le périmètre annoncé de la publication.' },
      { title: 'Intégrité de la recherche', body: 'Nous attendons des comptes rendus exacts, une responsabilité claire des auteurs, les déclarations nécessaires et un traitement sincère des alertes.' },
      { title: 'Transparence', body: 'Les lecteurs doivent pouvoir comprendre comment un travail a été évalué, soutenu, modifié et relié à ses contributeurs.' },
      { title: 'Gestion du dossier', body: 'Nous conservons la version de référence et rendons visibles les corrections, mises à jour, expressions de préoccupation et rétractations.' },
    ],
    directoryTitle: 'Trouver la norme qui vous concerne.', directoryBody: 'Chaque politique traite un aspect précis de la publication responsable. Ensemble, elles décrivent nos décisions, notre réponse aux alertes, l’élargissement de l’accès et la pérennité des travaux publiés.',
    workflowTitle: 'De la soumission au dossier scientifique.', workflowBody: 'Les normes fonctionnent comme un processus continu. Des attentes claires favorisent de bonnes décisions et une gestion visible éclaire le statut des travaux publiés.',
    workflow: [
      { title: 'Évaluer', body: 'La publication définit son périmètre et ses critères, puis examine l’adéquation, la qualité et l’intégrité de chaque soumission.' },
      { title: 'Évaluer par les pairs', body: 'Les éditeurs désignent des évaluateurs compétents et apprécient les preuves en protégeant la confidentialité et l’équité.' },
      { title: 'Publier', body: 'Les travaux acceptés reçoivent des métadonnées claires, les informations sur les contributeurs, la licence et les liens pertinents.' },
      { title: 'Préserver', body: 'Le dossier publié est corrigé lorsque de nouvelles informations imposent une mise à jour ou un avis officiel.' },
    ],
    contactTitle: 'Besoin d’aide pour trouver la bonne politique ?', contactBody: 'Commencez par la norme pertinente ci-dessus. Si vous ne savez pas quelle revue, quelle marque ou quelle équipe éditoriale doit recevoir votre question, nous vous orienterons.', contactAction: 'Contacter le groupe',
  },
  es: {
    title: 'Normas', metaDescription: 'Normas editoriales, éticas, de acceso abierto y accesibilidad de Panorama Scholarly Group para una publicación académica responsable.',
    heroEyebrow: 'Normas de publicación', heroTitle: 'La investigación confiable comienza con normas claras.', heroLede: 'Nuestras normas orientan el criterio editorial, la integridad de la investigación, el acceso y la custodia del registro académico en Panorama Scholarly Group.',
    readEditorial: 'Leer las normas editoriales', exploreFramework: 'Explorar el marco', asideAria: 'Resumen del marco de normas', asideLabel: 'Un marco compartido', asideStatement: 'Criterio independiente. Práctica responsable. Un registro académico confiable.', asideMeta: 'Para autores, editores, revisores y lectores de revistas, libros y trabajos académicos.', navLabel: 'Normas', navOverview: 'Resumen',
    standards: [
      { index: '01', title: 'Normas editoriales', description: 'Cómo se gestionan las decisiones editoriales, la revisión por pares, la autoría, las declaraciones y las correcciones.', href: links.editorial, action: 'Leer las normas editoriales' },
      { index: '02', title: 'Ética de la publicación', description: 'Un marco común para la integridad de la investigación, la revisión ética, la práctica editorial justa y la corrección del registro académico.', href: links.ethics, action: 'Leer la ética de publicación' },
      { index: '03', title: 'Política de acceso abierto', description: 'Condiciones de acceso, derechos de autor, licencias, cargos y reutilización responsable de los trabajos abiertos.', href: links.openAccess, action: 'Leer la política de acceso abierto' },
      { index: '04', title: 'Accesibilidad', description: 'Cómo diseñamos la información pública y las experiencias de publicación digital para personas con necesidades diversas.', href: links.accessibility, action: 'Leer la declaración de accesibilidad' },
      { index: '05', title: 'Evaluación responsable de la investigación', description: 'El compromiso público de Panorama Scholarly Group Ltd con DORA, los indicadores responsables y la diversidad de las contribuciones académicas.', href: links.researchAssessment, action: 'Leer la declaración DORA' },
    ],
    frameworkTitle: 'Cuatro compromisos guían cada publicación.', frameworkBody: 'Estos compromisos se aplican a nuestras revistas, libros y trabajos académicos. Orientan las decisiones previas a la publicación y el cuidado posterior del registro público.',
    commitments: [
      { title: 'Independencia editorial', body: 'Las decisiones editoriales se basan en el mérito académico, la pertinencia, la evidencia y el alcance declarado de la publicación.' },
      { title: 'Integridad de la investigación', body: 'Esperamos informes precisos, autoría responsable, declaraciones adecuadas y una respuesta honesta a las inquietudes.' },
      { title: 'Transparencia', body: 'Los lectores deben poder entender cómo se evaluó, apoyó, modificó y relacionó el trabajo con sus colaboradores.' },
      { title: 'Custodia del registro', body: 'Conservamos la versión de referencia y hacemos visibles las correcciones, actualizaciones, expresiones de preocupación y retractaciones.' },
    ],
    directoryTitle: 'Encuentre la norma que necesita.', directoryBody: 'Cada política aborda un aspecto distinto de la publicación responsable. En conjunto, explican cómo decidimos, respondemos a inquietudes, ampliamos el acceso y mantenemos la utilidad de lo publicado.',
    workflowTitle: 'De la propuesta al registro académico.', workflowBody: 'Las normas funcionan como un proceso conectado. Las expectativas claras ayudan a decidir bien y una custodia visible permite entender el estado de los trabajos publicados.',
    workflow: [
      { title: 'Evaluar', body: 'La publicación define su alcance y criterios, y después considera la adecuación, calidad e integridad de cada propuesta.' },
      { title: 'Revisar', body: 'Los editores designan revisores adecuados y valoran la evidencia protegiendo la confidencialidad y el trato justo.' },
      { title: 'Publicar', body: 'Los trabajos aceptados se preparan con metadatos claros, información de colaboradores, licencias y enlaces pertinentes.' },
      { title: 'Mantener', body: 'El registro publicado se corrige cuando nueva información exige una actualización o un aviso formal.' },
    ],
    contactTitle: '¿Necesita ayuda para encontrar la política adecuada?', contactBody: 'Comience por la norma pertinente. Si no sabe qué revista, sello o equipo editorial debe recibir su consulta, podemos orientarla.', contactAction: 'Contactar con el grupo',
  },
  ru: {
    title: 'Стандарты', metaDescription: 'Редакционные, этические стандарты, политика открытого доступа и доступности Panorama Scholarly Group для ответственной научной публикации.',
    heroEyebrow: 'Издательские стандарты', heroTitle: 'Достоверная наука начинается с ясных стандартов.', heroLede: 'Наши стандарты определяют редакционные решения, исследовательскую добросовестность, доступ и ведение научного архива во всей Panorama Scholarly Group.',
    readEditorial: 'Редакционные стандарты', exploreFramework: 'Изучить систему', asideAria: 'Обзор системы стандартов', asideLabel: 'Общая система', asideStatement: 'Независимое суждение. Ответственная практика. Надёжный научный архив.', asideMeta: 'Для авторов, редакторов, рецензентов и читателей журналов, книг и научных работ.', navLabel: 'Стандарты', navOverview: 'Обзор',
    standards: [
      { index: '01', title: 'Редакционные стандарты', description: 'Как рассматриваются редакционные решения, рецензирование, авторство, раскрытие информации и исправления.', href: links.editorial, action: 'Читать редакционные стандарты' },
      { index: '02', title: 'Публикационная этика', description: 'Общая система требований к добросовестности исследований, этической проверке, справедливой редакционной практике и исправлению научного архива.', href: links.ethics, action: 'Читать о публикационной этике' },
      { index: '03', title: 'Политика открытого доступа', description: 'Условия доступа, авторского права, лицензирования, сборов и ответственного повторного использования открытых работ.', href: links.openAccess, action: 'Читать политику открытого доступа' },
      { index: '04', title: 'Доступность', description: 'Как мы создаём общественную информацию и цифровые издательские сервисы с учётом разных потребностей.', href: links.accessibility, action: 'Читать заявление о доступности' },
      { index: '05', title: 'Ответственная оценка исследований', description: 'Публичное обязательство Panorama Scholarly Group Ltd перед DORA, ответственное использование показателей и признание разнообразия научных вкладов.', href: links.researchAssessment, action: 'Прочитать заявление DORA' },
    ],
    frameworkTitle: 'Четыре обязательства определяют каждую публикацию.', frameworkBody: 'Эти обязательства действуют для наших журналов, книг и научных работ. Они направляют решения до публикации и последующее ведение открытого научного архива.',
    commitments: [
      { title: 'Редакционная независимость', body: 'Редакционные решения основываются на научной ценности, актуальности, доказательствах и заявленной области публикации.' },
      { title: 'Исследовательская добросовестность', body: 'Мы ожидаем точного изложения, ответственного авторства, необходимых раскрытий и добросовестного рассмотрения вопросов.' },
      { title: 'Прозрачность', body: 'Читатели должны понимать, как работа оценивалась, поддерживалась и изменялась, а также кто участвовал в её создании.' },
      { title: 'Сохранение архива', body: 'Мы сохраняем версию записи и делаем видимыми исправления, обновления, заявления о сомнениях и отзывы публикаций.' },
    ],
    directoryTitle: 'Найдите нужный стандарт.', directoryBody: 'Каждая политика посвящена отдельной стороне ответственной публикации. Вместе они объясняют принятие решений, реакцию на вопросы, расширение доступа и сохранение полезности опубликованных работ.',
    workflowTitle: 'От подачи до научного архива.', workflowBody: 'Стандарты образуют единый процесс. Ясные ожидания помогают принимать обоснованные решения, а открытое ведение архива показывает читателям статус публикации.',
    workflow: [
      { title: 'Оценка', body: 'Публикация определяет область и критерии, затем проверяет соответствие, качество и добросовестность каждой работы.' },
      { title: 'Рецензирование', body: 'Редакторы назначают подходящих рецензентов и оценивают доказательства, соблюдая конфиденциальность и справедливость.' },
      { title: 'Публикация', body: 'Принятые работы получают ясные метаданные, сведения об авторах и участниках, лицензию и ссылки на соответствующие документы.' },
      { title: 'Поддержание', body: 'Опубликованный архив исправляется, когда новая информация требует обновления или официального уведомления.' },
    ],
    contactTitle: 'Нужна помощь в выборе политики?', contactBody: 'Начните с соответствующего стандарта выше. Если вы не уверены, какому журналу, импринту или издательской команде направить вопрос, мы поможем выбрать адресата.', contactAction: 'Связаться с группой',
  },
  ar: {
    title: 'المعايير', metaDescription: 'معايير Panorama Scholarly Group التحريرية والأخلاقية والوصول المفتوح وإمكانية الوصول من أجل نشر علمي مسؤول.',
    heroEyebrow: 'معايير النشر', heroTitle: 'يبدأ البحث الموثوق بمعايير واضحة.', heroLede: 'توجّه معاييرنا الحكم التحريري ونزاهة البحث والوصول إلى المعرفة ورعاية السجل العلمي في Panorama Scholarly Group.',
    readEditorial: 'اقرأ المعايير التحريرية', exploreFramework: 'استكشف الإطار', asideAria: 'ملخص إطار المعايير', asideLabel: 'إطار مشترك', asideStatement: 'حكم مستقل. ممارسة مسؤولة. سجل علمي موثوق.', asideMeta: 'للمؤلفين والمحررين والمراجعين والقراء في الدوريات والكتب والأعمال العلمية.', navLabel: 'المعايير', navOverview: 'نظرة عامة',
    standards: [
      { index: '01', title: 'المعايير التحريرية', description: 'كيفية التعامل مع القرارات التحريرية والتحكيم وتأليف الأعمال والإفصاح والتصحيحات.', href: links.editorial, action: 'اقرأ المعايير التحريرية' },
      { index: '02', title: 'أخلاقيات النشر', description: 'إطار على مستوى المجموعة لنزاهة البحث والمراجعة الأخلاقية والممارسة التحريرية العادلة وتصحيح السجل العلمي.', href: links.ethics, action: 'اقرأ أخلاقيات النشر' },
      { index: '03', title: 'سياسة الوصول المفتوح', description: 'شروط الوصول وحقوق النشر والترخيص والرسوم وإعادة الاستخدام المسؤولة للأعمال العلمية المفتوحة.', href: links.openAccess, action: 'اقرأ سياسة الوصول المفتوح' },
      { index: '04', title: 'إمكانية الوصول', description: 'كيف نصمم المعلومات العامة وتجارب النشر الرقمي للأشخاص ذوي الاحتياجات المختلفة.', href: links.accessibility, action: 'اقرأ بيان إمكانية الوصول' },
      { index: '05', title: 'التقييم المسؤول للبحوث', description: 'التزام Panorama Scholarly Group Ltd العلني بـ DORA وبالاستخدام المسؤول للمؤشرات والاعتراف بتنوع الإسهامات العلمية.', href: links.researchAssessment, action: 'اقرأ بيان DORA' },
    ],
    frameworkTitle: 'توجّه أربعة التزامات كل منشور.', frameworkBody: 'تنطبق هذه الالتزامات على دورياتنا وكتبنا وأعمالنا العلمية. وهي تشكّل القرارات قبل النشر والعناية بالسجل بعد دخوله إلى المجال العام.',
    commitments: [
      { title: 'الاستقلال التحريري', body: 'تستند القرارات التحريرية إلى القيمة العلمية والملاءمة والأدلة والنطاق المعلن للمنشور.' },
      { title: 'نزاهة البحث', body: 'نتوقع عرضاً دقيقاً وتأليفاً مسؤولاً وإفصاحاً مناسباً وتعاطياً صادقاً مع المخاوف.' },
      { title: 'الشفافية', body: 'ينبغي أن يتمكن القراء من فهم كيفية تقييم العمل ودعمه وتغييره وصلته بالمساهمين فيه.' },
      { title: 'رعاية السجل', body: 'نحافظ على النسخة المعتمدة ونجعل التصحيحات والتحديثات وبيانات القلق والسحب ظاهرة.' },
    ],
    directoryTitle: 'اعثر على المعيار الذي تحتاجه.', directoryBody: 'تتناول كل سياسة جانباً محدداً من النشر المسؤول. وتوضح السياسات مجتمعةً كيف نتخذ القرارات ونتعامل مع المخاوف ونوسّع الوصول ونحافظ على فائدة الأعمال المنشورة.',
    workflowTitle: 'من التقديم إلى السجل العلمي.', workflowBody: 'تعمل المعايير كعملية مترابطة. تساعد التوقعات الواضحة على اتخاذ قرارات سليمة، وتوضح الرعاية الشفافة حالة العمل المنشور للقراء.',
    workflow: [
      { title: 'التقييم', body: 'يحدد المنشور نطاقه ومعاييره ثم ينظر في ملاءمة كل عمل وجودته ونزاهته.' },
      { title: 'التحكيم', body: 'يعيّن المحررون مراجعين مناسبين ويوازنون الأدلة مع حماية السرية والمعاملة العادلة.' },
      { title: 'النشر', body: 'يُجهّز العمل المقبول ببيانات وصفية واضحة ومعلومات المساهمين والترخيص والروابط ذات الصلة.' },
      { title: 'المحافظة', body: 'يُصحح السجل المنشور عندما تتطلب المعلومات الجديدة تحديثاً أو إشعاراً رسمياً.' },
    ],
    contactTitle: 'هل تحتاج إلى مساعدة في العثور على السياسة المناسبة؟', contactBody: 'ابدأ بالمعيار ذي الصلة أعلاه. إذا لم تكن متأكداً من الدورية أو العلامة أو فريق النشر الذي ينبغي أن يتلقى سؤالك، يمكننا توجيهه إلى الجهة المناسبة.', contactAction: 'اتصل بالمجموعة',
  },
};

export function getStandardsCopy(locale = 'en'): StandardsPageCopy {
  return copy[locale as LocaleCode] ?? copy.en;
}
