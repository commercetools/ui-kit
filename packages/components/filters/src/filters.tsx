// import { forwardRef, type LegacyRef } from 'react';
import * as Popover from '@radix-ui/react-popover';
import FlatButton from '@commercetools-uikit/flat-button';
import SelectInput from '@commercetools-uikit/select-input';
import {
  CloseBoldIcon,
  FilterIcon,
  PlusBoldIcon,
} from '@commercetools-uikit/icons';
import { ReactElement, ReactNode, useState } from 'react';
import { type TAppliedFilterValue } from './filter-menu/filter-menu';
import { type TPrimaryButtonProps } from '@commercetools-uikit/primary-button';
import { type TSelectInputProps } from '@commercetools-uikit/select-input';
import Spacings from '@commercetools-uikit/spacings/src/spacings';
import { designTokens } from '@commercetools-uikit/design-system';
import { css } from '@emotion/react';
import messages from './messages';
import { useIntl } from 'react-intl';
import { menuStyles } from './filter-menu/filter-menu';

// This will be updated in a future PR to use a ui kit button once ui kit buttons can forward refs
// const AddFilterButtonNEW = forwardRef(function AddFilterButton(
//   props: Record<string, unknown>,
//   ref: LegacyRef<HTMLButtonElement>
// ) {
//   return (
//     <button ref={ref} {...props}>
//       add filters
//     </button>
//   );
// });

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
    renderOperatorsInput?: () => ReactElement<TSelectInputProps>;
    /**
     * optional button that allows the user to apply selected filter values
     */
    renderApplyButton?: () => ReactElement<TPrimaryButtonProps>;
    /**
     * controls whether `clear` button in Menu Body Footer is displayed
     */
    onClearRequest: Function;
    /**
     * controls whether `sort` button in Menu Body Header is displayed
     */
    onSortRequest?: Function;
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
  onClearAllRequest: () => void;
  /**
   * optional callback trigger to add a new filter.
   */
  onAddFilterRequest?: Function;
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
  margin: 0 ${designTokens.spacing20} 0 ${designTokens.spacing30};
`;

const menuListStyles = css`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${designTokens.spacing20};
`;

function Filters(props: TFiltersProps) {
  const intl = useIntl();
  const [showAddFilters, setShowAddFilters] = useState(false);

  const handleFiltersClick = () => {
    setShowAddFilters((currState) => !currState);
  };

  return (
    <>
      <Spacings.Inline scale="m" alignItems="center">
        <div css={{ maxWidth: `${designTokens.constraint16}` }}>
          {props.renderSearchComponent()}
        </div>
        <FlatButton
          data-testid="filters-button"
          label={intl.formatMessage(messages.filtersButtonLabel)}
          icon={<FilterIcon />}
          onClick={handleFiltersClick}
        />
      </Spacings.Inline>
      <div css={horizontalDividerStyles} />
      {showAddFilters && (
        <div css={menuListStyles}>
          <Popover.Root>
            <Popover.Trigger asChild>
              <div css={{ display: 'inline-flex' }}>
                <FlatButton
                  data-testid="add-filter-button"
                  label={intl.formatMessage(messages.addFiltersButtonLabel)}
                  icon={<PlusBoldIcon />}
                />
              </div>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content side="bottom" align="start" css={menuStyles}>
                <SelectInput />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
          <div css={verticalDividerStyles}> </div>
          <FlatButton
            icon={<CloseBoldIcon />}
            label={intl.formatMessage(messages.clearAllFiltersButtonLabel)}
            onClick={props.onClearAllRequest}
            tone="secondary"
          />
        </div>
      )}
    </>
  );
}

Filters.displayName = 'Filters';
export default Filters;
