import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider, addLocaleData } from 'react-intl';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import es from 'react-intl/locale-data/es';
import frFR from 'react-intl/locale-data/fr';
import zhCN from 'react-intl/locale-data/zh';
import messagesEn from '../i18n/data/en.json';
import messagesDe from '../i18n/data/de.json';
import messagesEs from '../i18n/data/es.json';

addLocaleData(en);
addLocaleData(de);
addLocaleData(es);
addLocaleData(frFR);
addLocaleData(zhCN);

const messages = {
  en: messagesEn,
  de: messagesDe,
  es: messagesEs,
};

const customRender = (
  node,
  {
    locale = 'en', // react-router
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
    ...rtlOptions
  } = {}
) => ({
  ...render(
    <Router history={history}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {node}
      </IntlProvider>
    </Router>,
    rtlOptions
  ),
  // adding `history` to the returned utilities to allow us
  // to reference it in our tests (just try to avoid using
  // this to test implementation details).
  history,
});

// re-export everything
export * from 'react-testing-library';

// override render method
export { customRender as render };
