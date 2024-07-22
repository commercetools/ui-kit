import { useMemo, cloneElement, useState } from 'react';
import Spacings from '@commercetools-uikit/spacings';
import DataTableSettings from './data-table-settings';
import type {
  TRow,
  TColumnProps,
  TDataTableManagerProps,
  TCustomSettingsProps,
} from './types';
import { useDataTableManagerContext } from '@commercetools-uikit/data-table-manager/data-table-manager-provider';

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
    [key: string]: unknown;
  }>({});

  const updateCustomSettings = (additionalCustomSettings: unknown) => {
    setAdditionalSettings(
      additionalCustomSettings as { [key: string]: unknown }
    );
  };

  const newCustomSettings = useMemo(() => {
    return props.customSettings?.map((setting) => {
      if (setting.id === additionalSettings.id) {
        setting.payload = {
          ...setting.payload,
          ...additionalSettings,
        };
      }
      return setting;
    });
  }, [additionalSettings, props.customSettings]);

  const customSettingsPayload = {} as Record<string, unknown>;
  newCustomSettings?.forEach(({ id, payload }) => {
    customSettingsPayload[id] = payload;
  });

  return (
    <Spacings.Stack>
      <DataTableSettings
        topBar={topBar}
        onSettingsChange={onSettingsChange}
        columnManager={columnManager}
        displaySettings={displaySettings}
        customSettings={customSettings as TCustomSettingsProps[] | undefined}
        managerTheme="light"
        additionalSettings={additionalSettings}
        updateCustomSettings={(settings) => updateCustomSettings(settings)}
      />
      <pre>{JSON.stringify(customSettingsPayload, null, 2)}</pre>
      {props.children
        ? cloneElement(props.children, {
            columns,
            isCondensed:
              areDisplaySettingsEnabled && props.displaySettings!.isCondensed,
            customSettingsPayload,
          })
        : null}
    </Spacings.Stack>
  );
};

DataTableManager.displayName = 'DataTableManager';

export default DataTableManager;
