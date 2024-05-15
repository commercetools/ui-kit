import { createContext, useContext, useMemo } from 'react';
import type {
  TDataTableSettingsProps,
  TColumnManagerProps,
} from '../data-table-settings';
import { TDataTableManagerColumnProps, TRow } from './types';

export type TDataTableManagerContext<Row extends TRow = TRow> =
  TDataTableSettingsProps & {
    columns: TDataTableManagerColumnProps<Row>[];
    isCondensed: boolean;
  };

const DataTableManagerContext = createContext<TDataTableManagerContext>({
  columns: [],
  displaySettings: undefined,
  isCondensed: true,
});

export const useDataTableManagerContext = () => {
  const { columns, topBar, displaySettings, onSettingsChange, columnManager } =
    useContext(DataTableManagerContext);

  const areDisplaySettingsEnabled = Boolean(
    displaySettings && !displaySettings.disableDisplaySettings
  );
  const isWrappingText =
    areDisplaySettingsEnabled && displaySettings!.isWrappingText;

  const contextValue = useMemo(
    () => ({
      columns: columns.map((column) => ({
        ...column,
        isTruncated: areDisplaySettingsEnabled
          ? isWrappingText
          : column.isTruncated,
      })),
      isCondensed: areDisplaySettingsEnabled && displaySettings!.isCondensed,
      displaySettings,
      topBar,
      onSettingsChange,
      columnManager,
    }),
    [
      columns,
      displaySettings,
      topBar,
      onSettingsChange,
      columnManager,
      areDisplaySettingsEnabled,
      isWrappingText,
    ]
  );

  return contextValue;
};

export const DataTableManagerProvider = ({
  children,
  columns,
  displaySettings,
  topBar,
  onSettingsChange,
  columnManager,
  isCondensed,
}: {
  children: React.ReactNode;
  columns: TDataTableManagerColumnProps[];
  displaySettings: TDataTableSettingsProps['displaySettings'];
  topBar: string;
  onSettingsChange: () => void;
  columnManager: TColumnManagerProps;
  isCondensed: boolean;
}) => {
  const decoupledDataTableManagerContext = useMemo(
    () => ({
      columns,
      isCondensed,
      displaySettings,
      topBar,
      onSettingsChange,
      columnManager,
    }),
    [
      columns,
      isCondensed,
      displaySettings,
      topBar,
      onSettingsChange,
      columnManager,
    ]
  );

  return (
    <DataTableManagerContext.Provider value={decoupledDataTableManagerContext}>
      {children}
    </DataTableManagerContext.Provider>
  );
};
