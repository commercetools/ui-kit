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
    const rendered = render(<SimpleTable {...baseProps} data-foo="bar" />);
    expect(
      rendered.container.querySelector("[data-foo='bar']")
    ).toBeInTheDocument();
  });

  it('should render the column labels', () => {
    const rendered = render(<SimpleTable {...baseProps} />);

    expect(rendered.queryByText('Title')).toBeInTheDocument();
    expect(rendered.queryByText('Year')).toBeInTheDocument();
  });

  it('should render item fields which have corresponding column keys', () => {
    const rendered = render(<SimpleTable {...baseProps} />);

    expect(rendered.queryByText('Woman At War')).toBeInTheDocument();
    expect(rendered.queryByText('2018')).toBeInTheDocument();
    expect(rendered.queryByText('2-woman')).not.toBeInTheDocument();
  });

  describe('when using a custom itemRenderer', () => {
    it('should render the item cells with the custom renderer', () => {
      const customRenderer = (item, column) => (
        <div data-testid="custom-wrapper">{item[column.key]}</div>
      );

      const rendered = render(
        <SimpleTable {...baseProps} itemRenderer={customRenderer} />
      );
      const numberOfRenderedItemCells =
        baseProps.rows.length * baseProps.columns.length;

      // assert that we find our custom wrapper for every item cell
      expect(rendered.queryAllByTestId('custom-wrapper')).toHaveLength(
        numberOfRenderedItemCells
      );
    });
  });
});

describe('when setting an action for onRowClick', () => {
  it('should call the action on clicking a row', () => {
    // we will be expecting this mock function to be called with (row: object, rowIndex: number)
    const rowClickEvent = jest.fn();

    const rendered = render(
      <SimpleTable {...baseProps} onRowClick={rowClickEvent} />
    );

    rendered.getByText('Parasite').click();
    expect(rowClickEvent).toHaveBeenLastCalledWith(
      { id: '1-parasite', title: 'Parasite', year: 2019 },
      0 // first row / index 0
    );

    rendered.getByText('Woman At War').click();
    expect(rowClickEvent).toHaveBeenLastCalledWith(
      { id: '2-woman', title: 'Woman At War', year: 2018 },
      1 // second row / index 1
    );
  });
});
