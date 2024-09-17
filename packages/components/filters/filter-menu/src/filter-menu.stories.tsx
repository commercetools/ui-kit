import type { Meta, StoryObj } from '@storybook/react';
import FilterMenu from './filter-menu';

const meta: Meta<typeof FilterMenu> = {
  title: 'components/Filters/FilterMenu',
  component: FilterMenu,
  tags: ['local-dev'],
  argTypes: {
    label: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof FilterMenu>;

export const BasicExample: Story = {
  args: {
    label: 'A label text',
  },
};
