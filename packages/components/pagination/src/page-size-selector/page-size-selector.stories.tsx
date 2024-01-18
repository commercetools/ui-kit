import type { Meta, StoryObj } from '@storybook/react';
import PageSizeSelector, { type TPageRangeSize } from './page-size-selector';

const getMinimumPageSizeFromRange = (selectedRange: TPageRangeSize) => {
  switch (selectedRange) {
    case 'l':
      return 200;
    default:
      return 20;
  }
};

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
  // @ts-ignore Not providing `perPage` as it's computed based on the provided `perPageRange`
  args: {
    pageItems: 18,
    perPageRange: 's',
  },
  parameters: { controls: { exclude: ['perPage'] } },
  render: (args) => {
    return (
      <PageSizeSelector
        pageItems={args.pageItems}
        perPage={getMinimumPageSizeFromRange(args.perPageRange)}
        perPageRange={args.perPageRange}
        onPerPageChange={() => {}}
      />
    );
  },
};
