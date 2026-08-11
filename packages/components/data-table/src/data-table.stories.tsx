import { useMemo, useState, type ReactNode } from 'react';
import type { Meta, StoryFn, StoryObj } from '@storybook/react-vite';
import sortBy from 'lodash/sortBy';
import { VisualSpec } from '@/storybook-helpers';
import DataTable, { type TColumn } from './data-table';

import CheckboxInput from '../../inputs/checkbox-input';

import IconButton from '../../buttons/icon-button';
import { InformationIcon } from '../../icons';
import Spacings from '@commercetools-uikit/spacings';

const meta: Meta<typeof DataTable> = {
  title: 'components/DataTable',
  component: DataTable,
  argTypes: {
    maxWidth: { control: 'text' },
    maxHeight: { control: 'text' },
  },
};
export default meta;

type Story = StoryFn<typeof DataTable>;

type FakeItem = {
  id: string;
  name: string;
  phone: string;
  age: number;
  about: string;
};

const items: FakeItem[] = [
  {
    id: '5e188c29791747d9c54250e2',
    name: 'Morgan Bean',
    phone: '+1 (895) 529-3300',
    age: 23,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c295ae0bb19afbb115f',
    name: 'Franklin Cochran',
    phone: '+1 (835) 571-3268',
    age: 36,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c298f0ea901553c517f',
    name: 'Salazar Craig',
    phone: '+1 (944) 445-2594',
    age: 21,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c29b09bb748df833ed0',
    name: 'Pamela Noble',
    phone: '+1 (875) 421-3328',
    age: 34,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c29bc14e3b97ab2ad7d',
    name: 'Terra Morrow',
    phone: '+1 (807) 436-2026',
    age: 30,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c296c9b7cf486a0479c',
    name: 'Cline Hansen',
    phone: '+1 (934) 402-3675',
    age: 21,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c29b45c669d8e60303f',
    name: 'Jefferson Rosario',
    phone: '+1 (874) 437-2581',
    age: 32,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c29ca865647af147b4a',
    name: 'Tania Waller',
    phone: '+1 (964) 585-3040',
    age: 35,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c2910b83f907e9c66ab',
    name: 'Butler Shepard',
    phone: '+1 (888) 434-2153',
    age: 21,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c29a9ece9123d6a87a1',
    name: 'Diana Wise',
    phone: '+1 (992) 535-2912',
    age: 27,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
];

type SortState = {
  key: string;
  dir: 'asc' | 'desc';
};

type ColumnSize = {
  key: string;
  width: number;
};

/**
 * This example demonstrates a couple of use cases:
 * - reacting to row clicks (and ignoring them if necessary)
 * - allowing and disabling sorting
 * - fixed width columns (name) & resizable columns (all others)
 * - custom cell-renderer (linked, callable phone numbers)
 * - custom footer
 */
export const BasicExample: Story = (args) => {
  const { columns } = args;
  const [sort, setSort] = useState<SortState>({
    key: 'name',
    dir: 'asc',
  });

  const [columnSizes, setColumnSizes] = useState<ColumnSize[]>([]);
  const [checkedRowsState, setCheckedRowsState] = useState<
    Record<string, boolean>
  >({});

  const rows = useMemo(() => {
    if (!sort) {
      return items;
    }

    const { key, dir } = sort;

    return items.slice().sort((a, b) => {
      // @ts-expect-error
      if (a[key] < b[key]) {
        return dir === 'asc' ? -1 : 1;
      }

      // @ts-expect-error
      if (a[key] > b[key]) {
        return dir === 'asc' ? 1 : -1;
      }

      return 0;
    });
  }, [sort]);

  const tableColumns = useMemo(() => {
    return [
      {
        key: 'checkbox',
        label: '',
        // @todo figure out why the following line does not work anymore
        // label: <CheckboxInput onChange={() => {}} />,
        shouldIgnoreRowClick: true,
        align: 'center',
        renderItem: (row) => (
          <CheckboxInput
            isChecked={checkedRowsState[row.id]}
            onChange={() => {
              setCheckedRowsState((obj) => ({
                ...obj,
                [row.id]: !obj[row.id],
              }));
            }}
          />
        ),
        disableResizing: true,
      },
      ...(columns || []),
    ] as TColumn[];
  }, [columns, checkedRowsState]);

  const onSortRequest = (key: SortState['key'], dir: SortState['dir']) => {
    setSort({ key, dir });
  };

  return (
    <>
      <Spacings.Stack>
        <DataTable
          {...args}
          rows={rows}
          columns={tableColumns}
          sortedBy={sort.key}
          sortDirection={sort.dir}
          onSortChange={onSortRequest}
          // @ts-ignore
          onColumnResized={(sizes) => setColumnSizes([...sizes])}
        />

        {Object.keys(checkedRowsState).length > 0 && (
          <div>
            <hr />
            Beautiful! You checked some rows! Remember you have to keep track of
            state yourself, here is a very basic state representation:
            <pre>{JSON.stringify(checkedRowsState, null, 2)}</pre>
          </div>
        )}

        {columnSizes.length > 0 && (
          <div>
            <hr />
            Nice! You resized at least one column. You can use the{' '}
            <pre style={{ display: 'inline-block' }}>onColumnResized</pre>{' '}
            callback to react to column width changes (e.g store them in
            localStorage and apply them to your columns on next visit).:
            <pre>{JSON.stringify(columnSizes, null, 2)}</pre>
          </div>
        )}
      </Spacings.Stack>
    </>
  );
};

BasicExample.args = {
  onRowClick: (row) =>
    alert('Congratulation! You clicked row with ID: ' + row.id),
  columns: [
    {
      key: 'name',
      label: 'Name',
      isSortable: true,
      width: '192px',
      disableResizing: true,
    },
    {
      key: 'phone',
      label: 'Phone',
      isSortable: true,
      // @ts-ignore
      renderItem: ({ phone }) => {
        return <a href={`tel: ${phone}`}>{phone}</a>;
      },
      headerIcon: (
        <IconButton
          icon={<InformationIcon />}
          label="Custom Column Information"
          size="small"
          onClick={() =>
            alert(
              'Check how the `headerIcon` property was used to display this info button and how the `renderItem` transforms the phone-number string into a click- & callable phone-number.'
            )
          }
        />
      ),
      shouldIgnoreRowClick: true,
    },
    {
      key: 'age',
      label: 'Age',
      isSortable: true,
      align: 'center',
    },
    {
      key: 'about',
      label: 'About',
      isSortable: false,
      isTruncated: true,
    },
  ],
  footer: <div>Display any React component as footer.</div>,
};

type FakeMovie = {
  id: string;
  title: string;
  year: number;
  director: string;
  country: string;
};

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

const countryFlagRenderer = (country: string) => {
  if (country === 'South Korea') return 'KR';
  if (country === 'Iceland') return 'IS';
  if (country === 'USA') return 'US';
  return 'idk lol';
};

const customItemRenderer = (
  item: FakeMovie,
  column: TColumn<FakeMovie>
): ReactNode => {
  if (column.key === 'country') {
    return countryFlagRenderer(item.country);
  }
  return item[column.key as keyof FakeMovie];
};

export const AllVariants: StoryObj = {
  tags: ['vrt', '!autodocs'],
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <>
      <VisualSpec label="default">
        <DataTable rows={testRows} columns={testColumns} />
      </VisualSpec>
      <VisualSpec label="default - in a narrow container">
        <div style={{ width: 300, overflow: 'scroll' }}>
          <DataTable rows={testRows} columns={testColumns} />
        </div>
      </VisualSpec>
      <VisualSpec label="default - in a short container">
        <div style={{ height: 150, overflow: 'scroll' }}>
          <DataTable rows={testRows} columns={testColumns} />
        </div>
      </VisualSpec>
      <VisualSpec label="default - in a container with a background">
        <div style={{ backgroundColor: 'gray' }}>
          <DataTable rows={testRows} columns={testColumns} />
        </div>
      </VisualSpec>
      <VisualSpec label="Non condensed mode">
        <DataTable rows={testRows} columns={testColumns} isCondensed={false} />
      </VisualSpec>
      <VisualSpec label="with a numeric max-width">
        <DataTable rows={testRows} columns={testColumns} maxWidth={300} />
      </VisualSpec>
      <VisualSpec label="with a numeric max-height">
        <DataTable rows={testRows} columns={testColumns} maxHeight={150} />
      </VisualSpec>
      <VisualSpec label="with a css string max-width">
        <DataTable
          rows={testRows}
          columns={testColumns}
          maxWidth="calc(200px + 10%)"
        />
      </VisualSpec>
      <VisualSpec label="with a css string max-height">
        <DataTable
          rows={testRows}
          columns={testColumns}
          maxHeight="calc(70px + 10%)"
        />
      </VisualSpec>
      <VisualSpec label="with max-width and max-height">
        <DataTable
          rows={testRows}
          columns={testColumns}
          maxWidth={300}
          maxHeight={150}
        />
      </VisualSpec>
      <VisualSpec label="Non condensed mode with max-width">
        <DataTable
          rows={testRows}
          columns={testColumns}
          isCondensed={false}
          maxWidth={300}
        />
      </VisualSpec>
      <VisualSpec label="horizontalCellAlignment - center">
        <DataTable
          rows={testRows}
          columns={testColumns}
          horizontalCellAlignment="center"
        />
      </VisualSpec>
      <VisualSpec label="horizontalCellAlignment - right">
        <DataTable
          rows={testRows}
          columns={testColumns}
          horizontalCellAlignment="right"
        />
      </VisualSpec>
      <VisualSpec label="verticalCellAlignment - center">
        <DataTable
          rows={testRows}
          columns={testColumns}
          verticalCellAlignment="center"
        />
      </VisualSpec>
      <VisualSpec label="verticalCellAlignment - bottom">
        <DataTable
          rows={testRows}
          columns={testColumns}
          verticalCellAlignment="bottom"
        />
      </VisualSpec>
      <VisualSpec label="not wrapping header labels">
        <DataTable
          rows={testRows}
          columns={testColumns}
          wrapHeaderLabels={false}
        />
      </VisualSpec>
      <VisualSpec label="with maxWidth and not wrapping header labels">
        <DataTable
          rows={testRows}
          columns={testColumns}
          maxWidth={300}
          wrapHeaderLabels={false}
        />
      </VisualSpec>
      <VisualSpec label="with header stickiness disabled">
        <DataTable
          rows={testRows}
          columns={testColumns}
          disableHeaderStickiness={true}
        />
      </VisualSpec>
      <VisualSpec label="with a footer">
        <DataTable
          rows={testRows}
          columns={testColumns}
          footer={<div>This is a Footer</div>}
        />
      </VisualSpec>
      <VisualSpec label="with a footer - non condensed mode">
        <DataTable
          rows={testRows}
          columns={testColumns}
          isCondensed={false}
          footer={<div>This is a Footer</div>}
        />
      </VisualSpec>
      <VisualSpec label="with custom item renderer">
        <DataTable
          rows={testRows}
          columns={testColumns}
          itemRenderer={customItemRenderer}
        />
      </VisualSpec>
      <VisualSpec label="with onRowClick">
        <DataTable
          rows={testRows}
          columns={testColumns}
          onRowClick={() => null}
        />
      </VisualSpec>
      <VisualSpec label="with sortable columns (title and year)">
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
      </VisualSpec>
      <VisualSpec label="with a column (title) pre-sorted in ascending order">
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
      </VisualSpec>
      <VisualSpec label="with a column (title) pre-sorted in descending order">
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
      </VisualSpec>
      <VisualSpec label="with sortable columns (title and year) aligned to right">
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
      </VisualSpec>
      <VisualSpec label="with sortable columns (title and year) aligned center">
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
      </VisualSpec>
      <VisualSpec label="with a column of truncated cells">
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
      </VisualSpec>
      <VisualSpec label="with maxWidth and a column of truncated cells">
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
      </VisualSpec>
      <VisualSpec label="with defined per-column widths">
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
      </VisualSpec>
      <VisualSpec label="with defined per-column alignments">
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
      </VisualSpec>
      <VisualSpec label="with maxWidth and defined per-column widths">
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
      </VisualSpec>
      <VisualSpec label="with maxWidth, defined per-column widths, and truncated columns">
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
      </VisualSpec>
      <VisualSpec label="with maxWidth, defined per-column widths, and truncated columns - non condensed mode">
        <DataTable
          rows={testRows}
          maxWidth={300}
          isCondensed={false}
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
      </VisualSpec>
      <VisualSpec label="column with custom renderItem">
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
      </VisualSpec>
      <VisualSpec label="column with headerIcon">
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
                  size="small"
                  onClick={() => null}
                />
              ),
            },
          ]}
        />
      </VisualSpec>
      <VisualSpec label="with disabledSelfContainment">
        <DataTable
          rows={testRows}
          columns={testColumns}
          maxWidth={300}
          maxHeight={300}
          disableSelfContainment={true}
        />
      </VisualSpec>
      <VisualSpec label="column with headerIcon and no label">
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
              label: '',
              headerIcon: (
                <IconButton
                  icon={<InformationIcon />}
                  label="Country Info"
                  size="small"
                  onClick={() => null}
                />
              ),
            },
          ]}
        />
      </VisualSpec>
    </>
  ),
};
