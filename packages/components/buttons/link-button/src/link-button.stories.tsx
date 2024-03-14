import type { Meta, StoryObj } from '@storybook/react';
import LinkButton from './link-button';

const meta = {
  title: 'Components/Buttons/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: '',
    to: '',
  },
  render: () => <></>,
};
