import { type ReactNode, type ReactElement } from 'react';
import DropdownMenu from '@commercetools-uikit/dropdown-menu';
import { type TSelectInputProps } from '@commercetools-uikit/select-input';
import { type TPrimaryButtonProps } from '@commercetools-uikit/primary-button';
import { Footer } from './footer';
import { Header } from './header';
import { TriggerButton } from './trigger-button';

export type TAppliedFilterValue = {
  value: string;
  label: ReactNode;
};

export type TFilterMenuProps = {
  /**
   * unique identifier for the filter
   */
  filterKey: string;
  /**
   * formatted message to display the filter's name
   */
  label: ReactNode;
  /**
   * the input in which the user selects values for the filter
   *
   * NOTE / OPINIONS WELCOME IN PR COMMENTS:
   * can either pass a react element and let the consuming app choose what input to use,
   * or start defining different menu bodies based on props and only make predefined input
   * types available, which is restrictive and much higher maintenance
   */
  renderMenuBody: () => ReactNode;
  /**
   * the input in which the user can select which operator should be used for this filter
   *
   * NOTE / OPINIONS WELCOME IN PR COMMENTS:
   * the alternative to a rect element is passing in an array of operators and a handler function,
   * which is more achievable here than for the input in the body, but could still be restrictive
   */
  renderOperatorsInput?: () => ReactElement<TSelectInputProps>;
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
  onRemoveRequest?: Function;
  /**
   * controls whether `apply` button in Menu Body Footer is displayed
   */
  renderApplyButton?: () => ReactElement<TPrimaryButtonProps>;
  /**
   * controls whether `clear` button in Menu Body Footer is displayed
   */
  onClearRequest?: Function;
  /**
   * controls whether `sort` button in Menu Body Header is displayed
   */
  onSortRequest?: Function;
};

function FilterMenu(props: TFilterMenuProps) {
  return (
    <DropdownMenu
      triggerElement={
        <TriggerButton
          label={props.label}
          appliedFilterValues={props.appliedFilterValues}
          isDisabled={props.isDisabled}
          isPersistent={props.isPersistent}
          onRemoveRequest={props.onRemoveRequest}
        />
      }
      menuHorizontalConstraint={7}
      menuMaxHeight={1000}
    >
      <Header
        label={props.label}
        renderOperatorsInput={props.renderOperatorsInput}
        onSortRequest={props.onSortRequest}
      />
      {props.renderMenuBody()}
      <Footer
        renderApplyButton={props.renderApplyButton}
        onClearRequest={props.onClearRequest}
      />
    </DropdownMenu>
  );
}

export default FilterMenu;
