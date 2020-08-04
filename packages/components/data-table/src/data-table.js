import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { usePrevious } from '@commercetools-uikit/hooks';
import {
  TableContainer,
  TableGrid,
  Header,
  Body,
  Row,
} from './data-table.styles';
import Footer from './footer';
import HeaderCell from './header-cell';
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

const shouldRenderRowBottomBorder = (rowIndex, rowCount, footer) => {
  if (!footer) return true;
  if (rowIndex + 1 < rowCount) return true;
  return false;
};

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
    <TableContainer maxWidth={props.maxWidth}>
      <TableGrid
        ref={tableRef}
        {...filterDataAttributes(props)}
        columns={props.columns}
        maxHeight={props.maxHeight}
        disableSelfContainment={props.disableSelfContainment}
      >
        <ColumnResizingContext.Provider value={columnResizingReducer}>
          <Header>
            <Row>
              {props.columns.map((column) => (
                <HeaderCell
                  key={column.key}
                  shouldWrap={props.wrapHeaderLabels}
                  isCondensed={props.isCondensed}
                  iconComponent={column.headerIcon}
                  onColumnResized={props.onColumnResized}
                  disableResizing={column.disableResizing}
                  verticalCellAlignment={props.verticalCellAlignment}
                  horizontalCellAlignment={
                    column.align ? column.align : props.horizontalCellAlignment
                  }
                  disableHeaderStickiness={props.disableHeaderStickiness}
                  /* Sorting Props */
                  onClick={props.onSortChange}
                  sortedBy={props.sortedBy}
                  columnKey={column.key}
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
              <DataRow
                {...props}
                row={row}
                key={row.id}
                rowIndex={rowIndex}
                shouldClipContent={hasTableBeenResized}
                shouldRenderBottomBorder={shouldRenderRowBottomBorder(
                  rowIndex,
                  props.rows.length,
                  props.footer
                )}
              />
            ))}
          </Body>
        </ColumnResizingContext.Provider>
      </TableGrid>
      {props.footer && (
        <Footer
          data-testid="footer"
          isCondensed={props.isCondensed}
          horizontalCellAlignment={props.horizontalCellAlignment}
        >
          {props.footer}
        </Footer>
      )}
    </TableContainer>
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
      headerIcon: PropTypes.node,
      isTruncated: PropTypes.bool,
      isSortable: PropTypes.bool,
      disableResizing: PropTypes.bool,
      shouldIgnoreRowClick: PropTypes.bool,
    })
  ).isRequired,
  footer: PropTypes.node,
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onRowClick: PropTypes.func,
  isCondensed: PropTypes.bool,
  onColumnResized: PropTypes.func,
  disableSelfContainment: PropTypes.bool,
  disableHeaderStickiness: PropTypes.bool,
  /* the default item (cell) renderer.
  an existing per-column `renderItem` func takes precedence over this */
  itemRenderer: PropTypes.func.isRequired,
  wrapHeaderLabels: PropTypes.bool,
  /* the default cell alignment
  an existing per-column `align` property takes precedence over this */
  verticalCellAlignment: PropTypes.oneOf(['top', 'center', 'bottom']),
  horizontalCellAlignment: PropTypes.oneOf(['left', 'center', 'right']),
  /* Sorting props: */
  sortedBy: PropTypes.string,
  onSortChange: PropTypes.func,
  sortDirection: PropTypes.oneOf(['desc', 'asc']),
};
DataTable.defaultProps = {
  isCondensed: false,
  wrapHeaderLabels: true,
  verticalCellAlignment: 'top',
  horizontalCellAlignment: 'left',
  disableSelfContainment: false,
  itemRenderer: (row, column) => row[column.key],
};
DataTable.displayName = 'DataTable';

export default DataTable;
