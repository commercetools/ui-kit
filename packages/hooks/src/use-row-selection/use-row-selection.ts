import { useReducer, useDebugValue } from 'react';

export interface TRowItem {
  id: string;
}
export type TSelectionState = {
  [id: string]: boolean;
};
export type TSelectionAction =
  | { type: 'toggle'; payload: string }
  | { type: 'select'; payload: string }
  | { type: 'deselect'; payload: string }
  | { type: 'selectAll' }
  | { type: 'deselectAll' };

const getInitialState = <RowItem extends TRowItem = TRowItem>(
  keyName: string,
  rows: RowItem[]
) =>
  rows.reduce<TSelectionState>((items, currentItem) => {
    // @ts-ignore: index signature is confused as items might contain the initial value.
    const initialValue = currentItem[keyName];
    return {
      ...items,
      // if there is an initial value: use it, otherwise default to false
      [currentItem.id]: initialValue ?? false,
    };
  }, {});

function selectionReducer(state: TSelectionState, action: TSelectionAction) {
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
        (allItems, currentItem) => ({
          ...allItems,
          [currentItem]: true,
        }),
        {}
      );
    }
    case 'deselectAll': {
      return Object.keys(state).reduce(
        (allItems, currentItem) => ({
          ...allItems,
          [currentItem]: false,
        }),
        {}
      );
    }
    default:
      return state;
  }
}

const useRowSelection = <RowItem extends TRowItem = TRowItem>(
  keyName: string,
  rows: RowItem[]
) => {
  const [selectionState, dispatch] = useReducer<
    (prevState: TSelectionState, action: TSelectionAction) => TSelectionState
  >(selectionReducer, getInitialState<RowItem>(keyName, rows));

  useDebugValue(selectionState);

  const selectableRows = rows.map((item) => ({
    ...item,
    [keyName]: selectionState[item.id],
  }));
  const toggleRow = (id: string) => dispatch({ type: 'toggle', payload: id });
  const selectRow = (id: string) => dispatch({ type: 'select', payload: id });
  const deselectRow = (id: string) =>
    dispatch({ type: 'deselect', payload: id });
  const selectAllRows = () => dispatch({ type: 'selectAll' });
  const deselectAllRows = () => dispatch({ type: 'deselectAll' });
  const getIsRowSelected = (id: string) => selectionState[id];
  const getNumberOfSelectedRows = () =>
    selectableRows.reduce(
      (count, item) => count + (item[keyName] === true ? 1 : 0),
      0
    );

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
