// Line-break hints for CJK headlines.
//
// Chinese and Japanese have no spaces, so a browser may break a title in the
// middle of a word ("，共 / 同"). We build the markup so that:
//   - each clause (split after punctuation) is one inline-block, so lines
//     break between clauses first;
//   - a clause that is still too wide for the line wraps only at real word
//     boundaries (<wbr>, found with Intl.Segmenter);
//   - single-character function words ("更", "的", Japanese particles) stay
//     attached to a neighbouring word instead of ending or starting a line.
// CSS (`word-break: keep-all`, typography.css) forbids every other break.

const PUNCT = /[，、；：。！？,;:!?]/;
// Chinese: function words that belong to the NEXT word / the PREVIOUS word.
const ZH_PREFIX = new Set([...'更很最不没在为向从与和及对把被将使让给于以']);
const ZH_SUFFIX = new Set([...'的了着过之地得']);
const HIRAGANA = /^[぀-ゟ]$/;

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function isPhraseLocale(locale: string): boolean {
  return /^(zh|ja)/.test(locale);
}

function words(clause: string, ja: boolean): string[] {
  const seg = new Intl.Segmenter(ja ? 'ja' : 'zh', { granularity: 'word' });
  const out: string[] = [];
  let carry = '';
  for (const { segment } of seg.segment(clause)) {
    const single = [...segment].length === 1;
    if (carry) { out.push(carry + segment); carry = ''; continue; }
    const suffix = single && (ja ? HIRAGANA.test(segment) : ZH_SUFFIX.has(segment));
    if (suffix && out.length) { out[out.length - 1] += segment; continue; }
    if (single && !ja && ZH_PREFIX.has(segment)) { carry = segment; continue; }
    out.push(segment);
  }
  if (carry) out.push(carry);
  return out;
}

export function phraseHtml(text: string, locale: string): string {
  if (!isPhraseLocale(locale)) return escapeHtml(text);
  const ja = locale.startsWith('ja');
  const clauses: string[] = [];
  let current = '';
  for (const ch of text) {
    current += ch;
    if (PUNCT.test(ch)) { clauses.push(current); current = ''; }
  }
  if (current) clauses.push(current);
  return clauses
    .map((clause) => `<span class="phrase">${words(clause, ja).map(escapeHtml).join('<wbr>')}</span>`)
    .join('<wbr>');
}
