/* eslint-disable global-require */

import { act, type ReactNode } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import { UIKitProvider } from '@commercetools-uikit/ui-kit-provider';
import type { TLocationDescriptor } from '@commercetools-uikit/router-provider';

const getMessagesForLocale = (locale: string) => {
  switch (locale) {
    case 'de':
      return require('@commercetools-uikit/i18n/compiled-data/de.json');
    case 'es':
      return require('@commercetools-uikit/i18n/compiled-data/es.json');
    case 'fr-FR':
      return require('@commercetools-uikit/i18n/compiled-data/fr-FR.json');
    case 'pt-BR':
      return require('@commercetools-uikit/i18n/compiled-data/pt-BR.json');
    default:
      return require('@commercetools-uikit/i18n/compiled-data/en.json');
  }
};

type TTestHistory = {
  location: { pathname: string; search: string; hash: string };
  push: (to: TLocationDescriptor) => void;
};

const createTestHistory = (route: string): TTestHistory => ({
  location: { pathname: route, search: '', hash: '' },
  push(to: TLocationDescriptor) {
    if (typeof to === 'string') {
      this.location = { pathname: to, search: '', hash: '' };
    } else {
      this.location = {
        pathname: to.pathname || '',
        search: to.search || '',
        hash: to.hash || '',
      };
    }
  },
});

const customRender = (
  node: ReactNode,
  {
    locale = 'en',
    route = '/',
    ...rtlOptions
  }: { locale?: string; route?: string; [key: string]: unknown } = {}
) => {
  const history = createTestHistory(route);

  return {
    ...render(
      <IntlProvider locale={locale} messages={getMessagesForLocale(locale)}>
        <UIKitProvider router={{ navigate: (to) => history.push(to) }}>
          {node}
        </UIKitProvider>
      </IntlProvider>,
      rtlOptions
    ),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
};

// re-export everything
export {
  act,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';

// override render method
export { customRender as render };

// Custom events for async focus and blur.
// This helps abstractinv the act() call from the tests.
type TCustomFireEventApi = typeof fireEvent & {
  asyncFocus: (element: HTMLElement) => Promise<void>;
  asyncBlur: (element: HTMLElement) => Promise<void>;
};
const originalFireEvent = fireEvent as TCustomFireEventApi;
originalFireEvent.asyncFocus = (element) => {
  return act(async () => element.focus());
};
originalFireEvent.asyncBlur = (element) => {
  return act(async () => element.blur());
};
export { originalFireEvent as fireEvent };
