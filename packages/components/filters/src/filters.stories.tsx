import { useState } from 'react';
import { designTokens } from '@commercetools-uikit/design-system';
import SelectInput from '@commercetools-uikit/select-input';
import { MenuProps, MenuListProps } from 'react-select';
import FilterMenu, { type TAppliedFilterValue } from './filter-menu';
import type { Meta, StoryFn } from '@storybook/react';
import Filters from './filters';

const meta: Meta<typeof Filters> = {
  title: 'components/Filters',
  component: Filters,
  tags: ['local-dev'],
  argTypes: {
    label: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryFn<typeof Filters>;

const colorOptions = [
  { label: 'Blue', value: 'blue', key: 'blue', id: '2' },
  { label: 'Purple', value: 'purple', key: 'purple', id: '3' },
  { label: 'Red', value: 'red', key: 'red', id: '4' },
  { label: 'Orange', value: 'orange', key: 'orange', id: '5' },
  {
    label: 'Yellowwwwwwwwwwwwwww',
    value: 'yellowwwwwwwwwwwwwwwwww',
    key: 'yellow',
    id: '6',
  },
  { label: 'Green', value: 'green', key: 'green', id: '7' },
  { label: 'Forest', value: 'forest', key: 'forest', id: '8' },
  { label: 'Slate', value: 'slate', key: 'slate', id: '9' },
  { label: 'Silver', value: 'silver', key: 'silver', id: '10' },
  { label: 'Merigold', value: 'Merigold', key: 'silver', id: '10' },
];
const CustomSelectMenu = ({
  children,
  innerProps: { ref, ...restInnerProps },
}: MenuProps) => (
  <div ref={ref} {...restInnerProps}>
    {children}
  </div>
);
const CustomMenuList = ({
  children,
  innerProps: { ref, ...restInnerProps },
}: MenuListProps) => (
  <div ref={ref} {...restInnerProps}>
    {children}
  </div>
);

export const BasicExample: Story = () => {
  const [filterValue, onFilterChange] = useState<string[]>([
    'blue',
    'purple',
    'red',
    'orange',
    'yellowwwwwwwwwwwwwwwwww',
    'green',
    'forest',
  ]);

  const [appliedFilter, setAppliedFilter] = useState<TAppliedFilterValue[]>([
    {
      value: 'blue',
      label: 'BLUE',
    },
    {
      value: 'purple',
      label: 'PURPLE',
    },
    {
      value: 'red',
      label: 'RED',
    },
    {
      value: 'orange',
      label: 'ORANGE',
    },
    {
      value: 'yellowwwwwwwwwwwwwwwwww',
      label: 'YELLOWWWWWWWWWWWWWWWWWW',
    },
    {
      value: 'green',
      label: 'GREEN',
    },
    {
      value: 'forest',
      label: 'FOREST',
    },
  ]);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: designTokens.spacing40,
      }}
    >
      <div style={{ width: '800px', border: 'solid 1px green' }}>
        800px:{' '}
        <FilterMenu
          filterKey="test"
          label="Testing"
          renderMenuBody={() => (
            <SelectInput
              name="colorsInput"
              options={colorOptions}
              onChange={(e) => {
                /**return an array whether or not e.target.value is a string or array */
                onFilterChange(
                  Array.prototype.concat(e.target.value ? e.target.value : [])
                );

                setAppliedFilter(
                  Array.prototype
                    .concat(e.target.value ? e.target.value : [])
                    .map((value) => ({ value, label: value.toUpperCase() }))
                );
              }}
              menuIsOpen={true}
              value={filterValue}
              components={{ Menu: CustomSelectMenu, MenuList: CustomMenuList }}
              controlShouldRenderValue={false}
              hideSelectedOptions={false}
              isMulti
            />
          )}
          appliedFilterValues={appliedFilter}
          onRemoveRequest={() => {}}
        />
      </div>
      <div style={{ width: '200px', border: 'solid 1px green' }}>
        200px:{' '}
        <FilterMenu
          filterKey="test1"
          label="Testing"
          renderMenuBody={() => (
            <SelectInput
              name="colorsInput"
              options={colorOptions}
              onChange={(e) => {
                /**return an array whether or not e.target.value is a string or array */
                onFilterChange(
                  Array.prototype.concat(e.target.value ? e.target.value : [])
                );

                setAppliedFilter(
                  Array.prototype
                    .concat(e.target.value ? e.target.value : [])
                    .map((value) => ({ value, label: value.toUpperCase() }))
                );
              }}
              menuIsOpen={true}
              value={filterValue}
              components={{ Menu: CustomSelectMenu, MenuList: CustomMenuList }}
              controlShouldRenderValue={false}
              hideSelectedOptions={false}
              isMulti
            />
          )}
          appliedFilterValues={appliedFilter}
          onRemoveRequest={() => {}}
        />
      </div>
    </div>
  );
};
