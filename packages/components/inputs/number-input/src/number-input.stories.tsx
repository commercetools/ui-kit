import type { Meta, StoryObj } from '@storybook/react-vite';
import NumberInput from './number-input';
import { VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof NumberInput> = {
  title: 'Form/Inputs/NumberInput',
  component: NumberInput,
  argTypes: {
    value: {
      control: 'number',
    },
    step: {
      control: 'number',
    },
  },
};
export default meta;

type Story = StoryObj<typeof NumberInput>;

export const BasicExample: Story = {
  args: {
    placeholder: 'Enter a number',
    value: undefined,
    horizontalConstraint: 7,
  },
};

const value = '18';

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="minimal">
        <NumberInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when disabled">
        <NumberInput
          isDisabled={true}
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when read-only">
        <NumberInput
          isReadOnly={true}
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is visible">
        <NumberInput
          value=""
          placeholder="Enter a text"
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="when placeholder is visible and input is disabled">
        <NumberInput
          isDisabled={true}
          value=""
          placeholder="Enter a text"
          onChange={() => {}}
          horizontalConstraint={7}
        />
      </VisualSpec>
      <VisualSpec label="with error">
        <NumberInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          hasError={true}
        />
      </VisualSpec>
      <VisualSpec label="with warning">
        <NumberInput
          value={value}
          onChange={() => {}}
          horizontalConstraint={7}
          hasWarning={true}
        />
      </VisualSpec>
    </>
  ),
};
