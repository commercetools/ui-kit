import type { Meta, StoryObj } from '@storybook/react';
import Avatar from './avatar';

// Export a default export named 'default' (if applicable)
const meta: Meta<typeof Avatar> = {
  title: 'UNSORTED/Avatar',
  component: Avatar,
};

type Story = StoryObj<typeof Avatar>;
// Define your stories using the 'args' pattern
export const BasicExample: Story = (args) => <Avatar {...args} />;

// Optionally, provide default values for your component props
BasicExample.args = {
  // Define your component's props here
  firstName: 'John',
  lastName: 'Doe',
  size: 'm',
  color: 'accent',
};

export default meta;
