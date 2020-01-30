import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean, select } from '@storybook/addon-knobs';
import { Value } from 'react-value';
import { useFormik } from 'formik';
import SimpleTable from './simple-table';
import { useRowSelection } from '.';
import CheckboxInput from '../../inputs/checkbox-input';

const items = [
  {
    key: '5e188c29791747d9c54250e2',
    name: 'Morgan Bean',
    company: 'CYCLONICA',
    phone: '+1 (895) 529-3300',
    age: 23,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c295ae0bb19afbb115f',
    name: 'Franklin Cochran',
    company: 'TINGLES',
    phone: '+1 (835) 571-3268',
    age: 36,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c298f0ea901553c517f',
    name: 'Salazar Craig',
    company: 'ECRAZE',
    phone: '+1 (944) 445-2594',
    age: 21,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c29b09bb748df833ed0',
    name: 'Pamela Noble',
    company: 'FILODYNE',
    phone: '+1 (875) 421-3328',
    age: 34,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c29bc14e3b97ab2ad7d',
    name: 'Terra Morrow',
    company: 'DAISU',
    phone: '+1 (807) 436-2026',
    age: 30,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c296c9b7cf486a0479c',
    name: 'Cline Hansen',
    company: 'ULTRIMAX',
    phone: '+1 (934) 402-3675',
    age: 21,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c29b45c669d8e60303f',
    name: 'Jefferson Rosario',
    company: 'COMTOURS',
    phone: '+1 (874) 437-2581',
    age: 32,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c29ca865647af147b4a',
    name: 'Tania Waller',
    company: 'DOGSPA',
    phone: '+1 (964) 585-3040',
    age: 35,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c2910b83f907e9c66ab',
    name: 'Butler Shepard',
    company: 'HOUSEDOWN',
    phone: '+1 (888) 434-2153',
    age: 21,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c29a9ece9123d6a87a1',
    name: 'Diana Wise',
    company: 'SPEEDBOLT',
    phone: '+1 (992) 535-2912',
    age: 27,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
];

const initialColumnsState = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'company',
    label: 'Company',
  },
  {
    key: 'phone',
    label: 'Phone',
  },
  {
    key: 'age',
    label: 'Age',
    align: 'right',
  },
  {
    key: 'about',
    label: 'About',
    isTruncated: true,
    onClick: () => alert('Cell click!'),
    shouldIgnoreRowClick: true,
  },
];

const ColumnConfigForm = props => {
  const formik = useFormik({
    initialValues: {
      width: props.column.width,
      align: props.column.align,
      onClick: !!props.column.onClick,
      isTruncated: !!props.column.isTruncated,
      shouldIgnoreRowClick: !!props.column.shouldIgnoreRowClick,
    },
    onSubmit: values => {
      console.log(values.shouldIgnoreRowClick);

      const updatedColumn = {
        ...props.column,
        width: values.width,
        align: values.align,
        onClick: values.onClick ? () => alert('Cell click!') : undefined,
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
        <label>
          align
          <input
            name="align"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.align}
          />
        </label>
        <label>
          onClick
          <input
            name="onClick"
            type="checkbox"
            onChange={formik.handleChange}
            checked={formik.values.onClick}
          />
        </label>
        <label>
          isTruncated
          <input
            name="isTruncated"
            type="checkbox"
            onChange={formik.handleChange}
            checked={formik.values.isTruncated}
          />
        </label>
        <label>
          shouldIgnoreRowClick
          <input
            name="shouldIgnoreRowClick"
            type="checkbox"
            onChange={formik.handleChange}
            checked={formik.values.shouldIgnoreRowClick}
          />
        </label>
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
    isTruncated: PropTypes.bool,
    shouldIgnoreRowClick: PropTypes.bool,
  }),
};

storiesOf('Components|Table (NEW)', module)
  .addDecorator(withKnobs)
  // .addDecorator(withReadme(Readme))
  .add('SimpleTable', () => {
    const [tableData, setTableData] = React.useState({
      rows: items,
      columns: initialColumnsState,
    });

    const handleUpdateColumn = (column, colIndex) => {
      const newColumns = tableData.columns;
      newColumns[colIndex] = column;
      setTableData(prevState => ({ ...prevState, columns: newColumns }));
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
    } = useRowSelection('checkbox', tableData.rows);

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
        onClick: row => toggleRow(row.key),
        shouldIgnoreRowClick: true,
        align: 'center',
      },
      ...tableData.columns,
    ];

    console.log(withRowSelection ? columnsWithSelect : tableData.columns);

    return (
      <React.Fragment>
        <SimpleTable
          items={withRowSelection ? rowsWithSelection : tableData.rows}
          columns={withRowSelection ? columnsWithSelect : tableData.columns}
          renderItem={(item, column) => {
            switch (column.key) {
              case 'company':
                return (
                  <Value
                    defaultValue={item.company}
                    render={(value, onChange) => (
                      <input
                        type="text"
                        value={value}
                        onChange={() => onChange(event.target.value)}
                      />
                    )}
                  />
                );
              case 'checkbox':
                return (
                  <CheckboxInput
                    isChecked={getIsRowSelected(item.key)}
                    onChange={() => toggleRow(item.key)}
                  />
                );
              default:
                return item[column.key];
            }
          }}
          onRowClick={
            onRowClick
              ? (item, index) =>
                  alert(`Clicked on item[${index}]: ${item.name}`)
              : null
          }
          tableMaxHeight={number('tableMaxHeight', 0, {
            range: true,
            min: 200,
            max: 500,
            step: 10,
          })}
          tableMaxWidth={number('tableMaxWidth', 0, {
            range: true,
            min: 200,
            max: 800,
            step: 10,
          })}
          cellAlignment={select('cellAlignment', ['left', 'center', 'right'])}
          isCondensed={boolean('isCondensed', false)}
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
                updateColumn={column => handleUpdateColumn(column, colIndex)}
                column={col}
              />
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  });
