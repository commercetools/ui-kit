import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean, select } from '@storybook/addon-knobs';
import { Value } from 'react-value';
import SimpleTable from './simple-table';

const items = [
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

const columns = [
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
  },
];

storiesOf('Components|Table (NEW)', module)
  .addDecorator(withKnobs)
  // .addDecorator(withReadme(Readme))
  .add('SimpleTable', () => (
    <SimpleTable
      items={items}
      columns={columns}
      renderItem={({ item, column }) => {
        switch (column.key) {
          case 'age':
            return (
              <Value
                defaultValue={item.age}
                render={(value, onChange) => (
                  <input
                    type="number"
                    value={value}
                    onChange={() => onChange(event.target.value)}
                  />
                )}
              />
            );
          case 'role':
            return (
              <Value
                defaultValue={item.role}
                render={(value, onChange) => (
                  <input
                    type="text"
                    value={value}
                    onChange={() => onChange(event.target.value)}
                  />
                )}
              />
            );
          default:
            return item[column.key];
        }
      }}
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
  ));
