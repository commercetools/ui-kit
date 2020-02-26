import React from 'react';
import sortBy from 'lodash/sortBy';

// we're using lodash sortBy as our default sorting fn
const sortItems = (items, field, direction, sortingFunction = sortBy) => {
  if (!field) {
    return items;
  }
  const sortedItems = sortingFunction(items, field);

  if (direction === 'desc') {
    return sortedItems.reverse();
  }

  return sortedItems;
};

const useSorting = (items, field, sortDirection, sortingFunction) => {
  const initialState = {
    items: sortItems(items, field, sortDirection, sortingFunction),
    sortedBy: field,
    sortDirection,
  };

  const [sortState, setSorting] = React.useState(initialState);

  function onSortChange(fieldKey) {
    let nextSortDirection;
    let sortedItems;

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
