# Journal DOI rollout

Group policy: `/standards/doi-policy/` (all ten site locales).

## Deployment boundary

The corporate site publishes the group framework. It does not modify OJS
settings, journal navigation pages, Crossref deposits or Zenodo records.
Journal adoption requires authenticated access to OJS and a coordinated update
of article types, author guidelines, fee policy and review descriptions.

Existing DOIs, already published files, submission terms and fee exemptions are
retained. In particular, PEMR's currently APC-exempt Commentaries/Perspectives
and Critical Reviews must not become chargeable merely because their review
path calls for Crossref. Changes to any existing fee entitlement require a
separate decision and prospective notice.

## First adoption candidates

These are rollout targets, not a statement that OJS has already been changed.
Confirm the current section name and published review policy in the editor
before saving. Preserve combined sections where splitting them is unnecessary.

| Journal | Complimentary candidates | Classification boundary |
| --- | --- | --- |
| SES | Book Review / Review Essay | Editorially reviewed short reviews; substantive external reviews remain Crossref |
| CRoPT | Book Reviews | Review Essays and substantive Forum contributions remain conditional |
| PEMR | Book Reviews | Commentary/Perspective/Critical Review: classify review route while preserving existing APC exemptions |
| GRHAS | Book Reviews; Interviews & Dialogues; Conference Reports & Exchanges | Research, substantive art-practice papers and scholarly perspectives remain Crossref |
| JDES | Book Review; Performance Review; Interview; Editorial | Research and substantive performance/choreographic analysis remain Crossref |
| Resonance | Book & Media Reviews; Dialogues & Interviews; Poetry/Music; Scores; non-research Performance Notes; editorially reviewed translations | Classify by contribution, not thematic section name |
| TTS | Book Reviews; editorially reviewed translations/annotations | Externally reviewed textual research remains Crossref |

CPRT and JSCC are not included in this initial switch while their applicable
book-review policies call for external peer review. Silence requires a separate
journal decision. Waived research articles continue to use Crossref.

## Author-facing insert

> **Complimentary sections and DOI allocation.** Approved complimentary
> sections charge no Article Processing Charge. Editorially reviewed content
> in these sections may receive a Zenodo DOI registered through DataCite.
> Core scholarly articles and substantive externally peer-reviewed contributions
> normally receive a PSG publisher DOI registered through Crossref under
> prefix 10.63802, including articles with APC waivers. Commentaries,
> perspectives, review essays, translations and similar contributions are
> classified before publication according to their scholarly function and
> approved review pathway. Existing DOIs are retained. See the
> [PSG DOI Allocation Policy](https://panorama-sg.com/standards/doi-policy/).

Each journal must list its adopted complimentary sections immediately above
this insert and show whether they receive editorial or external peer review.
Do not label an editorially reviewed item as externally peer reviewed.

## Production procedure

1. Confirm the accepted contribution's review route, APC entitlement and
   whether it already has a DOI. Preserve an existing identifier.
2. For a new Zenodo object without an existing DOI, reserve the DOI in the
   deposit draft; include it in the final publication file and OJS metadata.
3. Deposit the final file with journal citation, authors, ORCIDs where available,
   content type, licence and the official article URL. Verify the deposit is
   published and the DOI resolves before treating it as active.
4. Link the journal article page and repository record in both directions.
   Cite the DOI for the deposited publication version, with journal volume,
   issue and pages/article number.
5. Use OJS's supported identifier workflow. Do not silently overwrite a
   registered publisher DOI. Exclude repository-DOI articles from automatic
   publisher DOI assignment and Crossref deposits where the configured OJS
   version supports this; inspect export contents before registration.
6. Do not deposit a Zenodo/DataCite DOI into Crossref as a new Crossref DOI.
   Metadata, indexing and downstream discovery differ by service; no uniform
   indexing guarantee is made.
7. Formal corrections and retractions follow the journal's post-publication
   policy; they are not treated as routine DOI-free administrative notices.

Technical reference: [Zenodo DOI reservation and existing identifiers](https://help.zenodo.org/docs/deposit/describe-records/reserve-doi/).
