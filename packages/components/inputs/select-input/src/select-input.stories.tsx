import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import { WorldIcon } from '@commercetools-uikit/icons';
import SelectInput from './select-input';
import { iconArgType, VisualSpec } from '@/storybook-helpers';
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
    // minHeight, not height: identical for the demo stories, but a fixed height
    // would leave the 22-state stack overflowing a 350px box.
    (Story) => (
      <div style={{ minHeight: 350 }}>
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

// The route file calls these `options` and `value`; renamed because `options`
// above is a different, much longer list used by the demo stories.
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
        <SelectInput
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <SelectInput
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="when condensed">
        <SelectInput
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          isCondensed={true}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is shown">
        <SelectInput
          value={null}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          placeholder="Select something"
        />
      </VisualSpec>
      <VisualSpec label="with a long placeholder">
        <SelectInput
          value={null}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
      </VisualSpec>
      <VisualSpec label="with error">
        <SelectInput
          value={null}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning">
        <SelectInput
          value={null}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="with error and warning">
        <SelectInput
          value={null}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          hasError={true}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="with multiple values selected">
        <SelectInput
          value={['one', 'two']}
          onChange={() => {}}
          options={visualOptions}
          isMulti={true}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="with multiple values selected and disabled">
        <SelectInput
          value={['one', 'two']}
          onChange={() => {}}
          options={visualOptions}
          isMulti={true}
          isDisabled={true}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="with multiple values selected and condensed">
        <SelectInput
          value={['one', 'two']}
          onChange={() => {}}
          options={visualOptions}
          isMulti={true}
          isCondensed={true}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when read-only">
        <SelectInput
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          isReadOnly={true}
        />
      </VisualSpec>
      <VisualSpec label="with multiple values selected and read-only">
        <SelectInput
          value={['one', 'two']}
          onChange={() => {}}
          options={visualOptions}
          isMulti={true}
          isReadOnly={true}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="with iconLeft">
        <SelectInput
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          iconLeft={<WorldIcon />}
        />
      </VisualSpec>
      <VisualSpec label="with iconLeft and no selected value">
        <SelectInput
          value={null}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={7}
          iconLeft={<WorldIcon />}
        />
      </VisualSpec>
      <VisualSpec label="Quiet appearance">
        <SelectInput
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={'auto'}
          appearance="quiet"
        />
      </VisualSpec>
      <VisualSpec label="Quiet disabled">
        <SelectInput
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={'auto'}
          appearance="quiet"
          isDisabled={true}
        />
      </VisualSpec>
      <VisualSpec label="Quiet read-only">
        <SelectInput
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={'auto'}
          appearance="quiet"
          isReadOnly={true}
        />
      </VisualSpec>
      <VisualSpec label="Quiet error">
        <SelectInput
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={'auto'}
          appearance="quiet"
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="Quiet warning">
        <SelectInput
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={'auto'}
          appearance="quiet"
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="Quiet with multiple values selected">
        <SelectInput
          value={['one', 'two']}
          onChange={() => {}}
          options={visualOptions}
          isMulti={true}
          horizontalConstraint={'auto'}
          appearance="quiet"
        />
      </VisualSpec>
      <VisualSpec label="Quiet with iconLeft">
        <SelectInput
          value={visualValue}
          onChange={() => {}}
          options={visualOptions}
          horizontalConstraint={'auto'}
          iconLeft={<WorldIcon />}
          appearance="quiet"
        />
      </VisualSpec>
    </>
  ),
};
