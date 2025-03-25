'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Locale, defaultLocale, getLocaleFromNavigator } from '../i18n/config';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: defaultLocale,
  setLocale: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // 在客户端初始化时检测浏览器语言
    const browserLocale = getLocaleFromNavigator();
    setLocale(browserLocale);
  }, []);

  useEffect(() => {
    // 当语言改变时，更新 HTML lang 属性
    document.documentElement.lang = locale;
    // 存储用户选择的语言
    localStorage.setItem('preferred-locale', locale);
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
} 