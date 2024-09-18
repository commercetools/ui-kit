import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { MenuProps, MenuListProps } from 'react-select';
import FilterMenu, { type TAppliedFilterValue } from './filter-menu';
import SelectInput from '../../../inputs/select-input';

const meta: Meta<typeof FilterMenu> = {
  title: 'components/Filters/FilterMenu',
  component: FilterMenu,
  tags: ['local-dev'],
  argTypes: {
    label: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryFn<typeof FilterMenu>;

const operatorsOptions = [
  { value: 'OR', label: 'OR' },
  { value: 'AND', label: 'AND' },
];

const colorOptions = [
  { label: 'Blue', value: 'blue', key: 'blue', id: '2' },
  { label: 'Purple', value: 'purple', key: 'purple', id: '3' },
  { label: 'Red', value: 'red', key: 'red', id: '4' },
  { label: 'Orange', value: 'orange', key: 'orange', id: '5' },
  { label: 'Yellow', value: 'yellow', key: 'yellow', id: '6' },
  { label: 'Green', value: 'green', key: 'green', id: '7' },
  { label: 'Forest', value: 'forest', key: 'forest', id: '8' },
  { label: 'Slate', value: 'slate', key: 'slate', id: '9' },
  { label: 'Silver', value: 'silver', key: 'silver', id: '10' },
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
  const [filterValue, onFilterChange] = useState<string[]>([]);

  const [appliedFilter, setAppliedFilter] = useState<TAppliedFilterValue[]>([]);

  const [operatorsValue, onChangeOperators] = useState<
    string | null | undefined
  >(undefined);

  return (
    <div
      style={{
        height: 300,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FilterMenu
        filterKey="colors"
        label="Colors"
        appliedFilterValues={appliedFilter}
        filter={
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
                  .map((value) => ({ label: value }))
              );
            }}
            menuIsOpen={true}
            value={filterValue}
            components={{ Menu: CustomSelectMenu, MenuList: CustomMenuList }}
            controlShouldRenderValue={false}
            isMulti
          />
        }
        onRemoveFilter={() => {
          onFilterChange([]);
          setAppliedFilter([]);
          alert('this would make the component disappear!');
        }}
        operatorsInput={
          <SelectInput
            value={operatorsValue}
            onChange={(e) => onChangeOperators(e.target.value as string)}
            options={operatorsOptions}
          />
        }
        onApplyFilter={() =>
          setAppliedFilter(
            Array.prototype
              .concat(filterValue)
              .map((value) => ({ label: value }))
          )
        }
        onClearFilter={() => {
          setAppliedFilter([]);
          onFilterChange([]);
        }}
        onFilterOptionsSortClick={() => {
          alert('filter options sorted! (in consuming application)');
        }}
      />
    </div>
  );
};
