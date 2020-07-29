import React from 'react';
import { DataTable, DataTableManager } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';

export const routePath = '/data-table-manager';

const testRows = [
  {
    id: '1-parasite',
    title: 'Parasite',
    year: 2019,
    director: 'Bong',
    country: 'South Korea',
  },
  {
    id: '2-woman',
    title: 'Woman At War',
    year: 2018,
    director: 'Erlingsson',
    country: 'Iceland',
  },
  {
    id: '3-gems',
    title: 'Uncut Gems',
    year: 2019,
    director: 'Safdie',
    country: 'USA',
  },
];

const testColumns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'title',
    label: 'Title',
  },
  {
    key: 'year',
    label: 'Year',
  },
  {
    key: 'director',
    label: 'Directed By',
  },
  {
    key: 'country',
    label: 'Country',
  },
];

const displaySettings = {
  disableDisplaySettings: false,
  isCondensed: false,
  isWrappingText: false,
};

const visibleColumnKeys = testColumns.map((column) => column.key !== 'id');

const mappedColumns = testColumns.reduce(
  (columns, column) => ({
    ...columns,
    [column.key]: column,
  }),
  {}
);

const visibleColumns = visibleColumnKeys.map(
  (columnKey) => mappedColumns[columnKey]
);

const columnManager = {
  disableColumnManager: false,
  hideableColumns: testColumns,
  visibleColumnKeys,
};

export const component = () => (
  <Suite>
    <Spec label="default">
      <DataTableManager
        columns={visibleColumns}
        columnManager={columnManager}
        displaySettings={displaySettings}
        onSettingsChange={() => null}
      >
        <DataTable rows={testRows} />
      </DataTableManager>
    </Spec>
  </Suite>
);
