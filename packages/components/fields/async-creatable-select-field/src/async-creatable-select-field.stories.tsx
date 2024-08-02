import type { Meta, StoryFn } from '@storybook/react';
import AsyncCreatableSelectField from './async-creatable-select-field';
import { useEffect, useState } from 'react';
import { iconArgType } from '@/storybook-helpers';

const meta: Meta<typeof AsyncCreatableSelectField> = {
  title: 'field/AsyncCreatableSelectField',
  // @ts-expect-error, @todo: fix typings of field component
  component: AsyncCreatableSelectField,
  argTypes: {
    // @ts-expect-error, @todo: fix typings of field component
    hintIcon: iconArgType,
    iconLeft: iconArgType,
    id: { control: { type: 'text' } },
    isMulti: { control: { type: 'boolean' } },
    hint: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    badge: { control: { type: 'text' } },
    name: { control: { type: 'text' } },
    touched: { control: { type: 'boolean' } },
    'aria-label': { control: { type: 'text' } },
    'aria-labelledby': { control: { type: 'text' } },
    backspaceRemovesValue: { control: { type: 'boolean' } },
    containerId: { control: { type: 'text' } },
    isDisabled: { control: { type: 'boolean' } },
    placeholder: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    isSearchable: { control: { type: 'boolean' } },
    isClearable: { control: { type: 'boolean' } },
    tabIndex: { control: { type: 'text' } },
    tabSelectsValue: { control: { type: 'boolean' } },
    cacheOptions: { control: { type: 'boolean' } },
    allowCreateWhileLoading: { control: { type: 'boolean' } },
    createOptionPosition: { control: 'select', options: ['first', 'last'] },
    menuShouldBlockScroll: { control: { type: 'boolean' } },
  },
};
export default meta;

const animalOptions = [
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

const filterAnimals = (inputValue: string) =>
  animalOptions.filter((animalOption) =>
    animalOption.label.toLowerCase().includes(inputValue.toLowerCase())
  );

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const loadOptions = (inputValue: string) =>
  delay(500).then(() => filterAnimals(inputValue));

type Story = StoryFn<typeof AsyncCreatableSelectField>;

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState<string | string[] | undefined | unknown>(
    undefined
  );

  useEffect(() => {
    // @ts-expect-error, @todo: fix typings of field component
    onChange(args.isMulti ? [] : undefined);
    // @ts-expect-error, @todo: fix typings of field component
  }, [args.isMulti]);

  // hintIcon will only render when hint exists

  return (
    <div style={{ height: 300 }}>
      {/* @ts-expect-error, @todo: fix typings of field component */}
      <AsyncCreatableSelectField
        value={value}
        {...args}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        /** needs to be set to undefined (cause storybook adds an empty function via args) */
        onCreateOption={undefined}
      />
      <hr />
      <strong>State:</strong>
      <pre>{JSON.stringify({ value }, null, 2)}</pre>
    </div>
  );
};

BasicExample.args = {
  // @ts-expect-error, @todo: fix typings of field component
  id: 'favAnimal-id',
  isMulti: true,
  hint: 'Bonus points if it is a mammal',
  defaultOptions: animalOptions,
  description: '',
  badge: '',
  name: 'favAnimal',
  horizontalConstraint: 7,
  errors: {
    missing: true,
    customError: true,
  },
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
  'aria-label': 'Accessible label',
  'aria-labelledby': '',
  backspaceRemovesValue: true,
  containerId: '',
  isAutofocussed: false,
  isDisabled: false,
  isReadOnly: false,
  hasWarning: false,
  placeholder: 'Select animal...',
  title: 'Favourite animal',
  maxMenuHeight: 220,
  isSearchable: true,
  isClearable: false,
  tabIndex: '0',
  tabSelectsValue: true,
  loadOptions: loadOptions,
  cacheOptions: false,
  allowCreateWhileLoading: false,
  createOptionPosition: 'last',
  isCondensed: false,
  noOptionsMessage: (str: string) => `There are no animals matching "${str}"`,
};
