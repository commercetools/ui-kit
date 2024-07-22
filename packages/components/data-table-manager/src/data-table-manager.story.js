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
import {
  DataTableManagerProvider,
  useDataTableManagerContext,
} from '@commercetools-uikit/data-table-manager/data-table-manager-provider';
import { ColumnSettingsManager } from '@commercetools-uikit/data-table-manager/column-settings-manager';
import Spacings from '@commercetools-uikit/spacings';
import SelectInput from '@commercetools-uikit/select-input';
import Grid from '@commercetools-uikit/grid';
import { designTokens } from '@commercetools-uikit/design-system';
import RadioInput from '@commercetools-uikit/radio-input';
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

    const [customTableData, setCustomTableData] = useState({
      columns: initialColumnsState,
      visibleColumnKeys: initialVisibleColumns.map(({ key }) => key),
    });

    const visibleCustomColumns = customTableData.visibleColumnKeys.map(
      (columnKey) => mappedColumns[columnKey]
    );

    const tableSettingsChangeHandler = {
      [UPDATE_ACTIONS.COLUMNS_UPDATE]: (visibleColumnKeys) =>
        setTableData({
          ...tableData,
          visibleColumnKeys,
        }),
      [UPDATE_ACTIONS.CUSTOM_COLUMNS_UPDATE]: (visibleColumnKeys) =>
        setCustomTableData({
          ...customTableData,
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
      ...columnManagerButtons,
    };

    const FirstCustomComponent = (props) => {
      const phoneNumberTextColorValue =
        props.additionalSettings.phoneNumberTextColor ?? '';
      const radioInputValue = props.additionalSettings.displayText ?? 'show';

      return (
        <>
          <Grid
            gridGap={designTokens.spacing30}
            gridTemplateColumns="repeat(2, 1fr)"
          >
            <Grid.Item>
              <Spacings.Stack scale={'l'}>
                <div>Color Settings</div>
                <Value
                  defaultValue={phoneNumberTextColorValue}
                  render={(value, onChange) => {
                    return (
                      <SelectInput
                        appearance="quiet"
                        value={value}
                        onChange={(event) => {
                          props.updateCustomSettings({
                            key: props.additionalSettings.customSetting.key,
                            phoneNumberTextColor: event.target.value,
                          });
                          onChange(event.target.value);
                        }}
                        options={[
                          { value: 'black', label: 'black' },
                          { value: 'red', label: 'Red' },
                          { value: 'green', label: 'Green' },
                        ]}
                      />
                    );
                  }}
                />
              </Spacings.Stack>
            </Grid.Item>
            <Grid.Item>
              <Spacings.Stack scale={'l'}>
                <div>Toggle display</div>
                <Value
                  defaultValue={radioInputValue}
                  render={(value, onChange) => {
                    return (
                      <RadioInput.Group
                        id="toggle-display"
                        name="toggle-display"
                        value={value}
                        onChange={(event) => {
                          props.updateCustomSettings({
                            key: props.additionalSettings.customSetting.key,
                            displayText: event.target.value,
                          });
                          onChange(event.target.value);
                        }}
                      >
                        <RadioInput.Option value={'show'}>
                          Show texts for a given column or row
                        </RadioInput.Option>
                        <RadioInput.Option value={'hide'}>
                          Hide texts for a given column or row
                        </RadioInput.Option>
                      </RadioInput.Group>
                    );
                  }}
                />
              </Spacings.Stack>
            </Grid.Item>
          </Grid>
        </>
      );
    };
    FirstCustomComponent.propTypes = {
      additionalSettings: PropTypes.shape({
        phoneNumberTextColor: PropTypes.string,
        displayText: PropTypes.string,
        customSetting: PropTypes.shape({
          key: PropTypes.string.isRequired,
        }).isRequired,
        imageSize: PropTypes.string,
      }).isRequired,
      updateCustomSettings: PropTypes.func.isRequired,
    };

    const SecondCustomComponent = (props) => {
      return (
        <>
          <Grid
            gridGap={designTokens.spacing30}
            gridTemplateColumns="repeat(2, 1fr)"
          >
            <Grid.Item>
              <Spacings.Stack scale={'l'}>
                <div>Choose Image size</div>
                <Value
                  defaultValue="small"
                  render={(value, onChange) => {
                    return (
                      <SelectInput
                        appearance="quiet"
                        value={value}
                        onChange={(event) => {
                          props.updateCustomSettings({
                            key: props.additionalSettings.customSetting.key,
                            imageSize: event.target.value,
                          });
                          onChange(event.target.value);
                        }}
                        options={[
                          { value: 'small', label: 'Small' },
                          { value: 'medium', label: 'Medium' },
                          { value: 'large', label: 'Large' },
                        ]}
                      />
                    );
                  }}
                />
              </Spacings.Stack>
            </Grid.Item>
            <Grid.Item>
              <Spacings.Stack scale={'l'}>
                <div>Toggle display</div>
                <Value
                  defaultValue="show"
                  render={(value, onChange) => {
                    return (
                      <RadioInput.Group
                        id="toggle-display"
                        name="toggle-display"
                        value={value}
                        onChange={(event) => {
                          props.updateCustomSettings({
                            key: props.additionalSettings.customSetting.key,
                            displayText: event.target.value,
                          });
                          onChange(event.target.value);
                        }}
                      >
                        <RadioInput.Option value={'show'}>
                          Show texts for a given column or row
                        </RadioInput.Option>
                        <RadioInput.Option value={'hide'}>
                          Hide texts for a given column or row
                        </RadioInput.Option>
                      </RadioInput.Group>
                    );
                  }}
                />
              </Spacings.Stack>
            </Grid.Item>
          </Grid>
        </>
      );
    };
    SecondCustomComponent.propTypes = {
      additionalSettings: PropTypes.shape({
        imageSize: PropTypes.string,
        displayText: PropTypes.string,
        customSetting: PropTypes.shape({
          key: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      updateCustomSettings: PropTypes.func.isRequired,
    };

    const ThirdCustomComponent = (props) => {
      return (
        <ColumnSettingsManager
          {...(customColumnManager || {})}
          title="Custom culumn manager"
          availableColumns={customColumnManager?.hideableColumns ?? []}
          selectedColumns={visibleCustomColumns}
          onClose={props.onClose}
          onUpdateColumns={(nextVisibleColumns) =>
            props.onUpdateColumns(nextVisibleColumns)
          }
          managerTheme={props.managerTheme}
        />
      );
    };

    ThirdCustomComponent.propTypes = {
      onUpdateColumns: PropTypes.func,
      onClose: PropTypes.func,
      managerTheme: PropTypes.string,
      updateCustomSettings: PropTypes.func,
      additionalSettings: PropTypes.shape({
        customSetting: PropTypes.shape({
          key: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    };

    const customSettings = [
      {
        key: 'customSettings1',
        customPanelTitle: 'Custom Settings 1',
        customComponent: FirstCustomComponent,
      },
      {
        key: 'customSettings2',
        customPanelTitle: 'Custom Settings 2',
        customComponent: SecondCustomComponent,
      },
      {
        key: 'customSettings3',
        customPanelTitle: 'Custom Settings 3',
        type: 'columnManager',
        customComponent: ThirdCustomComponent,
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

    const [customTableData, setCustomTableData] = useState({
      columns: initialColumnsState,
      visibleColumnKeys: initialVisibleColumns.map(({ key }) => key),
    });

    const visibleCustomColumns = customTableData.visibleColumnKeys.map(
      (columnKey) => mappedColumns[columnKey]
    );

    const tableSettingsChangeHandler = {
      [UPDATE_ACTIONS.COLUMNS_UPDATE]: (visibleColumnKeys) =>
        setTableData({
          ...tableData,
          visibleColumnKeys,
        }),
      [UPDATE_ACTIONS.CUSTOM_COLUMNS_UPDATE]: (visibleColumnKeys) =>
        setCustomTableData({
          ...customTableData,
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

    const customColumnManager = {
      columnManagerLabel: 'Custom Column Manager',
      areHiddenColumnsSearchable: boolean('areHiddenColumnsSearchable', true),
      searchHiddenColumns: (searchTerm) => {
        setTableData({
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
      ...columnManagerButtons,
    };

    const FirstCustomComponent = (props) => {
      const { updateCustomSettings } = useDataTableManagerContext();
      const phoneNumberTextColorValue =
        props.additionalSettings.phoneNumberTextColor ?? '';
      const radioInputValue = props.additionalSettings.displayText ?? 'show';

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
                  value={phoneNumberTextColorValue}
                  onChange={(event) =>
                    updateCustomSettings({
                      key: props.additionalSettings.customSetting.key,
                      phoneNumberTextColor: event.target.value,
                    })
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
                  onChange={(event) =>
                    updateCustomSettings({
                      key: props.additionalSettings.customSetting.key,
                      displayText: event.target.value,
                    })
                  }
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
    FirstCustomComponent.propTypes = {
      additionalSettings: PropTypes.shape({
        phoneNumberTextColor: PropTypes.string,
        displayText: PropTypes.string,
        customSetting: PropTypes.shape({
          key: PropTypes.string.isRequired,
        }).isRequired,
        imageSize: PropTypes.string,
      }).isRequired,
    };

    const SecondCustomComponent = (props) => {
      const { updateCustomSettings } = useDataTableManagerContext();
      const imageSizeValue = props.additionalSettings.imageSize ?? '';
      const radioInputValue = props.additionalSettings.displayText ?? 'show';

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
                  value={imageSizeValue}
                  onChange={(event) =>
                    updateCustomSettings({
                      key: props.additionalSettings.customSetting.key,
                      imageSize: event.target.value,
                    })
                  }
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
                  onChange={(event) =>
                    updateCustomSettings({
                      key: props.additionalSettings.customSetting.key,
                      displayText: event.target.value,
                    })
                  }
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
    SecondCustomComponent.propTypes = {
      additionalSettings: PropTypes.shape({
        imageSize: PropTypes.string,
        displayText: PropTypes.string,
        customSetting: PropTypes.shape({
          key: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    };

    const ThirdCustomComponent = (props) => {
      const { updateCustomSettings } = useDataTableManagerContext();
      return (
        <ColumnSettingsManager
          {...(customColumnManager || {})}
          title="Custom culumn manager"
          availableColumns={customColumnManager?.hideableColumns ?? []}
          selectedColumns={visibleCustomColumns}
          onClose={props.onClose}
          onUpdateColumns={(nextVisibleColumns) => {
            const keysOfVisibleColumns = nextVisibleColumns.map(
              (visibleColumn) => visibleColumn.key
            );
            props.onSettingsChange?.(
              UPDATE_ACTIONS.CUSTOM_COLUMNS_UPDATE,
              keysOfVisibleColumns
            );
            updateCustomSettings({
              key: props.additionalSettings.customSetting.key,
              customColumns: visibleCustomColumns,
            });
          }}
          managerTheme={props.managerTheme}
        />
      );
    };

    ThirdCustomComponent.propTypes = {
      onClose: PropTypes.func,
      managerTheme: PropTypes.string,
      onSettingsChange: PropTypes.func,
      updateCustomSettings: PropTypes.func,
      additionalSettings: PropTypes.shape({
        customSetting: PropTypes.shape({
          key: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    };

    const customSettings = [
      {
        key: 'customSettings1',
        customPanelTitle: 'Custom Settings 1',
        customComponent: FirstCustomComponent,
      },
      {
        key: 'customSettings2',
        customPanelTitle: 'Custom Settings 2',
        customComponent: SecondCustomComponent,
      },
      {
        key: 'customSettings3',
        customPanelTitle: 'Custom Settings 3',
        type: 'columnManager',
        customComponent: ThirdCustomComponent,
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
