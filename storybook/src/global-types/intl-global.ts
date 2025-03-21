export const locales = ['en', 'en-GB', 'de', 'es', 'fr-FR'];

const namifyLocale = (locale: string) => {
  switch (locale) {
    case 'en':
      return 'English (US)';
    case 'en-GB':
      return 'English (British)';
    case 'es':
      return 'Español';
    case 'de':
      return 'Deutsch';
    case 'fr-FR':
      return 'Français';
    default:
      return locale;
  }
};

const intlParams = locales.map((locale) => ({
  value: locale,
  title: namifyLocale(locale),
}));

const intlGlobalType = {
  description: 'Internationalization',
  defaultValue: 'en',
  toolbar: {
    title: 'Locale',
    icon: 'globe',
    items: intlParams,
    dynamicTitle: true,
  },
};

export default intlGlobalType;
