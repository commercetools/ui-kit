import PropTypes from 'prop-types';
import React, { useState } from 'react';
import requiredIf from 'react-required-if';
import { useIntl } from 'react-intl';
import Constraints from '@commercetools-uikit/constraints';
import SelectInput from '@commercetools-uikit/select-input';
import Spacings from '@commercetools-uikit/spacings';
import DensityManager from './density-manager';
import ColumnManager from './column-manager';
import { UPDATE_ACTIONS, COLUMN_MANAGER, DISPLAY_SETTINGS } from '../constants';
import messages from './messages';

export const getDropdownOptions = ({
  isColumnManagerEnabled,
  isDisplaySettingsEnabled,
  formatMessage,
}) => [
  ...(isColumnManagerEnabled
    ? [
        {
          value: COLUMN_MANAGER,
          label: formatMessage(messages.columnManagerOption),
        },
      ]
    : []),
  ...(isDisplaySettingsEnabled
    ? [
        {
          value: DISPLAY_SETTINGS,
          label: formatMessage(messages.displaySettingsOption),
        },
      ]
    : []),
];

export const getMappedColumns = (columns = []) =>
  columns.reduce(
    (mappedColumns, column) => ({
      ...mappedColumns,
      [column.key]: column,
    }),
    {}
  );

export const getSelectedColumns = (visibleColumnsKeys = [], mappedColumns) =>
  visibleColumnsKeys.map((columnKey) => mappedColumns[columnKey]);

const DataTableSettings = (props) => {
  const intl = useIntl();
  const [openedPanelId, setOpenedPanelId] = useState(null);

  const dropdownOptions = getDropdownOptions({
    isColumnManagerEnabled: !props.columnManager.disableColumnManager,
    isDisplaySettingsEnabled: !props.displaySettings.disableDisplaySettings,
    formatMessage: intl.formatMessage,
  });

  const handleDropdownChange = (event) => setOpenedPanelId(event.target.value);

  const mappedColumns = getMappedColumns(props.columnManager.hideableColumns);

  const selectedColumns = getSelectedColumns(
    props.columnManager.visibleColumnKeys,
    mappedColumns
  );

  const handleSettingsPanelChange = () => setOpenedPanelId(null);

  return (
    <Spacings.Stack>
      <Spacings.Inline justifyContent="space-between" alignItems="center">
        <div>{props.topBar}</div>
        {dropdownOptions.length > 0 && (
          <Constraints.Horizontal constraint="s">
            <SelectInput
              name="table-settings-dropdown"
              // the dropdown always shows the placeholder as selecting an option
              // will open the corresponding panel (column manager or display settings)
              value=""
              placeholder={intl.formatMessage(messages.placeholder)}
              onChange={handleDropdownChange}
              options={dropdownOptions}
            />
          </Constraints.Horizontal>
        )}
      </Spacings.Inline>
      {openedPanelId === DISPLAY_SETTINGS && (
        <DensityManager
          data-testid={DISPLAY_SETTINGS}
          {...props.displaySettings}
          isDensityManagerOpenDefault={true}
          onClose={handleSettingsPanelChange}
          onDensityDisplayChange={() => {
            props.onSettingsChange(
              UPDATE_ACTIONS.IS_TABLE_CONDENSED_UPDATE,
              !props.displaySettings.isCondensed
            );
          }}
          onTextWrappingChange={() => {
            props.onSettingsChange(
              UPDATE_ACTIONS.IS_TABLE_WRAPPING_TEXT_UPDATE,
              !props.displaySettings.isWrappingText
            );
          }}
        />
      )}

      {openedPanelId === COLUMN_MANAGER && (
        <ColumnManager
          data-testid={COLUMN_MANAGER}
          {...props.columnManager}
          availableColumns={props.columnManager.hideableColumns}
          selectedColumns={selectedColumns}
          onClose={handleSettingsPanelChange}
          onUpdateColumns={(nextVisibleColumns) => {
            const keysOfVisibleColumns = nextVisibleColumns.map(
              (visibleColumn) => visibleColumn.key
            );
            props.onSettingsChange(
              UPDATE_ACTIONS.COLUMNS_UPDATE,
              keysOfVisibleColumns
            );
          }}
        />
      )}
    </Spacings.Stack>
  );
};

DataTableSettings.displayName = 'DataTableSettings';
DataTableSettings.propTypes = {
  topBar: PropTypes.node,
  onSettingsChange: requiredIf(
    PropTypes.func,
    (props) =>
      !props.columnManager.disableColumnManager ||
      !props.displaySettings.disableDisplaySettings
  ),
  displaySettings: PropTypes.shape({
    disableDisplaySettings: PropTypes.bool.isRequired,
    isCondensed: PropTypes.bool,
    isWrappingText: requiredIf(
      PropTypes.bool,
      (props) =>
        props.displaySettings && !props.displaySettings.disableDisplaySettings
    ),
    primaryButton: PropTypes.element,
    secondaryButton: PropTypes.element,
  }).isRequired,
  columnManager: PropTypes.shape({
    disableColumnManager: PropTypes.bool.isRequired,
    visibleColumnKeys: requiredIf(
      PropTypes.arrayOf(PropTypes.string),
      (props) =>
        props.columnManager && !props.columnManager.disableColumnManager
    ),
    hideableColumns: requiredIf(
      PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          label: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
            .isRequired,
        })
      ),
      (props) =>
        props.columnManager && !props.columnManager.disableColumnManager
    ),
    areHiddenColumnsSearchable: requiredIf(
      PropTypes.bool,
      (props) =>
        props.columnManager && !props.columnManager.disableColumnManager
    ),
    searchHiddenColumns: requiredIf(
      PropTypes.func,
      (props) =>
        props.columnManager &&
        !props.columnManager.disableColumnManager &&
        props.columnManager.areHiddenColumnsSearchable
    ),
    searchHiddenColumnsPlaceholder: PropTypes.string,
    primaryButton: PropTypes.element,
    secondaryButton: PropTypes.element,
  }).isRequired,
};

export default DataTableSettings;
