import type { Meta, StoryObj } from '@storybook/react';
import ErrorMessage from './error-message';

const meta: Meta<typeof ErrorMessage> = {
  title: 'components/Messages/ErrorMessage',
  component: ErrorMessage,
  argTypes: {
    intlMessage: { control: { disable: true } },
  },
};
export default meta;

type Story = StoryObj<typeof ErrorMessage>;

export const BasicExample: Story = {
  args: {
    children: 'Required text missing',
  },
};
