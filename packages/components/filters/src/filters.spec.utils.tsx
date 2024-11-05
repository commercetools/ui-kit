import { fireEvent, screen, within } from '../../../../test/test-utils';

/* Query & Utility Functions to be ued within filters.spec */
const getFiltersButton = async (): Promise<HTMLElement> => {
  return await screen.findByRole('button', {
    name: /filters/i,
  });
};

export const getAddFilterButton = async (): Promise<HTMLElement> => {
  return await screen.findByRole('button', {
    name: /add filter/i,
  });
};

export const getClearAllFiltersButton = (): HTMLElement | null => {
  return screen.queryByRole('button', {
    name: /clear all/i,
  });
};

export const getBadgeElement = (): HTMLElement | null => {
  // Query matcher used here to cover positive & negative assertions
  return screen.queryByRole('status');
};

export const getPrimaryColorFilterButton = (): HTMLElement | null => {
  return screen.queryByRole('button', {
    name: /primary colors/i,
  });
};

// Expand/ collapse filter list
export const toggleFilterList = async () => {
  const filtersButton = await getFiltersButton();
  fireEvent.click(filtersButton);
};

//Click `Add filter` button & return dialog for interaction
export const openAddFilterDialog = async (): Promise<HTMLElement> => {
  const addFilterButton = await getAddFilterButton();
  fireEvent.click(addFilterButton);
  return await screen.findByRole('dialog');
};

//Select filter to apply
export const selectFilterOption = async (
  dialog: HTMLElement,
  optionText: string
) => {
  const option = within(dialog).getByText(optionText);
  fireEvent.click(option);
};

//Select filter values to apply
export const selectFilterValues = async (
  values: RegExp[]
): Promise<boolean> => {
  const selectFilterValuesDialog = await screen.findByRole('dialog');
  values.forEach(async (value) => {
    const filterValueOption = within(selectFilterValuesDialog).getByText(value);
    fireEvent.click(filterValueOption);
  });
  fireEvent.keyDown(selectFilterValuesDialog, { key: 'Escape' });
  return !screen.queryByRole('dialog');
};

//Retrieves selected values (in chips) for a given filter
export const getDisplayedChipsForFilter = (
  filterName: string | null
): string[] => {
  const selectedValues = screen.getByRole('list', {
    name: `${filterName} selected values`,
  });
  const valueChips = within(selectedValues).getAllByRole('listitem');
  return valueChips
    .map((chip) => chip.textContent)
    .filter((text): text is string => text !== null);
};
