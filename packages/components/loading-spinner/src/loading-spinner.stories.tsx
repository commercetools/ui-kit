import type { Meta, StoryObj } from '@storybook/react';

import LoadingSpinner from './loading-spinner';

const meta = {
  title: 'Components/Loading/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'Loading text',
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    scale: 'l',
  },
};

export const Small: Story = {
  args: {
    scale: 's',
  },
};

export const WithLongRenderWait = {
  args: {
    maxDelayDuration: 2000,
  },
};
