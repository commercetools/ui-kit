import type { Meta, StoryObj } from '@storybook/react';
import * as icons from '@commercetools-uikit/icons';
import { iconArgType } from '@/storybook-helpers';

import SecondaryButton from './secondary-button';

const iconNames = Object.keys(icons);

const meta = {
  title: 'Components/Buttons/SecondaryButton',
  component: SecondaryButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    iconLeft: iconArgType,
  },
} satisfies Meta<typeof SecondaryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accessibility text',
    iconLeft: iconNames[0],
    isToggleButton: false,
  },
};

export const Info: Story = {
  args: {
    ...Default.args,
    tone: 'info',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'small',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
};
