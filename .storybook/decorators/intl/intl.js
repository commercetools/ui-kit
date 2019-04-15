import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import es from 'react-intl/locale-data/es';
import frFR from 'react-intl/locale-data/fr';
import zhCN from 'react-intl/locale-data/zh';
import * as messages from '../../../i18n';

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

export default storyFn => {
  const locale = select('global locale', locales, locales[0]);
  return (
    <IntlProvider locale={slugifyLocale(locale)} messages={messages[locale]}>
      {storyFn()}
    </IntlProvider>
  );
};
