import { useContext, useState, useEffect } from 'react';
import { Row } from './data-table.styles';
import DataCell from './cell';
import { TColumn, TRow, TDataTable } from './data-table';

import ColumnResizingContext from './column-resizing-context';

export type TDataRow = {
  row: TRow;
  rowIndex: number;
  columns: TColumn[];
  shouldClipContent: boolean;
  shouldRenderBottomBorder: boolean;
} & Pick<
  TDataTable,
  | 'onRowClick'
  | 'isCondensed'
  | 'verticalCellAlignment'
  | 'horizontalCellAlignment'
  | 'itemRenderer'
>;

const defaultProps: Pick<
  TDataRow,
  | 'isCondensed'
  | 'shouldClipContent'
  | 'verticalCellAlignment'
  | 'horizontalCellAlignment'
  | 'shouldRenderBottomBorder'
  | 'itemRenderer'
> = {
  isCondensed: false,
  shouldClipContent: false,
  verticalCellAlignment: 'top',
  horizontalCellAlignment: 'left',
  shouldRenderBottomBorder: true,
  itemRenderer: (row, column) => row[column.key],
};

type TColumnResizingContext = {
  getIsColumnBeingResized: (columnIndex: number) => boolean;
};

const DataRow = (props: TDataRow) => {
  const { getIsColumnBeingResized } = useContext(
    ColumnResizingContext
  ) as TColumnResizingContext;

  const rowHasTruncatedColumn = props.columns.some(
    (column) => column.isTruncated
  );
  const [isRowCollapsed, collapseRow] = useState(rowHasTruncatedColumn);
  const handleRowCollapseClick = () => {
    collapseRow(!isRowCollapsed);
  };

  // update the collapsed state if isTruncated options are changed for the whole row
  useEffect(() => {
    if (rowHasTruncatedColumn) {
      collapseRow(true);
    } else {
      collapseRow(false);
    }
  }, [rowHasTruncatedColumn]);

  const shouldRenderCollapseButton = (
    totalColumnsLength: number,
    currentColumnIndex: number
  ) => rowHasTruncatedColumn && totalColumnsLength - 1 === currentColumnIndex;

  return (
    <Row isRowClickable={props.onRowClick}>
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
          onCellClick={
            props.onRowClick && !column.shouldIgnoreRowClick
              ? () => props.onRowClick?.(props.row, props.rowIndex, column.key)
              : undefined
          }
          shouldRenderBottomBorder={props.shouldRenderBottomBorder}
          shouldRenderResizingIndicator={getIsColumnBeingResized(columnIndex)}
        >
          {column.renderItem
            ? column.renderItem(props.row, isRowCollapsed)
            : props.itemRenderer(props.row, column, isRowCollapsed)}
        </DataCell>
      ))}
    </Row>
  );
};

DataRow.defaultProps = defaultProps;
DataRow.displayName = 'DataRow';

export default DataRow;
