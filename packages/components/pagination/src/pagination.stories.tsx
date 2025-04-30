import type { Meta, StoryObj } from '@storybook/react';
import styled from '@emotion/styled';
import Pagination from './pagination';

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
