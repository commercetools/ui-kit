import {
  type ReactNode,
  forwardRef,
  type LegacyRef,
  useLayoutEffect,
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
  const [visibleCount, setVisibleCount] = useState(0);
  const containerRef = useRef<HTMLUListElement | null>(null);

  const setContainerRef = useCallback((node: HTMLUListElement) => {
    if (node) {
      containerRef.current = node;
    }
  }, []);

  useLayoutEffect(() => {
    if (isOverflowing) {
      const node = containerRef.current;
      if (!node) return;
      const { clientWidth, children } = node;
      let count;
      let widthOfAllChildren = 0;
      count = Array.from(children).reduce<number>((acc, child, idx) => {
        const { width } = child.getBoundingClientRect();
        widthOfAllChildren = widthOfAllChildren += width;

        if (widthOfAllChildren <= clientWidth) {
          acc = idx + 1;
        }
        return acc;
      }, 0);
      setVisibleCount(count);
    } else {
      setVisibleCount(0);
    }
  }, [isOverflowing]);

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const checkOverflow = () => {
      const { clientWidth, scrollWidth } = node;
      setIsOverflowing(scrollWidth > clientWidth);
    };

    checkOverflow();

    // Observe size changes
    const resizeObserver = new ResizeObserver(() => checkOverflow());

    resizeObserver.observe(node);

    // Clean up observer on unmount
    return () => {
      resizeObserver.unobserve(node);
    };
    // doesn't work without ref.current
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, containerRef.current]);
  console.log(visibleCount, totalCount, isOverflowing);
  return {
    isOverflowing,
    overflowCount: totalCount - visibleCount,
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
      <label css={styles.label} htmlFor={`${filterKey}-menu-trigger`}>
        {label}:
      </label>
      {filtersApplied && (
        <ul ref={setContainerRef} css={styles.valuesContainer}>
          {values.map((value) => (
            <Chip key={value.value} label={value.label} />
          ))}
          {isOverflowing && (
            <span
              className="ui-kit-filter-trigger-badge-container"
              css={styles.badgeContainer}
            >
              <Badge
                id="ui-kit-filter-triger-badge"
                label={`+${overflowCount}`}
              />
            </span>
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
