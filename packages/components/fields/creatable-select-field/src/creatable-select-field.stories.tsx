import type { Meta, StoryObj } from '@storybook/react';
import {
  hideControls,
  horizontalConstraintArgType,
  iconArgType,
  withControlledValue,
} from '@/storybook-helpers';

import CreatableSelectField, {
  type TCreatableSelectFieldProps,
} from './creatable-select-field';

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

const meta = {
  title: 'Components/Fields/SelectFields/CreatableSelectField',
  argTypes: {
    ...hideControls(['renderError', 'tabIndex', 'options', 'menuPortalTarget']),
    hintIcon: iconArgType,
    horizontalConstraint: horizontalConstraintArgType(),
    iconLeft: iconArgType,
    createOptionPosition: {
      control: 'select',
      options: ['first', 'last'],
    },
  },
} satisfies Meta<TCreatableSelectFieldProps>;

export default meta;
type Story = StoryObj<TCreatableSelectFieldProps>;

export const Default: Story = {
  args: {
    errors: { missing: true, customError: true },
    renderError: (key: string) => {
      switch (key) {
        case 'customError':
          return 'A custom error.';
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
    id: '',
    name: 'favAnimal',
    isAutofocussed: false,
    isDisabled: false,
    isReadOnly: false,
    isMulti: false,
    hasWarning: false,
    placeholder: 'Select...',
    title: 'Favourite animal',
    maxMenuHeight: 220,
    isSearchable: true,
    isClearable: false,
    tabIndex: 0,
    tabSelectsValue: true,
    options,
    // FieldLabel
    hint: 'Bonus points if it is a mammal',
    description: '',
    badge: '',
    // Creatable props
    allowCreateWhileLoading: false,
    createOptionPosition: 'last',
    menuPortalZIndex: 1,
    menuPortalTarget: document.body,
  },
  render: withControlledValue<TCreatableSelectFieldProps>(CreatableSelectField),
};
