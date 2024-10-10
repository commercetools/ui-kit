import type { Meta, StoryObj } from '@storybook/react';
import QuickFilters, {
  TQuickFiltersItem,
  TQuickFiltersProps,
} from './quick-filters';
import { useState } from 'react';

const meta: Meta<typeof QuickFilters> = {
  title: 'components/QuickFilters',
  component: QuickFilters,
  //tags: ['local-dev'],
};
export default meta;

type Story = StoryObj<typeof QuickFilters>;

/** The `QuickFilters` component displays a selection of `Tag` components that represent the available filter actions. */
export const BasicExample: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [items, setItems] = useState<TQuickFiltersProps['items']>([
      {
        id: '1',
        label: 'Accepted (234)',
        isActive: true,
      },
      {
        id: '2',
        label: 'Rejected (25)',
        isActive: false,
      },
      {
        id: '3',
        label: 'Canceled (3)',
        isActive: false,
      },
      {
        id: '4',
        label: 'Drafts (58)',
        isActive: false,
      },
    ]);

    const onItemClick = (clickedItem: TQuickFiltersItem) => {
      const updatedItems = items.map((item) => {
        return {
          ...item,
          isActive: item.id === clickedItem.id ? !item.isActive : false,
        };
      });
      setItems(updatedItems);
    };

    return <QuickFilters {...args} items={items} onItemClick={onItemClick} />;
  },
  args: {},
};
