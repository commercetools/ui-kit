import React from 'react';
import { render } from '../../../../test/test-utils';
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
    isTruncated: true,
  },
  {
    key: 'year',
    label: 'Year',
    isTruncated: true,
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

  it('should be able to find headers by the data-testid', () => {
    const rendered = render(<DataTable {...baseProps} />);

    expect(rendered.queryByTestId('header-title')).toBeInTheDocument();
    expect(rendered.queryByTestId('header-year')).toBeInTheDocument();
  });

  it('should be able to find cells by the data-testid', () => {
    const rendered = render(<DataTable {...baseProps} />);

    expect(rendered.queryByTestId('cell-0-title')).toBeInTheDocument();
    expect(rendered.queryByTestId('cell-1-title')).toBeInTheDocument();
    expect(rendered.queryByTestId('cell-2-title')).toBeInTheDocument();
    expect(rendered.queryByTestId('cell-0-year')).toBeInTheDocument();
  });

  it('should render item fields which have corresponding column keys', () => {
    const rendered = render(<DataTable {...baseProps} />);

    expect(rendered.queryByText('Woman At War')).toBeInTheDocument();
    expect(rendered.queryByText('2018')).toBeInTheDocument();
    expect(rendered.queryByText('2-woman')).not.toBeInTheDocument();
  });

  it('should render only one expand-collapse button per row', () => {
    const rendered = render(<DataTable {...baseProps} />);
    /**
     * Even though two columns are marked as truncatable in each row, only one button should be shown
     * per row, which controls the expand and collapse of its whole row.
     * Since we have only three rows, it should render only three row expand-collapse buttons
     */
    const rowExpandCollapseButtons = rendered.queryAllByLabelText(
      /Expand\/Collapse Row/i
    );
    expect(rowExpandCollapseButtons).toHaveLength(3);
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
