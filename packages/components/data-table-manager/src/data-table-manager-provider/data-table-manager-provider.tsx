import { createContext, useContext, useMemo } from 'react';
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
  };

const DataTableManagerContext = createContext<TDataTableManagerContext>({
  columns: [],
  displaySettings: undefined,
  isCondensed: true,
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
}: {
  children: React.ReactNode;
  columns: TDataTableManagerColumnProps[];
  displaySettings: TDataTableSettingsProps['displaySettings'];
  topBar: string;
  onSettingsChange: () => void;
  columnManager: TColumnManagerProps;
  customSettings?: TCustomSettingsProps[];
}) => {
  const decoupledDataTableManagerContext = useMemo(() => {
    const areDisplaySettingsEnabled = Boolean(
      displaySettings && !displaySettings.disableDisplaySettings
    );

    const isWrappingText =
      areDisplaySettingsEnabled && displaySettings!.isWrappingText;

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
      isCondensed: areDisplaySettingsEnabled && displaySettings!.isCondensed,
    };
  }, [
    displaySettings,
    columns,
    topBar,
    onSettingsChange,
    columnManager,
    customSettings,
  ]);

  return (
    <DataTableManagerContext.Provider value={decoupledDataTableManagerContext}>
      {children}
    </DataTableManagerContext.Provider>
  );
};
