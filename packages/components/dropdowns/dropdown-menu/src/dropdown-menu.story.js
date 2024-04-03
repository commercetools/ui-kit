import { createElement } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react';
import Section from '../../../../../docs/.storybook/decorators/section/section';
import { FilterIcon } from '../../../icons';
import SecondaryButton from '@commercetools-uikit/secondary-button';

import DropdownMenu from './dropdown-menu';

storiesOf('Components|Dropdowns|DropdownMenu', module)
  .addDecorator(withKnobs)
  // .addParameters({
  //   readme: {
  //     // Show readme at the addons panel
  //     sidebar: Readme,
  //   },
  // })
  .add('Dropdown Menu', () => (
    <Section>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <SecondaryButton label="Filters" iconLeft={<FilterIcon />} />
        </DropdownMenu.Trigger>

        <DropdownMenu.ContentMenu>
          <span>My complex content</span>
        </DropdownMenu.ContentMenu>
      </DropdownMenu>
    </Section>
  ));
