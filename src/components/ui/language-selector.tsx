"use client";

import { useState, useEffect, useCallback } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Define language types and options
export type Language = 'en' | 'fr' | 'de';

export const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

// Translation context
import { createContext, useContext } from 'react';

// Import all translations statically to avoid dynamic imports which can cause issues with static export
import enTranslations from '@/i18n/locales/en.json';
import frTranslations from '@/i18n/locales/fr.json';
import deTranslations from '@/i18n/locales/de.json';

// Define a type for our translations
type TranslationData = Record<string, unknown>;

const translationsMap: Record<Language, TranslationData> = {
  en: enTranslations as TranslationData,
  fr: frTranslations as TranslationData,
  de: deTranslations as TranslationData
};

type TranslationContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  // Set initial language from localStorage, but only on client side
  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('app_language') as Language;
    if (savedLanguage && ['en', 'fr', 'de'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }

    // Update the HTML lang attribute
    const htmlElement = document.getElementById('html-root') as HTMLHtmlElement;
    if (htmlElement) {
      htmlElement.lang = language;
    }
  }, [language]);

  // The first useEffect already handles updating the lang attribute

  // Memoize the translation function to prevent recreating it on each render
  const t = useCallback((key: string, fallback: string = key): string => {
    if (!mounted) return fallback; // During SSR, return fallback

    const keys = key.split('.');
    // Get the translation data for the current language or fall back to English
    let value: unknown = translationsMap[language] || translationsMap.en;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
        // Navigate through the nested translation object
        value = (value as Record<string, unknown>)[k];
      } else {
        return fallback;
      }
    }

    return typeof value === 'string' ? value : fallback;
  }, [language, mounted]);

  const changeLanguage = useCallback((newLang: Language) => {
    setLanguage(newLang);
    localStorage.setItem('app_language', newLang);
    // No need to reload the page - React will automatically re-render components
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const value = {
    language,
    setLanguage: changeLanguage,
    t,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation();

  // Used for rendering on the server initially to avoid hydration errors
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on the server-side
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="text-gray-400 opacity-50">
        <Globe className="h-5 w-5" />
      </Button>
    );
  }

  // Get current language info
  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <span className="mr-1">{currentLanguage.flag}</span>
          <span className="hidden md:inline-block">{currentLanguage.label}</span>
          <Globe className="h-4 w-4 ml-1 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as Language)}
            className={`flex items-center gap-2 ${
              lang.code === language ? "bg-gray-100 dark:bg-gray-800" : ""
            }`}
          >
            <span className="text-lg mr-1">{lang.flag}</span>
            <span>{lang.label}</span>
            {lang.code === language && (
              <span className="ml-auto h-2 w-2 rounded-full bg-primary"></span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
