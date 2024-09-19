import { type ReactNode, useState } from 'react';
import { css } from '@emotion/react';
import { MenuProps, MenuListProps } from 'react-select';
import DropdownMenu from '@commercetools-uikit/dropdown-menu';
import FilterMenu from '@commercetools-uikit/filter-menu';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import SelectInput from '@commercetools-uikit/select-input';

export type TAppliedFilterValue = {
  filterKey: string;
  /** does ReactNode | ReactNode[] make sense for single/multiple labels (shown in FilterMenu Chips) */
  label: ReactNode[];
};

export type TFiltersConfiguration = {
  key: string;
  groupKey?: string;
  label: ReactNode;
  filter: ReactNode;
  isPersistent?: boolean;
  isDisabled?: boolean;
  onClearRequest: Function;
  onApplyRequest?: Function;
  onSortRequest?: Function;
};

export type TFilterGroup = {
  key: string;
  label: ReactNode;
};

export type TFiltersListProps = {
  filters: TFiltersConfiguration[];
  filterGroups?: TFilterGroup[];
  appliedFilters: TAppliedFilterValue[];
  onClearAllRequest: Function;
  onAddFilterRequest?: Function;
};

const CustomSelectMenu = ({
  children,
  innerProps: { ref, ...restInnerProps },
}: MenuProps) => (
  <div ref={ref} {...restInnerProps}>
    {children}
  </div>
);

const CustomMenuList = ({
  children,
  innerProps: { ref, ...restInnerProps },
}: MenuListProps) => (
  <div ref={ref} {...restInnerProps}>
    {children}
  </div>
);

function FiltersList(props: TFiltersListProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const persistedFilters = props.filters
    .filter((filter) => filter.isPersistent)
    .map((filter) => filter.key);

  const getFilterOptions = () => {
    if (props.filterGroups) {
      return props.filterGroups.map((filterGroup) => ({
        label: filterGroup.label,
        options: props.filters
          .filter((filter) => filter.groupKey === filterGroup.key)
          .map((filter) => ({ value: filter.key, label: filter.label })),
      }));
    } else {
      return props.filters.map((filter) => ({
        value: filter.key,
        label: filter.label,
      }));
    }
  };

  const removeFilter = (filterKey: string) =>
    setSelectedFilters((selectedFilters) =>
      selectedFilters.filter((selectedFilter) => selectedFilter !== filterKey)
    );

  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        gap: 8px;
      `}
    >
      {persistedFilters.concat(selectedFilters).map((activeFilter) => {
        const activeFilterConfig = props.filters.find(
          (filter) => filter.key === activeFilter
        )!;
        return (
          <FilterMenu
            key={activeFilterConfig.key}
            filterKey={activeFilterConfig.key}
            label={activeFilterConfig.label}
            filter={activeFilterConfig.filter}
            appliedFilterValues={props.appliedFilters.filter(
              (appliedFilter) => activeFilter === appliedFilter.filterKey
            )}
            onApplyFilter={activeFilterConfig.onApplyRequest}
            onClearFilter={activeFilterConfig.onClearRequest}
            onRemoveFilter={() => {
              removeFilter(activeFilter);
              activeFilterConfig.onClearRequest();
            }}
          />
        );
      })}
      <DropdownMenu triggerElement={<SecondaryButton label="add filters" />}>
        <SelectInput
          name="add filters"
          options={getFilterOptions()}
          onChange={(e) => {
            setSelectedFilters(
              Array.prototype.concat(e.target.value ? e.target.value : [])
            );
          }}
          value={selectedFilters}
          menuIsOpen={true}
          components={{ Menu: CustomSelectMenu, MenuList: CustomMenuList }}
          controlShouldRenderValue={false}
          isMulti
        />
      </DropdownMenu>
    </div>
  );
}
export default FiltersList;
