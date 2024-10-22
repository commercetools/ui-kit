import type { Meta, StoryFn } from '@storybook/react';
import SelectInput from './select-input';
import { iconArgType } from '@/storybook-helpers';
import { useEffect, useState } from 'react';

const meta: Meta<typeof SelectInput> = {
  title: 'Form/Inputs/SelectInput',
  component: SelectInput,
  argTypes: {
    iconLeft: iconArgType,
    'aria-label': { control: { type: 'text' } },
    'aria-labelledby': { control: { type: 'text' } },
    'aria-invalid': { control: { type: 'boolean' } },
    'aria-errormessage': { control: { type: 'text' } },
    backspaceRemovesValue: { control: { type: 'boolean' } },
    controlShouldRenderValue: { control: { type: 'boolean' } },
    filterOption: { type: 'function' },
    hideSelectedOptions: { type: 'boolean' },
    id: { control: { type: 'text' } },
    inputValue: { control: { type: 'text' } },
    containerId: { control: { type: 'text' } },
    isClearable: { control: { type: 'boolean' } },
    isDisabled: { control: { type: 'boolean' } },
    isOptionDisabled: { type: 'function' },
    isMulti: { control: { type: 'boolean' } },
    isSearchable: { control: { type: 'boolean' } },
    menuIsOpen: { control: { type: 'boolean' } },
    maxMenuHeight: { control: { type: 'number' } },
    menuPortalTarget: { control: false },
    menuShouldBlockScroll: { control: { type: 'boolean' } },
    closeMenuOnSelect: { control: { type: 'boolean' } },
    name: { control: { type: 'text' } },
    noOptionsMessage: { type: 'function' },
    placeholder: { control: { type: 'text' } },
    tabIndex: { control: { type: 'number' } },
    tabSelectsValue: { control: { type: 'boolean' } },
    value: { control: false },
  },
  decorators: [
    (Story) => (
      <div style={{ height: 350 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryFn<typeof SelectInput>;

const options = [
  {
    label: 'Animals 1',
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
      { value: 'flamingo', label: 'Flamingo' },
      { value: 'moose', label: 'Moose' },
    ],
  },
  {
    label: 'Animals 2',
    options: [
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
      { value: 'tiger', label: 'Tiger' },
    ],
  },
  {
    label: 'Animals 3',
    options: [
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

export const BasicExample: Story = (args) => {
  const [value, setValue] = useState<string | string[] | null | undefined>(
    null
  );

  useEffect(() => {
    setValue(null);
  }, [args.isMulti]);

  return (
    <SelectInput
      {...args}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

BasicExample.args = {
  options,
  horizontalConstraint: 7,
};

export const CheckboxOptionStyle: Story = (args) => {
  const [value, setValue] = useState<string | string[] | null | undefined>([
    'goat',
  ]);

  useEffect(() => {
    setValue(['goat']);
  }, [args.isMulti]);

  return (
    <div>
      <SelectInput
        {...args}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />

      <pre>{JSON.stringify(value, null, 2)}</pre>
    </div>
  );
};

CheckboxOptionStyle.args = {
  options,
  horizontalConstraint: 7,
  optionStyle: 'checkbox',
  isMulti: true,
};
