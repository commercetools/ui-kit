import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import Constraints from '@commercetools-uikit/constraints';
import IconButton from '@commercetools-uikit/icon-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import SelectInput from '@commercetools-uikit/select-input';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import Text from '@commercetools-uikit/text';
import Section from '../../../../../docs/.storybook/decorators/section/section';
import { FilterIcon, ColumnsIcon } from '../../../icons';

import DropdownMenu from './dropdown-menu';

storiesOf('Components|Dropdowns|DropdownMenu', module)
  .addDecorator(withKnobs)
  // .addParameters({
  //   readme: {
  //     // Show readme at the addons panel
  //     sidebar: Readme,
  //   },
  // })
  .add('DropdownMenu - List menu content NEW', () => (
    <Section align="center">
      <DropdownMenu
        triggerElement={<IconButton icon={<ColumnsIcon />} label="list" />}
        menuType="list"
        menuPosition={select('Menu position', ['left', 'right'], 'left')}
        menuHorizontalConstraint={select(
          'menu horizontalConstraint',
          Constraints.getAcceptedMaxPropValues(),
          6
        )}
      >
        <DropdownMenu.ListMenuItem onClick={action('onClick')}>
          <span>Option 1 of many more to come</span>
        </DropdownMenu.ListMenuItem>
        <DropdownMenu.ListMenuItem onClick={action('onClick')} isDisabled>
          <span>Option 2</span>
        </DropdownMenu.ListMenuItem>
        <DropdownMenu.ListMenuItem onClick={action('onClick')}>
          <span>Option 3</span>
        </DropdownMenu.ListMenuItem>
      </DropdownMenu>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
    </Section>
  ))
  .add('DropdownMenu - List menu content', () => (
    <Section>
      <DropdownMenu>
        <DropdownMenu.Trigger>
          <IconButton icon={<ColumnsIcon />} label="list" />
        </DropdownMenu.Trigger>

        <DropdownMenu.ListMenu
          horizontalConstraint={select(
            'menu horizontalConstraint',
            Constraints.getAcceptedMaxPropValues(),
            6
          )}
        >
          <DropdownMenu.ListMenuItem onClick={action('onClick')}>
            <span>Option 1 of many more to come</span>
          </DropdownMenu.ListMenuItem>
          <DropdownMenu.ListMenuItem onClick={action('onClick')} isDisabled>
            <span>Option 2</span>
          </DropdownMenu.ListMenuItem>
          <DropdownMenu.ListMenuItem onClick={action('onClick')}>
            <span>Option 3</span>
          </DropdownMenu.ListMenuItem>
        </DropdownMenu.ListMenu>
      </DropdownMenu>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
      <h2>Quien te cuida a ti?</h2>
    </Section>
  ))
  .add('DropdownMenu - Complex menu content', () => (
    <Section align="center">
      <DropdownMenu
        menuPosition={select('Menu position', ['left', 'right'], 'left')}
      >
        <DropdownMenu.Trigger>
          <SecondaryButton label="Filters" iconLeft={<FilterIcon />} />
        </DropdownMenu.Trigger>

        <DropdownMenu.ContentMenu
          horizontalConstraint={select(
            'menu horizontalConstraint',
            Constraints.getAcceptedMaxPropValues(),
            6
          )}
        >
          <SpacingsStack scale="m">
            <SpacingsInline scale="s" alignItems="center">
              <Text.Body>Store</Text.Body>
              <SelectInput
                appearance="quiet"
                value="is"
                onChange={action('onChange')}
                options={[
                  { value: 'is', label: 'is' },
                  { value: 'is not', label: 'is not' },
                ]}
              />
            </SpacingsInline>
            <SelectInput
              onChange={action('onChange')}
              options={[
                { value: 'laval', label: 'Laval Montreal' },
                { value: 'forest', label: 'Forest Ottawa' },
                { value: 'squirrel', label: 'Squirrel Whistler' },
              ]}
              placeholder="Select or type store key"
            />
            <CheckboxInput
              isChecked
              value="store"
              onChange={action('onChange')}
            >
              Canada (FR)
            </CheckboxInput>
          </SpacingsStack>
        </DropdownMenu.ContentMenu>
      </DropdownMenu>
    </Section>
  ));
