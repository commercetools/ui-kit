import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { iconArgType, VisualSpec } from '@/storybook-helpers';
import SelectField from './select-field';
import { useEffect, useState } from 'react';

const meta: Meta<typeof SelectField> = {
  title: 'Form/Fields/SelectField',
  // @ts-expect-error, fix story and/or types
  component: SelectField,
  argTypes: {
    // @ts-expect-error
    touched: { control: 'boolean' },
    'aria-label': { control: 'text' },
    'aria-labelledby': { control: 'text' },
    controlShouldRenderValue: { control: 'boolean' },
    title: { control: 'text' },
    hint: { control: 'text' },
    description: { control: 'text' },
    badge: { control: 'text' },
    hintIcon: iconArgType,
    iconLeft: iconArgType,
  },
};
export default meta;

type Story = StoryFn<typeof SelectField>;

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
  const [value, onChange] = useState<string | string[] | null | undefined>(
    undefined
  );

  useEffect(() => {
    // @ts-expect-error
    onChange(args.isMulti ? [] : undefined);
    // @ts-expect-error
  }, [args.isMulti]);

  return (
    <div style={{ height: 400 }}>
      {/** @ts-expect-error */}
      <SelectField
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
  // @ts-expect-error
  id: 'select-field-id',
  name: 'select-field-name',
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
  appearance: 'default',
  'aria-label': '',
  'aria-labelledby': '',
  backspaceRemovesValue: true,
  controlShouldRenderValue: true,
  containerId: '',
  isAutofocussed: false,
  isDisabled: false,
  isReadOnly: false,
  isCondensed: false,
  isMulti: false,
  placeholder: 'Select...',
  title: 'Favourite animal',
  maxMenuHeight: 220,
  isSearchable: false,
  isClearable: false,
  options,
  tabIndex: 0,
  tabSelectsValue: true,
  hint: 'Bonus points if it is a mammal',
  description: '',
  onInfoButtonClick: () => alert('info button clicked'),
  hasWarning: false,
  badge: '',
};

// Renamed to avoid the `options` the demo stories declare above.
const visualOptions = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
];

const visualValue = 'one';

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <SelectField
          title="State"
          name="form-field-name"
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <SelectField
          title="State"
          name="form-field-name"
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label={'with "missing" error when not touched'}>
        <SelectField
          title="State"
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          errors={{ missing: true }}
        />
      </VisualSpec>
      <VisualSpec label={'with "missing" error when touched'}>
        <SelectField
          title="State"
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          errors={{ missing: true }}
          touched={true}
        />
      </VisualSpec>
      <VisualSpec label="with hint">
        <SelectField
          title="State"
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          hint="Select a state"
        />
      </VisualSpec>
      <VisualSpec label="when read-only">
        <SelectField
          title="State"
          name="form-field-name"
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          isReadOnly={true}
        />
      </VisualSpec>
      <VisualSpec label="when is condensed">
        <SelectField
          title="State"
          name="form-field-name"
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          isCondensed={true}
        />
      </VisualSpec>
      <VisualSpec label="when has warning">
        <SelectField
          title="State"
          name="form-field-name"
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning when not touched">
        <SelectField
          title="State"
          name="form-field-name"
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          warnings={{ customWarning: true }}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
      <VisualSpec label="with warning when touched">
        <SelectField
          title="State"
          name="form-field-name"
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          warnings={{ customWarning: true }}
          touched={true}
          renderWarning={() => 'Custom warning'}
        />
      </VisualSpec>
    </>
  ),
};
