import { ui, defaultLang, type Lang, type UIKey } from './ui';

/** Detect the active locale from the request URL ("/fr/…" → "fr"). */
export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split('/');
  if (maybeLang in ui) return maybeLang as Lang;
  return defaultLang;
}

/** Returns a `t(key)` function for the given locale, falling back to the default. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * Build a localized path. EN (default) has no prefix; others are prefixed.
 *   localizedPath('/work/kinap', 'fr') -> '/fr/work/kinap'
 *   localizedPath('/', 'en')           -> '/'
 * You can also use Astro's built-in `getRelativeLocaleUrl` from 'astro:i18n'.
 */
export function localizedPath(path: string, lang: Lang): string {
  const clean = '/' + path.replace(/^\/+/, '');
  if (lang === defaultLang) return clean;
  return `/${lang}${clean === '/' ? '' : clean}`;
}

export { ui, defaultLang };
export type { Lang, UIKey };
