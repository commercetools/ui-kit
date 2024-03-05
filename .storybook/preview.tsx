import type { Preview } from '@storybook/react';

import intlGlobalType from './global-types/intl-global';
import withThemeDecorator from './decorators/theme-decorator';
import withIntlDecorator from './decorators/intl-decorator';

import '../design-system/materials/resets.css';

const preview: Preview = {
  globalTypes: {
    locale: intlGlobalType,
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  // argTypes: {
  //   onBlur: { action: 'onBlur' },
  //   onChange: { action: 'onChange' },
  //   onFocus: { action: 'onFocus' },
  //   onInputChange: { action: 'onInputChange' },
  // },
  decorators: [withThemeDecorator, withIntlDecorator],
};

export default preview;
