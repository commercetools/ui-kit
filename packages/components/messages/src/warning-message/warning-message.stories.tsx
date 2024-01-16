import type { Meta, StoryObj } from '@storybook/react';
import WarningMessage from './warning-message';

const meta = {
  title: 'Components/Messages/WarningMessage',
  component: WarningMessage,
  tags: ['autodocs'],
} satisfies Meta<typeof WarningMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This name is already being used by another variant',
  },
};
