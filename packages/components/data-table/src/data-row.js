import React from 'react';
import PropTypes from 'prop-types';
import { Row } from './data-table.styles';
import DataCell from './cell';

import ColumnResizingContext from './column-resizing-context';

const DataRow = (props) => {
  const { getIsColumnBeingResized } = React.useContext(ColumnResizingContext);

  const rowHasTruncatedColumn = props.columns.some(
    (column) => column.isTruncated
  );
  const [isRowCollapsed, collapseRow] = React.useState(rowHasTruncatedColumn);
  const handleRowCollapseClick = () => {
    collapseRow(!isRowCollapsed);
  };
  const shouldRenderCollapseButton = (totalColumnsLength, currentColumnIndex) =>
    totalColumnsLength - 1 === currentColumnIndex &&
    ((isRowCollapsed && rowHasTruncatedColumn) ||
      (rowHasTruncatedColumn && !isRowCollapsed));

  return (
    <Row
      onClick={
        props.onRowClick
          ? () => props.onRowClick(props.row, props.rowIndex)
          : undefined
      }
    >
      {props.columns.map((column, columnIndex) => (
        <DataCell
          key={`${props.row.id}-${column.key}`}
          data-testid={`cell-${props.rowIndex}-${column.key}`}
          isTruncated={column.isTruncated && isRowCollapsed}
          isCondensed={props.isCondensed}
          isRowCollapsed={isRowCollapsed}
          verticalCellAlignment={props.verticalCellAlignment}
          horizontalCellAlignment={
            column.align ? column.align : props.horizontalCellAlignment
          }
          shouldIgnoreRowClick={column.shouldIgnoreRowClick}
          handleRowCollapseClick={handleRowCollapseClick}
          shouldRenderCollapseButton={shouldRenderCollapseButton(
            props.columns.length,
            columnIndex
          )}
          shouldClipContent={props.shouldClipContent}
          shouldRenderResizingIndicator={getIsColumnBeingResized(columnIndex)}
        >
          {column.renderItem
            ? column.renderItem(props.row)
            : props.itemRenderer(props.row, column)}
        </DataCell>
      ))}
    </Row>
  );
};
DataRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  rowIndex: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      align: PropTypes.oneOf(['left', 'center', 'right']),
      onClick: PropTypes.func,
      /* custom item renderer, specific for items of this column */
      renderItem: PropTypes.func,
      isTruncated: PropTypes.bool,
      shouldIgnoreRowClick: PropTypes.bool,
    })
  ).isRequired,
  onRowClick: PropTypes.func,
  isCondensed: PropTypes.bool,
  shouldClipContent: PropTypes.bool.isRequired,
  verticalCellAlignment: PropTypes.oneOf(['top', 'center', 'bottom']),
  horizontalCellAlignment: PropTypes.oneOf(['left', 'center', 'right']),
  /* the default item (cell) renderer.
    an existing per-column `renderItem` func takes precedence over this */
  itemRenderer: PropTypes.func.isRequired,
  /* the default cell alignment
    an existing per-column `align` property takes precedence over this */
};
DataRow.defaultProps = {
  isCondensed: false,
  shouldClipContent: false,
  verticalCellAlignment: 'top',
  horizontalCellAlignment: 'left',
  itemRenderer: (row, column) => row[column.key],
};
DataRow.displayName = 'DataRow';

export default DataRow;
