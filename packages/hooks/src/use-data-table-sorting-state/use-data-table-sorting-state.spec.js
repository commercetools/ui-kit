import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
    const rendered = render(<TestComponent />);
    expect(rendered.getByText(/Sorting: createdAt:desc/)).toBeInTheDocument();
    fireEvent.click(rendered.getByLabelText(/Change sorting/));
    expect(rendered.getByText(/Sorting: name:asc/)).toBeInTheDocument();
  });
});
