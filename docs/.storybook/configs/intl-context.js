import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

const supportedLocales = ['en', 'en-GB', 'de', 'es', 'fr-FR', 'pt-BR', 'zh-CN'];

const getMessagesForLocale = (locale) => {
  switch (locale) {
    case 'en': // This is american english
      return require('../../../packages/i18n/data/en.json');
    case 'en-GB':
      return require('../../../packages/i18n/data/en.json');
    case 'es':
      return require('../../../packages/i18n/data/es.json');
    case 'de':
      return require('../../../packages/i18n/data/de.json');
    case 'fr-FR':
      return require('../../../packages/i18n/data/fr-FR.json');
    case 'pt-BR':
      return require('../../../packages/i18n/data/pt-BR.json');
    case 'zh-CN':
      return require('../../../packages/i18n/data/zh-CN.json');
    default:
      throw new Error(`Unable to load messages for locale ${locale}.`);
  }
};

const namifyLocale = (locale) => {
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
    case 'pt-BR':
      return 'Português brasileiro';
    case 'zh-CN':
      return '简化字';
    default:
      return locale;
  }
};

const IntlWrapper = (props) => {
  const locale = props.locale;
  const messages = getMessagesForLocale(locale);
  return (
    <IntlProvider locale={locale} messages={messages}>
      {props.children}
    </IntlProvider>
  );
};

IntlWrapper.propTypes = {
  locale: PropTypes.string.isRequired,
};

const intlParams = supportedLocales.map((locale) => ({
  name: namifyLocale(locale),
  props: { locale },
}));

const intlContext = {
  icon: 'globe', // a icon displayed in the Storybook toolbar to control contextual props
  title: 'locales', // an unique name of a contextual environment
  components: [IntlWrapper],
  params: intlParams,
  options: {
    deep: true, // pass the `props` deeply into all wrapping components
    disable: false, // disable this contextual environment completely
    cancelable: false, // allow this contextual environment to be opt-out optionally in toolbar
  },
};

export default intlContext;
