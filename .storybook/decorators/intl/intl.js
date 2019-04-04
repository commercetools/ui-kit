import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import { select } from '@storybook/addon-knobs/react';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import es from 'react-intl/locale-data/es';
import frFR from 'react-intl/locale-data/fr';
import zhCN from 'react-intl/locale-data/zh';

addLocaleData(en);
addLocaleData(de);
addLocaleData(es);
addLocaleData(frFR);
addLocaleData(zhCN);

const availableLocales = ['en', 'de', 'es', 'fr-FR', 'zh-CN'];

export default storyFn => {
  const locale = select('global locale', availableLocales, availableLocales[0]);
  const messages = require(`../../../i18n/data/${locale}.json`);
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {storyFn()}
    </IntlProvider>
  );
};
