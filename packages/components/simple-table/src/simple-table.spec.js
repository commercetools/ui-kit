import React from 'react';
import { render } from '../../../../src/test-utils';
import SimpleTable from '.';

const testRows = [
  { id: '1-parasite', title: 'Parasite', year: 2019 },
  { id: '2-woman', title: 'Woman At War', year: 2018 },
  { id: '3-gems', title: 'Uncut Gems', year: 2019 },
];

const testColumns = [
  {
    key: 'title',
    label: 'Title',
  },
  {
    key: 'year',
    label: 'Year',
  },
];

const baseProps = { rows: testRows, columns: testColumns };

describe('SimpleTable', () => {
  it('should forward data-attributes', () => {
    const { container } = render(<SimpleTable {...baseProps} data-foo="bar" />);
    expect(container.querySelector("[data-foo='bar']")).toBeInTheDocument();
  });

  it('should render the column labels', () => {
    const { queryByText } = render(<SimpleTable {...baseProps} />);

    expect(queryByText('Title')).toBeInTheDocument();
    expect(queryByText('Year')).toBeInTheDocument();
  });

  it('should render item fields which have corresponding column keys', () => {
    const { queryByText } = render(<SimpleTable {...baseProps} />);

    expect(queryByText('Woman At War')).toBeInTheDocument();
    expect(queryByText('2018')).toBeInTheDocument();
    expect(queryByText('2-woman')).not.toBeInTheDocument();
  });

  describe('when using a custom itemRenderer', () => {
    it('should render the item cells with the custom renderer', () => {
      const customRenderer = (item, column) => (
        <div data-testid="custom-wrapper">{item[column.key]}</div>
      );

      const { queryAllByTestId } = render(
        <SimpleTable {...baseProps} itemRenderer={customRenderer} />
      );
      const numberOfRenderedItemCells =
        baseProps.rows.length * baseProps.columns.length;

      // assert that we find our custom wrapper for every item cell
      expect(queryAllByTestId('custom-wrapper')).toHaveLength(
        numberOfRenderedItemCells
      );
    });
  });
});

describe('when setting an action for onRowClick', () => {
  it('should call the action on clicking a row', () => {
    // we will be expecting this mock function to be called with (row: object, rowIndex: number)
    const rowClickEvent = jest.fn();

    const { getByText } = render(
      <SimpleTable {...baseProps} onRowClick={rowClickEvent} />
    );

    getByText('Parasite').click();
    expect(rowClickEvent).toHaveBeenLastCalledWith(
      { id: '1-parasite', title: 'Parasite', year: 2019 },
      0 // first row / index 0
    );

    getByText('Woman At War').click();
    expect(rowClickEvent).toHaveBeenLastCalledWith(
      { id: '2-woman', title: 'Woman At War', year: 2018 },
      1 // second row / index 1
    );
  });
});
