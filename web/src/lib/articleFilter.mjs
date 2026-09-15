// Retraction markers are intentionally strict at the homepage boundary:
// any article record containing a retraction marker must never enter the
// selected-articles feed, including records already present in the fallback
// JSON payload.
const RETRACTION_MARKER = /\bretract(?:ed|ion|ing|s)?\b/i;

export function containsRetractionMarker(value) {
  return RETRACTION_MARKER.test(String(value || ''));
}

export function isRetractedArticle(article) {
  if (!article || typeof article !== 'object') return false;

  const seen = new WeakSet();
  const inspect = (value) => {
    if (typeof value === 'string') return containsRetractionMarker(value);
    if (!value || typeof value !== 'object') return false;
    if (seen.has(value)) return false;
    seen.add(value);

    if (Array.isArray(value)) return value.some(inspect);
    return Object.values(value).some(inspect);
  };

  return inspect(article);
}
