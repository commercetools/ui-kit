import { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Value } from 'react-value';
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
import { ColumnSettingsManager } from '@commercetools-uikit/data-table-manager/column-settings-manager';
import Spacings from '@commercetools-uikit/spacings';
import SelectInput from '@commercetools-uikit/select-input';
import Grid from '@commercetools-uikit/grid';
import { designTokens } from '@commercetools-uikit/design-system';
import ToggleInput from '@commercetools-uikit/toggle-input';
import Text from '@commercetools-uikit/text';
import Constraints from '@commercetools-uikit/constraints';
import PropTypes from 'prop-types';

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

    const [customTableData, setCustomTableData] = useState({
      columns: initialColumnsState,
      visibleColumnKeys: initialVisibleColumns.map(({ key }) => key),
    });

    const customColumnManager = {
      columnManagerLabel: 'Custom Column Manager',
      areHiddenColumnsSearchable: boolean('areHiddenColumnsSearchable', true),
      searchHiddenColumns: (searchTerm) => {
        setCustomTableData({
          ...customTableData,
          columns: initialColumnsState.filter(
            (column) =>
              customTableData.visibleColumnKeys.includes(column.key) ||
              column.label
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
          ),
        });
      },
      disableColumnManager: boolean('disableColumnManager', false),
      visibleColumnKeys: customTableData.visibleColumnKeys,
      hideableColumns: customTableData.columns,
    };

    const mappedCustomColumns = customColumnManager.hideableColumns.reduce(
      (columns, column) => ({
        ...columns,
        [column.key]: column,
      }),
      {}
    );

    const [isCondensed, setIsCondensed] = useState(true);
    const [isWrappingText, setIsWrappingText] = useState(false);
    const [rowClick, setRowClick] = useState(true);
    const [rowSelection, setRowSelection] = useState(true);
    const [textColor, setTextColor] = useState('black');
    const [disableResize, setDisableResize] = useState(true);

    const updateRowSelection = (newState) => {
      setRowSelection(newState);
    };
    const updateRowClick = (newState) => {
      setRowClick(newState);
    };
    const updateTextColor = (newState) => {
      setTextColor(newState);
    };
    const updateColumnResize = (newState) => {
      setDisableResize(newState);
    };

    const {
      items: rows,
      sortedBy,
      sortDirection,
      onSortChange,
    } = useSorting(items);

    const withRowSelection = boolean('withRowSelection', false) || rowSelection;
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

    const visibleColumns = [
      {
        key: 'name',
        label: 'Name',
        isSortable: true,
        disableResizing: disableResize,
        renderItem: (row) => <div style={{ color: textColor }}>{row.name}</div>,
      },
      ...tableData.visibleColumnKeys.map(
        (columnKey) => mappedColumns[columnKey]
      ),
    ];

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

    const getSelectedColumns = (mappedColumns, visibleColumnsKeys) =>
      visibleColumnsKeys.map((columnKey) => mappedColumns[columnKey]);

    const selectedColumns = getSelectedColumns(
      mappedCustomColumns,
      customColumnManager.visibleColumnKeys
    );

    const FirstCustomComponent = (props) => {
      return (
        <Spacings.Stack scale="xl">
          <Text.Detail tone="tertiary">
            This is a demonstration of a blank canvas that can be populated with
            any kind of custom settings.
          </Text.Detail>
          <Grid
            gridGap={designTokens.spacing30}
            gridTemplateColumns="repeat(2, 1fr)"
          >
            <Grid.Item>
              <Spacings.Stack scale={'l'}>
                <Text.Subheadline as="h4">Column settings</Text.Subheadline>
                <Value
                  defaultValue={
                    props.additionalSettings.isColumnResizable || false
                  }
                  render={(value, onChange) => {
                    return (
                      <Spacings.Inline>
                        <ToggleInput
                          defaultValue={
                            props.additionalSettings.isColumnResizable || false
                          }
                          isChecked={
                            props.additionalSettings.isColumnResizable || value
                          }
                          onChange={(event) => {
                            props.updateCustomSettings({
                              key: props.additionalSettings.key,
                              isColumnResizable: event.target.checked,
                            });
                            props.additionalSettings.updateColumnResize(
                              !event.target.checked
                            );
                            onChange(event.target.checked);
                          }}
                          size="small"
                        />
                        <Spacings.Inset scale="xs">
                          <Text.Detail>Resizable column (Name)</Text.Detail>
                        </Spacings.Inset>
                      </Spacings.Inline>
                    );
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Spacings.Inset scale="xs">
                    <Text.Detail>First column color:</Text.Detail>
                  </Spacings.Inset>
                  <Value
                    defaultValue={props.additionalSettings.textColor || 'black'}
                    render={(value, onChange) => {
                      return (
                        <Constraints.Horizontal
                          max={3}
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <SelectInput
                            value={props.additionalSettings.textColor || value}
                            onChange={(event) => {
                              props.updateCustomSettings({
                                key: props.additionalSettings.key,
                                textColor: event.target.value,
                              });
                              props.additionalSettings.updateTextColor(
                                event.target.value
                              );
                              onChange(event.target.value);
                            }}
                            options={[
                              { value: 'black', label: 'black' },
                              { value: 'red', label: 'Red' },
                              { value: 'green', label: 'Green' },
                            ]}
                          />
                        </Constraints.Horizontal>
                      );
                    }}
                  />
                </div>
              </Spacings.Stack>
            </Grid.Item>
            <Grid.Item>
              <Spacings.Stack scale={'l'}>
                <Text.Subheadline as="h4">Row settings</Text.Subheadline>
                <Value
                  defaultValue={props.additionalSettings.displayText || 'show'}
                  render={(value, onChange) => {
                    return (
                      <Spacings.Inline>
                        <ToggleInput
                          defaultValue={
                            props.additionalSettings.displayText || true
                          }
                          isChecked={
                            props.additionalSettings.displayText || value
                          }
                          onChange={(event) => {
                            props.updateCustomSettings({
                              key: props.additionalSettings.key,
                              displayText: event.target.checked,
                            });
                            props.additionalSettings.updateRowSelection(
                              event.target.checked
                            );
                            onChange(event.target.checked);
                          }}
                          size="small"
                        />
                        <Spacings.Inset scale="xs">
                          <Text.Detail>Row selection</Text.Detail>
                        </Spacings.Inset>
                      </Spacings.Inline>
                    );
                  }}
                />
                <Value
                  defaultValue={props.additionalSettings.displayText || 'show'}
                  render={(value, onChange) => {
                    return (
                      <Spacings.Inline>
                        <ToggleInput
                          defaultValue={
                            props.additionalSettings.rowClick || true
                          }
                          isChecked={props.additionalSettings.rowClick || value}
                          onChange={(event) => {
                            props.updateCustomSettings({
                              key: props.additionalSettings.key,
                              rowClick: event.target.checked,
                            });
                            props.additionalSettings.updateRowClick(
                              event.target.checked
                            );
                            onChange(event.target.checked);
                          }}
                          size="small"
                        />
                        <Spacings.Inset scale="xs">
                          <Text.Detail>Row click</Text.Detail>
                        </Spacings.Inset>
                      </Spacings.Inline>
                    );
                  }}
                />
              </Spacings.Stack>
            </Grid.Item>
          </Grid>
        </Spacings.Stack>
      );
    };
    FirstCustomComponent.propTypes = {
      additionalSettings: PropTypes.shape({
        updateColumnResize: PropTypes.func,
        isColumnResizable: PropTypes.bool,
        updateTextColor: PropTypes.func,
        textColor: PropTypes.string,
        updateRowClick: PropTypes.func,
        updateRowSelection: PropTypes.func,
        rowClick: PropTypes.bool,
        phoneNumberTextColor: PropTypes.string,
        displayText: PropTypes.string,
        key: PropTypes.string.isRequired,
        imageSize: PropTypes.string,
      }).isRequired,
      updateCustomSettings: PropTypes.func,
    };

    const ThirdCustomComponent = (props) => {
      return (
        <ColumnSettingsManager
          {...(props.availableColumns || {})}
          title={props.additionalSettings.customPanelTitle}
          availableColumns={props.availableColumns.hideableColumns ?? []}
          selectedColumns={props.selectedColumns}
          onClose={props.onClose}
          onUpdateColumns={(nextVisibleColumns, key) => {
            props.onUpdateColumns(
              nextVisibleColumns,
              props.additionalSettings.key
            );
          }}
          managerTheme={props.managerTheme}
        />
      );
    };

    ThirdCustomComponent.propTypes = {
      selectedColumns: PropTypes.array,
      availableColumns: PropTypes.shape({
        columnManagerLabel: PropTypes.string,
        areHiddenColumnsSearchable: PropTypes.bool,
        searchHiddenColumns: PropTypes.func,
        disableColumnManager: PropTypes.bool,
        visibleColumnKeys: PropTypes.array,
        hideableColumns: PropTypes.array,
      }),
      customColumns: PropTypes.array,
      onUpdateColumns: PropTypes.func,
      onClose: PropTypes.func,
      managerTheme: PropTypes.string,
      updateCustomSettings: PropTypes.func,
      additionalSettings: PropTypes.shape({
        customPanelTitle: PropTypes.string,
        key: PropTypes.string.isRequired,
      }).isRequired,
    };

    const initialCustomSettings = {
      customSettings: {
        key: 'customSettings',
        customPanelTitle: 'Custom Settings (blank)',
        customComponent: FirstCustomComponent,
        updateRowSelection,
        updateRowClick,
        updateTextColor,
        updateColumnResize,
      },
      customColumnsSettings: {
        key: 'customColumnsSettings',
        customPanelTitle: 'Custom settings (columns)',
        type: 'columnManager',
        customComponent: ThirdCustomComponent,
        visibleColumnKeys: ['name', 'customRenderer', 'phone', 'age'],
      },
    };

    const [customSettings, setCustomSettings] = useState(initialCustomSettings);

    const tableSettingsChangeHandler = {
      [UPDATE_ACTIONS.COLUMNS_UPDATE]: (visibleColumnKeys) =>
        setTableData({
          ...tableData,
          visibleColumnKeys,
        }),
      [UPDATE_ACTIONS.CUSTOM_COLUMNS_UPDATE]: (visibleColumnKeys, key) => {
        setCustomTableData({
          ...customTableData,
          visibleColumnKeys,
        });
        setCustomSettings({
          ...customSettings,
          [key]: {
            ...customSettings[key],
            visibleColumnKeys,
          },
        });
      },
      [UPDATE_ACTIONS.CUSTOM_SETTINGS_UPDATE]: (additionalSettings) =>
        setCustomSettings({
          ...customSettings,
          [additionalSettings.key]: {
            ...customSettings[additionalSettings.key],
            ...additionalSettings,
          },
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
      displaySettingsLabel: 'Display Settings',
      disableDisplaySettings: boolean('disableDisplaySettings', false),
      isCondensed,
      isWrappingText,
      ...displaySettingsButtons,
    };

    const columnManager = {
      columnManagerLabel: 'Column Manager',
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

    return (
      <>
        <DataTableManager
          topBar={topBar}
          columns={withRowSelection ? columnsWithSelect : visibleColumns}
          onSettingsChange={(action, nextValue, key) => {
            tableSettingsChangeHandler[action](nextValue, key);
          }}
          columnManager={columnManager}
          displaySettings={displaySettings}
          customSettings={customSettings}
          selectedColumns={selectedColumns}
          customColumnManager={customColumnManager}
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
            onRowClick={
              rowClick
                ? (item, index) => alert(`Row click: Row number ${index}`)
                : null
            }
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

    const [customTableData, setCustomTableData] = useState({
      columns: initialColumnsState,
      visibleColumnKeys: initialVisibleColumns.map(({ key }) => key),
    });

    const customColumnManager = {
      columnManagerLabel: 'Custom Column Manager',
      areHiddenColumnsSearchable: boolean('areHiddenColumnsSearchable', true),
      searchHiddenColumns: (searchTerm) => {
        setCustomTableData({
          ...customTableData,
          columns: initialColumnsState.filter(
            (column) =>
              customTableData.visibleColumnKeys.includes(column.key) ||
              column.label
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
          ),
        });
      },
      disableColumnManager: boolean('disableColumnManager', false),
      visibleColumnKeys: customTableData.visibleColumnKeys,
      hideableColumns: customTableData.columns,
    };

    const mappedCustomColumns = customColumnManager.hideableColumns.reduce(
      (columns, column) => ({
        ...columns,
        [column.key]: column,
      }),
      {}
    );

    const [isCondensed, setIsCondensed] = useState(true);
    const [isWrappingText, setIsWrappingText] = useState(false);
    const [rowClick, setRowClick] = useState(true);
    const [rowSelection, setRowSelection] = useState(true);
    const [textColor, setTextColor] = useState('black');
    const [disableResize, setDisableResize] = useState(false);

    const updateRowSelection = (newState) => {
      setRowSelection(newState);
    };
    const updateRowClick = (newState) => {
      setRowClick(newState);
    };
    const updateTextColor = (newState) => {
      setTextColor(newState);
    };

    const updateColumnResize = (newState) => {
      setDisableResize(newState);
    };

    const {
      items: rows,
      sortedBy,
      sortDirection,
      onSortChange,
    } = useSorting(items);

    const withRowSelection = boolean('withRowSelection', false) || rowSelection;
    const showDisplaySettingsConfirmationButtons = boolean(
      'showDisplaySettingsConfirmationButtons',
      false
    );
    const showColumnManagerConfirmationButtons = boolean(
      'showColumnManagerConfirmationButtons',
      false
    );
    // TODO - remove when nested rows are implemented
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
    const visibleColumns = [
      {
        key: 'name',
        label: 'Name',
        isSortable: true,
        disableResizing: disableResize,
        renderItem: (row) => <div style={{ color: textColor }}>{row.name}</div>,
      },
      ...tableData.visibleColumnKeys.map(
        (columnKey) => mappedColumns[columnKey]
      ),
    ];

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

    const getSelectedColumns = (mappedColumns, visibleColumnsKeys) =>
      visibleColumnsKeys.map((columnKey) => mappedColumns[columnKey]);

    const selectedColumns = getSelectedColumns(
      mappedCustomColumns,
      customColumnManager.visibleColumnKeys
    );

    const visibleCustomColumns = customTableData.visibleColumnKeys.map(
      (columnKey) => mappedColumns[columnKey]
    );

    const FirstCustomComponent = (props) => {
      return (
        <Spacings.Stack scale="xl">
          <Text.Detail tone="tertiary">
            This is a demonstration of a blank canvas that can be populated with
            any kind of custom settings.
          </Text.Detail>
          <Grid
            gridGap={designTokens.spacing30}
            gridTemplateColumns="repeat(2, 1fr)"
          >
            <Grid.Item>
              <Spacings.Stack scale={'l'}>
                <Text.Subheadline as="h4">Column settings</Text.Subheadline>
                <Value
                  defaultValue={
                    props.additionalSettings.isColumnResizable || false
                  }
                  render={(value, onChange) => {
                    return (
                      <Spacings.Inline>
                        <ToggleInput
                          defaultValue={
                            props.additionalSettings.isColumnResizable || false
                          }
                          isChecked={
                            props.additionalSettings.isColumnResizable || value
                          }
                          onChange={(event) => {
                            props.updateCustomSettings({
                              key: props.additionalSettings.key,
                              isColumnResizable: event.target.checked,
                            });
                            props.additionalSettings.updateColumnResize(
                              !event.target.checked
                            );
                            onChange(event.target.checked);
                          }}
                          size="small"
                        />
                        <Spacings.Inset scale="xs">
                          <Text.Detail>Resizable column (Name)</Text.Detail>
                        </Spacings.Inset>
                      </Spacings.Inline>
                    );
                  }}
                />
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Spacings.Inset scale="xs">
                    <Text.Detail>First column color:</Text.Detail>
                  </Spacings.Inset>
                  <Value
                    defaultValue={props.additionalSettings.textColor || 'black'}
                    render={(value, onChange) => {
                      return (
                        <Constraints.Horizontal
                          max={3}
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <SelectInput
                            value={props.additionalSettings.textColor || value}
                            onChange={(event) => {
                              props.updateCustomSettings({
                                key: props.additionalSettings.key,
                                textColor: event.target.value,
                              });
                              props.additionalSettings.updateTextColor(
                                event.target.value
                              );
                              onChange(event.target.value);
                            }}
                            options={[
                              { value: 'black', label: 'black' },
                              { value: 'red', label: 'Red' },
                              { value: 'green', label: 'Green' },
                            ]}
                          />
                        </Constraints.Horizontal>
                      );
                    }}
                  />
                </div>
              </Spacings.Stack>
            </Grid.Item>
            <Grid.Item>
              <Spacings.Stack scale={'l'}>
                <Text.Subheadline as="h4">Row settings</Text.Subheadline>
                <Value
                  defaultValue={props.additionalSettings.displayText || 'show'}
                  render={(value, onChange) => {
                    return (
                      <Spacings.Inline>
                        <ToggleInput
                          defaultValue={
                            props.additionalSettings.displayText || true
                          }
                          isChecked={
                            props.additionalSettings.displayText || value
                          }
                          onChange={(event) => {
                            props.updateCustomSettings({
                              key: props.additionalSettings.key,
                              displayText: event.target.checked,
                            });
                            props.additionalSettings.updateRowSelection(
                              event.target.checked
                            );
                            onChange(event.target.checked);
                          }}
                          size="small"
                        />
                        <Spacings.Inset scale="xs">
                          <Text.Detail>Row selection</Text.Detail>
                        </Spacings.Inset>
                      </Spacings.Inline>
                    );
                  }}
                />
                <Value
                  defaultValue={props.additionalSettings.displayText || 'show'}
                  render={(value, onChange) => {
                    return (
                      <Spacings.Inline>
                        <ToggleInput
                          defaultValue={
                            props.additionalSettings.rowClick || true
                          }
                          isChecked={props.additionalSettings.rowClick || value}
                          onChange={(event) => {
                            props.updateCustomSettings({
                              key: props.additionalSettings.key,
                              rowClick: event.target.checked,
                            });
                            props.additionalSettings.updateRowClick(
                              event.target.checked
                            );
                            onChange(event.target.checked);
                          }}
                          size="small"
                        />
                        <Spacings.Inset scale="xs">
                          <Text.Detail>Row click</Text.Detail>
                        </Spacings.Inset>
                      </Spacings.Inline>
                    );
                  }}
                />
              </Spacings.Stack>
            </Grid.Item>
          </Grid>
        </Spacings.Stack>
      );
    };
    FirstCustomComponent.propTypes = {
      additionalSettings: PropTypes.shape({
        updateColumnResize: PropTypes.func,
        isColumnResizable: PropTypes.bool,
        updateTextColor: PropTypes.func,
        textColor: PropTypes.string,
        updateRowClick: PropTypes.func,
        updateRowSelection: PropTypes.func,
        rowClick: PropTypes.bool,
        phoneNumberTextColor: PropTypes.string,
        displayText: PropTypes.string,
        key: PropTypes.string.isRequired,
        imageSize: PropTypes.string,
      }).isRequired,
      updateCustomSettings: PropTypes.func,
    };

    const ThirdCustomComponent = (props) => {
      return (
        <ColumnSettingsManager
          {...(props.availableColumns || {})}
          title="Custom culumn manager"
          availableColumns={props.availableColumns.hideableColumns ?? []}
          selectedColumns={props.selectedColumns}
          onClose={props.onClose}
          onUpdateColumns={(nextVisibleColumns, key) => {
            props.onUpdateColumns(
              nextVisibleColumns,
              props.additionalSettings.key
            );
          }}
          managerTheme={props.managerTheme}
        />
      );
    };

    ThirdCustomComponent.propTypes = {
      selectedColumns: PropTypes.array,
      availableColumns: PropTypes.shape({
        columnManagerLabel: PropTypes.string,
        areHiddenColumnsSearchable: PropTypes.bool,
        searchHiddenColumns: PropTypes.func,
        disableColumnManager: PropTypes.bool,
        visibleColumnKeys: PropTypes.array,
        hideableColumns: PropTypes.array,
      }),
      customColumns: PropTypes.array,
      onUpdateColumns: PropTypes.func,
      onClose: PropTypes.func,
      managerTheme: PropTypes.string,
      updateCustomSettings: PropTypes.func,
      additionalSettings: PropTypes.shape({
        key: PropTypes.string.isRequired,
      }).isRequired,
    };

    const initialCustomSettings = {
      customSettings: {
        key: 'customSettings',
        customPanelTitle: 'Custom Settings (blank)',
        customComponent: FirstCustomComponent,
        updateRowSelection,
        updateRowClick,
        updateTextColor,
        updateColumnResize,
      },
      customColumnsSettings: {
        key: 'customColumnsSettings',
        customPanelTitle: 'Custom settings (columns)',
        type: 'columnManager',
        customComponent: ThirdCustomComponent,
        visibleColumnKeys: ['name', 'customRenderer', 'phone', 'age'],
      },
    };

    const [customSettings, setCustomSettings] = useState(initialCustomSettings);

    const tableSettingsChangeHandler = {
      [UPDATE_ACTIONS.COLUMNS_UPDATE]: (visibleColumnKeys) =>
        setTableData({
          ...tableData,
          visibleColumnKeys,
        }),
      [UPDATE_ACTIONS.CUSTOM_COLUMNS_UPDATE]: (visibleColumnKeys, key) => {
        setCustomTableData({
          ...customTableData,
          visibleColumnKeys,
        });
        setCustomSettings({
          ...customSettings,
          [key]: {
            ...customSettings[key],
            visibleColumnKeys,
          },
        });
      },
      [UPDATE_ACTIONS.CUSTOM_SETTINGS_UPDATE]: (additionalSettings) =>
        setCustomSettings({
          ...customSettings,
          [additionalSettings.key]: {
            ...customSettings[additionalSettings.key],
            ...additionalSettings,
          },
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
      displaySettingsLabel: 'Display Settings',
      disableDisplaySettings: boolean('disableDisplaySettings', false),
      isCondensed,
      isWrappingText,
      ...displaySettingsButtons,
    };

    const columnManager = {
      columnManagerLabel: 'Column Manager',
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

    return (
      <DataTableManagerProvider
        columns={withRowSelection ? columnsWithSelect : visibleColumns}
        displaySettings={displaySettings}
        onSettingsChange={(action, nextValue, key) => {
          tableSettingsChangeHandler[action](nextValue, key);
        }}
        columnManager={columnManager}
        customSettings={customSettings}
        customColumns={visibleCustomColumns}
        selectedColumns={selectedColumns}
        customColumnManager={customColumnManager}
        managerTheme={select(
          'managerTheme',
          {
            dark: 'dark',
            light: 'light',
          },
          'dark'
        )}
        // TODO - remove when nested rows are implemented
        // Solely for debug purpose. A toggle (logCustomSettings) to log the customSettingsPayload
        // Will be helpful when implementing the nested rows.
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
              onRowClick={
                rowClick
                  ? (item, index) => alert(`Row click: Row number ${index}`)
                  : null
              }
            />
          </main>
          <br />
          <hr />
        </Spacings.Stack>
      </DataTableManagerProvider>
    );
  });
