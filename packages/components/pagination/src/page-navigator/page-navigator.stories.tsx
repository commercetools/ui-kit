import type { Meta, StoryObj } from '@storybook/react';
import { withControlledValue } from '@/storybook-helpers';
import PageNavigator, { type TPageNavigatorProps } from './page-navigator';

const meta = {
  title: 'Components/Pagination/PageNavigator',
  component: PageNavigator,
  tags: ['autodocs'],
} satisfies Meta<typeof PageNavigator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalPages: 10,
    page: 1,
  },
  render: withControlledValue<TPageNavigatorProps>(
    PageNavigator,
    'page',
    'onPageChange'
  ),
};
