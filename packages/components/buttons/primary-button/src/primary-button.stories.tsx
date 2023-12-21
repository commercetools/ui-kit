import type { Meta, StoryObj } from '@storybook/react';
import * as icons from '@commercetools-uikit/icons';
import { iconArgType } from '@/storybook-helpers';

import PrimaryButton from './primary-button';

const iconNames = Object.keys(icons);

const meta = {
  title: 'Components/Buttons/PrimaryButton',
  component: PrimaryButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    iconLeft: iconArgType,
  },
} satisfies Meta<typeof PrimaryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'button',
    tone: 'primary',
    label: 'Accessibility text',
  },
};

export const Critical: Story = {
  args: {
    ...Default.args,
    tone: 'critical',
  },
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
    iconLeft: iconNames[0],
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
