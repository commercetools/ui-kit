import type { Preview } from '@storybook/react-vite';

import intlGlobalType from './../src/global-types/intl-global';

import '../../design-system/materials/resets.css';
import { WithIntlDecorator } from '../src/decorators/intl-decorator';
import { withThemeDecorator } from '../src/decorators/theme-decorator';
import { withPaddingDecorator } from '../src/decorators/padding-decorator';

const preview: Preview = {
  globalTypes: {
    locale: intlGlobalType,
  },
  parameters: {
    // Capture is opt-in: a story overrides this with
    // `chromatic: { disableSnapshot: false }`.
    chromatic: { disableSnapshot: true },
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
            ['*', ['Readme', 'Props', 'Basic Example', '*']],
            'Icons',
            [
              'Readme',
              'All Icons',
              '*',
              ['Readme', 'Props', 'Basic Example', '*'],
            ],
            '*',
            [
              'Readme',
              'Props',
              'Basic Example',
              '*',
              ['Readme', 'Props', 'Basic Example', '*'],
            ],
          ],
          'layout',
          [
            '*',
            [
              'Readme',
              'Props',
              'Basic Example',
              '*',
              ['Readme', 'Props', 'Basic Example', '*'],
            ],
          ],
          'components',
          [
            '*',
            [
              'Readme',
              'Props',
              'Basic Example',
              '*',
              ['Readme', 'Props', 'Basic Example', '*'],
            ],
          ],
          'Form',
          [
            'Readme',
            'Inputs',
            ['Readme', '*', ['Readme', 'Props', 'Basic Example', '*']],
            'Fields',
            ['Readme', '*', ['Readme', 'Props', 'Basic Example', '*']],
          ],
        ],
      },
    },

    docs: {
      codePanel: true,
    },
  },
  decorators: [withThemeDecorator, WithIntlDecorator, withPaddingDecorator],
  tags: ['autodocs'],
};

export default preview;
