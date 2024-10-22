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
import SelectInput, {
  TOption,
  TOptionObject,
} from '@commercetools-uikit/select-input';
import Spacings from '@commercetools-uikit/spacings';
import { useIntl } from 'react-intl';
import { MenuProps, MenuListProps } from 'react-select';
import FilterMenu, {
  menuStyles,
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

//TODO: JSDoc annotations of types that are arrays/objects for storybook
//TODO: document that the applied filter values are what show in the TriggerButton Chips, and the state for them is handled outside the `Filters` component
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
    //TODO: how to document that the state for this is handled outside the `Filters` component?
    /**
     * the input in which the user selects values for the filter
     */
    renderMenuBody: () => ReactNode;
    /**
     * the input in which the user can select which operator should be used for this filter
     */
    renderOperatorsInput?: () => ReactNode;
    //TODO: should we document do/don'ts around disabling this button, etc?
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
    //TODO: document that this is meant to sort options so that selected options are first in list
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
  //TODO: add notes about grouped items being sorted below ungrouped items, and groups are displayed in the order they are sorted in this array
  /**
   * optional configuration for filter groups.
   *
   */
  filterGroups?: TFilterGroupConfiguration[];
  //TODO: document that this should clear the application's filter state
  /**
   * controls the `clear all` (added filters) button from the menu list
   */
  onClearAllRequest: (
    event?: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * optional callback when a filter is selected from the add filters menu.
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

//TODO: better styling and set up scrolling when there are lots of options
const AddFiltersSelectMenu = ({
  children,
  innerProps: { ref, ...restInnerProps },
}: MenuProps) => (
  <div
    ref={ref}
    {...restInnerProps}
    css={css`
      overflow: hidden auto;
      max-width: 100%;
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
  const visibleFiltersFromProps = props.filters
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
          {props.renderSearchComponent()}
        </div>
        <Spacings.Inline scale="s" alignItems="center">
          <FlatButton
            data-testid="filters-button"
            label={intl.formatMessage(messages.filtersButtonLabel)}
            icon={<FilterIcon />}
            onClick={handleFiltersClick}
          />
          {props.appliedFilters.length > 1 && !showFilterControls && (
            <Badge
              id={'uikit-filters-selected-filter-count'}
              label={`${props.appliedFilters.length}`}
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
                      id="ui-kit-add-filters-select"
                      name="add filters"
                      options={
                        getFilterOptions(
                          props.filters,
                          props.filterGroups
                        ) as TOption[]
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
              {props.appliedFilters.length > 1 && (
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
