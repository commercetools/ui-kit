import { useReducer, useDebugValue } from 'react';

const MINIMUM_COLUMN_SIZE = 32;

// calculates size on mouse-drag and enforces a minimum size
const calculateNewSize = (
  initialSize,
  initialMousePosition,
  newMousePosition,
  minSize = MINIMUM_COLUMN_SIZE
) => {
  const newSize = initialSize - (initialMousePosition - newMousePosition);

  return minSize > newSize ? minSize : newSize;
};

const setColumnWidth = (columns, position, value) => {
  // columns => comes from state.sizes which reflects component's state
  // any update to the columns results in updating the state

  // eslint-disable-next-line no-param-reassign
  columns[position] = { ...columns[position], width: value };

  return columns;
};

const getGridTemplateColumnsStyle = (columns) =>
  `${columns.map((width) => `${width || 0}px`).join(' ')}`;

const initialState = (tableRef) => ({
  initialColWidth: undefined,
  initialMousePosition: undefined,
  columnBeingResized: undefined,
  hasBeenResized: false,
  sizes: undefined,
  tableRef,
});

function reducer(state, action) {
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
      throw new Error(
        `Action type '${action.type}' for 'useManualColumnResizing' reducer is not defined.`
      );
  }
}

const useManualResizingReducer = (tableRef) => {
  const [manualResizingState, dispatch] = useReducer(
    reducer,
    initialState(tableRef)
  );

  useDebugValue(manualResizingState);

  return [manualResizingState, dispatch];
};

const useManualColumnResizing = (tableRef) => {
  const [state, dispatch] = useManualResizingReducer(tableRef);

  // if the table element has been rendered and we haven't yet measured the columns
  if (state.tableRef.current && !state.sizes) {
    const renderedColumnMeasurements = [];
    state.tableRef.current.querySelectorAll('th').forEach((header) => {
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

  const startResizing = (headerRef, mouseEvent) => {
    dispatch({
      type: 'startResizing',
      payload: {
        initialColWidth: headerRef.current.clientWidth,
        initialMousePosition: mouseEvent.clientX,
        columnBeingResized: headerRef.current.cellIndex,
      },
    });
  };

  const onDragResizing = (event, columnIndex) =>
    // throttle and sync resizing update rate with screen refresh rate
    requestAnimationFrame(() => {
      const width = calculateNewSize(
        state.initialColWidth,
        state.initialMousePosition,
        event.clientX
      );
      const newColumnsSizes = setColumnWidth(state.sizes, columnIndex, width);

      state.tableRef.current.style.gridTemplateColumns =
        getGridTemplateColumnsStyle(
          newColumnsSizes.map((newColumnsSize) => newColumnsSize.width)
        );
    });

  const finishResizing = () => {
    dispatch({ type: 'finishResizing' });

    return state.sizes;
  };

  const getIsColumnBeingResized = (columnIndex) =>
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
