import { createContext, useContext, useMemo, useState } from 'react';
import type {
  TDataTableSettingsProps,
  TColumnManagerProps,
  TCustomSettingsProps,
} from '../types';
import type { TDataTableManagerColumnProps, TRow } from './types';

export type TDataTableManagerContext<Row extends TRow = TRow> =
  TDataTableSettingsProps & {
    columns: TDataTableManagerColumnProps<Row>[];
    isCondensed?: boolean;
    customSettingsPayload?: Record<string, unknown>;
    debug: boolean; // TODO - remove when nexted rows are implemented
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
  debug, // TODO - remove when nexted rows are implemented
}: {
  children: React.ReactNode;
  columns: TDataTableManagerColumnProps[];
  displaySettings: TDataTableSettingsProps['displaySettings'];
  topBar: string;
  onSettingsChange: () => void;
  columnManager: TColumnManagerProps;
  customSettings?: TCustomSettingsProps[];
  debug: boolean;
}) => {
  const [additionalSettings, setAdditionalSettings] = useState<{
    [key: string]: unknown;
  }>({});

  const updateCustomSettings = (additionalCustomSettings: unknown) => {
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

    const newCustomSettings = customSettings?.map((setting) => {
      const newSetting = setting;
      if (setting.key === additionalSettings.key) {
        newSetting.settingsPayload = {
          ...setting.settingsPayload,
          ...additionalSettings,
        };
      }
      return newSetting;
    });

    const customSettingsPayload = {} as Record<string, unknown>;
    newCustomSettings?.forEach(({ key, settingsPayload }) => {
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
      updateCustomSettings: (settings: Record<string, unknown>) =>
        updateCustomSettings(settings),
      additionalSettings: additionalSettings,
      debug, // TODO - remove when nexted rows are implemented
    };
  }, [
    displaySettings,
    customSettings,
    columns,
    topBar,
    onSettingsChange,
    columnManager,
    debug,
    additionalSettings,
  ]);

  return (
    <DataTableManagerContext.Provider value={decoupledDataTableManagerContext}>
      {children}
    </DataTableManagerContext.Provider>
  );
};
