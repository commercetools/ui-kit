import Tag from '@commercetools-uikit/tag';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';

export type TQuickFiltersItem = {
  /** unique identifier for the item. */
  id: string;
  /* label to display */
  label: string;
  /* the current active state of the item */
  isActive: boolean;
};

export type TQuickFiltersProps = {
  /**
   * collection of quick filter items
   *
   * @param item.id unique identifier for the item.
   * @param item.label label to display
   * @param item.isActive the current active state of the item
   */
  items: TQuickFiltersItem[];

  /** callback fn, executed when an item is clicked */
  onItemClick: (item: TQuickFiltersItem) => void;
};

const listStyles = css`
  all: unset;
  display: inline-flex;
  flex-wrap: wrap;
  gap: ${designTokens.spacing20};
`;

const listItemStyles = css`
  all: unset;
  user-select: none;
`;

function QuickFilters({ items, onItemClick }: TQuickFiltersProps) {
  return (
    <ul css={listStyles}>
      {items.map((item) => (
        <li key={item.id} css={listItemStyles}>
          <Tag
            tone={item.isActive ? `primary` : 'surface'}
            onClick={() => onItemClick(item)}
          >
            {item.label}
          </Tag>
        </li>
      ))}
    </ul>
  );
}

export default QuickFilters;
