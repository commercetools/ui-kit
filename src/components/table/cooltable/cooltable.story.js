import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import Readme from '../README.md';
import CoolTable from './cooltable';

const staticItems = [
  {
    key: 'camilo-jimenez',
    checked: false,
    name: 'Camilo Jimenez',
    role: 'Team lead',
    nationality: 'Australian',
    age: 12,
    ':-)':
      'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
  },
  {
    key: 'jennifer-wong',
    checked: false,
    name: 'Jennifer Wong',
    role: 'UX Designer',
    nationality: 'American',
    age: 11,
    ':-)':
      'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
  },
  {
    key: 'adnan-asani',
    checked: false,
    name: 'Adnan Asani',
    role: 'Developer',
    nationality: 'Swedish',
    age: 14,
    ':-)':
      'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
  },
  {
    key: 'josh-bones',
    checked: false,
    name: 'Josh Bones',
    role: 'Developer',
    nationality: 'Australian',
    age: 12,
    ':-)':
      'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
  },
  {
    key: 'sven-heckler',
    checked: false,
    name: 'Sven Heckler',
    role: 'UI Designer',
    nationality: 'German',
    age: 10,
    ':-)':
      'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
  },
  {
    key: 'luis-gomes',
    checked: false,
    name: 'Luis Gomes',
    role: 'Developer',
    nationality: 'Brazilian',
    age: 9,
    ':-)':
      'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
  },
  {
    key: 'nicola-molinari',
    checked: false,
    name: 'Nicola Molinari',
    role: 'Developer',
    nationality: 'Italian',
    age: 11,
    ':-)':
      'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
  },
  {
    key: 'dominik-ferber',
    checked: false,
    name: 'Dominik Ferber',
    role: 'Developer',
    nationality: 'German',
    age: 4,
    ':-)':
      'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
  },
  {
    key: 'philipp-sporrer',
    checked: false,
    name: 'Philipp Sporrer',
    role: 'Developer',
    nationality: 'German',
    age: 7,
    ':-)':
      'asdsadsadsa dsa dsa dsa \n dsad asd sa \n dsa dsa \n d sadsadsadasdsa dsads',
  },
];

class AgeInput extends React.Component {
  static displayName = 'AgeInput';
  static propTypes = {
    age: PropTypes.number,
  };
  state = {
    age: this.props.age,
  };
  render() {
    return (
      <div>
        <input
          type="number"
          value={this.state.age}
          onChange={event => {
            this.setState({ age: event.target.value });
          }}
        />
        {this.state.age}
      </div>
    );
  }
}

class RoleInput extends React.Component {
  static displayName = 'RoleInput';
  static propTypes = {
    role: PropTypes.string.isRequired,
  };
  static defaultProps = {
    role: '',
  };
  state = {
    role: this.props.role,
  };
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.role}
          onChange={event => {
            this.setState({ role: event.target.value });
          }}
        />
        {this.state.age}
      </div>
    );
  }
}

// Basic example
class BaseTableExample extends React.Component {
  static displayName = 'BaseTableExample';
  state = {
    sortDirection: undefined,
    items: staticItems,
  };

  // Move to own component
  columns = [
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
      <div style={{ padding: '20px' }}>
        <div
          style={{
            backgroundColor: 'lightgray',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          <h2>Toolbox</h2>
          <button
            onClick={() => {
              const moreItems = Array.from({ length: 500 }).map((x, i) => {
                const index = this.state.items.length + i;
                return {
                  key: `camilo-jimenez-${index}`,
                  checked: false,
                  name: `Camilo Jimenez ${index}`,
                  role: 'Team lead',
                  nationality: 'Australian',
                  age: 12,
                  ':-)': index,
                };
              });

              this.setState(prevState => ({
                items: [...prevState.items, ...moreItems],
              }));
            }}
          >
            Add 500 Items
          </button>
          <p>{this.state.items.length} Items</p>
        </div>

        <CoolTable
          columns={this.columns}
          items={this.state.items}
          renderItem={({ item, column /* rowIndex, columnIndex */ }) => {
            switch (column.key) {
              case 'age':
                return <AgeInput age={item.age} />;
              case 'role':
                return <RoleInput role={item.role} />;
              default:
                return item[column.key];
            }
          }}
          maxHeight={number('maxHeight', 0, {
            range: true,
            min: 0,
            max: 1000,
            step: 1,
          })}
          onRowClick={action('row click')}
        />
      </div>
    );
  }
}

storiesOf('Table', module)
  .addDecorator(withKnobs)
  .addDecorator(withReadme(Readme))
  .add('cool table', () => <BaseTableExample />);
