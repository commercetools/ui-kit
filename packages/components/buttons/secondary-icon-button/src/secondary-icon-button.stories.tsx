import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as icons from '@commercetools-uikit/icons';

import SecondaryIconButton from './secondary-icon-button';

const iconNames = Object.keys(icons);

const meta = {
  title: 'Components/Buttons/SecondaryIconButton',
  component: SecondaryIconButton,
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
} satisfies Meta<typeof SecondaryIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: iconNames[0],
    label: 'Accessibility text',
    color: 'solid',
    size: 'big',
    isDisabled: false,
  },
};

export const Critical: Story = {
  args: {
    ...Default.args,
    tone: 'critical',
  },
};

export const Primary: Story = {
  args: {
    ...Default.args,
    color: 'primary',
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
