import { useState, type ReactElement, type ReactNode } from 'react';
import { warning } from '@commercetools-uikit/utils';
import { useIntl, type MessageDescriptor } from 'react-intl';
import styled from '@emotion/styled';
import AccessibleHidden from '@commercetools-uikit/accessible-hidden';
import SelectInput from '@commercetools-uikit/select-input';
import { TableIcon } from '@commercetools-uikit/icons';
import Spacings from '@commercetools-uikit/spacings';
import { designTokens } from '@commercetools-uikit/design-system';
import { UPDATE_ACTIONS, COLUMN_MANAGER, DISPLAY_SETTINGS } from '../constants';
import DisplaySettingsManager, {
  DENSITY_COMPACT,
  SHOW_HIDE_ON_DEMAND,
} from '../display-settings-manager';
import ColumnSettingsManager from '../column-settings-manager';
import messages from './messages';

export type TSelectChangeEvent = {
  target: {
    name?: string;
    value?: string | string[] | null;
  };
  persist: () => void;
};

type TColumnData = {
  key: string;
  label: ReactNode;
};

type MappedColumns = Record<string, TColumnData>;

export type TDisplaySettingsProps = {
  /**
   * Set this flag to `false` to show the display settings panel option.
   *
   * @@defaultValue@@: true
   */
  disableDisplaySettings?: boolean;

  /**
   * Set this to `true` to reduce the paddings of all cells, allowing the table to display
   * more data in less space.
   *
   * @@defaultValue@@: false
   */
  isCondensed?: boolean;

  /**
   * Set this to `true` to allow text in a cell to wrap.
   * <br>
   * This is required if `disableDisplaySettings` is set to `false`.
   *
   * @@defaultValue@@: false
   */
  isWrappingText?: boolean;

  /**
   * A React element to be rendered as the primary button, useful when the display settings work as a form.
   */
  primaryButton?: ReactElement;

  /**
   * A React element to be rendered as the secondary button, useful when the display settings work as a form.
   */
  secondaryButton?: ReactElement;
};

export type TColumnManagerProps = {
  /**
   * Set this to `true` to show a search input for the hidden columns panel.
   */
  areHiddenColumnsSearchable?: boolean;

  /**
   * Set this to `false` to show the column settings panel option.
   *
   * @@defaultValue@@: true
   */
  disableColumnManager?: boolean;

  /**
   * The keys of the visible columns.
   */
  visibleColumnKeys: string[];

  /**
   * The keys of the visible columns.
   */
  hideableColumns?: TColumnData[];

  /**
   * A callback function, called when the search input for the hidden columns panel changes.
   */
  searchHiddenColumns?: (searchTerm: string) => Promise<void> | void;

  /**
   * Placeholder value of the search input for the hidden columns panel.
   */
  searchHiddenColumnsPlaceholder?: string;

  /**
   * A React element to be rendered as the primary button, useful when the column settings work as a form.
   */
  primaryButton?: ReactElement;

  /**
   * A React element to be rendered as the secondary button, useful when the column settings work as a form.
   */
  secondaryButton?: ReactElement;
};

export type TDataTableSettingsProps = {
  topBar?: ReactNode;
  onSettingsChange?: (
    settingName: string,
    settingValue: boolean | string[]
  ) => void;
  displaySettings?: TDisplaySettingsProps;
  columnManager?: TColumnManagerProps;
  managerTheme?: 'light' | 'dark';
};

/* The horizontal constraint is set on this container instead of the SelectInput
because the input is always empty, and therefore doesn't take any space by itself
but we want to keep enough space for the placeholder to be readable */
const SelectContainer = styled.div`
  min-width: ${designTokens.constraint4};
`;

const TopBarContainer = styled.div`
  flex-grow: 1;
`;

export const getDropdownOptions = ({
  areColumnSettingsEnabled,
  areDisplaySettingsEnabled,
  formatMessage,
}: {
  areColumnSettingsEnabled: boolean;
  areDisplaySettingsEnabled: boolean;
  formatMessage: (message: MessageDescriptor) => string;
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

  const dropdownOptions = getDropdownOptions({
    areDisplaySettingsEnabled,
    areColumnSettingsEnabled,
    formatMessage: intl.formatMessage,
  });

  const handleDropdownChange = (event: TSelectChangeEvent) =>
    setOpenedPanelId(
      Array.isArray(event.target.value)
        ? event.target.value[0]
        : event.target.value
    );

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
              iconLeft={<TableIcon color="neutral60" />}
            />
          </SelectContainer>
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
      {openedPanelId === COLUMN_MANAGER && (
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
