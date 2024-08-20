import type { Meta, StoryObj } from '@storybook/react';
import AdditionalInfoMessage from './additional-info-message';

const meta: Meta<typeof AdditionalInfoMessage> = {
  title: 'components/Messages/AdditionalInfoMessage',
  component: AdditionalInfoMessage,
};
export default meta;

type Story = StoryObj<typeof AdditionalInfoMessage>;

export const BasicExample: Story = {
  args: {
    message: 'This is an information message',
  },
};
