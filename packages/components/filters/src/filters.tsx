import {
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
  useState,
} from 'react';
import { css } from '@emotion/react';
import * as Popover from '@radix-ui/react-popover';
import CollapsibleMotion from '@commercetools-uikit/collapsible-motion';
import { designTokens } from '@commercetools-uikit/design-system';
import FlatButton from '@commercetools-uikit/flat-button';
import {
  CloseBoldIcon,
  FilterIcon,
  PlusBoldIcon,
} from '@commercetools-uikit/icons';
import SelectInput from '@commercetools-uikit/select-input';
import Spacings from '@commercetools-uikit/spacings';
import { useIntl } from 'react-intl';
import { MenuProps, MenuListProps } from 'react-select';
import FilterMenu, {
  menuStyles,
  type TAppliedFilterValue,
} from './filter-menu';
import messages from './messages';
import { Badge } from './badge';

type TAppliedFilter = {
  /**
   * unique identifier for the filter
   */
  filterKey: string;
  /**
   * the values applied to this filter by the user
   */
  values: TAppliedFilterValue[];
};

type TFilterConfiguration = {
  /**
   * configuration object for the filter menu.
   */
  filterMenuConfiguration: {
    /**
     * the input in which the user selects values for the filter
     */
    renderMenuBody: () => ReactNode;
    /**
     * the input in which the user can select which operator should be used for this filter
     */
    renderOperatorsInput?: () => ReactNode;
    /**
     * optional button that allows the user to apply selected filter values
     */
    renderApplyButton?: () => ReactNode;
    /**
     * controls whether `clear` button in Menu Body Footer is displayed
     */
    onClearRequest: (
      event?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ) => void;
    /**
     * controls whether `sort` button in Menu Body Header is displayed
     */
    onSortRequest?: (
      event?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ) => void;
  };
  /**
   * optional key to group filters together.
   */
  groupKey?: string;
  /**
   * indicates whether filter menu can be removed from filters
   */
  isPersistent?: boolean;
  /**
   * whether or not the filter is disabled
   */
  isDisabled?: boolean;
  /**
   * unique identifier for the filter
   */
  key: string;
  /**
   * formatted message to display the filter name
   */
  label: ReactNode;
};

type TFilterGroupConfiguration = {
  /**
   * unique identifier for the filter group
   */
  key: string;
  /**
   * formatted message to display the filter group name
   */
  label: ReactNode;
};

export type TFiltersProps = {
  /**
   * array of applied filters, each containing a unique key and an array of values.
   */
  appliedFilters: TAppliedFilter[];
  /**
   * configuration for the available filters.
   */
  filters: TFilterConfiguration[];
  /**
   * optional configuration for filter groups.
   */
  filterGroups?: TFilterGroupConfiguration[];
  /**
   * controls the `clear all` (added filters) button from the menu list
   */
  onClearAllRequest: (
    event?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * optional callback trigger to add a new filter.
   */
  onAddFilterRequest?: (
    event?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * function to render a search input, selectable from applicable UI Kit components.
   */
  renderSearchComponent: () => ReactNode;
};

const horizontalDividerStyles = css`
  width: 100%;
  height: 1px;
  border: 1px solid ${designTokens.colorNeutral90};
  margin-top: ${designTokens.spacing25};
  margin-bottom: ${designTokens.spacing30};
`;

const verticalDividerStyles = css`
  width: 1px;
  height: ${designTokens.spacing30};
  background-color: ${designTokens.colorNeutral90};
  margin: 0 ${designTokens.spacing20} 0 ${designTokens.spacing20};
`;

const menuListStyles = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${designTokens.spacing20};
`;

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

function Filters(props: TFiltersProps) {
  const intl = useIntl();
  const [showFilterControls, setShowFilterControls] = useState(false);

  const handleFiltersClick = () => {
    setShowFilterControls((currState) => !currState);
  };

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
  // applied filters must have corresponding filter in `props.filters`,
  // and persistent filters should be first in filter list
  const visibleFiltersFromProps = props.filters
    .filter(({ key, isPersistent }) => {
      const isVisible =
        Boolean(isPersistent) || appliedFilterKeys.includes(key);
      return isVisible;
    })
    .sort(({ isPersistent }) => (isPersistent ? -1 : 1));

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

  const locallyVisibleRemovableFilterCount =
    localVisibleFilters.length - persistedFilterKeys.length;

  return (
    <>
      <Spacings.Inline scale="m" alignItems="center">
        <div css={{ maxWidth: `${designTokens.constraint16}` }}>
          {props.renderSearchComponent()}
        </div>
        <Spacings.Inline scale="s" alignItems="center">
          <FlatButton
            data-testid="filters-button"
            label={intl.formatMessage(messages.filtersButtonLabel)}
            icon={<FilterIcon />}
            onClick={handleFiltersClick}
          />
          {locallyVisibleRemovableFilterCount > 1 && !showFilterControls && (
            <Badge
              id={'uikit-filters-selected-filter-count'}
              label={`${locallyVisibleRemovableFilterCount}`}
            />
          )}
        </Spacings.Inline>
      </Spacings.Inline>
      <div css={horizontalDividerStyles} />

      <CollapsibleMotion
        isClosed={!showFilterControls}
        onToggle={() => setShowFilterControls(!showFilterControls)}
      >
        {({ registerContentNode, containerStyles }) => (
          <div style={containerStyles}>
            <div ref={registerContentNode} css={menuListStyles}>
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
                      activeFilterConfig.filterMenuConfiguration
                        .renderOperatorsInput
                    }
                    renderApplyButton={
                      activeFilterConfig.filterMenuConfiguration
                        .renderApplyButton
                    }
                    appliedFilterValues={
                      props.appliedFilters.find(
                        (appliedFilter) =>
                          activeFilter === appliedFilter.filterKey
                      )?.values
                    }
                    onClearRequest={
                      activeFilterConfig.filterMenuConfiguration.onClearRequest
                    }
                    onRemoveRequest={(e) => {
                      removeFilter(activeFilter);
                      activeFilterConfig.filterMenuConfiguration.onClearRequest(
                        e
                      );
                    }}
                    onSortRequest={
                      activeFilterConfig.filterMenuConfiguration.onSortRequest
                    }
                    defaultOpen={
                      activeFilterConfig.isPersistent || !showFilterControls
                        ? false
                        : true
                    }
                  />
                );
              })}
              <Popover.Root>
                <Popover.Trigger asChild>
                  <div css={{ display: 'inline-flex' }}>
                    <FlatButton
                      data-testid="add-filter-button"
                      label={intl.formatMessage(messages.addFilterButtonLabel)}
                      icon={<PlusBoldIcon />}
                      onClick={() => setShowFilterControls(true)}
                    />
                  </div>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content side="bottom" align="start" css={menuStyles}>
                    <SelectInput
                      name="add filters"
                      options={getFilterOptions()}
                      onChange={(e) => {
                        setLocalVisibleFilters(
                          Array.prototype.concat(
                            e.target.value ? e.target.value : []
                          )
                        );
                      }}
                      value={localVisibleFilters}
                      menuIsOpen={true}
                      components={{
                        Menu: CustomSelectMenu,
                        MenuList: CustomMenuList,
                      }}
                      controlShouldRenderValue={false}
                      isMulti={true}
                      // @ts-ignore
                      isOptionDisabled={(option: unknown) => option.isDisabled}
                      backspaceRemovesValue={false}
                      isClearable={false}
                    />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
              {locallyVisibleRemovableFilterCount > 1 && (
                <>
                  <div css={verticalDividerStyles} />
                  <FlatButton
                    icon={<CloseBoldIcon />}
                    label={intl.formatMessage(
                      messages.clearAllFiltersButtonLabel
                    )}
                    onClick={(e) => {
                      props.onClearAllRequest(e);
                      setLocalVisibleFilters(persistedFilterKeys);
                    }}
                    tone="secondary"
                  />
                </>
              )}
            </div>
          </div>
        )}
      </CollapsibleMotion>
    </>
  );
}

Filters.displayName = 'Filters';
export default Filters;
