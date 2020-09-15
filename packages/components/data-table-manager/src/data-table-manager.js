import PropTypes from 'prop-types';
import React from 'react';
import Spacings from '@commercetools-uikit/spacings';
import DataTableSettings from './data-table-settings';

const DataTableManager = (props) => {
  const areDisplaySettingsEnabled = Boolean(
    props.displaySettings && !props.displaySettings.disableDisplaySettings
  );
  const isWrappingText =
    areDisplaySettingsEnabled && props.displaySettings.isWrappingText;

  const columns = React.useMemo(
    () =>
      props.columns.map((column) => ({
        ...column,
        isTruncated: areDisplaySettingsEnabled
          ? isWrappingText
          : column.isTruncated,
      })),
    [areDisplaySettingsEnabled, props.columns, isWrappingText]
  );

  return (
    <Spacings.Stack>
      <DataTableSettings
        topBar={props.topBar}
        onSettingsChange={props.onSettingsChange}
        columnManager={props.columnManager}
        displaySettings={props.displaySettings}
        settingsContainerTheme={props.settingsContainerTheme}
      />
      {React.cloneElement(props.children, {
        columns,
        isCondensed:
          areDisplaySettingsEnabled && props.displaySettings.isCondensed,
      })}
    </Spacings.Stack>
  );
};

DataTableManager.propTypes = {
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
  ).isRequired,
  /**
   * Any React node. Usually you want to render the `<DataTable>` component.
   * <br>
   * Note that the child component will implicitly receive the props `columns` and `isCondensed` from the `<DataTableManager>`.
   */
  children: PropTypes.node.isRequired,
  /**
   * The managed display settings of the table.
   */
  displaySettings: PropTypes.shape({
    /**
     * Set this flag to `false` to show the display settings panel option.
     *
     * @@defaultValue@@: true
     */
    disableDisplaySettings: PropTypes.bool,
    /**
     * Set this to `true` to reduce the paddings of all cells, allowing the table to display
     * more data in less space.
     *
     * @@defaultValue@@: false
     */
    isCondensed: PropTypes.bool,
    /**
     * Set this to `true` to allow text in a cell to wrap.
     * <br>
     * This is required if `disableDisplaySettings` is set to `false`.
     *
     * @@defaultValue@@: false
     */
    isWrappingText: PropTypes.bool,
    /**
     * A React element to be rendered as the primary button, useful when the display settings work as a form.
     */
    primaryButton: PropTypes.element,
    /**
     * A React element to be rendered as the secondary button, useful when the display settings work as a form.
     */
    secondaryButton: PropTypes.element,
  }),
  /**
   * The managed column settings of the table.
   */
  columnManager: PropTypes.shape({
    /**
     * Set this to `false` to show the column settings panel option.
     *
     * @@defaultValue@@: true
     */
    disableColumnManager: PropTypes.bool,
    /**
     * The keys of the visible columns.
     */
    visibleColumnKeys: PropTypes.arrayOf(PropTypes.string.isRequired),
    /**
     * The keys of the visible columns.
     */
    hideableColumns: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
          .isRequired,
      })
    ),
    /**
     * Set this to `true` to show a search input for the hidden columns panel.
     */
    areHiddenColumnsSearchable: PropTypes.bool,
    /**
     * A callback function, called when the search input for the hidden columns panel changes.
     * <br>
     * Signature: `(event) => void`
     */
    searchHiddenColumns: PropTypes.func,
    /**
     * Placeholder value of the search input for the hidden columns panel.
     */
    searchHiddenColumnsPlaceholder: PropTypes.string,
    /**
     * A React element to be rendered as the primary button, useful when the column settings work as a form.
     */
    primaryButton: PropTypes.element,
    /**
     * A React element to be rendered as the secondary button, useful when the column settings work as a form.
     */
    secondaryButton: PropTypes.element,
  }),
  /**
   * A callback function, called when any of the properties of either display settings or column settings is modified.
   * <br>
   * Signature: `(action: string, nextValue: object) => void`
   */
  onSettingsChange: PropTypes.func,
  /**
   * A React node for rendering additional information within the table manager.
   */
  topBar: PropTypes.node,
  /**
   * Sets the background theme of the Card that contains the settings
   */
  settingsContainerTheme: PropTypes.oneOf(['light', 'dark']).isRequired,
};
DataTableManager.defaultProps = {
  settingsContainerTheme: 'dark',
};
DataTableManager.displayName = 'DataTableManager';

export default DataTableManager;
