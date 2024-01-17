import type { Meta, StoryObj } from '@storybook/react';
import Pagination from './pagination';

const meta = {
  title: 'Components/Pagination/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 180,
      },
    },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalItems: 200,
    page: 1,
    perPage: 20,
    perPageRange: 's',
    onPageChange: () => {},
    onPerPageChange: () => {},
  },
};
