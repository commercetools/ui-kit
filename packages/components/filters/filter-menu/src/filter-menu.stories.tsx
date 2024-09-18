import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { type MenuProps, type MenuListProps } from 'react-select';
import FilterMenu, { type TAppliedFilterValue } from './filter-menu';
import SelectInput from '../../../inputs/select-input';

const meta: Meta<typeof FilterMenu> = {
  title: 'components/Filters/FilterMenu',
  component: FilterMenu,
  //tags: ['local-dev'],
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
  { label: 'Brown', value: 'brown', key: 'brown', id: '11' },
  { label: 'Black', value: 'black', key: 'black', id: '12' },
  { label: 'Bisque', value: 'bisque', key: 'bisque', id: '13' },
  {
    label: 'Darkgoldenrod',
    value: 'darkgoldenrod',
    key: 'darkgoldenrod',
    id: '14',
  },
  {
    label: 'Mediumaquamarine',
    value: 'mediumaquamarine',
    key: 'mediumaquamarine',
    id: '15',
  },
];
const CustomSelectMenu = ({ children, ...rest }: MenuProps) => (
  <div {...rest}>{children}</div>
);
const CustomMenuList = ({ children, ...rest }: MenuListProps) => (
  <div {...rest}>{children}</div>
);
export const BasicExample: Story = () => {
  const [filterValue, onFilterChange] = useState<
    string | string[] | null | undefined
  >(undefined);

  const [appliedFilter, setAppliedFilter] = useState<
    TAppliedFilterValue[] | undefined | null
  >([]);

  const [operatorsValue, onChangeOperators] = useState<
    string | null | undefined
  >(undefined);

  return (
    <div
      style={{
        outline: '1px solid tomato',
        maxWidth: 468,
      }}
    >
      <FilterMenu
        filterKey="colors"
        label="Color"
        appliedFilterValues={appliedFilter}
        filter={
          <SelectInput
            options={colorOptions}
            onChange={(e) => {
              onFilterChange(e.target.value);
              Array.isArray(e.target.value)
                ? setAppliedFilter(
                    e.target.value.map((value) => ({ label: value }))
                  )
                : setAppliedFilter([{ label: e.target.value as string }]);
            }}
            menuIsOpen={true}
            value={filterValue}
            components={{ Menu: CustomSelectMenu, MenuList: CustomMenuList }}
            controlShouldRenderValue={false}
            isMulti
          />
        }
        onRemoveFilter={() => {
          onFilterChange(undefined);
          setAppliedFilter(undefined);
          alert('this would make the component disappear!');
        }}
        operatorsInput={
          <SelectInput
            value={operatorsValue}
            onChange={(e) => onChangeOperators(e.target.value as string)}
            options={operatorsOptions}
          />
        }
        onApplyFilter={() => {
          if (filterValue) {
            const valuesToApply = Array.isArray(filterValue)
              ? filterValue.map((value) => ({ label: value }))
              : [{ label: filterValue }];
            setAppliedFilter(valuesToApply);
          } else {
            setAppliedFilter(undefined);
          }
        }}
        onClearFilter={() => {
          setAppliedFilter(undefined);
          onFilterChange(undefined);
        }}
        onFilterOptionsSortClick={() => {
          alert('filter options sorted! (in consuming application)');
        }}
      />
    </div>
  );
};
