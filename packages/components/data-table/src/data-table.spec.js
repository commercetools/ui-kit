import React from 'react';
import { render } from '../../../../src/test-utils';
import DataTable from '.';

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

describe('DataTable', () => {
  it('should forward data-attributes', () => {
    const rendered = render(<DataTable {...baseProps} data-foo="bar" />);
    expect(
      rendered.container.querySelector("[data-foo='bar']")
    ).toBeInTheDocument();
  });

  it('should render the column labels', () => {
    const rendered = render(<DataTable {...baseProps} />);

    expect(rendered.queryByText('Title')).toBeInTheDocument();
    expect(rendered.queryByText('Year')).toBeInTheDocument();
  });

  it('should render item fields which have corresponding column keys', () => {
    const rendered = render(<DataTable {...baseProps} />);

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
        <DataTable {...baseProps} itemRenderer={customRenderer} />
      );
      const numberOfRenderedItemCells =
        baseProps.rows.length * baseProps.columns.length;

      // assert that we find our custom wrapper for every item cell
      expect(rendered.queryAllByTestId('custom-wrapper')).toHaveLength(
        numberOfRenderedItemCells
      );
    });
  });

  it('should allow rendering a footer', () => {
    const rendered = render(
      <DataTable {...baseProps} footer="This is in the footer" />
    );

    const footerElement = rendered.container.querySelector('tfoot');

    expect(footerElement.textContent).toBe('This is in the footer');
  });

  describe('when setting an action for onRowClick', () => {
    // we will be expecting this mock function to be called with (row: object, rowIndex: number)
    const rowClickEvent = jest.fn();
    it('should call the action on clicking a row', () => {
      const rendered = render(
        <DataTable {...baseProps} onRowClick={rowClickEvent} />
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

    it('should ignore row click for columns with such option enabled', () => {
      const testColumnsWithIgnoreRowClick = [
        ...testColumns,
        { key: 'id', label: 'ID', shouldIgnoreRowClick: true },
      ];
      const rendered = render(
        <DataTable
          rows={testRows}
          columns={testColumnsWithIgnoreRowClick}
          onRowClick={rowClickEvent}
        />
      );

      // Click the same row twice

      // Click a column that ignores row clicks
      rendered.getByText('1-parasite').click();
      expect(rowClickEvent).not.toHaveBeenCalled();

      // Click a column that doesn't ignore row clicks
      rendered.getByText('Parasite').click();

      expect(rowClickEvent).toHaveBeenCalledTimes(1);
    });
  });
});
