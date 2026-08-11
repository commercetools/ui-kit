import type { Meta, StoryObj } from '@storybook/react-vite';
import styled from '@emotion/styled';
import Pagination from './pagination';
import { VisualSpec } from '@/storybook-helpers';

const meta: Meta<typeof Pagination> = {
  title: 'components/Pagination/Pagination',
  component: Pagination,
};

export default meta;

type Story = StoryObj<typeof Pagination>;

const Container = styled.div`
  display: block;
  margin-top: 96px;
  margin-bottom: 96px;
  align-items: center;
`;

export const BasicExample: Story = {
  args: {
    totalItems: 200,
    page: 1,
    onPageChange: () => alert('onPageChange Request'),
    onPerPageChange: (v) => alert(`onPerPageChange Request: ${v}`),
    perPage: 20,
  },
  decorators: [
    (Story) => {
      return (
        <Container>
          <Story />
        </Container>
      );
    },
  ],
};

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="Pagination on first page (with 60 items)">
        <Pagination
          totalItems={60}
          page={1}
          onPageChange={() => null}
          onPerPageChange={() => null}
        />
      </VisualSpec>
      <VisualSpec label="Pagination on page in the middle (with 60 items)">
        <Pagination
          totalItems={60}
          page={2}
          onPageChange={() => null}
          onPerPageChange={() => null}
        />
      </VisualSpec>
      <VisualSpec label="Pagination on last page (with 60 items)">
        <Pagination
          totalItems={60}
          page={3}
          onPageChange={() => null}
          onPerPageChange={() => null}
        />
      </VisualSpec>
    </>
  ),
};
