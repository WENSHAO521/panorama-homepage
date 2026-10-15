# French candidate audit

Reviewed all 71 corrections in `fr.json` against the English entries in `tables/fr.json`. All 71 `file`/`key`/`oldLiteral` references match a table row and its `sourceMatches` entry. The candidate results contain no announcement-body, journal-title/individual journal-introduction, article, or author-name corrections. The following items must be corrected before approval:

1. **`web/src/i18n/doi-policy.ts` — `doiPolicy.paragraphs[1]`**

   **Suggested newText:** `Les articles de recherche, articles de synthèse, revues systématiques, méta-analyses, articles théoriques et méthodologiques, articles de données, études de cas, analyses de politiques publiques et autres contributions substantielles évaluées par des pairs externes reçoivent normalement un DOI d’éditeur PSG via Crossref. Une exonération d’APC, une remise ou une invitation ne modifie pas cette procédure. L’attribution du DOI dépend de la fonction scientifique et du processus d’évaluation approuvé, et non du seul paiement.`

   **Reason:** The candidate adds the DOI prefix `10.63802`, which is absent from the English baseline and introduces an unsupported factual claim.

2. **`web/src/i18n/group.ts` — `governance.heroLede`**

   **Suggested newText:** `Des responsabilités clairement définies et des mécanismes de reddition de comptes contribuent à ce que les travaux scientifiques demeurent rigoureux, transparents et dignes de confiance.`

   **Reason:** `Accountable processes` refers to accountability; the candidate changes this to transparent processes, which repeats the later mention of transparency and loses the accountability meaning.

3. **`web/src/i18n/infrastructure.ts` — `infrastructure.regionalBody`**

   **Suggested newText:** `D’autres plateformes de ressources scientifiques élargissent les possibilités de découverte au sein des communautés régionales de recherche.`

   **Reason:** The candidate changes scholarly knowledge platforms into regional research and information platforms, and shifts “regional” from the research communities to the platforms.

4. **`web/src/i18n/imprints.ts` — `imprint.ridgeline.23`**

   **Suggested newText:** `Ridgeline publie des recherches rigoureuses et indépendantes à la croisée de la technologie, de l’ingénierie et de la société. Les défis auxquels nous sommes confrontés exigent plus que des réponses relevant d’une seule discipline.`

   **Reason:** The candidate replaces both source sentences with an unrelated short tagline and drops the meaning about Ridgeline’s research and the challenges it addresses.

5. **`web/src/i18n/imprints.ts` — `imprint.health-nexus.63`**

   **Suggested newText:** `Health Nexus accueille des travaux de recherche originaux qui approfondissent la compréhension de la médecine, de la santé publique, des sciences de la santé et des systèmes qui les relient.`

   **Reason:** The candidate changes the claim about original research and the fields it connects into a different description about dialogue among health sciences, people, institutions, and technologies.

6. **`web/src/i18n/imprints.ts` — `imprint.verdant-science.64`**

   **Suggested newText:** `À mesure que de nouvelles revues rejoignent la marque, chacune conservera une identité éditoriale claire tout en partageant le même engagement en faveur de la rigueur méthodologique, d’une production scientifique transparente et d’une réelle utilité publique.`

   **Reason:** `Transparent scholarship` describes transparent scholarly work, not specifically scientific communication.

7. **`web/src/i18n/imprints.ts` — `imprint.verdant-science.80`**

   **Suggested newText:** `Rigueur éditoriale. Ouverture aux questions transversales.`

   **Reason:** The candidate uses inconsistent gender/number agreement (`Rigoureux` versus `Ouverts`) for two parallel fragments. The proposed noun phrasing avoids the mismatch while retaining the meaning.

**Audit outcome:** Do not approve the current candidate until these seven items are corrected. No other correction requires a change.
