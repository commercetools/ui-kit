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
      { value: 'platypus', label: 'Platypus', count: 103 },
      { value: 'goat', label: 'Goat', count: 12.365 },
      { value: 'giraffe', label: 'Giraffe' },
      { value: 'whale', label: 'Whale', count: 1123 },
      {
        value: 'killer-whale',
        label: 'Killer Whale',
        isDisabled: true,
        count: 1,
      },
      { value: 'otter', label: 'Otter', count: 10.356 },
      { value: 'elephant', label: 'Elephant' },
      { value: 'rat', label: 'Rat', count: 0 },
      { value: 'anteater', label: 'Anteater', count: 100335456413 },
      { value: 'alligator', label: 'Alligator', count: 1 },
      { value: 'dog', label: 'Dog', count: 5 },
      { value: 'pig', label: 'Pig' },
      { value: 'hippopotamus', label: 'Hippopotamus', count: 10 },
      { value: 'lion', label: 'Lion', count: 111 },
      { value: 'monkey', label: 'Monkey', count: 57 },
      { value: 'kangaroo', label: 'Kangaroo' },
      { value: 'flamingo', label: 'Flamingo', count: 3 },
      { value: 'moose', label: 'Moose', count: 1003 },
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
      { value: 'seal', label: 'Seal', count: 245 },
      { value: 'hawk', label: 'Hawk', count: 23 },
      { value: 'wolf', label: 'Wolf', count: 89 },
      { value: 'yak', label: 'Yak', count: 6 },
      { value: 'rhinoceros', label: 'Rhinoceros', count: 9 },
      { value: 'alpaca', label: 'Alpaca', count: 54 },
      { value: 'zebra', label: 'Zebra', count: 302 },
      { value: 'cat', label: 'Cat', count: 1 },
      { value: 'rabbit', label: 'Rabbit' },
      { value: 'turtle', label: 'Turtle' },
      { value: 'cow', label: 'Cow' },
      { value: 'turkey', label: 'Turkey' },
      { value: 'deer', label: 'Deer', count: 12 },
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
  const [value, setValue] = useState<string | string[] | null | undefined>([]);

  useEffect(() => {
    setValue([]);
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
  appearance: 'filter',
};
