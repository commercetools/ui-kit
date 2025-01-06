/* eslint-disable react/prop-types */
import { screen, render, fireEvent } from '../../../../test/test-utils';
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
  render(<TestComponent keyName="checked" items={testData} />);

  testData.forEach((item) => {
    expect(screen.queryByTestId(item.id)).toHaveTextContent('false');
  });
});

it('should be possible to toggle a row selection state', () => {
  render(<TestComponent keyName="checked" items={testData} />);

  expect(screen.queryByTestId('system-crasher')).toHaveTextContent('false');

  fireEvent.click(screen.queryByTestId('toggle system-crasher'));
  expect(screen.queryByTestId('system-crasher')).toHaveTextContent('true');
});

it('should be possible to select a row', () => {
  render(<TestComponent keyName="checked" items={testData} />);

  expect(screen.queryByTestId('system-crasher')).toHaveTextContent('false');

  fireEvent.click(screen.queryByTestId('select system-crasher'));
  expect(screen.queryByTestId('system-crasher')).toHaveTextContent('true');
});

it('should be possible to deselect a row', () => {
  render(<TestComponent keyName="checked" items={testData} />);

  fireEvent.click(screen.queryByTestId('select system-crasher'));
  expect(screen.queryByTestId('system-crasher')).toHaveTextContent('true');

  fireEvent.click(screen.queryByTestId('deselect system-crasher'));
  expect(screen.queryByTestId('system-crasher')).toHaveTextContent('false');
});

it('should get the correct count of selected rows', () => {
  render(<TestComponent keyName="checked" items={testData} />);

  expect(screen.queryByTestId('selectedCount')).toHaveTextContent('0');

  fireEvent.click(screen.queryByTestId('select system-crasher'));

  expect(screen.queryByTestId('selectedCount')).toHaveTextContent('1');

  fireEvent.click(screen.queryByTestId('select birds-of-passage'));

  expect(screen.queryByTestId('selectedCount')).toHaveTextContent('2');

  fireEvent.click(screen.queryByTestId('deselect system-crasher'));

  expect(screen.queryByTestId('selectedCount')).toHaveTextContent('1');
});

it('should be possible to select all rows', () => {
  render(<TestComponent keyName="checked" items={testData} />);

  fireEvent.click(screen.queryByTestId('selectAll'));

  expect(screen.queryByTestId('selectedCount')).toHaveTextContent('3');

  testData.forEach((item) => {
    expect(screen.queryByTestId(item.id)).toHaveTextContent('true');
  });
});

it('should be possible to deselect all rows', () => {
  render(<TestComponent keyName="checked" items={testData} />);

  fireEvent.click(screen.queryByTestId('selectAll'));

  expect(screen.queryByTestId('selectedCount')).toHaveTextContent('3');

  fireEvent.click(screen.queryByTestId('deselectAll'));

  expect(screen.queryByTestId('selectedCount')).toHaveTextContent('0');

  testData.forEach((item) => {
    expect(screen.queryByTestId(item.id)).toHaveTextContent('false');
  });
});

it('should respect existing selectable key values', () => {
  const customRows = [
    { id: 'system-crasher', selected: false },
    { id: 'birds-of-passage', selected: true },
    { id: 'woman-at-war' },
  ];

  render(<TestComponent keyName="selected" items={customRows} />);

  expect(screen.queryByTestId('system-crasher')).toHaveTextContent('false');
  expect(screen.queryByTestId('birds-of-passage')).toHaveTextContent('true');
  expect(screen.queryByTestId('woman-at-war')).toHaveTextContent('false');
});
