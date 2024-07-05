import type { Meta, StoryObj } from '@storybook/react';
import TimeInput from './time-input';

const meta: Meta<typeof TimeInput> = {
  title: 'form/TimeInput',
  component: TimeInput,
};
export default meta;

type Story = StoryObj<typeof TimeInput>;

export const BasicExample: Story = {
  args: {
    value: '17:12',
    placeholder: 'Enter time...',
    horizontalConstraint: 7,
  },
};
