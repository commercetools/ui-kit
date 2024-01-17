import type { Meta, StoryObj } from '@storybook/react';
import PageSizeSelector from './page-size-selector';

const meta = {
  title: 'Components/Pagination/PageSizeSelector',
  component: PageSizeSelector,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 180,
      },
    },
  },
} satisfies Meta<typeof PageSizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    pageItems: 18,
    perPage: 20,
    perPageRange: 's',
    onPerPageChange: () => {},
  },
};
