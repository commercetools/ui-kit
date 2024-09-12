import { useMemo, cloneElement, useState } from 'react';
import Spacings from '@commercetools-uikit/spacings';
import DataTableSettings from './data-table-settings';
import type {
  TRow,
  TColumnProps,
  TDataTableManagerProps,
  TCustomSettingsProps,
} from './types';
import { useDataTableManagerContext } from './data-table-manager-provider';

const DataTableManager = <Row extends TRow = TRow>(
  props: TDataTableManagerProps<Row>
) => {
  const dataTableManagerContext = useDataTableManagerContext();

  const dataTableColumns: TColumnProps<Row>[] =
    props.columns || dataTableManagerContext.columns;
  const displaySettings =
    props.displaySettings || dataTableManagerContext.displaySettings;
  const topBar = props.topBar || dataTableManagerContext.topBar;
  const onSettingsChange =
    props.onSettingsChange || dataTableManagerContext.onSettingsChange;
  const columnManager =
    props.columnManager || dataTableManagerContext.columnManager;
  const customSettings =
    props.customSettings || dataTableManagerContext.customSettings;
  const selectedColumns =
    props.selectedColumns || dataTableManagerContext.selectedColumns;
  const customColumnManager =
    props.customColumnManager || dataTableManagerContext.customColumnManager;
  const customColumns =
    props.customColumns || dataTableManagerContext.customColumns;
  const areDisplaySettingsEnabled = Boolean(
    displaySettings && !displaySettings.disableDisplaySettings
  );
  const isWrappingText =
    areDisplaySettingsEnabled && displaySettings!.isWrappingText;

  if (!dataTableColumns) {
    throw new Error(
      'ui-kit/DataTableManager: missing `columns` prop. If you do not provide it to the component, then you should use the DataTableManagerProvider component.'
    );
  }

  const columns = useMemo(
    () =>
      dataTableColumns.map((column) => ({
        ...column,
        isTruncated: areDisplaySettingsEnabled
          ? isWrappingText
          : column.isTruncated,
      })),
    [dataTableColumns, areDisplaySettingsEnabled, isWrappingText]
  );

  const [additionalSettings, setAdditionalSettings] = useState<{
    key: string;
    [key: string]: unknown;
  }>({ key: '' });

  const additionalCustomSetting =
    dataTableManagerContext.additionalSettings || additionalSettings;

  const updateSettings = (additionalCustomSettings: unknown) => {
    setAdditionalSettings(
      additionalCustomSettings as { [key: string]: unknown; key: string }
    );
  };
  const updateCustomSettings =
    dataTableManagerContext.updateCustomSettings || updateSettings;

  return (
    <Spacings.Stack>
      <DataTableSettings
        topBar={topBar}
        onSettingsChange={onSettingsChange}
        columnManager={columnManager}
        displaySettings={displaySettings}
        customSettings={customSettings as TCustomSettingsProps[] | undefined}
        managerTheme="light"
        additionalSettings={additionalCustomSetting}
        updateCustomSettings={(settings) => updateCustomSettings(settings)}
        selectedColumns={selectedColumns ?? []}
        customColumnManager={customColumnManager ?? undefined}
      />
      {props.children
        ? cloneElement(props.children, {
            columns,
            customColumns,
            isCondensed:
              areDisplaySettingsEnabled && props.displaySettings!.isCondensed,
          })
        : null}
    </Spacings.Stack>
  );
};

DataTableManager.displayName = 'DataTableManager';

export default DataTableManager;
