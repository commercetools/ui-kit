import type { Meta, StoryObj } from '@storybook/react';
import PrimaryButton from './primary-button';
import { iconArgType } from '@/storybook-helpers';

const meta: Meta<typeof PrimaryButton> = {
  title: 'components/Buttons/PrimaryButton',
  component: PrimaryButton,
  argTypes: {
    as: {
      control: 'text',
    },
    iconLeft: iconArgType,
    size: {
      control: 'select',
      options: ['10', '20'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof PrimaryButton>;

export const BasicExample: Story = {
  args: {
    label: 'Button Label Text',
    iconLeft: 'AngleDownIcon',
  },
};
