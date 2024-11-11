import Filters from '@commercetools-uikit/filters';

/**  Input for a specific filter, provided by parent application */
import FirstFilterInput from 'path/to/first/filter/input'; // eslint-disable-line import/no-unresolved

/** Input for search query, provided by parent application */
import SearchInput from 'path/to/search/input'; // eslint-disable-line import/no-unresolved

/** Input for a specific filter, provided by parent application */
import SecondFilterInput from 'path/to/second/filter/input'; // eslint-disable-line import/no-unresolved

/** Filter and search state, provided by parent application (does not have to be hook)
 see storybook code block for more in depth example of simple state management */
import useFilterState from 'path/to/your/filter/state'; // eslint-disable-line import/no-unresolved

const FiltersExample = () => {
  const {
    // change handler for FirstFilterInput
    onFirstFilterInputChange,
    // callback to clear FirstFilterInput value
    onClearFirstFilterInput,
    // value of FirstFilterInput
    firstFilterInputValue,
    // change handler for SecondFilterInput
    onSecondFilterInputChange,
    // callback to clear SecondFilterInput value
    onClearSecondFilterInput,
    // value of SecondFilterInput
    secondFilterInputValue,
    // callback to clear all filter inputs and selected values
    onClearAllFilters,
    // selected/applied values of all filters
    selectedFilterValues,
  } = useFilterState();

  const filters = [
    {
      key: 'firstFilter',
      label: 'First Filter',
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <FirstFilterInput
            onChange={onFirstFilterInputChange}
            value={firstFilterInputValue}
          />
        ),
        onClearRequest: onClearFirstFilterInput,
      },
    },
    {
      key: 'secondFilter',
      label: 'Second Filter',
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <SecondFilterInput
            onChange={onSecondFilterInputChange}
            value={secondFilterInputValue}
          />
        ),
        onClearRequest: onClearSecondFilterInput,
      },
    },
  ];

  return (
    <Filters
      appliedFilters={selectedFilterValues}
      filters={filters}
      onClearAllRequest={onClearAllFilters}
      renderSearchComponent={<SearchInput />}
    />
  );
};

export default FiltersExample;
