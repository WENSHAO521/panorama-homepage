import type { LocaleCode } from './config';

export interface ResearchPageCopy {
  title: string;
  metaDescription: string;
  heroTitle: string;
  lede: string;
  visit: string;
  infrastructure: string;
  independentOverline: string;
  statement: string;
  facts: [string, string, string, string, string, string];
  areasOverline: string;
  areasTitle: string;
  areasIntro: string;
  areas: { title: string; description: string }[];
  principlesOverline: string;
  principlesTitle: string;
  principlesIntro: string;
  principles: [string, string, string][];
  closingOverline: string;
  closingTitle: string;
  closingBody: string;
  exploreInfrastructure: string;
}

const research: Record<LocaleCode, ResearchPageCopy> = {
  en: {
    title: 'Research Institute',
    metaDescription: 'Panorama Research Institute supports interdisciplinary research, scholarly publishing studies, policy analysis, and scholarly communication infrastructure.',
    heroTitle: 'Research for a more informed world.',
    lede: 'Panorama Research Institute supports interdisciplinary research, scholarly publishing studies, policy analysis, and global scholarly communication infrastructure.',
    visit: 'Visit the Research Institute', infrastructure: 'View scholarly infrastructure',
    independentOverline: 'An independent research programme',
    statement: 'Evidence, interpretation, and infrastructure for scholarship that travels.',
    facts: ['Position', 'Research division of Panorama Scholarly Group', 'Connection', 'Publishing, policy, and scholarly infrastructure', 'Platform', 'Independent research website'],
    areasOverline: 'What the institute works on', areasTitle: 'Research with a clear public purpose.',
    areasIntro: 'The institute connects questions about knowledge, institutions, and public life with the systems that make research possible.',
    areas: [
      { title: 'Interdisciplinary research', description: 'Questions that cross disciplinary boundaries and need more than one way of seeing the problem.' },
      { title: 'Scholarly publishing studies', description: 'Research into the journals, editorial systems, and practices that support credible scholarship.' },
      { title: 'Policy analysis', description: 'Evidence and interpretation for institutions and decisions that shape public life.' },
      { title: 'Scholarly communication infrastructure', description: 'Work on indexing, evaluation, discovery, and the systems that help research travel.' },
    ],
    principlesOverline: 'How we work', principlesTitle: 'Independent inquiry. Shared standards.',
    principlesIntro: 'The institute operates independently while remaining connected to the group’s commitment to clear methods, responsible practice, and care for the scholarly record.',
    principles: [
      ['01', 'Make the question clear', 'Good research begins with a question that can be examined, challenged, and understood.'],
      ['02', 'Show the reasoning', 'Methods, evidence, and limits should be visible enough for others to assess and extend the work.'],
      ['03', 'Keep the work useful', 'Research should remain connected to the people, institutions, and public questions it is intended to serve.'],
    ],
    closingOverline: 'Continue through the group', closingTitle: 'Follow the work where it leads.',
    closingBody: 'Visit the independent research platform for current programmes and publications, or explore the infrastructure that supports the scholarly record.',
    exploreInfrastructure: 'Explore scholarly infrastructure',
  },
  'zh-hans': {
    title: '研究院',
    metaDescription: 'Panorama Research Institute 支持跨学科研究、学术出版研究、政策分析与学术传播基础设施建设。',
    heroTitle: '为一个更充分知情的世界开展研究。',
    lede: 'Panorama Research Institute 支持跨学科研究、学术出版研究、政策分析以及全球学术传播基础设施建设。',
    visit: '访问研究院', infrastructure: '查看学术基础设施',
    independentOverline: '独立研究项目', statement: '为能够传播的学术成果提供证据、阐释与基础设施。',
    facts: ['定位', 'Panorama Scholarly Group 研究部门', '连接', '出版、政策与学术基础设施', '平台', '独立研究网站'],
    areasOverline: '研究院关注什么', areasTitle: '以明确的公共目的开展研究。',
    areasIntro: '研究院将关于知识、制度与公共生活的问题，与使研究成为可能的系统连接起来。',
    areas: [
      { title: '跨学科研究', description: '跨越学科边界的问题，需要多种视角才能获得充分理解。' },
      { title: '学术出版研究', description: '研究支持可信学术成果的期刊、编辑制度与出版实践。' },
      { title: '政策分析', description: '为塑造公共生活的制度与决策提供证据和阐释。' },
      { title: '学术传播基础设施', description: '关注索引、评价、发现以及帮助研究传播的系统。' },
    ],
    principlesOverline: '我们的工作方式', principlesTitle: '独立探究，共享标准。',
    principlesIntro: '研究院独立开展工作，同时与集团对清晰方法、负责任实践和学术记录维护的承诺保持联系。',
    principles: [
      ['01', '明确问题', '好的研究始于一个能够被检验、质疑并理解的问题。'],
      ['02', '呈现推理过程', '方法、证据与局限应当足够透明，使他人能够评估并延展研究。'],
      ['03', '保持实际价值', '研究应始终与其服务的人群、机构和公共问题保持联系。'],
    ],
    closingOverline: '继续探索集团体系', closingTitle: '让研究沿着它的方向继续前行。',
    closingBody: '访问独立研究平台，了解当前项目与出版成果；也可以探索支撑学术记录的基础设施。',
    exploreInfrastructure: '探索学术基础设施',
  },
  'zh-hant': {
    title: '研究院',
    metaDescription: 'Panorama Research Institute 支持跨學科研究、學術出版研究、政策分析與學術傳播基礎設施建設。',
    heroTitle: '為一個更充分知情的世界開展研究。',
    lede: 'Panorama Research Institute 支持跨學科研究、學術出版研究、政策分析以及全球學術傳播基礎設施建設。',
    visit: '訪問研究院', infrastructure: '查看學術基礎設施',
    independentOverline: '獨立研究項目', statement: '為能夠傳播的學術成果提供證據、闡釋與基礎設施。',
    facts: ['定位', 'Panorama Scholarly Group 研究部門', '連結', '出版、政策與學術基礎設施', '平台', '獨立研究網站'],
    areasOverline: '研究院關注什麼', areasTitle: '以明確的公共目的開展研究。',
    areasIntro: '研究院將關於知識、制度與公共生活的問題，與使研究成為可能的系統連結起來。',
    areas: [
      { title: '跨學科研究', description: '跨越學科邊界的問題，需要多種視角才能獲得充分理解。' },
      { title: '學術出版研究', description: '研究支持可信學術成果的期刊、編輯制度與出版實踐。' },
      { title: '政策分析', description: '為塑造公共生活的制度與決策提供證據和闡釋。' },
      { title: '學術傳播基礎設施', description: '關注索引、評估、發現以及幫助研究傳播的系統。' },
    ],
    principlesOverline: '我們的工作方式', principlesTitle: '獨立探究，共享標準。',
    principlesIntro: '研究院獨立開展工作，同時與集團對清晰方法、負責任實踐和學術記錄維護的承諾保持聯繫。',
    principles: [
      ['01', '明確問題', '好的研究始於一個能夠被檢驗、質疑並理解的問題。'],
      ['02', '呈現推理過程', '方法、證據與局限應當足夠透明，使他人能夠評估並延展研究。'],
      ['03', '保持實際價值', '研究應始終與其服務的人群、機構和公共問題保持聯繫。'],
    ],
    closingOverline: '繼續探索集團體系', closingTitle: '讓研究沿著它的方向繼續前行。',
    closingBody: '訪問獨立研究平台，了解當前項目與出版成果；也可以探索支撐學術記錄的基礎設施。',
    exploreInfrastructure: '探索學術基礎設施',
  },
  ja: {
    title: '研究所',
    metaDescription: 'Panorama Research Instituteは、学際研究、学術出版研究、政策分析、学術コミュニケーション基盤を支援します。',
    heroTitle: 'よりよく知ることのできる世界のための研究。',
    lede: 'Panorama Research Instituteは、学際研究、学術出版研究、政策分析、世界の学術コミュニケーション基盤を支援します。',
    visit: '研究所を訪問', infrastructure: '学術インフラを見る',
    independentOverline: '独立した研究プログラム', statement: '広がる学術のための、証拠・解釈・インフラ。',
    facts: ['位置づけ', 'Panorama Scholarly Groupの研究部門', '接続', '出版・政策・学術インフラ', 'プラットフォーム', '独立した研究ウェブサイト'],
    areasOverline: '研究所のテーマ', areasTitle: '明確な公共的目的を持つ研究。',
    areasIntro: '知識、制度、公共生活をめぐる問いと、研究を可能にするシステムを結びます。',
    areas: [
      { title: '学際研究', description: '分野の境界を越え、複数の見方を必要とする問い。' },
      { title: '学術出版研究', description: '信頼できる学術を支える学術誌、編集制度、実践を研究します。' },
      { title: '政策分析', description: '公共生活を形づくる制度と意思決定のための証拠と解釈。' },
      { title: '学術コミュニケーション基盤', description: '索引、評価、発見、そして研究を届けるシステムを扱います。' },
    ],
    principlesOverline: '仕事の進め方', principlesTitle: '独立した探究。共有する基準。',
    principlesIntro: '研究所は独立して活動しながら、明確な方法、責任ある実践、学術記録への配慮というグループの約束とつながっています。',
    principles: [
      ['01', '問いを明確にする', 'よい研究は、検討し、問い直し、理解できる問いから始まります。'],
      ['02', '推論を示す', '方法、証拠、限界を、他者が評価し発展させられる程度に明らかにします。'],
      ['03', '役立つ仕事を続ける', '研究を、それが仕える人々、制度、公共的な問いと結びつけます。'],
    ],
    closingOverline: 'グループの他の領域へ', closingTitle: '研究が導く先へ進む。',
    closingBody: '独立した研究プラットフォームで現在のプログラムと刊行物を確認するか、学術記録を支えるインフラをご覧ください。',
    exploreInfrastructure: '学術インフラを探索',
  },
  ko: {
    title: '연구소',
    metaDescription: 'Panorama Research Institute는 학제 간 연구, 학술 출판 연구, 정책 분석과 학술 커뮤니케이션 인프라를 지원합니다.',
    heroTitle: '더 잘 이해하는 세계를 위한 연구.',
    lede: 'Panorama Research Institute는 학제 간 연구, 학술 출판 연구, 정책 분석과 글로벌 학술 커뮤니케이션 인프라를 지원합니다.',
    visit: '연구소 방문', infrastructure: '학술 인프라 보기',
    independentOverline: '독립 연구 프로그램', statement: '확장되는 학문을 위한 증거, 해석, 인프라.',
    facts: ['위치', 'Panorama Scholarly Group 연구 부문', '연결', '출판·정책·학술 인프라', '플랫폼', '독립 연구 웹사이트'],
    areasOverline: '연구소의 연구 영역', areasTitle: '분명한 공공 목적을 가진 연구.',
    areasIntro: '지식, 제도, 공공 생활에 관한 질문을 연구를 가능하게 하는 시스템과 연결합니다.',
    areas: [
      { title: '학제 간 연구', description: '학문 경계를 넘나들며 하나 이상의 관점이 필요한 질문을 다룹니다.' },
      { title: '학술 출판 연구', description: '신뢰할 수 있는 학문을 뒷받침하는 학술지, 편집 체계, 관행을 연구합니다.' },
      { title: '정책 분석', description: '공공 생활을 형성하는 제도와 의사결정을 위한 증거와 해석을 제공합니다.' },
      { title: '학술 커뮤니케이션 인프라', description: '색인, 평가, 발견, 연구 확산을 가능하게 하는 시스템을 연구합니다.' },
    ],
    principlesOverline: '일하는 방식', principlesTitle: '독립적 탐구. 공유하는 기준.',
    principlesIntro: '연구소는 독립적으로 운영되면서도 명확한 방법, 책임 있는 실천, 학술 기록에 대한 돌봄이라는 그룹의 약속과 연결되어 있습니다.',
    principles: [
      ['01', '질문을 분명히 하기', '좋은 연구는 검토하고 도전하며 이해할 수 있는 질문에서 시작합니다.'],
      ['02', '추론을 보여주기', '다른 사람이 연구를 평가하고 확장할 수 있도록 방법, 증거, 한계를 드러냅니다.'],
      ['03', '유용성을 유지하기', '연구를 그것이 섬기고자 하는 사람, 기관, 공공의 질문과 연결합니다.'],
    ],
    closingOverline: '그룹의 다른 영역으로', closingTitle: '연구가 이끄는 곳을 따라가다.',
    closingBody: '독립 연구 플랫폼에서 현재 프로그램과 출판물을 확인하거나 학술 기록을 뒷받침하는 인프라를 살펴보세요.',
    exploreInfrastructure: '학술 인프라 살펴보기',
  },
  de: {
    title: 'Forschungsinstitut', metaDescription: 'Das Panorama Research Institute unterstützt interdisziplinäre Forschung, Studien zum wissenschaftlichen Publizieren, Politikanalysen und Infrastruktur für wissenschaftliche Kommunikation.',
    heroTitle: 'Forschung für eine besser informierte Welt.',
    lede: 'Das Panorama Research Institute unterstützt interdisziplinäre Forschung, Studien zum wissenschaftlichen Publizieren, Politikanalysen und globale Infrastruktur für wissenschaftliche Kommunikation.',
    visit: 'Forschungsinstitut besuchen', infrastructure: 'Wissenschaftliche Infrastruktur ansehen', independentOverline: 'Ein unabhängiges Forschungsprogramm', statement: 'Evidenz, Einordnung und Infrastruktur für Wissenschaft, die Wirkung entfaltet.',
    facts: ['Position', 'Forschungsbereich der Panorama Scholarly Group', 'Verbindung', 'Publizieren, Politik und wissenschaftliche Infrastruktur', 'Plattform', 'Unabhängige Forschungswebsite'],
    areasOverline: 'Woran das Institut arbeitet', areasTitle: 'Forschung mit einem klaren öffentlichen Zweck.', areasIntro: 'Das Institut verbindet Fragen zu Wissen, Institutionen und öffentlichem Leben mit den Systemen, die Forschung ermöglichen.',
    areas: [
      { title: 'Interdisziplinäre Forschung', description: 'Fragen über Disziplingrenzen hinweg, die mehr als eine Sichtweise erfordern.' },
      { title: 'Studien zum wissenschaftlichen Publizieren', description: 'Forschung zu Zeitschriften, Redaktionssystemen und Praktiken, die glaubwürdige Wissenschaft tragen.' },
      { title: 'Politikanalyse', description: 'Evidenz und Einordnung für Institutionen und Entscheidungen, die das öffentliche Leben prägen.' },
      { title: 'Infrastruktur wissenschaftlicher Kommunikation', description: 'Arbeit an Indexierung, Bewertung, Auffindbarkeit und den Systemen, die Forschung verbreiten.' },
    ],
    principlesOverline: 'Unsere Arbeitsweise', principlesTitle: 'Unabhängige Forschung. Gemeinsame Standards.', principlesIntro: 'Das Institut arbeitet unabhängig und bleibt zugleich mit dem Gruppenverständnis von klaren Methoden, verantwortungsvoller Praxis und der Pflege des wissenschaftlichen Protokolls verbunden.',
    principles: [['01', 'Die Frage klären', 'Gute Forschung beginnt mit einer Frage, die geprüft, hinterfragt und verstanden werden kann.'], ['02', 'Das Denken sichtbar machen', 'Methoden, Evidenz und Grenzen müssen so transparent sein, dass andere die Arbeit bewerten und weiterführen können.'], ['03', 'Nützlich bleiben', 'Forschung sollte mit den Menschen, Institutionen und öffentlichen Fragen verbunden bleiben, denen sie dienen soll.']],
    closingOverline: 'Weiter durch die Gruppe', closingTitle: 'Der Forschung dorthin folgen, wohin sie führt.', closingBody: 'Besuchen Sie die unabhängige Forschungsplattform für aktuelle Programme und Publikationen oder erkunden Sie die Infrastruktur hinter dem wissenschaftlichen Protokoll.', exploreInfrastructure: 'Wissenschaftliche Infrastruktur erkunden',
  },
  fr: {
    title: 'Institut de recherche', metaDescription: 'Le Panorama Research Institute soutient la recherche interdisciplinaire, les études sur l’édition scientifique, l’analyse des politiques et les infrastructures de communication scientifique.',
    heroTitle: 'La recherche pour un monde mieux informé.',
    lede: 'Le Panorama Research Institute soutient la recherche interdisciplinaire, les études sur l’édition scientifique, l’analyse des politiques et les infrastructures mondiales de communication scientifique.',
    visit: 'Visiter l’institut de recherche', infrastructure: 'Voir les infrastructures scientifiques', independentOverline: 'Un programme de recherche indépendant', statement: 'Des preuves, des interprétations et des infrastructures pour une recherche qui circule.',
    facts: ['Positionnement', 'Pôle de recherche de Panorama Scholarly Group', 'Lien', 'Édition, politiques publiques et infrastructures scientifiques', 'Plateforme', 'Site indépendant de recherche'],
    areasOverline: 'Les travaux de l’institut', areasTitle: 'Une recherche à finalité publique clairement assumée.', areasIntro: 'L’institut relie les questions de connaissance, d’institutions et de vie publique aux systèmes qui rendent la recherche possible.',
    areas: [{ title: 'Recherche interdisciplinaire', description: 'Des questions qui franchissent les frontières disciplinaires et exigent plusieurs points de vue.' }, { title: 'Études de l’édition scientifique', description: 'Des recherches sur les revues, les systèmes éditoriaux et les pratiques qui soutiennent une science fiable.' }, { title: 'Analyse des politiques', description: 'Des preuves et des interprétations pour les institutions et les décisions qui façonnent la vie publique.' }, { title: 'Infrastructures de communication scientifique', description: 'Un travail sur l’indexation, l’évaluation, la découverte et les systèmes qui font circuler la recherche.' }],
    principlesOverline: 'Notre méthode', principlesTitle: 'Recherche indépendante. Standards partagés.', principlesIntro: 'L’institut agit de manière indépendante tout en restant lié à l’engagement du groupe en faveur de méthodes claires, de pratiques responsables et du soin porté au dossier scientifique.',
    principles: [['01', 'Clarifier la question', 'Une bonne recherche commence par une question qui peut être examinée, discutée et comprise.'], ['02', 'Rendre le raisonnement visible', 'Les méthodes, les preuves et les limites doivent être assez explicites pour permettre l’évaluation et le prolongement du travail.'], ['03', 'Rester utile', 'La recherche doit rester reliée aux personnes, aux institutions et aux enjeux publics qu’elle entend servir.']],
    closingOverline: 'Poursuivre avec le groupe', closingTitle: 'Suivre la recherche là où elle mène.', closingBody: 'Visitez la plateforme de recherche indépendante pour découvrir les programmes et publications actuels, ou explorez les infrastructures qui soutiennent le dossier scientifique.', exploreInfrastructure: 'Explorer les infrastructures scientifiques',
  },
  es: {
    title: 'Instituto de Investigación', metaDescription: 'Panorama Research Institute apoya la investigación interdisciplinar, los estudios sobre publicación académica, el análisis de políticas y la infraestructura de comunicación científica.',
    heroTitle: 'Investigación para un mundo mejor informado.',
    lede: 'Panorama Research Institute apoya la investigación interdisciplinar, los estudios sobre publicación académica, el análisis de políticas y la infraestructura mundial de comunicación científica.',
    visit: 'Visitar el Instituto de Investigación', infrastructure: 'Ver la infraestructura académica', independentOverline: 'Un programa de investigación independiente', statement: 'Evidencia, interpretación e infraestructura para una investigación que circula.',
    facts: ['Posición', 'División de investigación de Panorama Scholarly Group', 'Conexión', 'Publicación, políticas e infraestructura académica', 'Plataforma', 'Sitio web independiente de investigación'],
    areasOverline: 'En qué trabaja el instituto', areasTitle: 'Investigación con un propósito público claro.', areasIntro: 'El instituto conecta las preguntas sobre conocimiento, instituciones y vida pública con los sistemas que hacen posible la investigación.',
    areas: [{ title: 'Investigación interdisciplinar', description: 'Preguntas que cruzan las fronteras disciplinares y necesitan más de una forma de abordar el problema.' }, { title: 'Estudios sobre publicación académica', description: 'Investigación sobre revistas, sistemas editoriales y prácticas que sostienen una investigación fiable.' }, { title: 'Análisis de políticas', description: 'Evidencia e interpretación para las instituciones y decisiones que dan forma a la vida pública.' }, { title: 'Infraestructura de comunicación científica', description: 'Trabajo sobre indexación, evaluación, descubrimiento y los sistemas que permiten que la investigación circule.' }],
    principlesOverline: 'Cómo trabajamos', principlesTitle: 'Investigación independiente. Estándares compartidos.', principlesIntro: 'El instituto trabaja de forma independiente, pero conectado al compromiso del grupo con métodos claros, prácticas responsables y el cuidado del registro académico.',
    principles: [['01', 'Aclarar la pregunta', 'La buena investigación comienza con una pregunta que pueda examinarse, cuestionarse y comprenderse.'], ['02', 'Mostrar el razonamiento', 'Los métodos, la evidencia y los límites deben ser visibles para que otros puedan evaluar y ampliar el trabajo.'], ['03', 'Mantener la utilidad', 'La investigación debe seguir conectada con las personas, instituciones y preguntas públicas a las que pretende servir.']],
    closingOverline: 'Continuar a través del grupo', closingTitle: 'Seguir el trabajo allí donde conduce.', closingBody: 'Visite la plataforma independiente de investigación para consultar programas y publicaciones actuales, o explore la infraestructura que sostiene el registro académico.', exploreInfrastructure: 'Explorar la infraestructura académica',
  },
  ru: {
    title: 'Исследовательский институт', metaDescription: 'Panorama Research Institute поддерживает междисциплинарные исследования, изучение научного издательского дела, анализ политики и инфраструктуру научной коммуникации.',
    heroTitle: 'Исследования для мира, который лучше понимает.',
    lede: 'Panorama Research Institute поддерживает междисциплинарные исследования, изучение научного издательского дела, анализ политики и глобальную инфраструктуру научной коммуникации.',
    visit: 'Перейти в исследовательский институт', infrastructure: 'Посмотреть научную инфраструктуру', independentOverline: 'Независимая исследовательская программа', statement: 'Доказательства, интерпретация и инфраструктура для науки, которая распространяется.',
    facts: ['Позиция', 'Исследовательское подразделение Panorama Scholarly Group', 'Связь', 'Издательское дело, политика и научная инфраструктура', 'Платформа', 'Независимый исследовательский сайт'],
    areasOverline: 'Направления работы института', areasTitle: 'Исследования с ясной общественной целью.', areasIntro: 'Институт связывает вопросы знания, институтов и общественной жизни с системами, делающими исследования возможными.',
    areas: [{ title: 'Междисциплинарные исследования', description: 'Вопросы, выходящие за пределы дисциплин и требующие нескольких способов увидеть проблему.' }, { title: 'Исследования научного издательского дела', description: 'Изучение журналов, редакционных систем и практик, поддерживающих достоверную науку.' }, { title: 'Анализ политики', description: 'Доказательства и интерпретации для институтов и решений, формирующих общественную жизнь.' }, { title: 'Инфраструктура научной коммуникации', description: 'Работа с индексацией, оценкой, обнаружением и системами, помогающими исследованиям распространяться.' }],
    principlesOverline: 'Как мы работаем', principlesTitle: 'Независимый поиск. Общие стандарты.', principlesIntro: 'Институт действует независимо, сохраняя связь с обязательствами группы в отношении ясных методов, ответственной практики и сохранения научной записи.',
    principles: [['01', 'Чётко сформулировать вопрос', 'Хорошее исследование начинается с вопроса, который можно изучить, оспорить и понять.'], ['02', 'Показать ход рассуждений', 'Методы, доказательства и ограничения должны быть видимы, чтобы другие могли оценить и развить работу.'], ['03', 'Сохранять полезность', 'Исследования должны оставаться связанными с людьми, институтами и общественными вопросами, которым они призваны служить.']],
    closingOverline: 'Продолжить путь в группе', closingTitle: 'Следовать за исследованием туда, куда оно ведёт.', closingBody: 'Посетите независимую исследовательскую платформу, чтобы узнать о текущих программах и публикациях, или изучите инфраструктуру, поддерживающую научную запись.', exploreInfrastructure: 'Изучить научную инфраструктуру',
  },
  ar: {
    title: 'معهد البحوث', metaDescription: 'يدعم Panorama Research Institute البحوث متعددة التخصصات ودراسات النشر العلمي وتحليل السياسات وبنية التواصل العلمي.',
    heroTitle: 'بحوث لعالم أكثر وعيًا.',
    lede: 'يدعم Panorama Research Institute البحوث متعددة التخصصات، ودراسات النشر العلمي، وتحليل السياسات، والبنية التحتية العالمية للتواصل العلمي.',
    visit: 'زيارة معهد البحوث', infrastructure: 'عرض البنية التحتية العلمية', independentOverline: 'برنامج بحثي مستقل', statement: 'أدلة وتفسير وبنية تحتية لبحث ينتقل بين المجتمعات.',
    facts: ['الموقع', 'قسم البحوث في Panorama Scholarly Group', 'الارتباط', 'النشر والسياسات والبنية التحتية العلمية', 'المنصة', 'موقع بحثي مستقل'],
    areasOverline: 'مجالات عمل المعهد', areasTitle: 'بحث ذو غاية عامة واضحة.', areasIntro: 'يربط المعهد الأسئلة المتعلقة بالمعرفة والمؤسسات والحياة العامة بالأنظمة التي تجعل البحث ممكنًا.',
    areas: [{ title: 'البحث متعدد التخصصات', description: 'أسئلة تتجاوز حدود التخصصات وتحتاج إلى أكثر من طريقة للنظر في المشكلة.' }, { title: 'دراسات النشر العلمي', description: 'بحث في الدوريات والأنظمة التحريرية والممارسات التي تدعم المعرفة الموثوقة.' }, { title: 'تحليل السياسات', description: 'أدلة وتفسيرات للمؤسسات والقرارات التي تشكل الحياة العامة.' }, { title: 'بنية التواصل العلمي', description: 'عمل على الفهرسة والتقييم والاكتشاف والأنظمة التي تساعد البحث على الانتقال.' }],
    principlesOverline: 'كيف نعمل', principlesTitle: 'استقصاء مستقل؛ معايير مشتركة.', principlesIntro: 'يعمل المعهد باستقلالية مع بقائه مرتبطًا بالتزام المجموعة بالمنهج الواضح والممارسة المسؤولة والعناية بالسجل العلمي.',
    principles: [['01', 'توضيح السؤال', 'يبدأ البحث الجيد بسؤال يمكن فحصه ومناقشته وفهمه.'], ['02', 'إظهار مسار التفكير', 'ينبغي أن تكون المناهج والأدلة والحدود واضحة بما يكفي كي يقيّم الآخرون العمل ويطوّروه.'], ['03', 'الحفاظ على الفائدة', 'ينبغي أن يظل البحث مرتبطًا بالناس والمؤسسات والأسئلة العامة التي صُمّم لخدمتها.']],
    closingOverline: 'متابعة العمل عبر المجموعة', closingTitle: 'اتبع البحث حيث يقودك.', closingBody: 'زر منصة البحث المستقلة للاطلاع على البرامج والمنشورات الحالية، أو استكشف البنية التحتية التي تدعم السجل العلمي.', exploreInfrastructure: 'استكشاف البنية التحتية العلمية',
  },
};

export function getResearchCopy(locale = 'en'): ResearchPageCopy {
  return research[locale as LocaleCode] ?? research.en;
}
