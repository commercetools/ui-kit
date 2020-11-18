import PropTypes from 'prop-types';
import React, { useState } from 'react';
import invariant from 'tiny-invariant';
import { useIntl } from 'react-intl';
import styled from '@emotion/styled';
import AccessibleHidden from '@commercetools-uikit/accessible-hidden';
import SelectInput from '@commercetools-uikit/select-input';
import { TableIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import { customProperties } from '@commercetools-uikit/design-system';
import { UPDATE_ACTIONS, COLUMN_MANAGER, DISPLAY_SETTINGS } from '../constants';
import DisplaySettingsManager, {
  DENSITY_COMPACT,
  SHOW_HIDE_ON_DEMAND,
} from '../display-settings-manager';
import ColumnSettingsManager from '../column-settings-manager';
import messages from './messages';

/* The horizontal constraint is set on this container instead of the SelectInput
because the input is always empty, and therefore doesn't take any space by itself
but we want to keep enough space for the placeholder to be readable */
const SelectContainer = styled.div`
  width: ${customProperties.constraint4};
`;

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

export const getSelectedColumns = (mappedColumns, visibleColumnsKeys = []) =>
  visibleColumnsKeys.map((columnKey) => mappedColumns[columnKey]);

const DataTableSettings = (props) => {
  const areDisplaySettingsEnabled = Boolean(
    props.displaySettings && !props.displaySettings.disableDisplaySettings
  );
  const areColumnSettingsEnabled = Boolean(
    props.columnManager && !props.columnManager.disableColumnManager
  );
  invariant(
    areDisplaySettingsEnabled || areColumnSettingsEnabled
      ? typeof props.onSettingsChange === 'function'
      : true,
    `ui-kit/DataTableManager: the prop "onSettingsChange" is required when either the display settings or the column settings are enabled.`
  );

  const intl = useIntl();
  const [openedPanelId, setOpenedPanelId] = useState(null);

  const dropdownOptions = getDropdownOptions({
    areDisplaySettingsEnabled,
    areColumnSettingsEnabled,
    formatMessage: intl.formatMessage,
  });

  const handleDropdownChange = (event) => setOpenedPanelId(event.target.value);

  const mappedColumns = getMappedColumns(
    areColumnSettingsEnabled ? props.columnManager.hideableColumns : undefined
  );

  const selectedColumns = getSelectedColumns(
    mappedColumns,
    areColumnSettingsEnabled ? props.columnManager.visibleColumnKeys : undefined
  );

  const handleSettingsPanelChange = () => setOpenedPanelId(null);

  return (
    <Spacings.Stack>
      <Spacings.Inline justifyContent="space-between" alignItems="center">
        <div>{props.topBar}</div>
        {dropdownOptions.length > 0 && (
          <SelectContainer>
            <AccessibleHidden>
              <label htmlFor="table-settings-dropdown">
                Open table manager dropdown
              </label>
            </AccessibleHidden>
            <SelectInput
              id="table-settings-dropdown"
              // the dropdown always shows the placeholder as selecting an option
              // will open the corresponding panel (column manager or display settings)
              value=""
              placeholder={intl.formatMessage(messages.placeholder)}
              onChange={handleDropdownChange}
              options={dropdownOptions}
              iconLeft={<TableIcon />}
            />
          </SelectContainer>
        )}
      </Spacings.Inline>
      {openedPanelId === DISPLAY_SETTINGS && (
        <DisplaySettingsManager
          {...(props.displaySettings || {})}
          onClose={handleSettingsPanelChange}
          onDensityDisplayChange={(event) => {
            props.onSettingsChange(
              UPDATE_ACTIONS.IS_TABLE_CONDENSED_UPDATE,
              event.target.value === DENSITY_COMPACT
            );
          }}
          onTextWrappingChange={(event) => {
            props.onSettingsChange(
              UPDATE_ACTIONS.IS_TABLE_WRAPPING_TEXT_UPDATE,
              event.target.value === SHOW_HIDE_ON_DEMAND
            );
          }}
          managerTheme={props.managerTheme}
        />
      )}

      {openedPanelId === COLUMN_MANAGER && (
        <ColumnSettingsManager
          {...(props.columnManager || {})}
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
          managerTheme={props.managerTheme}
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
    disableDisplaySettings: PropTypes.bool,
    isCondensed: PropTypes.bool,
    isWrappingText: PropTypes.bool,
    primaryButton: PropTypes.element,
    secondaryButton: PropTypes.element,
  }),
  columnManager: PropTypes.shape({
    disableColumnManager: PropTypes.bool,
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
  }),
  managerTheme: PropTypes.oneOf(['light', 'dark']),
};

export default DataTableSettings;
