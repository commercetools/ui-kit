const MINIMUM_COLUMN_SIZE = 32;

// calculates size on mouse-drag and enforces a minimum size
const calculateResize = (
  initialSize,
  initialMousePosition,
  newMousePosition,
  minSize = MINIMUM_COLUMN_SIZE
) => {
  const newSize = initialSize - (initialMousePosition - newMousePosition);

  return minSize > newSize ? minSize : newSize;
};

// returns an array of column widths
const getColumnWidthsArray = (columns) =>
  columns.reduce((widths, current) => [...widths, current.width], []);

const setColumnWidth = (columns, position, value) => {
  // eslint-disable-next-line no-param-reassign
  columns[position] = value;

  return columns;
};

const getGridTemplateColumnsStyle = (columns) =>
  `${columns.map((width) => `${width}px`).join(' ')}`;

export {
  setColumnWidth,
  calculateResize,
  getColumnWidthsArray,
  getGridTemplateColumnsStyle,
};
