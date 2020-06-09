import React from 'react';
import PropTypes from 'prop-types';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { TableGrid, Header, Body, Row, Footer } from './data-table.styles';
import { HeaderCell, FooterCell } from './cell';
import DataRow from './data-row';
import useManualColumnResizing from './use-manual-column-resizing-reducer';

import ColumnResizingContext from './column-resizing-context';

const DataTable = (props) => {
  const tableRef = React.useRef();
  const columnResizingReducer = useManualColumnResizing(tableRef);

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
                id={column.key}
                key={column.key}
                isCondensed={props.isCondensed}
                /* Sorting Props */
                onClick={props.onSortChange}
                sortedBy={props.sortedBy}
                columnKey={column.key}
                alignment={column.align ? column.align : props.cellAlignment}
                isSortable={column.isSortable}
                shouldWrap={props.wrapHeaderLabels}
                sortDirection={props.sortDirection}
                disableHeaderStickiness={props.disableHeaderStickiness}
                disableResizing={column.disableResizing}
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
