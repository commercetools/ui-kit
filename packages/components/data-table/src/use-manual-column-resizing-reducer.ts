import { useReducer, useDebugValue, RefObject, Dispatch } from 'react';
import type { TColumn } from './data-table';

type TTableRef = RefObject<HTMLTableElement | undefined | null>;

type TState = {
  tableRef?: TTableRef;
  sizes?: TRenderedColumnMeasurements[];
  initialColWidth?: number;
  initialMousePosition?: number;
  columnBeingResized?: number;
  hasBeenResized?: boolean;
};

export type TRenderedColumnMeasurements = {
  key: string | null;
  width: number;
};

type TStartResizingPayload = {
  initialColWidth: number;
  initialMousePosition: number;
  columnBeingResized: number;
} & TState;

type TRegisterColumnMeasurements = {
  sizes: TRenderedColumnMeasurements[];
} & TState;

type TAction =
  | { type: 'reset' }
  | { type: 'registerColumnMeasurements'; payload: TRegisterColumnMeasurements }
  | { type: 'startResizing'; payload: TStartResizingPayload }
  | { type: 'finishResizing' };

const MINIMUM_COLUMN_SIZE = 32;

// calculates size on mouse-drag and enforces a minimum size
const calculateNewSize = (
  initialSize = 0,
  initialMousePosition = 0,
  newMousePosition: number,
  minSize = MINIMUM_COLUMN_SIZE
) => {
  const newSize = initialSize - (initialMousePosition - newMousePosition);

  return minSize > newSize ? minSize : newSize;
};

const setColumnWidth = (
  columns: TRenderedColumnMeasurements[] = [],
  position: number,
  value: number
) => {
  // columns => comes from state.sizes which reflects component's state
  // any update to the columns results in updating the state

  columns[position] = { ...columns[position], width: value };

  return columns;
};

const getGridTemplateColumnsStyle = (columns: TColumn['width'][]) =>
  `${columns.map((width) => `${width || 0}px`).join(' ')}`;

const initialState = (tableRef?: TTableRef) => ({
  initialColWidth: undefined,
  initialMousePosition: undefined,
  columnBeingResized: undefined,
  hasBeenResized: false,
  sizes: undefined,
  tableRef,
});

function reducer(state: TState, action: TAction) {
  switch (action.type) {
    case 'reset': {
      return {
        ...initialState(state.tableRef),
      };
    }
    case 'registerColumnMeasurements': {
      return {
        ...state,
        sizes: action.payload.sizes,
      };
    }
    case 'startResizing':
      return {
        ...state,
        initialColWidth: action.payload.initialColWidth,
        initialMousePosition: action.payload.initialMousePosition,
        columnBeingResized: action.payload.columnBeingResized,
      };
    case 'finishResizing':
      return {
        ...state,
        initialColWidth: undefined,
        initialMousePosition: undefined,
        columnBeingResized: undefined,
        hasBeenResized: true,
      };
    default:
      return state;
  }
}

const useManualResizingReducer = (
  tableRef?: TTableRef
): [TState, Dispatch<TAction>] => {
  const [manualResizingState, dispatch] = useReducer(
    reducer,
    initialState(tableRef)
  );

  useDebugValue(manualResizingState);

  return [manualResizingState, dispatch];
};

const useManualColumnResizing = (tableRef?: TTableRef) => {
  const [state, dispatch] = useManualResizingReducer(tableRef);

  // if the table element has been rendered and we haven't yet measured the columns
  if (state.tableRef?.current && !state.sizes) {
    const renderedColumnMeasurements: TRenderedColumnMeasurements[] = [];
    state.tableRef.current
      .querySelectorAll(':scope > thead > tr > th')
      .forEach((header) => {
        renderedColumnMeasurements.push({
          key: header.getAttribute('data-id'),
          width: header.getBoundingClientRect().width,
        });
      });

    dispatch({
      type: 'registerColumnMeasurements',
      payload: {
        sizes: renderedColumnMeasurements,
      },
    });
  }

  type THeaderRef = {
    cellIndex: number;
  } & HTMLTableElement;
  const startResizing = (
    headerRef: RefObject<THeaderRef>,
    mouseEvent: MouseEvent
  ) => {
    dispatch({
      type: 'startResizing',
      payload: {
        initialColWidth: headerRef.current.clientWidth,
        initialMousePosition: mouseEvent.clientX,
        columnBeingResized: headerRef.current.cellIndex,
      },
    });
  };

  const onDragResizing = (event: MouseEvent, columnIndex: number) => {
    // throttle and sync resizing update rate with screen refresh rate
    requestAnimationFrame(() => {
      const width = calculateNewSize(
        state.initialColWidth,
        state.initialMousePosition,
        event.clientX
      );
      const newColumnsSizes = setColumnWidth(state.sizes, columnIndex, width);

      if (!state.tableRef?.current) return;
      state.tableRef.current.style.gridTemplateColumns =
        getGridTemplateColumnsStyle(
          newColumnsSizes.map((newColumnsSize) =>
            newColumnsSize.width.toString()
          )
        );
    });
  };
  const finishResizing = () => {
    dispatch({ type: 'finishResizing' });

    return state.sizes;
  };

  const getIsColumnBeingResized = (columnIndex: number) =>
    state.columnBeingResized !== undefined
      ? state.columnBeingResized === columnIndex
      : false;

  const getIsAnyColumnBeingResized = () =>
    state.columnBeingResized !== undefined;

  const getHasTableBeenResized = () => state.hasBeenResized;

  const getTotalResizedTableWidth = () => {
    if (!state.hasBeenResized || !state.sizes) {
      return -1;
    }
    return state.sizes.reduce((a, b) => a + b.width, 0);
  };

  const reset = () => {
    if (!state.tableRef?.current) return;
    state.tableRef.current.style.gridTemplateColumns = '';

    return dispatch({
      type: 'reset',
    });
  };

  const getSizes = () => state.sizes;

  useDebugValue(state);

  return {
    reset,
    getSizes,
    startResizing,
    onDragResizing,
    finishResizing,
    getHasTableBeenResized,
    getIsColumnBeingResized,
    getIsAnyColumnBeingResized,
    getTotalResizedTableWidth,
  };
};

export default useManualColumnResizing;
