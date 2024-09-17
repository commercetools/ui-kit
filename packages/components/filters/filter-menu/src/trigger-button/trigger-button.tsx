import { type ReactElement } from 'react';
import IconButton from '@commercetools-uikit/icon-button';
import { CaretDownIcon, CloseIcon } from '@commercetools-uikit/icons';
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
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        border: 'solid 1px rebeccapurple',
        padding: '8px',
        color: 'rebeccapurple',
        backgroundColor: 'papayawhip',
        position: 'relative',
      }}
    >
      {/**a horribly dirty trick to simulate 'nested' buttons w/o syntax errors */}
      <button
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          background: 'transparent',
          border: 'none',
        }}
        aria-label="open menu"
      />
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
        <span style={{ zIndex: '1' }}>
          <IconButton
            icon={<CloseIcon />}
            label={`close ${props.label} filter`}
            onClick={(e) => {
              e.stopPropagation();
              props.onRemoveFilter!();
            }}
            size="20"
          />
        </span>
      )}
      <CaretDownIcon size="small" color="info" />
    </div>
  );
};

export default TriggerButton;
