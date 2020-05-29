import React from 'react';
import PropTypes from 'prop-types';
import { Row } from './data-table.styles';
import { DataCell } from './cell';

const DataRow = (props) => {
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
      key={props.row.id}
      onClick={
        props.onRowClick
          ? () => props.onRowClick(props.row, props.rowIndex)
          : undefined
      }
    >
      {props.columns.map((column, columnIndex) => (
        <DataCell
          key={`${props.row.id}-${column.key}`}
          alignment={column.align ? column.align : props.cellAlignment}
          isTruncated={column.isTruncated && isRowCollapsed}
          isRowCollapsed={isRowCollapsed}
          isCondensed={props.isCondensed}
          shouldIgnoreRowClick={column.shouldIgnoreRowClick}
          handleRowCollapseClick={handleRowCollapseClick}
          shouldRenderCollapseButton={shouldRenderCollapseButton(
            props.columns.length,
            columnIndex
          )}
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
  /* the default item (cell) renderer.
    an existing per-column `renderItem` func takes precedence over this */
  itemRenderer: PropTypes.func.isRequired,
  /* the default cell alignment
    an existing per-column `align` property takes precedence over this */
  cellAlignment: PropTypes.oneOf(['left', 'center', 'right']),
};
DataRow.defaultProps = {
  isCondensed: false,
  cellAlignment: 'left',
  itemRenderer: (row, column) => row[column.key],
};
DataRow.displayName = 'DataRow';

export default DataRow;
