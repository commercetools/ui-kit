import type { Meta, StoryFn } from '@storybook/react';
import SearchSelectInput from './search-select-input';
import { iconArgType } from '@/storybook-helpers';
import { useState, useEffect } from 'react';
import Spacings from '@commercetools-uikit/spacings';

const meta: Meta<typeof SearchSelectInput> = {
  title: 'Form/Inputs/SearchSelectInput',
  component: SearchSelectInput,
  argTypes: {
    iconLeft: iconArgType,
    isMulti: { control: { type: 'boolean' } },
    backspaceRemovesValue: { control: { type: 'boolean' } },
    controlShouldRenderValue: { control: { type: 'boolean' } },
    closeMenuOnSelect: { control: { type: 'boolean' } },
    tabSelectsValue: { control: { type: 'boolean' } },
    cacheOptions: { control: { type: 'boolean' } },
    'aria-label': { control: { type: 'text' } },
    'aria-labelledby': { control: { type: 'text' } },
    'aria-invalid': { control: { type: 'boolean' } },
    'aria-errormessage': { control: { type: 'text' } },
    id: { control: { type: 'text' } },
    containerId: { control: { type: 'text' } },
    tabIndex: { control: { type: 'number' } },
    isOptionDisabled: { control: { type: 'boolean' } },
    menuIsOpen: { control: { type: 'boolean' } },
    menuShouldBlockScroll: { control: { type: 'boolean' } },
    showOptionGroupDivider: { control: { type: 'boolean' } },
  },
};
export default meta;

type Story = StoryFn<typeof SearchSelectInput>;

const defaultOptions = [
  {
    label:
      'This Ocean label is very long and the reason that it is very long is to test how it is displayed in the dropdown or when it is selected',
    value: 'ocean',
    key: 'ocean',
    id: 1,
  },
  { label: 'Blue', value: 'blue', key: 'blue', id: 2 },
  { label: 'Purple', value: 'purple', key: 'purple', id: 3 },
  { label: 'Red', value: 'red', key: 'red', id: 4 },
  { label: 'Orange', value: 'orange', key: 'orange', id: 5 },
  { label: 'Yellow', value: 'yellow', key: 'yellow', id: 6 },
  { label: 'Green', value: 'green', key: 'green', id: 7 },
  { label: 'Forest', value: 'forest', key: 'forest', id: 8 },
  { label: 'Slate', value: 'slate', key: 'slate', id: 9 },
  { label: 'Silver', value: 'silver', key: 'silver', id: 10 },
];

const filterColors = (inputValue: string) => {
  return defaultOptions.filter((option) =>
    option.label?.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const loadOptions = (inputValue: string) =>
  delay(500).then(() => filterColors(inputValue));

type Option = {
  label: string;
  value: string;
  id: number;
};

export const BasicExample: Story = ({ isMulti, ...args }) => {
  const [value, setValue] = useState<Option | Option[] | null>(null);

  useEffect(() => {
    setValue(isMulti ? [] : null);
  }, [isMulti]);

  return (
    <div style={{ height: 400 }}>
      <Spacings.Stack scale="m">
        <SearchSelectInput
          {...args}
          isMulti={isMulti}
          defaultOptions={defaultOptions}
          loadOptions={loadOptions}
          value={value}
          onChange={(e) => {
            console.log(e);
            setValue(e.target.value as Option | Option[]);
          }}
        />
        <div>
          <p>
            In this example, the `loadOptions` function uses the data (given
            below) to match the search term. The term filters items based on
            their{' '}
            <b>
              <i>id</i>
            </b>{' '}
            and{' '}
            <b>
              <i>label</i>
            </b>{' '}
            fields with a 500ms delay
          </p>
          <b>Data used:</b>
          <pre style={{ textWrap: 'wrap' }}>
            {JSON.stringify(defaultOptions, undefined, 2)}
          </pre>
        </div>
      </Spacings.Stack>
    </div>
  );
};

BasicExample.args = {
  isMulti: false,
  horizontalConstraint: 'scale',
  noOptionsMessage: ({ inputValue }) =>
    inputValue.length > 0
      ? `No matches found for '${inputValue}'`
      : 'No matches found',
  loadingMessage: 'Loading exact matches',
  hasError: false,
  hasWarning: false,
  isAutofocussed: false,
  backspaceRemovesValue: true,
  controlShouldRenderValue: true,
  isClearable: true,
  isCondensed: false,
  isDisabled: false,
  isReadOnly: false,
  maxMenuHeight: 220,
  closeMenuOnSelect: true,
  name: 'form-field-name',
  placeholder: 'Search items...',
  tabSelectsValue: true,
  cacheOptions: true,
  optionType: 'single-property',
};

export const CheckboxOptionStyle: Story = ({ isMulti, ...args }) => {
  const [value, setValue] = useState<Option | Option[] | null>(null);

  useEffect(() => {
    setValue(isMulti ? [] : null);
  }, [isMulti]);

  return (
    <div style={{ height: 400 }}>
      <Spacings.Stack scale="m">
        <SearchSelectInput
          {...args}
          defaultOptions={[
            ...(Array.isArray(value)
              ? value
              : value
              ? [value]
              : defaultOptions.slice(0, 2)),
          ]}
          onChange={(event) => {
            setValue(event.target.value as Option | Option[]);
          }}
          value={value}
          loadOptions={loadOptions}
        />

        <div>
          <p>
            In this example, the `loadOptions` function uses the data (given
            below) to match the search term. The term filters items based on
            their{' '}
            <b>
              <i>id</i>
            </b>{' '}
            and{' '}
            <b>
              <i>label</i>
            </b>{' '}
            fields with a 500ms delay
          </p>
          <b>Data used:</b>
          <pre style={{ textWrap: 'wrap' }}>
            {JSON.stringify(defaultOptions, undefined, 2)}
          </pre>
        </div>
      </Spacings.Stack>
    </div>
  );
};

CheckboxOptionStyle.args = {
  isMulti: false,
  horizontalConstraint: 'scale',
  noOptionsMessage: ({ inputValue }) =>
    inputValue.length > 0
      ? `No matches found for '${inputValue}'`
      : 'No matches found',
  loadingMessage: 'Loading exact matches',
  hasError: false,
  hasWarning: false,
  isAutofocussed: false,
  backspaceRemovesValue: true,
  controlShouldRenderValue: true,
  isClearable: true,
  isCondensed: false,
  isDisabled: false,
  isReadOnly: false,
  maxMenuHeight: 220,
  name: 'form-field-name',
  tabSelectsValue: true,
  cacheOptions: true,
  optionType: 'single-property',
  appearance: 'filter',
  optionStyle: 'checkbox',
};
