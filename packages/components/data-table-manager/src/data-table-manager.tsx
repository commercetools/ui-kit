import {
  useMemo,
  type ReactNode,
  type MouseEventHandler,
  useContext,
  createContext,
  useState,
  useEffect,
  cloneElement,
  ReactElement,
} from 'react';
import DataTableSettings, {
  type TDataTableSettingsProps,
} from './data-table-settings';
import { Spacings } from '@commercetools-frontend/ui-kit';

export interface TRow {
  id: string;
}

export type TColumnProps<Row extends TRow = TRow> = {
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

type TDataTableManagerProps<Row extends TRow = TRow> = {
  /**
   * Each object requires a unique `key` which should correspond to property key of
   * the items of `rows` that you want to render under this column, and a `label`
   * which defines the name shown on the header.
   * The list of columns to be rendered.
   * Each column can be customized (see properties below).
   */
  columns: TColumnProps<Row>[];

  /**
   * Any React node. Usually you want to render the `<DataTable>` component.
   * <br>
   * Note that the child component will implicitly receive the props `columns` and `isCondensed` from the `<DataTableManager>`.
   */
  children?: ReactElement;

  /**
   * The managed display settings of the table.
   */
  displaySettings?: TDataTableSettingsProps['displaySettings'];

  /**
   * The managed column settings of the table.
   */
  columnManager?: TDataTableSettingsProps['columnManager'];

  /**
   * A callback function, called when any of the properties of either display settings or column settings is modified.
   */
  onSettingsChange?: (
    settingName: string,
    settingValue: boolean | string[]
  ) => void;

  /**
   * A React node for rendering additional information within the table manager.
   */
  topBar?: ReactNode;

  /**
   * Sets the background theme of the Card that contains the settings
   */
  managerTheme?: 'light' | 'dark';
};

type TDataColumns = {
  isTruncated?: boolean;
  key: string;
  label: ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  onClick?: (event: MouseEventHandler) => void;
  // renderItem?: ((row: Row, isRowCollapsed: boolean) => ReactNode);
  headerIcon?: ReactNode;
  isSortable?: boolean;
  disableResizing?: boolean;
  shouldIgnoreRowClick?: boolean;
}[];

type TDataTableManagerContext = {
  columns: TDataColumns;
  getColumns?: (columns: TDataColumns) => void;
};

export const DataTableManagerContext = createContext<TDataTableManagerContext>({
  columns: [],
});
export const DataTableProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [columns, setColumns] = useState<TDataColumns>([]);

  const getColumns = (columnsFromManager: TDataColumns) =>
    setColumns(columnsFromManager);

  return (
    <DataTableManagerContext.Provider value={{ columns, getColumns }}>
      {children}
    </DataTableManagerContext.Provider>
  );
};

const DataTableManager = <Row extends TRow = TRow>(
  props: TDataTableManagerProps<Row>
) => {
  const areDisplaySettingsEnabled = Boolean(
    props.displaySettings && !props.displaySettings.disableDisplaySettings
  );
  const isWrappingText =
    areDisplaySettingsEnabled && props.displaySettings!.isWrappingText;

  const columns = useMemo(
    () =>
      props.columns.map((column) => ({
        ...column,
        isTruncated: areDisplaySettingsEnabled
          ? isWrappingText
          : column.isTruncated,
      })),
    [areDisplaySettingsEnabled, props.columns, isWrappingText]
  );

  const useDataTableManagerContext = () => useContext(DataTableManagerContext);
  const { getColumns } = useDataTableManagerContext();

  useEffect(() => {
    if (!props.children) {
      getColumns!(columns);
    }
  }, [columns, getColumns, props.children]);

  return props.children ? (
    <Spacings.Stack>
      <DataTableSettings
        topBar={props.topBar}
        onSettingsChange={props.onSettingsChange}
        columnManager={props.columnManager}
        displaySettings={props.displaySettings}
        managerTheme="light"
      />
      {cloneElement(props.children, {
        columns,
        isCondensed:
          areDisplaySettingsEnabled && props.displaySettings!.isCondensed,
      })}
    </Spacings.Stack>
  ) : (
    <DataTableSettings
      topBar={props.topBar}
      onSettingsChange={props.onSettingsChange}
      columnManager={props.columnManager}
      displaySettings={props.displaySettings}
      managerTheme="light"
    />
  );
};

DataTableManager.displayName = 'DataTableManager';

export default DataTableManager;
