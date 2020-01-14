import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean, select } from '@storybook/addon-knobs';
import { Value } from 'react-value';
import SimpleTable from './simple-table';

/* generated from https://next.json-generator.com with input:
[
  {
    'repeat(9, 10)': {
      key: '{{objectId()}}',
      checked: false,
      name: '{{firstName()}} {{surname()}}',
      company: '{{company().toUpperCase()}}',
      phone: '+1 {{phone()}}',
      age: '{{integer(20, 40)}}',
      about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.'
    }
  }
]
*/
const items = [
  {
    key: '5e188c29791747d9c54250e2',
    checked: false,
    name: 'Morgan Bean',
    company: 'CYCLONICA',
    phone: '+1 (895) 529-3300',
    age: 23,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c295ae0bb19afbb115f',
    checked: false,
    name: 'Franklin Cochran',
    company: 'TINGLES',
    phone: '+1 (835) 571-3268',
    age: 36,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c298f0ea901553c517f',
    checked: false,
    name: 'Salazar Craig',
    company: 'ECRAZE',
    phone: '+1 (944) 445-2594',
    age: 21,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c29b09bb748df833ed0',
    checked: false,
    name: 'Pamela Noble',
    company: 'FILODYNE',
    phone: '+1 (875) 421-3328',
    age: 34,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c29bc14e3b97ab2ad7d',
    checked: false,
    name: 'Terra Morrow',
    company: 'DAISU',
    phone: '+1 (807) 436-2026',
    age: 30,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c296c9b7cf486a0479c',
    checked: false,
    name: 'Cline Hansen',
    company: 'ULTRIMAX',
    phone: '+1 (934) 402-3675',
    age: 21,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c29b45c669d8e60303f',
    checked: true,
    name: 'Jefferson Rosario',
    company: 'COMTOURS',
    phone: '+1 (874) 437-2581',
    age: 32,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c29ca865647af147b4a',
    checked: false,
    name: 'Tania Waller',
    company: 'DOGSPA',
    phone: '+1 (964) 585-3040',
    age: 35,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c2910b83f907e9c66ab',
    checked: false,
    name: 'Butler Shepard',
    company: 'HOUSEDOWN',
    phone: '+1 (888) 434-2153',
    age: 21,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
  {
    key: '5e188c29a9ece9123d6a87a1',
    checked: false,
    name: 'Diana Wise',
    company: 'SPEEDBOLT',
    phone: '+1 (992) 535-2912',
    age: 27,
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu dictum varius duis at consectetur lorem donec.',
  },
];

const columns = [
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
                  <div>
                    <input
                      type="number"
                      value={value}
                      onChange={() => onChange(event.target.value)}
                    />
                    <div>{value}</div>
                  </div>
                )}
              />
            );
          case 'company':
            return (
              <Value
                defaultValue={item.company}
                render={(value, onChange) => (
                  <div>
                    <input
                      type="text"
                      value={value}
                      onChange={() => onChange(event.target.value)}
                    />
                    <div>{value}</div>
                  </div>
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
