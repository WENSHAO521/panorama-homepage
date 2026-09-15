// Static registry of per-locale UI-string dictionaries. Static (not
// dynamic import) so the whole set type-checks and tree-shakes cleanly
// in a static build; there are only 10 locales, this will not scale
// into a problem.
import type { UiStrings } from '../utils';
import en from './en';
import zhHans from './zh-hans';
import zhHant from './zh-hant';
import ja from './ja';
import ko from './ko';
import de from './de';
import fr from './fr';
import es from './es';
import ru from './ru';
import ar from './ar';
import type { LocaleCode } from '../config';

export const uiStrings: Record<LocaleCode, UiStrings> = {
  en,
  'zh-hans': zhHans,
  'zh-hant': zhHant,
  ja,
  ko,
  de,
  fr,
  es,
  ru,
  ar,
};

export function getUiStrings(code: string): UiStrings {
  return uiStrings[code as LocaleCode] ?? uiStrings.en;
}
