import type { Meta, StoryObj } from '@storybook/react';

import Avatar from './avatar';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    firstName: 'Jon',
    lastName: 'Snow',
    size: 'l',
    gravatarHash: '',
  },
};

export const Highlighted: Story = {
  args: {
    ...Default.args,
    isHighlighted: true,
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 's',
  },
};
