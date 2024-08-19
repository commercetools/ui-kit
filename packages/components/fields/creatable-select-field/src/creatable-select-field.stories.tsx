import type { Meta, StoryFn } from '@storybook/react';
import { iconArgType } from '@/storybook-helpers';
import CreatableSelectField from './creatable-select-field';
import { useEffect, useState } from 'react';

const meta: Meta<typeof CreatableSelectField> = {
  title: 'Form/Fields/CreatableSelectField',
  // @ts-expect-error, @todo component needs refactoring
  component: CreatableSelectField,
  argTypes: {
    // @ts-expect-error, @todo component needs refactoring
    isMulti: { control: 'boolean' },
    hint: { control: 'text' },
    name: { control: 'text' },
    id: { control: 'text' },
    touched: { control: 'boolean' },
    'aria-label': { control: 'text' },
    'aria-labelledby': { control: 'text' },
    backspaceRemovesValue: { control: 'boolean' },
    containerId: { control: 'text' },
    isDisabled: { control: 'boolean' },
    isReadOnly: { control: 'boolean' },
    placeholder: { control: 'text' },
    title: { control: 'text' },
    isSearchable: { control: 'boolean' },
    isClearable: { control: 'boolean' },
    tabIndex: { control: 'text' },
    tabSelectsValue: { control: 'boolean' },
    allowCreateWhileLoading: { control: 'boolean' },
    createOptionPosition: {
      control: 'select',
      options: ['first', 'last'],
    },
    description: { control: 'text' },
    badge: { control: 'text' },
    menuShouldBlockScroll: { control: 'boolean' },
    hintIcon: iconArgType,
    iconLeft: iconArgType,
  },
};
export default meta;

type Story = StoryFn<typeof CreatableSelectField>;

const options = [
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
];

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState<unknown>(undefined);

  useEffect(() => {
    // @ts-expect-error, @todo component needs refactoring
    onChange(args.isMulti ? [] : undefined);
    // @ts-expect-error, @todo component needs refactoring
  }, [args.isMulti]);

  return (
    <div style={{ height: 350 }}>
      {/* @ts-expect-error, @todo component needs refactoring */}
      <CreatableSelectField
        {...args}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        /** needs to be set to undefined (cause storybook adds an empty function via args) */
        onCreateOption={undefined}
      />
    </div>
  );
};

BasicExample.args = {
  // @ts-expect-error, @todo component needs refactoring
  isMulti: false,
  hint: 'Bonus points if it is a mammal',
  name: 'favAnimal-name',
  id: 'favAnimal-id',
  horizontalConstraint: 7,
  errors: { missing: true, customError: true },
  renderError: (key: string) => {
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
  renderWarning: (key: string) => {
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
  isAutofocussed: false,
  isCondensed: false,
  isDisabled: false,
  isReadOnly: false,
  hasWarning: false,
  placeholder: 'Select...',
  title: 'Favourite animal',
  maxMenuHeight: 220,
  isSearchable: true,
  isClearable: true,
  options,
  tabIndex: '0',
  tabSelectsValue: true,
  allowCreateWhileLoading: false,
  createOptionPosition: 'last',
  description: '',
  badge: '',
};
