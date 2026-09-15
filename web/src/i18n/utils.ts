// Shared i18n helpers. Page copy is kept in typed dictionaries beside this
// module; these helpers handle the cross-page path and locale contract.
import { locales, defaultLocale, getLocale, type LocaleCode } from './config';

export interface UiStrings {
  skipToContent: string;
  search: string;
  language: string;
  menu: string;
  close: string;
  readMore: string;
}

/** Prefix a canonical (English) path with a locale segment, e.g.
 * localizePath('/about/', 'ja') -> '/ja/about/'. English stays unprefixed. */
export function localizePath(path: string, code: string): string {
  const locale = getLocale(code);
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalPath = locales.reduce((currentPath, candidate) => {
    if (candidate.isDefault) return currentPath;
    if (currentPath === `/${candidate.code}`) return '/';
    if (currentPath.startsWith(`/${candidate.code}/`)) return currentPath.slice(candidate.code.length + 1) || '/';
    return currentPath;
  }, normalizedPath);
  if (locale.isDefault) return canonicalPath;
  return `/${locale.code}${canonicalPath === '/' ? '/' : canonicalPath}`;
}

/** Build the full set of hreflang alternates (all locales + x-default) for a canonical path. */
export function hreflangAlternates(path: string, siteUrl: string) {
  return [
    ...locales.map((l) => ({
      hreflang: l.bcp47,
      href: `${siteUrl}${l.isDefault ? '' : '/' + l.code}${path}`,
    })),
    { hreflang: 'x-default', href: `${siteUrl}${path}` },
  ];
}

export function isKnownLocale(code: string): code is LocaleCode {
  return locales.some((l) => l.code === code);
}

export { locales, defaultLocale, getLocale };
