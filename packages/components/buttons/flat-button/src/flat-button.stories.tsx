import { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as icons from '@commercetools-uikit/icons';

import FlatButton, { TFlatButtonProps } from './flat-button';

const iconNames = Object.keys(icons);

const meta = {
  title: 'Components/Buttons/FlatButton',
  component: FlatButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  // args: {
  //   // icon: iconNames[0],
  //   label: 'Accessibility text',
  // },
  argTypes: {
    icon: {
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
} satisfies Meta<TFlatButtonProps<'button'>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // icon: iconNames[0],
    label: 'Accessibility text',
  },
};
