import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean, select } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import { Value } from 'react-value';
import { useFormik } from 'formik';
import DataTable from './data-table';
import CheckboxInput from '../../inputs/checkbox-input';
import Readme from '../README.md';
import { useRowSelection, useSorting } from '.';
// For testing purposes:
import TextInput from '../../inputs/text-input';
import SelectInput from '../../inputs/select-input';
import NumberInput from '../../inputs/number-input';

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

const customCellRenderer = (type) => {
  const options = {
    Link: (row) => (
      <a href="https://uikit.commercetools.com/">{row.customRenderer}</a>
    ),
    Text: (row) => (
      <Value
        defaultValue={row.customRenderer}
        render={(value, onChange) => (
          <TextInput
            type="text"
            value={value}
            onChange={() => onChange(event.target.value)}
          />
        )}
      />
    ),
    Select: () => (
      <Value
        render={(value, onChange) => (
          <SelectInput
            value={value}
            menuPortalTarget={document.body}
            onChange={(event) => onChange(event.target.value)}
            options={[
              { value: 'one', label: 'One' },
              { value: 'two', label: 'Two' },
            ]}
          />
        )}
      />
    ),
    Number: () => (
      <Value
        render={(value, onChange) => (
          <NumberInput
            value={value}
            onChange={(event) => onChange(event.target.value)}
          />
        )}
      />
    ),
  };

  return options[type];
};

const initialColumnsState = [
  {
    key: 'name',
    label: 'Name',
    isSortable: true,
  },
  {
    key: 'customRenderer',
    label: 'Custom Column',
    renderItem: customCellRenderer('Link'),
  },
  {
    key: 'phone',
    label: 'Phone',
    onClick: (row) => alert(`Cell click: ${row.phone}`),
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
    isTruncated: true,
    width: 'minmax(150px, auto)',
  },
];

const ColumnConfigForm = (props) => {
  const formik = useFormik({
    initialValues: {
      width: props.column.width,
      align: props.column.align,
      onClick: !!props.column.onClick,
      isSortable: !!props.column.isSortable,
      isTruncated: !!props.column.isTruncated,
      shouldIgnoreRowClick: !!props.column.shouldIgnoreRowClick,
    },
    onSubmit: (values) => {
      const updatedColumn = {
        ...props.column,
        width: values.width,
        align: values.align,
        onClick: values.onClick
          ? (row, column) => alert(`Cell click: ${row[column.key]}`)
          : undefined,
        isSortable: values.isSortable,
        isTruncated: values.isTruncated,
        shouldIgnoreRowClick: values.shouldIgnoreRowClick,
      };
      props.updateColumn(updatedColumn);
    },
    enableReinitialize: true,
  });

  return (
    <div>
      <h4>{props.column.label}</h4>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>
            width
            <input
              name="width"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.width}
            />
          </label>
        </div>
        <div>
          <label>
            align
            <select
              name="align"
              onChange={formik.handleChange}
              value={formik.values.align}
            >
              <option value={undefined}>default</option>
              <option value="left">left</option>
              <option value="center">center</option>
              <option value="right">right</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            onClick
            <input
              name="onClick"
              type="checkbox"
              onChange={formik.handleChange}
              checked={formik.values.onClick}
            />
          </label>
        </div>
        <div>
          <label>
            isTruncated
            <input
              name="isTruncated"
              type="checkbox"
              onChange={formik.handleChange}
              checked={formik.values.isTruncated}
            />
          </label>
        </div>
        <div>
          <label>
            shouldIgnoreRowClick
            <input
              name="shouldIgnoreRowClick"
              type="checkbox"
              onChange={formik.handleChange}
              checked={formik.values.shouldIgnoreRowClick}
            />
          </label>
        </div>
        <div>
          <label>
            isSortable
            <input
              name="isSortable"
              type="checkbox"
              onChange={formik.handleChange}
              checked={formik.values.isSortable}
            />
          </label>
        </div>
        <button type="submit" disabled={!formik.dirty}>
          {'Apply Changes'}
        </button>
      </form>
    </div>
  );
};
ColumnConfigForm.displayName = 'ColumnConfigForm';
ColumnConfigForm.propTypes = {
  updateColumn: PropTypes.func.isRequired,
  column: PropTypes.shape({
    label: PropTypes.string,
    width: PropTypes.string,
    align: PropTypes.string,
    onClick: PropTypes.func,
    isSortable: PropTypes.bool,
    isTruncated: PropTypes.bool,
    shouldIgnoreRowClick: PropTypes.bool,
  }),
};

storiesOf('Components|Table (NEW)', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('DataTable', () => {
    const [tableData, setTableData] = React.useState({
      columns: initialColumnsState,
    });

    const { items: rows, sortedBy, sortDirection, onSortChange } = useSorting(
      items
    );

    // column update handler for the ColumnConfigForm
    const handleUpdateColumn = (column, colIndex) => {
      const newColumns = [...tableData.columns];
      newColumns[colIndex] = column;
      setTableData((prevState) => ({ ...prevState, columns: newColumns }));
    };

    // column update handler for the test input selector
    const handleUpdateCustomRenderer = (type) => {
      const newColumns = [...tableData.columns];
      newColumns[1].renderItem = customCellRenderer(type);
      setTableData((prevState) => ({ ...prevState, columns: newColumns }));
    };

    const onRowClick = boolean('onRowClick', false);
    const withRowSelection = boolean('withRowSelection', true);

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
      },
      ...tableData.columns,
    ];

    return (
      <React.Fragment>
        <DataTable
          rows={withRowSelection ? rowsWithSelection : rows}
          columns={withRowSelection ? columnsWithSelect : tableData.columns}
          onRowClick={
            onRowClick
              ? (item, index) => alert(`Row click: Row number ${index}`)
              : null
          }
          maxHeight={number('maxHeight', 0, {
            range: true,
            min: 200,
            max: 500,
            step: 10,
          })}
          maxWidth={number('maxWidth', 0, {
            range: true,
            min: 200,
            max: 800,
            step: 10,
          })}
          cellAlignment={select('cellAlignment', ['left', 'center', 'right'])}
          isCondensed={boolean('isCondensed', false)}
          wrapHeaderLabels={boolean('wrapHeaderLabels', true)}
          sortedBy={sortedBy}
          onSortChange={onSortChange}
          sortDirection={sortDirection}
        />
        <br />
        <hr />
        <div>
          <h3>{'Configure Column Settings'}</h3>
          <p>
            Note: the <code>width</code> input accepts the same values as the
            ones specified for{' '}
            <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns">
              grid-template-columns
            </a>
            . Try values such as <code>minmax(200px, 400px)</code>, combinations
            of <code>1fr</code> and <code>2fr</code>, or simply fixed values
            like <code>100px</code>. The default is <code>auto</code>.
          </p>
          <div style={{ display: 'flex' }}>
            {tableData.columns.map((col, colIndex) => (
              <ColumnConfigForm
                key={col + colIndex}
                updateColumn={(column) => handleUpdateColumn(column, colIndex)}
                column={col}
              />
            ))}
          </div>
          <hr />
          <h4>{'Select an input type to test on the second column'}</h4>
          <div>
            <label>
              {'Input Type: '}
              <Value
                defaultValue={'Link'}
                render={(value, onChange) => (
                  <select
                    name="input selector"
                    onChange={(event) => {
                      handleUpdateCustomRenderer(event.target.value);
                      onChange(event.target.value);
                    }}
                    value={value}
                  >
                    <option value="Link">Link</option>
                    <option value="Text">Text</option>
                    <option value="Number">Number</option>
                    <option value="Select">Select</option>
                  </select>
                )}
              />
            </label>
          </div>
        </div>
      </React.Fragment>
    );
  });
