import type { Meta, StoryObj } from '@storybook/react';
import Filters from './filters';

const meta: Meta<typeof Filters> = {
  title: 'components/Filters',
  component: Filters,
  tags: ['local-dev'],
  argTypes: {
    label: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof Filters>;

export const BasicExample: Story = {
  args: {
    label: 'A component for applying multiple filter controls',
  },
};
