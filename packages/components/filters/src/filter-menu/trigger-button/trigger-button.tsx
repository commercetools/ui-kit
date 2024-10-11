import {
  type ReactNode,
  forwardRef,
  type LegacyRef,
  type MutableRefObject,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CaretDownIcon, CloseBoldIcon } from '@commercetools-uikit/icons';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import { type TAppliedFilterValue } from '../filter-menu';
import * as styles from './trigger-button.styles';
import { Badge } from '../../badge';
import { Chip } from '../chip';

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

function useIsOverflowing(
  refs: MutableRefObject<Map<number, HTMLElement>>,
  values: TAppliedFilterValue[]
) {
  const [hiddenCount, setHiddenCount] = useState(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      let hiddenCount = 0;
      entries.forEach((entry) => {
        if (entry.intersectionRatio < 1) {
          ++hiddenCount;
        }
        observerRef.current!.unobserve(entry.target);
      });
      if (hiddenCount > 0) {
        setHiddenCount(hiddenCount);
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    });
  }, []);

  useLayoutEffect(() => {
    refs.current?.forEach((chip) => {
      const node = chip;
      if (!!observerRef.current && !!node) {
        observerRef.current.observe(node);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
    // won't call IntersectionObserver callback on initial mount without observerRef.current
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observerRef.current, refs, values]); // Let the triggers fire the effect too on changes

  return { hiddenCount, isOverflowing };
}

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

  const chipsRef = useRef<Map<number, HTMLElement>>(new Map());

  const { hiddenCount, isOverflowing } = useIsOverflowing(chipsRef, values);

  return (
    <div css={[styles.triggerWrapper, isDisabled && styles.disabled]}>
      <label css={styles.label} htmlFor={`${filterKey}-menu-trigger`}>
        {label}:
      </label>

      {filtersApplied && (
        <ul css={styles.valuesContainer}>
          {values.map((value, idx) => (
            <Chip
              key={value.value}
              label={value.label}
              ref={(el) =>
                el
                  ? chipsRef.current.set(idx, el)
                  : chipsRef.current.delete(idx)
              }
            />
          ))}
          {isOverflowing && (
            <li
              className="ui-kit-filter-trigger-badge-container"
              css={styles.badgeContainer}
            >
              <Badge
                id="ui-kit-filter-triger-badge"
                label={`+${hiddenCount}`}
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
