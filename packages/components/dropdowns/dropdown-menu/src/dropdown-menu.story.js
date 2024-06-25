import { Value } from 'react-value';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, number } from '@storybook/addon-knobs/react';
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
import Readme from '../README.md';

import DropdownMenu from './dropdown-menu';

storiesOf('Components|Dropdowns|DropdownMenu', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme at the addons panel
      sidebar: Readme,
    },
  })
  .add('DropdownMenu - List menu content', () => {
    const optionsCount = number('Options count', 5);
    return (
      <Section align="center">
        <DropdownMenu
          triggerElement={<IconButton icon={<ColumnsIcon />} label="list" />}
          menuHorizontalConstraint={select(
            'menu horizontalConstraint',
            Constraints.getAcceptedMaxPropValues(),
            6
          )}
          menuPosition={select('Menu position', ['left', 'right'], 'left')}
          menuMaxHeight={number('menuMaxHeight', 0)}
          menuType="list"
        >
          {new Array(optionsCount).fill().map((_, index) => (
            <DropdownMenu.ListMenuItem
              key={index}
              onClick={action('onClick')}
            >{`Option ${index + 1}`}</DropdownMenu.ListMenuItem>
          ))}
        </DropdownMenu>
      </Section>
    );
  })
  .add('DropdownMenu - Complex menu content', () => (
    <Section align="center">
      <DropdownMenu
        triggerElement={
          <SecondaryButton label="Filters" iconLeft={<FilterIcon />} />
        }
        menuHorizontalConstraint={select(
          'menu horizontalConstraint',
          Constraints.getAcceptedMaxPropValues(),
          6
        )}
        menuPosition={select('Menu position', ['left', 'right'], 'left')}
      >
        <SpacingsStack scale="m">
          <SpacingsInline scale="s" alignItems="center">
            <Text.Body>Store</Text.Body>
            <Value
              defaultValue="is"
              render={(value, onChange) => {
                return (
                  <SelectInput
                    appearance="quiet"
                    value={value}
                    menuPortalTarget={document.body}
                    menuPortalZIndex={5}
                    onChange={(event) => onChange(event.target.value)}
                    options={[
                      { value: 'is', label: 'is' },
                      { value: 'is not', label: 'is not' },
                    ]}
                  />
                );
              }}
            />
          </SpacingsInline>
          <Value
            render={(value, onChange) => (
              <SelectInput
                value={value}
                onChange={(event) => onChange(event.target.value)}
                menuPortalTarget={document.body}
                menuPortalZIndex={5}
                options={[
                  { value: 'laval', label: 'Laval Montreal' },
                  { value: 'forest', label: 'Forest Ottawa' },
                  { value: 'squirrel', label: 'Squirrel Whistler' },
                ]}
                placeholder="Select or type store key"
              />
            )}
          />
          <Value
            defaultValue={true}
            render={(value, onChange) => (
              <CheckboxInput
                isChecked={value}
                value="store"
                onChange={(event) => onChange(event.target.checked)}
              >
                Canada (FR)
              </CheckboxInput>
            )}
          />
        </SpacingsStack>
      </DropdownMenu>
    </Section>
  ))
  .add('DropdownMenu - Reposition menu if necessary', () => {
    const optionsCount = number('Options count', 5);
    return (
      <Section align="center">
        <div>
          {[
            {
              id: 1,
              position: 'absolute',
              top: 24,
              left: 24,
            },
            {
              id: 2,
              position: 'absolute',
              top: 24,
              right: 24,
            },
            {
              id: 3,
              position: 'absolute',
              bottom: 24,
              right: 24,
            },
            {
              id: 4,
              position: 'absolute',
              bottom: 24,
              left: 24,
            },
            {
              id: 5,
              position: 'absolute',
              top: '50%',
              left: '50%',
            },
          ].map((css) => (
            <div key={css.id} style={{ ...css }}>
              <DropdownMenu
                triggerElement={
                  <IconButton icon={<ColumnsIcon />} label="list" />
                }
                menuHorizontalConstraint={select(
                  'menu horizontalConstraint',
                  Constraints.getAcceptedMaxPropValues(),
                  6
                )}
                menuPosition={select(
                  'Menu position',
                  ['left', 'right'],
                  'left'
                )}
                menuMaxHeight={number('menuMaxHeight', 0)}
                menuType="list"
              >
                {new Array(optionsCount).fill().map((_, index) => (
                  <DropdownMenu.ListMenuItem
                    key={index}
                    onClick={action('onClick')}
                  >{`Option ${index + 1}`}</DropdownMenu.ListMenuItem>
                ))}
              </DropdownMenu>
            </div>
          ))}
        </div>
      </Section>
    );
  });
