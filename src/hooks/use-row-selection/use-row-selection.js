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
      [currentItem.key]: currentItem[keyName] || false,
    }),
    {}
  );

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const selectableRows = rows.map(item => ({
    ...item,
    [keyName]: state[item.key],
  }));
  const toggleRow = key => dispatch({ type: 'toggle', payload: key });
  const selectRow = key => dispatch({ type: 'select', payload: key });
  const deselectRow = key => dispatch({ type: 'deselect', payload: key });
  const selectAllRows = () => dispatch({ type: 'selectAll' });
  const deselectAllRows = () => dispatch({ type: 'deselectAll' });
  const getIsRowSelected = key => state[key];
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
