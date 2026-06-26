import { useRef, useCallback, useState, type KeyboardEvent } from 'react';
import { useCombobox } from 'downshift';
import { useIntl } from 'react-intl';
import type { DurationInputArg1, MomentInput } from 'moment';
import Constraints from '@commercetools-uikit/constraints';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import {
  createCalendarItems,
  getDateInMonth,
  getToday,
  changeMonth,
  getPaddingDayCount,
  getWeekdayNames,
  getMonthCalendarLabel,
  getYearCalendarLabel,
  isSameDay,
  getCalendarDayLabel,
  isBetween as isBetweenDates,
  createItemRangeToString,
  formatRange,
  parseInputToDate,
  getPreviousDay,
  getDaysInMonth,
  CalendarBody,
  CalendarMenu,
  CalendarHeader,
  CalendarContent,
  CalendarDay,
} from '@commercetools-uikit/calendar-utils';
import { getLocalizedDateTimeFormatPattern } from '@commercetools-uikit/calendar-time-utils';

type TPreventDownshiftDefaultEvent = {
  nativeEvent: { preventDownshiftDefault: boolean };
} & KeyboardEvent<HTMLInputElement | HTMLButtonElement>;

const preventDownshiftDefault = (event: TPreventDownshiftDefaultEvent) => {
  event.nativeEvent.preventDownshiftDefault = true;
};

const parseRangeText = (text: string, locale: string) => {
  const parts = text
    .split(' - ')
    .map((part) => {
      const parsedDate = parseInputToDate(part.trim(), locale);
      return parsedDate === '' ? null : parsedDate;
    })
    .filter(Boolean);
  return parts;
};

const isSameRange = (
  a: TDateRangeInputProps['value'],
  b: TDateRangeInputProps['value']
) => {
  if (a.length !== b.length) return false;
  if (a.length === 0) return true;
  if (a[0] === b[0] && a[1] === b[1]) return true;
  return false;
};

type TGetRangeArgs = {
  item: MomentInput;
  value: MomentInput[];
  startDate: MomentInput;
  highlightedItem: MomentInput;
};

const getRange = ({
  item,
  value,
  startDate,
  highlightedItem,
}: TGetRangeArgs) => {
  const isRangeSelectionInProgress = startDate;
  const hasSelection = value.length === 2;
  const isStartDate = isSameDay(item, startDate);

  const isBetween =
    highlightedItem && isBetweenDates(item, startDate, highlightedItem);

  let isRangeStart = false;
  if (isRangeSelectionInProgress) {
    isRangeStart = isStartDate;
  } else if (hasSelection) {
    isRangeStart = value[0] === item;
  }

  let isRangeBetween = false;
  if (isRangeSelectionInProgress) {
    isRangeBetween = isBetween as boolean;
  } else if (hasSelection) {
    isRangeBetween = isBetweenDates(item, value[0], value[1]);
  }

  let isRangeEnd = false;
  if (isRangeSelectionInProgress) {
    isRangeEnd = item === highlightedItem;
  } else if (hasSelection) {
    isRangeEnd = value[1] === item;
  }

  return {
    isRangeStart,
    isRangeBetween,
    isRangeEnd,
  };
};

type TCustomEvent = {
  target: {
    id?: string;
    name?: string;
    value?: MomentInput[];
  };
};

export type TDateRangeInputProps = {
  /**
   * Horizontal size limit of the input field.
   */
  horizontalConstraint?:
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 'scale'
    | 'auto';
  /**
   * The selected date range, must either be an empty array or an array of two strings holding dates formatted as "YYYY-MM-DD".
   */
  value: MomentInput[];
  /**
   * Indicate if the value entered in the input is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * HTML ID of an element containing an error message related to the input.
   */
  'aria-errormessage'?: string;
  /**
   * Called when the date range changes. Called with an event containing either an empty array (no value) or an array holding two string in this format: "YYYY-MM-DD".
   */
  onChange?: (event: TCustomEvent) => void;
  /**
   * Allows the range to be cleared
   */
  isClearable?: boolean;
  /**
   * Called when the date input gains focus.
   */
  onFocus?: (event: TCustomEvent) => void;
  /**
   * Called when the date input loses focus.
   */
  onBlur?: (event: TCustomEvent) => void;
  /**
   * Used as the HTML `id` attribute.
   */
  id?: string;
  /**
   * Used as the HTML `name` attribute.
   */
  name?: string;
  /**
   * Placeholder value to show in the input field
   */
  placeholder?: string;
  /**
   * Use this property to reduce the paddings of the component for a ui compact variant
   */
  isCondensed?: boolean;
  /**
   * Disables the date picker
   */
  isDisabled?: boolean;
  /**
   * Disables the date picker menu and makes input field read-only
   */
  isReadOnly?: boolean;
  /**
   * Indicates the input field has an error
   */
  hasError?: boolean;
  /**
   * Indicates the input field has warning
   */
  hasWarning?: boolean;
  /**
   * Indicates the appearance of the input.
   * Filter appearance removes borders and box shadows, and calendar is always open.
   */
  appearance?: 'default' | 'filter';
};

const DateRangeInput = ({
  isClearable = true,
  ...props
}: TDateRangeInputProps) => {
  const intl = useIntl();

  const [calendarDate, setCalendarDate] = useState<MomentInput>(
    props.value.length === 2 ? props.value[0] : getToday()
  );
  const [suggestedItems, setSuggestedItems] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<MomentInput>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(
    formatRange(props.value, intl.locale)
  );

  // Sync inputValue when props.value or locale changes (replaces getDerivedStateFromProps)
  const prevValueRef = useRef(props.value);
  const prevLocaleRef = useRef(intl.locale);
  if (
    !isSameRange(props.value, prevValueRef.current) ||
    intl.locale !== prevLocaleRef.current
  ) {
    prevValueRef.current = props.value;
    prevLocaleRef.current = intl.locale;
    const newInputValue = formatRange(props.value, intl.locale);
    if (newInputValue !== inputValue) {
      setInputValue(newInputValue);
    }
  }

  const inputRef = useRef<HTMLInputElement>(null);

  const appearance = props.appearance || 'default';

  const emit = useCallback(
    (unsortedRange: MomentInput[]) => {
      props.onChange?.({
        target: {
          id: props.id,
          name: props.name,
          value: unsortedRange.sort(),
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onChange, props.id, props.name]
  );

  const jumpMonth = useCallback(
    (amount: DurationInputArg1, dayToHighlight = 0) => {
      setCalendarDate((prevDate) => {
        return changeMonth(prevDate, amount);
      });
      setHighlightedIndex(dayToHighlight);
    },
    []
  );

  const showToday = useCallback(() => {
    const today = getToday();
    setCalendarDate(today);
    setHighlightedIndex(suggestedItems.length + getDateInMonth(today) - 1);
    inputRef.current?.focus();
  }, [suggestedItems.length]);

  const handleBlur = useCallback(() => {
    if (props.onBlur)
      props.onBlur({
        target: {
          id: props.id,
          name: props.name,
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.onBlur, props.id, props.name]);

  const calendarItems = createCalendarItems(calendarDate);
  const allItems = [...suggestedItems, ...calendarItems];

  // Ref to track whether we want to intercept InputKeyDownEnter (for keyboard clear)
  const shouldInterceptEnterRef = useRef(false);

  const {
    getInputProps,
    getMenuProps,
    getItemProps,
    getToggleButtonProps,
    selectItem,
    setInputValue: setDownshiftInputValue,
    setHighlightedIndex: setDownshiftHighlightedIndex,
    openMenu,
    isOpen: downshiftIsOpen,
    highlightedIndex: downshiftHighlightedIndex,
    inputValue: downshiftInputValue,
  } = useCombobox({
    inputId: props.id,
    items: allItems,
    itemToString: createItemRangeToString(intl.locale),
    selectedItem: null,
    isOpen: isOpen,
    inputValue: inputValue,
    highlightedIndex: highlightedIndex ?? -1,
    isItemDisabled: () => Boolean(props.isDisabled),
    stateReducer: (state, { type, changes }) => {
      // When we want to intercept Enter (to clear with keyboard), prevent downshift
      // from processing it (it would otherwise try to select a highlighted item or close).
      if (
        type === useCombobox.stateChangeTypes.InputKeyDownEnter &&
        shouldInterceptEnterRef.current
      ) {
        // Reset the intercept flag and return current state unchanged
        shouldInterceptEnterRef.current = false;
        return state;
      }
      return changes;
    },
    onIsOpenChange: ({ isOpen: newIsOpen }) => {
      setIsOpen(newIsOpen ?? false);
    },
    onInputValueChange: ({ inputValue: newInputValue, type }) => {
      // only attempt to parse input when the user typed into the input field
      if (type !== useCombobox.stateChangeTypes.InputChange) return;
      const parsedRange = parseRangeText(newInputValue ?? '', intl.locale);
      if (parsedRange.length === 0) {
        setSuggestedItems([]);
        setHighlightedIndex(null);
        setInputValue(newInputValue ?? '');
        setStartDate(null);
      } else if (parsedRange.length === 1) {
        const calDate = parsedRange[0] as MomentInput;
        setSuggestedItems([]);
        setHighlightedIndex(getDateInMonth(calDate) - 1);
        setInputValue(newInputValue ?? '');
        setStartDate(parsedRange[0] as MomentInput);
        setCalendarDate(calDate);
      } else if (parsedRange.length === 2) {
        const calDate = parsedRange[1] as MomentInput;
        setSuggestedItems([]);
        setHighlightedIndex(getDateInMonth(calDate) - 1);
        setInputValue(newInputValue ?? '');
        setStartDate(parsedRange[0] as MomentInput);
        setCalendarDate(calDate);
      }
    },
    onSelectedItemChange: ({ selectedItem: newItem }) => {
      if (startDate && newItem) {
        emit([startDate, newItem]);
      } else {
        emit([]);
      }
    },
    onStateChange: (changes) => {
      if (
        changes.type === useCombobox.stateChangeTypes.MenuMouseLeave ||
        changes.type === useCombobox.stateChangeTypes.InputBlur
      ) {
        setHighlightedIndex(null);
        setIsOpen(false);
        setInputValue(formatRange(props.value, intl.locale));
        return;
      }

      if (changes.hasOwnProperty('selectedItem')) {
        const hasStartedRangeSelection = Boolean(
          !startDate && changes.selectedItem
        );
        const hasFinishedRangeSelection = Boolean(
          startDate && changes.selectedItem
        );

        setHighlightedIndex(highlightedIndex);
        setStartDate(startDate ? null : (changes.selectedItem as MomentInput));
        if (changes.selectedItem) {
          setCalendarDate(changes.selectedItem as MomentInput);
        }
        setIsOpen(!hasFinishedRangeSelection);
        setInputValue(
          (() => {
            if (hasFinishedRangeSelection) {
              return formatRange(
                [startDate, changes.selectedItem as MomentInput],
                intl.locale
              );
            }
            if (hasStartedRangeSelection) {
              return formatRange(
                [changes.selectedItem as MomentInput],
                intl.locale
              );
            }
            return '';
          })()
        );
        return;
      }

      if (changes.hasOwnProperty('isOpen')) {
        setIsOpen(changes.isOpen ?? false);
        setHighlightedIndex(
          changes.highlightedIndex !== undefined &&
            changes.highlightedIndex !== -1
            ? changes.highlightedIndex
            : null
        );
        if (changes.inputValue !== undefined) {
          setInputValue(changes.inputValue);
        }
        setStartDate(null);
        setCalendarDate(props.value.length === 2 ? props.value[0] : getToday());
        return;
      }

      if (changes.hasOwnProperty('highlightedIndex')) {
        setHighlightedIndex(
          changes.highlightedIndex !== undefined &&
            changes.highlightedIndex !== -1
            ? changes.highlightedIndex
            : null
        );
      }
    },
  });

  const paddingDayCount = getPaddingDayCount(calendarDate, intl.locale);
  const paddingDays = Array(paddingDayCount).fill(undefined);
  const weekdays = getWeekdayNames(intl.locale);
  const today = getToday();

  const shouldShowCalendar =
    (downshiftIsOpen && !props.isDisabled) ||
    (appearance === 'filter' && !props.isDisabled && !props.isReadOnly);

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <div onFocus={props.onFocus} onBlur={handleBlur}>
        <CalendarBody
          inputRef={inputRef}
          appearance={appearance}
          inputProps={getInputProps({
            /* ARIA */
            'aria-invalid': props['aria-invalid'],
            'aria-errormessage': props['aria-errormessage'],
            // Unset the aria-labelledby as it interferes with the link
            // between the <label for> and the <input id>.
            'aria-labelledby': undefined,
            name: props.name,
            placeholder:
              typeof props.placeholder === 'string'
                ? props.placeholder
                : `${getLocalizedDateTimeFormatPattern(
                    intl.locale
                  )} - ${getLocalizedDateTimeFormatPattern(intl.locale)}`,
            onMouseEnter: () => {
              // we remove the highlight so that the user can use the
              // arrow keys to move the cursor when hovering
              if (downshiftIsOpen) setDownshiftHighlightedIndex(-1);
            },
            onKeyDown: (event) => {
              if (props.isReadOnly) {
                preventDownshiftDefault(event as TPreventDownshiftDefaultEvent);
                return;
              }
              if (
                event.key === 'Enter' &&
                downshiftInputValue?.trim() === '' &&
                // do not clear value when user presses Enter to
                // select the end date (so only clear when there is no startDate)
                !startDate &&
                isClearable
              ) {
                // Signal to stateReducer to intercept/swallow the Enter key in downshift
                shouldInterceptEnterRef.current = true;
                // Also use preventDownshiftDefault as a belt-and-suspenders approach
                preventDownshiftDefault(event as TPreventDownshiftDefaultEvent);
                // Clear state (keep menu open to match original behavior)
                setInputValue('');
                setStartDate(null);
                setHighlightedIndex(null);
                emit([]);
              }
              // ArrowDown
              if (event.key === 'ArrowDown') {
                if (
                  (downshiftHighlightedIndex as number) + 1 >=
                  calendarItems.length
                ) {
                  // if it's the end of the month
                  // then bypass normal arrow navigation
                  preventDownshiftDefault(
                    event as TPreventDownshiftDefaultEvent
                  );
                  // then jump to start of next month
                  jumpMonth(1, 0);
                }
              }
              // ArrowUp
              if (event.key === 'ArrowUp') {
                const previousDay = getPreviousDay(
                  calendarItems[downshiftHighlightedIndex as number]
                );
                if ((downshiftHighlightedIndex as number) <= 0) {
                  // if it's the start of the month
                  // then bypass normal arrow navigation
                  preventDownshiftDefault(
                    event as TPreventDownshiftDefaultEvent
                  );

                  const numberOfDaysOfPrevMonth = getDaysInMonth(previousDay);
                  // then jump to the last day of the previous month
                  jumpMonth(-1, numberOfDaysOfPrevMonth - 1);
                }
              }
            },
            // we only do this for readOnly because the input
            // doesn't ignore these events, unlike when its disabled
            onClick: props.isReadOnly ? undefined : () => openMenu(),
            ...filterDataAttributes(props),
          })}
          hasSelection={props.value.length === 2}
          isClearable={isClearable}
          onClear={() => {
            setStartDate(null);
            emit([]);
            selectItem(null);
            setDownshiftInputValue('');
          }}
          isOpen={downshiftIsOpen}
          isDisabled={props.isDisabled}
          isReadOnly={props.isReadOnly}
          isCondensed={props.isCondensed}
          toggleButtonProps={getToggleButtonProps()}
          hasError={props.hasError}
          hasWarning={props.hasWarning}
        />
        {shouldShowCalendar && (
          <CalendarMenu
            {...getMenuProps({}, { suppressRefError: true })}
            hasError={props.hasError}
            hasWarning={props.hasWarning}
            appearance={appearance}
          >
            <CalendarHeader
              monthLabel={getMonthCalendarLabel(calendarDate, intl.locale)}
              yearLabel={getYearCalendarLabel(calendarDate, intl.locale)}
              onPrevMonthClick={() => jumpMonth(-1)}
              onTodayClick={showToday}
              onNextMonthClick={() => jumpMonth(1)}
              onPrevYearClick={() => jumpMonth(-12)}
              onNextYearClick={() => jumpMonth(12)}
            />
            <CalendarContent>
              {weekdays.map((weekday) => (
                <CalendarDay key={weekday} type="heading">
                  {weekday}
                </CalendarDay>
              ))}
              {paddingDays.map((_, index) => (
                <CalendarDay key={index} type="spacing" />
              ))}
              {calendarItems.map((item, index) => {
                const isHighlighted =
                  suggestedItems.length + index === downshiftHighlightedIndex;
                const { isRangeStart, isRangeBetween, isRangeEnd } = getRange({
                  item,
                  value: props.value,
                  startDate: startDate,
                  highlightedItem: allItems[highlightedIndex || 0],
                });
                return (
                  <CalendarDay
                    key={item}
                    isToday={isSameDay(today, item)}
                    {...getItemProps({
                      item,
                      onMouseOut: () => {
                        setDownshiftHighlightedIndex(-1);
                      },
                    })}
                    isHighlighted={isHighlighted}
                    isRangeStart={isRangeStart}
                    isRangeBetween={isRangeBetween}
                    isRangeEnd={isRangeEnd}
                  >
                    {getCalendarDayLabel(item)}
                  </CalendarDay>
                );
              })}
            </CalendarContent>
          </CalendarMenu>
        )}
      </div>
    </Constraints.Horizontal>
  );
};

DateRangeInput.displayName = 'DateRangeInput';
DateRangeInput.isEmpty = (range: number[]) => range.length === 0;
DateRangeInput.defaultProps = { isClearable: true };

export default DateRangeInput;
