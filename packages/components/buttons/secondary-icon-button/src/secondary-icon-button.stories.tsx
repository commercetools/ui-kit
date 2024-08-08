import type { Meta, StoryObj } from '@storybook/react';
import SecondaryIconButton from './secondary-icon-button';
import { iconArgType } from '@/storybook-helpers';

const meta: Meta<typeof SecondaryIconButton> = {
  title: 'components/Buttons/SecondaryIconButton',
  component: SecondaryIconButton,
  argTypes: {
    as: {
      control: 'text',
    },
    icon: iconArgType,
    size: {
      control: 'select',
      options: ['10', '20', '30', '40'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof SecondaryIconButton>;

export const BasicExample: Story = {
  args: {
    icon: 'AngleDownIcon',
    label: 'Descriptive mandatory label',
  },
};
