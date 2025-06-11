import { useState } from 'react';
import { designTokens } from '@commercetools-uikit/design-system';
import RadioInput from '@commercetools-uikit/radio-input';
import SearchTextInput from '@commercetools-uikit/search-text-input';
import SelectInput from '@commercetools-uikit/select-input';
import TextInput from '@commercetools-uikit/text-input';
import DateInput from '@commercetools-uikit/date-input';
import DateTimeInput from '@commercetools-uikit/date-time-input';
import DateRangeInput from '@commercetools-uikit/date-range-input';
import {
  PRIMARY_COLOR_OPTIONS,
  SECONDARY_COLOR_OPTIONS,
  FRUIT_OPTIONS,
  OPERATOR_OPTIONS,
  DATE_OPERATOR_OPTIONS,
} from './constants';

type TFiltersSelectExampleProps = {
  value: string[];
  onChange: Function;
};

type TFiltersInputExampleProps = {
  value: string;
  onChange: Function;
};

type TDateFilterWithOperatorProps = {
  value: string | string[];
  onChange: Function;
  operator: string;
};

type TDateRangeFilterProps = {
  value: string[];
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
        <span css={{ fontSize: designTokens.fontSize20 }}>{option.label}</span>
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

export const DateRangeFilterInput = ({
  value,
  onChange,
}: TDateRangeFilterProps) => (
  <DateRangeInput
    name="date-range-filter"
    id="date-range-filter"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    appearance="filter"
    placeholder="Select date range"
    isClearable={false}
  />
);

export const DateFilterWithOperator = ({
  value,
  onChange,
  operator,
}: TDateFilterWithOperatorProps) => {
  // Use DateRangeInput for "is between" operator, DateInput for others
  if (operator === 'is between') {
    return (
      <DateRangeInput
        name="date-filter-range"
        id="date-filter-range"
        value={Array.isArray(value) ? value : []}
        onChange={(e) => onChange(e.target.value)}
        appearance="filter"
        placeholder="Select date range"
        isClearable={false}
      />
    );
  }

  return (
    <DateInput
      name="date-filter-single"
      id="date-filter-single"
      value={Array.isArray(value) ? value[0] || '' : value}
      onChange={(e) => onChange(e.target.value)}
      appearance="filter"
      placeholder="Select date"
    />
  );
};

export const DateTimeFilterWithOperator = ({
  value,
  onChange,
  operator,
}: TDateFilterWithOperatorProps) => {
  // Use DateRangeInput for "is between" operator, DateTimeInput for others
  if (operator === 'is between') {
    return (
      <DateRangeInput
        name="datetime-filter-range"
        id="datetime-filter-range"
        value={Array.isArray(value) ? value : []}
        onChange={(e) => onChange(e.target.value)}
        appearance="filter"
        placeholder="Select date range"
        isClearable={false}
      />
    );
  }

  return (
    <DateTimeInput
      name="datetime-filter-single"
      id="datetime-filter-single"
      value={Array.isArray(value) ? value[0] || '' : value}
      onChange={(e) => onChange(e.target.value)}
      appearance="filter"
      timeZone="UTC"
      placeholder="Select date and time"
    />
  );
};

export const DateOperatorsInput = ({
  value,
  onChange,
}: TFiltersInputExampleProps) => (
  <SelectInput
    name="date-operators-input"
    id="date-operators-input"
    aria-label="select date operators"
    appearance="quiet"
    isCondensed={true}
    isSearchable={false}
    value={value}
    options={DATE_OPERATOR_OPTIONS}
    onChange={(event) => {
      onChange(event.target.value as string);
    }}
  />
);
