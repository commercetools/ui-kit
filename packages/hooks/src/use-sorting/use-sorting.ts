import React from 'react';
import sortBy from 'lodash/sortBy';

type TSortDirection = 'asc' | 'desc';
type TSortState<T, U> = {
  items: T[];
  sortedBy: U;
  sortDirection: TSortDirection;
};

// we're using lodash sortBy as our default sorting fn
const sortItems = <T, U>(
  items: T[],
  field: U,
  direction: TSortDirection,
  sortingFunction = sortBy
): T[] => {
  if (!field) {
    return items;
  }
  const sortedItems = sortingFunction<T>(items, field);
  if (direction === 'desc') {
    return sortedItems.reverse();
  }
  return sortedItems;
};

const getInitialState = <T, U>(
  items: T[],
  field: U,
  sortDirection: TSortDirection,
  sortingFunction: <T>() => T[]
): TSortState<T, U> => ({
  items: sortItems(items, field, sortDirection, sortingFunction),
  sortedBy: field,
  sortDirection,
});

const useSortingState = <T, U>(
  items: T[],
  field: U,
  sortDirection: TSortDirection,
  sortingFunction: <T>() => T[]
): [TSortState<T, U>, any] => {
  const [sortState, setSorting] = React.useState<TSortState<T, U>>(() =>
    getInitialState(items, field, sortDirection, sortingFunction)
  );
  React.useDebugValue(sortState);
  return [sortState, setSorting];
};

const useSorting = <T, U>(
  items: T[],
  field: U,
  sortDirection: TSortDirection,
  sortingFunction: <T>() => T[]
): TSortState<T, U> & {
  onSortChange: (nextFieldToSort: U) => void;
} => {
  const [sortState, setSorting] = useSortingState<T, U>(
    items,
    field,
    sortDirection,
    sortingFunction
  );

  const onSortChange = React.useCallback(
    (nextFieldToSort: U) => {
      // if nextFieldToSort is not the same as what is already sorted,
      // we reset the sortDirection with `asc`
      if (sortState.sortedBy !== nextFieldToSort) {
        const nextSortDirection = 'asc';
        setSorting({
          items: sortItems<T, U>(
            sortState.items,
            nextFieldToSort,
            nextSortDirection
          ),
          sortedBy: nextFieldToSort,
          sortDirection: nextSortDirection,
        });
      } else {
        const nextSortDirection =
          sortState.sortDirection === 'asc' ? 'desc' : 'asc';
        setSorting({
          items: sortState.items.reverse(),
          sortedBy: nextFieldToSort,
          sortDirection: nextSortDirection,
        });
      }
    },
    [sortState, setSorting]
  );

  return {
    items: sortState.items,
    sortedBy: sortState.sortedBy,
    sortDirection: sortState.sortDirection,
    onSortChange,
  };
};

export default useSorting;
