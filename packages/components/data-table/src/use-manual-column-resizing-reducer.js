import React from 'react';

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

const initialState = (tableRef) => ({
  isResizing: false,
  initialColWidth: undefined,
  initialMousePosition: undefined,
  columnBeingResized: undefined,
  sizes: undefined,
  tableRef,
});

function reducer(state, action) {
  switch (action.type) {
    case 'registerColumnMeasurements': {
      return {
        ...state,
        sizes: action.payload.sizes,
      };
    }
    case 'startResizing':
      return {
        ...state,
        isResizing: true,
        initialColWidth: action.payload.initialColWidth,
        initialMousePosition: action.payload.initialMousePosition,
        columnBeingResized: action.payload.columnBeingResized,
      };
    case 'finishResizing':
      return {
        ...state,
        isResizing: false,
        initialColWidth: null,
        initialMousePosition: null,
        columnBeingResized: null,
      };
    default:
      throw new Error(
        `Action type '${action.type}' for 'useManualColumnResizing' reducer is not defined.`
      );
  }
}

const useManualResizingReducer = (tableRef) => {
  const [manualResizingState, dispatch] = React.useReducer(
    reducer,
    initialState(tableRef)
  );

  React.useDebugValue(manualResizingState);

  return [manualResizingState, dispatch];
};

const useManualColumnResizing = (tableRef) => {
  const [state, dispatch] = useManualResizingReducer(tableRef);

  // if the table element has been rendered and we haven't yet measured the columns
  if (state.tableRef.current && !state.sizes) {
    const renderedColumnMeasurements = [];
    state.tableRef.current.querySelectorAll('th').forEach((header, index) => {
      renderedColumnMeasurements[index] = header.clientWidth;
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

  const getCurrentWidth = (mouseEvent) =>
    calculateNewSize(
      state.initialColWidth,
      state.initialMousePosition,
      mouseEvent
    );

  const finishResizing = () => dispatch({ type: 'finishResizing' });

  React.useDebugValue(state);

  return {
    sizes: state.sizes,
    tableRef: state.tableRef,
    isResizing: state.isResizing,
    columnBeingResized: state.columnBeingResized,
    startResizing,
    finishResizing,
    getCurrentWidth,
  };
};

export default useManualColumnResizing;
