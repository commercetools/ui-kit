import type { Preview } from '@storybook/react';

//import intlGlobalType from './global-types/intl-global';
//import withIntlDecorator from './decorators/intl-decorator';

import '../../design-system/materials/resets.css';
import { withIntlDecorator } from '../src/decorators/intl-decorator';
import { withThemeDecorator } from '../src/decorators/theme-decorator';

const preview: Preview = {
  globalTypes: {
    //locale: intlGlobalType,
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        //color: /(background|color)$/i,
        //date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        includeNames: true,
        order: [
          'Text & Media',
          [
            'Text',
            ['Readme', 'Props', '*'],
            'Icons',
            ['Readme', 'All Icons', '*'],
            '*',
            ['Readme', 'Props', '*', ['Readme', 'Props', '*']],
          ],
          'components',
          ['*', ['Readme', 'Props', '*', ['Readme', 'Props', '*']]],
          'form',
          ['*', ['Readme', 'Props', '*', ['Readme', 'Props', '*']]],
          'unported',
          ['*', ['Readme', 'Props', '*', ['Readme', 'Props', '*']]],
        ],
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
  tags: ['autodocs'],
};

export default preview;
