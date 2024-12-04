/* eslint-disable global-require */

import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';

const getMessagesForLocale = (locale) => {
  switch (locale) {
    case 'de':
      return require('@commercetools-uikit/i18n/compiled-data/de.json');
    case 'es':
      return require('@commercetools-uikit/i18n/compiled-data/es.json');
    case 'fr-FR':
      return require('@commercetools-uikit/i18n/compiled-data/fr-FR.json');
    case 'pt-BR':
      return require('@commercetools-uikit/i18n/compiled-data/pt-BR.json');
    case 'zh-CN':
      return require('@commercetools-uikit/i18n/compiled-data/zh-CN.json');
    default:
      return require('@commercetools-uikit/i18n/compiled-data/en.json');
  }
};

const customRender = (
  node,
  { locale = 'en', route = '/', ...rtlOptions } = {}
) => ({
  ...render(
    <IntlProvider locale={locale} messages={getMessagesForLocale(locale)}>
      <MemoryRouter initialEntries={[route]}>{node}</MemoryRouter>
    </IntlProvider>,
    rtlOptions
  ),
});

// Re-export everything
export {
  act,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';

// Override render method
export { customRender as render };
