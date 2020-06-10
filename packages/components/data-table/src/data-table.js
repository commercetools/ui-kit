import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { usePrevious } from '@commercetools-uikit/hooks';
import { TableGrid, Header, Body, Row, Footer } from './data-table.styles';
import { HeaderCell, FooterCell } from './cell';
import DataRow from './data-row';
import useManualColumnResizing from './use-manual-column-resizing-reducer';
import ColumnResizingContext from './column-resizing-context';

const getColumnsLayoutInfo = (columns) =>
  columns.reduce(
    (acc, currentValue) => [
      ...acc,
      { key: currentValue.key, width: currentValue.width },
    ],
    []
  );

const DataTable = (props) => {
  const tableRef = React.useRef();
  const columnResizingReducer = useManualColumnResizing(tableRef);

  // if the table has been manually resized
  // and if the list of columns, their width field, or the isCondensed prop has changed
  // then we need to reset the resized column widths
  const hasTableBeenResized = columnResizingReducer.getHasTableBeenResized();
  const columnsInfo = getColumnsLayoutInfo(props.columns);
  const prevLayout = usePrevious({
    columns: columnsInfo,
    isCondensed: props.isCondensed,
  });
  let currentLayout;
  if (hasTableBeenResized) {
    currentLayout = {
      columns: columnsInfo,
      isCondensed: props.isCondensed,
    };
  }
  React.useLayoutEffect(() => {
    if (hasTableBeenResized) {
      if (!isEqual(prevLayout, currentLayout)) {
        columnResizingReducer.reset();
      }
    }
  }, [hasTableBeenResized, prevLayout, currentLayout, columnResizingReducer]);

  return (
    <TableGrid
      ref={tableRef}
      {...filterDataAttributes(props)}
      columns={props.columns}
      maxWidth={props.maxWidth}
      maxHeight={props.maxHeight}
    >
      <ColumnResizingContext.Provider value={columnResizingReducer}>
        <Header>
          <Row>
            {props.columns.map((column) => (
              <HeaderCell
                key={column.key}
                shouldWrap={props.wrapHeaderLabels}
                isCondensed={props.isCondensed}
                disableResizing={column.disableResizing}
                disableHeaderStickiness={props.disableHeaderStickiness}
                /* Sorting Props */
                onClick={props.onSortChange}
                sortedBy={props.sortedBy}
                columnKey={column.key}
                alignment={column.align ? column.align : props.cellAlignment}
                isSortable={column.isSortable}
                sortDirection={props.sortDirection}
              >
                {column.label}
              </HeaderCell>
            ))}
          </Row>
        </Header>
        <Body>
          {props.rows.map((row, rowIndex) => (
            <DataRow {...props} row={row} key={row.id} rowIndex={rowIndex} />
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
      </ColumnResizingContext.Provider>
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
      disableResizing: PropTypes.bool,
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
