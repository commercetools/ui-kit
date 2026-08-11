import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import SearchSelectInput from './search-select-input';
import { iconArgType, VisualSpec } from '@/storybook-helpers';
import { useState, useEffect } from 'react';
import Spacings from '@commercetools-uikit/spacings';
// Source path, not `@commercetools-uikit/icons`: this package does not declare
// icons as a dependency, and CI installs strictly.
import WorldIcon from '../../../icons/src/generated/WorldReact';

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

// The route file calls these `loadOptions` and `value`; renamed because
// `loadOptions` above is a different, delayed implementation.
const visualLoadOptions = (input: string) =>
  input
    ? Promise.resolve([])
    : Promise.resolve([
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' },
      ]);

const visualValue = { value: 'one', label: 'One' };

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <SearchSelectInput
          value={visualValue}
          onChange={() => {}}
          loadOptions={visualLoadOptions}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <SearchSelectInput
          value={visualValue}
          onChange={() => {}}
          loadOptions={visualLoadOptions}
          horizontalConstraint={7}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when input has an error">
        <SearchSelectInput
          value={visualValue}
          onChange={() => {}}
          loadOptions={visualLoadOptions}
          horizontalConstraint={7}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="when input has an warning">
        <SearchSelectInput
          value={visualValue}
          onChange={() => {}}
          loadOptions={visualLoadOptions}
          horizontalConstraint={7}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="when clearable">
        <SearchSelectInput
          value={visualValue}
          onChange={() => {}}
          loadOptions={visualLoadOptions}
          horizontalConstraint={7}
          isClearable={true}
        />
      </VisualSpec>
      <VisualSpec label="when condensed">
        <SearchSelectInput
          value={visualValue}
          onChange={() => {}}
          loadOptions={visualLoadOptions}
          horizontalConstraint={7}
          isCondensed={true}
        />
      </VisualSpec>
      <VisualSpec label="when input has an error and a warning">
        <SearchSelectInput
          value={visualValue}
          onChange={() => {}}
          loadOptions={visualLoadOptions}
          horizontalConstraint={7}
          hasError={true}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is shown">
        <SearchSelectInput
          value={null}
          onChange={() => {}}
          loadOptions={visualLoadOptions}
          horizontalConstraint={7}
          placeholder="Select a state"
        />
      </VisualSpec>
      <VisualSpec label="when read-only">
        <SearchSelectInput
          value={visualValue}
          onChange={() => {}}
          loadOptions={visualLoadOptions}
          horizontalConstraint={7}
          isReadOnly={true}
        />
      </VisualSpec>
      <VisualSpec label="with iconLeft">
        <SearchSelectInput
          value={visualValue}
          onChange={() => {}}
          loadOptions={visualLoadOptions}
          horizontalConstraint={7}
          iconLeft={<WorldIcon />}
        />
      </VisualSpec>
      <VisualSpec label="with iconLeft and no selected value">
        <SearchSelectInput
          value={null}
          onChange={() => {}}
          loadOptions={visualLoadOptions}
          horizontalConstraint={7}
          iconLeft={<WorldIcon />}
        />
      </VisualSpec>
      <VisualSpec label="with auto-fouced and no input value">
        <SearchSelectInput
          value={null}
          onChange={() => {}}
          isAutofocussed={true}
          loadOptions={visualLoadOptions}
          horizontalConstraint={7}
          iconLeft={<WorldIcon />}
        />
      </VisualSpec>
    </>
  ),
};
