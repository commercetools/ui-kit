import type { Meta, StoryFn } from '@storybook/react';
import SearchSelectInput from './search-select-input';
import { iconArgType } from '@/storybook-helpers';
import { useState } from 'react';
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

const colourOptions = [
  {
    label:
      'This is label is very long and the reason that it is very long is to test how it is displayed in the dropdown or when it is select.',
    value: 'ocean',
    id: '1',
  },
  { label: 'Blue', value: 'blue', key: 'blue', id: '2' },
  { label: 'Purple', value: 'purple', key: 'purple', id: '3' },
  { label: 'Red', value: 'red', key: 'red', id: '4' },
  { label: 'Orange', value: 'orange', key: 'orange', id: '5' },
  { label: 'Yellow', value: 'yellow', key: 'yellow', id: '6' },
  { label: 'Green', value: 'green', key: 'green', id: '7' },
  { label: 'Forest', value: 'forest', key: 'forest', id: '8' },
  { label: 'Slate', value: 'slate', key: 'slate', id: '9' },
  { label: 'Silver', value: 'silver', key: 'silver', id: '10' },
];

const filterColors = (inputValue: string) =>
  colourOptions.filter(
    (colourOption) =>
      colourOption.label === inputValue || colourOption.id === inputValue
  );

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const loadOptions = (inputValue: string) =>
  delay(500).then(() => filterColors(inputValue));

export const BasicExample: Story = ({ isMulti, ...args }) => {
  const [value, onChange] = useState<string | string[] | undefined>(
    isMulti ? [] : undefined
  );

  return (
    <div style={{ height: 400 }}>
      <Spacings.Stack scale="m">
        <SearchSelectInput
          onChange={(event) => {
            onChange(event.target.value as string | string[] | undefined);
          }}
          value={value}
          {...args}
          loadOptions={loadOptions}
        />

        <div>
          <p>
            In this example, the `loadOptions` function uses the data (given
            below) to perform an exact match. It is case sensitive and it
            performs a search based on{' '}
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
            {JSON.stringify(colourOptions, undefined, 2)}
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
  placeholder: 'Search by...',
  tabSelectsValue: true,
  cacheOptions: true,
  optionType: 'single-property',
};
