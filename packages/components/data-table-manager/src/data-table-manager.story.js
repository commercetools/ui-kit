import { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, select, withKnobs } from '@storybook/addon-knobs/react';
import withReadme from 'storybook-readme/with-readme';
import times from 'lodash/times';
import DataTable from '@commercetools-uikit/data-table';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import SearchTextInput from '@commercetools-uikit/search-text-input';
import { useRowSelection, useSorting } from '@commercetools-uikit/hooks';
import PrimaryButton from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import Readme from '../README.md';
import { UPDATE_ACTIONS } from './constants';
import DataTableManager from './data-table-manager';
import { DataTableManagerProvider } from '@commercetools-uikit/data-table-manager/data-table-manager-provider';
import Spacings from '@commercetools-uikit/spacings';
import SelectInput from '@commercetools-uikit/select-input';
import Grid from '@commercetools-uikit/grid';
import { designTokens } from '@commercetools-uikit/design-system';
import RadioInput from '@commercetools-uikit/radio-input';

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

/* eslint-disable react/display-name, no-alert */
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

const initialHiddenColumns = times(15, (num) => ({
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

storiesOf('Components|DataTable', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('DataTableManager', () => {
    const [tableData, setTableData] = useState({
      columns: initialColumnsState,
      visibleColumnKeys: initialVisibleColumns.map(({ key }) => key),
    });

    const [isCondensed, setIsCondensed] = useState(true);
    const [isWrappingText, setIsWrappingText] = useState(false);
    const [phoneNumberTextColor, setPhoneNumberTextColor] = useState();
    const [radioInputValue, setRadioInputValue] = useState('show');
    const [imageSize, setImageSize] = useState();

    const {
      items: rows,
      sortedBy,
      sortDirection,
      onSortChange,
    } = useSorting(items);

    const withRowSelection = boolean('withRowSelection', true);
    const footer = text('footer', 'This is a Footer');
    const topBar = text('topBar', 'This is a Top Bar');
    const showDisplaySettingsConfirmationButtons = boolean(
      'showDisplaySettingsConfirmationButtons',
      false
    );
    const showColumnManagerConfirmationButtons = boolean(
      'showColumnManagerConfirmationButtons',
      false
    );

    const {
      rows: rowsWithSelection,
      toggleRow,
      selectAllRows,
      deselectAllRows,
      getIsRowSelected,
      getNumberOfSelectedRows,
    } = useRowSelection('checkbox', rows);

    const countSelectedRows = getNumberOfSelectedRows();
    const isSelectColumnHeaderIndeterminate =
      countSelectedRows > 0 && countSelectedRows < rowsWithSelection.length;
    const handleSelectColumnHeaderChange =
      countSelectedRows === 0 ? selectAllRows : deselectAllRows;

    const mappedColumns = tableData.columns.reduce(
      (columns, column) => ({
        ...columns,
        [column.key]: column,
      }),
      {}
    );
    const visibleColumns = tableData.visibleColumnKeys.map(
      (columnKey) => mappedColumns[columnKey]
    );

    const columnsWithSelect = [
      {
        key: 'checkbox',
        label: (
          <CheckboxInput
            isIndeterminate={isSelectColumnHeaderIndeterminate}
            isChecked={countSelectedRows !== 0}
            onChange={handleSelectColumnHeaderChange}
          />
        ),
        shouldIgnoreRowClick: true,
        align: 'center',
        renderItem: (row) => (
          <CheckboxInput
            isChecked={getIsRowSelected(row.id)}
            onChange={() => toggleRow(row.id)}
          />
        ),
        disableResizing: true,
      },
      ...visibleColumns,
    ];

    const tableSettingsChangeHandler = {
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
      displaySettingsLabel: 'Display Settings Label',
      disableDisplaySettings: boolean('disableDisplaySettings', false),
      isCondensed,
      isWrappingText,
      ...displaySettingsButtons,
    };

    const columnManager = {
      columnManagerLabel: 'Column Manager Label',
      areHiddenColumnsSearchable: boolean('areHiddenColumnsSearchable', true),
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
      disableColumnManager: boolean('disableColumnManager', false),
      visibleColumnKeys: tableData.visibleColumnKeys,
      hideableColumns: tableData.columns,
      ...columnManagerButtons,
    };

    const FirstCustomComponent = () => {
      return (
        <>
          <Grid
            gridGap={designTokens.spacing30}
            gridTemplateColumns="repeat(2, 1fr)"
          >
            <Grid.Item>
              <Spacings.Stack scale={'l'}>
                <div>Color Settings</div>
                <SelectInput
                  appearance="quiet"
                  value={phoneNumberTextColor}
                  onChange={(event) =>
                    setPhoneNumberTextColor(event.target.value)
                  }
                  options={[
                    { value: 'black', label: 'black' },
                    { value: 'red', label: 'Red' },
                    { value: 'green', label: 'Green' },
                  ]}
                />
              </Spacings.Stack>
            </Grid.Item>
            <Grid.Item>
              <Spacings.Stack scale={'l'}>
                <div>Toggle display</div>
                <RadioInput.Group
                  id="toggle-display"
                  name="toggle-display"
                  value={radioInputValue}
                  onChange={(event) => setRadioInputValue(event.target.value)}
                >
                  <RadioInput.Option value={'show'}>
                    Show texts for a given column or row
                  </RadioInput.Option>
                  <RadioInput.Option value={'hide'}>
                    Hide texts for a given column or row
                  </RadioInput.Option>
                </RadioInput.Group>
              </Spacings.Stack>
            </Grid.Item>
          </Grid>
        </>
      );
    };

    const SecondCustomComponent = () => {
      return (
        <>
          <Grid
            gridGap={designTokens.spacing30}
            gridTemplateColumns="repeat(2, 1fr)"
          >
            <Grid.Item>
              <Spacings.Stack scale={'l'}>
                <div>Choose Image size</div>
                <SelectInput
                  value={imageSize}
                  onChange={(event) => setImageSize(event.target.value)}
                  options={[
                    { value: 'large', label: 'Large' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'small', label: 'Small' },
                  ]}
                />
              </Spacings.Stack>
            </Grid.Item>
            <Grid.Item>
              <Spacings.Stack scale={'l'}>
                <div>Toggle display</div>
                <RadioInput.Group
                  id="toggle-display"
                  name="toggle-display"
                  value={radioInputValue}
                  onChange={(event) => setRadioInputValue(event.target.value)}
                >
                  <RadioInput.Option value={'show'}>
                    Show texts for a given column or row
                  </RadioInput.Option>
                  <RadioInput.Option value={'hide'}>
                    Hide texts for a given column or row
                  </RadioInput.Option>
                </RadioInput.Group>
              </Spacings.Stack>
            </Grid.Item>
          </Grid>
        </>
      );
    };

    const customSettings = [
      {
        id: 'customSettings1',
        title: 'Custom Settings 1',
        label: 'Custom Settings 1',
        value: 'customSettings1',
        customComponent: <FirstCustomComponent />,
        payload: {
          phoneNumberTextColor,
          radioInputValue,
        },
      },
      {
        id: 'customSettings2',
        title: 'Custom Settings 2',
        label: 'Custom Settings 2',
        value: 'customSettings2',
        customComponent: <SecondCustomComponent />,
        payload: {
          imageSize,
          radioInputValue,
        },
      },
    ];

    return (
      <>
        <DataTableManager
          topBar={topBar}
          columns={withRowSelection ? columnsWithSelect : visibleColumns}
          onSettingsChange={(action, nextValue) => {
            tableSettingsChangeHandler[action](nextValue);
          }}
          columnManager={columnManager}
          displaySettings={displaySettings}
          customSettings={customSettings}
          managerTheme={select(
            'managerTheme',
            {
              dark: 'dark',
              light: 'light',
            },
            'dark'
          )}
        >
          <DataTable
            rows={withRowSelection ? rowsWithSelection : rows}
            sortedBy={sortedBy}
            onSortChange={onSortChange}
            sortDirection={sortDirection}
            footer={footer}
          />
        </DataTableManager>
        <br />
        <hr />
      </>
    );
  })
  .add('DetachedDataTableManager', () => {
    const [tableData, setTableData] = useState({
      columns: initialColumnsState,
      visibleColumnKeys: initialVisibleColumns.map(({ key }) => key),
    });

    const [isCondensed, setIsCondensed] = useState(true);
    const [isWrappingText, setIsWrappingText] = useState(false);
    const [phoneNumberTextColor, setPhoneNumberTextColor] = useState();
    const [radioInputValue, setRadioInputValue] = useState('show');
    const [imageSize, setImageSize] = useState();

    const {
      items: rows,
      sortedBy,
      sortDirection,
      onSortChange,
    } = useSorting(items);

    const withRowSelection = boolean('withRowSelection', true);
    const showDisplaySettingsConfirmationButtons = boolean(
      'showDisplaySettingsConfirmationButtons',
      false
    );
    const showColumnManagerConfirmationButtons = boolean(
      'showColumnManagerConfirmationButtons',
      false
    );
    // TODO - remove when nexted rows are implemented
    const debug = boolean('logCustomSettings', false);

    const {
      rows: rowsWithSelection,
      toggleRow,
      selectAllRows,
      deselectAllRows,
      getIsRowSelected,
      getNumberOfSelectedRows,
    } = useRowSelection('checkbox', rows);

    const countSelectedRows = getNumberOfSelectedRows();
    const isSelectColumnHeaderIndeterminate =
      countSelectedRows > 0 && countSelectedRows < rowsWithSelection.length;
    const handleSelectColumnHeaderChange =
      countSelectedRows === 0 ? selectAllRows : deselectAllRows;

    const mappedColumns = tableData.columns.reduce(
      (columns, column) => ({
        ...columns,
        [column.key]: column,
      }),
      {}
    );
    const visibleColumns = tableData.visibleColumnKeys.map(
      (columnKey) => mappedColumns[columnKey]
    );

    const columnsWithSelect = [
      {
        key: 'checkbox',
        label: (
          <CheckboxInput
            isIndeterminate={isSelectColumnHeaderIndeterminate}
            isChecked={countSelectedRows !== 0}
            onChange={handleSelectColumnHeaderChange}
          />
        ),
        shouldIgnoreRowClick: true,
        align: 'center',
        renderItem: (row) => (
          <CheckboxInput
            isChecked={getIsRowSelected(row.id)}
            onChange={() => toggleRow(row.id)}
          />
        ),
        disableResizing: true,
      },
      ...visibleColumns,
    ];

    const tableSettingsChangeHandler = {
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
      displaySettingsLabel: 'Display Settings Label',
      disableDisplaySettings: boolean('disableDisplaySettings', false),
      isCondensed,
      isWrappingText,
      ...displaySettingsButtons,
    };

    const columnManager = {
      columnManagerLabel: 'Column Manager Label',
      areHiddenColumnsSearchable: boolean('areHiddenColumnsSearchable', true),
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
      disableColumnManager: boolean('disableColumnManager', false),
      visibleColumnKeys: tableData.visibleColumnKeys,
      hideableColumns: tableData.columns,
      ...columnManagerButtons,
    };

    const FirstCustomComponent = () => {
      return (
        <>
          <Grid
            gridGap={designTokens.spacing30}
            gridTemplateColumns="repeat(2, 1fr)"
          >
            <Grid.Item>
              <Spacings.Stack scale={'l'}>
                <div>Color Settings</div>
                <SelectInput
                  appearance="quiet"
                  value={phoneNumberTextColor}
                  onChange={(event) =>
                    setPhoneNumberTextColor(event.target.value)
                  }
                  options={[
                    { value: 'black', label: 'black' },
                    { value: 'red', label: 'Red' },
                    { value: 'green', label: 'Green' },
                  ]}
                />
              </Spacings.Stack>
            </Grid.Item>
            <Grid.Item>
              <Spacings.Stack scale={'l'}>
                <div>Toggle display</div>
                <RadioInput.Group
                  id="toggle-display"
                  name="toggle-display"
                  value={radioInputValue}
                  onChange={(event) => setRadioInputValue(event.target.value)}
                >
                  <RadioInput.Option value={'show'}>
                    Show texts for a given column or row
                  </RadioInput.Option>
                  <RadioInput.Option value={'hide'}>
                    Hide texts for a given column or row
                  </RadioInput.Option>
                </RadioInput.Group>
              </Spacings.Stack>
            </Grid.Item>
          </Grid>
        </>
      );
    };

    const SecondCustomComponent = () => {
      return (
        <>
          <Grid
            gridGap={designTokens.spacing30}
            gridTemplateColumns="repeat(2, 1fr)"
          >
            <Grid.Item>
              <Spacings.Stack scale={'l'}>
                <div>Choose Image size</div>
                <SelectInput
                  value={imageSize}
                  onChange={(event) => setImageSize(event.target.value)}
                  options={[
                    { value: 'large', label: 'Large' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'small', label: 'Small' },
                  ]}
                />
              </Spacings.Stack>
            </Grid.Item>
            <Grid.Item>
              <Spacings.Stack scale={'l'}>
                <div>Toggle display</div>
                <RadioInput.Group
                  id="toggle-display"
                  name="toggle-display"
                  value={radioInputValue}
                  onChange={(event) => setRadioInputValue(event.target.value)}
                >
                  <RadioInput.Option value={'show'}>
                    Show texts for a given column or row
                  </RadioInput.Option>
                  <RadioInput.Option value={'hide'}>
                    Hide texts for a given column or row
                  </RadioInput.Option>
                </RadioInput.Group>
              </Spacings.Stack>
            </Grid.Item>
          </Grid>
        </>
      );
    };

    const customSettings = [
      {
        id: 'customSettings1',
        title: 'Custom Settings 1',
        label: 'Custom Settings 1',
        value: 'customSettings1',
        customComponent: <FirstCustomComponent />,
        payload: {
          phoneNumberTextColor,
          radioInputValue,
        },
      },
      {
        id: 'customSettings2',
        title: 'Custom Settings 2',
        label: 'Custom Settings 2',
        value: 'customSettings2',
        customComponent: <SecondCustomComponent />,
        payload: {
          imageSize,
          radioInputValue,
        },
      },
    ];

    return (
      <DataTableManagerProvider
        columns={withRowSelection ? columnsWithSelect : visibleColumns}
        displaySettings={displaySettings}
        onSettingsChange={(action, nextValue) => {
          tableSettingsChangeHandler[action](nextValue);
        }}
        columnManager={columnManager}
        customSettings={customSettings}
        // TODO - remove when nexted rows are implemented
        debug={debug}
      >
        <Spacings.Stack>
          <header>
            <Spacings.Inline justifyContent="flex-end">
              <DataTableManager />
            </Spacings.Inline>
            <SearchTextInput
              placeholder={text('placeholder', 'Dummy search component')}
              isReadOnly
            />
          </header>
          <main>
            <DataTable
              rows={withRowSelection ? rowsWithSelection : rows}
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
  });
