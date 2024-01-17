import type { Meta, StoryObj } from '@storybook/react';
import PageNavigator from './page-navigator';

const meta = {
  title: 'Components/Pagination/PageNavigator',
  component: PageNavigator,
  tags: ['autodocs'],
} satisfies Meta<typeof PageNavigator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalPages: 3,
    page: 1,
    onPageChange: () => {},
  },
};
