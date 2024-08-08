import type { Meta, StoryObj } from '@storybook/react';
import styled from '@emotion/styled';
import PageNavigator from './page-navigator';

const meta: Meta<typeof PageNavigator> = {
  title: 'components/Pagination/PageNavigator',
  component: PageNavigator,
};

export default meta;

type Story = StoryObj<typeof PageNavigator>;

const Container = styled.div`
  display: block;
  height: 256px;
  margin-top: 96px;
  align-items: center;
`;

export const BasicExample: Story = {
  args: {
    totalPages: 10,
    page: 2,
    onPageChange: () => {},
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
