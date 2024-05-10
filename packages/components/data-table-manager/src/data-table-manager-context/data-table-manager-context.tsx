import { createContext, ReactNode, useContext, useMemo } from 'react';
import { TColumnProps, TDisplaySettingsProps, TRow } from '../types';

export type TDataTableManagerContext<Row extends TRow = TRow> = {
  /**
   * Each object requires a unique `key` which should correspond to property key of
   * the items of `rows` that you want to render under this column, and a `label`
   * which defines the name shown on the header.
   * The list of columns to be rendered.
   * Each column can be customized (see properties below).
   */
  columns: TColumnProps<Row>[];
  displaySettings?: TDisplaySettingsProps;
};

const DataTableManagerContext = createContext<TDataTableManagerContext>({
  columns: [],
  displaySettings: undefined,
});

type TDataTableManagerProvider = TDataTableManagerContext & {
  children: ReactNode;
};

export const DataTableManagerProvider = (props: TDataTableManagerProvider) => {
  const contextValue = useMemo(
    () => ({
      columns: props.columns,
      displaySettings: props.displaySettings,
    }),
    [props.columns, props.displaySettings]
  );

  return (
    <DataTableManagerContext.Provider value={contextValue}>
      {props.children}
    </DataTableManagerContext.Provider>
  );
};

export const useDataTableManagerContext = () => {
  const contextValue = useContext(DataTableManagerContext);
  const areDisplaySettingsEnabled = Boolean(
    contextValue.displaySettings &&
      !contextValue.displaySettings?.disableDisplaySettings
  );
  return {
    ...contextValue,
    areDisplaySettingsEnabled,
    isCondesedLayout:
      areDisplaySettingsEnabled && contextValue.displaySettings?.isCondensed,
  };
};
