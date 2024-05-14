import { createContext, useContext, useMemo } from 'react';
import { TDataTableManagerProps, TColumnProps, TRow } from './types';

export type TDataTableManagerContext<Row extends TRow = TRow> = Pick<
  TDataTableManagerProps<Row>,
  'displaySettings' | 'topBar' | 'onSettingsChange' | 'columnManager'
> & {
  columns: TColumnProps<Row>[];
};

const DataTableManagerContext = createContext<TDataTableManagerContext>({
  columns: [],
  displaySettings: undefined,
});

type TDataTableManagerProviderProps<Row extends TRow = TRow> =
  TDataTableManagerProps & {
    columns: TColumnProps<Row>[];
  };

export const DataTableManagerProvider = (
  props: TDataTableManagerProviderProps
) => {
  const contextValue = useMemo(
    () => ({
      columns: props.columns,
      displaySettings: props.displaySettings,
      topBar: props.topBar,
      onSettingsChange: props.onSettingsChange,
      columnManager: props.columnManager,
    }),
    [
      props.columnManager,
      props.columns,
      props.displaySettings,
      props.onSettingsChange,
      props.topBar,
    ]
  );

  return (
    <DataTableManagerContext.Provider value={contextValue}>
      {props.children}
    </DataTableManagerContext.Provider>
  );
};

export const useDataTableManagerContext = (): TDataTableManagerContext & {
  areDisplaySettingsEnabled: boolean;
  isCondesedLayout: boolean;
} => {
  const contextValue = useContext(DataTableManagerContext);
  const areDisplaySettingsEnabled = Boolean(
    contextValue.displaySettings &&
      !contextValue.displaySettings?.disableDisplaySettings
  );
  const isWrappingText =
    areDisplaySettingsEnabled && contextValue.displaySettings?.isWrappingText;

  const columns = useMemo(
    () =>
      contextValue.columns.map((column) => ({
        ...column,
        isTruncated: areDisplaySettingsEnabled
          ? isWrappingText
          : column.isTruncated,
      })),
    [areDisplaySettingsEnabled, contextValue.columns, isWrappingText]
  );
  return {
    ...contextValue,
    columns,
    areDisplaySettingsEnabled,
    isCondesedLayout:
      areDisplaySettingsEnabled &&
      (contextValue.displaySettings?.isCondensed === undefined ||
        contextValue.displaySettings?.isCondensed),
  };
};
