import type { Meta, StoryObj } from '@storybook/react';
import PasswordInput from './password-input';

const meta: Meta<typeof PasswordInput> = {
  title: 'Form/Inputs/PasswordInput',
  component: PasswordInput,
};
export default meta;

type Story = StoryObj<typeof PasswordInput>;

export const BasicExample: Story = {
  args: {
    name: 'password',
    placeholder: 'Password',
    horizontalConstraint: 7,
  },
};
