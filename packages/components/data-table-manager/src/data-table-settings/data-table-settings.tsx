import { useState } from 'react';
import { warning } from '@commercetools-uikit/utils';
import { useIntl, type MessageDescriptor } from 'react-intl';
import styled from '@emotion/styled';
import { ColumnsIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import { UPDATE_ACTIONS, COLUMN_MANAGER, DISPLAY_SETTINGS } from '../constants';
import DisplaySettingsManager, {
  DENSITY_COMPACT,
  SHOW_HIDE_ON_DEMAND,
} from '../display-settings-manager';
import ColumnSettingsManager from '../column-settings-manager';
import messages from './messages';
import DropdownMenu from '@commercetools-uikit/dropdown-menu';
import IconButton from '@commercetools-uikit/icon-button';
import Tooltip from '@commercetools-uikit/tooltip';
import { TColumnData, TDataTableSettingsProps } from '../types';

export type TSelectChangeEvent = {
  target: {
    name?: string;
    value?: string | string[] | null;
  };
  persist: () => void;
};

type MappedColumns = Record<string, TColumnData>;

export type TDropdownOption = {
  value: string;
  label: string;
};

const TopBarContainer = styled.div`
  flex-grow: 1;
`;

export const getDropdownOptions = ({
  areColumnSettingsEnabled,
  areDisplaySettingsEnabled,
  formatMessage,
  nestedColumnManager,
}: {
  areColumnSettingsEnabled: boolean;
  areDisplaySettingsEnabled: boolean;
  formatMessage: (message: MessageDescriptor) => string;
  nestedColumnManager: TDataTableSettingsProps['nestedColumnManager'];
}) => [
  ...(areColumnSettingsEnabled
    ? [
        {
          value: COLUMN_MANAGER,
          label: formatMessage(messages.columnManagerOption),
        },
      ]
    : []),
  ...(nestedColumnManager
    ? nestedColumnManager.map((nestedColumns) => {
        return {
          value: nestedColumns.value,
          label: nestedColumns.label,
        };
      })
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

export const getMappedColumns = (columns: TColumnData[] = []) =>
  columns.reduce<MappedColumns>(
    (mappedColumns, column) => ({
      ...mappedColumns,
      [column.key]: column,
    }),
    {}
  );

export const getSelectedColumns = (
  mappedColumns: MappedColumns,
  visibleColumnsKeys: string[] = []
) => visibleColumnsKeys.map((columnKey) => mappedColumns[columnKey]);

const DataTableSettings = (props: TDataTableSettingsProps) => {
  const areDisplaySettingsEnabled = Boolean(
    props.displaySettings && !props.displaySettings.disableDisplaySettings
  );
  const areColumnSettingsEnabled = Boolean(
    props.columnManager && !props.columnManager.disableColumnManager
  );
  warning(
    areDisplaySettingsEnabled || areColumnSettingsEnabled
      ? typeof props.onSettingsChange === 'function'
      : true,
    `ui-kit/DataTableManager: the prop "onSettingsChange" is required when either the display settings or the column settings are enabled.`
  );

  const intl = useIntl();
  const [openedPanelId, setOpenedPanelId] = useState<string | null | undefined>(
    null
  );
  // @ts-ignore
  const dropdownOptions: TDropdownOption[] = getDropdownOptions({
    areDisplaySettingsEnabled,
    areColumnSettingsEnabled,
    formatMessage: intl.formatMessage,
    nestedColumnManager: props.nestedColumnManager,
  });

  const mappedColumns = getMappedColumns(
    areColumnSettingsEnabled ? props.columnManager!.hideableColumns : undefined
  );

  const selectedColumns = getSelectedColumns(
    mappedColumns,
    areColumnSettingsEnabled
      ? props.columnManager!.visibleColumnKeys
      : undefined
  );

  const handleSettingsPanelChange = () => setOpenedPanelId(null);

  return (
    <Spacings.Stack scale="xs">
      <Spacings.Inline justifyContent="space-between" alignItems="center">
        <TopBarContainer>{props.topBar}</TopBarContainer>
        {dropdownOptions.length > 0 && (
          <Tooltip
            placement="left"
            title={intl.formatMessage(messages.placeholder)}
          >
            <DropdownMenu
              triggerElement={
                <IconButton
                  icon={<ColumnsIcon />}
                  label="Open table manager dropdown"
                />
              }
              menuHorizontalConstraint={'auto'}
              menuPosition="right"
              menuType="list"
            >
              {dropdownOptions?.map((option: TDropdownOption) => (
                <DropdownMenu.ListMenuItem
                  key={option?.label}
                  onClick={() => {
                    setOpenedPanelId(option?.value);
                  }}
                >
                  {option?.label}
                </DropdownMenu.ListMenuItem>
              ))}
            </DropdownMenu>
          </Tooltip>
        )}
      </Spacings.Inline>
      {openedPanelId === DISPLAY_SETTINGS && (
        <DisplaySettingsManager
          {...(props.displaySettings || {})}
          onClose={handleSettingsPanelChange}
          onDensityDisplayChange={(event) => {
            props.onSettingsChange?.(
              UPDATE_ACTIONS.IS_TABLE_CONDENSED_UPDATE,
              event.target.value === DENSITY_COMPACT
            );
          }}
          onTextWrappingChange={(event) => {
            props.onSettingsChange?.(
              UPDATE_ACTIONS.IS_TABLE_WRAPPING_TEXT_UPDATE,
              event.target.value === SHOW_HIDE_ON_DEMAND
            );
          }}
          managerTheme={props.managerTheme}
        />
      )}
      {props.nestedColumnManager
        ? props.nestedColumnManager.map(
            (nestedManager) =>
              openedPanelId === nestedManager.value && (
                <ColumnSettingsManager
                  key={nestedManager.value}
                  {...(nestedManager || {})}
                  availableColumns={nestedManager.hideableColumns ?? []}
                  title={nestedManager.label}
                  selectedColumns={
                    props.nestedColumnManager
                      ? getSelectedColumns(
                          mappedColumns,
                          // @ts-ignore
                          props.nestedColumnManager!.visibleColumnKeys
                        )
                      : selectedColumns
                  }
                  onClose={handleSettingsPanelChange}
                  onUpdateColumns={(nextVisibleColumns) => {
                    const keysOfVisibleColumns = nextVisibleColumns.map(
                      (visibleColumn) => visibleColumn.key
                    );
                    props.onSettingsChange?.(
                      UPDATE_ACTIONS.COLUMNS_UPDATE,
                      keysOfVisibleColumns
                    );
                  }}
                  managerTheme={props.managerTheme}
                />
              )
          )
        : openedPanelId === COLUMN_MANAGER && (
            <ColumnSettingsManager
              {...(props.columnManager || {})}
              availableColumns={props.columnManager?.hideableColumns ?? []}
              selectedColumns={selectedColumns}
              onClose={handleSettingsPanelChange}
              onUpdateColumns={(nextVisibleColumns) => {
                const keysOfVisibleColumns = nextVisibleColumns.map(
                  (visibleColumn) => visibleColumn.key
                );
                props.onSettingsChange?.(
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

export default DataTableSettings;
