import { createContext, MouseEventHandler, ReactNode } from 'react';

export type TDataColumns = {
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
  columns: TDataColumns;
  updateColumns: (columns: TDataColumns) => void;
};

const DataTableManagerContext = createContext<TDataTableManagerContext>({
  columns: [],
  updateColumns: (columns: TDataColumns) => [columns],
});

export default DataTableManagerContext;
