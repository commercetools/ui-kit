import type { Meta, StoryFn } from '@storybook/react';
import DataTable from './../../data-table';
import DataTableManager from './index';
import { useCallback, useState } from 'react';
// @ts-expect-error
import { Value } from 'react-value';
import times from 'lodash/times';
import PrimaryButton from '@commercetools-uikit/primary-button';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import { useRowSelection, useSorting } from '@commercetools-uikit/hooks';
import { UPDATE_ACTIONS } from './constants';
import { DataTableManagerProvider } from '@commercetools-uikit/data-table-manager/data-table-manager-provider';
import Spacings from '@commercetools-uikit/spacings';
import SearchTextInput from '@commercetools-uikit/search-text-input';
import Constraints from '@commercetools-uikit/constraints';
import Text from '@commercetools-uikit/text';
import ToggleInput from '@commercetools-uikit/toggle-input';
import { ColumnSettingsManager } from '@commercetools-uikit/data-table-manager/column-settings-manager';
import SelectInput from '@commercetools-uikit/select-input';
import Grid from '@commercetools-uikit/grid';
import { designTokens } from '@commercetools-uikit/design-system';
import CheckboxInput from '@commercetools-uikit/checkbox-input';

const meta: Meta<typeof DataTableManager> = {
  title: 'components/DataTable/DataTableManager',
  component: DataTableManager,
  argTypes: {
    topBar: {
      control: 'text',
    },
    withRowSelection: {
      control: 'boolean',
    },
  },
};
export default meta;

type Story = StoryFn<typeof DataTableManager>;

const items = [
  {
    id: '5e188c29791747d9c54250e2',
    isExpanded: false,
    name: 'Morgan Bean',
    customRenderer: 'CYCLONICA',
    phone: '+1 (895) 529-3300',
    age: 23,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
    itemDetails:
      'More details rendered in the nested item. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c295ae0bb19afbb115f',
    isExpanded: false,
    name: 'Franklin Cochran',
    customRenderer: 'TINGLES',
    phone: '+1 (835) 571-3268',
    age: 36,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
    itemDetails:
      'More details rendered in the nested item. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c298f0ea901553c517f',
    isExpanded: false,
    name: 'Salazar Craig',
    customRenderer: 'ECRAZE',
    phone: '+1 (944) 445-2594',
    age: 21,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
    itemDetails:
      'More details rendered in the nested item. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c29b09bb748df833ed0',
    isExpanded: false,
    name: 'Pamela Noble',
    customRenderer: 'FILODYNE',
    phone: '+1 (875) 421-3328',
    age: 34,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
    itemDetails:
      'More details rendered in the nested item. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c29bc14e3b97ab2ad7d',
    isExpanded: false,
    name: 'Terra Morrow',
    customRenderer: 'DAISU',
    phone: '+1 (807) 436-2026',
    age: 30,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
    itemDetails:
      'More details rendered in the nested item. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c296c9b7cf486a0479c',
    isExpanded: false,
    name: 'Cline Hansen',
    customRenderer: 'ULTRIMAX',
    phone: '+1 (934) 402-3675',
    age: 21,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
    itemDetails:
      'More details rendered in the nested item. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c29b45c669d8e60303f',
    isExpanded: false,
    name: 'Jefferson Rosario',
    customRenderer: 'COMTOURS',
    phone: '+1 (874) 437-2581',
    age: 32,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
    itemDetails:
      'More details rendered in the nested item. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c29ca865647af147b4a',
    isExpanded: false,
    name: 'Tania Waller',
    customRenderer: 'DOGSPA',
    phone: '+1 (964) 585-3040',
    age: 35,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
    itemDetails:
      'More details rendered in the nested item. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c2910b83f907e9c66ab',
    isExpanded: false,
    name: 'Butler Shepard',
    customRenderer: 'HOUSEDOWN',
    phone: '+1 (888) 434-2153',
    age: 21,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
    itemDetails:
      'More details rendered in the nested item. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    id: '5e188c29a9ece9123d6a87a1',
    isExpanded: false,
    name: 'Diana Wise',
    customRenderer: 'SPEEDBOLT',
    phone: '+1 (992) 535-2912',
    age: 27,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
    itemDetails:
      'More details rendered in the nested item. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
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

export const BasicExample: Story = (args) => {
  const [tableData, setTableData] = useState({
    columns: initialColumnsState,
    visibleColumnKeys: initialVisibleColumns.map(({ key }) => key),
  });

  const [customTableData, setCustomTableData] = useState({
    columns: initialColumnsState,
    visibleColumnKeys: initialVisibleColumns.map(({ key }) => key),
  });

  const customColumnManager = {
    areHiddenCustomColumnsSearchable: true,
    // @ts-expect-error
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
    disableCustomColumnManager: false,
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

  const updateRowSelection = (
    newState: boolean | ((prevState: boolean) => boolean)
  ) => {
    setRowSelection(newState);
  };
  const updateRowClick = (
    newState: boolean | ((prevState: boolean) => boolean)
  ) => {
    setRowClick(newState);
  };
  const updateTextColor = (
    newState: string | ((prevState: string) => string)
  ) => {
    setTextColor(newState);
  };
  const updateColumnResize = (
    newState: boolean | ((prevState: boolean) => boolean)
  ) => {
    setDisableResize(newState);
  };

  const {
    items: rows,
    sortedBy,
    sortDirection,
    onSortChange,
  } = useSorting(items);

  const showDisplaySettingsConfirmationButtons = false;
  const showColumnManagerConfirmationButtons = false;
  const withRowSelection = args.withRowSelection || rowSelection;

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

  const handleSelectColumnHeaderChange = useCallback(
    () => (countSelectedRows === 0 ? selectAllRows : deselectAllRows),
    [countSelectedRows, selectAllRows, deselectAllRows]
  );

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
      // @ts-expect-error
      renderItem: (row) => <div style={{ color: textColor }}>{row.name}</div>,
    },
    // @ts-expect-error
    ...tableData.visibleColumnKeys.map((columnKey) => mappedColumns[columnKey]),
  ];

  const columnsWithSelect = [
    {
      key: 'checkbox',
      label: () => (
        <CheckboxInput
          isIndeterminate={isSelectColumnHeaderIndeterminate}
          isChecked={countSelectedRows !== 0}
          onChange={handleSelectColumnHeaderChange}
        />
      ),
      shouldIgnoreRowClick: true,
      align: 'center',
      renderItem: (row: { id: string }) => (
        <CheckboxInput
          isChecked={getIsRowSelected(row.id)}
          onChange={() => toggleRow(row.id)}
        />
      ),
      disableResizing: true,
    },
    ...visibleColumns,
  ];
  // @ts-expect-error
  const getSelectedColumns = (mappedColumns, visibleColumnsKeys) =>
    // @ts-expect-error
    visibleColumnsKeys.map((columnKey) => mappedColumns[columnKey]);

  const selectedColumns = getSelectedColumns(
    mappedCustomColumns,
    customColumnManager.visibleColumnKeys
  );

  const visibleCustomColumns = customTableData.visibleColumnKeys.map(
    // @ts-expect-error
    (columnKey) => mappedColumns[columnKey]
  );

  const CustomSettingBlankComponent = (props: {
    additionalSettings: {
      isColumnResizable: boolean;
      key: string;
      updateColumnResize: (arg: boolean) => void;
      textColor: string;
      updateTextColor: (arg: string | string[] | null | undefined) => void;
      displayText: string;
      updateRowSelection: (arg: boolean) => void;
      rowClick: () => void;
      updateRowClick: (arg: boolean) => void;
    };
    updateCustomSettings: (arg: {
      key: string;
      isColumnResizable?: boolean;
      textColor?: string | string[] | null | undefined;
      displayText?: boolean;
      rowClick?: boolean;
    }) => void;
  }) => {
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
                // @ts-expect-error
                render={(value, onChange) => {
                  return (
                    <Spacings.Inline>
                      <ToggleInput
                        // @ts-expect-error
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
                  // @ts-expect-error
                  render={(value, onChange) => {
                    return (
                      <Constraints.Horizontal
                        max={3}
                        // @ts-expect-error
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
                // @ts-expect-error
                render={(value, onChange) => {
                  return (
                    <Spacings.Inline>
                      <ToggleInput
                        // @ts-expect-error
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
                // @ts-expect-error
                render={(value, onChange) => {
                  return (
                    <Spacings.Inline>
                      <ToggleInput
                        defaultValue={props.additionalSettings.rowClick || true}
                        // @ts-expect-error
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

  // @ts-expect-error
  const CustomColumnComponent = (props) => {
    return (
      <ColumnSettingsManager
        {...(props.availableColumns || {})}
        title={props.additionalSettings.customPanelTitle}
        availableColumns={props.availableColumns.hideableColumns ?? []}
        selectedColumns={props.selectedColumns}
        onClose={props.onClose}
        areHiddenColumnsSearchable={
          props.availableColumns.areHiddenCustomColumnsSearchable
        }
        // @ts-expect-error
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

  const initialCustomSettings = {
    customSettings: {
      key: 'customSettings',
      customPanelTitle: 'Custom Settings (blank)',
      customComponent: CustomSettingBlankComponent,
      updateRowSelection,
      updateRowClick,
      updateTextColor,
      updateColumnResize,
    },
    customColumnsSettings: {
      key: 'customColumnsSettings',
      customPanelTitle: 'Custom settings (columns)',
      type: 'columnManager',
      customComponent: CustomColumnComponent,
      visibleColumnKeys: ['name', 'customRenderer', 'phone', 'age'],
    },
  };

  const [customSettings, setCustomSettings] = useState(initialCustomSettings);

  const tableSettingsChangeHandler = {
    // @ts-expect-error
    [UPDATE_ACTIONS.COLUMNS_UPDATE]: (visibleColumnKeys) =>
      setTableData({
        ...tableData,
        visibleColumnKeys,
      }),
    // @ts-expect-error
    [UPDATE_ACTIONS.CUSTOM_COLUMNS_UPDATE]: (visibleColumnKeys, key) => {
      setCustomTableData({
        ...customTableData,
        visibleColumnKeys,
      });
      setCustomSettings({
        ...customSettings,
        [key]: {
          // @ts-expect-error
          ...customSettings[key],
          visibleColumnKeys,
        },
      });
    },
    [UPDATE_ACTIONS.CUSTOM_SETTINGS_UPDATE]: (additionalSettings: {
      key: string | number;
    }) =>
      setCustomSettings({
        ...customSettings,
        [additionalSettings.key]: {
          // @ts-expect-error
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
    disableDisplaySettings: false,
    isCondensed,
    isWrappingText,
    ...displaySettingsButtons,
  };

  const columnManager = {
    columnManagerLabel: 'Column Manager',
    areHiddenColumnsSearchable: true,
    searchHiddenColumns: (searchTerm: string) => {
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

  // const NestedComponent = (props: { id: string }) => {
  //   const item = items.find((item) => item.id === props.id);
  //   return (
  //     <div
  //       style={{
  //         marginTop: '10px',
  //       }}
  //     >
  //       <p>
  //         {item && <strong>Item ID: {item.id}</strong>}
  //         <br />
  //         {item && <strong>Item Name: {item.name}</strong>}
  //         <br />
  //         <strong>Item Details:</strong>
  //         <br />
  //         {item && <span style={{ color: textColor }}>{item.about}</span>}
  //       </p>
  //     </div>
  //   );
  // };

  return (
    <>
      <DataTableManager
        {...args}
        topBar={args.topBar}
        columns={withRowSelection ? columnsWithSelect : visibleColumns}
        // @ts-expect-error
        onSettingsChange={(action, nextValue, key) => {
          tableSettingsChangeHandler[action](nextValue, key);
        }}
        columnManager={columnManager}
        displaySettings={displaySettings}
        // @ts-expect-error
        customSettings={customSettings}
        selectedColumns={selectedColumns}
        customColumnManager={customColumnManager}
        customColumns={visibleCustomColumns}
      >
        <DataTable
          rows={withRowSelection ? rowsWithSelection : rows}
          sortedBy={sortedBy}
          onSortChange={onSortChange}
          sortDirection={sortDirection}
          onRowClick={
            rowClick
              ? // @ts-expect-error
                (item, index, columnKey) =>
                  alert(`Row click: Row number ${index}`)
              : undefined
          }
          // TODO - Comment this out to test the nested rows
          // onRowClick={rowClick ? (item, index) => item.id : null}
          // maxExpandableHeight={100}
          // renderNestedRow={(row) => <NestedComponent {...row} />}
        />
      </DataTableManager>
      <br />
      <hr />
    </>
  );
};

BasicExample.args = {
  topBar: 'topBar can display arbitrary ReactNodes',
  managerTheme: 'light',
};

/** Use the `DataTableManagerProvider` component if you need to customize the DOM-structure */
export const WithCustomLayout: Story = (args) => {
  const [tableData, setTableData] = useState({
    columns: initialColumnsState,
    visibleColumnKeys: initialVisibleColumns.map(({ key }) => key),
  });

  const [customTableData, setCustomTableData] = useState({
    columns: initialColumnsState,
    visibleColumnKeys: initialVisibleColumns.map(({ key }) => key),
  });

  const customColumnManager = {
    areHiddenCustomColumnsSearchable: true,
    // @ts-expect-error
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
    disableCustomColumnManager: false,
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

  const updateRowSelection = (
    newState: boolean | ((prevState: boolean) => boolean)
  ) => {
    setRowSelection(newState);
  };
  const updateRowClick = (
    newState: boolean | ((prevState: boolean) => boolean)
  ) => {
    setRowClick(newState);
  };
  const updateTextColor = (
    newState: string | ((prevState: string) => string)
  ) => {
    setTextColor(newState);
  };
  const updateColumnResize = (
    newState: boolean | ((prevState: boolean) => boolean)
  ) => {
    setDisableResize(newState);
  };

  const {
    items: rows,
    sortedBy,
    sortDirection,
    onSortChange,
  } = useSorting(items);

  const showDisplaySettingsConfirmationButtons = false;
  const showColumnManagerConfirmationButtons = false;
  const withRowSelection = args.withRowSelection || rowSelection;

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

  const handleSelectColumnHeaderChange = useCallback(
    () => (countSelectedRows === 0 ? selectAllRows : deselectAllRows),
    [countSelectedRows, selectAllRows, deselectAllRows]
  );

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
      // @ts-expect-error
      renderItem: (row) => <div style={{ color: textColor }}>{row.name}</div>,
    },
    // @ts-expect-error
    ...tableData.visibleColumnKeys.map((columnKey) => mappedColumns[columnKey]),
  ];

  const columnsWithSelect = [
    {
      key: 'checkbox',
      label: () => (
        <CheckboxInput
          isIndeterminate={isSelectColumnHeaderIndeterminate}
          isChecked={countSelectedRows !== 0}
          onChange={handleSelectColumnHeaderChange}
        />
      ),
      shouldIgnoreRowClick: true,
      align: 'center',
      renderItem: (row: { id: string }) => (
        <CheckboxInput
          isChecked={getIsRowSelected(row.id)}
          onChange={() => toggleRow(row.id)}
        />
      ),
      disableResizing: true,
    },
    ...visibleColumns,
  ];
  // @ts-expect-error
  const getSelectedColumns = (mappedColumns, visibleColumnsKeys) =>
    // @ts-expect-error
    visibleColumnsKeys.map((columnKey) => mappedColumns[columnKey]);

  const selectedColumns = getSelectedColumns(
    mappedCustomColumns,
    customColumnManager.visibleColumnKeys
  );

  const visibleCustomColumns = customTableData.visibleColumnKeys.map(
    // @ts-expect-error
    (columnKey) => mappedColumns[columnKey]
  );

  const CustomSettingBlankComponent = (props: {
    additionalSettings: {
      isColumnResizable: boolean;
      key: string;
      updateColumnResize: (arg: boolean) => void;
      textColor: string;
      updateTextColor: (arg: string | string[] | null | undefined) => void;
      displayText: string;
      updateRowSelection: (arg: boolean) => void;
      rowClick: () => void;
      updateRowClick: (arg: boolean) => void;
    };
    updateCustomSettings: (arg: {
      key: string;
      isColumnResizable?: boolean;
      textColor?: string | string[] | null | undefined;
      displayText?: boolean;
      rowClick?: boolean;
    }) => void;
  }) => {
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
                // @ts-expect-error
                render={(value, onChange) => {
                  return (
                    <Spacings.Inline>
                      <ToggleInput
                        // @ts-expect-error
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
                  // @ts-expect-error
                  render={(value, onChange) => {
                    return (
                      <Constraints.Horizontal
                        max={3}
                        // @ts-expect-error
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
                // @ts-expect-error
                render={(value, onChange) => {
                  return (
                    <Spacings.Inline>
                      <ToggleInput
                        // @ts-expect-error
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
                // @ts-expect-error
                render={(value, onChange) => {
                  return (
                    <Spacings.Inline>
                      <ToggleInput
                        defaultValue={props.additionalSettings.rowClick || true}
                        // @ts-expect-error
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

  // @ts-expect-error
  const CustomColumnComponent = (props) => {
    return (
      <ColumnSettingsManager
        {...(props.availableColumns || {})}
        title={props.additionalSettings.customPanelTitle}
        availableColumns={props.availableColumns.hideableColumns ?? []}
        selectedColumns={props.selectedColumns}
        onClose={props.onClose}
        areHiddenColumnsSearchable={
          props.availableColumns.areHiddenCustomColumnsSearchable
        }
        // @ts-expect-error
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

  const initialCustomSettings = {
    customSettings: {
      key: 'customSettings',
      customPanelTitle: 'Custom Settings (blank)',
      customComponent: CustomSettingBlankComponent,
      updateRowSelection,
      updateRowClick,
      updateTextColor,
      updateColumnResize,
    },
    customColumnsSettings: {
      key: 'customColumnsSettings',
      customPanelTitle: 'Custom settings (columns)',
      type: 'columnManager',
      customComponent: CustomColumnComponent,
      visibleColumnKeys: ['name', 'customRenderer', 'phone', 'age'],
    },
  };

  const [customSettings, setCustomSettings] = useState(initialCustomSettings);

  const tableSettingsChangeHandler = {
    // @ts-expect-error
    [UPDATE_ACTIONS.COLUMNS_UPDATE]: (visibleColumnKeys) =>
      setTableData({
        ...tableData,
        visibleColumnKeys,
      }),
    // @ts-expect-error
    [UPDATE_ACTIONS.CUSTOM_COLUMNS_UPDATE]: (visibleColumnKeys, key) => {
      setCustomTableData({
        ...customTableData,
        visibleColumnKeys,
      });
      setCustomSettings({
        ...customSettings,
        [key]: {
          // @ts-expect-error
          ...customSettings[key],
          visibleColumnKeys,
        },
      });
    },
    [UPDATE_ACTIONS.CUSTOM_SETTINGS_UPDATE]: (additionalSettings: {
      key: string | number;
    }) =>
      setCustomSettings({
        ...customSettings,
        [additionalSettings.key]: {
          // @ts-expect-error
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
    disableDisplaySettings: false,
    isCondensed,
    isWrappingText,
    ...displaySettingsButtons,
  };

  const columnManager = {
    columnManagerLabel: 'Column Manager',
    areHiddenColumnsSearchable: true,
    searchHiddenColumns: (searchTerm: string) => {
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

  // const NestedComponent = (props: { id: string }) => {
  //   const item = items.find((item) => item.id === props.id);
  //   return (
  //     <div
  //       style={{
  //         marginTop: '10px',
  //       }}
  //     >
  //       <p>
  //         {item && <strong>Item ID: {item.id}</strong>}
  //         <br />
  //         {item && <strong>Item Name: {item.name}</strong>}
  //         <br />
  //         <strong>Item Details:</strong>
  //         <br />
  //         {item && <span style={{ color: textColor }}>{item.about}</span>}
  //       </p>
  //     </div>
  //   );
  // };

  return (
    <DataTableManagerProvider
      columns={withRowSelection ? columnsWithSelect : visibleColumns}
      // @ts-expect-error
      onSettingsChange={(action, nextValue, key) => {
        tableSettingsChangeHandler[action](nextValue, key);
      }}
      columnManager={columnManager}
      displaySettings={displaySettings}
      // @ts-expect-error
      customSettings={customSettings}
      selectedColumns={selectedColumns}
      customColumnManager={customColumnManager}
      customColumns={visibleCustomColumns}
    >
      <Spacings.Stack>
        <header>
          <Spacings.Inline justifyContent="flex-end">
            <DataTableManager />
          </Spacings.Inline>
          <SearchTextInput
            onSubmit={(value) => alert(`Search for: ${value}`)}
            onReset={() => alert('Reset search')}
            value=""
            placeholder={'Dummy search component'}
            isReadOnly
          />
        </header>
        <main>
          <DataTable
            rows={withRowSelection ? rowsWithSelection : rows}
            sortedBy={sortedBy}
            onSortChange={onSortChange}
            sortDirection={sortDirection}
            // @ts-expect-error
            onRowClick={
              rowClick
                ? // @ts-expect-error
                  (item, index) => alert(`Row click: Row number ${index}`)
                : null
            }
            // TODO - Comment this out to test the nested rows
            // onRowClick={rowClick ? (item, index) => item.id : null}
            // maxExpandableHeight={100}
            // renderNestedRow={(row) => <NestedComponent {...row} />}
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
