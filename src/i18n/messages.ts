import { Locale } from './config';

// Import translations from existing JSON files
const loadMessages = async (locale: Locale) => {
  switch (locale) {
    case 'en':
      return (await import('./locales/en.json')).default;
    case 'fr':
      return (await import('./locales/fr.json')).default;
    case 'de':
      return (await import('./locales/de.json')).default;
    default:
      return (await import('./locales/en.json')).default;
  }
};

export default loadMessages;
