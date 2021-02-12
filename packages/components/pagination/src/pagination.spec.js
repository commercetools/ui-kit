import React from 'react';
import { screen, render, fireEvent } from '../../../../test/test-utils';
import Pagination from './pagination';

const createTestProps = (custom) => ({
  totalItems: 60,
  currentPage: 1,
  onPageSizeChange: jest.fn(),
  onPageChange: jest.fn(),
  ...custom,
});

it('should render a page-size selector and a page navigator', () => {
  render(<Pagination {...createTestProps()} />);

  expect(screen.getByLabelText(/Items per page/)).toBeInTheDocument();
  expect(screen.getByLabelText('Page')).toHaveDisplayValue(1);
});

it('should display the correct number of pages', () => {
  render(
    <Pagination
      {...createTestProps({
        pageSize: 20,
        totalItems: 79,
      })}
    />
  );

  // totalItems / pageSize, rounded up
  const expectedNumberOfPages = 4;

  expect(screen.getByText(`of ${expectedNumberOfPages}`)).toBeInTheDocument();
});

it('should display the correct number of items displayed', () => {
  render(
    <Pagination
      {...createTestProps({
        pageSize: 20,
        totalItems: 79,
        currentPage: 4,
      })}
    />
  );

  // on the fourth page, there are 19 items left
  const expectedNumberOfItems = 19;

  expect(
    screen.getByText(`Items per page (${expectedNumberOfItems} items)`)
  ).toBeInTheDocument();
});

describe('page navigator interaction', () => {
  it('should increment page number on clicking the Next page button', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination
        {...createTestProps({
          onPageChange,
        })}
      />
    );

    const nextPageButton = screen.getByLabelText(/Next page/);
    nextPageButton.click();

    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(screen.getByLabelText('Page')).toHaveDisplayValue(2);
  });
  it('should decrement page number on clicking the Previous page button', () => {
    const onPageChange = jest.fn();
    render(
      <Pagination
        {...createTestProps({
          onPageChange,
          currentPage: 2,
        })}
      />
    );

    const prevPageButton = screen.getByLabelText(/Previous page/);
    prevPageButton.click();

    expect(onPageChange).toHaveBeenCalledWith(1);
    expect(screen.getByLabelText('Page')).toHaveDisplayValue(1);
  });
  it('should disable next page button when there are no next pages', () => {
    render(
      <Pagination
        {...createTestProps({
          currentPage: 1,
          totalItems: 20,
        })}
      />
    );

    const nextPageButton = screen.getByLabelText(/Next page/);
    expect(nextPageButton).toBeDisabled();
  });
  it('should disable previous page button when there are no previous pages', () => {
    render(<Pagination {...createTestProps()} />);

    const prevPageButton = screen.getByLabelText(/Previous page/);
    expect(prevPageButton).toBeDisabled();
  });
});

describe('page size selector interaction', () => {
  it('should call onPageSizeChange with the selected value', async () => {
    const onPageSizeChange = jest.fn();
    render(<Pagination {...createTestProps({ onPageSizeChange })} />);

    const pageSizeSelector = screen.getByLabelText(/Items per page/);

    fireEvent.focus(pageSizeSelector);
    fireEvent.change(pageSizeSelector, { target: { value: 50 } });
    fireEvent.keyDown(pageSizeSelector, {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });

    expect(onPageSizeChange).toHaveBeenCalledWith(50);
  });
});

describe('validation', () => {
  it('should throw an error if the page size range is invalid', async () => {
    const onPageSizeChange = jest.fn();
    console.error = jest.fn();
    expect(() =>
      render(
        <Pagination
          {...createTestProps({ onPageSizeChange, pageSizeRange: 'wrong' })}
        />
      )
    ).toThrowErrorMatchingInlineSnapshot(
      `"Invalid page size range \\"wrong\\", expected one of \\"s,m,l\\"."`
    );
  });
  describe.each`
    range  | invalidSize
    ${'s'} | ${10}
    ${'s'} | ${100}
    ${'m'} | ${10}
    ${'m'} | ${200}
    ${'l'} | ${100}
    ${'l'} | ${600}
  `(
    'when page size range is "$range" and page size is $invalidSize',
    ({ range, invalidSize }) => {
      it('should throw an error', async () => {
        const onPageSizeChange = jest.fn();
        console.error = jest.fn();
        expect(() =>
          render(
            <Pagination
              {...createTestProps({
                onPageSizeChange,
                pageSizeRange: range,
                pageSize: invalidSize,
              })}
            />
          )
        ).toThrowError(
          expect.objectContaining({
            message: expect.stringContaining(
              `Warning: @commercetools-uikit/pagination: invalid page size ${invalidSize}`
            ),
          })
        );
      });
    }
  );
  describe.each`
    range  | size
    ${'s'} | ${20}
    ${'s'} | ${50}
    ${'m'} | ${20}
    ${'m'} | ${50}
    ${'m'} | ${100}
    ${'l'} | ${200}
    ${'l'} | ${500}
  `(
    'when page size range is "$range" and page size is $size',
    ({ range, size }) => {
      it('should not throw an error', async () => {
        const onPageSizeChange = jest.fn();
        console.error = jest.fn();
        expect(() =>
          render(
            <Pagination
              {...createTestProps({
                onPageSizeChange,
                pageSizeRange: range,
                pageSize: size,
              })}
            />
          )
        ).not.toThrow();
      });
    }
  );
});
