import { Locale, Namespace } from '../i18n/config';

type TranslationKey = string;
type TranslationValues = Record<string, string | number>;

export async function loadTranslations(locale: Locale, namespace: Namespace) {
  try {
    const translations = await import(`../i18n/locales/${locale}/${namespace}.json`);
    return translations.default;
  } catch (error) {
    console.error(`Failed to load translations for ${locale}/${namespace}:`, error);
    return {};
  }
}

export function translate(
  translations: Record<string, any>,
  key: TranslationKey,
  values?: TranslationValues
): string {
  const keys = key.split('.');
  let result: any = translations;

  for (const k of keys) {
    if (result && typeof result === 'object') {
      result = result[k];
    } else {
      return key; // 如果找不到翻译，返回原始key
    }
  }

  if (typeof result !== 'string') {
    return key;
  }

  if (values) {
    return result.replace(/\{\{(\w+)\}\}/g, (_match: string, key: string) => 
      String(values[key] ?? `{{${key}}}`)
    );
  }

  return result;
}

// 用于客户端的翻译缓存
const translationCache: Record<string, Record<string, any>> = {};

export async function getTranslations(locale: Locale, namespace: Namespace) {
  const cacheKey = `${locale}:${namespace}`;
  
  if (translationCache[cacheKey]) {
    return translationCache[cacheKey];
  }

  const translations = await loadTranslations(locale, namespace);
  translationCache[cacheKey] = translations;
  return translations;
} 