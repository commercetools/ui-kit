import type { Meta, StoryObj } from '@storybook/react';
import styled from '@emotion/styled';
import PageSizeSelector from './page-size-selector';

const meta: Meta<typeof PageSizeSelector> = {
  title: 'components/Pagination/PageSizeSelector',
  component: PageSizeSelector,
};

export default meta;

type Story = StoryObj<typeof PageSizeSelector>;

const Container = styled.div`
  display: block;
  height: 256px;
  margin-top: 96px;
  align-items: center;
`;

export const BasicExample: Story = {
  args: {
    pageItems: 20,
    perPageRange: 's',
    onPerPageChange: () => {},
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
