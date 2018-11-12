import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';
import es from 'react-intl/locale-data/es';
import messages from '../i18n/core.json';

addLocaleData(en);
addLocaleData(de);
addLocaleData(es);

const customRender = (node, opts = {}) => {
  const { locale = 'en', ...options } = opts;

  return render(
    <IntlProvider locale={locale} messages={messages}>
      {node}
    </IntlProvider>,
    options
  );
};

// re-export everything
export * from 'react-testing-library';

// override render method
export { customRender as render };
