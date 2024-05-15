import {
  createContext,
  MouseEventHandler,
  ReactNode,
  useContext,
  useMemo,
} from 'react';
import type {
  TDataTableSettingsProps,
  TColumnManagerProps,
} from '../data-table-settings';

export type TDataTableManagerColumns = {
  isTruncated?: boolean;
  key: string;
  label: ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  onClick?: (event: MouseEventHandler) => void;
  headerIcon?: ReactNode;
  isSortable?: boolean;
  disableResizing?: boolean;
  shouldIgnoreRowClick?: boolean;
}[];

export type TDataTableManagerContext = TDataTableSettingsProps & {
  columns: TDataTableManagerColumns;
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
  columns: TDataTableManagerColumns;
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
