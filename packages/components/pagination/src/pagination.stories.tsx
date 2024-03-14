import type { Meta, StoryObj } from '@storybook/react';
import { Value } from 'react-value';
import Pagination from './pagination';

const meta = {
  title: 'Components/Pagination/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      story: {
        height: '280px',
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
  },
  render: (args) => {
    return (
      <Value
        defaultValue={args.perPage}
        render={(perPage, onPerPageChange) => (
          <Value
            defaultValue={args.page}
            render={(page, onPageChange) => (
              <Pagination
                totalItems={args.totalItems}
                page={page}
                perPageRange={args.perPageRange}
                onPageChange={onPageChange}
                perPage={perPage}
                onPerPageChange={onPerPageChange}
              />
            )}
          />
        )}
      />
    );
  },
};
