export const defaultLocale = 'en';

export const locales = ['en', 'zh', 'ja', 'ko'] as const;
export type Locale = typeof locales[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
};

export const defaultNamespaces = ['common', 'game', 'auth'] as const;
export type Namespace = typeof defaultNamespaces[number];

export const fallbackLng = 'en';

export const getLocaleFromNavigator = (): Locale => {
  if (typeof navigator === 'undefined') return defaultLocale;
  
  const browserLang = navigator.language.split('-')[0];
  return locales.includes(browserLang as Locale) ? browserLang as Locale : defaultLocale;
}; 