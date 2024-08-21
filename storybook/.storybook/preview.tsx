import type { Preview } from '@storybook/react';

import intlGlobalType from './../src/global-types/intl-global';

import '../../design-system/materials/resets.css';
import { WithIntlDecorator } from '../src/decorators/intl-decorator';
import { withThemeDecorator } from '../src/decorators/theme-decorator';

const preview: Preview = {
  globalTypes: {
    locale: intlGlobalType,
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true },
    options: {
      storySort: {
        method: 'alphabetical',
        includeNames: true,
        order: [
          'home',
          ['Start', '*'],
          'Foundation',
          ['Readme', 'Choices', '*'],
          'Text & Media',
          [
            'Text',
            ['*', ['Readme', 'Props', '*']],
            'Icons',
            ['Readme', 'All Icons', '*', ['Readme', 'Props', '*']],
            '*',
            ['Readme', 'Props', '*', ['Readme', 'Props', '*']],
          ],
          'layout',
          ['*', ['Readme', 'Props', '*', ['Readme', 'Props', '*']]],
          'components',
          ['*', ['Readme', 'Props', '*', ['Readme', 'Props', '*']]],
          'Form',
          [
            'Readme',
            'Inputs',
            ['Readme', '*', ['Readme', 'Props', '*']],
            'Fields',
            ['Readme', '*', ['Readme', 'Props', '*']],
          ],
        ],
      },
    },
  },
  decorators: [withThemeDecorator, WithIntlDecorator],
  tags: ['autodocs'],
};

export default preview;
