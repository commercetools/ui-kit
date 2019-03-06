import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import { withKnobs, select } from '@storybook/addon-knobs/react';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import es from 'react-intl/locale-data/es';
import * as messages from '../../../i18n';

addLocaleData(en);
addLocaleData(de);
addLocaleData(es);
const locales = Object.keys(messages);

export default storyFn => {
  const locale = select('global locale', locales, locales[0]);
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      {storyFn()}
    </IntlProvider>
  );
};
