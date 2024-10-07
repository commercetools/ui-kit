import { useEffect, useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { iconArgType } from '@/storybook-helpers';
import { GroupBase, OptionsOrGroups } from 'react-select';
import Spacings from '@commercetools-uikit/spacings';
import AsyncSelectInput from './async-select-input';

const meta: Meta<typeof AsyncSelectInput> = {
  title: 'Form/Inputs/AsyncSelectInput',
  component: AsyncSelectInput,
  argTypes: {
    'aria-label': { control: 'text' },
    'aria-labelledby': { control: 'text' },
    'aria-invalid': { control: 'boolean' },
    'aria-errormessage': { control: 'text' },
    backspaceRemovesValue: { control: 'boolean' },
    controlShouldRenderValue: { control: 'boolean' },
    hideSelectedOptions: { control: 'boolean' },
    id: { control: 'text' },
    containerId: { control: 'text' },
    isClearable: { control: 'boolean' },
    isCondensed: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    isOptionDisabled: { control: 'boolean' },
    isMulti: { control: 'boolean' },
    isSearchable: { control: 'boolean' },
    menuIsOpen: { control: 'boolean' },
    maxMenuHeight: { control: 'number' },
    menuPortalZIndex: { control: 'text' },
    menuShouldBlockScroll: { control: 'boolean' },
    closeMenuOnSelect: { control: 'boolean' },
    name: { control: 'text' },
    placeholder: { control: 'text' },
    loadingMessage: { control: 'text' },
    tabIndex: { control: 'text' },
    tabSelectsValue: { control: 'boolean' },
    cacheOptions: { control: 'boolean' },
    showOptionGroupDivider: { control: 'boolean' },
    iconLeft: iconArgType,
  },
};
export default meta;

type Story = StoryFn<typeof AsyncSelectInput>;

const defaultOptions = [
  {
    options: [
      { label: 'Ocean', value: 'ocean', someData: 1 },
      { label: 'Blue', value: 'blue', someData: 2 },
      { label: 'Purple', value: 'purple', someData: 3 },
      { label: 'Red', value: 'red', someData: 4 },
      { label: 'Orange', value: 'orange', someData: 5 },
      { label: 'Yellow', value: 'yellow', someData: 6 },
    ],
  },
  {
    options: [
      { label: 'Green', value: 'green', someData: 7 },
      { label: 'Forest', value: 'forest', someData: 8 },
      { label: 'Slate', value: 'slate', someData: 9 },
      { label: 'Silver', value: 'silver', someData: 10 },
    ],
  },
];

const filterColors = (
  inputValue: string
): OptionsOrGroups<unknown, GroupBase<unknown>>[] => {
  return defaultOptions.map((groupedOptionsList) => {
    const filteredOptions = groupedOptionsList.options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    return {
      options: filteredOptions,
    } as unknown as OptionsOrGroups<unknown, GroupBase<unknown>>[];
  });
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const loadOptions = (
  inputValue: string
): Promise<OptionsOrGroups<unknown, GroupBase<unknown>>> =>
  delay(500).then(() => filterColors(inputValue));

type Option = {
  label: string;
  value: string;
  someData: number;
};

export const BasicExample: Story = ({ isMulti, ...args }) => {
  const [value, setValue] = useState<Option | Option[] | null>(null);

  useEffect(() => {
    setValue(isMulti ? [] : null);
  }, [isMulti]);

  return (
    <div style={{ height: 400 }}>
      <Spacings.Stack>
        <AsyncSelectInput
          {...args}
          isMulti={isMulti}
          defaultOptions={defaultOptions}
          loadOptions={loadOptions}
          value={value}
          onChange={(e) => setValue(e.target.value as Option | Option[])}
        />
        <strong>state:</strong>
        <pre>{JSON.stringify({ value }, null, 2)}</pre>
      </Spacings.Stack>
    </div>
  );
};

BasicExample.args = {
  isMulti: false,
  horizontalConstraint: 'scale',
  hasError: false,
  hasWarning: false,
  'aria-label': '',
  'aria-labelledby': '',
  isAutofocussed: false,
  backspaceRemovesValue: true,
  controlShouldRenderValue: true,
  id: '',
  containerId: '',
  isClearable: false,
  isCondensed: false,
  isDisabled: false,
  isReadOnly: false,
  isSearchable: true,
  maxMenuHeight: 220,
  closeMenuOnSelect: true,
  name: 'form-field-name',
  loadingMessage: 'Loading...',
  placeholder: 'Select...',
  tabIndex: 0,
  tabSelectsValue: true,
  cacheOptions: false,
  showOptionGroupDivider: false,
  iconLeft: undefined,
};
