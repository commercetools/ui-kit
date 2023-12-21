import type { Meta, StoryObj } from '@storybook/react';
import * as icons from '@commercetools-uikit/icons';
import { iconArgType } from '@/storybook-helpers';

import IconButton from './icon-button';

const iconNames = Object.keys(icons);

const meta = {
  title: 'Components/Buttons/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: iconArgType,
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    typ: 'button',
    shape: 'round',
    size: 'big',
    theme: 'default',
    icon: iconNames[0],
    onClick: () => {},
    label: 'Accessibility text',
    isToggleButton: false,
    isToggled: false,
    isDisabled: false,
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
};

export const Toggled: Story = {
  args: {
    ...Default.args,
    isToggleButton: true,
    isToggled: true,
  },
};
