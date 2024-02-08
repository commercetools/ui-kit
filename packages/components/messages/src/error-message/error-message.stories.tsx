import type { Meta, StoryObj } from '@storybook/react';
import ErrorMessage from './error-message';

const meta = {
  title: 'Components/Messages/ErrorMessage',
  component: ErrorMessage,
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Required text missing',
  },
};
