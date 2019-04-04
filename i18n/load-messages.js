const mapLocaleToIntlLocale = locale => {
  if (locale.startsWith('de')) return 'de';
  if (locale.startsWith('es')) return 'es';
  if (locale.startsWith('fr')) return 'fr-FR';
  if (locale === 'zh-CN') return 'zh-CN';
  return 'en';
};

const getLocalizedStringsChunkImport = locale => {
  const intlLocale = mapLocaleToIntlLocale(locale);
  switch (intlLocale) {
    case 'de':
      return import(/* webpackChunkName: "i18n-ui-kit-locale-de" */ './data/de.json');
    case 'es':
      return import(/* webpackChunkName: "i18n-ui-kit-locale-es" */ './data/es.json');
    case 'fr-FR':
      return import(/* webpackChunkName: "i18n-ui-kit-locale-fr-FR" */ './data/fr-FR.json');
    case 'zh-CN':
      return import(/* webpackChunkName: "i18n-ui-kit-locale-zh-CN" */ './data/zh-CN.json');
    default:
      return import(/* webpackChunkName: "i18n-ui-kit-locale-en" */ './data/en.json');
  }
};

export default async function loadMessages(locale) {
  try {
    const intlChunkImport = await getLocalizedStringsChunkImport(locale);
    // Prefer loading `default` (for ESM bundles) and
    // fall back to normal import (for CJS bundles).
    return intlChunkImport.default || intlChunkImport;
  } catch (error) {
    console.error(
      `Something went wrong while loading the ui-kit messages for ${locale}`,
      error
    );
    return {};
  }
}
