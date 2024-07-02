import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './avatar';
import { iconArgType } from '@/storybook-helpers';

const meta: Meta<typeof Avatar> = {
  title: 'components/Avatar',
  component: Avatar,
  argTypes: {
    icon: iconArgType,
  },
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const BasicExample: Story = {
  args: {
    firstName: 'John',
    lastName: 'Doe',
    size: 'm',
  },
};
