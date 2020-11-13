import React from 'react';

type TRow = {
  id: string;
  [key: string]: any;
};

type TTableRowsState = Partial<Record<keyof { [key: string]: any }, boolean>>;

enum EActionTypes {
  Toggle = 'Toggle',
  Select = 'Select',
  Deselect = 'Deselect',
  SelectAll = 'SelectAll',
  DeselectAll = 'DeselectAll',
}

type TToggleAction = {
  type: EActionTypes.Toggle;
  payload: string;
};

type TSelectAction = {
  type: EActionTypes.Select;
  payload: string;
};

type TSelectAllAction = {
  type: EActionTypes.SelectAll;
};

type TDeselectAction = {
  type: EActionTypes.Deselect;
  payload: string;
};
type TDeselectAllAction = {
  type: EActionTypes.DeselectAll;
};

type TTableRowAction =
  | TToggleAction
  | TSelectAction
  | TSelectAllAction
  | TDeselectAction
  | TDeselectAllAction;

const getInitialState = (rows: TRow[], nameOfFlag: string): TTableRowsState =>
  rows.reduce(
    (items, currentItem: TRow) => ({
      ...items,
      // if there is an initial value: use it, otherwise default to false
      [currentItem.id]: currentItem[nameOfFlag] || false,
    }),
    {}
  );
function selectionReducer(
  state: TTableRowsState,
  action: TTableRowAction
): TTableRowsState {
  switch (action.type) {
    case EActionTypes.Toggle:
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };
    case EActionTypes.Select:
      return {
        ...state,
        [action.payload]: true,
      };
    case EActionTypes.Deselect:
      return {
        ...state,
        [action.payload]: false,
      };
    case EActionTypes.SelectAll: {
      return Object.keys(state).reduce(
        (accumulator, currentItem) => ({
          ...accumulator,
          [currentItem]: true,
        }),
        {}
      );
    }
    case EActionTypes.DeselectAll: {
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

const useSelectionReducer = (
  rows: TRow[],
  nameOfFlag: string
): [TTableRowsState, React.Dispatch<TTableRowAction>] => {
  const [selectionState, dispatch] = React.useReducer<
    (
      state: TTableRowsState,
      action: TTableRowAction
    ) => Partial<Record<string, any>>
  >(selectionReducer, getInitialState(rows, nameOfFlag));

  React.useDebugValue(selectionState);

  return [selectionState, dispatch];
};
const useRowSelection = (nameOfFlag: string, rows: TRow[]) => {
  const [selectionState, dispatch] = useSelectionReducer(rows, nameOfFlag);
  const selectableRows: TRow[] = rows.map((item: TRow) => ({
    ...item,
    // @TODO: add a check that `nameOfFlag` is already a key
    // defined in rows[], so that we don't accidentally override it.
    [nameOfFlag]: selectionState[item.id],
  }));
  const toggleRow = (id: string): void =>
    dispatch({ type: EActionTypes.Toggle, payload: id });
  const selectRow = (id: string): void =>
    dispatch({ type: EActionTypes.Select, payload: id });
  const deselectRow = (id: string): void =>
    dispatch({ type: EActionTypes.Deselect, payload: id });
  const selectAllRows = (): void => dispatch({ type: EActionTypes.SelectAll });
  const deselectAllRows = (): void =>
    dispatch({ type: EActionTypes.DeselectAll });

  const getIsRowSelected = (id: string): boolean =>
    selectionState[id] as boolean;

  const getNumberOfSelectedRows = (): number =>
    selectableRows.filter((rowItem: TRow): boolean =>
      Boolean(rowItem[nameOfFlag])
    ).length;

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
