import { render, fireEvent, screen } from '@testing-library/react';
import useDataTableSortingState from './use-data-table-sorting-state';

const TestComponent = () => {
  const tableSorting = useDataTableSortingState();

  return (
    <>
      <div>
        Sorting: {`${tableSorting.value.key}:${tableSorting.value.order}`}
      </div>
      <button
        type="button"
        onClick={() => tableSorting.onChange('name', 'asc')}
        aria-label="Change sorting"
      >
        Change sorting
      </button>
    </>
  );
};

describe('sorting', () => {
  it('should default sorting and allow changing order and key', async () => {
    render(<TestComponent />);
    expect(screen.getByText(/Sorting: createdAt:desc/)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/Change sorting/));
    expect(screen.getByText(/Sorting: name:asc/)).toBeInTheDocument();
  });
});
