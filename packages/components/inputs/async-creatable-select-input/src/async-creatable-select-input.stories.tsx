import type { Meta, StoryObj } from '@storybook/react';
import { iconArgType, withControlledValue } from '@/storybook-helpers';

import AsyncCreatableSelectInput, {
  type TAsyncCreatableSelectInputProps,
} from './async-creatable-select-input';

const colourOptions = [
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

const filterColors = (inputValue: string) =>
  colourOptions.map((groupedOptionsList) => {
    const filteredOptions = groupedOptionsList.options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    return {
      options: filteredOptions,
    };
  });

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const loadOptions = (inputValue: string) =>
  delay(500).then(() => filterColors(inputValue));

const meta = {
  title: 'Components/Inputs/SelectInputs/AsyncCreatableSelectInput',
  component: AsyncCreatableSelectInput,
  argTypes: {
    createOptionPosition: {
      control: { type: 'select' },
      options: ['first', 'last'],
      defaultValue: 'last',
    },
    iconLeft: iconArgType,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AsyncCreatableSelectInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    allowCreateWhileLoading: false, // Creatable props
    'aria-label': '',
    'aria-labelledby': '',
    backspaceRemovesValue: true,
    cacheOptions: false, // Async prop
    closeMenuOnSelect: true,
    containerId: '',
    defaultOptions: colourOptions, // Async prop
    horizontalConstraint: 'scale',
    hasError: false,
    hasWarning: false,
    id: '',
    isAutofocussed: false,
    isClearable: false,
    isDisabled: false,
    isMulti: false,
    isReadOnly: false,
    isSearchable: true,
    loadOptions, // Async prop
    maxMenuHeight: 220,
    menuPortalZIndex: 1,
    name: 'form-field-name',
    placeholder: 'Select..',
    showOptionGroupDivider: false, // Creatable prop
    tabIndex: 0,
    tabSelectsValue: true,
  },
  render: withControlledValue<TAsyncCreatableSelectInputProps>({
    Component: AsyncCreatableSelectInput,
  }),
};
