import { type ReactElement } from 'react';

import { Footer } from './footer';
import { Header } from './header';
import { TriggerButton } from './trigger-button';
import * as Popover from '@radix-ui/react-popover';
import styled from '@emotion/styled';

export type TAppliedFilterValue = {
  key?: string;
  label: string | ReactElement;
};

export type TFilterMenuProps = {
  /**
   * unique identifier for the filter
   */
  filterKey: string;
  /**
   * formatted message to display the filter's name
   */
  label: string;
  /**
   * the input in which the user selects values for the filter
   *
   * NOTE / OPINIONS WELCOME IN PR COMMENTS:
   * can either pass a react element and let the consuming app choose what input to use,
   * or start defining different menu bodies based on props and only make predefined input
   * types available, which is restrictive and much higher maintenance
   */
  filter: ReactElement;
  /**
   * the input in which the user can select which operator should be used for this filter
   *
   * NOTE / OPINIONS WELCOME IN PR COMMENTS:
   * the alternative to a rect element is passing in an array of operators and a handler function,
   * which is more achievable here than for the input in the body, but could still be restrictive
   */
  operatorsInput?: ReactElement;
  /**
   * the values applied to this filter by the user
   *
   * NOTE / OPINIONS WELCOME IN PR COMMENTS:
   * this will almost certainly be some sort of generic w/validation - all the `Chip` really
   * needs is the selected option's `label`, but these options need to contain a lot more data
   */
  appliedFilterValues: TAppliedFilterValue[] | undefined | null;
  /**
   * indicates whether FilterMenu can be removed from the filtersList
   */
  isPersistent?: boolean;
  /**
   * whether or not the filter is disabled
   */
  isDisabled?: boolean;
  /**
   * controls whether `x` in Trigger Button is displayed - required if `isPersistent` is `false`
   *
   * NOTES / OPINIONS WELCOME IN PR COMMENTS:
   * is the presence/absence of the function sufficient for display logic, or do we need a separate `show-` prop?
   */
  onRemoveFilter?: Function;
  /**
   * controls whether `apply` button in Menu Body Footer is displayed
   */
  onApplyFilter?: Function;
  /**
   * controls whether `clear` button in Menu Body Footer is displayed
   */
  onClearFilter?: Function;
  /**
   * controls whether `sort` button in Menu Body Header is displayed
   */
  onFilterOptionsSortClick?: Function;
};

const PopoverContent = styled.div({
  borderRadius: '4px',
  padding: '20px',
  width: '260px',
  backgroundColor: 'white',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  animationDuration: '400ms',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  marginTop: '.5rem',
});

function FilterMenu(props: TFilterMenuProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <TriggerButton
          label={props.label}
          appliedFilterValues={props.appliedFilterValues}
          isDisabled={props.isDisabled}
          isPersistent={props.isPersistent}
          onRemoveFilter={props.onRemoveFilter}
        />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content side="bottom" align="start">
          <PopoverContent>
            <Header
              label={props.label}
              operatorsInput={props.operatorsInput}
              onFilterOptionsSortClick={props.onFilterOptionsSortClick}
            />
            {props.filter}
            <Footer
              onApplyFilter={props.onApplyFilter}
              onClearFilter={props.onClearFilter}
            />
            <Popover.Close />
          </PopoverContent>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default FilterMenu;
