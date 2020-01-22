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
    case 'unselect':
      return {
        ...state,
        [action.payload]: false,
      };
    case 'selectAll': {
      return state.map(() => true);
    }
    case 'deselectAll': {
      return state.map(() => false);
    }
    default:
      return state;
  }
}

function getCountSelectedRows(rows) {
  return rows.reduce((count, item) => count + item, 0);
}

const useRowSelection = (keyName, rows) => {
  const initialState = rows.reduce(
    (items, currentItem) => ({
      ...items,
      [currentItem.key]: false,
    }),
    {}
  );

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const selectableRows = rows.map(item => ({
    ...item,
    [keyName]: state[item.key],
  }));

  const getIsRowSelected = key => state[key];
  const toggleRow = key => dispatch({ type: 'toggle', payload: key });
  const selectRow = key => dispatch({ type: 'select', payload: key });
  const unselectRow = key => dispatch({ type: 'unselect', payload: key });
  const selectAllRows = () => dispatch({ type: 'selectAllRows' });
  const unselectAllRows = () => dispatch({ type: 'toggle' });

  return {
    rows: selectableRows,
    toggleRow,
    selectRow,
    unselectRow,
    selectAllRows,
    unselectAllRows,
    getIsRowSelected,
    getCountSelectedRows,
  };
};

export default useRowSelection;
