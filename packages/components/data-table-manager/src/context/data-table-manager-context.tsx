import { createContext, MouseEventHandler, ReactNode, useState } from 'react';

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

export const DataTableManagerContext = createContext<TDataTableManagerContext>({
  columns: [],
  updateColumns: (columns: TDataColumns) => [columns],
});

export const DataTableManagerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [columns, setColumns] = useState<TDataColumns>([]);

  const updateColumns = (columnsFromManager: TDataColumns) =>
    setColumns(columnsFromManager);

  return (
    <DataTableManagerContext.Provider value={{ columns, updateColumns }}>
      {children}
    </DataTableManagerContext.Provider>
  );
};
