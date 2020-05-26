import React from 'react';
import PropTypes from 'prop-types';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import {
  getColumnWidthsArray,
  getGridTemplateColumnsStyle,
} from './column-size-utils';
import { TableGrid, Header, Body, Row, Footer } from './data-table.styles';
import { HeaderCell, FooterCell } from './cell';
import DataRow from './data-row';

const DataTable = (props) => {
  const [columnSizing, setcolumnSizing] = React.useState({
    isManualControlled: false,
    // TODO 🤔
    // is it actually worth it to write the sizes to the state?
    // the sizes array is being mutated directly by the cell, because it only affects layout style and doesn't need to trigger re-renders
    // but we should provide the consumer a streamlined way to read the column sizes (i.e to save them as a user setting)
    sizes: getColumnWidthsArray(props.columns),
  });
  const tableRef = React.useRef();

  const gridTemplateColumnsStyle = getGridTemplateColumnsStyle(
    columnSizing.sizes
  );

  const onColumnResizeStart = () => {
    // when a user starts resizing a column, all columns sizes stop being responsive and become manually controlled
    if (!columnSizing.isManualControlled) {
      const renderedLayoutSizes = [];
      tableRef.current.querySelectorAll('th').forEach((header, index) => {
        renderedLayoutSizes[index] = header.clientWidth;
      });
      setcolumnSizing({
        isManualControlled: true,
        sizes: renderedLayoutSizes,
      });
    }
  };

  return (
    <TableGrid
      ref={tableRef}
      {...filterDataAttributes(props)}
      columns={props.columns}
      maxWidth={props.maxWidth}
      maxHeight={props.maxHeight}
      style={{
        gridTemplateColumns: gridTemplateColumnsStyle,
      }}
    >
      <Header>
        <Row>
          {props.columns.map((column) => (
            <HeaderCell
              id={column.key}
              key={column.key}
              isCondensed={props.isCondensed}
              /* Sorting Props */
              onClick={props.onSortChange}
              sortedBy={props.sortedBy}
              columnKey={column.key}
              isSortable={column.isSortable}
              shouldWrap={props.wrapHeaderLabels}
              sortDirection={props.sortDirection}
              disableHeaderStickiness={props.disableHeaderStickiness}
              alignment={column.align ? column.align : props.cellAlignment}
              //
              onColumnResizeStart={onColumnResizeStart}
              columnSizes={columnSizing.sizes}
              //
              tableRef={tableRef}
            >
              {column.label}
            </HeaderCell>
          ))}
        </Row>
      </Header>
      <Body>
        {props.rows.map((row, rowIndex) => (
          <DataRow
            {...props}
            row={row}
            key={row.id}
            rowIndex={rowIndex}
            shouldClipContent={columnSizing.isManualControlled}
          />
        ))}
      </Body>
      {props.footer && (
        <Footer>
          <Row>
            <FooterCell
              isCondensed={props.isCondensed}
              cellAlignment={props.cellAlignment}
              numberOfColumns={props.columns.length + 1}
            >
              {props.footer}
            </FooterCell>
          </Row>
        </Footer>
      )}
    </TableGrid>
  );
};
DataTable.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      /* defaults to `auto` */
      width: PropTypes.string,
      label: PropTypes.node.isRequired,
      align: PropTypes.oneOf(['left', 'center', 'right']),
      onClick: PropTypes.func,
      /* custom item renderer, specific for items of this column */
      renderItem: PropTypes.func,
      isTruncated: PropTypes.bool,
      isSortable: PropTypes.bool,
      shouldIgnoreRowClick: PropTypes.bool,
    })
  ).isRequired,
  footer: PropTypes.node,
  maxWidth: PropTypes.number,
  maxHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  isCondensed: PropTypes.bool,
  disableHeaderStickiness: PropTypes.bool,
  /* the default item (cell) renderer.
  an existing per-column `renderItem` func takes precedence over this */
  itemRenderer: PropTypes.func.isRequired,
  /* the default cell alignment
  an existing per-column `align` property takes precedence over this */
  cellAlignment: PropTypes.oneOf(['left', 'center', 'right']),
  isHeaderSticky: PropTypes.bool,
  wrapHeaderLabels: PropTypes.bool,
  /* Sorting props: */
  sortedBy: PropTypes.string,
  onSortChange: PropTypes.func,
  sortDirection: PropTypes.oneOf(['desc', 'asc']),
};
DataTable.defaultProps = {
  isCondensed: false,
  cellAlignment: 'left',
  wrapHeaderLabels: true,
  itemRenderer: (row, column) => row[column.key],
};
DataTable.displayName = 'DataTable';

export default DataTable;
