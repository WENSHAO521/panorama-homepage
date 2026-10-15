# I18n proofreading

Each locale table pairs the current localized copy with its English canonical string. The tables cover localizable UI and page copy in `web/src/i18n/`.

Review only the assigned table. Keep names, journal titles and descriptions, article content, author names, and announcement titles, summaries, and body text in their registered English form. Announcement category labels are the exception: only `Update` and `Call for papers` are localized in `utility.ts`.

Write one result JSON per locale under `results/` with `locale` and `corrections`. Each correction has `file`, `key`, `oldLiteral`, `newText`, and `reason`. Copy `file`, `key`, and the exact `sourceMatches[].raw` literal from the table; `newText` is the corrected plain translation. Skip rows with no locale-owned source literal.

Run `node scripts/apply-i18n-proofreading.mjs` to report exact-string hit counts without changing sources. Add `--apply` to replace only unique hits. Each correction is recorded in `application-log.jsonl`.
