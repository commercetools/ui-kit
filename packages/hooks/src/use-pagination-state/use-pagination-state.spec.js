import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Spacings, PrimaryButton } from '@commercetools-frontend/ui-kit';
import usePaginationState from './use-pagination-state';

const TestComponent = () => {
  const { page, perPage } = usePaginationState();

  return (
    <>
      <ul>
        <li>Per page: {perPage.value}</li>
        <li>Page: {page.value}</li>
      </ul>
      <Spacings.Stack>
        <PrimaryButton
          onClick={() => perPage.onChange(50)}
          label="Change per page"
        />
        <PrimaryButton
          onClick={() => page.onChange(page.value + 1)}
          label="Change page"
        />
      </Spacings.Stack>
    </>
  );
};

describe('per page', () => {
  it('should default per page and allow increasing page size', async () => {
    render(<TestComponent />);
    expect(screen.getByText(/Per page: 20/)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/Change per page/));
    expect(screen.getByText(/Per page: 50/)).toBeInTheDocument();
  });
  describe('when changing per page', () => {
    it('should reset page state', () => {
      render(<TestComponent />);
      // update page state
      expect(screen.getByText(/Page: 1/)).toBeInTheDocument();
      fireEvent.click(screen.getByLabelText(/Change page/));
      expect(screen.getByText(/Page: 2/)).toBeInTheDocument();

      // update per page
      // reset page
      fireEvent.click(screen.getByLabelText(/Change per page/));
      expect(screen.getByText(/Page: 1/)).toBeInTheDocument();
    });
  });
});

describe('page', () => {
  it('should default page and allow moving to next page', async () => {
    render(<TestComponent />);
    expect(screen.getByText(/Page: 1/)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/Change page/));
    expect(screen.getByText(/Page: 2/)).toBeInTheDocument();
  });
});
