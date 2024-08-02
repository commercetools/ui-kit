import type { Meta, StoryFn } from '@storybook/react';
import DropdownMenu from './dropdown-menu';
import { SecondaryButton, IconButton } from '@commercetools-uikit/buttons';
import { ColumnsIcon, FilterIcon } from '@commercetools-uikit/icons';
import Constraints from '@commercetools-uikit/constraints/src';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import SelectInput from '@commercetools-uikit/select-input';
import Text from '@commercetools-uikit/text';
import { useState } from 'react';
import CheckboxInput from '@commercetools-uikit//checkbox-input';

const meta: Meta<typeof DropdownMenu> = {
  title: 'components/Dropdowns/DropdownMenu',
  component: DropdownMenu,
  subcomponents: {
    /**
     * todo: remove once sb fixed the following issue
     * @link https://github.com/storybookjs/storybook/issues/23170
     */
    // @ts-ignore
    'DropdownMenu.ListMenuItem': DropdownMenu.ListMenuItem,
  } as const,
  argTypes: {
    menuHorizontalConstraint: {
      control: {
        type: 'select',
      },
      options: Constraints.getAcceptedMaxPropValues(),
    },
    triggerElement: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryFn<typeof DropdownMenu>;

export const BasicExample: Story = ({ triggerElement, ...args }) => {
  return (
    <div
      style={{
        height: 256,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <DropdownMenu
        triggerElement={
          triggerElement || <IconButton icon={<ColumnsIcon />} label="list" />
        }
        menuPosition="left"
        menuType="list"
        {...args}
      >
        <DropdownMenu.ListMenuItem onClick={() => {}}>
          Option 1
        </DropdownMenu.ListMenuItem>
        <DropdownMenu.ListMenuItem onClick={() => {}} isDisabled>
          Option 2
        </DropdownMenu.ListMenuItem>
        <DropdownMenu.ListMenuItem onClick={() => {}}>
          Option 3
        </DropdownMenu.ListMenuItem>
      </DropdownMenu>
    </div>
  );
};

type SelectValueType = string | string[] | null | undefined;

/**
 * The `DrodwnMenu` component can display complex content, such as form elements.
 */
export const ComplexMenuContent: Story = ({ triggerElement, ...args }) => {
  const selectValueOptions = [
    { value: 'is', label: 'is' },
    { value: 'is not', label: 'is not' },
  ];
  const [selectValue, setSelectValue] = useState<SelectValueType>(
    selectValueOptions[0].value
  );

  const select2ValueOptions = [
    { value: 'laval', label: 'Laval Montreal' },
    { value: 'forest', label: 'Forest Ottawa' },
    { value: 'squirrel', label: 'Squirrel Whistler' },
  ];

  const [select2Value, setSelect2Value] = useState<SelectValueType>(
    selectValueOptions[0].value
  );

  const [isChecked, setIsChecked] = useState<boolean>(true);

  return (
    <div
      style={{
        height: 256,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <DropdownMenu
        triggerElement={
          triggerElement || (
            <SecondaryButton label="Filters" iconLeft={<FilterIcon />} />
          )
        }
        {...args}
      >
        <SpacingsStack scale="m">
          <SpacingsInline scale="s" alignItems="center">
            <Text.Body>Store</Text.Body>
            <SelectInput
              appearance="quiet"
              value={selectValue}
              menuPortalTarget={document.body}
              menuPortalZIndex={5}
              onChange={(event) => setSelectValue(event.target.value)}
              options={selectValueOptions}
            />
          </SpacingsInline>
          <SelectInput
            value={select2Value}
            onChange={(event) => setSelect2Value(event.target.value)}
            menuPortalTarget={document.body}
            menuPortalZIndex={5}
            options={select2ValueOptions}
            placeholder="Select or type store key"
          />
          <CheckboxInput
            isChecked={isChecked}
            value="store"
            onChange={(event) => setIsChecked(event.target.checked)}
          >
            Canada (FR)
          </CheckboxInput>
        </SpacingsStack>
      </DropdownMenu>
    </div>
  );
};

ComplexMenuContent.args = {
  menuType: 'default',
};

/**
 * If there is not enough space to show the `DrodwnMenu` in the desired position,
 * it will automatically adjust its position to fit in the available space.
 */
export const AutoAdjustPositions: Story = ({ triggerElement, ...args }) => {
  return (
    <div style={{ position: 'relative', height: 256, zIndex: 2 }}>
      {[
        {
          id: 1,
          position: 'absolute' as const,
          top: 24,
          left: 24,
        },
        {
          id: 2,
          position: 'absolute' as const,
          top: 24,
          right: 24,
        },
        {
          id: 3,
          position: 'absolute' as const,
          bottom: 24,
          right: 24,
        },
        {
          id: 4,
          position: 'absolute' as const,
          bottom: 24,
          left: 24,
        },
        {
          id: 5,
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
        },
      ].map(({ id, ...css }) => (
        <div key={id} style={{ ...css }}>
          <DropdownMenu
            triggerElement={
              triggerElement || (
                <IconButton icon={<ColumnsIcon />} label="list" />
              )
            }
            {...args}
          >
            {new Array(5).fill('').map((_, index) => (
              <DropdownMenu.ListMenuItem key={index}>{`Pick this option ${
                index + 1
              }`}</DropdownMenu.ListMenuItem>
            ))}
          </DropdownMenu>
        </div>
      ))}
    </div>
  );
};

AutoAdjustPositions.args = {
  menuType: 'list',
  menuHorizontalConstraint: 10,
};
