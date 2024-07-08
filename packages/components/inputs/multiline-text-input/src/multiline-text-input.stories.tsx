import type { Meta, StoryObj } from '@storybook/react';
import MultilineTextInput from './multiline-text-input';
import { iconArgType } from '@/storybook-helpers';

const meta: Meta<typeof MultilineTextInput> = {
  title: 'form/MultilineTextInput',
  component: MultilineTextInput,
  argTypes: {
    rightActionIcon: iconArgType,
  },
};
export default meta;

type Story = StoryObj<typeof MultilineTextInput>;

export const BasicExample: Story = {
  args: {
    placeholder: 'Placeholder text',
  },
};
