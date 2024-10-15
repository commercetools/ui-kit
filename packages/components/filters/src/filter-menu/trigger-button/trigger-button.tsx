import {
  type ReactNode,
  forwardRef,
  type LegacyRef,
  useCallback,
  useRef,
  useState,
} from 'react';
import { CaretDownIcon, CloseBoldIcon } from '@commercetools-uikit/icons';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import { type TAppliedFilterValue } from '../filter-menu';
import * as styles from './trigger-button.styles';
import { Badge } from '../../badge';
import { Chip } from '../chip';

const useScrollObserver = (totalCount: number) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [overflowCount, setOverflowCount] = useState(0);
  const containerRef = useRef<HTMLUListElement | null>(null);

  const setContainerRef = useCallback(
    (node: HTMLUListElement | null) => {
      if (node) {
        containerRef.current = node;

        const { clientWidth, scrollWidth, children } = node;
        const hasOverflow = scrollWidth > clientWidth;

        setIsOverflowing(hasOverflow);

        let visibleChipCount = 0;

        if (hasOverflow) {
          Array.from(children).forEach((child) => {
            const childRect = child.getBoundingClientRect();
            const containerRect = node.getBoundingClientRect();
            if (
              // if the right hand side of the child is past the right of the container
              childRect.right <= containerRect.right &&
              // and it's not the badge
              !Array.from(child.classList).includes(
                'ui-kit-filter-trigger-badge-container'
              )
            ) {
              ++visibleChipCount;
            }
          });
        }
        setOverflowCount(totalCount - visibleChipCount);
      }
    },
    [totalCount]
  );

  return {
    isOverflowing,
    overflowCount,
    setContainerRef,
  };
};

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

  const { isOverflowing, overflowCount, setContainerRef } = useScrollObserver(
    values.length
  );

  return (
    <div css={[styles.triggerWrapper, isDisabled && styles.disabled]}>
      <label
        css={styles.label}
        htmlFor={`${filterKey}-menu-trigger`}
        id={`${filterKey}-menu-label`}
      >
        {label}:
      </label>
      {filtersApplied && (
        <ul ref={setContainerRef} css={styles.valuesContainer}>
          {values.map((value) => (
            <Chip key={value.value} label={value.label} />
          ))}
          {isOverflowing && overflowCount && (
            <li
              className="ui-kit-filter-trigger-badge-container"
              css={styles.badgeContainer}
            >
              <Badge
                id="ui-kit-filter-triger-badge"
                label={`+${overflowCount}`}
              />
            </li>
          )}
        </ul>
      )}
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
        aria-labelledby={`${filterKey}-menu-label`}
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
