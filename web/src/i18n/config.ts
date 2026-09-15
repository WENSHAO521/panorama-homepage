// English is canonical and unprefixed (/). Every other locale is prefixed
// (/ja/, /ar/, ...). The same contract drives routing, <html lang>,
// hreflang, RTL detection, and the page-level translation dictionaries.

export type LocaleCode =
  | 'en'
  | 'zh-hans'
  | 'zh-hant'
  | 'ja'
  | 'ko'
  | 'de'
  | 'fr'
  | 'es'
  | 'ru'
  | 'ar';

export interface LocaleDefinition {
  code: LocaleCode;
  /** BCP 47 tag used in <html lang> and hreflang alternates. */
  bcp47: string;
  label: string;
  dir: 'ltr' | 'rtl';
  /** true for the canonical, unprefixed locale. */
  isDefault?: boolean;
}

export const locales: LocaleDefinition[] = [
  { code: 'en', bcp47: 'en', label: 'English', dir: 'ltr', isDefault: true },
  { code: 'zh-hans', bcp47: 'zh-Hans', label: '简体中文', dir: 'ltr' },
  { code: 'zh-hant', bcp47: 'zh-Hant', label: '繁體中文', dir: 'ltr' },
  { code: 'ja', bcp47: 'ja', label: '日本語', dir: 'ltr' },
  { code: 'ko', bcp47: 'ko', label: '한국어', dir: 'ltr' },
  { code: 'de', bcp47: 'de', label: 'Deutsch', dir: 'ltr' },
  { code: 'fr', bcp47: 'fr', label: 'Français', dir: 'ltr' },
  { code: 'es', bcp47: 'es', label: 'Español', dir: 'ltr' },
  { code: 'ru', bcp47: 'ru', label: 'Русский', dir: 'ltr' },
  { code: 'ar', bcp47: 'ar', label: 'العربية', dir: 'rtl' },
];

export const defaultLocale = locales.find((l) => l.isDefault)!;

export function getLocale(code: string): LocaleDefinition {
  return locales.find((l) => l.code === code) ?? defaultLocale;
}

export function isRtl(code: string): boolean {
  return getLocale(code).dir === 'rtl';
}
