import {
  createContext,
  MouseEventHandler,
  ReactNode,
  useContext,
  useMemo,
} from 'react';
import { type TDataTableSettingsProps } from '../data-table-settings';

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

export type TDataTableManagerContext = {
  columns: TDataTableManagerColumns;
  isCondensed: boolean;
};

const DataTableManagerContext = createContext<TDataTableManagerContext>({
  columns: [],
  isCondensed: false,
});

export const useDataTableManagerContext = () =>
  useContext(DataTableManagerContext);

export const DataTableManagerProvider = ({
  children,
  columns,
  isCondensed,
  displaySettings,
}: {
  children: React.ReactNode;
  columns: TDataTableManagerColumns;
  isCondensed: boolean;
  displaySettings: TDataTableSettingsProps['displaySettings'];
}) => {
  const areDisplaySettingsEnabled = Boolean(
    displaySettings && !displaySettings.disableDisplaySettings
  );
  const isWrappingText =
    areDisplaySettingsEnabled && displaySettings!.isWrappingText;

  columns = useMemo(
    () =>
      columns.map((column) => ({
        ...column,
        isTruncated: areDisplaySettingsEnabled
          ? isWrappingText
          : column.isTruncated,
        isCondensed,
      })),
    [columns, areDisplaySettingsEnabled, isWrappingText, isCondensed]
  );

  return (
    <DataTableManagerContext.Provider value={{ columns, isCondensed }}>
      {children}
    </DataTableManagerContext.Provider>
  );
};
