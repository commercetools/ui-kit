import PropTypes from 'prop-types';
import React, { useState } from 'react';
import invariant from 'tiny-invariant';
import { useIntl } from 'react-intl';
import SelectInput from '@commercetools-uikit/select-input';
import Spacings from '@commercetools-uikit/spacings';
import DensityManager from './density-manager';
import ColumnManager from './column-manager';
import { SelectContainer } from './data-table-settings-panel.styles';
import { UPDATE_ACTIONS, COLUMN_MANAGER, DISPLAY_SETTINGS } from '../constants';
import messages from './messages';

export const getDropdownOptions = ({
  areColumnSettingsEnabled,
  areDisplaySettingsEnabled,
  formatMessage,
}) => [
  ...(areColumnSettingsEnabled
    ? [
        {
          value: COLUMN_MANAGER,
          label: formatMessage(messages.columnManagerOption),
        },
      ]
    : []),
  ...(areDisplaySettingsEnabled
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
  const areDisplaySettingsEnabled = Boolean(
    props.displaySettings && !props.displaySettings.disableDisplaySettings
  );
  const areColumnSettingsEnabled = Boolean(
    props.columnManager && !props.columnManager.disableColumnManager
  );
  invariant(
    areDisplaySettingsEnabled &&
      typeof props.displaySettings.isWrappingText === 'boolean',
    `ui-kit/DataTableManager: the prop "displaySettings.isWrappingText" is required when the display settings are enabled.`
  );
  invariant(
    areColumnSettingsEnabled &&
      Array.isArray(props.columnManager.visibleColumnKeys),
    `ui-kit/DataTableManager: the prop "columnManager.visibleColumnKeys" is required when the column settings are enabled.`
  );
  invariant(
    areColumnSettingsEnabled &&
      Array.isArray(props.columnManager.hideableColumns),
    `ui-kit/DataTableManager: the prop "columnManager.hideableColumns" is required when the column settings are enabled.`
  );
  invariant(
    areColumnSettingsEnabled &&
      props.columnManager.areHiddenColumnsSearchable &&
      typeof props.columnManager.searchHiddenColumns === 'function',
    `ui-kit/DataTableManager: the prop "columnManager.searchHiddenColumns" is required when the column settings are enabled.`
  );
  invariant(
    (areDisplaySettingsEnabled || areColumnSettingsEnabled) &&
      typeof props.onSettingsChange === 'function',
    `ui-kit/DataTableManager: the prop "onSettingsChange" is required when the either the display settings or the column settings are enabled.`
  );

  const intl = useIntl();
  const [openedPanelId, setOpenedPanelId] = useState(null);

  const dropdownOptions = getDropdownOptions({
    areDisplaySettingsEnabled,
    areColumnSettingsEnabled,
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
          <SelectContainer>
            <SelectInput
              name="table-settings-dropdown"
              // the dropdown always shows the placeholder as selecting an option
              // will open the corresponding panel (column manager or display settings)
              value=""
              placeholder={intl.formatMessage(messages.placeholder)}
              onChange={handleDropdownChange}
              options={dropdownOptions}
            />
          </SelectContainer>
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
  onSettingsChange: PropTypes.func,
  displaySettings: PropTypes.shape({
    disableDisplaySettings: PropTypes.bool.isRequired,
    isCondensed: PropTypes.bool,
    isWrappingText: PropTypes.bool,
    primaryButton: PropTypes.element,
    secondaryButton: PropTypes.element,
  }).isRequired,
  columnManager: PropTypes.shape({
    disableColumnManager: PropTypes.bool.isRequired,
    visibleColumnKeys: PropTypes.arrayOf(PropTypes.string.isRequired),
    hideableColumns: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
          .isRequired,
      })
    ),
    areHiddenColumnsSearchable: PropTypes.bool,
    searchHiddenColumns: PropTypes.func,
    searchHiddenColumnsPlaceholder: PropTypes.string,
    primaryButton: PropTypes.element,
    secondaryButton: PropTypes.element,
  }).isRequired,
};

export default DataTableSettings;
