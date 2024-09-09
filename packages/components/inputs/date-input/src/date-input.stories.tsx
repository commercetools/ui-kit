import type { Meta, StoryObj } from '@storybook/react';
import DateInput from './date-input';

const meta: Meta<typeof DateInput> = {
  title: 'Form/Inputs/DateInput',
  component: DateInput,
  decorators: [
    (Story) => (
      <div style={{ minHeight: 350 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof DateInput>;

export const BasicExample: Story = {
  args: {
    horizontalConstraint: 7,
  },
};
