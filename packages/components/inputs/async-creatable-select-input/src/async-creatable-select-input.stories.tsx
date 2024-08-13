import type { Meta, StoryFn } from '@storybook/react';
import { iconArgType } from '@/storybook-helpers';
import Spacings from '@commercetools-uikit/spacings';
import AsyncCreatableSelectInput from './async-creatable-select-input';
import { useEffect, useState } from 'react';
import { GroupBase, OptionsOrGroups } from 'react-select';

const meta: Meta<typeof AsyncCreatableSelectInput> = {
  title: 'Form/Inputs/AsyncCreatableSelectInput',
  component: AsyncCreatableSelectInput,
  argTypes: {
    iconLeft: iconArgType,
    'aria-label': { control: 'text' },
    'aria-labelledby': { control: 'text' },
    'aria-invalid': { control: 'boolean' },
    'aria-errormessage': { control: 'text' },
    backspaceRemovesValue: { control: 'boolean' },
    id: { control: 'text' },
    containerId: { control: 'text' },
    formatCreateLabel: { type: 'function' },
    inputValue: { control: 'text' },
    isClearable: { control: 'boolean' },
    isDisabled: { control: 'boolean' },
    isOptionDisabled: { control: 'boolean' },
    isMulti: { control: 'boolean' },
    isSearchable: { control: 'boolean' },
    isValidNewOption: { type: 'function' },
    maxMenuHeight: { control: 'number' },
    menuShouldBlockScroll: { control: 'boolean' },
    closeMenuOnSelect: { control: 'boolean' },
    name: { control: 'text' },
    placeholder: { control: 'text' },
    tabIndex: { control: 'text' },
    tabSelectsValue: { control: 'boolean' },
    cacheOptions: { control: 'boolean' },
    allowCreateWhileLoading: { control: 'boolean' },
    createOptionPosition: {
      control: 'select',
      options: ['first', 'last'],
    },
    value: {
      control: false,
    },
  },
};
export default meta;

type Story = StoryFn<typeof AsyncCreatableSelectInput>;

const defaultOptions = [
  {
    options: [
      { value: 'platypus', label: 'Platypus' },
      { value: 'goat', label: 'Goat' },
      { value: 'giraffe', label: 'Giraffe' },
      { value: 'whale', label: 'Whale' },
      { value: 'killer-whale', label: 'Killer Whale', isDisabled: true },
      { value: 'otter', label: 'Otter' },
      { value: 'elephant', label: 'Elephant' },
      { value: 'rat', label: 'Rat' },
      { value: 'anteater', label: 'Anteater' },
      { value: 'alligator', label: 'Alligator' },
      { value: 'dog', label: 'Dog' },
      { value: 'pig', label: 'Pig' },
      { value: 'hippopotamus', label: 'Hippopotamus' },
      { value: 'lion', label: 'Lion' },
      { value: 'monkey', label: 'Monkey' },
      { value: 'kangaroo', label: 'Kangaroo' },
    ],
  },
  {
    options: [
      { value: 'flamingo', label: 'Flamingo' },
      { value: 'moose', label: 'Moose' },
      { value: 'prairie-dog', label: 'Prairie Dog', isDisabled: true },
      { value: 'snake', label: 'Snake' },
      { value: 'porcupine', label: 'Porcupine' },
      { value: 'stingray', label: 'Stingray' },
      { value: 'panther', label: 'Panther' },
      { value: 'lizard', label: 'Lizard' },
      { value: 'parrot', label: 'Parrot' },
      { value: 'dolphin', label: 'Dolphin' },
      { value: 'chicken', label: 'Chicken' },
      { value: 'sloth', label: 'Sloth' },
      { value: 'shark', label: 'Shark' },
      { value: 'ape', label: 'Ape' },
      { value: 'bear', label: 'Bear' },
      { value: 'cheetah', label: 'Cheetah' },
      { value: 'camel', label: 'Camel' },
      { value: 'beaver', label: 'Beaver' },
      { value: 'armadillo', label: 'Armadillo' },
    ],
  },
  {
    options: [
      { value: 'tiger', label: 'Tiger' },
      { value: 'llama', label: 'Llama' },
      { value: 'seal', label: 'Seal' },
      { value: 'hawk', label: 'Hawk' },
      { value: 'wolf', label: 'Wolf' },
      { value: 'yak', label: 'Yak' },
      { value: 'rhinoceros', label: 'Rhinoceros' },
      { value: 'alpaca', label: 'Alpaca' },
      { value: 'zebra', label: 'Zebra' },
      { value: 'cat', label: 'Cat' },
      { value: 'rabbit', label: 'Rabbit' },
      { value: 'turtle', label: 'Turtle' },
      { value: 'cow', label: 'Cow' },
      { value: 'turkey', label: 'Turkey' },
      { value: 'deer', label: 'Deer' },
    ],
  },
];

const filterOptions = (
  inputValue: string
): OptionsOrGroups<unknown, GroupBase<unknown>>[] => {
  return defaultOptions.map((groupedOptionsList) => {
    const filteredOptions = groupedOptionsList.options.filter(
      (option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()) ||
        option.value.toLowerCase().includes(inputValue.toLowerCase())
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
  delay(500).then(() => filterOptions(inputValue));

type SelectedOption = {
  value: string;
  label: string;
  __isNew__?: boolean;
};

export const BasicExample: Story = (args) => {
  const [value, setValue] = useState<
    SelectedOption | SelectedOption[] | undefined
  >([]);

  useEffect(() => {
    setValue(args.isMulti ? [] : undefined);
  }, [args.isMulti]);
  console.log('render');

  return (
    <div style={{ minHeight: 350 }}>
      <Spacings.Stack scale="l">
        <AsyncCreatableSelectInput
          value={value}
          {...args}
          onChange={(e) => {
            setValue(e.target.value as SelectedOption | SelectedOption[]);
          }}
          /** needs to be set to undefined (cause storybook adds an empty function via args) */
          onCreateOption={undefined}
          loadOptions={loadOptions}
        />
        <strong>state:</strong>
        <pre>
          {JSON.stringify(
            {
              value,
            },
            null,
            2
          )}
        </pre>
      </Spacings.Stack>
    </div>
  );
};

BasicExample.args = {
  horizontalConstraint: 'scale',
  isMulti: false,
  hasError: false,
  hasWarning: false,
  backspaceRemovesValue: true,
  isClearable: false,
  isSearchable: true,
  closeMenuOnSelect: true,
  placeholder: 'Select animals or create a new one...',
  allowCreateWhileLoading: false,
  createOptionPosition: 'last',
  showOptionGroupDivider: false,
  defaultOptions: defaultOptions,
};