const setColumnWidth = (columns, position, value) => {
  // eslint-disable-next-line no-param-reassign
  columns[position] = value;

  return columns;
};

const getGridTemplateColumnsStyle = (columns) =>
  `${columns.map((width) => `${width || 0}px`).join(' ')}`;

export { setColumnWidth, getGridTemplateColumnsStyle };
