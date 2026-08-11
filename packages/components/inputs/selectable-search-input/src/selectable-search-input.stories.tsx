import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeViewIcon } from '@commercetools-uikit/icons';
import SelectableSearchInput from './selectable-search-input';
import { iconArgType, VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof SelectableSearchInput> = {
  title: 'Form/Inputs/SelectableSearchInput',
  component: SelectableSearchInput,
  argTypes: {
    rightActionIcon: iconArgType,
    menuShouldBlockScroll: {
      control: 'boolean',
    },
  },
};
export default meta;

type Story = StoryObj<typeof SelectableSearchInput>;

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

export const BasicExample: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: 400 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    id: 'ssi-test-id',
    name: 'ssi-test-name',
    placeholder: 'Placeholder text...',
    value: {
      text: 'Dachshund',
      option: 'dog',
    },
    rightActionProps: {
      label: 'Right action',
      onClick: () => {},
    },
    options,
  },
};

// The route file calls these `value` and `options`; renamed because `options`
// above is a different list used by the demo story.
const visualValue = {
  text: 'hello world',
  option: 'one',
};
const visualOptions = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
];

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <SelectableSearchInput
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={16}
          onSubmit={() => {}}
          onReset={() => {}}
          options={visualOptions}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <SelectableSearchInput
          isDisabled={true}
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={16}
          onSubmit={() => {}}
          onReset={() => {}}
          options={visualOptions}
        />
      </VisualSpec>
      <VisualSpec label="when read-only">
        <SelectableSearchInput
          isReadOnly={true}
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={16}
          onSubmit={() => {}}
          onReset={() => {}}
          options={visualOptions}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is visible">
        <SelectableSearchInput
          value={{ text: '', option: '' }}
          placeholder="Enter a text"
          onChange={() => {}}
          horizontalConstraint={16}
          onSubmit={() => {}}
          onReset={() => {}}
          options={visualOptions}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is visible and input is disabled">
        <SelectableSearchInput
          isDisabled={true}
          value={{ text: '', option: '' }}
          placeholder="Enter a text"
          onChange={() => {}}
          horizontalConstraint={16}
          onSubmit={() => {}}
          onReset={() => {}}
          options={visualOptions}
        />
      </VisualSpec>
      <VisualSpec label="with error">
        <SelectableSearchInput
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={16}
          onSubmit={() => {}}
          onReset={() => {}}
          options={visualOptions}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning">
        <SelectableSearchInput
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={16}
          onSubmit={() => {}}
          onReset={() => {}}
          options={visualOptions}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="with error and warning">
        <SelectableSearchInput
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={16}
          onSubmit={() => {}}
          onReset={() => {}}
          options={visualOptions}
          hasError={true}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled with error">
        <SelectableSearchInput
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={16}
          onSubmit={() => {}}
          onReset={() => {}}
          options={visualOptions}
          isDisabled={true}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="when disabled with warning">
        <SelectableSearchInput
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={16}
          onSubmit={() => {}}
          onReset={() => {}}
          options={visualOptions}
          isDisabled={true}
          hasWarning={true}
        />
      </VisualSpec>
      <VisualSpec label="when isClearable is false">
        <SelectableSearchInput
          isReadOnly={true}
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={16}
          onSubmit={() => {}}
          onReset={() => {}}
          options={visualOptions}
          isClearable={false}
        />
      </VisualSpec>
      <VisualSpec label="when showSubmitButton is false">
        <SelectableSearchInput
          isReadOnly={true}
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={16}
          onSubmit={() => {}}
          onReset={() => {}}
          options={visualOptions}
          isClearable={false}
          showSubmitButton={false}
        />
      </VisualSpec>
      <VisualSpec label="is condensed">
        <SelectableSearchInput
          value={visualValue}
          onChange={() => {}}
          isCondensed={true}
          horizontalConstraint={16}
          onSubmit={() => {}}
          onReset={() => {}}
          options={visualOptions}
        />
      </VisualSpec>
      <VisualSpec label="with right action">
        <SelectableSearchInput
          value={visualValue}
          onChange={() => {}}
          horizontalConstraint={16}
          onSubmit={() => {}}
          onReset={() => {}}
          options={visualOptions}
          rightActionIcon={<CodeViewIcon />}
          rightActionProps={{
            label: 'Click me',
            onClick: () => {},
          }}
        />
      </VisualSpec>
      <VisualSpec label="with right action + condensed">
        <SelectableSearchInput
          value={visualValue}
          onChange={() => {}}
          isCondensed={true}
          horizontalConstraint={16}
          onSubmit={() => {}}
          onReset={() => {}}
          options={visualOptions}
          rightActionIcon={<CodeViewIcon />}
          rightActionProps={{
            label: 'Click me',
            onClick: () => {},
          }}
        />
      </VisualSpec>
    </>
  ),
};
