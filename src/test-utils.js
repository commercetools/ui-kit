/* eslint-disable global-require */
import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const getMessagesForLocale = locale => {
  switch (locale) {
    case 'de':
      return require('../i18n/data/de.json');
    case 'es':
      return require('../i18n/data/es.json');
    case 'fr-FR':
      return require('../i18n/data/fr-FR.json');
    case 'zh-CN':
      return require('../i18n/data/zh-CN.json');
    default:
      return require('../i18n/data/en.json');
  }
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
    <IntlProvider locale={locale} messages={getMessagesForLocale(locale)}>
      <Router history={history}>{node}</Router>
    </IntlProvider>,
    rtlOptions
  ),
  // adding `history` to the returned utilities to allow us
  // to reference it in our tests (just try to avoid using
  // this to test implementation details).
  history,
});

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
