import PropTypes from 'prop-types';
import React from 'react';
import requiredIf from 'react-required-if';
import Spacings from '@commercetools-uikit/spacings';
import DataTableSettings from './data-table-settings';

const DataTableManager = (props) => {
  const columns = React.useMemo(
    () =>
      props.columns.map((column) => ({
        ...column,
        isTruncated: !props.displaySettings.disableDisplaySettings
          ? props.displaySettings.isWrappingText
          : column.isTruncated,
      })),
    [
      props.columns,
      props.displaySettings.disableDisplaySettings,
      props.displaySettings.isWrappingText,
    ]
  );

  return (
    <Spacings.Stack>
      <DataTableSettings
        topBar={props.topBar}
        onSettingsChange={props.onSettingsChange}
        columnManager={props.columnManager}
        displaySettings={props.displaySettings}
      />
      {React.cloneElement(props.children, {
        columns,
        isCondensed: props.displaySettings.isCondensed,
      })}
    </Spacings.Stack>
  );
};

DataTableManager.propTypes = {
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
  children: PropTypes.node.isRequired,
  /* Table settings props */
  displaySettings: PropTypes.shape({
    disableDisplaySettings: PropTypes.bool,
    isCondensed: PropTypes.bool,
    isWrappingText: requiredIf(
      PropTypes.bool,
      (props) => props.displaySettings.disableDisplaySettings
    ),
    primaryButton: PropTypes.element,
    secondaryButton: PropTypes.element,
  }),
  columnManager: PropTypes.shape({
    disableColumnManager: PropTypes.bool,
    visibleColumnKeys: requiredIf(
      PropTypes.array,
      (props) => !props.columnManager.disableColumnManager
    ),
    hideableColumns: requiredIf(
      PropTypes.array,
      (props) => !props.columnManager.disableColumnManager
    ),
    areHiddenColumnsSearchable: PropTypes.bool,
    searchHiddenColumns: requiredIf(
      PropTypes.func,
      (props) =>
        !props.columnManager.disableColumnManager &&
        props.columnManager.areHiddenColumnsSearchable
    ),
    searchHiddenColumnsPlaceholder: PropTypes.string,
    primaryButton: PropTypes.element,
    secondaryButton: PropTypes.element,
  }),
  onSettingsChange: requiredIf(
    PropTypes.func,
    (props) =>
      !props.displaySettings.disableColumnManager ||
      !props.columnManager.disableDisplaySettings
  ),
  /* Top bar */
  topBar: PropTypes.node,
};
DataTableManager.defaultProps = {
  isCondensed: false,
  itemRenderer: (row, column) => row[column.key],
  displaySettings: {
    disableDisplaySettings: true,
  },
  columnManager: { disableColumnManager: true },
  isWrappingText: false,
};
DataTableManager.displayName = 'DataTableManager';

export default DataTableManager;
