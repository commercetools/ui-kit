import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
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
  invariant(
    Array.isArray(props.columns),
    `ui-kit/DataTable: the prop "columns" is required.`
  );
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

  const resizedTotalWidth = hasTableBeenResized
    ? columnResizingReducer.getTotalResizedTableWidth() +
      // if the table has a maxHeight, it might add a scrollbar which takes space inside the container
      (tableRef.current.offsetWidth - tableRef.current.clientWidth)
    : undefined;

  return (
    <TableContainer
      maxWidth={props.maxWidth}
      isBeingResized={columnResizingReducer.getIsAnyColumnBeingResized()}
      resizedTotalWidth={resizedTotalWidth}
      disableSelfContainment={props.disableSelfContainment}
    >
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
  /**
   * The list of data that needs to be rendered in the table. Each object in the list can
   * have any shape as long as it has a unique identifier.
   * The data is rendered by using the callback render function `itemRenderer`.
   */
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The identfier of the rendered item.
       */
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  /**
   * Each object requires a unique `key` which should correspond to property key of
   * the items of `rows` that you want to render under this column, and a `label`
   * which defines the name shown on the header.
   * The list of columns to be rendered.
   * Each column can be customized (see properties below).
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * The unique key of the column that is used to identify your data type.
       * You can use this value to determine which value from a row item should be rendered.
       * <br>
       * For example, if the data is a list of users, where each user has a `firstName` property,
       * the column key should be `firstName`, which renders the correct value by default.
       * The key can also be some custom or computed value, in which case you need to provide
       * an explicit mapping of the value by implementing either the `itemRendered` function or
       * the column-specific `renderItem` function.
       */
      key: PropTypes.string.isRequired,
      /**
       * The label of the column that will be shown on the column header.
       */
      label: PropTypes.node.isRequired,
      /**
       * Sets a width for this column. Accepts the same values as the ones specified for
       * individual [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns).
       * <br>
       * For example, using `minmax` pairs (e.g. `minmax(200px, 400px)`), a combinations of
       * fraction values (`1fr`/`2fr`/etc), or fixed values such as `200px`.
       * By default, the column grows according to the content and respecting the total table available width.
       *
       * @@defaultValue@@: auto
       */
      width: PropTypes.string,
      /**
       * Use this to override the table's own `horizontalCellAlignment` prop for this specific column.
       */
      align: PropTypes.oneOf(['left', 'center', 'right']),
      /**
       * A callback function, called when the header cell is clicked.
       * <br>
       * Signature: `(event) => void`
       */
      onClick: PropTypes.func,
      /**
       * A callback function to render the content of cells under this column, overriding
       * the default `itemRenderer` prop of the table.
       * <br>
       * Signature: `(row: object, isRowCollapsed: boolean) => React.Node`
       */
      renderItem: PropTypes.func,
      /**
       * Use this prop to place an `Icon` or `IconButton` on the left of the column label.
       * It is advised to place these types of components through this prop instead of `label`,
       * in order to properly position and align the elements.
       * This is particularly useful for medium-sized icons which require more vertical space than the typography.
       */
      headerIcon: PropTypes.node,
      /**
       * Set this to `true` to allow text content of this cell to be truncated with an ellipsis,
       * instead of breaking into multiple lines.
       * <br>
       * NOTE: when using this option, it is recommended to specify a `width` for the column, because
       * if the table doesn't have enough space for all columns, it will start clipping the columns
       * with _truncated_ content, and if no `width` is set (or the value is set `auto` -- the default)
       * it can shrink until the column disappears completely.
       * By enforcing a minimum width for these columns, the table will respect them and grow horizontally,
       * adding scrollbars if needed.
       *
       * @@defaultValue@@: false
       */
      isTruncated: PropTypes.bool,
      /**
       * Set this to `true` to show a sorting button, which calls `onSortChange` upon being clicked.
       * You should enable this flag for every column you want to be able to sort.
       * When at least one column is sortable, the table props `sortBy`, `sortDirection` and `onSortChange` should be provided.
       *
       * @@defaultValue@@: false
       */
      isSortable: PropTypes.bool,
      /**
       * Set this to `true` to prevent this column from being manually resized by dragging
       * the edge of the header with a mouse.
       *
       * @@defaultValue@@: false
       */
      disableResizing: PropTypes.bool,
      /**
       * Set this to `true` to prevent click event propagation for this cell.
       * You might want this if you need the column to have its own call-to-action or input while
       * the row also has a defined `onRowClick`.
       *
       * @@defaultValue@@: false
       */
      shouldIgnoreRowClick: PropTypes.bool,
    })
  ),
  /**
   * Element to render within the `tfoot` (footer) element of the table.
   */
  footer: PropTypes.node,
  /**
   * The max width (a number of pixels or a css value string with units) for which the table
   * is allowed to grow. If unset, the table will grow horizontally to fill its parent.
   */
  maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The max height (a number of pixels or a css value string with units) for which the table
   * is allowed to grow. If unset, the table will grow vertically to fill its parent.
   */
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * A callback function, called when a user clicks on a row.
   * <br>
   * Signature `(row: object, rowIndex: number, columnKey: string) => void`
   */
  onRowClick: PropTypes.func,
  /**
   * Set this to `true` to reduce the paddings of all cells, allowing the table to display
   * more data in less space.
   */
  isCondensed: PropTypes.bool,
  /**
   * A callback function, called when a column has been resized.
   * Use this callback to get the resized column widths and save them, to be able to restore the
   * value once the user comes back to the page.
   */
  onColumnResized: PropTypes.func,
  /**
   * Set this to `true` to take control of the containment of the table and doing it on a parent element.
   * This means that the table will grow in size without adding scrollbars on itself,
   * both vertically and horizontally and, as a consequence, the `maxHeight` and `maxWidth` props are ignored.
   * If you need to enforce these constraints, you must also apply them on the parent element.
   * Additionally, the sticky behaviour of the header will get fixed relatively to the closest
   * parent element with `position: relative`.
   */
  disableSelfContainment: PropTypes.bool,
  /**
   * Set this to `true` to prevent the header from being sticky.
   */
  disableHeaderStickiness: PropTypes.bool,
  /**
   * The default function used to render the content of each item in a cell.
   * In case a column has its own `renderItem` render function, it will take precedence over this function.
   * <br>
   * Signature: `(item: object, column: object, isRowCollapsed: boolean) => React.Node`
   */
  itemRenderer: PropTypes.func.isRequired,
  /**
   * Set this to `false` to ensure that every column can render their label in one line.
   * By default the header cell grows in height in case the label does not fit in one line.
   */
  wrapHeaderLabels: PropTypes.bool,
  /**
   * The default cell vertical alignment of each row (not the table header).
   */
  verticalCellAlignment: PropTypes.oneOf(['top', 'center', 'bottom']),
  /**
   * The default cell horizontal alignment.
   * In case a column has its own `align` property, it will take precedence over this value.
   */
  horizontalCellAlignment: PropTypes.oneOf(['left', 'center', 'right']),
  /**
   * The key of the column for which the data is currently sorted by.
   */
  sortedBy: PropTypes.string,
  /**
   * A callback function, called when a sortable column's header is clicked.
   * It's required when the `isSortable` flag is set on at least one column.
   * <br>
   * Signature: `(columnKey: string, sortDirection: string) => void`.
   */
  onSortChange: PropTypes.func,
  /**
   * The sorting direction.
   */
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
