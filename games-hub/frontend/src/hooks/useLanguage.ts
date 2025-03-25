import { useState, useEffect } from 'react';

export interface LanguageState {
  locale: string;
  setLocale: (locale: string) => void;
}

export function useLanguage(): LanguageState {
  const [locale, setLocale] = useState('zh');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, []);

  const handleSetLocale = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  return {
    locale,
    setLocale: handleSetLocale,
  };
} 