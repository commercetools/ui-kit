import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import es from 'react-intl/locale-data/es';
import frFR from 'react-intl/locale-data/fr';
import zhCN from 'react-intl/locale-data/zh';
import * as messages from '../../i18n';

addLocaleData(en);
addLocaleData(de);
addLocaleData(es);
addLocaleData(frFR);
addLocaleData(zhCN);

const locales = Object.keys(messages);

const slugifyLocale = locale => {
  switch (locale) {
    case 'frFR':
      return 'fr-FR';
    case 'zhCN':
      return 'zh-CN';
    default:
      return locale;
  }
};

const namifyLocale = locale => {
  switch (locale) {
    case 'en':
      return 'English';
    case 'es':
      return 'Español';
    case 'de':
      return 'Deutsch';
    case 'frFR':
      return 'Français';
    case 'zhCN':
      return '简化字';
    default:
      return locale;
  }
};

const IntlWrapper = props => {
  const locale = props.locale;
  return (
    <IntlProvider locale={slugifyLocale(locale)} messages={messages[locale]}>
      {props.children}
    </IntlProvider>
  );
};

IntlWrapper.propTypes = {
  locale: PropTypes.string.isRequired,
};

const intlParams = locales.map(locale => ({
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
