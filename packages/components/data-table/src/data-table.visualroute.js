import React from 'react';
import sortBy from 'lodash/sortBy';
import { DataTable } from '@commercetools-frontend/ui-kit';
import { Suite, Spec } from '../../../../test/percy';
import IconButton from '../../buttons/icon-button';
import { InformationIcon } from '../../icons';

export const routePath = '/data-table';

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

const countryFlagRenderer = (country) => {
  if (country === 'South Korea') return 'KR';
  if (country === 'Iceland') return 'IS';
  if (country === 'USA') return 'US';
  return 'idk lol';
};

const customItemRenderer = (item, column) => {
  if (column.key === 'country') {
    return countryFlagRenderer(item.country);
  }
  return item[column.key];
};

export const component = () => (
  <Suite>
    <Spec label="default">
      <DataTable rows={testRows} columns={testColumns} />
    </Spec>
    <Spec label="default - in a narrow container">
      <div style={{ width: 300, overflow: 'scroll' }}>
        <DataTable rows={testRows} columns={testColumns} />
      </div>
    </Spec>
    <Spec label="default - in a short container">
      <div style={{ height: 150, overflow: 'scroll' }}>
        <DataTable rows={testRows} columns={testColumns} />
      </div>
    </Spec>
    <Spec label="default - in a container with a background">
      <div style={{ backgroundColor: 'gray' }}>
        <DataTable rows={testRows} columns={testColumns} />
      </div>
    </Spec>
    <Spec label="condensed mode">
      <DataTable rows={testRows} columns={testColumns} isCondensed />
    </Spec>
    <Spec label="with a max-width">
      <DataTable rows={testRows} columns={testColumns} maxWidth={300} />
    </Spec>
    <Spec label="with a max-height">
      <DataTable rows={testRows} columns={testColumns} maxHeight={150} />
    </Spec>
    <Spec label="with max-width and max-height">
      <DataTable
        rows={testRows}
        columns={testColumns}
        maxWidth={300}
        maxHeight={150}
      />
    </Spec>
    <Spec label="condensed mode with max-width">
      <DataTable
        rows={testRows}
        columns={testColumns}
        isCondensed
        maxWidth={300}
      />
    </Spec>
    <Spec label="horizontalCellAlignment - center">
      <DataTable
        rows={testRows}
        columns={testColumns}
        horizontalCellAlignment="center"
      />
    </Spec>
    <Spec label="horizontalCellAlignment - right">
      <DataTable
        rows={testRows}
        columns={testColumns}
        horizontalCellAlignment="right"
      />
    </Spec>
    <Spec label="verticalCellAlignment - center">
      <DataTable
        rows={testRows}
        columns={testColumns}
        verticalCellAlignment="center"
      />
    </Spec>
    <Spec label="verticalCellAlignment - bottom">
      <DataTable
        rows={testRows}
        columns={testColumns}
        verticalCellAlignment="bottom"
      />
    </Spec>
    <Spec label="not wrapping header labels">
      <DataTable
        rows={testRows}
        columns={testColumns}
        wrapHeaderLabels={false}
      />
    </Spec>
    <Spec label="with maxWidth and not wrapping header labels">
      <DataTable
        rows={testRows}
        columns={testColumns}
        maxWidth={300}
        wrapHeaderLabels={false}
      />
    </Spec>
    <Spec label="with header stickiness disabled">
      <DataTable
        rows={testRows}
        columns={testColumns}
        disableHeaderStickiness={true}
      />
    </Spec>
    <Spec label="with a footer">
      <DataTable
        rows={testRows}
        columns={testColumns}
        footer={<div>This is a Footer</div>}
      />
    </Spec>
    <Spec label="with a footer - condensed mode">
      <DataTable
        rows={testRows}
        columns={testColumns}
        isCondensed
        footer={<div>This is a Footer</div>}
      />
    </Spec>
    <Spec label="with custom item renderer">
      <DataTable
        rows={testRows}
        columns={testColumns}
        itemRenderer={customItemRenderer}
      />
    </Spec>
    <Spec label="with onRowClick">
      <DataTable
        rows={testRows}
        columns={testColumns}
        onRowClick={() => null}
      />
    </Spec>
    <Spec label="with sortable columns (title and year)">
      <DataTable
        rows={testRows}
        columns={[
          {
            key: 'title',
            label: 'Title',
            isSortable: true,
          },
          {
            key: 'year',
            label: 'Year',
            isSortable: true,
          },
          {
            key: 'director',
            label: 'Directed By',
          },
          {
            key: 'country',
            label: 'Country',
          },
        ]}
        onSortChange={() => null}
      />
    </Spec>
    <Spec label="with a column (title) pre-sorted in ascending order">
      <DataTable
        rows={sortBy(testRows, 'title')}
        columns={[
          {
            key: 'title',
            label: 'Title',
            isSortable: true,
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
        ]}
        sortedBy="title"
        sortDirection="asc"
        onSortChange={() => null}
      />
    </Spec>
    <Spec label="with a column (title) pre-sorted in descending order">
      <DataTable
        rows={sortBy(testRows, 'title').reverse()}
        columns={[
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
        ]}
        sortedBy="title"
        sortDirection="desc"
        onSortChange={() => null}
      />
    </Spec>
    <Spec label="with sortable columns (title and year) aligned to right">
      <DataTable
        rows={testRows}
        columns={[
          {
            key: 'title',
            label: 'Title',
            isSortable: true,
            align: 'right',
          },
          {
            key: 'year',
            label: 'Year',
            isSortable: true,
            align: 'right',
          },
          {
            key: 'director',
            label: 'Directed By',
          },
          {
            key: 'country',
            label: 'Country',
          },
        ]}
        onSortChange={() => null}
      />
    </Spec>
    <Spec label="with sortable columns (title and year) aligned center">
      <DataTable
        rows={testRows}
        columns={[
          {
            key: 'title',
            label: 'Title',
            isSortable: true,
            align: 'center',
          },
          {
            key: 'year',
            label: 'Year',
            isSortable: true,
            align: 'center',
          },
          {
            key: 'director',
            label: 'Directed By',
          },
          {
            key: 'country',
            label: 'Country',
          },
        ]}
        onSortChange={() => null}
      />
    </Spec>
    <Spec label="with a column of truncated cells">
      <DataTable
        rows={testRows}
        columns={[
          {
            key: 'title',
            label: 'Title',
            isTruncated: true,
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
        ]}
      />
    </Spec>
    <Spec label="with maxWidth and a column of truncated cells">
      <DataTable
        rows={testRows}
        maxWidth={300}
        columns={[
          {
            key: 'title',
            label: 'Title',
            isTruncated: true,
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
        ]}
      />
    </Spec>
    <Spec label="with defined per-column widths">
      <DataTable
        rows={testRows}
        columns={[
          {
            key: 'title',
            label: 'Title',
            width: '1fr',
          },
          {
            key: 'year',
            label: 'Year',
            width: '100px',
          },
          {
            key: 'director',
            label: 'Directed By',
            width: 'minmax(100px, 200px)',
          },
          {
            key: 'country',
            label: 'Country',
            width: 'minmax(auto, 100px)',
          },
        ]}
      />
    </Spec>
    <Spec label="with defined per-column alignments">
      <DataTable
        rows={testRows}
        columns={[
          {
            key: 'title',
            label: 'Title',
            align: 'left',
          },
          {
            key: 'year',
            label: 'Year',
            align: 'center',
          },
          {
            key: 'director',
            label: 'Directed By',
            align: 'right',
          },
          {
            key: 'country',
            label: 'Country',
          },
        ]}
      />
    </Spec>
    <Spec label="with maxWidth and defined per-column widths">
      <DataTable
        rows={testRows}
        maxWidth={300}
        columns={[
          {
            key: 'title',
            label: 'Title',
            width: '1fr',
          },
          {
            key: 'year',
            label: 'Year',
            width: '100px',
          },
          {
            key: 'director',
            label: 'Directed By',
            width: 'minmax(100px, 200px)',
          },
          {
            key: 'country',
            label: 'Country',
            width: 'minmax(auto, 100px)',
          },
        ]}
      />
    </Spec>
    <Spec label="with maxWidth, defined per-column widths, and truncated columns">
      <DataTable
        rows={testRows}
        maxWidth={300}
        columns={[
          {
            key: 'title',
            label: 'Title',
            width: '1fr',
            isTruncated: true,
          },
          {
            key: 'year',
            label: 'Year',
            width: '100px',
            isTruncated: true,
          },
          {
            key: 'director',
            label: 'Directed By',
            width: 'minmax(100px, 200px)',
            isTruncated: true,
          },
          {
            key: 'country',
            label: 'Country',
            width: 'minmax(auto, 100px)',
            isTruncated: true,
          },
        ]}
      />
    </Spec>
    <Spec label="with maxWidth, defined per-column widths, and truncated columns - condensed mode">
      <DataTable
        rows={testRows}
        maxWidth={300}
        isCondensed
        columns={[
          {
            key: 'title',
            label: 'Title',
            width: '1fr',
            isTruncated: true,
          },
          {
            key: 'year',
            label: 'Year',
            width: '100px',
            isTruncated: true,
          },
          {
            key: 'director',
            label: 'Directed By',
            width: 'minmax(100px, 200px)',
            isTruncated: true,
          },
          {
            key: 'country',
            label: 'Country',
            width: 'minmax(auto, 100px)',
            isTruncated: true,
          },
        ]}
      />
    </Spec>
    <Spec label="column with custom renderItem">
      <DataTable
        rows={testRows}
        columns={[
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
            renderItem: (row) => countryFlagRenderer(row.country),
          },
        ]}
      />
    </Spec>
    <Spec label="column with custom renderItem">
      <DataTable
        rows={testRows}
        columns={[
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
            headerIcon: (
              <IconButton
                icon={<InformationIcon />}
                label="Country Info"
                size="medium"
                onClick={() => null}
              />
            ),
          },
        ]}
      />
    </Spec>
  </Suite>
);
