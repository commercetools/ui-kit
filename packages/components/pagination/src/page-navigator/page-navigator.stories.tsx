import type { Meta, StoryObj } from '@storybook/react';
import { Value } from 'react-value';
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
    totalPages: 10,
    page: 1,
  },
  render: (args) => {
    return (
      <Value
        defaultValue={args.page}
        render={(page, onPageChange) => (
          <PageNavigator
            totalPages={args.totalPages}
            page={page}
            onPageChange={onPageChange}
          />
        )}
      />
    );
  },
};
