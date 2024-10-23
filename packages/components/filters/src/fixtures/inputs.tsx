import { useState } from 'react';
import RadioInput from '@commercetools-uikit/radio-input';
import SearchTextInput from '@commercetools-uikit/search-text-input';
import SelectInput from '@commercetools-uikit/select-input';
import TextInput from '@commercetools-uikit/text-input';
import { MenuProps, MenuListProps } from 'react-select';
import {
  PRIMARY_COLOR_OPTIONS,
  SECONDARY_COLOR_OPTIONS,
  FRUIT_OPTIONS,
  OPERATOR_OPTIONS,
} from './constants';

type TFiltersSelectExampleProps = {
  value: string[];
  onChange: Function;
};

type TFiltersInputExampleProps = {
  value: string;
  onChange: Function;
};

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

export const PrimaryColorsInput = ({
  value,
  onChange,
}: TFiltersSelectExampleProps) => (
  <SelectInput
    name="primaryColorsSelect"
    id="primaryColorsSelect"
    aria-label="select primary colors"
    options={PRIMARY_COLOR_OPTIONS}
    value={value}
    onChange={(e) =>
      onChange(Array.prototype.concat(e.target.value ? e.target.value : []))
    }
    components={{ Menu: CustomSelectMenu, MenuList: CustomMenuList }}
    menuIsOpen={true}
    controlShouldRenderValue={false}
    hideSelectedOptions={false}
    isMulti
  />
);

export const SecondaryColorsInput = ({
  value,
  onChange,
}: TFiltersSelectExampleProps) => (
  <SelectInput
    name="secondaryColorsSelect"
    id="secondaryColorsSelect"
    aria-label="select secondary colors"
    options={SECONDARY_COLOR_OPTIONS}
    value={value}
    onChange={(e) =>
      onChange(Array.prototype.concat(e.target.value ? e.target.value : []))
    }
    components={{ Menu: CustomSelectMenu, MenuList: CustomMenuList }}
    menuIsOpen={true}
    controlShouldRenderValue={false}
    isMulti
    backspaceRemovesValue={false}
    isClearable={false}
    hideSelectedOptions={false}
  />
);

export const ColorNameTextInput = ({
  value,
  onChange,
}: TFiltersInputExampleProps) => (
  <TextInput
    name="colorNameInput"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder="enter a color name..."
  />
);

export const FruitsRadioInput = ({
  value,
  onChange,
}: TFiltersInputExampleProps) => (
  <RadioInput.Group
    id="fruit-selector"
    name="fruits"
    value={value}
    onChange={(e) => {
      onChange(e.target.value);
    }}
  >
    {FRUIT_OPTIONS.map((option) => (
      <RadioInput.Option key={option.value} value={option.value}>
        {option.label}
      </RadioInput.Option>
    ))}
  </RadioInput.Group>
);

export const SearchInputComponent = () => {
  const [query, setQuery] = useState('');
  return (
    <SearchTextInput
      name="searchQueryInput"
      placeholder="search"
      onChange={(e) => setQuery(e.target.value)}
      value={query}
      onSubmit={() => {}}
      onReset={() => setQuery('')}
    />
  );
};

export const OperatorsInput = ({
  value,
  onChange,
}: TFiltersInputExampleProps) => (
  <SelectInput
    name="operators-input"
    id="operators-input"
    aria-label="select operators"
    appearance="quiet"
    isCondensed={true}
    isSearchable={false}
    value={value}
    options={OPERATOR_OPTIONS}
    onChange={(event) => {
      onChange(event.target.value as string);
    }}
  />
);
