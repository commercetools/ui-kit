import type { Meta, StoryFn } from '@storybook/react';
import CreatableSelectInput from './creatable-select-input';
import Spacings from '@commercetools-uikit/spacings';
import { iconArgType } from '@/storybook-helpers';
import { useEffect, useState } from 'react';

const meta: Meta<typeof CreatableSelectInput> = {
  title: 'Form/Inputs/CreatableSelectInput',
  component: CreatableSelectInput,
  argTypes: {
    createOptionPosition: {
      control: 'select',
      options: ['first', 'last'],
    },
    iconLeft: iconArgType,
    isMulti: { control: 'boolean' },
    backspaceRemovesValue: { control: 'boolean' },
    isClearable: { control: 'boolean' },
    isSearchable: { control: 'boolean' },
    closeMenuOnSelect: { control: 'boolean' },
    allowCreateWhileLoading: { control: 'boolean' },
    placeholder: { control: 'text' },
    'aria-label': { control: 'text' },
    'aria-labelledby': { control: 'text' },
    'aria-invalid': { control: 'boolean' },
    'aria-errormessage': { control: 'text' },
    id: { control: 'text' },
    containerId: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isOptionDisabled: { control: 'boolean' },
    maxMenuHeight: { control: 'number' },
    menuShouldBlockScroll: { control: 'boolean' },
    name: { control: 'text' },
    tabIndex: { control: 'text' },
    tabSelectsValue: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryFn<typeof CreatableSelectInput>;

const options = [
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

  return (
    <div style={{ minHeight: 350 }}>
      <Spacings.Stack scale="l">
        <CreatableSelectInput
          value={value}
          {...args}
          onChange={(e) => {
            setValue(e.target.value as SelectedOption | SelectedOption[]);
          }}
          /** needs to be set to undefined (cause storybook adds an empty function via args) */
          onCreateOption={undefined}
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
  options,
  isMulti: true,
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
};
