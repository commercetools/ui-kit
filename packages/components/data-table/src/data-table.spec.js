import { screen, render, within } from '../../../../test/test-utils';
import DataTable from '.';
import IconButton from '../../buttons/icon-button';
import { InformationIcon } from '../../icons';

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
    const { container } = render(<DataTable {...baseProps} data-foo="bar" />);
    expect(container.querySelector("[data-foo='bar']")).toBeInTheDocument();
  });

  it('should render the column labels', () => {
    render(<DataTable {...baseProps} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
  });

  it('should be able to find headers by the data-testid', () => {
    render(<DataTable {...baseProps} />);

    expect(screen.getByTestId('header-title')).toBeInTheDocument();
    expect(screen.getByTestId('header-year')).toBeInTheDocument();
  });

  it('should be able to find headers by the data-id', () => {
    const rendered = render(<DataTable {...baseProps} />);
    expect(
      rendered.container.querySelector('[data-id="title"]')
    ).toBeInTheDocument();
    expect(
      rendered.container.querySelector('[data-id="year"]')
    ).toBeInTheDocument();
  });

  it('should be able to find cells by the data-testid', () => {
    render(<DataTable {...baseProps} />);

    expect(screen.getByTestId('cell-0-title')).toBeInTheDocument();
    expect(screen.getByTestId('cell-1-title')).toBeInTheDocument();
    expect(screen.getByTestId('cell-2-title')).toBeInTheDocument();
    expect(screen.getByTestId('cell-0-year')).toBeInTheDocument();
  });

  it('should render item fields which have corresponding column keys', () => {
    render(<DataTable {...baseProps} />);

    expect(screen.getByText('Woman At War')).toBeInTheDocument();
    expect(screen.getByText('2018')).toBeInTheDocument();
    expect(screen.queryByText('2-woman')).not.toBeInTheDocument();
  });

  it('should render only one expand-collapse button per row', () => {
    render(<DataTable {...baseProps} />);
    /**
     * Even though two columns are marked as truncatable in each row, only one button should be shown
     * per row, which controls the expand and collapse of its whole row.
     * Since we have only three rows, it should render only three row expand-collapse buttons
     */
    const rowExpandCollapseButtons =
      screen.queryAllByLabelText(/Expand\/Collapse Row/i);
    expect(rowExpandCollapseButtons).toHaveLength(3);
  });

  describe('when using a custom itemRenderer', () => {
    it('should render the item cells with the custom renderer', () => {
      const customRenderer = (item, column) => (
        <div data-testid="custom-wrapper">{item[column.key]}</div>
      );

      render(<DataTable {...baseProps} itemRenderer={customRenderer} />);
      const numberOfRenderedItemCells =
        baseProps.rows.length * baseProps.columns.length;

      // assert that we find our custom wrapper for every item cell
      expect(screen.queryAllByTestId('custom-wrapper')).toHaveLength(
        numberOfRenderedItemCells
      );
    });
  });

  it('should allow rendering a footer', () => {
    render(<DataTable {...baseProps} footer="This is in the footer" />);

    const footerElement = screen.getByTestId('footer');

    expect(footerElement).toHaveTextContent('This is in the footer');
  });

  describe('when setting an action for onRowClick', () => {
    // we will be expecting this mock function to be called with (row: object, rowIndex: number)
    const rowClickEvent = jest.fn();
    it('should call the action on clicking a row', () => {
      render(<DataTable {...baseProps} onRowClick={rowClickEvent} />);

      screen.getByText('Parasite').click();
      expect(rowClickEvent).toHaveBeenLastCalledWith(
        { id: '1-parasite', title: 'Parasite', year: 2019 },
        0, // first row / index 0
        'title'
      );

      screen.getByText('Woman At War').click();
      expect(rowClickEvent).toHaveBeenLastCalledWith(
        { id: '2-woman', title: 'Woman At War', year: 2018 },
        1, // second row / index 1
        'title'
      );
    });

    it('should ignore row click for columns with such option enabled', () => {
      const testColumnsWithIgnoreRowClick = [
        ...testColumns,
        { key: 'id', label: 'ID', shouldIgnoreRowClick: true },
      ];
      render(
        <DataTable
          rows={testRows}
          columns={testColumnsWithIgnoreRowClick}
          onRowClick={rowClickEvent}
        />
      );

      // Click the same row twice

      // Click a column that ignores row clicks
      screen.getByText('1-parasite').click();
      expect(rowClickEvent).not.toHaveBeenCalled();

      // Click a column that doesn't ignore row clicks
      screen.getByText('Parasite').click();

      expect(rowClickEvent).toHaveBeenCalledTimes(1);
    });
  });

  describe('when passing a headerIcon on a column', () => {
    const testColumnsWithHeaderIcon = [
      ...testColumns,
      {
        key: 'id',
        label: 'ID',
        headerIcon: (
          <IconButton
            icon={<InformationIcon />}
            label="ID Info"
            size="30"
            onClick={() => jest.fn()}
          />
        ),
      },
    ];
    it('should render the IconButton on the column header', () => {
      render(<DataTable {...baseProps} columns={testColumnsWithHeaderIcon} />);

      const idHeader = screen.getByTestId('header-id');

      expect(within(idHeader).getByLabelText('ID Info')).toBeInTheDocument();
    });
  });
});
