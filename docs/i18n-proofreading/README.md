# I18n proofreading

Each locale table pairs the current localized copy with its English canonical string. The tables cover localizable UI and page copy in `web/src/i18n/`.

Review only the assigned table. Keep names, journal titles and descriptions, article content, author names, and announcement titles, summaries, and body text in their registered English form. Announcement category labels are the exception: only `Update` and `Call for papers` are localized in `utility.ts`.

Write one result JSON per locale under `results/` with `locale` and `corrections`. Each correction has `file`, `key`, `oldLiteral`, `newText`, and `reason`. Copy `file`, `key`, and the exact `sourceMatches[].raw` literal from the table; `newText` is the corrected plain translation. Skip rows with no locale-owned source literal.

Run `node scripts/apply-i18n-proofreading.mjs` to report exact-string hit counts without changing sources. Add `--apply` to replace only unique hits. Each correction is recorded in `application-log.jsonl`.

## Second pass (October 2026)

A second full review compared every localized string in `web/src/i18n/` (about 1,550 per locale, including the policy bodies, navigation and catalogue copy that the first tables did not cover) against the English source. Each change is recorded in `second-pass-log.jsonl` with the English text, the previous translation, the new one and the reason.

The Traditional Chinese policy bodies in `policy-body.ts` were previously produced at runtime by a short word-replacement table applied to the Simplified text, which left most characters Simplified. They are now stored as reviewed Traditional Chinese (Hong Kong conventions, matching the rest of the `zh-hant` copy).

Strings the site owner edited by hand were only changed where they contained a clear error, such as a grammatical slip or a non-standard character.
