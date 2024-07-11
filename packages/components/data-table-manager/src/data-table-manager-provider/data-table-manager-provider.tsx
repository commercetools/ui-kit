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
    customSettingsPayload?: Record<string, unknown>;
    debug: boolean; // TODO - remove when nexted rows are implemented
  };

const DataTableManagerContext = createContext<TDataTableManagerContext>({
  columns: [],
  displaySettings: undefined,
  isCondensed: true,
  debug: false, // TODO - remove when nexted rows are implemented
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
  const decoupledDataTableManagerContext = useMemo(() => {
    const areDisplaySettingsEnabled = Boolean(
      displaySettings && !displaySettings.disableDisplaySettings
    );

    const isWrappingText =
      areDisplaySettingsEnabled && displaySettings!.isWrappingText;

    const customSettingsPayload = {} as Record<string, unknown>;

    customSettings?.forEach(({ id, payload }) => {
      customSettingsPayload[id] = payload;
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
  ]);

  return (
    <DataTableManagerContext.Provider value={decoupledDataTableManagerContext}>
      {children}
    </DataTableManagerContext.Provider>
  );
};
