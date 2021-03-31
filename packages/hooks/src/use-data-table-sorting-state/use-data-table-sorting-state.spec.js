import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Spacings, PrimaryButton } from '@commercetools-frontend/ui-kit';
import useDataTableSortingState from './use-data-table-sorting-state';

const TestComponent = () => {
  const tableSorting = useDataTableSortingState();

  return (
    <>
      <div>
        Sorting: {`${tableSorting.value.key}:${tableSorting.value.order}`}
      </div>
      <Spacings.Stack>
        <PrimaryButton
          onClick={() => tableSorting.onChange('name', 'asc')}
          label="Change sorting"
        />
      </Spacings.Stack>
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
