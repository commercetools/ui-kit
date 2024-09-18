import type { Meta, StoryObj } from '@storybook/react';
import FiltersList from './filters-list';

const meta: Meta<typeof FiltersList> = {
  title: 'components/Filters/FiltersList',
  component: FiltersList,
  tags: ['local-dev'],
  argTypes: {
    label: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryObj<typeof FiltersList>;

export const BasicExample: Story = {
  args: {
    label: 'A list of filters',
  },
};
