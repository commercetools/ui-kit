import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
    const rendered = render(<TestComponent />);
    expect(rendered.getByText(/Per page: 20/)).toBeInTheDocument();
    fireEvent.click(rendered.getByLabelText(/Change per page/));
    expect(rendered.getByText(/Per page: 50/)).toBeInTheDocument();
  });
});

describe('page', () => {
  it('should default page and allow moving to next page', async () => {
    const rendered = render(<TestComponent />);
    expect(rendered.getByText(/Page: 1/)).toBeInTheDocument();
    fireEvent.click(rendered.getByLabelText(/Change page/));
    expect(rendered.getByText(/Page: 2/)).toBeInTheDocument();
  });
});
