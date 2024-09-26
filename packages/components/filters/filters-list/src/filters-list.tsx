import { type ReactNode, type ReactElement, useState } from 'react';
import { css } from '@emotion/react';
import { MenuProps, MenuListProps } from 'react-select';
import DropdownMenu from '@commercetools-uikit/dropdown-menu';
import FilterMenu from '@commercetools-uikit/filter-menu';
import FlatButton from '@commercetools-uikit/flat-button';
import { PlusThinIcon, CloseIcon } from '@commercetools-uikit/icons';
import SelectInput, {
  type TSelectInputProps,
} from '@commercetools-uikit/select-input';
import { type TPrimaryButtonProps } from '@commercetools-uikit/primary-button';

export type TAppliedFilterValue = { label: ReactNode; value: string };

export type TAppliedFilter = {
  filterKey: string;
  values: TAppliedFilterValue[];
};

export type TFilterConfiguration = {
  key: string;
  groupKey?: string;
  label: ReactNode;
  filterMenuConfiguration: {
    renderMenuBody: () => ReactNode;
    renderOperatorsInput?: () => ReactElement<TSelectInputProps>;
    renderApplyButton?: () => ReactElement<TPrimaryButtonProps>;
    onClearRequest: Function;
    onApplyRequest?: Function;
    onSortRequest?: Function;
  };
  isPersistent?: boolean;
  isDisabled?: boolean;
};

export type TFilterGroupConfiguration = {
  key: string;
  label: ReactNode;
};

export type TFiltersListProps = {
  filters: TFilterConfiguration[];
  filterGroups?: TFilterGroupConfiguration[];
  appliedFilters: TAppliedFilter[];
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
  /**
   * persisted filters: always visible
   * applied filters: filters for which values have been selected
   * visible filters = persisted + applied
   *
   * visibleFiltersFromProps = filters visible based on props
   * localVisibleFilters = filters actually visible in component currently
   */
  const persistedFilterKeys = props.filters
    .filter(({ isPersistent }) => isPersistent)
    .map((filter) => filter.key);

  const appliedFilterKeys = props.appliedFilters.map(
    ({ filterKey }) => filterKey
  );

  // applied filters must have corresponding filter in `props.filters`
  const visibleFiltersFromProps = props.filters.filter(
    ({ key, isPersistent }) => {
      const isVisible =
        Boolean(isPersistent) || appliedFilterKeys.includes(key);
      return isVisible;
    }
  );

  // set initial state as visibleFiltersFromProps
  const [localVisibleFilters, setLocalVisibleFilters] = useState<string[]>(
    visibleFiltersFromProps.map(({ key }) => key)
  );

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
    setLocalVisibleFilters((currentVisibleFilters) =>
      currentVisibleFilters.filter(
        (visibleFilterKey) => visibleFilterKey !== filterKey
      )
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
      {localVisibleFilters.map((activeFilter) => {
        const activeFilterConfig = props.filters.find(
          (filter) => filter.key === activeFilter
        )!;
        return (
          <FilterMenu
            key={activeFilterConfig.key}
            filterKey={activeFilterConfig.key}
            label={activeFilterConfig.label}
            isPersistent={activeFilterConfig.isPersistent}
            isDisabled={activeFilterConfig.isDisabled}
            renderMenuBody={
              activeFilterConfig.filterMenuConfiguration.renderMenuBody
            }
            renderOperatorsInput={
              activeFilterConfig.filterMenuConfiguration.renderOperatorsInput
            }
            renderApplyButton={
              activeFilterConfig.filterMenuConfiguration.renderApplyButton
            }
            appliedFilterValues={
              props.appliedFilters.find(
                (appliedFilter) => activeFilter === appliedFilter.filterKey
              )?.values
            }
            onClearRequest={
              activeFilterConfig.filterMenuConfiguration.onClearRequest
            }
            onRemoveRequest={() => {
              removeFilter(activeFilter);
              activeFilterConfig.filterMenuConfiguration.onClearRequest();
            }}
            onSortRequest={
              activeFilterConfig.filterMenuConfiguration.onSortRequest
            }
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
            setLocalVisibleFilters(
              Array.prototype.concat(e.target.value ? e.target.value : [])
            );
          }}
          value={localVisibleFilters}
          menuIsOpen={true}
          components={{ Menu: CustomSelectMenu, MenuList: CustomMenuList }}
          controlShouldRenderValue={false}
          isMulti={true}
          // @ts-ignore
          isOptionDisabled={(option: unknown) => option.isDisabled}
          backspaceRemovesValue={false}
          isClearable={false}
        />
      </DropdownMenu>
      {localVisibleFilters.length > 0 && (
        <FlatButton
          tone="secondary"
          onClick={() => {
            setLocalVisibleFilters(persistedFilterKeys);
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
