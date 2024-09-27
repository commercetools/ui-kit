import type { Meta, StoryFn } from '@storybook/react';
import { MenuProps, MenuListProps } from 'react-select';
import { useState, useCallback } from 'react';
import FiltersList from './filters-list';
import SelectInput from '../../../inputs/select-input';

const meta: Meta<typeof FiltersList> = {
  title: 'components/Filters/FiltersList',
  component: FiltersList,
  tags: ['local-dev'],
  argTypes: {},
};
export default meta;

type Story = StoryFn<typeof FiltersList>;

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

const primaryColorOptions = [
  { label: 'Blue', value: 'blue', key: 'blue', id: '2' },
  { label: 'Red', value: 'red', key: 'red', id: '4' },
  { label: 'Orange', value: 'orange', key: 'orange', id: '5' },
  { label: 'Yellow', value: 'yellow', key: 'yellow', id: '6' },
  { label: 'Green', value: 'green', key: 'green', id: '7' },
];

const secondaryColorOptions = [
  { label: 'Purple', value: 'purple', key: 'purple', id: '3' },
  { label: 'Forest', value: 'forest', key: 'forest', id: '8' },
  { label: 'Slate', value: 'slate', key: 'slate', id: '9' },
  { label: 'Silver', value: 'silver', key: 'silver', id: '10' },
];

export const BasicExample: Story = () => {
  const [primaryColorValue, setPrimaryColorValue] = useState<string[]>([]);
  const [secondaryColorValue, setSecondaryColorValue] = useState<string[]>([]);

  const clearPrimaryColorFilter = () => setPrimaryColorValue([]);
  const clearSecondaryColorFilter = () => setSecondaryColorValue([]);

  const getPrimaryColorTags = useCallback(() => {
    return primaryColorValue.length > 0
      ? primaryColorValue.map((value) => ({
          key: value,
          label: value.toUpperCase(),
        }))
      : [];
  }, [primaryColorValue]);

  const getSecondaryColorTags = useCallback(() => {
    return secondaryColorValue.length > 0
      ? secondaryColorValue.map((value) => ({
          key: value,
          label: value.toUpperCase(),
        }))
      : [];
  }, [secondaryColorValue]);

  const clearAllFilters = () => {
    clearPrimaryColorFilter();
    clearSecondaryColorFilter();
  };

  const filters = [
    {
      key: 'primaryColors',
      label: 'Primary Colors',
      groupKey: 'primaryColors',
      getTags: getPrimaryColorTags,
      onClearRequest: clearPrimaryColorFilter,
    },
    {
      key: 'secondaryColors',
      label: 'Secondary Colors',
      groupKey: 'secondaryColors',
      getTags: getSecondaryColorTags,
      onClearRequest: clearSecondaryColorFilter,
    },
  ];

  const filterConfigs = [
    {
      filterKey: 'primaryColors',
      name: 'primaryColorsSelect',
      options: primaryColorOptions,
      value: primaryColorValue,
      setValue: setPrimaryColorValue,
      isMulti: false,
    },
    {
      filterKey: 'secondaryColors',
      name: 'secondaryColorsSelect',
      options: secondaryColorOptions,
      value: secondaryColorValue,
      setValue: setSecondaryColorValue,
      isMulti: true,
    },
  ];

  const filterGroups = [
    { key: 'secondaryColors', label: <div>SECONDARY COLORS</div> },
    { key: 'primaryColors', label: <div>PRIMARY!!!</div> },
  ];

  return (
    <div
      style={{
        height: 500,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FiltersList
        filters={filters}
        onClearAllRequest={clearAllFilters}
        filterGroups={filterGroups}
      >
        {filterConfigs.map(
          ({ filterKey, name, options, value, setValue, isMulti = false }) => (
            <div key={filterKey} id={filterKey}>
              <SelectInput
                name={name}
                options={options}
                value={value}
                onChange={(e) =>
                  setValue(
                    Array.prototype.concat(e.target.value ? e.target.value : [])
                  )
                }
                components={{
                  Menu: CustomSelectMenu,
                  MenuList: CustomMenuList,
                }}
                menuIsOpen={true}
                controlShouldRenderValue={false}
                isMulti={isMulti}
              />
            </div>
          )
        )}
      </FiltersList>
    </div>
  );
};
