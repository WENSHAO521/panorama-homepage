import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const resultsDir = path.join(root, 'docs', 'i18n-proofreading', 'results');
const logPath = path.join(root, 'docs', 'i18n-proofreading', 'application-log.jsonl');
const locales = new Set(['zh-hans', 'zh-hant', 'ja', 'ko', 'de', 'fr', 'es', 'ru', 'ar']);
const apply = process.argv.includes('--apply');
const args = process.argv.slice(2).filter((arg) => arg !== '--apply');
const resultFiles = args.length
  ? args.map((arg) => path.resolve(root, arg))
  : fs.existsSync(resultsDir)
    ? fs.readdirSync(resultsDir).filter((name) => name.endsWith('.json')).sort().map((name) => path.join(resultsDir, name))
    : [];

function countOccurrences(text, needle) {
  if (!needle) return 0;
  let count = 0;
  let from = 0;
  while ((from = text.indexOf(needle, from)) !== -1) {
    count++;
    from += needle.length;
  }
  return count;
}

assert.deepEqual([countOccurrences('match match', 'match'), countOccurrences('match', '')], [2, 0]);

function canApplyUniqueSuggestion(hitCount, suggestions) {
  return hitCount === 1 && new Set(suggestions.map(({ newText }) => newText)).size === 1;
}

assert.deepEqual([
  canApplyUniqueSuggestion(1, [{ newText: 'same' }, { newText: 'same' }]),
  canApplyUniqueSuggestion(1, [{ newText: 'first' }, { newText: 'second' }]),
  canApplyUniqueSuggestion(2, [{ newText: 'same' }]),
], [true, false, false]);

const corrections = [];
for (const filename of resultFiles) {
  if (!fs.existsSync(filename)) throw new Error(`Missing result file: ${path.relative(root, filename)}`);
  const result = JSON.parse(fs.readFileSync(filename, 'utf8'));
  if (!locales.has(result.locale) || !Array.isArray(result.corrections)) throw new Error(`Invalid result file: ${path.relative(root, filename)}`);
  if (path.basename(filename) !== `${result.locale}.json`) throw new Error(`Result filename does not match locale: ${path.relative(root, filename)}`);
  const tablePath = path.join(root, 'docs', 'i18n-proofreading', 'tables', `${result.locale}.json`);
  const table = JSON.parse(fs.readFileSync(tablePath, 'utf8'));
  if (table.locale !== result.locale || !Array.isArray(table.rows)) throw new Error(`Invalid comparison table: ${path.relative(root, tablePath)}`);
  const allowed = new Set(table.rows.flatMap((row) => (row.sourceMatches ?? []).map((match) => JSON.stringify([row.file, row.key, match.raw]))));
  for (const [index, correction] of result.corrections.entries()) {
    if (typeof correction.file !== 'string' || typeof correction.key !== 'string' || typeof correction.oldLiteral !== 'string' || typeof correction.newText !== 'string') {
      throw new Error(`Invalid correction ${index + 1} in ${path.relative(root, filename)}`);
    }
    if (!allowed.has(JSON.stringify([correction.file, correction.key, correction.oldLiteral]))) {
      throw new Error(`Correction does not match its comparison table: ${correction.key} in ${path.relative(root, filename)}`);
    }
    const sourceFile = correction.file.replaceAll('\\', '/');
    if (!/^web\/src\/i18n\/(?:locales\/[a-z-]+|[a-z-]+)\.ts$/.test(sourceFile) || sourceFile.endsWith('/en.ts')) {
      throw new Error(`Refusing out-of-scope source path: ${correction.file}`);
    }
    const sourcePath = path.resolve(root, sourceFile);
    if (!sourcePath.startsWith(path.resolve(root, 'web', 'src', 'i18n') + path.sep)) throw new Error(`Refusing source path outside i18n: ${correction.file}`);
    corrections.push({ ...correction, locale: result.locale, resultFile: path.relative(root, filename), sourceFile, sourcePath });
  }
}

const byFile = new Map();
for (const correction of corrections) {
  const list = byFile.get(correction.sourcePath) ?? [];
  list.push(correction);
  byFile.set(correction.sourcePath, list);
}

const log = [];
const writes = [];
for (const [sourcePath, fileCorrections] of byFile) {
  const original = fs.readFileSync(sourcePath, 'utf8');
  const adviceByLiteral = new Map();
  for (const correction of fileCorrections) {
    const suggestions = adviceByLiteral.get(correction.oldLiteral) ?? [];
    suggestions.push(correction);
    adviceByLiteral.set(correction.oldLiteral, suggestions);
  }
  const edits = [];
  const editedLiterals = new Set();
  for (const correction of fileCorrections) {
    const hitCount = countOccurrences(original, correction.oldLiteral);
    const suggestions = adviceByLiteral.get(correction.oldLiteral);
    const duplicateAdvice = suggestions.length > 1;
    const unique = hitCount === 1;
    const safeUnique = canApplyUniqueSuggestion(hitCount, suggestions);
    const status = hitCount === 0 ? 'miss' : hitCount !== 1 ? 'not_unique' : !safeUnique ? 'conflicting_suggestion' : apply ? 'applied' : 'would_apply';
    if (safeUnique && !editedLiterals.has(correction.oldLiteral)) {
      const start = original.indexOf(correction.oldLiteral);
      edits.push({ start, end: start + correction.oldLiteral.length, replacement: JSON.stringify(correction.newText) });
      editedLiterals.add(correction.oldLiteral);
    }
    log.push({
      locale: correction.locale,
      resultFile: correction.resultFile,
      file: correction.sourceFile,
      key: correction.key ?? null,
      reason: correction.reason ?? null,
      hit_count: hitCount,
      unique,
      duplicate_advice: duplicateAdvice,
      deduplicated: duplicateAdvice && safeUnique,
      status,
      oldLiteral: correction.oldLiteral,
      newText: correction.newText,
    });
  }
  if (apply && edits.length) {
    let updated = original;
    for (const edit of edits.sort((a, b) => b.start - a.start)) updated = updated.slice(0, edit.start) + edit.replacement + updated.slice(edit.end);
    writes.push([sourcePath, updated]);
  }
}

if (apply) for (const [filename, content] of writes) fs.writeFileSync(filename, content, 'utf8');
fs.mkdirSync(path.dirname(logPath), { recursive: true });
fs.writeFileSync(logPath, log.map((entry) => JSON.stringify(entry)).join('\n') + (log.length ? '\n' : ''), 'utf8');
const statuses = log.reduce((counts, item) => (counts[item.status] = (counts[item.status] ?? 0) + 1, counts), {});
console.log(JSON.stringify({ mode: apply ? 'apply' : 'check', corrections: log.length, changedFiles: apply ? writes.length : 0, log: path.relative(root, logPath), statuses }, null, 2));
