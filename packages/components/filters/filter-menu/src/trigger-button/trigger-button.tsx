import { CaretDownIcon, CloseIcon } from '@commercetools-uikit/icons';
import { Badge } from '../badge';
import { Chip } from '../chip';
import type { TAppliedFilterValue } from '../filter-menu';
import styled from '@emotion/styled';
import { designTokens } from '@commercetools-uikit/design-system';
import SecondaryIconButton from '@commercetools-uikit/secondary-icon-button';
import {
  forwardRef,
  LegacyRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

const { colorNeutral85, colorNeutral40, colorPrimary, fontSize20 } =
  designTokens;

const useScrollObserver = (ref: RefObject<HTMLElement>, totalCount: number) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const numRef = useRef(totalCount); // Store the current num value in a ref

  useEffect(() => {
    numRef.current = totalCount; // Update the ref whenever num changes
  }, [totalCount]);

  useEffect(() => {
    if (isOverflowing) {
      setVisibleCount(numRef.current);
    } else {
      setVisibleCount(0);
    }
  }, [isOverflowing]);

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

  return { isOverflowing, overflowCount: totalCount - visibleCount + 1 };
};

const Container = styled.div({
  display: 'inline-flex',
  borderRadius: '1rem',
  height: '2rem',
  boxShadow: `0px 0px 0 1px ${colorNeutral85}`,
  overflow: 'hidden',
  position: 'relative',
  alignItems: 'center',

  paddingLeft: '.5rem',
  paddingRight: '.5rem',
  gap: '.5rem',
  cursor: 'pointer',

  maxWidth: '100%',
});

const Label = styled.div({
  color: colorNeutral40,
  fontSize: fontSize20,
  lineHeight: 1,
  flexGrow: 0,
});

const ClearButtonContainer = styled.div({
  position: 'relative',
  zIndex: 2,
  flexGrow: 0,
  flexShrink: 0,
});

const ValueContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '.25rem',
  flexGrow: 1,
  flexShrink: 1,
  overflow: 'hidden',
  position: 'relative',
  paddingLeft: 0,
});

const BadgeContainer = styled.div({
  position: 'absolute',
  right: 0,
  height: '2rem',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(to right, transparent, white 25%)',
  paddingLeft: '1.25rem',
});

const OverlayButton = styled.button({
  background: 'transparent',
  border: 0,
  position: 'absolute',
  inset: 0,
  zIndex: 1,
  borderRadius: 999,
  ':focus': {
    boxShadow: `0px 0px 0px 2px ${colorPrimary}`,
  },
});

export type TFilterMenuTriggerButtonProps = {
  /**
   * formatted message to display the filter's name
   */
  label: string;
  /**
   * the values applied to this filter by the user
   *
   * NOTE / OPINIONS WELCOME IN PR COMMENTS:
   * this will almost certainly be some sort of generic w/validation - all the `Chip` really
   * needs is the selected option's `label`, but these options need to contain a lot more data
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
   *
   * NOTES / OPINIONS WELCOME IN PR COMMENTS:
   * is the presence/absence of the function sufficient for display logic, or do we need a separate `show-` prop?
   */
  onRemoveFilter?: Function;
};

const TriggerButton = forwardRef(function TriggerButton(
  props: TFilterMenuTriggerButtonProps,
  ref: LegacyRef<HTMLButtonElement>
) {
  const values = props.appliedFilterValues || [];
  const filtersApplied: boolean = values.length > 0;

  const chipListRef = useRef<HTMLDivElement>(null);
  const { isOverflowing, overflowCount } = useScrollObserver(
    chipListRef,
    values.length
  );

  const {
    label,
    appliedFilterValues,
    isDisabled,
    isPersistent,
    onRemoveFilter,
    ...rest
  } = props;

  return (
    <Container>
      <Label>{props.label}</Label>
      {filtersApplied && (
        <ValueContainer as="ul" ref={chipListRef}>
          {values.length > 0 &&
            values.map((value) => <Chip key={value.key}>{value.label}</Chip>)}
          {isOverflowing && (
            <BadgeContainer as="li">
              <Badge>+{overflowCount}</Badge>
            </BadgeContainer>
          )}
        </ValueContainer>
      )}

      <ClearButtonContainer>
        {props.onRemoveFilter && !props.isPersistent && (
          <SecondaryIconButton
            icon={<CloseIcon />}
            label={`close ${props.label} filter`}
            onClick={(e) => {
              e.stopPropagation();
              props.onRemoveFilter!();
            }}
            size="10"
          />
        )}
      </ClearButtonContainer>

      <CaretDownIcon size="small" color="neutral60" />
      <OverlayButton ref={ref} aria-label={label} {...rest} />
    </Container>
  );
});

export default TriggerButton;
