import React from 'react';
import sortBy from 'lodash/sortBy';

const defaultSortMethod = (items, column) => sortBy(items, column);

const sortItems = (
  items,
  column,
  direction,
  sortMethod = defaultSortMethod
) => {
  if (!column) {
    return items;
  }

  const sortedItems = sortMethod(items, column);

  if (direction === 'desc') {
    return sortedItems.reverse();
  }

  return sortedItems;
};

const useSorting = (items, column, sortDirection, sortMethod) => {
  const initialState = {
    items: sortItems(items, column, sortDirection, sortMethod),
    sortedBy: column,
    sortDirection,
  };

  const [sortState, setSorting] = React.useState(initialState);

  const onSortChange = columnKey => {
    let nextSortDirection;

    // if the intented column is not already sorted, the initial direction is 'asc'
    if (sortState.sortedBy !== columnKey) {
      nextSortDirection = 'asc';
    } else {
      nextSortDirection = sortState.sortDirection === 'asc' ? 'desc' : 'asc';
    }

    setSorting(prevState => ({
      ...prevState,
      items: sortItems(prevState.items, columnKey, nextSortDirection),
      sortedBy: columnKey,
      sortDirection: nextSortDirection,
    }));
  };

  return {
    items: sortState.items,
    sortedBy: sortState.sortedBy,
    sortDirection: sortState.sortDirection,
    onSortChange,
  };
};

export default useSorting;
