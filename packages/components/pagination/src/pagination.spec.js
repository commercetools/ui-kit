import React from 'react';
import { screen, render, fireEvent } from '../../../../test/test-utils';
import Pagination from './pagination';

const createTestProps = (custom) => ({
  totalItems: 60,
  page: 1,
  onPerPageChange: jest.fn(),
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
        perPage: 20,
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
        page: 4,
        perPage: 20,
        totalItems: 79,
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
  it('should increment page number on clicking the Next page button', async () => {
    const onPageChange = jest.fn().mockName('onPageChange');
    render(
      <Pagination
        {...createTestProps({
          onPageChange,
          page: 1,
        })}
      />
    );

    const nextPageButton = await screen.findByLabelText(/Next page/);
    nextPageButton.click();

    await screen.findByLabelText('Page');
    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(await screen.findByLabelText('Page')).toHaveDisplayValue(2);
  });
  it('should decrement page number on clicking the Previous page button', async () => {
    const onPageChange = jest.fn().mockName('onPageChange');
    render(
      <Pagination
        {...createTestProps({
          onPageChange,
          page: 2,
        })}
      />
    );

    const prevPageButton = await screen.findByLabelText(/Previous page/);
    prevPageButton.click();

    await screen.findByLabelText('Page');
    expect(onPageChange).toHaveBeenCalledWith(1);
    expect(await screen.findByLabelText('Page')).toHaveDisplayValue(1);
  });
  it('should disable next page button when there are no next pages', () => {
    render(
      <Pagination
        {...createTestProps({
          page: 1,
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

describe('per page selector interaction', () => {
  it('should call onPerPageChange with the selected value', () => {
    const onPerPageChange = jest.fn();
    render(<Pagination {...createTestProps({ onPerPageChange })} />);

    const perPageSelector = screen.getByLabelText(/Items per page/);

    fireEvent.focus(perPageSelector);
    fireEvent.change(perPageSelector, { target: { value: 50 } });
    fireEvent.keyDown(perPageSelector, {
      key: 'Enter',
      keyCode: 13,
      which: 13,
    });

    expect(onPerPageChange).toHaveBeenCalledWith(50);
  });
});

describe('validation', () => {
  it('should throw an error if the per page range is invalid', async () => {
    const onPerPageChange = jest.fn();
    console.error = jest.fn();
    expect(() =>
      render(
        <Pagination
          {...createTestProps({ onPerPageChange, perPageRange: 'wrong' })}
        />
      )
    ).toThrowErrorMatchingInlineSnapshot(
      `"Invalid page range \\"wrong\\", expected one of \\"s,m,l\\"."`
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
    'when page size range is "$perPageRange" and page size is $invalidSize',
    ({ perPageRange, invalidSize }) => {
      it('should throw an error', async () => {
        const onPerPageChange = jest.fn();
        console.error = jest.fn();
        expect(() =>
          render(
            <Pagination
              {...createTestProps({
                onPerPageChange,
                perPageRange,
                perPage: invalidSize,
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
    'when per page range is "$perPageRange" and perPage is "$perPage"',
    ({ perPageRange, perPage }) => {
      it('should not throw an error', async () => {
        const onPerPageChange = jest.fn();
        console.error = jest.fn();
        expect(() =>
          render(
            <Pagination
              {...createTestProps({
                perPage,
                onPerPageChange,
                perPageRange,
              })}
            />
          )
        ).not.toThrow();
      });
    }
  );
});
