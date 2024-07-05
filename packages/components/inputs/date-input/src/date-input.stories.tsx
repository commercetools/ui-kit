import type { Meta, StoryObj } from '@storybook/react';
import DateInput from './date-input';

const meta: Meta<typeof DateInput> = {
  title: 'form/DateInput',
  component: DateInput,
};
export default meta;

type Story = StoryObj<typeof DateInput>;

export const BasicExample: Story = {
  args: {
    horizontalConstraint: 7,
  },
};
