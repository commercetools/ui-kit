import type { Meta, StoryFn } from '@storybook/react';
import AsyncSelectField from './async-select-field';
import { useEffect, useState } from 'react';
import { iconArgType } from '@/storybook-helpers';

const meta: Meta<typeof AsyncSelectField> = {
  title: 'field/AsyncSelectField',
  //@ts-expect-error refactor component for propert typings
  component: AsyncSelectField,
  argTypes: {
    //@ts-expect-error refactor component for propert typings
    iconLeft: iconArgType,
    hintIcon: iconArgType,
    name: { control: { type: 'text' } },
    id: { control: { type: 'text' } },
    hint: { control: { type: 'text' } },
    loadingMessage: { control: { type: 'text' } },
    touched: { control: { type: 'boolean' } },
    'aria-label': { control: { type: 'text' } },
    'aria-labelledby': { control: { type: 'text' } },
    backspaceRemovesValue: { control: { type: 'boolean' } },
    containerId: { control: { type: 'text' } },
    controlShouldRenderValue: { control: { type: 'boolean' } },
    isDisabled: { control: { type: 'boolean' } },
    isMulti: { control: { type: 'boolean' } },
    placeholder: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    isSearchable: { control: { type: 'boolean' } },
    isClearable: { control: { type: 'boolean' } },
    tabIndex: { control: { type: 'text' } },
    tabSelectsValue: { control: { type: 'boolean' } },
    cacheOptions: { control: { type: 'boolean' } },
    description: { control: { type: 'text' } },
    badge: { control: { type: 'text' } },
    menuShouldBlockScroll: { control: { type: 'boolean' } },
  },
};
export default meta;

type Story = StoryFn<typeof AsyncSelectField>;

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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const filterAnimals = (inputValue: string) =>
  animalOptions.filter((animalOption) =>
    animalOption.label.toLowerCase().includes(inputValue.toLowerCase())
  );

const loadOptions = (inputValue: string) =>
  delay(500).then(() => filterAnimals(inputValue));

export const BasicExample: Story = (args) => {
  const [value, onChange] = useState<unknown>(undefined);

  useEffect(() => {
    //@ts-expect-error refactor component for propert typings
    onChange(args.isMulti ? [] : undefined);
    //@ts-expect-error refactor component for propert typings
  }, [args.isMulti]);

  // hintIcon will only render when hint exists

  return (
    <div style={{ height: 300 }}>
      {/** @ts-expect-error refactor component for propert typings */}
      <AsyncSelectField
        {...args}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    </div>
  );
};

BasicExample.args = {
  // @ts-expect-error refactor component for propert typings
  name: 'favAnimal-name',
  id: 'favAnimal-id',
  hint: 'Bonus points if it is a mammal',
  loadingMessage: 'Loading results',
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
  controlShouldRenderValue: true,
  isAutofocussed: false,
  isCondensed: false,
  isDisabled: false,
  isReadOnly: false,
  isMulti: false,
  hasWarning: false,
  placeholder: 'Select animal...',
  title: 'Favourite animal',
  maxMenuHeight: 220,
  isSearchable: true,
  isClearable: true,
  tabIndex: '0',
  tabSelectsValue: true,
  loadOptions,
  cacheOptions: false,
  description: '',
  badge: '',
  defaultOptions: animalOptions,
  noOptionsMessage: ({ inputValue }: { inputValue: string }) =>
    `Nothing found for "${inputValue}"`,
};
