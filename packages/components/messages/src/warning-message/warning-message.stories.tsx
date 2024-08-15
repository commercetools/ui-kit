import type { Meta, StoryObj } from '@storybook/react';
import WarningMessage from './warning-message';

const meta: Meta<typeof WarningMessage> = {
  title: 'components/Messages/WarningMessage',
  component: WarningMessage,
  argTypes: {
    intlMessage: { control: { disable: true } },
  },
};
export default meta;

type Story = StoryObj<typeof WarningMessage>;

export const BasicExample: Story = {
  args: {
    children: 'This name is already being used by another variant',
  },
};
