import { useMemo, useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import DataTable from './data-table';

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
 * This example deemonstrates a hand ful of use cases:
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
        // @ts-expect-error
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
      ...columns,
    ];
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
          // @ts-expect-error
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
