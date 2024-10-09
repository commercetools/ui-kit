import {
  type ReactNode,
  forwardRef,
  type LegacyRef,
  type RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { CaretDownIcon, CloseBoldIcon } from '@commercetools-uikit/icons';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import { type TAppliedFilterValue } from '../filter-menu';
import * as styles from './trigger-button.styles';
import { Badge } from '../../badge';
import { Chip } from '../chip';

type TVisibleHiddenCount = number | undefined;

const useScrollObserver = (ref: RefObject<HTMLElement>, totalCount: number) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const numRef = useRef(totalCount); // Store the current num value in a ref

  useEffect(() => {
    numRef.current = totalCount; // Update the ref whenever num changes
  }, [totalCount]);

  useLayoutEffect(() => {
    if (isOverflowing) {
      let counts;
      setTimeout(() => {
        const node = ref.current;
        const { clientWidth, children } = node!;
        let widthOfAllChildren = 0;
        counts = Array.from(children).reduce<TVisibleHiddenCount>(
          (acc, child, idx) => {
            const { width } = child.getBoundingClientRect();
            widthOfAllChildren = widthOfAllChildren += width;
            console.log(width);
            if (widthOfAllChildren <= clientWidth) {
              console.log(idx);
              acc = idx + 1;
            }
            return acc;
          },
          0
        );
        console.log(counts);
        setVisibleCount(counts ? counts : 0);
      }, 100);
    } else {
      setVisibleCount(0);
    }
  }, [isOverflowing, ref]);

  useEffect(() => {
    const node = ref.current;
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
  }, [ref, ref.current]);
  console.log(visibleCount);
  return { isOverflowing, overflowCount: totalCount - visibleCount + 1 };
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

  const appliedValuesContainer = useRef<HTMLUListElement>(null);
  const { isOverflowing, overflowCount } = useScrollObserver(
    appliedValuesContainer,
    values.length
  );

  return (
    <div css={[styles.triggerWrapper, isDisabled && styles.disabled]}>
      <label css={styles.label} htmlFor={`${filterKey}-menu-trigger`}>
        {label}:
      </label>
      {/** THESE CONTAINERS ARE FOR THE NEXT PR, when the `Chip` and `Badge` are merged */}
      {filtersApplied && (
        <ul ref={appliedValuesContainer} css={styles.valuesContainer}>
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
