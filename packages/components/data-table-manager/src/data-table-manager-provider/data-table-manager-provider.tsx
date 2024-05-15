import { createContext, useContext, useMemo } from 'react';
import type { TDataTableSettingsProps, TColumnManagerProps } from '../types';
import { TDataTableManagerColumnProps, TRow } from './types';

export type TDataTableManagerContext<Row extends TRow = TRow> =
  TDataTableSettingsProps & {
    columns: TDataTableManagerColumnProps<Row>[];
    isCondensed?: boolean;
  };

const DataTableManagerContext = createContext<TDataTableManagerContext>({
  columns: [],
  displaySettings: undefined,
  isCondensed: true,
});

export const useDataTableManagerContext = () =>
  useContext(DataTableManagerContext);

export const DataTableManagerProvider = ({
  children,
  columns,
  displaySettings,
  topBar,
  onSettingsChange,
  columnManager,
}: {
  children: React.ReactNode;
  columns: TDataTableManagerColumnProps[];
  displaySettings: TDataTableSettingsProps['displaySettings'];
  topBar: string;
  onSettingsChange: () => void;
  columnManager: TColumnManagerProps;
}) => {
  const areDisplaySettingsEnabled = Boolean(
    displaySettings && !displaySettings.disableDisplaySettings
  );

  const isWrappingText =
    areDisplaySettingsEnabled && displaySettings!.isWrappingText;

  const decoupledDataTableManagerContext = useMemo(
    () => ({
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
      isCondensed: areDisplaySettingsEnabled && displaySettings!.isCondensed,
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

  return (
    <DataTableManagerContext.Provider value={decoupledDataTableManagerContext}>
      {children}
    </DataTableManagerContext.Provider>
  );
};
