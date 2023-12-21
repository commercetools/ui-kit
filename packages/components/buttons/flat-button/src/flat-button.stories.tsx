import type { Meta, StoryObj } from '@storybook/react';
import { iconArgType } from '@/storybook-helpers';

import FlatButton, { TFlatButtonProps } from './flat-button';

const meta = {
  title: 'Components/Buttons/FlatButton',
  component: FlatButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: iconArgType,
  },
} satisfies Meta<TFlatButtonProps<'button'>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accessibility text',
  },
};
