import { type ReactNode, useState } from 'react';
import { css } from '@emotion/react';
import { MenuProps, MenuListProps } from 'react-select';
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
  filterMenuConfiguration: {
    renderMenuBody: () => ReactNode;
    getTags: () => TAppliedFilterValue[];
    onClearRequest: Function;
    onApplyRequest?: Function;
    onSortRequest?: Function;
  };
  isPersistent?: boolean;
  isDisabled?: boolean;
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

  // TODO: handle options that don't have a group if `filterGroups` is passed
  const getFilterOptions = () => {
    if (props.filterGroups) {
      return props.filterGroups.map((filterGroup) => ({
        label: filterGroup.label,
        options: props.filters
          .filter((filter) => filter.groupKey === filterGroup.key)
          .map((filter) => ({
            value: filter.key,
            label: filter.label,
            isDisabled: filter.isDisabled,
          })),
      }));
    } else {
      return props.filters.map((filter) => ({
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
        const activeFilterConfig = props.filters.find(
          (filter) => filter.key === activeFilter
        )!;
        return (
          <FilterMenu
            key={activeFilterConfig.key}
            filterKey={activeFilterConfig.key}
            label={activeFilterConfig.label}
            renderMenuBody={
              activeFilterConfig.filterMenuConfiguration.renderMenuBody
            }
            appliedFilterValues={activeFilterConfig.filterMenuConfiguration.getTags()}
            onApplyFilter={
              activeFilterConfig.filterMenuConfiguration.onApplyRequest
            }
            onClearFilter={
              activeFilterConfig.filterMenuConfiguration.onClearRequest
            }
            onRemoveFilter={() => {
              removeFilter(activeFilter);
              activeFilterConfig.filterMenuConfiguration.onClearRequest();
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
          components={{ Menu: CustomSelectMenu, MenuList: CustomMenuList }}
          controlShouldRenderValue={false}
          isMulti={true}
          // @ts-ignore
          isOptionDisabled={(option: unknown) => option.isDisabled}
        />
      </DropdownMenu>
      {selectedFilters.length > 0 && (
        <FlatButton
          tone="secondary"
          onClick={() => {
            setSelectedFilters([]);
            props.onClearAllRequest();
          }}
          label="Clear all"
          icon={<CloseIcon />}
        />
      )}
    </div>
  );
}
export default FiltersList;
