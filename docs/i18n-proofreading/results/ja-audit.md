# 日语候选结果审计

对照 `docs/i18n-proofreading/results/ja.json` 与 `docs/i18n-proofreading/tables/ja.json` 检查了候选修改的语义、日语自然度和范围。以下条目必须调整：

| key | 候选译文 | 建议译文 | 理由 |
|---|---|---|---|
| `imprint.threnody.25` | 厳密な学術研究 | 記事ごとの表示が適用されます | 英文 canonical 是 “Article-level notice applies”。候选译文与原文无关；现有译文已经准确，应删除这条修改。 |
| `imprint.threnody.113` | 丁寧な研究を通じてつながる、多様な編集コミュニティ。 | 異なる編集コミュニティを、丁寧な研究でつなぐ。 | “Distinct” 表示各编辑社群彼此不同，不等同于“多样”；候选改动了原意。 |
| `researchAssessment.scopeLabel` | DORAへの組織署名 | DORAに組織として署名 | “DORA signatory” 指作为组织的签署方。候选把“签署方”改成了“组织签署”这一行为，标签含义不够准确。 |
| `researchAssessment.railMeta` | DORAへの組織署名 | DORAに組織として署名 | “Organizational signatory to DORA” 同样描述签署方身份；建议与对应标签使用一致表述。 |
| `infrastructure.identifierDetails.isni` | 組織や貢献者を恒久的に識別する識別子。 | 組織や貢献者の名称を恒久的に識別するための識別子。 | 英文 “Persistent names” 指组织和贡献者的名称标识；候选漏掉“名称”这一信息。 |
| `researchAssessment.doraCaption` | Panorama Scholarly Group LtdはDORAに組織として署名しています。この透明なDORA署名者バッジは、公式宣言と署名者向け情報にリンクしています。 | Panorama Scholarly Group LtdはDORAに組織として署名しています。このDORA署名者バッジは透明性を示し、公式宣言と署名者向け情報にリンクしています。 | “透明な” 容易被理解为材质透明；在此处应表达该徽章体现透明性。 |

## 范围检查

候选修改中没有公告标题、摘要或正文，也没有文章标题或正文、作者姓名、具体期刊名称或期刊简介的翻译建议；这部分未发现违反保留英文要求的条目。Ridgeline 的修改集中于品牌文案、导航标签和学科类别。