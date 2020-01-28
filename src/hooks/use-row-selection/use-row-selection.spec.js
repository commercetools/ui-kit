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
  const rendered = render(<TestComponent items={testData} />);

  testData.forEach(item => {
    expect(rendered.queryByTestId(item.key)).toHaveTextContent('false');
  });
});

it('should be possible to toggle a row selection state', () => {
  const rendered = render(<TestComponent items={testData} />);

  expect(rendered.queryByTestId('system-crasher')).toHaveTextContent('false');

  rendered.queryByTestId('toggle system-crasher').click();
  expect(rendered.queryByTestId('system-crasher')).toHaveTextContent('true');
});

it('should be possible to select a row', () => {
  const rendered = render(<TestComponent items={testData} />);

  expect(rendered.queryByTestId('system-crasher')).toHaveTextContent('false');

  rendered.queryByTestId('select system-crasher').click();
  expect(rendered.queryByTestId('system-crasher')).toHaveTextContent('true');
});

it('should be possible to deselect a row', () => {
  const rendered = render(<TestComponent items={testData} />);

  rendered.queryByTestId('select system-crasher').click();
  expect(rendered.queryByTestId('system-crasher')).toHaveTextContent('true');

  rendered.queryByTestId('deselect system-crasher').click();
  expect(rendered.queryByTestId('system-crasher')).toHaveTextContent('false');
});

it('should get the correct count of selected rows', () => {
  const rendered = render(<TestComponent items={testData} />);

  expect(rendered.queryByTestId('selectedCount')).toHaveTextContent('0');

  rendered.queryByTestId('select system-crasher').click();

  expect(rendered.queryByTestId('selectedCount')).toHaveTextContent('1');

  rendered.queryByTestId('select birds-of-passage').click();

  expect(rendered.queryByTestId('selectedCount')).toHaveTextContent('2');

  rendered.queryByTestId('deselect system-crasher').click();

  expect(rendered.queryByTestId('selectedCount')).toHaveTextContent('1');
});

it('should be possible to select all rows', () => {
  const rendered = render(<TestComponent items={testData} />);

  rendered.queryByTestId('selectAll').click();

  expect(rendered.queryByTestId('selectedCount')).toHaveTextContent('3');

  testData.forEach(item => {
    expect(rendered.queryByTestId(item.key)).toHaveTextContent('true');
  });
});

it('should be possible to deselect all rows', () => {
  const rendered = render(<TestComponent items={testData} />);

  rendered.queryByTestId('selectAll').click();

  expect(rendered.queryByTestId('selectedCount')).toHaveTextContent('3');

  rendered.queryByTestId('deselectAll').click();

  expect(rendered.queryByTestId('selectedCount')).toHaveTextContent('0');

  testData.forEach(item => {
    expect(rendered.queryByTestId(item.key)).toHaveTextContent('false');
  });
});
