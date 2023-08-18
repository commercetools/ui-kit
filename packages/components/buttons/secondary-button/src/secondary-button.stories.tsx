import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as icons from '@commercetools-uikit/icons';

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
    iconLeft: {
      options: ['', ...iconNames],
      mapping: Object.entries(icons).reduce<Record<string, ReactNode>>(
        (acc, [iconName, IconComponent]) => {
          acc[iconName] = <IconComponent />;
          return acc;
        },
        {}
      ),
    },
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
