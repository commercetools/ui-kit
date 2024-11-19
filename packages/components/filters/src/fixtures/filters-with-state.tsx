import { useState } from 'react';

import Filters, { type TFiltersProps } from '../filters';
import {
  SearchInputComponent,
  SecondaryColorsInput,
  PrimaryColorsInput,
} from './inputs';
import { FILTER_GROUP_KEYS, FILTER_GROUPS } from './constants';

export const FiltersWithState = (
  props: Partial<TFiltersProps> & {
    selectedPrimaryColors: string[];
    selectedSecondaryColors: string[];
    isDisabled: boolean;
    isPersistent: boolean;
  }
) => {
  // simulate state from parent application for each menuBody input
  const [primaryColorValue, setPrimaryColorValue] = useState<string[]>(
    props.selectedPrimaryColors ?? []
  );
  const [secondaryColorValue, setSecondaryColorValue] = useState<string[]>(
    props.selectedSecondaryColors ?? []
  );

  // create a 'clear' function for each filter
  const clearPrimaryColorFilter = () => setPrimaryColorValue([]);
  const clearSecondaryColorFilter = () => setSecondaryColorValue([]);

  // add clear function for each input to 'clearAllFilters' function
  const clearAllFilters = () => {
    clearPrimaryColorFilter();
    clearSecondaryColorFilter();
  };

  // generate 'appliedFilters' state based on simulated parent application state
  const appliedFilters: TFiltersProps['appliedFilters'] = [];

  if (primaryColorValue.length > 0) {
    appliedFilters.push({
      filterKey: 'primaryColors',
      values: primaryColorValue.map((value) => ({
        value: value,
        label: value,
      })),
    });
  }

  if (secondaryColorValue.length > 0) {
    appliedFilters.push({
      filterKey: 'secondaryColors',
      values: secondaryColorValue.map((value) => ({
        value: value,
        label: value,
      })),
    });
  }

  const filters = [
    {
      key: 'secondaryColors',
      label: 'Secondary Colors',
      groupKey: FILTER_GROUP_KEYS.secondaryColors,
      filterMenuConfiguration: {
        renderMenuBody: () => (
          <SecondaryColorsInput
            value={secondaryColorValue}
            onChange={setSecondaryColorValue}
          />
        ),
        onClearRequest: clearSecondaryColorFilter,
      },
    },
    {
      key: 'primaryColors',
      label: 'Primary Colors',
      groupKey: FILTER_GROUP_KEYS.primaryColors,
      isDisabled: props.isDisabled,
      isPersistent: props.isPersistent,
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
    <div style={{ margin: '60px' }}>
      <Filters
        renderSearchComponent={<SearchInputComponent />}
        filters={filters}
        filterGroups={props.filterGroups ? FILTER_GROUPS : undefined}
        appliedFilters={appliedFilters}
        onClearAllRequest={clearAllFilters}
        defaultOpen={props.defaultOpen}
      />
    </div>
  );
};
