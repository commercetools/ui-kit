import React from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };
    case 'select':
      return {
        ...state,
        [action.payload]: true,
      };
    case 'deselect':
      return {
        ...state,
        [action.payload]: false,
      };
    case 'selectAll': {
      return Object.keys(state).reduce(
        (accumulator, currentItem) => ({
          ...accumulator,
          [currentItem]: true,
        }),
        {}
      );
    }
    case 'deselectAll': {
      return Object.keys(state).reduce(
        (accumulator, currentItem) => ({
          ...accumulator,
          [currentItem]: false,
        }),
        {}
      );
    }
    default:
      return state;
  }
}

const useRowSelection = (keyName, rows) => {
  const initialState = rows.reduce(
    (items, currentItem) => ({
      ...items,
      // if there is an initial value: use it, otherwise default to false
      [currentItem.id]: currentItem[keyName] || false,
    }),
    {}
  );

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const selectableRows = rows.map(item => ({
    ...item,
    [keyName]: state[item.id],
  }));
  const toggleRow = id => dispatch({ type: 'toggle', payload: id });
  const selectRow = id => dispatch({ type: 'select', payload: id });
  const deselectRow = id => dispatch({ type: 'deselect', payload: id });
  const selectAllRows = () => dispatch({ type: 'selectAll' });
  const deselectAllRows = () => dispatch({ type: 'deselectAll' });
  const getIsRowSelected = id => state[id];
  const getNumberOfSelectedRows = () =>
    selectableRows.reduce((count, item) => count + item[keyName], 0);

  return {
    rows: selectableRows,
    toggleRow,
    selectRow,
    deselectRow,
    selectAllRows,
    deselectAllRows,
    getIsRowSelected,
    getNumberOfSelectedRows,
  };
};

export default useRowSelection;
