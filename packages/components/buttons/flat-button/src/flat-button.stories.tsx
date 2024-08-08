import type { Meta, StoryObj } from '@storybook/react';
import FlatButton from './flat-button';
import { iconArgType } from '@/storybook-helpers';

const meta: Meta<typeof FlatButton> = {
  title: 'components/Buttons/FlatButton',
  component: FlatButton,
  argTypes: {
    icon: iconArgType,
    as: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof FlatButton>;

export const BasicExample: Story = {
  args: {
    tone: 'primary',
    label: 'A label text',
    onClick: () => alert('Button clicked'),
    isDisabled: false,
  },
};
