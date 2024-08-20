// @ts-expect-error
import type { Meta, StoryFn } from '@storybook/react';
import DataTable from './../../data-table';
import DataTableManager from './index';
import { useState } from 'react';
import times from 'lodash/times';
import PrimaryButton from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { useSorting } from '@commercetools-uikit/hooks';
import { UPDATE_ACTIONS } from './constants';
import { DataTableManagerProvider } from '@commercetools-uikit/data-table-manager/data-table-manager-provider';
import Spacings from '@commercetools-uikit/spacings';
import SearchTextInput from '@commercetools-uikit/search-text-input';

const meta: Meta<typeof DataTableManager> = {
  title: 'components/DataTable/DataTableManager',
  component: DataTableManager,
  argTypes: {
    topBar: {
      control: 'text',
    },
  },
};
export default meta;

type Story = StoryFn<typeof DataTableManager>;

const items = [
  {
    id: '5e188c29791747d9c54250e2',
    name: 'Morgan Bean',
    customRenderer: 'CYCLONICA',
    phone: '+1 (895) 529-3300',
    age: 23,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c295ae0bb19afbb115f',
    name: 'Franklin Cochran',
    customRenderer: 'TINGLES',
    phone: '+1 (835) 571-3268',
    age: 36,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c298f0ea901553c517f',
    name: 'Salazar Craig',
    customRenderer: 'ECRAZE',
    phone: '+1 (944) 445-2594',
    age: 21,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c29b09bb748df833ed0',
    name: 'Pamela Noble',
    customRenderer: 'FILODYNE',
    phone: '+1 (875) 421-3328',
    age: 34,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c29bc14e3b97ab2ad7d',
    name: 'Terra Morrow',
    customRenderer: 'DAISU',
    phone: '+1 (807) 436-2026',
    age: 30,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c296c9b7cf486a0479c',
    name: 'Cline Hansen',
    customRenderer: 'ULTRIMAX',
    phone: '+1 (934) 402-3675',
    age: 21,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c29b45c669d8e60303f',
    name: 'Jefferson Rosario',
    customRenderer: 'COMTOURS',
    phone: '+1 (874) 437-2581',
    age: 32,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c29ca865647af147b4a',
    name: 'Tania Waller',
    customRenderer: 'DOGSPA',
    phone: '+1 (964) 585-3040',
    age: 35,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c2910b83f907e9c66ab',
    name: 'Butler Shepard',
    customRenderer: 'HOUSEDOWN',
    phone: '+1 (888) 434-2153',
    age: 21,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c29a9ece9123d6a87a1',
    name: 'Diana Wise',
    customRenderer: 'SPEEDBOLT',
    phone: '+1 (992) 535-2912',
    age: 27,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
];

const FooterPrimaryButton = () => (
  <PrimaryButton
    onClick={() => alert('This primary actions has been clicked!')}
    label="Primary action"
  />
);

const FooterSecondaryButton = () => (
  <SecondaryButton
    onClick={() => alert('This secondary actions has been clicked!')}
    label="Secondary action"
  />
);

const initialHiddenColumns = times(3, (num) => ({
  key: `extra_${num + 1}`,
  label: `Extra ${num + 1}`,
  renderItem: () => `Extra content ${num + 1}`,
}));

const initialVisibleColumns = [
  {
    key: 'name',
    label: 'Name',
    isSortable: true,
  },
  {
    key: 'customRenderer',
    label: 'Custom Column',
    // @ts-expect-error
    renderItem: (row) => (
      <a href="https://uikit.commercetools.com/">{row.customRenderer}</a>
    ),
  },
  {
    key: 'phone',
    label: 'Phone',
    shouldIgnoreRowClick: true,
  },
  {
    key: 'age',
    label: 'Age',
    align: 'center',
    isSortable: true,
  },
  {
    key: 'about',
    label: 'About',
    width: 'minmax(150px, auto)',
  },
];

const initialColumnsState = [...initialVisibleColumns, ...initialHiddenColumns];

// @ts-expect-error
export const BasicExample: Story = (args) => {
  const [tableData, setTableData] = useState({
    columns: initialColumnsState,
    visibleColumnKeys: initialVisibleColumns.map(({ key }) => key),
  });

  const [isCondensed, setIsCondensed] = useState(true);
  const [isWrappingText, setIsWrappingText] = useState(false);

  const {
    items: rows,
    sortedBy,
    sortDirection,
    onSortChange,
  } = useSorting(items);

  const showDisplaySettingsConfirmationButtons = false;
  const showColumnManagerConfirmationButtons = false;

  const mappedColumns = tableData.columns.reduce(
    (columns, column) => ({
      ...columns,
      [column.key]: column,
    }),
    {}
  );
  const visibleColumns = tableData.visibleColumnKeys.map(
    // @ts-expect-error
    (columnKey) => mappedColumns[columnKey]
  );

  const tableSettingsChangeHandler = {
    // @ts-expect-error
    [UPDATE_ACTIONS.COLUMNS_UPDATE]: (visibleColumnKeys) =>
      setTableData({
        ...tableData,
        visibleColumnKeys,
      }),
    [UPDATE_ACTIONS.IS_TABLE_CONDENSED_UPDATE]: setIsCondensed,
    [UPDATE_ACTIONS.IS_TABLE_WRAPPING_TEXT_UPDATE]: setIsWrappingText,
  };

  const displaySettingsButtons = showDisplaySettingsConfirmationButtons
    ? {
        primaryButton: <FooterPrimaryButton />,
        secondaryButton: <FooterSecondaryButton />,
      }
    : {};

  const columnManagerButtons = showColumnManagerConfirmationButtons
    ? {
        primaryButton: <FooterPrimaryButton />,
        secondaryButton: <FooterSecondaryButton />,
      }
    : {};

  const displaySettings = {
    disableDisplaySettings: false,
    isCondensed,
    isWrappingText,
    ...displaySettingsButtons,
  };

  const columnManager = {
    areHiddenColumnsSearchable: true,
    // @ts-expect-error
    searchHiddenColumns: (searchTerm) => {
      setTableData({
        ...tableData,
        columns: initialColumnsState.filter(
          (column) =>
            tableData.visibleColumnKeys.includes(column.key) ||
            column.label
              .toLocaleLowerCase()
              .includes(searchTerm.toLocaleLowerCase())
        ),
      });
    },
    disableColumnManager: false,
    visibleColumnKeys: tableData.visibleColumnKeys,
    hideableColumns: tableData.columns,
    ...columnManagerButtons,
  };

  return (
    <>
      <DataTableManager
        {...args}
        columns={visibleColumns}
        onSettingsChange={(action, nextValue) => {
          // @ts-expect-error
          tableSettingsChangeHandler[action](nextValue);
        }}
        columnManager={columnManager}
        displaySettings={displaySettings}
      >
        <DataTable
          rows={rows}
          sortedBy={sortedBy}
          onSortChange={onSortChange}
          sortDirection={sortDirection}
        />
      </DataTableManager>
    </>
  );
};

BasicExample.args = {
  topBar: 'topBar can display arbitrary ReactNodes',
  managerTheme: 'light',
};

/** Use the `DataTableManagerProvider` component if you need to customize the DOM-structure */
// @ts-expect-error
export const WithCustomLayout: Story = (args) => {
  const [tableData, setTableData] = useState({
    columns: initialColumnsState,
    visibleColumnKeys: initialVisibleColumns.map(({ key }) => key),
  });

  const [isCondensed, setIsCondensed] = useState(true);
  const [isWrappingText, setIsWrappingText] = useState(false);

  const {
    items: rows,
    sortedBy,
    sortDirection,
    onSortChange,
  } = useSorting(items);

  const showDisplaySettingsConfirmationButtons = false;
  const showColumnManagerConfirmationButtons = false;

  const mappedColumns = tableData.columns.reduce(
    (columns, column) => ({
      ...columns,
      [column.key]: column,
    }),
    {}
  );
  const visibleColumns = tableData.visibleColumnKeys.map(
    // @ts-expect-error
    (columnKey) => mappedColumns[columnKey]
  );

  const tableSettingsChangeHandler = {
    // @ts-expect-error
    [UPDATE_ACTIONS.COLUMNS_UPDATE]: (visibleColumnKeys) =>
      setTableData({
        ...tableData,
        visibleColumnKeys,
      }),
    [UPDATE_ACTIONS.IS_TABLE_CONDENSED_UPDATE]: setIsCondensed,
    [UPDATE_ACTIONS.IS_TABLE_WRAPPING_TEXT_UPDATE]: setIsWrappingText,
  };

  const displaySettingsButtons = showDisplaySettingsConfirmationButtons
    ? {
        primaryButton: <FooterPrimaryButton />,
        secondaryButton: <FooterSecondaryButton />,
      }
    : {};

  const columnManagerButtons = showColumnManagerConfirmationButtons
    ? {
        primaryButton: <FooterPrimaryButton />,
        secondaryButton: <FooterSecondaryButton />,
      }
    : {};

  const displaySettings = {
    disableDisplaySettings: false,
    isCondensed,
    isWrappingText,
    ...displaySettingsButtons,
  };

  const columnManager = {
    areHiddenColumnsSearchable: true,
    // @ts-expect-error
    searchHiddenColumns: (searchTerm) => {
      setTableData({
        ...tableData,
        columns: initialColumnsState.filter(
          (column) =>
            tableData.visibleColumnKeys.includes(column.key) ||
            column.label
              .toLocaleLowerCase()
              .includes(searchTerm.toLocaleLowerCase())
        ),
      });
    },
    disableColumnManager: false,
    visibleColumnKeys: tableData.visibleColumnKeys,
    hideableColumns: tableData.columns,
    ...columnManagerButtons,
  };

  return (
    <DataTableManagerProvider
      columns={visibleColumns}
      displaySettings={displaySettings}
      // @ts-expect-error
      onSettingsChange={(action, nextValue) => {
        tableSettingsChangeHandler[action](nextValue);
      }}
      columnManager={columnManager}
    >
      <Spacings.Stack>
        <header>
          <Spacings.Inline justifyContent="flex-end">
            {/* @ts-expect-error */}
            <DataTableManager />
          </Spacings.Inline>
          {/* @ts-expect-error */}
          <SearchTextInput placeholder="'Dummy search component'" isReadOnly />
        </header>
        <main>
          <DataTable
            rows={rows}
            sortedBy={sortedBy}
            onSortChange={onSortChange}
            sortDirection={sortDirection}
          />
        </main>

        <br />
        <hr />
      </Spacings.Stack>
    </DataTableManagerProvider>
  );
};

WithCustomLayout.args = {
  topBar: 'topBar can display arbitrary ReactNodes',
  managerTheme: 'light',
};