import type { LocaleCode } from './config';

interface DoiPolicyCopy {
  title: string;
  summary: string;
  resolution: string;
  updated: string;
  labels: [string, string, string, string, string, string];
  paragraphs: [string, string, string, string, string, string];
}

const copies: Record<LocaleCode, DoiPolicyCopy> = {
  en: {
    title: 'DOI Allocation Policy',
    summary: 'Core scholarly articles normally receive Crossref DOIs under the PSG prefix 10.63802. Selected complimentary, editorially reviewed content may receive Zenodo DOIs registered through DataCite.',
    resolution: 'Crossref DOIs resolve to journal article records. Zenodo DOIs resolve to repository records linked to the official journal publication.',
    updated: '4 October 2026',
    labels: ['Scope and implementation', 'Core scholarly content', 'Complimentary sections', 'Conditional categories and notices', 'Existing identifiers', 'Publication records and transparency'],
    paragraphs: [
      'This group-wide framework governs DOI allocation for journal content. Journals implement it prospectively through their published article-type, review and fee policies. Each journal identifies the sections it has adopted; eligibility is confirmed before publication. A DOI identifies a publication and does not certify peer review or guarantee indexing.',
      'Research articles, review articles, systematic reviews, meta-analyses, theoretical and methodological papers, data papers, case studies, policy analyses and other substantive externally peer-reviewed contributions normally receive a PSG publisher DOI through Crossref. An APC waiver, discount or invitation does not change this route. DOI allocation is based on scholarly function and the approved review pathway, rather than payment alone.',
      'Approved complimentary sections charge no APC and may use Zenodo DOIs registered through DataCite. Eligible editorially reviewed content includes book, media and performance reviews; interviews and dialogues; conference reports; editorials and letters; translations and source texts; and creative works such as poetry, music and scores. Availability depends on the journal’s scope and published section policy. These works remain formal journal content and must meet its editorial, ethical, licensing and quality requirements.',
      'Commentaries, perspectives, forums, review essays, critical reviews, translations and practice reflections require individual classification. Substantive externally peer-reviewed contributions normally use Crossref; approved complimentary content assessed through editorial review may use Zenodo. Routine news, calls for papers and administrative notices normally receive no DOI. Formal corrections, expressions of concern and retractions follow the relevant post-publication policy and are linked to the affected publication.',
      'Existing DOIs are retained. When depositing the same published object in Zenodo, supply its existing DOI instead of generating a second one. Independently citable datasets, software or supplementary objects may have separate DOIs linked to the article. Exceptions require approval by the Editor-in-Chief or authorised Editorial Office and must preserve a clear scholarly record.',
      'Zenodo deposits include the final published file, title, authors, ORCIDs where available, publication date, journal title, volume and issue, pages or article number, content type, licence and official journal article URL. The record and OJS publication page must link to each other; the assigned DOI is included on the article page and in the final file. Reserve a Zenodo DOI before finalising the file, and publish the deposit before describing the DOI as active. Clearly disclose editorial review or external peer review; DOI provider and APC status do not establish that distinction.',
    ],
  },
  'zh-hans': {
    title: 'DOI 分配政策',
    summary: '核心学术论文通常使用 PSG 前缀 10.63802 下的 Crossref DOI。经编辑评审的部分免费栏目内容可使用由 DataCite 注册的 Zenodo DOI。',
    resolution: 'Crossref DOI 指向期刊文章记录；Zenodo DOI 指向仓储记录，并链接至期刊正式发表页面。',
    updated: '2026年10月4日',
    labels: ['适用范围与实施', '核心学术内容', '免费栏目', '条件类别与公告', '已有标识符', "出版记录与透明度"],
    paragraphs: [
      '本集团框架适用于期刊内容的 DOI 分配。各刊通过公布文章类型、审稿和收费政策，对新发表内容逐步实施，并明确已纳入的栏目；适用路径须在发表前确定。DOI 用于标识出版物，不代表同行评审认证，也不保证被数据库收录。',
      "研究论文、综述、系统综述、元分析、理论与方法论文、数据论文、案例研究、政策分析及其他经过外部同行评审的实质性学术成果，通常使用 PSG 通过 Crossref 注册的出版商 DOI。APC 减免、折扣或约稿不改变这一路径。分配依据是学术功能与经批准的评审流程，而非是否付费。",
      '经批准的免费栏目不收取 APC，可使用由 DataCite 注册的 Zenodo DOI。适用的编辑评审内容包括书评、媒体与表演评论、访谈与对话、会议报告、社论与读者来信、译文与原始文本，以及诗歌、音乐和乐谱等创作。各刊依学科范围和已公布的栏目政策决定是否开设。此类内容仍是正式期刊出版物，须符合编辑、伦理、许可与质量要求。',
      '评论、观点、论坛、评论文章、批判性评述、译文和实践反思须个案分类。经过外部同行评审的实质性成果通常使用 Crossref；经编辑评审并纳入免费栏目的内容可使用 Zenodo。一般新闻、征稿和行政公告通常不分配 DOI。正式勘误、关注声明和撤稿声明依各刊发表后政策处理，并链接至相关出版物。',
      '保留已有 DOI。同一已发表对象存入 Zenodo 时，应填写原有 DOI，避免另行生成第二个 DOI。可独立引用的数据集、软件和补充材料可使用各自 DOI，并与论文关联。例外须由主编或获授权的编辑部批准，并确保学术记录清晰。',
      'Zenodo 记录应包含最终发表文件、标题、作者、可用的 ORCID、发表日期、期刊名称、卷期、页码或文章编号、内容类型、许可和正式期刊文章 URL。仓储记录与 OJS 页面须双向链接；文章页面和最终文件须展示所分配的 DOI。应在定稿前预留 Zenodo DOI，完成仓储发布后才可宣称 DOI 已生效。清楚标明编辑评审或外部同行评审；DOI 提供方与 APC 状态不能替代审查属性说明。',
    ],
  },
  'zh-hant': {
    title: 'DOI 分配政策',
    summary: '核心學術論文通常使用 PSG 前綴 10.63802 下的 Crossref DOI。經編輯評審的部分免費欄目內容可使用由 DataCite 註冊的 Zenodo DOI。',
    resolution: 'Crossref DOI 指向期刊文章記錄；Zenodo DOI 指向倉儲記錄，並連結至期刊正式發表頁面。',
    updated: '2026年10月4日',
    labels: ['適用範圍與實施', '核心學術內容', '免費欄目', '條件類別與公告', '既有識別碼', '發表記錄與審查透明度'],
    paragraphs: [
      "本集團框架規範期刊內容的 DOI 分配。各期刊依據已公布的文章類型規範、同行評審政策及收費政策，將此框架適用於其後出版的內容；各刊須標明已採用的欄目，並於出版前確認內容是否符合資格。DOI 用於識別出版物，不代表同行評審認證，也不保證資料庫收錄。",
      '研究論文、綜述、系統綜述、統合分析、理論與方法論文、資料論文、案例研究、政策分析及其他經過外部同行評審的實質性學術成果，通常使用 PSG 透過 Crossref 註冊的出版商 DOI。APC 減免、折扣或約稿不改變此路徑。分配依據是學術功能與核准的審查路徑，而非是否付費。',
      '經核准的免費欄目不收取 APC，可使用由 DataCite 註冊的 Zenodo DOI。適用的編輯評審內容包括書評、媒體與表演評論、訪談與對話、會議報告、社論與讀者來信、譯文與原始文本，以及詩歌、音樂和樂譜等創作。各刊依學科範圍和已公布的欄目政策決定是否開設。此類內容仍是正式期刊出版物，須符合編輯、倫理、授權與品質要求。',
      '評論、觀點、論壇、評論文章、批判性評述、譯文和實踐反思須個案分類。經過外部同行評審的實質性成果通常使用 Crossref；經編輯評審並納入免費欄目的內容可使用 Zenodo。一般新聞、徵稿和行政公告通常不分配 DOI。正式勘誤、關注聲明和撤稿聲明依各刊發表後政策處理，並連結至相關出版物。',
      '保留既有 DOI。同一已發表對象存入 Zenodo 時，應填寫原有 DOI，避免另行產生第二個 DOI。可獨立引用的資料集、軟體和補充材料可使用各自 DOI，並與論文關聯。例外須由主編或獲授權的編輯部核准，並確保學術記錄清晰。',
      'Zenodo 記錄應包含最終發表檔案、標題、作者、可用的 ORCID、發表日期、期刊名稱、卷期、頁碼或文章編號、內容類型、授權和正式期刊文章 URL。倉儲記錄與 OJS 頁面須雙向連結；文章頁面和最終檔案須展示所分配的 DOI。應在定稿前預留 Zenodo DOI，完成倉儲發布後才可宣稱 DOI 已生效。清楚標明編輯評審或外部同行評審；DOI 提供方與 APC 狀態不能取代審查屬性說明。',
    ],
  },
  ja: {
    title: 'DOI 付与方針',
    summary: '主要な学術論文には通常、PSG のプレフィックス 10.63802 による Crossref DOI を付与します。編集審査を経た一部の無料掲載コンテンツには、DataCite を通じて登録される Zenodo DOI を使用できます。',
    resolution: 'Crossref DOI は雑誌の論文記録に、Zenodo DOI は正式な雑誌掲載ページにリンクしたリポジトリ記録に接続します。',
    updated: '2026年10月4日',
    labels: ['適用範囲と実施', '主要な学術コンテンツ', '無料掲載部門', '条件付き分類と告知', '既存の識別子', "掲載記録と透明性"],
    paragraphs: [
      'このグループ共通方針は雑誌コンテンツの DOI 付与に適用されます。各誌は記事種別、審査、料金の公開方針により、新規掲載分から段階的に導入し、対象部門を明示します。掲載前に適用経路を確認します。DOI は刊行物を識別するもので、査読の認証やデータベース収録の保証ではありません。',
      '研究論文、総説、系統的レビュー、メタ分析、理論・方法論論文、データ論文、事例研究、政策分析など、実質的な外部査読付き成果には通常 Crossref 経由の PSG 出版者 DOI を付与します。APC の免除、割引、招待はこの経路を変更しません。学術的機能と承認された審査経路を基準とし、支払いだけで判断しません。',
      '承認された無料掲載部門では APC を徴収せず、DataCite 登録の Zenodo DOI を使用できます。編集審査付きの書評、メディア・公演評、インタビュー・対話、会議報告、社説・投書、翻訳・原資料、詩・音楽・楽譜などが対象候補です。各誌の範囲と公開方針に従います。正式な雑誌コンテンツとして編集、倫理、ライセンス、品質要件を満たす必要があります。',
      '論評、展望、フォーラム、レビュー・エッセイ、批評、翻訳、実践の省察は個別に分類します。実質的な外部査読付き成果には通常 Crossref を、承認された編集審査付き無料コンテンツには Zenodo を使用できます。一般ニュース、投稿募集、事務告知には通常 DOI を付与しません。訂正、懸念表明、撤回は掲載後方針に従い、対象出版物にリンクします。',
      '既存 DOI を維持します。同じ掲載物を Zenodo に保存する場合、別の DOI を作成せず既存 DOI を入力します。独立して引用可能なデータ、ソフトウェア、補足資料には別 DOI を付与し論文に関連付けられます。例外は編集長または権限を持つ編集部の承認を要し、学術記録の明確さを維持します。',
      'Zenodo 記録には最終掲載ファイル、題名、著者、利用可能な ORCID、掲載日、雑誌名、巻号、ページまたは記事番号、種別、ライセンス、正式掲載 URL を含めます。リポジトリと OJS ページを相互にリンクし、記事ページと最終ファイルに DOI を記載します。ファイル確定前に DOI を予約し、リポジトリ公開後に有効な DOI として示します。編集審査と外部査読を明記し、DOI 提供者や APC 状態で審査属性を代替しません。',
    ],
  },
  ko: {
    title: 'DOI 배정 정책',
    summary: '핵심 학술 논문에는 일반적으로 PSG 접두사 10.63802의 Crossref DOI를 배정합니다. 편집 심사를 거친 일부 무료 콘텐츠에는 DataCite를 통해 등록되는 Zenodo DOI를 사용할 수 있습니다.',
    resolution: 'Crossref DOI는 학술지 논문 기록으로 연결됩니다. Zenodo DOI는 공식 학술지 게재 페이지와 연결된 저장소 기록으로 연결됩니다.',
    updated: '2026년 10월 4일',
    labels: ['적용 범위와 시행', '핵심 학술 콘텐츠', '무료 게재 섹션', '조건부 유형과 공지', '기존 식별자', '게재 기록과 심사 투명성'],
    paragraphs: [
      "이 그룹 공통 기준은 학술지 콘텐츠의 DOI 배정에 적용됩니다. 각 학술지는 공개한 논문 유형, 심사 및 비용 정책에 따라 향후 게재물부터 이 기준을 적용합니다. 적용하는 섹션을 각각 명시하며, 게재 전에 대상 여부를 확인합니다. DOI는 출판물을 식별하며 동료 심사 인증이나 데이터베이스 등재를 보장하지 않습니다.",
      '연구 논문, 종설, 체계적 문헌고찰, 메타분석, 이론·방법론 논문, 데이터 논문, 사례 연구, 정책 분석 등 실질적인 외부 동료 심사 학술 성과에는 일반적으로 Crossref를 통한 PSG 출판사 DOI를 배정합니다. APC 면제, 할인 또는 초청은 이 경로를 바꾸지 않습니다. 배정 기준은 학술적 기능과 승인된 심사 경로이며 결제 여부만으로 결정하지 않습니다.',
      '승인된 무료 섹션은 APC를 부과하지 않으며 DataCite에 등록되는 Zenodo DOI를 사용할 수 있습니다. 편집 심사를 거친 서평, 매체·공연 평론, 인터뷰·대담, 학술대회 보고, 사설·독자 편지, 번역·원문 자료, 시·음악·악보 등의 창작물이 대상이 될 수 있습니다. 각 학술지의 범위와 공개 섹션 정책에 따릅니다. 공식 학술지 콘텐츠로서 편집, 윤리, 라이선스 및 품질 요건을 충족해야 합니다.',
      "논평, 관점, 포럼, 서평 논문, 비평적 서평, 번역, 실천 성찰은 개별적으로 분류합니다. 실질적인 외부 동료 심사 성과는 일반적으로 Crossref를 사용하고, 승인된 편집 심사 무료 콘텐츠는 Zenodo를 사용할 수 있습니다. 일반 뉴스, 논문 모집 및 행정 공지에는 보통 DOI를 배정하지 않습니다. 공식 정정, 우려 표명 및 철회는 해당 게재 후 정책에 따르며 관련 출판물과 연결합니다.",
      '기존 DOI를 유지합니다. 동일한 게재물을 Zenodo에 보관할 때 새 DOI를 만들지 않고 기존 DOI를 입력합니다. 독립적으로 인용 가능한 데이터, 소프트웨어 및 보충 자료에는 별도 DOI를 배정하고 논문과 연결할 수 있습니다. 예외는 편집장 또는 권한을 부여받은 편집부의 승인을 받아 학술 기록의 명확성을 유지해야 합니다.',
      'Zenodo 기록에는 최종 게재 파일, 제목, 저자, 가능한 ORCID, 게재일, 학술지명, 권·호, 페이지 또는 논문 번호, 콘텐츠 유형, 라이선스 및 공식 논문 URL을 포함합니다. 저장소와 OJS 페이지는 상호 연결하고 논문 페이지와 최종 파일에 DOI를 표시합니다. 파일 확정 전에 DOI를 예약하고 저장소 공개 후에 활성 DOI로 안내합니다. 편집 심사 또는 외부 동료 심사를 명시하며 DOI 제공자나 APC 상태로 심사 속성을 대신하지 않습니다.',
    ],
  },
  de: {
    title: 'Richtlinie zur DOI-Vergabe',
    summary: 'Zentrale wissenschaftliche Artikel erhalten in der Regel Crossref-DOIs unter dem PSG-Präfix 10.63802. Ausgewählte kostenfreie, redaktionell geprüfte Inhalte können Zenodo-DOIs erhalten, die über DataCite registriert werden.',
    resolution: 'Crossref-DOIs führen zum Artikeldatensatz der Zeitschrift. Zenodo-DOIs führen zu einem Repositoriumseintrag mit Link zur offiziellen Zeitschriftenveröffentlichung.',
    updated: '4. Oktober 2026',
    labels: ['Geltungsbereich und Umsetzung', 'Zentrale wissenschaftliche Inhalte', 'Kostenfreie Rubriken', 'Bedingte Kategorien und Mitteilungen', 'Bestehende Kennungen', 'Publikationsdaten und Transparenz'],
    paragraphs: [
      "Dieser gruppenweite Rahmen regelt die DOI-Vergabe für Zeitschrifteninhalte. Die Zeitschriften setzen ihn für künftige Veröffentlichungen anhand ihrer veröffentlichten Richtlinien zu Beitragstypen, Begutachtung und Gebühren um. Jede Zeitschrift benennt die Rubriken, auf die sie ihn anwendet; die Berechtigung wird vor der Veröffentlichung bestätigt. Eine DOI identifiziert eine Publikation, bescheinigt aber weder ein Peer Review noch garantiert sie eine Indexierung.",
      "Forschungsartikel, Übersichtsarbeiten, systematische Übersichtsarbeiten, Metaanalysen, theoretische und methodische Beiträge, Datenartikel, Fallstudien, Politikanalysen und andere substanzielle, extern begutachtete Beiträge erhalten normalerweise eine PSG-Verlags-DOI über Crossref. Ein Erlass oder Rabatt auf die APC sowie eine Einladung ändern daran nichts. Maßgeblich sind die wissenschaftliche Funktion und das genehmigte Begutachtungsverfahren, nicht allein die Zahlung.",
      'Genehmigte kostenfreie Rubriken erheben keine APC und können über DataCite registrierte Zenodo-DOIs verwenden. Redaktionell geprüfte Buch-, Medien- und Aufführungsrezensionen, Interviews, Dialoge, Tagungsberichte, Editorials, Leserbriefe, Übersetzungen, Quellentexte, Gedichte, Musik und Partituren kommen infrage. Es gelten das Fachprofil und die veröffentlichte Rubrikenrichtlinie. Die Beiträge bleiben reguläre Zeitschrifteninhalte und erfüllen deren redaktionelle, ethische, lizenzrechtliche und qualitative Anforderungen.',
      "Kommentare, Perspektiven, Foren, Rezensionsessays, kritische Rezensionen, Übersetzungen und Praxisreflexionen müssen einzeln eingeordnet werden. Substanzielle, extern begutachtete Beiträge verwenden normalerweise Crossref; genehmigte kostenfreie Inhalte mit redaktioneller Prüfung können Zenodo verwenden. Reguläre Nachrichten, Aufrufe zur Einreichung von Beiträgen und Verwaltungsmitteilungen erhalten normalerweise keine DOI. Formelle Korrekturen, Besorgnisbekundungen und Rücknahmen folgen der jeweiligen Richtlinie nach der Veröffentlichung und werden mit der betroffenen Publikation verknüpft.",
      'Bestehende DOIs bleiben erhalten. Beim Hinterlegen desselben veröffentlichten Objekts in Zenodo wird die vorhandene DOI angegeben, statt eine zweite zu erzeugen. Eigenständig zitierbare Datensätze, Software und Ergänzungen können eigene, mit dem Artikel verknüpfte DOIs erhalten. Ausnahmen bedürfen der Zustimmung der Chefredaktion oder der befugten Redaktion und müssen die wissenschaftliche Dokumentation eindeutig halten.',
      'Zenodo-Einträge enthalten die endgültige Datei, Titel, Autoren, verfügbare ORCIDs, Veröffentlichungsdatum, Zeitschrift, Band, Heft, Seiten oder Artikelnummer, Beitragstyp, Lizenz und offizielle Artikel-URL. Repositorium und OJS-Seite werden gegenseitig verlinkt; DOI erscheint auf der Artikelseite und in der endgültigen Datei. Die DOI wird vor Fertigstellung reserviert und erst nach Veröffentlichung des Eintrags als aktiv bezeichnet. Redaktionelle Prüfung und externes Peer Review werden klar ausgewiesen; DOI-Anbieter und APC-Status ersetzen diese Angabe nicht.',
    ],
  },
  fr: {
    title: 'Politique d’attribution des DOI',
    summary: 'Les articles scientifiques principaux reçoivent normalement des DOI Crossref sous le préfixe PSG 10.63802. Certains contenus gratuits évalués par la rédaction peuvent recevoir des DOI Zenodo enregistrés via DataCite.',
    resolution: 'Les DOI Crossref mènent aux notices des articles de la revue. Les DOI Zenodo mènent aux notices du dépôt reliées à la publication officielle de la revue.',
    updated: '4 octobre 2026',
    labels: ['Champ et mise en œuvre', 'Contenus scientifiques principaux', 'Rubriques gratuites', 'Catégories conditionnelles et avis', 'Identifiants existants', 'Notices et transparence'],
    paragraphs: [
      "Ce cadre commun régit l’attribution des DOI aux contenus des revues. Chaque revue l’applique aux nouvelles publications au moyen de ses politiques publiées relatives aux types d’articles, à l’évaluation et aux frais, en précisant les rubriques qu’elle a adoptées. L’admissibilité est confirmée avant publication. Un DOI identifie une publication sans certifier l’évaluation par les pairs ni garantir l’indexation.",
      "Les articles de recherche, articles de synthèse, revues systématiques, méta-analyses, articles théoriques et méthodologiques, articles de données, études de cas, analyses de politiques publiques et autres contributions substantielles évaluées par des pairs externes reçoivent normalement un DOI d’éditeur PSG via Crossref. Une exonération d’APC, une remise ou une invitation ne modifie pas cette procédure. L’attribution du DOI dépend de la fonction scientifique et du processus d’évaluation approuvé, et non du seul paiement.",
      'Les rubriques gratuites approuvées ne facturent pas d’APC et peuvent utiliser des DOI Zenodo enregistrés via DataCite. Les recensions de livres, médias ou spectacles, entretiens, dialogues, comptes rendus de conférences, éditoriaux, lettres, traductions, textes sources, poésie, musique et partitions évalués par la rédaction sont admissibles selon le champ et la politique de la revue. Ces contributions restent des publications officielles et respectent les exigences éditoriales, éthiques, de licence et de qualité.',
      'Commentaires, perspectives, forums, essais de recension, critiques, traductions et réflexions sur la pratique sont classés individuellement. Les contributions substantielles évaluées par des pairs externes utilisent normalement Crossref; les contenus gratuits approuvés évalués par la rédaction peuvent utiliser Zenodo. Actualités courantes, appels à contributions et avis administratifs ne reçoivent normalement pas de DOI. Corrections formelles, expressions de préoccupation et rétractations suivent la politique applicable et sont reliées à la publication concernée.',
      'Les DOI existants sont conservés. Le dépôt du même objet publié dans Zenodo doit indiquer son DOI existant plutôt qu’en créer un second. Les jeux de données, logiciels et suppléments citables séparément peuvent avoir leurs propres DOI reliés à l’article. Les exceptions nécessitent l’accord de la direction ou du secrétariat de rédaction habilité et doivent préserver un dossier scientifique clair.',
      "La notice Zenodo comprend le fichier final, le titre, les auteurs, les ORCID, le cas échéant, la date de publication, le titre de la revue, le volume et le numéro, les pages ou le numéro d’article, le type de contenu, la licence et l’URL de l’article sur le site officiel de la revue. La notice et la page de publication OJS doivent renvoyer l’une à l’autre ; le DOI attribué figure sur la page de l’article et dans le fichier final. Réservez un DOI Zenodo avant de finaliser le fichier et ne le présentez comme actif qu’une fois le dépôt publié. Indiquez clairement s’il s’agit d’une évaluation éditoriale ou d’une évaluation externe par les pairs ; le fournisseur du DOI et le statut des APC ne permettent pas d’établir cette distinction.",
    ],
  },
  es: {
    title: 'Política de asignación de DOI',
    summary: 'Los artículos científicos principales reciben normalmente DOI de Crossref bajo el prefijo PSG 10.63802. Ciertos contenidos gratuitos con revisión editorial pueden recibir DOI de Zenodo registrados mediante DataCite.',
    resolution: 'Los DOI de Crossref dirigen al registro del artículo en la revista. Los de Zenodo dirigen al registro del repositorio enlazado a la publicación oficial de la revista.',
    updated: '4 de octubre de 2026',
    labels: ['Ámbito y aplicación', 'Contenido científico principal', 'Secciones gratuitas', 'Categorías condicionales y avisos', 'Identificadores existentes', 'Registros y transparencia'],
    paragraphs: [
      "Este marco común para el grupo regula la asignación de DOI a los contenidos de las revistas. Cada revista lo aplica de forma prospectiva mediante sus políticas publicadas sobre tipos de artículos, revisión y tarifas, e indica qué secciones ha adoptado. La elegibilidad se confirma antes de la publicación. Un DOI identifica una publicación, pero no certifica la revisión por pares ni garantiza su indexación.",
      'Artículos de investigación, revisiones, revisiones sistemáticas, metaanálisis, trabajos teóricos y metodológicos, artículos de datos, estudios de caso, análisis de políticas y otras contribuciones sustantivas con revisión externa por pares reciben normalmente un DOI editorial PSG mediante Crossref. Una exención de APC, descuento o invitación no cambia esta vía. La función científica y la revisión aprobada determinan la asignación, no solo el pago.',
      'Las secciones gratuitas aprobadas no cobran APC y pueden utilizar DOI de Zenodo registrados mediante DataCite. Pueden incluir reseñas de libros, medios y actuaciones, entrevistas, diálogos, informes de congresos, editoriales, cartas, traducciones, textos fuente, poesía, música y partituras con revisión editorial. Se aplican el ámbito y la política publicada de cada revista. Siguen siendo publicaciones formales y deben cumplir sus requisitos editoriales, éticos, de licencia y calidad.',
      'Comentarios, perspectivas, foros, ensayos de reseña, críticas, traducciones y reflexiones prácticas se clasifican individualmente. Las contribuciones sustantivas con revisión externa utilizan normalmente Crossref; el contenido gratuito aprobado con revisión editorial puede utilizar Zenodo. Noticias rutinarias, convocatorias y avisos administrativos normalmente no reciben DOI. Correcciones formales, expresiones de preocupación y retractaciones siguen la política correspondiente y se enlazan a la publicación afectada.',
      "Se conservan los DOI existentes. Al depositar en Zenodo el mismo objeto ya publicado, debe incluirse su DOI existente en lugar de generar uno nuevo. Los conjuntos de datos, el software y los materiales complementarios que puedan citarse de forma independiente pueden tener DOI propios vinculados al artículo. Las excepciones requieren la aprobación del editor jefe o de la oficina editorial autorizada y deben preservar un registro académico claro.",
      "Los depósitos en Zenodo deben incluir el archivo final publicado, el título, los autores, los identificadores ORCID cuando estén disponibles, la fecha de publicación, el título de la revista, el volumen y el número, las páginas o el número de artículo, el tipo de contenido, la licencia y la URL oficial del artículo en la revista. El registro y la página de publicación en OJS deben enlazarse entre sí; el DOI asignado debe figurar en la página del artículo y en el archivo final. Reserve el DOI de Zenodo antes de finalizar el archivo y publique el depósito antes de indicar que el DOI está activo. Indique claramente si el contenido pasó por revisión editorial o por revisión externa por pares; el proveedor del DOI y el estado del APC no permiten distinguir entre ambos tipos de revisión.",
    ],
  },
  ru: {
    title: 'Политика присвоения DOI',
    summary: 'Основным научным статьям обычно присваиваются DOI Crossref с префиксом PSG 10.63802. Отдельные бесплатные материалы, прошедшие редакционную проверку, могут получать DOI Zenodo, зарегистрированные через DataCite.',
    resolution: 'DOI Crossref ведут к записи статьи на сайте журнала. DOI Zenodo ведут к записи репозитория, связанной с официальной журнальной публикацией.',
    updated: '4 октября 2026 года',
    labels: ['Область применения и внедрение', 'Основные научные материалы', 'Бесплатные рубрики', 'Условные категории и объявления', 'Существующие идентификаторы', 'Записи и прозрачность проверки'],
    paragraphs: [
      "Эти общие для всей группы правила регулируют присвоение DOI материалам журналов. Журналы применяют их к новым публикациям в соответствии с опубликованными правилами о типах материалов, рецензировании и сборах. Каждый журнал указывает, какие разделы подпадают под эти правила; соответствие требованиям проверяется до публикации. DOI идентифицирует публикацию, но не подтверждает факт рецензирования и не гарантирует индексацию.",
      "Исследовательские и обзорные статьи, систематические обзоры, метаанализы, теоретические и методологические работы, статьи с описанием данных, тематические исследования, анализ государственной политики и другие содержательные работы, прошедшие внешнее рецензирование, обычно получают издательский DOI PSG через Crossref. Освобождение от APC, скидка или приглашение не меняют порядок присвоения DOI. Решение зависит от научной функции материала и утверждённой процедуры рецензирования, а не только от оплаты.",
      "Утверждённые бесплатные рубрики не взимают APC и могут использовать DOI Zenodo, зарегистрированные через DataCite. К редакционно проверенным материалам могут относиться рецензии на книги, медиа и сценические произведения; интервью и диалоги; отчёты о конференциях; редакционные материалы и письма; переводы и тексты источников; творческие работы, например стихи, музыка и партитуры. Доступность зависит от профиля журнала и опубликованных правил для рубрик. Эти работы остаются частью официального содержания журнала и должны соответствовать его редакционным, этическим и лицензионным требованиям, а также требованиям к качеству.",
      'Комментарии, перспективы, форумы, обзорные эссе, критические обзоры, переводы и размышления о практике классифицируются индивидуально. Содержательные внешне рецензируемые работы обычно используют Crossref; утверждённые бесплатные материалы с редакционной проверкой могут использовать Zenodo. Обычные новости, приглашения к публикации и административные объявления обычно не получают DOI. Формальные исправления, выражения обеспокоенности и ретракции регулируются соответствующей политикой и связаны с затронутой публикацией.',
      "Существующие DOI сохраняются. Если тот же опубликованный материал размещают в Zenodo, указывают уже присвоенный DOI, а не создают второй. Самостоятельно цитируемые наборы данных, программное обеспечение и дополнительные материалы могут иметь отдельные DOI, связанные со статьёй. Исключения должны быть одобрены главным редактором или уполномоченной редакцией и не нарушать целостность научных публикаций.",
      'Запись Zenodo включает окончательный файл, название, авторов, доступные ORCID, дату, журнал, том, выпуск, страницы или номер статьи, тип, лицензию и официальный URL. Репозиторий и страница OJS взаимно связаны; DOI указан на странице и в окончательном файле. DOI резервируют до завершения файла и называют активным только после публикации записи. Редакционная проверка и внешнее рецензирование обозначаются явно; провайдер DOI и статус APC не заменяют эту информацию.',
    ],
  },
  ar: {
    title: 'سياسة تخصيص DOI',
    summary: 'تحصل المقالات العلمية الأساسية عادةً على DOI عبر Crossref تحت بادئة PSG ‏10.63802. ويمكن لبعض المحتويات المجانية التي تخضع لمراجعة تحريرية الحصول على DOI من Zenodo مسجّل عبر DataCite.',
    resolution: 'تؤدي معرّفات Crossref إلى سجلات المقالات في الدورية، وتؤدي معرّفات Zenodo إلى سجلات المستودع المرتبطة بالنشر الرسمي في الدورية.',
    updated: '4 أكتوبر 2026',
    labels: ['النطاق والتنفيذ', 'المحتوى العلمي الأساسي', 'الأقسام المجانية', 'الفئات المشروطة والإعلانات', 'المعرّفات القائمة', 'سجلات النشر وشفافية المراجعة'],
    paragraphs: [
      'ينظّم هذا الإطار المشترك تخصيص DOI لمحتويات الدوريات. تطبّقه كل دورية تدريجياً على المنشورات الجديدة عبر سياساتها المنشورة لأنواع المقالات والمراجعة والرسوم، وتحدّد الأقسام المعتمدة. يُحسم المسار قبل النشر. يعرّف DOI المنشور ولا يشهد بتحكيم الأقران ولا يضمن الفهرسة.',
      'تحصل الأبحاث والمراجعات والمراجعات المنهجية والتحليلات التلوية والأعمال النظرية والمنهجية ومقالات البيانات ودراسات الحالات وتحليل السياسات وغيرها من الإسهامات الجوهرية المحكّمة خارجياً عادةً على DOI للناشر PSG عبر Crossref. لا يغيّر إعفاء APC أو الخصم أو الدعوة هذا المسار. يعتمد التخصيص على الوظيفة العلمية ومسار المراجعة المعتمد، لا على الدفع وحده.',
      'لا تفرض الأقسام المجانية المعتمدة APC ويمكنها استخدام DOI من Zenodo مسجّل عبر DataCite. قد تشمل مراجعات الكتب والإعلام والعروض والمقابلات والحوارات وتقارير المؤتمرات والافتتاحيات والرسائل والترجمات والنصوص الأصلية والشعر والموسيقى والنوتات التي تخضع لمراجعة تحريرية. تخضع الأهلية لنطاق الدورية وسياستها المنشورة. وتبقى منشورات رسمية تستوفي متطلبات التحرير والأخلاق والترخيص والجودة.',
      'تُصنّف التعليقات ووجهات النظر والمنتديات والمقالات النقدية والترجمات وتأملات الممارسة كلٌّ على حدة. تستخدم الإسهامات الجوهرية المحكّمة خارجياً Crossref عادةً، ويمكن للمحتوى المجاني المعتمد بمراجعة تحريرية استخدام Zenodo. لا تُمنح الأخبار الروتينية ودعوات النشر والإعلانات الإدارية DOI عادةً. وتتبع التصحيحات الرسمية وبيانات القلق والسحب سياسة ما بعد النشر وترتبط بالمنشور المعني.',
      'تُحفظ معرّفات DOI القائمة. عند إيداع الكائن المنشور نفسه في Zenodo يُدخل DOI الحالي بدلاً من إنشاء ثانٍ. وقد تحصل البيانات والبرمجيات والمواد التكميلية القابلة للاستشهاد المستقل على DOI منفصل مرتبط بالمقالة. تتطلب الاستثناءات موافقة رئيس التحرير أو المكتب المخوّل مع الحفاظ على وضوح السجل العلمي.',
      'يشمل سجل Zenodo الملف النهائي والعنوان والمؤلفين ومعرّفات ORCID المتاحة والتاريخ واسم الدورية والمجلد والعدد والصفحات أو رقم المقالة والنوع والترخيص ورابط المقالة الرسمي. يرتبط المستودع وصفحة OJS ببعضهما، ويظهر DOI على الصفحة وفي الملف النهائي. يُحجز DOI قبل إنهاء الملف ولا يوصف بالنشط إلا بعد نشر الإيداع. تُعلن المراجعة التحريرية أو تحكيم الأقران الخارجي بوضوح؛ ولا يحل مزوّد DOI أو وضع APC محل هذه المعلومة.',
    ],
  },
};

export const doiSectionIds = ['scope', 'core', 'complimentary', 'conditional', 'existing', 'records'] as const;

export function getDoiPolicyCopy(locale = 'en'): DoiPolicyCopy {
  return copies[locale as LocaleCode] ?? copies.en;
}
