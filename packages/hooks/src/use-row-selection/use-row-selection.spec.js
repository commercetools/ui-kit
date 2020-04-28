/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '../../../../test/test-utils';
import useRowSelection from './use-row-selection';

const testData = [
  { id: 'system-crasher' },
  { id: 'birds-of-passage' },
  { id: 'woman-at-war' },
];

const TestComponent = (props) => {
  const {
    rows,
    toggleRow,
    selectRow,
    deselectRow,
    selectAllRows,
    deselectAllRows,
    getIsRowSelected,
    getNumberOfSelectedRows,
  } = useRowSelection(props.keyName, props.items);

  return (
    <div>
      <button data-testid={'selectAll'} onClick={selectAllRows}>
        Select All
      </button>
      <button data-testid={'deselectAll'} onClick={deselectAllRows}>
        deselect All
      </button>
      <span data-testid={'selectedCount'}>{getNumberOfSelectedRows()}</span>
      <div>
        {rows.map((item) => (
          <div key={item.id}>
            <span data-testid={item.id}>
              {getIsRowSelected(item.id).toString()}
            </span>
            <button
              data-testid={`toggle ${item.id}`}
              onClick={() => toggleRow(item.id)}
            >
              Toggle
            </button>
            <button
              data-testid={`select ${item.id}`}
              onClick={() => selectRow(item.id)}
            >
              Select
            </button>
            <button
              data-testid={`deselect ${item.id}`}
              onClick={() => deselectRow(item.id)}
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
  const rendered = render(<TestComponent keyName="checked" items={testData} />);

  testData.forEach((item) => {
    expect(rendered.queryByTestId(item.id)).toHaveTextContent('false');
  });
});

it('should be possible to toggle a row selection state', () => {
  const rendered = render(<TestComponent keyName="checked" items={testData} />);

  expect(rendered.queryByTestId('system-crasher')).toHaveTextContent('false');

  rendered.queryByTestId('toggle system-crasher').click();
  expect(rendered.queryByTestId('system-crasher')).toHaveTextContent('true');
});

it('should be possible to select a row', () => {
  const rendered = render(<TestComponent keyName="checked" items={testData} />);

  expect(rendered.queryByTestId('system-crasher')).toHaveTextContent('false');

  rendered.queryByTestId('select system-crasher').click();
  expect(rendered.queryByTestId('system-crasher')).toHaveTextContent('true');
});

it('should be possible to deselect a row', () => {
  const rendered = render(<TestComponent keyName="checked" items={testData} />);

  rendered.queryByTestId('select system-crasher').click();
  expect(rendered.queryByTestId('system-crasher')).toHaveTextContent('true');

  rendered.queryByTestId('deselect system-crasher').click();
  expect(rendered.queryByTestId('system-crasher')).toHaveTextContent('false');
});

it('should get the correct count of selected rows', () => {
  const rendered = render(<TestComponent keyName="checked" items={testData} />);

  expect(rendered.queryByTestId('selectedCount')).toHaveTextContent('0');

  rendered.queryByTestId('select system-crasher').click();

  expect(rendered.queryByTestId('selectedCount')).toHaveTextContent('1');

  rendered.queryByTestId('select birds-of-passage').click();

  expect(rendered.queryByTestId('selectedCount')).toHaveTextContent('2');

  rendered.queryByTestId('deselect system-crasher').click();

  expect(rendered.queryByTestId('selectedCount')).toHaveTextContent('1');
});

it('should be possible to select all rows', () => {
  const rendered = render(<TestComponent keyName="checked" items={testData} />);

  rendered.queryByTestId('selectAll').click();

  expect(rendered.queryByTestId('selectedCount')).toHaveTextContent('3');

  testData.forEach((item) => {
    expect(rendered.queryByTestId(item.id)).toHaveTextContent('true');
  });
});

it('should be possible to deselect all rows', () => {
  const rendered = render(<TestComponent keyName="checked" items={testData} />);

  rendered.queryByTestId('selectAll').click();

  expect(rendered.queryByTestId('selectedCount')).toHaveTextContent('3');

  rendered.queryByTestId('deselectAll').click();

  expect(rendered.queryByTestId('selectedCount')).toHaveTextContent('0');

  testData.forEach((item) => {
    expect(rendered.queryByTestId(item.id)).toHaveTextContent('false');
  });
});

it('should respect existing selectable key values', () => {
  const customRows = [
    { id: 'system-crasher', selected: false },
    { id: 'birds-of-passage', selected: true },
    { id: 'woman-at-war' },
  ];

  const rendered = render(
    <TestComponent keyName="selected" items={customRows} />
  );

  expect(rendered.queryByTestId('system-crasher')).toHaveTextContent('false');
  expect(rendered.queryByTestId('birds-of-passage')).toHaveTextContent('true');
  expect(rendered.queryByTestId('woman-at-war')).toHaveTextContent('false');
});
