import { ReactNode, useState, Children, isValidElement } from 'react';
import { MenuProps, MenuListProps } from 'react-select';
import { css } from '@emotion/react';
import DropdownMenu from '@commercetools-uikit/dropdown-menu';
import FilterMenu from '@commercetools-uikit/filter-menu';
import FlatButton from '@commercetools-uikit/flat-button';
import { PlusThinIcon, CloseIcon } from '@commercetools-uikit/icons';
import SelectInput from '@commercetools-uikit/select-input';

export type TAppliedFilterValue = {
  label: ReactNode;
};

export type TFiltersConfiguration = {
  key: string;
  groupKey?: string;
  label: ReactNode;
  isPersistent?: boolean;
  isDisabled?: boolean;
  getTags: () => TAppliedFilterValue[];
  onClearRequest: Function;
  onApplyRequest?: Function;
  onSortRequest?: Function;
};

export type TFilterGroup = {
  key: string;
  label: ReactNode;
};

export type TAddFilterSelectOption = {
  label: string;
  value: string;
  isDisabled: boolean;
};

export type TFiltersListProps = {
  filters: TFiltersConfiguration[];
  filterGroups?: TFilterGroup[];
  onClearAllRequest: Function;
  onAddFilterRequest?: Function;
  children: ReactNode; // Now accept children
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

function FiltersList({
  filters,
  filterGroups,
  onClearAllRequest,
  children,
}: TFiltersListProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const persistedFilters = filters
    .filter((filter) => filter.isPersistent)
    .map((filter) => filter.key);

  // Get options for the dropdown
  const getFilterOptions = () => {
    if (filterGroups) {
      return filterGroups.map((filterGroup) => ({
        label: filterGroup.label,
        options: filters
          .filter((filter) => filter.groupKey === filterGroup.key)
          .map((filter) => ({
            value: filter.key,
            label: filter.label,
            isDisabled: filter.isDisabled,
          })),
      }));
    } else {
      return filters.map((filter) => ({
        value: filter.key,
        label: filter.label,
        isDisabled: filter.isDisabled,
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
        align-items: center;
        gap: 8px;
      `}
    >
      {persistedFilters.concat(selectedFilters).map((activeFilter) => {
        const activeFilterConfig = filters.find(
          (filter) => filter.key === activeFilter
        )!;

        // Find corresponding child component
        const matchingChild = Children.toArray(children).find(
          (child) =>
            isValidElement(child) && child.props.id === activeFilterConfig.key
        );

        return (
          <FilterMenu
            key={activeFilterConfig.key}
            filterKey={activeFilterConfig.key}
            label={activeFilterConfig.label}
            renderMenuBody={() => matchingChild}
            appliedFilterValues={activeFilterConfig.getTags()}
            onApplyFilter={activeFilterConfig.onApplyRequest}
            onClearFilter={activeFilterConfig.onClearRequest}
            onRemoveFilter={() => {
              removeFilter(activeFilter);
              activeFilterConfig.onClearRequest();
            }}
          />
        );
      })}

      <DropdownMenu
        triggerElement={
          <FlatButton label="add filters" icon={<PlusThinIcon />} />
        }
      >
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
          isMulti={true}
          controlShouldRenderValue={false}
          components={{ Menu: CustomSelectMenu, MenuList: CustomMenuList }}
          // @ts-ignore
          isOptionDisabled={(option: unknown) => option.isDisabled}
        />
      </DropdownMenu>

      {selectedFilters.length > 0 && (
        <FlatButton
          tone="secondary"
          onClick={() => {
            setSelectedFilters([]);
            onClearAllRequest();
          }}
          label="Clear all"
          icon={<CloseIcon />}
        />
      )}
    </div>
  );
}

export default FiltersList;
