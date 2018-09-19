import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import messages from '../i18n/core.json';

const customRender = (node, ...options) =>
  render(
    <IntlProvider locale="en" messages={messages}>
      {node}
    </IntlProvider>,
    ...options
  );

// re-export everything
export * from 'react-testing-library';

// override render method
export { customRender as render };
