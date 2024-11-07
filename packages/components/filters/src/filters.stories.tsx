import { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import RadioInput from '@commercetools-uikit/radio-input';
import SearchTextInput from '@commercetools-uikit/search-text-input';
import SelectInput from '@commercetools-uikit/select-input';
import TextInput from '@commercetools-uikit/text-input';
import { MenuProps, MenuListProps } from 'react-select';
import Filters, { type TFiltersProps } from './filters';

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

// const filterGroups = [
//   { key: 'secondaryColors', label: <div>Secondary Colors</div> },
//   { key: 'primaryColors', label: <div>Primary Colors</div> },
// ];

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

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  return (
    <SearchTextInput
      placeholder="search"
      onChange={(e) => setQuery(e.target.value)}
      value={query}
      onSubmit={() => {}}
      onReset={() => setQuery('')}
    />
  );
};

// const RadioComponent = () => {
//   const [v, setV] = useState('1');

//   return (

//   );
// };

const meta: Meta<typeof Filters> = {
  title: 'components/Filters',
  component: Filters,
  // tags: ['local-dev'],
  argTypes: {},
};

export default meta;

type Story = StoryFn<typeof Filters>;

//TODO: operators inputs, apply buttons, etc
export const BasicExample: Story = (_props: TFiltersProps) => {
  const [primaryColorValue, setPrimaryColorValue] = useState<string[]>([]);
  const [secondaryColorValue, setSecondaryColorValue] = useState<string[]>([]);
  const [colorNameValue, setColorName] = useState<string>('');
  const [fruitsValue, setFruitsValue] = useState<string>('');

  const clearPrimaryColorFilter = () => setPrimaryColorValue([]);
  const clearSecondaryColorFilter = () => setSecondaryColorValue([]);
  const clearColorNameFilter = () => setColorName('');
  const clearFruitsFilter = () => setFruitsValue('');

  const clearAllFilters = () => {
    clearPrimaryColorFilter();
    clearSecondaryColorFilter();
    clearColorNameFilter();
    clearFruitsFilter();
  };

  const appliedFilters = [];

  if (primaryColorValue.length > 0) {
    appliedFilters.push({
      filterKey: 'primaryColors',
      values: primaryColorValue.map((value) => ({
        value: value,
        label: value,
      })),
    });
  }

  if (secondaryColorValue.length > 0) {
    appliedFilters.push({
      filterKey: 'secondaryColors',
      values: secondaryColorValue.map((value) => ({
        value: value,
        label: value,
      })),
    });
  }

  if (colorNameValue) {
    appliedFilters.push({
      filterKey: 'colorName',
      values: [
        {
          value: colorNameValue,
          label: colorNameValue,
        },
      ],
    });
  }
  if (fruitsValue) {
    appliedFilters.push({
      filterKey: 'fruits',
      values: [
        {
          value: fruitsValue,
          label: fruitsValue,
        },
      ],
    });
  }

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
            hideSelectedOptions={false}
            isMulti
          />
        ),
        onClearRequest: clearPrimaryColorFilter,
      },
    },
    {
      key: 'secondaryColors',
      label: 'Secondary Colors',
      groupKey: 'secondaryColors',
      isPersistent: true,
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
            backspaceRemovesValue={false}
            isClearable={false}
            hideSelectedOptions={false}
          />
        ),
        onClearRequest: clearSecondaryColorFilter,
      },
    },
    {
      key: 'colorName',
      label: 'Color Name',
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <TextInput
            name="colorNameInput"
            value={colorNameValue}
            onChange={(e) => setColorName(e.target.value)}
            placeholder="enter a color name..."
          />
        ),
        onClearRequest: clearColorNameFilter,
      },
    },
    {
      key: 'fruits',
      label: 'Fruits',
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <RadioInput.Group
            id="fruit-selector"
            name="fruits"
            value={fruitsValue}
            onChange={(e) => {
              console.log(e);
              setFruitsValue(e.target.value);
            }}
          >
            <RadioInput.Option value="🍎">🍎 Apple</RadioInput.Option>
            <RadioInput.Option value="🍌">🍌 Banana</RadioInput.Option>
            <RadioInput.Option value="🍍">🍍 Pineapple</RadioInput.Option>
          </RadioInput.Group>
        ),
        onClearRequest: clearFruitsFilter,
      },
    },
  ];

  return (
    <Filters
      renderSearchComponent={SearchComponent}
      filters={filters}
      // filterGroups={filterGroups}
      appliedFilters={appliedFilters}
      onClearAllRequest={clearAllFilters}
    />
  );
};
