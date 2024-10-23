import { useState } from 'react';
import { fireEvent, render, screen, within } from '../../../../test/test-utils';
import Filters, { TFiltersProps } from './filters';
import { PrimaryColorsInput } from './fixtures/inputs';
import { FILTER_GROUP_KEYS } from './fixtures/constants';

const mockRenderSearchComponent = () => (
  <input id="search-text" type="text" placeholder="Search Placeholder" />
);
const mockOnClearAllRequest = jest.fn();

const createTestProps = (
  custom?: Partial<TFiltersProps>
): Partial<TFiltersProps> & {
  onClearAllRequest: TFiltersProps['onClearAllRequest'];
  renderSearchComponent: TFiltersProps['renderSearchComponent'];
} => ({
  onClearAllRequest: mockOnClearAllRequest,
  renderSearchComponent: mockRenderSearchComponent,
  ...custom,
});

const FilterTestComponent = (
  props: Partial<TFiltersProps> & {
    onClearAllRequest: TFiltersProps['onClearAllRequest'];
    renderSearchComponent: TFiltersProps['renderSearchComponent'];
  }
) => {
  const [primaryColorValue, setPrimaryColorValue] = useState<string[]>([]);
  const clearPrimaryColorFilter = () => setPrimaryColorValue([]);

  const appliedFilters = [];

  if (primaryColorValue.length > 0) {
    appliedFilters.push({
      filterKey: 'primaryColors',
      values: primaryColorValue.map((value) => ({
        value: value,
        label: value,
      })),
    });
  }
  const filters = [
    {
      key: 'primaryColors',
      label: 'Primary Colors',
      groupKey: FILTER_GROUP_KEYS.primaryColors,
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <PrimaryColorsInput
            value={primaryColorValue}
            onChange={setPrimaryColorValue}
          />
        ),

        onClearRequest: clearPrimaryColorFilter,
      },
    },
  ];
  return (
    <Filters {...props} filters={filters} appliedFilters={appliedFilters} />
  );
};

describe('Filters', () => {
  it('should expand & collapse the filter list when `filters` button is clicked', async () => {
    render(<FilterTestComponent {...createTestProps()} />);
    const filtersButton = await screen.findByRole('button', {
      name: /filters/i,
    });

    // initial click will expand the filter list
    fireEvent.click(filtersButton);
    const addFilterButton = await screen.findByRole('button', {
      name: /add filter/i,
    });
    expect(addFilterButton).toBeVisible();

    // second click will collapse the filter list
    fireEvent.click(filtersButton);
    expect(addFilterButton).not.toBeVisible();
  });

  it('should select a filter and a text input', async () => {
    render(<FilterTestComponent {...createTestProps()} />);

    // expand filterList
    const filtersButton = await screen.findByRole('button', {
      name: /filters/i,
    });
    fireEvent.click(filtersButton);

    // // addFilter
    const addFilterButton = await screen.findByRole('button', {
      name: /add filter/i,
    });
    fireEvent.click(addFilterButton);

    const option = screen.getByText('Primary Colors');

    fireEvent.click(option);
    const filterSelectOptions = screen.getByRole('listbox');
    const filterValueOption = within(filterSelectOptions).getByText('Blue');

    fireEvent.click(filterValueOption);
    fireEvent.keyDown(filterValueOption, {
      key: 'Escape',
    });

    expect(filterSelectOptions).not.toBeInTheDocument();

    const selectedValues = screen.getByRole('list', {
      name: 'primaryColors selected values',
    });
    const valueChip = within(selectedValues).getByRole('listitem');

    expect(valueChip).toBeVisible();
    expect(valueChip).toHaveTextContent(/blue/i);
  });
});
