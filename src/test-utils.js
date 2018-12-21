import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider, addLocaleData } from 'react-intl';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import es from 'react-intl/locale-data/es';
import messages from '../i18n/core.json';

addLocaleData(en);
addLocaleData(de);
addLocaleData(es);

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
    <IntlProvider locale={locale} messages={messages}>
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
export * from 'react-testing-library';

// override render method
export { customRender as render };
