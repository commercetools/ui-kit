import React from 'react';
import { Table } from 'ui-kit';
import { Suite, Spec } from '../../../test/percy';

export const routePath = '/table';

const baseColumns = onCheckboxClick => [
  {
    key: 'checkbox',
    label: 'Checkbox',
    onClick: onCheckboxClick,
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'role',
    label: 'Role',
  },
  {
    key: 'nationality',
    label: 'Nationality',
  },
  {
    key: 'age',
    label: 'Age',
    align: 'right',
  },
  {
    key: ':-)',
    label: ':-)',
    align: 'center',
  },
];

// Basic example
class BaseTable extends React.PureComponent {
  static displayName = 'BaseTable';
  state = {
    rows: [
      {
        checked: false,
        name: 'Camilo Jimenez',
        role: 'Team lead',
        nationality: 'Australian',
        age: 12,
        ':-)':
          'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
      },
      {
        checked: false,
        name: 'Jennifer Wong',
        role: 'UX Designer',
        nationality: 'American',
        age: 11,
        ':-)':
          'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
      },
      {
        checked: false,
        name: 'Adnan Asani',
        role: 'Developer',
        nationality: 'Swedish',
        age: 14,
        ':-)':
          'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
      },
      {
        checked: false,
        name: 'Josh Bones',
        role: 'Developer',
        nationality: 'Australian',
        age: 12,
        ':-)':
          'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
      },
      {
        checked: false,
        name: 'Sven Heckler',
        role: 'UI Designer',
        nationality: 'German',
        age: 10,
        ':-)':
          'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
      },
      {
        checked: false,
        name: 'Luis Gomes',
        role: 'Developer',
        nationality: 'Brazilian',
        age: 9,
        ':-)':
          'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
      },
      {
        checked: false,
        name: 'Nicola Molinari',
        role: 'Developer',
        nationality: 'Italian',
        age: 11,
        ':-)':
          'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
      },
      {
        checked: false,
        name: 'Dominik Ferber',
        role: 'Developer',
        nationality: 'German',
        age: 4,
        ':-)':
          'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
      },
      {
        checked: false,
        name: 'Philipp Sporrer',
        role: 'Developer',
        nationality: 'German',
        age: 7,
        ':-)':
          'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
      },
    ],
    sortDirection: undefined,
  };

  // Move to own component
  columns = baseColumns(this.onCheckboxClick);

  renderItem = ({ rowIndex, columnIndex }) => {
    const col = this.columns[columnIndex];
    const item = this.state.rows[rowIndex];
    if (columnIndex === 0)
      return (
        <input
          type="checkbox"
          checked={item.checked}
          name={`${item.id}-select`}
        />
      );
    return <div>{item[col.key]}</div>;
  };

  onCheckboxClick = ({ rowIndex /* , columnKey */ }) => {
    this.setState(prevState => ({
      rows: [
        ...prevState.rows.slice(0, rowIndex),
        {
          ...prevState.rows[rowIndex],
          checked: !prevState.rows[rowIndex].checked,
        },
        ...prevState.rows.slice(rowIndex + 1),
      ],
    }));
  };

  render() {
    return (
      <Suite>
        <Spec label="Basic example" omitPropsList>
          <Table
            columns={this.columns}
            rowCount={this.state.rows.length}
            itemRenderer={this.renderItem}
            shouldFillRemainingVerticalSpace={true}
            items={this.state.rows}
          />
        </Spec>
      </Suite>
    );
  }
}

export const component = BaseTable;
