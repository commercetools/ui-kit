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
import { ColumnSettingsManager } from '../column-settings-manager';
import CustomSettingsManager from '../custom-settings-manager';
import messages from './messages';
import DropdownMenu from '@commercetools-uikit/dropdown-menu';
import IconButton from '@commercetools-uikit/icon-button';
import Tooltip from '@commercetools-uikit/tooltip';
import {
  TColumnData,
  TDataTableSettingsProps,
  TCustomSettingsProps,
} from '../types';

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
  customSettings,
  columnManagerLabel,
  displaySettingsLabel,
  formatMessage,
}: {
  areColumnSettingsEnabled: boolean;
  areDisplaySettingsEnabled: boolean;
  customSettings?: TCustomSettingsProps[];
  columnManagerLabel?: string;
  displaySettingsLabel?: string;
  formatMessage: (message: MessageDescriptor) => string;
}) => {
  return [
    ...(areColumnSettingsEnabled
      ? [
          {
            value: COLUMN_MANAGER,
            label: columnManagerLabel
              ? columnManagerLabel
              : formatMessage(messages.columnManagerOption),
          },
        ]
      : []),
    ...(customSettings
      ? customSettings.map((customSetting) => {
          return {
            value: customSetting.value,
            label: customSetting.label,
          };
        })
      : []),
    ...(areDisplaySettingsEnabled
      ? [
          {
            value: DISPLAY_SETTINGS,
            label: displaySettingsLabel
              ? displaySettingsLabel
              : formatMessage(messages.displaySettingsOption),
          },
        ]
      : []),
  ];
};

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

  const dropdownOptions: TDropdownOption[] = getDropdownOptions({
    areDisplaySettingsEnabled,
    areColumnSettingsEnabled,
    customSettings: props.customSettings,
    columnManagerLabel: props.columnManager?.columnManagerLabel,
    displaySettingsLabel: props.displaySettings?.displaySettingsLabel,
    formatMessage: intl.formatMessage,
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
          title={props.displaySettings?.displaySettingsLabel}
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
      {openedPanelId === COLUMN_MANAGER && (
        <ColumnSettingsManager
          {...(props.columnManager || {})}
          title={props.columnManager?.columnManagerLabel}
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
      {props.customSettings &&
        props.customSettings.map((customSetting) => {
          const CustomComponent = customSetting.customComponent;
          return (
            customSetting.value === openedPanelId && (
              <div key={customSetting.value}>
                {customSetting.type === COLUMN_MANAGER ? (
                  CustomComponent && (
                    <CustomComponent
                      {...(customSetting || {})}
                      additionalSettings={{
                        customSetting,
                        ...props.additionalSettings,
                      }}
                      onClose={handleSettingsPanelChange}
                      managerTheme={props.managerTheme}
                      onUpdateColumns={(nextVisibleColumns) => {
                        const keysOfVisibleColumns = nextVisibleColumns.map(
                          (visibleColumn) => visibleColumn.key
                        );
                        props.onSettingsChange?.(
                          UPDATE_ACTIONS.CUSTOM_COLUMNS_UPDATE,
                          keysOfVisibleColumns
                        );
                        props.updateCustomSettings?.({
                          id: customSetting.id,
                          customColumns: nextVisibleColumns,
                        });
                      }}
                    />
                  )
                ) : (
                  <CustomSettingsManager
                    {...(customSetting || {})}
                    onClose={handleSettingsPanelChange}
                    managerTheme={props.managerTheme}
                  >
                    {CustomComponent && (
                      <CustomComponent
                        updateCustomSettings={(settings) =>
                          props.updateCustomSettings?.(settings)
                        }
                        additionalSettings={{
                          customSetting,
                          ...props.additionalSettings,
                        }}
                      />
                    )}
                  </CustomSettingsManager>
                )}
              </div>
            )
          );
        })}
    </Spacings.Stack>
  );
};

DataTableSettings.displayName = 'DataTableSettings';

export default DataTableSettings;
