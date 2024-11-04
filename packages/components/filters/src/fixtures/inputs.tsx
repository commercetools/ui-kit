import { useState } from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import RadioInput from '@commercetools-uikit/radio-input';
import SearchTextInput from '@commercetools-uikit/search-text-input';
import SelectInput from '@commercetools-uikit/select-input';
import TextInput from '@commercetools-uikit/text-input';
import { ContainerProps, MenuProps, MenuListProps } from 'react-select';
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

const CustomSelectContainer = ({
  children,
  innerProps: { ref, ...restInnerProps },
}: ContainerProps) => (
  <div
    data-testid="uikit-custom-filters-select"
    css={css`
      height: 100%;
    `}
    ref={ref}
    {...restInnerProps}
  >
    {children}
  </div>
);

const CustomSelectMenu = ({
  children,
  innerProps: { ref, ...restInnerProps },
}: MenuProps) => (
  <div
    ref={ref}
    css={css`
      margin-top: ${designTokens.spacing20};
      max-width: 100%;
      max-height: calc(100% - ${designTokens.spacing60});
      overflow: hidden auto;
    `}
    {...restInnerProps}
  >
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
    components={{
      SelectContainer: CustomSelectContainer,
      Menu: CustomSelectMenu,
      MenuList: CustomMenuList,
    }}
    menuIsOpen={true}
    controlShouldRenderValue={false}
    hideSelectedOptions={false}
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
    components={{
      SelectContainer: CustomSelectContainer,
      Menu: CustomSelectMenu,
      MenuList: CustomMenuList,
    }}
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
