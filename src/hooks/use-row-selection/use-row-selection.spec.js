import React from 'react';
import { render } from '../../test-utils';
import useRowSelection from './use-row-selection';

const testData = [
  { key: 'system-crasher' },
  { key: 'birds-of-passage' },
  { key: 'woman-at-war' },
];

const TestComponent = props => {
  const {
    rows,
    toggleRow,
    selectRow,
    deselectRow,
    selectAllRows,
    deselectAllRows,
    getIsRowSelected,
    getCountSelectedRows,
    // eslint-disable-next-line react/prop-types
  } = useRowSelection('selection', props.items);

  return (
    <div>
      <button data-testid={'selectAll'} onClick={selectAllRows}>
        Select All
      </button>
      <button data-testid={'deselectAll'} onClick={deselectAllRows}>
        deselect All
      </button>
      <span data-testid={'selectedCount'}>{getCountSelectedRows()}</span>
      <div>
        {rows.map(item => (
          <div key={item.key}>
            <span data-testid={item.key}>
              {getIsRowSelected(item.key).toString()}
            </span>
            <button
              data-testid={`toggle ${item.key}`}
              onClick={() => toggleRow(item.key)}
            >
              Toggle
            </button>
            <button
              data-testid={`select ${item.key}`}
              onClick={() => selectRow(item.key)}
            >
              Select
            </button>
            <button
              data-testid={`deselect ${item.key}`}
              onClick={() => deselectRow(item.key)}
            >
              Deselect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

it('should have no selected items by default', () => {
  const { getByTestId } = render(<TestComponent items={testData} />);

  testData.forEach(item => {
    expect(getByTestId(item.key)).toHaveTextContent('false');
  });
});

it('should be possible to toggle a row selection state', () => {
  const { getByTestId } = render(<TestComponent items={testData} />);

  expect(getByTestId('system-crasher')).toHaveTextContent('false');

  getByTestId('toggle system-crasher').click();
  expect(getByTestId('system-crasher')).toHaveTextContent('true');
});

it('should be possible to select a row', () => {
  const { getByTestId } = render(<TestComponent items={testData} />);

  expect(getByTestId('system-crasher')).toHaveTextContent('false');

  getByTestId('select system-crasher').click();
  expect(getByTestId('system-crasher')).toHaveTextContent('true');
});

it('should be possible to deselect a row', () => {
  const { getByTestId } = render(<TestComponent items={testData} />);

  getByTestId('select system-crasher').click();
  expect(getByTestId('system-crasher')).toHaveTextContent('true');

  getByTestId('deselect system-crasher').click();
  expect(getByTestId('system-crasher')).toHaveTextContent('false');
});

it('should get the correct count of selected rows', () => {
  const { getByTestId } = render(<TestComponent items={testData} />);

  expect(getByTestId('selectedCount')).toHaveTextContent('0');

  getByTestId('select system-crasher').click();

  expect(getByTestId('selectedCount')).toHaveTextContent('1');

  getByTestId('select birds-of-passage').click();

  expect(getByTestId('selectedCount')).toHaveTextContent('2');

  getByTestId('deselect system-crasher').click();

  expect(getByTestId('selectedCount')).toHaveTextContent('1');
});

it('should be possible to select all rows', () => {
  const { getByTestId } = render(<TestComponent items={testData} />);

  getByTestId('selectAll').click();

  expect(getByTestId('selectedCount')).toHaveTextContent('3');

  testData.forEach(item => {
    expect(getByTestId(item.key)).toHaveTextContent('true');
  });
});

it('should be possible to deselect all rows', () => {
  const { getByTestId } = render(<TestComponent items={testData} />);

  getByTestId('selectAll').click();

  expect(getByTestId('selectedCount')).toHaveTextContent('3');

  getByTestId('deselectAll').click();

  expect(getByTestId('selectedCount')).toHaveTextContent('0');

  testData.forEach(item => {
    expect(getByTestId(item.key)).toHaveTextContent('false');
  });
});
