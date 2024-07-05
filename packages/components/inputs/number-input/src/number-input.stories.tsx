import type { Meta, StoryObj } from '@storybook/react';
import NumberInput from './number-input';

const meta: Meta<typeof NumberInput> = {
  title: 'form/NumberInput',
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
