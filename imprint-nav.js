/* ═══════════════════════════════════════════════════════════════
   IMPRINT NAVIGATION SYSTEM — shared engine + data
   One implementation of every interactive behavior (mega menus,
   submit-journal modal, search overlay, mobile drawer, sticky
   compaction) driven by IMPRINT_CONFIG, keyed by the current
   page's <body data-imprint="...">. Five brands, one engine.

   Real data only: every journal/submission/editorial URL below is
   copied verbatim from that imprint's own existing #featured-journals
   / #editorial-contacts sections (not re-derived, not guessed).
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var J = 'https://journals.panorama-sg.com/index.php/';

  // ---- per-imprint journal data --------------------------------------
  var IMPRINT_CONFIG = {
    ridgeline: {
      name: 'Ridgeline',
      scope: 'Technology · Engineering · AI',
      authorsLede: "Ridgeline publishes applied technology, engineering and AI research under Panorama Scholarly Group's shared editorial and open-access framework.",
      authors: [
        { head: 'Prepare Your Research', items: [
          { label: 'Article Types', desc: 'Research, review, perspective', href: '#for-authors' },
          { label: 'Manuscript Preparation', desc: 'References, figures, tables', href: '#for-authors' },
          { label: 'Before You Submit', desc: 'Ethics & OA requirements', href: '#for-authors' }
        ] },
        { head: 'Submission & Review', items: [
          { label: 'Submission Process', desc: 'Journal editorial portal', href: '#submissions' },
          { label: 'Peer Review', desc: 'Editorial assessment', href: '#for-authors' },
          { label: 'Revision & Resubmission', desc: 'Reviewer response', href: '#for-authors' }
        ] },
        { head: 'Publication', items: [
          { label: 'Open Access', desc: 'CC BY licensing', href: '#for-authors' },
          { label: 'Publication Fees & Waivers', desc: 'Journal-specific', href: '#for-authors' },
          { label: 'After Acceptance', desc: 'DOI & production', href: '#for-authors' }
        ] }
      ],
      editorialLede: "Each Ridgeline journal is guided by its own editorial board of practicing engineers and computer scientists, working to the group's shared standards for peer review and editorial independence.",
      policiesLede: "Ridgeline follows Panorama Scholarly Group's publication ethics and open-access framework, applied to the specific disclosure needs of technology, engineering and AI-related research.",
      policies: [
        { head: 'Research Integrity', items: [
          { label: 'Publication Ethics', desc: 'Authorship & originality', href: '#policies' },
          { label: 'AI Use & Disclosure', desc: 'Where applicable', href: '#policies' },
          { label: 'Competing Interests', desc: 'Disclosure requirements', href: '#policies' }
        ] },
        { head: 'Editorial Process', items: [
          { label: 'Peer Review Policy', desc: 'Review & confidentiality', href: '#policies' },
          { label: 'Corrections & Retractions', desc: 'Post-publication record', href: '#policies' }
        ] },
        { head: 'Access & Preservation', items: [
          { label: 'Open Access & Licensing', desc: 'Rights & reuse', href: '#policies' },
          { label: 'Digital Preservation', desc: 'CLOCKSS & PKP', href: '#policies' }
        ] }
      ],
      layout: 'rows',
      journals: [
        { title: 'Panorama Frontier Review', tag: 'Multidisciplinary', issn: 'ISSN Pending', view: J + 'PFR', submit: J + 'PFR/submission' },
        { title: 'AI & Future Society', tag: 'AI Ethics & Governance', issn: 'ISSN 3053-4011', view: J + 'AFS', submit: J + 'AFS/submission' },
        { title: 'Journal of Engineering Systems & Applications', tag: 'Engineering Systems', issn: 'ISSN 3053-478X', view: J + 'JESA', submit: J + 'JESA/submission' }
      ]
    },
    'health-nexus': {
      name: 'Health Nexus',
      scope: 'Medicine · Health Sciences',
      authorsLede: "Health Nexus publishes clinical, translational and digital-health research under Panorama Scholarly Group's shared editorial and open-access framework, with particular attention to the ethical requirements of health-related research.",
      authors: [
        { head: 'Prepare', items: [
          { label: 'Article Types', desc: 'Research, review, case report', href: '#for-authors' },
          { label: 'Manuscript Preparation', desc: 'References, figures, tables', href: '#for-authors' },
          { label: 'Reporting Guidance', desc: 'Discipline-specific, where applicable', href: '#for-authors' }
        ] },
        { head: 'Ethics & Responsible Research', items: [
          { label: 'Research Ethics', desc: 'Biomedical & health research', href: '#for-authors' },
          { label: 'Human Participant Research', desc: 'Ethics approval, where applicable', href: '#for-authors' },
          { label: 'Consent & Data Transparency', desc: 'Declarations at submission', href: '#for-authors' }
        ] },
        { head: 'Submission, Review & Publication', items: [
          { label: 'Submission Process', desc: 'Journal editorial portal', href: '#submissions' },
          { label: 'Peer Review', desc: 'Editorial assessment', href: '#for-authors' },
          { label: 'Open Access', desc: 'CC BY licensing', href: '#for-authors' },
          { label: 'Publication Fees & Waivers', desc: 'Journal-specific', href: '#for-authors' }
        ] }
      ],
      editorialLede: "Health Nexus launched in 2025 and is still building out its editorial boards; registered clinicians and biomedical researchers make up the primary reviewer pool across its titles today.",
      policiesLede: "Health Nexus follows Panorama Scholarly Group's publication ethics and open-access framework, applied to the specific integrity requirements of biomedical and health research.",
      policies: [
        { head: 'Research Ethics', items: [
          { label: 'Biomedical Research Ethics', desc: 'Responsible research', href: '#policies' },
          { label: 'Human Participants & Consent', desc: 'Where applicable', href: '#policies' },
          { label: 'Authorship & Competing Interests', desc: 'Disclosure requirements', href: '#policies' }
        ] },
        { head: 'Publication Integrity', items: [
          { label: 'Publication Ethics', desc: 'Originality & citation', href: '#policies' },
          { label: 'Data & Research Transparency', desc: 'Confidentiality & data use', href: '#policies' },
          { label: 'Corrections & Retractions', desc: 'Post-publication record', href: '#policies' }
        ] },
        { head: 'Access', items: [
          { label: 'Open Access & Licensing', desc: 'Rights & reuse', href: '#policies' },
          { label: 'Digital Preservation', desc: 'CLOCKSS & PKP', href: '#policies' }
        ] }
      ],
      layout: 'rows',
      journals: [
        { title: 'Health Nexus', tag: 'Interdisciplinary Medicine', issn: 'ISSN 3053-7037', view: J + 'HealthNexus', submit: J + 'HealthNexus/submission' },
        { title: 'Health Nexus: Digital Health and Medical AI', tag: 'Digital Health & Medical AI', issn: 'ISSN Pending', view: J + 'HNDH', submit: J + 'HNDH/submission' },
        { title: 'Health Nexus: Cancer Biology and Therapeutics', tag: 'Cancer Biology · Therapeutics', issn: 'ISSN Pending', badge: 'New', view: J + 'HNCBT', submit: J + 'HNCBT/submission' }
      ]
    },
    'verdant-science': {
      name: 'Verdant Science',
      scope: 'Environment · Sustainability · Life Sciences',
      authorsLede: "Verdant Science publishes environmental, sustainability and life-science research under Panorama Scholarly Group's shared editorial and open-access framework, with particular attention to field-research and data-transparency expectations.",
      authors: [
        { head: 'Prepare', items: [
          { label: 'Article Types', desc: 'Research, review, field study', href: '#for-authors' },
          { label: 'Manuscript Preparation', desc: 'References, figures, tables', href: '#for-authors' },
          { label: 'Data Availability', desc: 'Declaration at submission', href: '#for-authors' }
        ] },
        { head: 'Research Reporting', items: [
          { label: 'Field & Environmental Research', desc: 'Site & sampling detail', href: '#for-authors' },
          { label: 'Research Transparency', desc: 'Methods & reproducibility', href: '#for-authors' }
        ] },
        { head: 'Submission, Review & Publication', items: [
          { label: 'Submission Process', desc: 'Journal editorial portal', href: '#submissions' },
          { label: 'Peer Review', desc: 'Editorial assessment', href: '#for-authors' },
          { label: 'Open Access', desc: 'CC BY licensing', href: '#for-authors' },
          { label: 'Publication Fees & Waivers', desc: 'Journal-specific', href: '#for-authors' }
        ] }
      ],
      editorialLede: "Verdant Science journals are reviewed on a rolling basis by subject-area editors, with shared imprint-level oversight for open-access licensing and data availability.",
      policiesLede: "Verdant Science follows Panorama Scholarly Group's publication ethics and open-access framework, applied to the specific reproducibility and data-transparency needs of environmental and life-science research.",
      policies: [
        { head: 'Research Integrity', items: [
          { label: 'Publication Ethics', desc: 'Authorship & originality', href: '#policies' },
          { label: 'Environmental & Field Research', desc: 'Reporting expectations', href: '#policies' },
          { label: 'Data Availability & Reproducibility', desc: 'Where applicable', href: '#policies' }
        ] },
        { head: 'Editorial Process', items: [
          { label: 'Authorship & Competing Interests', desc: 'Disclosure requirements', href: '#policies' },
          { label: 'Peer Review Policy', desc: 'Review & confidentiality', href: '#policies' },
          { label: 'Corrections & Retractions', desc: 'Post-publication record', href: '#policies' }
        ] },
        { head: 'Access & Preservation', items: [
          { label: 'Open Access & Licensing', desc: 'Rights & reuse', href: '#policies' },
          { label: 'Digital Preservation', desc: 'CLOCKSS & PKP', href: '#policies' }
        ] }
      ],
      layout: 'grid',
      journals: [
        { title: 'Climate Sustainability & Global Systems', tag: 'Climate & Sustainability', issn: 'ISSN 3054-9663', view: J + 'CSGS', submit: J + 'CSGS/submission' },
        { title: 'Rural Governance & Green Development', tag: 'Rural & Green Development', issn: 'ISSN 3053-7282', view: J + 'RGGD', submit: J + 'RGGD/submission' },
        { title: 'Food Systems, Safety & Sustainability', tag: 'Food Systems', issn: 'ISSN Pending', view: J + 'FSSS', submit: J + 'FSSS/submission' },
        { title: 'Journal of Sport and Exercise Studies', tag: 'Sport & Exercise', issn: 'ISSN Pending', view: J + 'SES', submit: J + 'SES/submission' }
      ]
    },
    charter: {
      name: 'Charter',
      scope: 'Policy · Law · Governance',
      authorsLede: "Charter publishes scholarship on governance, law, policy, education and the social sciences under Panorama Scholarly Group's shared editorial and open-access framework, with particular attention to research-methods transparency and citation practice.",
      authors: [
        { head: 'Prepare', items: [
          { label: 'Article Types', desc: 'Research, review, theoretical', href: '#for-authors' },
          { label: 'Manuscript Preparation', desc: 'References, figures, tables', href: '#for-authors' },
          { label: 'Citation & References', desc: 'Journal-specified style', href: '#for-authors' }
        ] },
        { head: 'Research Standards', items: [
          { label: 'Research Methods & Data', desc: 'Transparency at submission', href: '#for-authors' },
          { label: 'Research Ethics', desc: 'Where applicable to study design', href: '#for-authors' }
        ] },
        { head: 'Submission, Review & Publication', items: [
          { label: 'Submission Process', desc: 'Journal editorial portal', href: '#submissions' },
          { label: 'Peer Review', desc: 'Editorial assessment', href: '#for-authors' },
          { label: 'Open Access', desc: 'CC BY licensing', href: '#for-authors' },
          { label: 'Publication Fees & Waivers', desc: 'Journal-specific', href: '#for-authors' }
        ] }
      ],
      editorialLede: "Each Charter journal is guided by its own editorial board, with shared attention across the imprint to editorial independence in scholarship that examines governance, policy and public institutions.",
      policiesLede: "Charter follows Panorama Scholarly Group's publication ethics and open-access framework, applied to the editorial-independence expectations of scholarship examining governance, law and public institutions.",
      policies: [
        { head: 'Editorial Governance', items: [
          { label: 'Editorial Independence', desc: 'Decision-making principles', href: '#policies' },
          { label: 'Peer Review Policy', desc: 'Review & confidentiality', href: '#policies' }
        ] },
        { head: 'Research Integrity', items: [
          { label: 'Publication Ethics', desc: 'Authorship & originality', href: '#policies' },
          { label: 'Data Transparency', desc: 'Where applicable', href: '#policies' },
          { label: 'Competing Interests', desc: 'Disclosure requirements', href: '#policies' }
        ] },
        { head: 'Scholarly Record', items: [
          { label: 'Corrections & Retractions', desc: 'Post-publication record', href: '#policies' },
          { label: 'Complaints & Appeals', desc: 'Editorial handling', href: '#policies' },
          { label: 'Open Access & Licensing', desc: 'Rights & reuse', href: '#policies' },
          { label: 'Digital Preservation', desc: 'CLOCKSS & PKP', href: '#policies' }
        ] }
      ],
      layout: 'grouped',
      groupOrder: ['governance', 'law', 'data', 'education'],
      groupLabels: { governance: 'Governance & Political Economy', law: 'Law & Society', data: 'Data & Social Science', education: 'Education & Political Thought' },
      filters: [
        { key: 'all', label: 'All' },
        { key: 'governance', label: 'Governance' },
        { key: 'law', label: 'Law & Society' },
        { key: 'data', label: 'Data' },
        { key: 'education', label: 'Education & Thought' }
      ],
      journals: [
        { title: 'PoliEcoM Administration Review', tag: 'Political Economy', issn: 'ISSN 3053-3597', group: 'governance', view: J + 'PEMR', submit: J + 'PEMR/submission' },
        { title: 'Computational Social Sciences Review', tag: 'Computational Social Science', issn: 'ISSN Pending', group: 'data', view: J + 'cssr', submit: J + 'cssr/submission' },
        { title: 'Journal of Law, Psychology, and Communication Studies', tag: 'Law & Communication', issn: 'ISSN 3052-9654', group: 'law', view: J + 'JLPCS', submit: J + 'JLPCS/submission' },
        { title: 'International Review of Education & Learning', tag: 'Education Policy', issn: 'ISSN Pending', group: 'education', view: J + 'IRELS', submit: J + 'IRELS/submission' },
        { title: 'Journal of Social Cognition and Communication', tag: 'Social Cognition', issn: 'ISSN 3054-6958', group: 'law', view: J + 'JSCC', submit: J + 'JSCC/submission' },
        { title: 'Contemporary Review of Political Thought', tag: 'Political Thought', issn: 'ISSN 3056-0977', group: 'education', view: J + 'CRoPT', submit: J + 'CRoPT/submission' },
        { title: 'Journal of Public Oversight and Institutional Integrity', tag: 'Institutional Integrity', issn: 'ISSN Pending', badge: 'New', group: 'governance', view: J + 'JPOII', submit: J + 'JPOII/submission' },
        { title: 'Global Governance Systems Review', tag: 'Global Governance', issn: 'ISSN Pending', badge: 'New', group: 'governance', view: J + 'GGSR', submit: J + 'GGSR/submission' }
      ]
    },
    threnody: {
      name: 'Threnody',
      scope: 'Humanities · Arts · Philosophy',
      authorsLede: "Threnody publishes philosophy, religious studies, humanities and arts scholarship under Panorama Scholarly Group's shared editorial and open-access framework, with particular attention to sources, translations and permissions.",
      authors: [
        { head: 'Prepare', items: [
          { label: 'Article Types', desc: 'Research, essay, interpretive', href: '#for-authors' },
          { label: 'Manuscript Preparation', desc: 'References, citation style', href: '#for-authors' },
          { label: 'Primary Sources & Translations', desc: 'Attribution & permissions', href: '#for-authors' }
        ] },
        { head: 'Images, Archives & Permissions', items: [
          { label: 'Images & Permissions', desc: 'Third-party content', href: '#for-authors' },
          { label: 'Archival Materials', desc: 'Citation & provenance', href: '#for-authors' }
        ] },
        { head: 'Submission, Review & Publication', items: [
          { label: 'Submission Process', desc: 'Journal editorial portal', href: '#submissions' },
          { label: 'Peer Review', desc: 'Editorial assessment', href: '#for-authors' },
          { label: 'Open Access', desc: 'CC BY licensing', href: '#for-authors' },
          { label: 'Publication Fees & Waivers', desc: 'Journal-specific', href: '#for-authors' }
        ] }
      ],
      editorialLede: "Each Threnody journal is guided by its own editorial board, working to the group's shared standards for peer review and editorial independence, at a pace suited to interpretive scholarship.",
      policiesLede: "Threnody follows Panorama Scholarly Group's publication ethics and open-access framework, applied to the sourcing, translation and attribution needs of humanities and arts scholarship.",
      policies: [
        { head: 'Originality & Attribution', items: [
          { label: 'Publication Ethics', desc: 'Authorship & originality', href: '#policies' },
          { label: 'Sources, Translations & Permissions', desc: 'Attribution requirements', href: '#policies' },
          { label: 'Archival Materials', desc: 'Citation & provenance', href: '#policies' }
        ] },
        { head: 'Editorial Process', items: [
          { label: 'Competing Interests', desc: 'Disclosure requirements', href: '#policies' },
          { label: 'Peer Review Policy', desc: 'Review & confidentiality', href: '#policies' },
          { label: 'Corrections & Retractions', desc: 'Post-publication record', href: '#policies' }
        ] },
        { head: 'Access & Preservation', items: [
          { label: 'Open Access & Licensing', desc: 'Rights & reuse', href: '#policies' },
          { label: 'Digital Preservation', desc: 'CLOCKSS & PKP', href: '#policies' }
        ] }
      ],
      layout: 'index',
      groupOrder: ['philosophy', 'religion', 'humanities', 'music'],
      groupLabels: { philosophy: 'Philosophy', religion: 'Religion & Traditions', humanities: 'Humanities & Arts', music: 'Music & Performance' },
      journals: [
        { title: 'Silence', tag: 'Philosophy', issn: 'ISSN 3054-4386', group: 'philosophy', view: J + 'Silence', submit: J + 'Silence/submission' },
        { title: 'Global Review of Humanities, Arts, & Society', tag: 'Humanities & Arts', issn: 'ISSN 3052-539X', group: 'humanities', view: J + 'files', submit: J + 'files/submission' },
        { title: 'Three Teachings Studies', tag: 'Confucianism · Daoism · Buddhism', issn: 'ISSN 3053-6553', group: 'religion', view: J + 'tts', submit: J + 'tts/submission' },
        { title: 'Resonance', tag: 'Global Music Studies', issn: 'ISSN 3053-4410', group: 'music', view: J + 'Resonance', submit: J + 'Resonance/submission' },
        { title: 'Comparative Philosophy & Religious Traditions', tag: 'Comparative Philosophy', issn: 'ISSN Pending', group: 'philosophy', view: J + 'CPRT', submit: J + 'CPRT/submission' },
        { title: 'Journal of Dance and Embodied Structure', tag: 'Dance & Movement', issn: 'ISSN Pending', group: 'music', view: J + 'JDES', submit: J + 'JDES/submission' }
      ]
    }
  };

  // ---- editorial content -----------------------------------------------
  // For Authors and Policies content is brand-specific (cfg.authors,
  // cfg.policies, both set per imprint in IMPRINT_CONFIG above) and links
  // to that imprint's own page anchors -- never to the group's generic
  // for-authors.html / publication-ethics.html as the primary destination.
  // Editorial structure (boards, standards, how to join) is genuinely the
  // same mechanism group-wide, so only its intro sentence varies by brand.
  function sharedEditorial(cfg) {
    return [
      { head: 'Editorial Leadership', items: [
        { label: 'Editorial Boards', desc: 'Directory profiles', href: 'https://profiles.panorama-sg.com/', external: true },
        { label: 'Editorial Standards', desc: 'Assessment principles', href: 'publication-ethics.html#editorial-decisions' },
        { label: 'Peer Review Standards', desc: 'Review conduct', href: 'publication-ethics.html#peer-review-conduct' }
      ] },
      { head: 'Participate', items: [
        { label: 'Join an Editorial Board', desc: 'Application form', href: 'editorial-board-application.html' },
        { label: 'Become a Reviewer', desc: 'Application form', href: 'editorial-board-application.html' }
      ] }
    ];
  }

  function sharedAbout(imprintName) {
    return [
      { label: 'About ' + imprintName, href: '#about' },
      { label: 'Panorama Scholarly Group', href: 'index.html' },
      { label: 'Contact', href: '#editorial-contacts' }
    ];
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ---- render: mega menu content --------------------------------------
  function renderJournalsRows(journals) {
    var html = '<div class="in-mega-eyebrow">Journals</div><div class="in-journal-rows">';
    journals.forEach(function (j, i) {
      html += '<div class="in-journal-row">' +
        '<span class="in-journal-num">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<div class="in-journal-main"><span class="in-journal-title">' + esc(j.title) + (j.badge ? ' <span class="in-journal-tag" style="display:inline;color:var(--brand-dk,#0F4C5C);font-weight:700;">· ' + esc(j.badge) + '</span>' : '') + '</span>' +
        '<span class="in-journal-tag">' + esc(j.tag) + '</span></div>' +
        '<span class="in-journal-issn">' + esc(j.issn) + '</span>' +
        '<a class="in-journal-link" href="' + esc(j.view) + '" target="_blank" rel="noopener">View Journal &rarr;</a>' +
        '</div>';
    });
    html += '</div>';
    return html;
  }

  function renderJournalsGrid(journals) {
    var html = '<div class="in-mega-eyebrow">Journals</div><div class="in-journal-grid">';
    journals.forEach(function (j) {
      html += '<a class="in-journal-card" href="' + esc(j.view) + '" target="_blank" rel="noopener">' +
        '<span class="in-journal-tag">' + esc(j.tag) + '</span>' +
        '<span class="in-journal-title">' + esc(j.title) + '</span>' +
        '<span class="in-journal-link">View Journal &rarr;</span></a>';
    });
    html += '</div>';
    return html;
  }

  function renderJournalsGrouped(cfg, wide) {
    var html = '<div class="in-mega-eyebrow">Journals</div><div class="in-mega-groups" style="--in-cols:2;">';
    cfg.groupOrder.forEach(function (key) {
      var items = cfg.journals.filter(function (j) { return j.group === key; });
      if (!items.length) return;
      html += '<div class="in-mega-group in-subject-group"><p class="in-mega-group-head">' + esc(cfg.groupLabels[key]) + '</p><ul>';
      items.forEach(function (j) {
        html += '<li><a href="' + esc(j.view) + '" target="_blank" rel="noopener">' + esc(j.title) + '</a></li>';
      });
      html += '</ul></div>';
    });
    html += '</div>';
    return html;
  }

  function renderJournalsIndex(cfg) {
    var html = '<div class="in-mega-eyebrow">Journals</div><div class="in-mega-groups" style="--in-cols:2;">';
    cfg.groupOrder.forEach(function (key) {
      var items = cfg.journals.filter(function (j) { return j.group === key; });
      if (!items.length) return;
      html += '<div class="in-mega-group in-index-group"><p class="in-mega-group-head">' + esc(cfg.groupLabels[key]) + '</p><ul>';
      items.forEach(function (j) {
        html += '<li><a href="' + esc(j.view) + '" target="_blank" rel="noopener">' + esc(j.title) + '</a></li>';
      });
      html += '</ul></div>';
    });
    html += '</div>';
    return html;
  }

  function renderJournalsMega(slug, cfg) {
    var body;
    if (cfg.layout === 'rows') body = renderJournalsRows(cfg.journals);
    else if (cfg.layout === 'grid') body = renderJournalsGrid(cfg.journals);
    else if (cfg.layout === 'grouped') body = renderJournalsGrouped(cfg);
    else body = renderJournalsIndex(cfg);
    return body + '<div class="in-mega-foot">' +
      '<a href="#featured-journals">Explore All ' + esc(cfg.name) + ' Journals &rarr;</a>' +
      '<button type="button" data-in-submit-open>Submit a Manuscript &rarr;</button></div>';
  }

  // Renders a grouped mega-menu panel: eyebrow, an introductory sentence
  // (the "editorial navigation experience" lede, not a bare link list),
  // then each category as its own labelled group with a short description
  // under every item -- matching the same groups shown on the imprint's
  // own page section, not a flat sitemap dump.
  function renderGroupedMega(eyebrow, lede, groups, cols) {
    var html = '<div class="in-mega-eyebrow">' + esc(eyebrow) + '</div>';
    if (lede) html += '<p class="in-mega-lede">' + esc(lede) + '</p>';
    html += '<div class="in-mega-groups" style="--in-cols:' + (cols || 3) + ';">';
    groups.forEach(function (group) {
      html += '<div class="in-mega-group"><p class="in-mega-group-head">' + esc(group.head) + '</p><ul>';
      group.items.forEach(function (it) {
        html += '<li><a href="' + esc(it.href) + '"' + (it.external ? ' target="_blank" rel="noopener"' : '') + '>' +
          '<span class="in-mega-item-label">' + esc(it.label) + '</span>' +
          (it.desc ? '<span class="in-mega-item-desc">' + esc(it.desc) + '</span>' : '') +
          '</a></li>';
      });
      html += '</ul></div>';
    });
    html += '</div>';
    return html;
  }

  function renderAuthorsMega(cfg) {
    return renderGroupedMega('For Authors', cfg.authorsLede, cfg.authors, 3) +
      '<div class="in-mega-foot"><a href="#for-authors">Prepare Your Manuscript &rarr;</a>' +
      '<button type="button" data-in-submit-open>Submit Manuscript &rarr;</button></div>';
  }

  function renderEditorialMega(cfg) {
    return renderGroupedMega('Editorial', cfg.editorialLede, sharedEditorial(cfg), 2) +
      '<div class="in-mega-foot"><a href="#editorial">Read Editorial &rarr;</a>' +
      '<a href="https://profiles.panorama-sg.com/" target="_blank" rel="noopener">View Editorial Directory &rarr;</a></div>';
  }

  function renderPoliciesMega(cfg) {
    return renderGroupedMega('Policies & Standards', cfg.policiesLede, cfg.policies, 3) +
      '<div class="in-mega-foot"><a href="#policies">Read Publishing Policies &rarr;</a></div>';
  }

  function renderAboutDropdown(imprintName) {
    var html = '';
    sharedAbout(imprintName).forEach(function (it) {
      html += '<a href="' + esc(it.href) + '">' + esc(it.label) + '</a>';
    });
    return html;
  }

  // ---- render: submit modal --------------------------------------------
  function renderModalBody(cfg) {
    var html = '';
    if (cfg.layout === 'grouped' && cfg.filters) {
      html += '<div class="in-filter-row" role="group" aria-label="Filter journals by subject">';
      cfg.filters.forEach(function (f, i) {
        html += '<button type="button" class="in-filter-chip' + (i === 0 ? ' in-active' : '') + '" data-in-filter="' + esc(f.key) + '">' + esc(f.label) + '</button>';
      });
      html += '</div>';
    }
    cfg.journals.forEach(function (j) {
      html += '<div class="in-modal-card"' + (j.group ? ' data-in-group="' + esc(j.group) + '"' : '') + '>' +
        '<div class="in-modal-card-title">' + esc(j.title) + (j.badge ? ' <span style="color:var(--brand-dk,#0F4C5C);font-weight:700;">· ' + esc(j.badge) + '</span>' : '') + '</div>' +
        '<div class="in-modal-card-tag">' + esc(j.tag) + '</div>' +
        '<div class="in-modal-card-actions">' +
        '<a href="' + esc(j.view) + '" target="_blank" rel="noopener">Explore Scope</a>' +
        '<a href="' + esc(j.submit) + '" target="_blank" rel="noopener">Submit Manuscript</a>' +
        '</div></div>';
    });
    return html;
  }

  // Flattens grouped {head, items:[{label,href,external}]} data into a
  // single link list, prefixed with each group's own sub-heading -- used
  // wherever the destination (drawer accordion body, footer column,
  // search index) doesn't need the full mega-menu grouping treatment.
  function flattenGroups(groups) {
    var out = [];
    groups.forEach(function (g) {
      g.items.forEach(function (it) { out.push(it); });
    });
    return out;
  }

  function groupedLinksHtml(groups) {
    var html = '';
    groups.forEach(function (g) {
      html += '<p class="in-drawer-group-head">' + esc(g.head) + '</p>';
      g.items.forEach(function (it) {
        html += '<a href="' + esc(it.href) + '"' + (it.external ? ' target="_blank" rel="noopener"' : '') + '>' + esc(it.label) + '</a>';
      });
    });
    return html;
  }

  // ---- render: mobile drawer --------------------------------------------
  function renderDrawer(slug, cfg) {
    function journalLinks() {
      var html = '';
      cfg.journals.forEach(function (j) {
        html += '<a href="' + esc(j.view) + '" target="_blank" rel="noopener">' + esc(j.title) + '</a>';
      });
      return html;
    }
    function accordion(id, label, innerHtml) {
      return '<div class="in-drawer-item" data-in-accordion="' + id + '">' +
        '<button class="in-drawer-row" type="button" aria-expanded="false">' + esc(label) + '<span class="in-drawer-plus">+</span></button>' +
        '<div class="in-drawer-panel">' + innerHtml + '</div></div>';
    }

    var html = '';
    html += accordion('journals', 'Journals', journalLinks() + '<a href="#featured-journals">Explore All ' + esc(cfg.name) + ' Journals &rarr;</a>');
    html += '<div class="in-drawer-item"><a class="in-drawer-row" href="#why-' + esc(slug) + '" style="text-decoration:none;">Why ' + esc(cfg.name) + '</a></div>';
    html += accordion('authors', 'For Authors', groupedLinksHtml(cfg.authors) + '<a href="#for-authors">Full Author Guide &rarr;</a>');
    html += accordion('editorial', 'Editorial', groupedLinksHtml(sharedEditorial(cfg)));
    html += accordion('policies', 'Policies', groupedLinksHtml(cfg.policies));
    html += '<div class="in-drawer-item"><a class="in-drawer-row" href="#about" style="text-decoration:none;">About</a></div>';
    html += '<div class="in-drawer-submit"><button type="button" class="in-submit-btn" data-in-submit-open>Submit Manuscript &rarr;</button></div>';
    html += '<div class="in-drawer-psg"><p class="in-drawer-psg-label">Panorama Scholarly Group</p>' +
      '<a href="index.html">Group Homepage</a>' +
      '<a href="https://books.panorama-sg.com" target="_blank" rel="noopener">Books</a>' +
      '<a href="https://research.panorama-sg.com/" target="_blank" rel="noopener">Research</a>' +
      '<a href="https://posi.panorama-sg.com/" target="_blank" rel="noopener">POSI</a>' +
      '<a href="https://profiles.panorama-sg.com/" target="_blank" rel="noopener">Editorial Directory</a></div>';
    return html;
  }

  // ---- render: footer -------------------------------------------------------
  // Reuses the exact same config (cfg.journals, sharedEditorial, the group's
  // real policy pages) the mega menu and drawer already render from -- one
  // data source, not a sixth hand-written HTML block per imprint.
  function renderFooter(slug, cfg) {
    function accordionCol(headLabel, innerHtml) {
      return '<div><details class="footer-accordion" open><summary><h3>' + esc(headLabel) + '</h3></summary>' + innerHtml + '</details></div>';
    }
    function linkList(items) {
      return '<ul>' + items.map(function (it) {
        return '<li><a href="' + esc(it.href) + '"' + (it.external ? ' target="_blank" rel="noopener"' : '') + '>' + esc(it.label) + '</a></li>';
      }).join('') + '</ul>';
    }

    var brandCol = '<div class="in-footer-brand">' +
      '<h2 style="color:var(--brand);font-family:var(--brand-font,\'Playfair Display\'),\'Playfair Display\',serif;">' + esc(cfg.name.toUpperCase()) + '</h2>' +
      '<p>' + esc(cfg.scope) + ' &mdash; a Panorama Scholarly Group imprint.</p></div>';

    var journalsCol = accordionCol('Journals', linkList(cfg.journals.map(function (j) {
      return { label: j.title, href: j.view, external: true };
    })));

    var publishCol = accordionCol('Publish',
      '<ul><li><a href="#for-authors">Author Guidelines</a></li>' +
      '<li><a href="#featured-journals" data-in-submit-open>Submit a Manuscript</a></li>' +
      '<li><a href="editorial-board-application.html">Join Editorial Board</a></li></ul>');

    var editorialCol = accordionCol('Editorial', linkList(flattenGroups(sharedEditorial(cfg))));

    var policiesCol = accordionCol('Policies', linkList(flattenGroups(cfg.policies)));

    var groupLinks = '<div class="container in-footer-group">' +
      '<span class="in-footer-group-label">Panorama Scholarly Group</span>' +
      '<a href="index.html">Group Homepage</a>' +
      '<a href="index.html#imprints">Journals</a>' +
      '<a href="https://books.panorama-sg.com" target="_blank" rel="noopener">Books</a>' +
      '<a href="https://research.panorama-sg.com/" target="_blank" rel="noopener">Research</a>' +
      '<a href="https://posi.panorama-sg.com/" target="_blank" rel="noopener">POSI</a></div>';

    return '<div class="container footer-grid footer-grid--5col">' + brandCol + journalsCol + publishCol + editorialCol + policiesCol + '</div>' +
      groupLinks +
      '<div class="container footer-bottom">' +
      '<span>&copy;2025&ndash;2026 Panorama Scholarly Group Ltd. All rights reserved.</span>' +
      '<span>' + esc(cfg.name) + ', a Panorama Scholarly Group imprint</span></div>';
  }

  // ---- search index -------------------------------------------------------
  function buildSearchIndex(cfg) {
    var idx = [];
    cfg.journals.forEach(function (j) {
      idx.push({ group: 'Journals', title: j.title, desc: j.tag, href: j.view, external: true });
    });
    cfg.authors.forEach(function (g) {
      g.items.forEach(function (it) {
        idx.push({ group: 'For Authors', title: it.label, desc: it.desc || g.head, href: it.href });
      });
    });
    flattenGroups(sharedEditorial(cfg)).forEach(function (it) {
      idx.push({ group: 'Editorial', title: it.label, desc: it.desc || 'Editorial', href: it.href, external: it.external });
    });
    cfg.policies.forEach(function (g) {
      g.items.forEach(function (it) {
        idx.push({ group: 'Policies', title: it.label, desc: it.desc || g.head, href: it.href });
      });
    });
    idx.push({ group: 'About', title: 'Why ' + cfg.name, desc: 'Publishing commitments', href: '#why-' + cfg.slug });
    idx.push({ group: 'About', title: 'About ' + cfg.name, desc: 'About this imprint', href: '#about' });
    idx.push({ group: 'About', title: 'Contact', desc: 'Reach the publisher', href: '#editorial-contacts' });
    return idx;
  }

  // ---- boot -----------------------------------------------------------------
  function init() {
    var slug = document.body.getAttribute('data-imprint');
    var cfg = IMPRINT_CONFIG[slug];
    if (!cfg) return;
    cfg.slug = slug;

    // Fill static content targets
    document.querySelectorAll('[data-in-fill]').forEach(function (el) {
      var kind = el.getAttribute('data-in-fill');
      if (kind === 'journals') el.innerHTML = renderJournalsMega(slug, cfg);
      else if (kind === 'authors') el.innerHTML = renderAuthorsMega(cfg);
      else if (kind === 'editorial') el.innerHTML = renderEditorialMega(cfg);
      else if (kind === 'policies') el.innerHTML = renderPoliciesMega(cfg);
      else if (kind === 'about') el.innerHTML = renderAboutDropdown(cfg.name);
    });

    var modalBody = document.querySelector('[data-in-modal-body]');
    if (modalBody) modalBody.innerHTML = renderModalBody(cfg);

    var drawerBody = document.querySelector('[data-in-drawer-body]');
    if (drawerBody) drawerBody.innerHTML = renderDrawer(slug, cfg);

    var footerTarget = document.querySelector('[data-in-footer]');
    if (footerTarget) footerTarget.innerHTML = renderFooter(slug, cfg);

    initMegaMenus();
    initModal(cfg);
    initSearch(cfg);
    initDrawer();
    initStickyCompaction();
    initFilterChips();
  }

  // ---- mega menus / dropdowns: hover-intent + click + keyboard --------------
  function initMegaMenus() {
    var items = Array.prototype.slice.call(document.querySelectorAll('.in-nav-item[data-in-menu]'));
    var openTimer = null, closeTimer = null;

    function closeAll(except) {
      items.forEach(function (it) {
        if (it === except) return;
        it.classList.remove('in-open');
        var btn = it.querySelector('.in-nav-trigger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
    function open(item) {
      closeAll(item);
      item.classList.add('in-open');
      var btn = item.querySelector('.in-nav-trigger');
      if (btn) btn.setAttribute('aria-expanded', 'true');
      // Edge detection: a panel anchored left:0 on a trigger near the right
      // edge of the header can overflow the viewport (e.g. Policies' 3-col
      // menu). Shift it left by exactly the overflow amount, clamped so it
      // never overflows the left edge either.
      var panel = item.querySelector('.in-mega, .in-dropdown');
      if (panel) {
        panel.style.left = '0'; panel.style.right = 'auto';
        var margin = 16;
        var itemRect = item.getBoundingClientRect();
        var panelRect = panel.getBoundingClientRect();
        var overflowRight = panelRect.right - (window.innerWidth - margin);
        if (overflowRight > 0) {
          var shift = -overflowRight;
          var minShift = margin - itemRect.left;
          if (shift < minShift) shift = minShift;
          panel.style.left = shift + 'px';
        }
      }
    }
    function close(item) {
      item.classList.remove('in-open');
      var btn = item.querySelector('.in-nav-trigger');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }

    items.forEach(function (item) {
      var btn = item.querySelector('.in-nav-trigger');
      if (!btn) return;

      item.addEventListener('mouseenter', function () {
        clearTimeout(closeTimer);
        openTimer = setTimeout(function () { open(item); }, 90);
      });
      item.addEventListener('mouseleave', function () {
        clearTimeout(openTimer);
        closeTimer = setTimeout(function () { close(item); }, 160);
      });
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('in-open');
        if (isOpen) close(item); else open(item);
      });
      btn.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { close(item); btn.focus(); }
        if (e.key === 'ArrowDown' && item.classList.contains('in-open')) {
          e.preventDefault();
          var firstLink = item.querySelector('.in-mega a, .in-dropdown a');
          if (firstLink) firstLink.focus();
        }
      });
    });

    document.addEventListener('click', function (e) {
      items.forEach(function (item) {
        if (!item.contains(e.target)) close(item);
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
    });
    document.addEventListener('focusin', function (e) {
      items.forEach(function (item) {
        if (!item.contains(e.target)) close(item);
      });
    });
  }

  // ---- filter chips (Charter submit modal) -----------------------------------
  function initFilterChips() {
    document.addEventListener('click', function (e) {
      var chip = e.target.closest ? e.target.closest('[data-in-filter]') : null;
      if (!chip) return;
      var row = chip.closest('.in-filter-row');
      row.querySelectorAll('.in-filter-chip').forEach(function (c) { c.classList.remove('in-active'); });
      chip.classList.add('in-active');
      var key = chip.getAttribute('data-in-filter');
      var body = row.parentElement;
      body.querySelectorAll('.in-modal-card').forEach(function (card) {
        var group = card.getAttribute('data-in-group');
        card.style.display = (key === 'all' || group === key) ? '' : 'none';
      });
    });
  }

  // ---- modal: focus trap, ESC, backdrop --------------------------------------
  function initModal() {
    var backdrop = document.querySelector('[data-in-modal-backdrop]');
    var modal = document.querySelector('[data-in-modal]');
    if (!backdrop || !modal) return;
    var lastFocus = null;

    function openModal() {
      lastFocus = document.activeElement;
      backdrop.classList.add('in-open');
      modal.classList.add('in-open');
      document.body.classList.add('in-scroll-lock');
      var closeBtn = modal.querySelector('[data-in-modal-close]');
      if (closeBtn) closeBtn.focus();
    }
    function closeModal() {
      backdrop.classList.remove('in-open');
      modal.classList.remove('in-open');
      document.body.classList.remove('in-scroll-lock');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    document.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('[data-in-submit-open]')) {
        e.preventDefault();
        openModal();
      }
    });
    backdrop.addEventListener('click', closeModal);
    modal.querySelectorAll('[data-in-modal-close]').forEach(function (b) { b.addEventListener('click', closeModal); });
    modal.querySelectorAll('[data-in-modal-close-link]').forEach(function (a) { a.addEventListener('click', closeModal); });

    modal.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeModal(); return; }
      if (e.key === 'Tab') {
        var focusables = modal.querySelectorAll('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])');
        if (!focusables.length) return;
        var first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('in-open')) closeModal();
    });
  }

  // ---- search overlay ----------------------------------------------------------
  function initSearch(cfg) {
    var openBtn = document.querySelector('[data-in-search-open]');
    var backdrop = document.querySelector('[data-in-search-backdrop]');
    var panel = document.querySelector('[data-in-search]');
    if (!openBtn || !backdrop || !panel) return;
    var input = panel.querySelector('[data-in-search-input]');
    var results = panel.querySelector('[data-in-search-results]');
    var index = buildSearchIndex(cfg);
    var lastFocus = null;

    function renderResults(list) {
      if (!list.length) { results.innerHTML = '<p class="in-search-empty">No matches. Try a journal name or topic.</p>'; return; }
      var groups = {};
      list.forEach(function (r) { (groups[r.group] = groups[r.group] || []).push(r); });
      var html = '';
      Object.keys(groups).forEach(function (g) {
        html += '<p class="in-search-group-label">' + esc(g) + '</p>';
        groups[g].forEach(function (r) {
          html += '<a class="in-search-result" href="' + esc(r.href) + '"' + (r.external ? ' target="_blank" rel="noopener"' : '') + '>' +
            '<span class="in-search-result-title">' + esc(r.title) + '</span>' +
            '<span class="in-search-result-desc">' + esc(r.desc) + '</span></a>';
        });
      });
      results.innerHTML = html;
    }

    function openSearch() {
      lastFocus = document.activeElement;
      backdrop.classList.add('in-open');
      panel.classList.add('in-open');
      document.body.classList.add('in-scroll-lock');
      renderResults(index);
      input.value = '';
      setTimeout(function () { input.focus(); }, 30);
    }
    function closeSearch() {
      backdrop.classList.remove('in-open');
      panel.classList.remove('in-open');
      document.body.classList.remove('in-scroll-lock');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    openBtn.addEventListener('click', openSearch);
    backdrop.addEventListener('click', closeSearch);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('in-open')) closeSearch();
    });
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      if (!q) { renderResults(index); return; }
      renderResults(index.filter(function (r) {
        return (r.title + ' ' + r.desc).toLowerCase().indexOf(q) !== -1;
      }));
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var first = results.querySelector('.in-search-result');
        if (first) first.click();
      }
    });
  }

  // ---- mobile drawer -------------------------------------------------------------
  function initDrawer() {
    var openBtn = document.querySelector('[data-in-drawer-open]');
    var closeBtn = document.querySelector('[data-in-drawer-close]');
    var backdrop = document.querySelector('[data-in-drawer-backdrop]');
    var drawer = document.querySelector('[data-in-drawer]');
    if (!openBtn || !drawer) return;

    function openDrawer() {
      drawer.classList.add('in-open');
      backdrop.classList.add('in-open');
      document.body.classList.add('in-scroll-lock');
      openBtn.setAttribute('aria-expanded', 'true');
      if (closeBtn) closeBtn.focus();
    }
    function closeDrawer() {
      drawer.classList.remove('in-open');
      backdrop.classList.remove('in-open');
      document.body.classList.remove('in-scroll-lock');
      openBtn.setAttribute('aria-expanded', 'false');
      openBtn.focus();
    }

    openBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('in-open')) closeDrawer();
    });
    drawer.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('a[href]') : null;
      if (link) closeDrawer();
    });

    drawer.addEventListener('click', function (e) {
      var row = e.target.closest ? e.target.closest('.in-drawer-item > .in-drawer-row') : null;
      if (!row) return;
      var item = row.parentElement;
      var isOpen = item.classList.contains('in-open');
      item.parentElement.querySelectorAll('.in-drawer-item.in-open').forEach(function (o) {
        if (o !== item) { o.classList.remove('in-open'); var b = o.querySelector('.in-drawer-row'); if (b) b.setAttribute('aria-expanded', 'false'); }
      });
      item.classList.toggle('in-open', !isOpen);
      row.setAttribute('aria-expanded', String(!isOpen));
    });
  }

  // ---- sticky utility-bar compaction on scroll ------------------------------------
  function initStickyCompaction() {
    var utility = document.querySelector('[data-in-utility]');
    if (!utility) return;
    var ticking = false;
    var threshold = 48;
    function update() {
      var compact = window.scrollY > threshold;
      utility.classList.toggle('in-collapsed', compact);
      document.body.classList.toggle('in-compact', compact);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  var scrollLockStyleAdded = false;
  function ensureScrollLockStyle() {
    if (scrollLockStyleAdded) return;
    var style = document.createElement('style');
    style.textContent = 'body.in-scroll-lock{ overflow: hidden; }';
    document.head.appendChild(style);
    scrollLockStyleAdded = true;
  }
  ensureScrollLockStyle();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
