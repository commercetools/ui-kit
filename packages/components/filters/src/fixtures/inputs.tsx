import { useState } from 'react';
import RadioInput from '@commercetools-uikit/radio-input';
import SearchTextInput from '@commercetools-uikit/search-text-input';
import SelectInput from '@commercetools-uikit/select-input';
import TextInput from '@commercetools-uikit/text-input';
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
    appearance="filter"
    optionStyle="checkbox"
    isMulti
  />
);

export const PrimaryColorsTextInput = ({
  value,
  onChange,
}: TFiltersInputExampleProps) => (
  <TextInput
    name="primaryColorsTextInput"
    value={value}
    onChange={(e) => onChange([e.target.value])}
    placeholder="enter a color name..."
  />
);

export const PrimaryColorsRadioInput = ({
  value,
  onChange,
}: TFiltersInputExampleProps) => (
  <RadioInput.Group
    id="fruit-selector"
    name="fruits"
    value={value}
    onChange={(e) => {
      onChange([e.target.value]);
    }}
  >
    {PRIMARY_COLOR_OPTIONS.map((option) => (
      <RadioInput.Option key={option.value} value={option.value}>
        {option.label}
      </RadioInput.Option>
    ))}
  </RadioInput.Group>
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
    appearance="filter"
    optionStyle="checkbox"
    isMulti
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

export const SelectedValueWithOperator = ({
  operator,
  value,
}: {
  operator: string;
  value: string;
}) => (
  <div>
    <span
      css={{
        fontStyle: 'italic',
        marginRight: '4px',
        fontWeight: '600',
      }}
    >
      {operator}
    </span>
    {value}
  </div>
);
