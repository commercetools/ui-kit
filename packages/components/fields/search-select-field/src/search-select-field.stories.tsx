import type { Meta, StoryFn } from '@storybook/react';
import { iconArgType } from '@/storybook-helpers';
import SearchSelectField from './search-select-field';
import { useEffect, useState } from 'react';

// @todo fix component types

const meta: Meta<typeof SearchSelectField> = {
  title: 'Form/Fields/SearchSelectField',
  component: SearchSelectField,
  argTypes: {
    hintIcon: iconArgType,
    iconLeft: iconArgType,
    id: { control: { type: 'text' } },
    name: { control: { type: 'text' } },
    touched: { control: { type: 'boolean' } },
    'aria-label': { control: { type: 'text' } },
    'aria-labelledby': { control: { type: 'text' } },
    backspaceRemovesValue: { control: { type: 'boolean' } },
    containerId: { control: { type: 'text' } },
    controlShouldRenderValue: { control: { type: 'boolean' } },
    isMulti: { control: { type: 'boolean' } },
    placeholder: { control: { type: 'text' } },
    loadingMessage: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    tabSelectsValue: { control: { type: 'boolean' } },
    cacheOptions: { control: { type: 'boolean' } },
    hint: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    badge: { control: { type: 'text' } },
  },
};

export default meta;

type Story = StoryFn<typeof SearchSelectField>;

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
  { label: 'Tomato', value: 'tomato', key: 'tomato', id: '11' },
];

const filterColors = (inputValue: string) =>
  colourOptions.filter(
    (colourOption) =>
      colourOption.label.toLowerCase().includes(inputValue.toLowerCase()) ||
      colourOption.id.toLowerCase().includes(inputValue.toLowerCase())
  );

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const loadOptions = (inputValue: string) =>
  delay(500).then(() => filterColors(inputValue));

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState(args.isMulti ? [] : undefined);

  useEffect(() => {
    onChange(args.isMulti ? [] : undefined);
  }, [args.isMulti]);

  return (
    <div style={{ height: 400 }}>
      <SearchSelectField
        {...args}
        value={value}
        onChange={(event) => {
          // @ts-expect-error
          onChange(event.target.value);
        }}
      />
    </div>
  );
};

BasicExample.args = {
  id: 'search-select-field-id',
  name: 'search-select-field-name',
  horizontalConstraint: 7,
  errors: { missing: true, customError: true },
  renderError: (key) => {
    switch (key) {
      case 'customError':
        return 'A custom error.';
      default:
        return null;
    }
  },
  warnings: {
    customWarning: true,
  },
  renderWarning: (key) => {
    switch (key) {
      case 'customWarning':
        return 'A custom warning.';
      default:
        return null;
    }
  },
  isRequired: false,
  touched: false,
  'aria-label': '',
  'aria-labelledby': '',
  backspaceRemovesValue: true,
  containerId: '',
  controlShouldRenderValue: true,
  optionType: undefined,
  isAutofocussed: false,
  isDisabled: false,
  isReadOnly: false,
  isMulti: false,
  placeholder: 'Search by...',
  loadingMessage: 'Search in progress...',
  noOptionsMessage: ({ inputValue }) =>
    inputValue.length === 0
      ? 'Start typing...'
      : `No matches found for "${inputValue}"`,
  title: 'Select a color',
  maxMenuHeight: 220,
  isClearable: false,
  isCondensed: false,
  tabIndex: 0,
  tabSelectsValue: true,
  loadOptions,
  cacheOptions: false,
  hint: 'Select color that matches the background',
  description: '',
  onInfoButtonClick: () => alert('Info button clicked'),
  badge: '',
};
