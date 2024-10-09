import { type ReactNode, forwardRef, type LegacyRef } from 'react';
import { CaretDownIcon, CloseBoldIcon } from '@commercetools-uikit/icons';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import { type TAppliedFilterValue } from '../filter-menu';
import * as styles from './trigger-button.styles';

export type TFilterMenuTriggerButtonProps = {
  /**
   * unique identifier for the filter
   */
  filterKey: string;
  /**
   * formatted message to display the filter's name
   */
  label: ReactNode;
  /**
   * the values applied to this filter by the user
   */
  appliedFilterValues: TAppliedFilterValue[] | undefined | null;
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
   */
  onRemoveRequest?: Function;
};

const TriggerButton = forwardRef(function TriggerButton(
  props: TFilterMenuTriggerButtonProps,
  ref: LegacyRef<HTMLButtonElement>
) {
  const {
    filterKey,
    label,
    appliedFilterValues,
    isDisabled,
    isPersistent,
    onRemoveRequest,
    ...rest
  } = props;

  const values = appliedFilterValues || [];
  const filtersApplied: boolean = values.length > 0;
  return (
    <div css={[styles.triggerWrapper, isDisabled && styles.disabled]}>
      <label css={styles.label} htmlFor={`${filterKey}-menu-trigger`}>
        {label}:
      </label>
      {/** THESE CONTAINERS ARE FOR THE NEXT PR, when the `Chip` and `Badge` are merged */}
      {/* {filtersApplied && (
        <ul css={styles.valuesContainer}>
          test
          <span
            className="ui-kit-filter-trigger-badge-container"
            css={styles.badgeContainer}
          >
            -
          </span>
        </ul>
      )} */}
      {!filtersApplied && (
        <CaretDownIcon
          aria-label={`toggle filter menu icon`}
          size="small"
          color="neutral60"
        />
      )}
      <button
        css={[styles.mainActionButton, isDisabled && styles.disabledButton]}
        ref={ref}
        id={`${filterKey}-menu-trigger`}
        aria-disabled={isDisabled}
        {...rest}
        {...(isDisabled && {
          tabIndex: -1,
          disabled: true,
          readOnly: true,
        })}
      />
      {filtersApplied && onRemoveRequest && !isPersistent && (
        <div css={[styles.removeButton, isDisabled && styles.disabledButton]}>
          <SecondaryIconButton
            icon={<CloseBoldIcon />}
            size="10"
            label={`remove ${label} filter`}
            isDisabled={props.isDisabled}
            onClick={(e) => {
              e.stopPropagation();
              onRemoveRequest!();
            }}
          />
        </div>
      )}
    </div>
  );
});

export default TriggerButton;
