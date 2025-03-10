import { createContext, useContext, useMemo, useState } from 'react';
import type {
  TDataTableSettingsProps,
  TColumnManagerProps,
  TCustomSettingsProps,
  TAdditionalSettings,
} from '../types';
import type { TDataTableManagerColumnProps, TRow } from './types';
import { TColumnData } from '../column-settings-manager';

export type TDataTableManagerContext<Row extends TRow = TRow> =
  TDataTableSettingsProps & {
    columns: TDataTableManagerColumnProps<Row>[];
    isCondensed?: boolean;
    customSettingsPayload?: Record<string, unknown>;
    customColumns?: TColumnData[];
    debug: boolean; // TODO - remove when nested rows are implemented
  };

const DataTableManagerContext = createContext<TDataTableManagerContext>({
  columns: [],
  displaySettings: undefined,
  isCondensed: true,
  debug: false,
  additionalSettings: {},
});

export const useDataTableManagerContext = () => {
  const dataTableManagerContext = useContext(DataTableManagerContext);

  if (!dataTableManagerContext) {
    throw new Error(
      'ui-kit/DataTableManager: `useDataTableManagerContext` must be used within the DataTableManagerProvider.'
    );
  }

  return dataTableManagerContext;
};

export const DataTableManagerProvider = ({
  children,
  columns,
  displaySettings,
  topBar,
  onSettingsChange,
  columnManager,
  customSettings,
  selectedColumns,
  customColumnManager,
  customColumns,
  debug, // TODO - remove when nested rows are implemented
}: {
  children: React.ReactNode;
  columns: TDataTableManagerColumnProps[];
  displaySettings: TDataTableSettingsProps['displaySettings'];
  topBar: string;
  onSettingsChange: (
    settingName: string,
    settingValue: boolean | Record<string, unknown> | string[],
    key?: string
  ) => void;
  columnManager: TColumnManagerProps;
  customSettings?: TCustomSettingsProps[];
  selectedColumns?: TColumnData[];
  customColumnManager?: TColumnManagerProps;
  customColumns?: TColumnData[];
  debug: boolean;
}) => {
  const [additionalSettings, setAdditionalSettings] = useState<{
    [key: string]: unknown;
  }>({});

  const updateCustomSettings = (
    additionalCustomSettings: TAdditionalSettings
  ) => {
    setAdditionalSettings(
      additionalCustomSettings as { [key: string]: unknown }
    );
  };

  const decoupledDataTableManagerContext = useMemo(() => {
    const areDisplaySettingsEnabled = Boolean(
      displaySettings && !displaySettings.disableDisplaySettings
    );

    const isWrappingText =
      areDisplaySettingsEnabled && displaySettings!.isWrappingText;

    const customSettingsPayload = {} as Record<string, unknown>;
    customSettings &&
      Object.entries(customSettings).forEach(([key, settingsPayload]) => {
        customSettingsPayload[key] = settingsPayload;
      });

    return {
      columns: columns.map((column) => ({
        ...column,
        isTruncated: areDisplaySettingsEnabled
          ? isWrappingText
          : column.isTruncated,
      })),
      displaySettings,
      topBar,
      onSettingsChange,
      columnManager,
      customSettings,
      customSettingsPayload,
      isCondensed: areDisplaySettingsEnabled && displaySettings!.isCondensed,
      updateCustomSettings: (settings: TAdditionalSettings) =>
        updateCustomSettings(settings),
      additionalSettings,
      selectedColumns,
      customColumnManager,
      customColumns,
      debug, // TODO - remove when nested rows are implemented
    };
  }, [
    displaySettings,
    customSettings,
    columns,
    topBar,
    onSettingsChange,
    columnManager,
    additionalSettings,
    selectedColumns,
    customColumnManager,
    customColumns,
    debug,
  ]);

  return (
    <DataTableManagerContext.Provider value={decoupledDataTableManagerContext}>
      {children}
    </DataTableManagerContext.Provider>
  );
};
