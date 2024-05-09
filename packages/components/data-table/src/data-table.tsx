import {
  useRef,
  useLayoutEffect,
  ReactNode,
  MouseEventHandler,
  LegacyRef,
} from 'react';
import isEqual from 'lodash/isEqual';
import { useDataTableManagerContext } from '@commercetools-uikit/data-table-manager/data-table-manager-context';
import { warning, filterDataAttributes } from '@commercetools-uikit/utils';
import { usePrevious } from '@commercetools-uikit/hooks';
import {
  TableContainer,
  TableGrid,
  TableHeader,
  TableBody,
  TableRow,
} from './data-table.styles';
import Footer from './footer';
import HeaderCell from './header-cell';
import DataRow from './data-row';
import useManualColumnResizing from './use-manual-column-resizing-reducer';
import ColumnResizingContext from './column-resizing-context';

export interface TRow {
  id: string;
}

const getColumnsLayoutInfo = <Row extends TRow = TRow>(
  columns: TColumn<Row>[]
) =>
  columns.reduce<Pick<TColumn, 'key' | 'width'>[]>(
    (acc, currentValue) => [
      ...acc,
      { key: currentValue.key, width: currentValue.width },
    ],
    []
  );

const shouldRenderRowBottomBorder = (
  rowIndex: number,
  rowCount: number,
  footer: ReactNode
) => {
  if (!footer) return true;
  if (rowIndex + 1 < rowCount) return true;
  return false;
};

const defaultProps: Pick<
  TDataTableProps,
  | 'columns'
  | 'isCondensed'
  | 'wrapHeaderLabels'
  | 'horizontalCellAlignment'
  | 'verticalCellAlignment'
  | 'disableSelfContainment'
  | 'itemRenderer'
> = {
  columns: [],
  isCondensed: true,
  wrapHeaderLabels: true,
  verticalCellAlignment: 'top',
  horizontalCellAlignment: 'left',
  disableSelfContainment: false,
  // @ts-ignore
  itemRenderer: (row, column) => row[column.key],
};

export type TColumn<Row extends TRow = TRow> = {
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
  key: string;
  /**
   * The label of the column that will be shown on the column header.
   */
  label: ReactNode;
  /**
   * Sets a width for this column. Accepts the same values as the ones specified for
   * individual [grid-template-columns](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns).
   * <br>
   * For example, using `minmax` pairs (e.g. `minmax(200px, 400px)`), a combinations of
   * fraction values (`1fr`/`2fr`/etc), or fixed values such as `200px`.
   * By default, the column grows according to the content and respecting the total table available width.
   */
  width?: string;
  /**
   * Use this to override the table's own `horizontalCellAlignment` prop for this specific column.
   */
  align?: 'left' | 'center' | 'right';
  /**
   * A callback function, called when the header cell is clicked.
   */
  onClick?: (event: MouseEventHandler) => void;
  /**
   * A callback function to render the content of cells under this column, overriding
   * the default `itemRenderer` prop of the table.
   */
  renderItem?: (row: Row, isRowCollapsed: boolean) => ReactNode;
  /**
   * Use this prop to place an `Icon` or `IconButton` on the left of the column label.
   * It is advised to place these types of components through this prop instead of `label`,
   * in order to properly position and align the elements.
   * This is particularly useful for medium-sized icons which require more vertical space than the typography.
   */
  headerIcon?: ReactNode;
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
   */
  isTruncated?: boolean;
  /**
   * Set this to `true` to show a sorting button, which calls `onSortChange` upon being clicked.
   * You should enable this flag for every column you want to be able to sort.
   * When at least one column is sortable, the table props `sortBy`, `sortDirection` and `onSortChange` should be provided.
   */
  isSortable?: boolean;
  /**
   * Set this to `true` to prevent this column from being manually resized by dragging
   * the edge of the header with a mouse.
   */
  disableResizing?: boolean;
  /**
   * Set this to `true` to prevent click event propagation for this cell.
   * You might want this if you need the column to have its own call-to-action or input while
   * the row also has a defined `onRowClick`.
   */
  shouldIgnoreRowClick?: boolean;
};

export type TDataTableProps<Row extends TRow = TRow> = {
  /**
   * The list of data that needs to be rendered in the table. Each object in the list can
   * have any shape as long as it has a unique identifier.
   * The data is rendered by using the callback render function `itemRenderer`.
   */
  rows: Row[];
  /**
   * Each object requires a unique `key` which should correspond to property key of
   * the items of `rows` that you want to render under this column, and a `label`
   * which defines the name shown on the header.
   * The list of columns to be rendered.
   * Each column can be customized (see properties below).
   */
  columns: TColumn<Row>[];
  /**
   * Element to render within the `tfoot` (footer) element of the table.
   */
  footer?: ReactNode;
  /**
   * The max width (a number of pixels or a css value string with units) for which the table
   * is allowed to grow. If unset, the table will grow horizontally to fill its parent.
   */
  maxWidth?: number | string;
  /**
   * The max height (a number of pixels or a css value string with units) for which the table
   * is allowed to grow. If unset, the table will grow vertically to fill its parent and we are able to have a sticky header.
   */
  maxHeight?: number | string;
  /**
   * A callback function, called when a user clicks on a row.
   */
  onRowClick?: (row: Row, rowIndex: number, columnKey: string) => void;
  /**
   * Set this to `true` to reduce the paddings of all cells, allowing the table to display
   * more data in less space.
   */
  isCondensed?: boolean;
  /**
   * A callback function, called when a column has been resized.
   * Use this callback to get the resized column widths and save them, to be able to restore the
   * value once the user comes back to the page.
   */
  onColumnResized?: (args: TColumn<Row>[]) => void;
  /**
   * Set this to `true` to take control of the containment of the table and doing it on a parent element.
   * This means that the table will grow in size without adding scrollbars on itself,
   * both vertically and horizontally and, as a consequence, the `maxHeight` and `maxWidth` props are ignored.
   * If you need to enforce these constraints, you must also apply them on the parent element.
   * Additionally, the sticky behaviour of the header will get fixed relatively to the closest
   * parent element with `position: relative`.
   */
  disableSelfContainment?: boolean;
  /**
   * Set this to `true` to prevent the header from being sticky.
   * The header can be sticky only if the table does not have a `maxHeight` set.
   */
  disableHeaderStickiness?: boolean;
  /**
   * The default function used to render the content of each item in a cell.
   * In case a column has its own `renderItem` render function, it will take precedence over this function.
   */
  itemRenderer: (
    item: Row,
    column: TColumn<Row>,
    isRowCollapsed: boolean
  ) => ReactNode;
  /**
   * Set this to `false` to ensure that every column can render their label in one line.
   * By default the header cell grows in height in case the label does not fit in one line.
   */
  wrapHeaderLabels?: boolean;
  /**
   * The default cell vertical alignment of each row (not the table header).
   */
  verticalCellAlignment?: 'top' | 'center' | 'bottom';
  /**
   * The default cell horizontal alignment.
   * In case a column has its own `align` property, it will take precedence over this value.
   */
  horizontalCellAlignment?: 'left' | 'center' | 'right';
  /**
   * The key of the column for which the data is currently sorted by.
   */
  sortedBy?: string;
  /**
   * A callback function, called when a sortable column's header is clicked.
   * It's required when the `isSortable` flag is set on at least one column.
   */
  onSortChange?: (columnKey: string, sortDirection: 'asc' | 'desc') => void;
  /**
   * The sorting direction.
   */
  sortDirection?: 'desc' | 'asc';
};

const DataTable = <Row extends TRow = TRow>(props: TDataTableProps<Row>) => {
  const dettachedContext = useDataTableManagerContext();
  const columns = props.columns || dettachedContext.columns;
  const isCondensedLayout =
    props.isCondensed ||
    (dettachedContext.areDisplaySettingsEnabled &&
      dettachedContext.displaySettings?.isCondensed);
  const tableRef = useRef<HTMLTableElement>();
  const columnResizingReducer = useManualColumnResizing(tableRef);

  warning(
    columns.length > 0,
    `ui-kit/DataTable: empty table "columns", expected at least one column. If you are using DataTableManager you need to pass the "columns" there and they will be injected into DataTable.`
  );

  // if the table columns have been measured
  // and if the list of columns, their width field, or the isCondensed prop has changed
  // then we need to reset the resized column widths
  const columnsInfo = getColumnsLayoutInfo(columns);
  const prevLayout = usePrevious({
    columns: columnsInfo,
    isCondensed: isCondensedLayout,
  });
  const currentLayout = {
    columns: columnsInfo,
    isCondensed: isCondensedLayout,
  };
  const hasLayoutChanged = !isEqual(prevLayout, currentLayout);
  useLayoutEffect(() => {
    if (hasLayoutChanged) {
      columnResizingReducer.reset();
    }
  }, [columnResizingReducer, hasLayoutChanged]);

  const hasTableBeenResized = columnResizingReducer.getHasTableBeenResized();
  const resizedTotalWidth =
    hasTableBeenResized && tableRef.current
      ? columnResizingReducer.getTotalResizedTableWidth() +
        // if the table has a maxHeight, it might add a scrollbar which takes space inside the container
        (tableRef.current.offsetWidth - tableRef.current.clientWidth)
      : undefined;

  return (
    <TableContainer
      maxWidth={props.maxWidth}
      maxHeight={props.maxHeight}
      isBeingResized={columnResizingReducer.getIsAnyColumnBeingResized()}
      disableSelfContainment={!!props.disableSelfContainment}
    >
      <TableGrid
        ref={tableRef as LegacyRef<HTMLTableElement>}
        {...filterDataAttributes(props)}
        columns={columns as TColumn<TRow>[]}
        maxHeight={props.maxHeight}
        disableSelfContainment={!!props.disableSelfContainment}
        resizedTotalWidth={resizedTotalWidth}
      >
        <ColumnResizingContext.Provider value={columnResizingReducer}>
          <TableHeader>
            <TableRow isRowClickable={false}>
              {columns.map((column) => (
                <HeaderCell
                  key={column.key}
                  shouldWrap={props.wrapHeaderLabels}
                  isCondensed={isCondensedLayout}
                  iconComponent={column.headerIcon}
                  onColumnResized={props.onColumnResized}
                  disableResizing={column.disableResizing}
                  horizontalCellAlignment={
                    column.align ? column.align : props.horizontalCellAlignment
                  }
                  disableHeaderStickiness={props.disableHeaderStickiness}
                  columnWidth={column.width}
                  /* Sorting Props */
                  onClick={props.onSortChange && props.onSortChange}
                  sortedBy={props.sortedBy}
                  columnKey={column.key}
                  isSortable={column.isSortable}
                  sortDirection={props.sortDirection}
                >
                  {column.label}
                </HeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {props.rows.map((row, rowIndex) => (
              <DataRow<Row>
                {...props}
                row={row}
                key={row.id}
                rowIndex={rowIndex}
                shouldClipContent={
                  columnResizingReducer.getIsAnyColumnBeingResized() ||
                  hasTableBeenResized
                }
                shouldRenderBottomBorder={shouldRenderRowBottomBorder(
                  rowIndex,
                  props.rows.length,
                  props.footer
                )}
              />
            ))}
          </TableBody>
        </ColumnResizingContext.Provider>
      </TableGrid>
      {props.footer && (
        <Footer
          data-testid="footer"
          isCondensed={isCondensedLayout}
          horizontalCellAlignment={props.horizontalCellAlignment}
          resizedTotalWidth={resizedTotalWidth}
        >
          {props.footer}
        </Footer>
      )}
    </TableContainer>
  );
};

DataTable.defaultProps = defaultProps;
DataTable.displayName = 'DataTable';

export default DataTable;
