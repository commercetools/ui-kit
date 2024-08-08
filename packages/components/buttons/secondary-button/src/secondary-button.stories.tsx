import type { Meta, StoryObj } from '@storybook/react';
import SecondaryButton from './secondary-button';
import { iconArgType } from '@/storybook-helpers';

const meta: Meta<typeof SecondaryButton> = {
  title: 'components/Buttons/SecondaryButton',
  component: SecondaryButton,
  argTypes: {
    iconLeft: iconArgType,
    as: {
      control: 'text',
    },
    size: {
      control: 'select',
      options: ['10', '20'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof SecondaryButton>;

export const BasicExample: Story = {
  args: {
    label: 'Button Label Text',
    iconLeft: 'AngleDownIcon',
  },
};
