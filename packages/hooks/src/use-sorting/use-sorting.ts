import { useState, useDebugValue } from 'react';
import sortBy from 'lodash/sortBy';

export interface TItem {
  id: string;
}
export type TSortDirection = 'asc' | 'desc';
export type TSortingState<Item extends TItem = TItem> = {
  items: Item[];
  sortedBy?: string;
  sortDirection?: TSortDirection;
};
export type TSortingFn = typeof sortBy;

// we're using lodash sortBy as our default sorting fn
const sortItems = <Item extends TItem = TItem>(
  items: Item[],
  field?: string,
  sortDirection?: TSortDirection,
  sortingFunction: TSortingFn = sortBy
) => {
  if (!field) {
    return items;
  }
  const sortedItems = sortingFunction(items, field);

  if (sortDirection === 'desc') {
    return sortedItems.reverse();
  }

  return sortedItems;
};

const getInitialState = <Item extends TItem = TItem>(
  items: Item[],
  field?: string,
  sortDirection?: TSortDirection,
  sortingFunction?: TSortingFn
): TSortingState<Item> => ({
  items: sortItems(items, field, sortDirection, sortingFunction),
  sortedBy: field,
  sortDirection,
});

const useSorting = <Item extends TItem = TItem>(
  items: Item[],
  field?: string,
  sortDirection?: TSortDirection,
  sortingFunction?: TSortingFn
) => {
  const [sortState, setSorting] = useState(() =>
    getInitialState(items, field, sortDirection, sortingFunction)
  );

  useDebugValue(sortState);

  function onSortChange(fieldKey: string) {
    let nextSortDirection: TSortDirection;
    let sortedItems: Item[];

    if (sortState.sortedBy !== fieldKey) {
      // if the intented field is not already sorted, the initial direction is 'asc'
      nextSortDirection = 'asc';
      sortedItems = sortItems(sortState.items, fieldKey, nextSortDirection);
    } else {
      nextSortDirection = sortState.sortDirection === 'asc' ? 'desc' : 'asc';
      sortedItems = sortState.items.reverse();
    }

    setSorting({
      items: sortedItems,
      sortedBy: fieldKey,
      sortDirection: nextSortDirection,
    });
  }

  return {
    items: sortState.items,
    sortedBy: sortState.sortedBy,
    sortDirection: sortState.sortDirection,
    onSortChange,
  };
};

export default useSorting;
