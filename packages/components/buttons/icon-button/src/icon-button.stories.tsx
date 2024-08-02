import type { Meta, StoryObj } from '@storybook/react';
import IconButton from './icon-button';
import { iconArgType } from '@/storybook-helpers';
import { InformationIcon } from '@commercetools-uikit/icons';

const meta: Meta<typeof IconButton> = {
  title: 'components/Buttons/IconButton',
  component: IconButton,
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

type Story = StoryObj<typeof IconButton>;

export const BasicExample: Story = {
  args: {
    icon: <InformationIcon />,
    label: 'A mandatory label for screenreaders',
    onClick: () => alert('Button clicked'),
  },
};
