import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, type Language, type TranslationKey } from '../services/translations';
import type { Localized } from '../types/project';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
  tObject: <T>(obj: T | Localized<T> | undefined, fallback?: T) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio_lang');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_lang', language);
    // Set HTML dir and lang attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    
    // Add/remove RTL class on body for styling overrides
    if (language === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key: TranslationKey): string => {
    const dict = translations[language] || translations.en;
    return dict[key] || translations.en[key] || String(key);
  };

  // Helper to translate database objects that might be localized {en: "...", ar: "..."} or just a simple type
  function tObject<T>(obj: T | Localized<T> | undefined, fallback?: T): T {
    if (obj === undefined || obj === null) return fallback as T;
    
    if (typeof obj === 'object' && obj !== null) {
      const localizedObj = obj as Localized<T>;
      // If we have the current language, return it. Otherwise try english, otherwise try the first key
      if (localizedObj[language] !== undefined && (localizedObj[language] as any) !== '') {
        return localizedObj[language];
      }
      if (localizedObj['en'] !== undefined && (localizedObj['en'] as any) !== '') {
        return localizedObj['en'];
      }
    }
    return obj as T;
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, tObject }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
