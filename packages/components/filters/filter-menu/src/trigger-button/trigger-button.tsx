import { type ReactElement } from 'react';
import IconButton from '../../../../buttons/icon-button';
import { CaretDownIcon, CloseIcon } from '../../../../icons';
import { Badge } from '../badge';
import { Chip } from '../chip';
import type { TAppliedFilterValue } from '../filter-menu';

export type TFilterMenuTriggerButtonProps = {
  /**
   * formatted message to display the filter's name
   */
  label: string | ReactElement;
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
   * whether or not the filter is disabled
   */
  isDisabled?: boolean;
  /**
   * indicates whether FilterMenu can be removed from the filtersList
   */
  isPersistent?: boolean;
  /**
   * controls whether `x` in Trigger Button is displayed - required if `isPersistent` is `false`
   *
   * NOTES / OPINIONS WELCOME IN PR COMMENTS:
   * is the presence/absence of the function sufficient for display logic, or do we need a separate `show-` prop?
   */
  onRemoveFilter?: Function;
};

const TriggerButton = (props: TFilterMenuTriggerButtonProps) => {
  return (
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
  );
};

export default TriggerButton;
