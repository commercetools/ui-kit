import {
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
  useRef,
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
import SelectInput, {
  TOption,
  TOptionObject,
} from '@commercetools-uikit/select-input';
import Spacings from '@commercetools-uikit/spacings';
import { useIntl } from 'react-intl';
import { ContainerProps, MenuProps, MenuListProps } from 'react-select';
import FilterMenu, {
  menuStyles,
  menuBodyStyle,
  type TAppliedFilterValue,
} from './filter-menu';
import messages from './messages';
import { Badge } from './badge';

interface TAddFilterSelectOption extends TOption {
  isDisabled?: boolean;
}

interface TAddFilterOptionGroup extends TOptionObject {
  options: TAddFilterSelectOption[];
  label: ReactNode;
  key: string;
}

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
   * unique identifier for the filter
   */
  key: string;
  /**
   * formatted message to display the filter name
   */
  label: ReactNode;
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
   * indicates whether the filter is disabled
   */
  isDisabled?: boolean;
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
   *
   */
  filters: TFilterConfiguration[];
  /**
   * optional configuration for filter groups.
   *
   */
  filterGroups?: TFilterGroupConfiguration[];

  /**
   * controls the `clear all` (added filters) button from the menu list, meant to clear the parent application's filter state
   */
  onClearAllRequest: (
    event?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * optional callback when the add filter button is clicked
   */
  onAddFilterRequest?: (
    event?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * function to render a search input, selectable from applicable UI Kit components.
   */
  renderSearchComponent: ReactNode;
  /**
   * controls whether the filters list is initially open
   */
  defaultOpen?: boolean;
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

//TODO: better styling and set up scrolling when there are lots of options
const AddFiltersSelectContainer = ({
  children,
  innerProps: { ref, ...restInnerProps },
}: ContainerProps) => (
  <div
    data-testid="uikit-custom-filters-select"
    css={css`
      height: 100%;
    `}
    ref={ref}
    {...restInnerProps}
  >
    {children}
  </div>
);

const AddFiltersSelectMenu = ({
  children,
  innerProps: { ref, ...restInnerProps },
}: MenuProps) => (
  <div
    ref={ref}
    {...restInnerProps}
    css={css`
      margin-top: ${designTokens.spacing20};
      max-width: 100%;
      max-height: calc(100% - ${designTokens.spacing60});
      overflow: hidden auto;
    `}
  >
    {children}
  </div>
);

const AddFiltersSelectList = ({
  children,
  innerProps: { ref, ...restInnerProps },
}: MenuListProps) => (
  <div ref={ref} {...restInnerProps}>
    {children}
  </div>
);

function getFilterOptions(
  filters: TFilterConfiguration[],
  filterGroups?: TFilterGroupConfiguration[]
): (TAddFilterSelectOption | TAddFilterOptionGroup)[] {
  let filterOptions: (TAddFilterSelectOption | TAddFilterOptionGroup)[] = [];
  // define option groups
  if (filterGroups) {
    filterOptions = filterGroups.map((filterGroup) => ({
      label: filterGroup.label,
      key: filterGroup.key,
      options: [],
    }));
  }
  return filters.reduce((filterOptions, filter) => {
    const formattedOption = {
      value: filter.key,
      label: filter.label,
      isDisabled: filter.isDisabled,
    };
    //if theres a groupkey, filterGroups, and the groupKey matches a filterGroup, add option to its group
    if (filter.groupKey && filterGroups) {
      const optionGroup = filterOptions.find(
        (option) => 'key' in option && option.key === filter.groupKey
      );
      if (optionGroup && 'options' in optionGroup) {
        optionGroup.options.push(formattedOption);
        return filterOptions;
      }
    }
    // otherwise add option directly
    return [formattedOption, ...filterOptions];
  }, filterOptions);
}

function Filters({
  appliedFilters,
  filters,
  filterGroups,
  onClearAllRequest,
  onAddFilterRequest,
  renderSearchComponent,
  defaultOpen = false,
}: TFiltersProps) {
  const intl = useIntl();
  const [showFilterControls, setShowFilterControls] = useState(defaultOpen);

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
  const persistedFilterKeys = filters
    .filter(({ isPersistent }) => isPersistent)
    .map((filter) => filter.key);

  const persistedFiltersRef = useRef<string[]>(persistedFilterKeys);

  const appliedFilterKeys = appliedFilters.map(({ filterKey }) => filterKey);

  // applied filters must have corresponding filter in `props.filters`,
  const visibleFiltersFromProps = filters
    .filter(({ key, isPersistent }) => {
      const isVisible =
        Boolean(isPersistent) || appliedFilterKeys.includes(key);
      return isVisible;
    })
    // persistent filters should be first in filter list
    .sort(({ isPersistent }) => (isPersistent ? -1 : 1));

  // set initial state as visibleFiltersFromProps
  const [localVisibleFilters, setLocalVisibleFilters] = useState<string[]>(
    visibleFiltersFromProps.map(({ key }) => key)
  );

  //update localVisibleFilters if persisted filter count changes
  if (persistedFiltersRef.current.length !== persistedFilterKeys.length) {
    setLocalVisibleFilters(visibleFiltersFromProps.map(({ key }) => key));
    persistedFiltersRef.current = persistedFilterKeys;
  }

  const removeFilter = (filterKey: string) =>
    setLocalVisibleFilters((currentVisibleFilters) =>
      currentVisibleFilters.filter(
        (visibleFilterKey) => visibleFilterKey !== filterKey
      )
    );

  return (
    <>
      <Spacings.Inline scale="m" alignItems="center">
        <div css={{ maxWidth: `${designTokens.constraint16}` }}>
          {renderSearchComponent}
        </div>
        <Spacings.Inline scale="s" alignItems="center">
          <FlatButton
            label={intl.formatMessage(messages.filtersButtonLabel)}
            icon={<FilterIcon />}
            onClick={handleFiltersClick}
          />
          {appliedFilters.length > 1 && !showFilterControls && (
            <Badge
              id={'uikit-filters-selected-filter-count'}
              label={`${appliedFilters.length}`}
            />
          )}
        </Spacings.Inline>
      </Spacings.Inline>
      <hr css={horizontalDividerStyles} />
      <CollapsibleMotion
        isClosed={!showFilterControls}
        onToggle={() => setShowFilterControls(!showFilterControls)}
      >
        {({ registerContentNode, containerStyles }) => (
          <div style={containerStyles}>
            <div
              ref={registerContentNode}
              css={menuListStyles}
              aria-live="polite"
            >
              {localVisibleFilters.map((activeFilter) => {
                const activeFilterConfig = filters.find(
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
                      appliedFilters.find(
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
                      activeFilterConfig.isPersistent ||
                      (!showFilterControls &&
                        localVisibleFilters.length ===
                          visibleFiltersFromProps.length)
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
                      label={intl.formatMessage(messages.addFilterButtonLabel)}
                      icon={<PlusBoldIcon />}
                      onClick={(e) => {
                        if (onAddFilterRequest) {
                          onAddFilterRequest(e);
                        }
                        setShowFilterControls(true);
                      }}
                    />
                  </div>
                </Popover.Trigger>
                <Popover.Portal>
                  <Popover.Content
                    side="bottom"
                    align="start"
                    css={[menuStyles, menuBodyStyle]}
                  >
                    <SelectInput
                      id="ui-kit-add-filters-select"
                      name="select filters"
                      aria-label="select filters"
                      options={
                        getFilterOptions(filters, filterGroups) as TOption[]
                      }
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
                        SelectContainer: AddFiltersSelectContainer,
                        Menu: AddFiltersSelectMenu,
                        MenuList: AddFiltersSelectList,
                      }}
                      controlShouldRenderValue={false}
                      isMulti={true}
                      // @ts-ignore
                      isOptionDisabled={(option: TAddFilterSelectOption) =>
                        option.isDisabled
                      }
                      backspaceRemovesValue={false}
                      isClearable={false}
                    />
                  </Popover.Content>
                </Popover.Portal>
              </Popover.Root>
              {appliedFilters.length > 1 && (
                <>
                  <div css={verticalDividerStyles} />
                  <FlatButton
                    icon={<CloseBoldIcon />}
                    label={intl.formatMessage(
                      messages.clearAllFiltersButtonLabel
                    )}
                    onClick={(e) => {
                      onClearAllRequest(e);
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
