const config = {
  app: {
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'fr', 'de']
    }
  },
  // This ensures messages are handled properly
  getMessages: async (locale) => {
    try {
      return (await import(`./src/i18n/locales/${locale}.json`)).default;
    } catch (error) {
      console.error(`Could not load messages for locale: ${locale}`, error);
      return (await import(`./src/i18n/locales/en.json`)).default;
    }
  }
};

export default config;
