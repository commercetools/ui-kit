import type { Meta, StoryObj } from '@storybook/react';
import TextInput from './text-input';

const meta: Meta<typeof TextInput> = {
  title: 'form/TextInput',
  component: TextInput,
};
export default meta;

type Story = StoryObj<typeof TextInput>;

export const BasicExample: Story = {
  args: {
    placeholder: 'Placeholder text',
  },
};
