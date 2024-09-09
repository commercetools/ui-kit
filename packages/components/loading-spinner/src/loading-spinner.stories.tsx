import type { Meta, StoryObj } from '@storybook/react';
import LoadingSpinner from './loading-spinner';

const meta: Meta<typeof LoadingSpinner> = {
  title: 'components/LoadingSpinner',
  component: LoadingSpinner,
  argTypes: {
    children: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof LoadingSpinner>;

export const BasicExample: Story = {
  args: {
    scale: 'l',
    children: 'Loading text...',
  },
};
