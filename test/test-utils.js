/* eslint-disable global-require */

import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const getMessagesForLocale = (locale) => {
  switch (locale) {
    case 'de':
      return require('@commercetools-uikit/i18n/compiled-data/de.json');
    case 'es':
      return require('@commercetools-uikit/i18n/compiled-data/es.json');
    case 'fr-FR':
      return require('@commercetools-uikit/i18n/compiled-data/fr-FR.json');
    case 'zh-CN':
      return require('@commercetools-uikit/i18n/compiled-data/zh-CN.json');
    case 'ja':
      return require('@commercetools-uikit/i18n/compiled-data/ja.json');
    default:
      return require('@commercetools-uikit/i18n/compiled-data/en.json');
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
