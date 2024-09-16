import { type ReactElement } from 'react';
import DropdownMenu from '../../../dropdowns/dropdown-menu';
import IconButton from '../../../buttons/icon-button';
import { CaretDownIcon, CloseIcon } from '../../../icons';
import { Badge } from './badge';
import { Chip } from './chip';
import { Footer } from './footer';
import { Header } from './header';

export type TAppliedFilterValue = {
  key?: string;
  label: string | ReactElement;
};

export type TFilterMenuProps = {
  /**
   * unique identifier for the filter
   */
  key: string;
  /**
   * formatted message to display the filter's name
   */
  label: string | ReactElement;
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
  appliedFilterValues:
    | TAppliedFilterValue
    | TAppliedFilterValue[]
    | undefined
    | null;
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
function FilterMenu(props: TFilterMenuProps) {
  return (
    // dropdown menu needs way to programatically clo
    <DropdownMenu
      triggerElement={
        /**should this be its own component like chip/badge/etc? */
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            border: 'solid 1px rebeccapurple',
            padding: '8px',
            color: 'rebeccapurple',
            backgroundColor: 'papayawhip',
          }}
        >
          {props.label}
          {props.appliedFilterValues &&
            (Array.isArray(props.appliedFilterValues) ? (
              props.appliedFilterValues.map((value) => (
                <Chip key={value.key} label={value.label} />
              ))
            ) : (
              <Chip label={props.appliedFilterValues.label} />
            ))}
          {props.appliedFilterValues &&
            Array.isArray(props.appliedFilterValues) && (
              <Badge label={`+${props.appliedFilterValues.length}`} />
            )}
          {props.onRemoveFilter && !props.isPersistent && (
            <IconButton
              icon={<CloseIcon />}
              label={`close ${props.label} filter`}
              onClick={(e) => {
                e.stopPropagation();
                props.onRemoveFilter!();
              }}
              size="20"
            />
          )}
          <CaretDownIcon size="small" color="info" />
        </button>
      }
      menuHorizontalConstraint={7}
      menuMaxHeight={1000}
    >
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
    </DropdownMenu>
  );
}

export default FilterMenu;
