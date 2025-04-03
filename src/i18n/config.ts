export const locales = ['en', 'fr', 'de'] as const;
export const defaultLocale = 'en' as const;

export type Locale = (typeof locales)[number];

// Language information for display
export const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];
