import type { Meta, StoryFn } from '@storybook/react';
import { useState, useCallback } from 'react';
import { MenuProps, MenuListProps } from 'react-select';
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
    if (primaryColorValue.length > 0) {
      return primaryColorValue.map((value) => ({
        key: value,
        label: value.toUpperCase(),
      }));
    }
    return [];
  }, [primaryColorValue]);

  const getSecondaryColorTags = useCallback(() => {
    if (secondaryColorValue.length > 0) {
      return secondaryColorValue.map((value) => ({
        key: value,
        label: value.toUpperCase(),
      }));
    }
    return [];
  }, [secondaryColorValue]);

  const clearAllFilters = () => {
    clearPrimaryColorFilter();
    clearSecondaryColorFilter();
  };

  const filterGroups = [
    { key: 'secondaryColors', label: <div>SECONDARY COLORS</div> },
    { key: 'primaryColors', label: <div>PRIMARY!!!</div> },
  ];

  const filters = [
    {
      key: 'primaryColors',
      label: 'Primary Colors',
      groupKey: 'primaryColors',
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <SelectInput
            name="primaryColorsSelect"
            options={primaryColorOptions}
            value={primaryColorValue}
            onChange={(e) =>
              setPrimaryColorValue(
                Array.prototype.concat(e.target.value ? e.target.value : [])
              )
            }
            components={{ Menu: CustomSelectMenu, MenuList: CustomMenuList }}
            menuIsOpen={true}
            controlShouldRenderValue={false}
          />
        ),
        onClearRequest: clearPrimaryColorFilter,
        getTags: getPrimaryColorTags,
      },
    },
    {
      key: 'secondaryColors',
      label: 'Secondary Colors',
      groupKey: 'secondaryColors',
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <SelectInput
            name="secondaryColorsSelect"
            options={secondaryColorOptions}
            value={secondaryColorValue}
            onChange={(e) =>
              setSecondaryColorValue(
                Array.prototype.concat(e.target.value ? e.target.value : [])
              )
            }
            components={{ Menu: CustomSelectMenu, MenuList: CustomMenuList }}
            menuIsOpen={true}
            controlShouldRenderValue={false}
            isMulti
          />
        ),
        onClearRequest: clearSecondaryColorFilter,
        getTags: getSecondaryColorTags,
      },
    },
  ];

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
      <FiltersList
        filters={filters}
        onClearAllRequest={clearAllFilters}
        filterGroups={filterGroups}
      />
    </div>
  );
};
