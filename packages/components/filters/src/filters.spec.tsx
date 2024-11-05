import { useState } from 'react';
import Filters, {
  type TFiltersProps,
  type TFilterConfiguration,
} from './filters';
import { FILTER_GROUP_KEYS } from './fixtures/constants';
import { PrimaryColorsInput, ColorNameTextInput } from './fixtures/inputs';
import { fireEvent, render, screen } from '../../../../test/test-utils';
import {
  getAddFilterButton,
  getBadgeElement,
  getClearAllFiltersButton,
  getPrimaryColorFilterButton,
  getDisplayedChipsForFilter,
  openAddFilterDialog,
  selectFilterOption,
  selectFilterValues,
  toggleFilterList,
} from './filters.spec.utils';

const mockRenderSearchComponent = (
  <input id="search-text" type="text" placeholder="Search Placeholder" />
);

const mockOnClearAllRequest = jest.fn();

const createTestProps = (
  custom?: Partial<TFiltersProps> & Partial<TFilterConfiguration>
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
    initialPrimaryColorValue?: string[];
    initialColorNameValue?: string;
  } & Partial<TFilterConfiguration> & {
      onClearAllRequest: TFiltersProps['onClearAllRequest'];
      renderSearchComponent: TFiltersProps['renderSearchComponent'];
    }
) => {
  const [primaryColorValue, setPrimaryColorValue] = useState<string[]>(
    props.initialPrimaryColorValue ?? []
  );
  const [colorNameValue, setColorName] = useState<string>(
    props.initialColorNameValue ?? ''
  );

  const clearPrimaryColorFilter = () => setPrimaryColorValue([]);
  const clearColorNameFilter = () => setColorName('');

  // Use props.appliedFilters if provided, otherwise use default logic
  const appliedFilters = props.appliedFilters ?? [];

  if (primaryColorValue.length > 0) {
    appliedFilters.push({
      filterKey: 'primaryColors',
      values: primaryColorValue.map((value) => ({
        value: value,
        label: value,
      })),
    });
  }

  if (colorNameValue) {
    appliedFilters.push({
      filterKey: 'colorName',
      values: [
        {
          value: colorNameValue,
          label: colorNameValue,
        },
      ],
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
      isPersistent: props.isPersistent,
    },
    {
      key: 'colorName',
      label: 'Color Name',
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <ColorNameTextInput value={colorNameValue} onChange={setColorName} />
        ),
        onClearRequest: clearColorNameFilter,
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

    //Expand filter list & expect `Add filter` button to be visible
    await toggleFilterList();
    const addFilterButton = await getAddFilterButton();
    expect(addFilterButton).toBeVisible();

    //Collapse filter list &  expect `Add filter` button to be hidden
    await toggleFilterList();
    expect(addFilterButton).not.toBeVisible();
  });

  it('should apply values from multiple filters & display an applied filter count badge when collapsed', async () => {
    render(<FilterTestComponent {...createTestProps()} />);

    //Expand filter list
    await toggleFilterList();
    const addFilterDialog = await openAddFilterDialog();

    //Filter 1 - Select Primary Colors filter &  apply a single value
    await selectFilterOption(addFilterDialog, 'Primary Colors');
    await selectFilterValues([/green/i]);

    //Expect chips to display selected filter values
    const chips = getDisplayedChipsForFilter('primaryColors');
    expect(chips).toEqual(['green']);

    //Filter 2 - Select Color Name filter & enter a value
    const addFilterDialog2 = await openAddFilterDialog();
    await selectFilterOption(addFilterDialog2, 'Color Name');
    const textbox = await screen.findByPlaceholderText(/enter a color name/i);
    fireEvent.change(textbox, {
      target: {
        value: 'cobalt',
      },
    });

    //Expect badge to not display if filter list is expanded
    let filterTotalBadge = getBadgeElement();
    expect(filterTotalBadge).toBeNull();

    //Collapse filter list & expect filterDialogs to be hidden
    await toggleFilterList();
    expect(addFilterDialog).not.toBeVisible();
    expect(addFilterDialog2).not.toBeVisible();

    //Recapture the badge el
    filterTotalBadge = getBadgeElement();

    //Expect badge to display count of applied filters visible
    expect(filterTotalBadge).toHaveTextContent('2');
    expect(filterTotalBadge).toBeVisible();
  });

  it('should apply multiple values from a single filter, display as chips, but display no badge on collapse', async () => {
    render(<FilterTestComponent {...createTestProps()} />);

    //Expand filter list & add filter
    await toggleFilterList();
    const addFilterDialog = await openAddFilterDialog();

    //Select Primary Colors filter & apply multiple values
    await selectFilterOption(addFilterDialog, 'Primary Colors');
    await selectFilterValues([
      /blue/i,
      /green/i,
      /pink/i,
      /lavender/i,
      /azure/i,
    ]);

    //Expect chips to display selected filter values
    const chips = getDisplayedChipsForFilter('primaryColors');
    expect(chips).toEqual(['blue', 'green', 'pink', 'lavender', 'azure']);

    //Collapse filter list & expect no badge to display
    await toggleFilterList();
    const filterTotalBadge = getBadgeElement();
    expect(filterTotalBadge).toBeNull();
  });

  it('should render search component', () => {
    render(<FilterTestComponent {...createTestProps()} />);
    const searchInput = screen.getByPlaceholderText('Search Placeholder');
    expect(searchInput).toBeInTheDocument();
  });

  it('should render `clear all` filters button & clear selections when clicked - >=2 applied filters', async () => {
    render(<FilterTestComponent {...createTestProps()} />);

    //Expand filter list
    await toggleFilterList();
    const addFilterDialog = await openAddFilterDialog();

    //Filter 1 - Select Primary Colors filter & apply a single value
    await selectFilterOption(addFilterDialog, 'Primary Colors');
    await selectFilterValues([/green/i]);

    // Expect chips to display selected filter values
    const chips = getDisplayedChipsForFilter('primaryColors');
    expect(chips).toEqual(['green']);

    //Filter 2 - Select Colors Name filter & enter a text value
    const addFilterDialog2 = await openAddFilterDialog();
    await selectFilterOption(addFilterDialog2, 'Color Name');
    const textbox = await screen.findByPlaceholderText(/enter a color name/i);
    fireEvent.change(textbox, {
      target: {
        value: 'Falu',
      },
    });
    fireEvent.keyDown(textbox, { key: 'Escape' });

    //Expect chips to display selected filter values
    const selectedValues = screen.queryByRole('list', {
      name: 'primaryColors selected values',
    });
    expect(selectedValues).toBeInTheDocument();

    //Click `Clear all` (filters) button & expect applied filters to be cleared
    const clearAllFiltersButton = getClearAllFiltersButton();
    if (clearAllFiltersButton) {
      fireEvent.click(clearAllFiltersButton);
    }

    expect(selectedValues).not.toBeInTheDocument();
  });

  it('should not render `clear all` filters button with a single applied filter', async () => {
    render(<FilterTestComponent {...createTestProps()} />);

    //Expand filter list
    await toggleFilterList();
    const addFilterDialog = await openAddFilterDialog();

    //Filter 1 - select primary colors & apply a single value
    await selectFilterOption(addFilterDialog, 'Primary Colors');
    await selectFilterValues([/green/i]);

    //Expect chips to display selected filter values
    const chips = getDisplayedChipsForFilter('primaryColors');
    expect(chips).toEqual(['green']);

    //Expect Clear all` button to not be accessible
    const clearAllFiltersButton = getClearAllFiltersButton();
    expect(clearAllFiltersButton).not.toBeInTheDocument();
  });

  it('should remove applied filters individually', async () => {
    render(<FilterTestComponent {...createTestProps()} />);

    //Expand filter list
    await toggleFilterList();
    const addFilterDialog = await openAddFilterDialog();

    //Select Primary Colors filter & apply a single value
    await selectFilterOption(addFilterDialog, 'Primary Colors');
    await selectFilterValues([/green/i]);

    //Expect chips to display selected filter values
    const chips = getDisplayedChipsForFilter('primaryColors');
    expect(chips).toEqual(['green']);

    //Click the filter remove button & expect filter to be removed from list
    const removeFilterButton = screen.queryByRole('button', {
      name: /remove Primary Colors filter/i,
    });

    if (removeFilterButton) {
      fireEvent.click(removeFilterButton);
    }

    const primaryColorFilter = getPrimaryColorFilterButton();

    expect(primaryColorFilter).not.toBeInTheDocument();
  });

  it('should render a filter on initial page load when appliedFilters prop is passed', async () => {
    render(
      <FilterTestComponent
        {...createTestProps()}
        initialPrimaryColorValue={['lavender', 'cobalt']}
      />
    );

    // Toggle the filter list to ensure applied filters are shown
    await toggleFilterList();

    //Expect chips to display selected filter values on initial render
    const chips = getDisplayedChipsForFilter('primaryColors');
    expect(chips).toEqual(['lavender', 'cobalt']);
  });

  it('should render a badge on initial page load when >=2 appliedFilters are passed', async () => {
    render(
      <FilterTestComponent
        {...createTestProps()}
        initialPrimaryColorValue={['lavender', 'cobalt']}
        initialColorNameValue="green"
      />
    );

    //Expect badge to display count of applied filters
    const filterTotalBadge = getBadgeElement();
    expect(filterTotalBadge).toHaveTextContent('2');
    expect(filterTotalBadge).toBeVisible();
  });

  it('should immediately render a filter when isPersistent is true', async () => {
    render(<FilterTestComponent {...createTestProps()} isPersistent={true} />);
    //Expand filter list & expect `Primary Colors` filter to be visible
    await toggleFilterList();
    const primaryColorFilter = getPrimaryColorFilterButton();
    expect(primaryColorFilter).toBeVisible();
  });
});
