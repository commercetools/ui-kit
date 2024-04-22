import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent,
  type FocusEventHandler,
} from 'react';
import Downshift from 'downshift';
import { useIntl } from 'react-intl';
import type { DurationInputArg1 } from 'moment';
import Constraints from '@commercetools-uikit/constraints';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';
import {
  getDateInMonth,
  getToday,
  changeMonth,
  getPaddingDayCount,
  getWeekdayNames,
  getMonthCalendarLabel,
  getYearCalendarLabel,
  isSameDay,
  getCalendarDayLabel,
  createCalendarItems,
  createItemToString,
  parseInputToDate,
  getIsDateInRange,
  getNextDay,
  getPreviousDay,
  getDaysInMonth,
  CalendarBody,
  CalendarMenu,
  CalendarHeader,
  CalendarContent,
  CalendarDay,
} from '@commercetools-uikit/calendar-utils';
import { getLocalizedDateTimeFormatPattern } from '@commercetools-uikit/calendar-time-utils';

type TDownshiftEvent = {
  nativeEvent: {
    preventDownshiftDefault?: boolean;
  };
} & KeyboardEvent<HTMLInputElement | HTMLButtonElement>;

const preventDownshiftDefault = (event: TDownshiftEvent) => {
  event.nativeEvent.preventDownshiftDefault = true;
};

type TCustomEvent = {
  target: {
    id?: string;
    name?: string;
    value?: string;
  };
};

export type TDateInput = {
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
   * The selected date, must either be an empty string or a date formatted as "YYYY-MM-DD".
   */
  value: string;
  /**
   * Called when the date changes. Called with an event containing either an empty string (no value) or a string in this format: "YYYY-MM-DD".
   */
  onChange?: (event: TCustomEvent) => void;
  /**
   * Called when the date input gains focus.
   */
  onFocus?: FocusEventHandler<HTMLDivElement>;
  /**
   * Called when the date input loses focus.
   */
  onBlur?: (event: TCustomEvent) => void;
  /**
   * Used as the HTML `id` attribute.
   */
  id?: string;
  /**
   * Indicate if the value entered in the input is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * HTML ID of an element containing an error message related to the input.
   */
  'aria-errormessage'?: string;
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
   * Indicates the input field has a warning
   */
  hasWarning?: boolean;
  /**
   * A minimum selectable date. Must either be an empty string or a date formatted as "YYYY-MM-DD".
   */
  minValue?: string;
  /**
   * A maximum selectable date. Must either be an empty string or a date formatted as "YYYY-MM-DD".
   */
  maxValue?: string;
};

const DateInput = (props: TDateInput) => {
  const intl = useIntl();
  const [calendarDate, setCalendarDate] = useState(props.value || getToday());
  const [suggestedItems, setSuggestedItems] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<
    number | null | undefined
  >(props.value === '' ? null : getDateInMonth(props.value) - 1);
  const inputRef = useRef<HTMLInputElement>(null);

  if (!props.isReadOnly) {
    warning(
      typeof props.onChange === 'function',
      'DateInput: `onChange` is required when input is not read only.'
    );
  }

  const { onChange } = props;
  const emit = useCallback(
    (value: string | null) =>
      onChange?.({
        target: {
          id: props.id,
          name: props.name,
          // when cleared the value is null, but we always want it to be an
          // empty string when there is no value.
          value: value || '',
        },
      }),
    [onChange, props.id, props.name]
  );

  const handleChange = useCallback(
    (date: string | null) => {
      inputRef.current?.setSelectionRange(0, 100);
      emit(date);
    },
    [inputRef, emit]
  );

  const { onBlur } = props;
  const handleBlur = useCallback(() => {
    if (onBlur)
      onBlur({
        target: {
          id: props.id,
          name: props.name,
        },
      });
  }, [onBlur, props.id, props.name]);

  const showToday = () => {
    const today = getToday();
    setCalendarDate(today);
    setHighlightedIndex(suggestedItems.length + getDateInMonth(today) - 1);
    inputRef.current?.focus();
  };

  const jumpMonth = (amount: DurationInputArg1, dayToHighlight = 0) => {
    const nextDate = changeMonth(calendarDate, amount);
    setCalendarDate(nextDate);
    setHighlightedIndex(dayToHighlight);
  };

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <Downshift
        key={intl.locale}
        inputId={props.id}
        itemToString={createItemToString(intl.locale)}
        selectedItem={props.value === '' ? null : props.value}
        highlightedIndex={highlightedIndex}
        onChange={handleChange}
        onStateChange={(changes) => {
          if (changes.hasOwnProperty('inputValue')) {
            // input changed because user typed
            if (changes.type === Downshift.stateChangeTypes.changeInput) {
              const date = parseInputToDate(changes.inputValue, intl.locale);
              if (date === '') {
                setSuggestedItems([]);
                setHighlightedIndex(null);
              } else {
                setSuggestedItems([date]);
                if (getIsDateInRange(date, props.minValue, props.maxValue)) {
                  setHighlightedIndex(getDateInMonth(date) - 1);
                }
                setCalendarDate(date);
              }
            } else {
              // input changed because user selected a date
              setSuggestedItems([]);
              setHighlightedIndex(null);
            }
            /**
             * Asides the inputValue, we also have other ways to enter calendar inputs like the mouse move event to enter calender values.
             * We check the downshift changes property to be sure it has highlightedIndex That is not null before updating it,
             * otherwise it may override the initially set highlightedIndex from the inputValue and set it to null.
             */
          } else if (changes.hasOwnProperty('highlightedIndex')) {
            setHighlightedIndex(changes.highlightedIndex);
          }
        }}
      >
        {({
          getInputProps,
          getMenuProps,
          getItemProps,
          getToggleButtonProps,
          clearSelection,
          highlightedIndex: downshiftHighlightedIndex,
          openMenu,
          setHighlightedIndex: setDownshiftHighlightedIndex,
          selectedItem,
          isOpen,
          inputValue,
        }) => {
          const calendarItems = createCalendarItems(calendarDate);

          const paddingDayCount = getPaddingDayCount(calendarDate, intl.locale);
          const paddingDays = Array(paddingDayCount).fill(undefined);

          const weekdays = getWeekdayNames(intl.locale);
          const today = getToday();

          return (
            <div onFocus={props.onFocus} onBlur={handleBlur}>
              <CalendarBody
                inputRef={inputRef}
                inputProps={getInputProps({
                  /* ARIA */
                  'aria-invalid': props['aria-invalid'],
                  'aria-errormessage': props['aria-errormessage'],
                  // Unset the aria-labelledby as it interfers with the link
                  // between the <label for> and the <input id>.
                  'aria-labelledby': undefined,
                  isCondensed: props.isCondensed,
                  name: props.name,
                  placeholder:
                    typeof props.placeholder === 'string'
                      ? props.placeholder
                      : getLocalizedDateTimeFormatPattern(intl.locale),
                  onMouseEnter: () => {
                    // we remove the highlight so that the user can use the
                    // arrow keys to move the cursor when hovering
                    // @ts-ignore
                    if (isOpen) setDownshiftHighlightedIndex(null);
                  },
                  onKeyDown: (event) => {
                    if (props.isReadOnly) {
                      preventDownshiftDefault(event);
                      return;
                    }
                    if (event.key === 'Enter' && inputValue?.trim() === '') {
                      clearSelection();
                    }
                    // ArrowDown
                    if (event.key === 'ArrowDown') {
                      const nextDayToHighlight = getNextDay(
                        calendarItems[Number(highlightedIndex)]
                      );
                      if (
                        !getIsDateInRange(
                          nextDayToHighlight,
                          props.minValue,
                          props.maxValue
                        )
                      ) {
                        // if the date to highlight is disabled
                        // then do nothing
                        preventDownshiftDefault(event);
                        return;
                      }
                      if (
                        Number(highlightedIndex) + 1 >=
                        calendarItems.length
                      ) {
                        // if it's the end of the month
                        // then bypass normal arrow navigation
                        preventDownshiftDefault(event);
                        // then jump to start of next month
                        jumpMonth(1, 0);
                      }
                    }
                    // ArrowUp
                    if (event.key === 'ArrowUp') {
                      const previousDay = getPreviousDay(
                        calendarItems[Number(highlightedIndex)]
                      );
                      if (
                        !getIsDateInRange(
                          previousDay,
                          props.minValue,
                          props.maxValue
                        )
                      ) {
                        // if the date to highlight is disabled
                        // then do nothing
                        preventDownshiftDefault(event);
                        return;
                      }
                      if (Number(highlightedIndex) <= 0) {
                        // if it's the start of the month
                        // then bypass normal arrow navigation
                        preventDownshiftDefault(event);

                        const numberOfDaysOfPrevMonth =
                          getDaysInMonth(previousDay);
                        // then jump to the last day of the previous month
                        jumpMonth(-1, numberOfDaysOfPrevMonth - 1);
                      }
                    }
                  },
                  // we only do this for readOnly because the input
                  // doesn't ignore these events, unlike when its disabled
                  onClick: props.isReadOnly ? undefined : openMenu,
                  ...filterDataAttributes(props),
                })}
                hasSelection={Boolean(selectedItem)}
                onClear={clearSelection}
                isOpen={isOpen}
                isDisabled={props.isDisabled}
                isReadOnly={props.isReadOnly}
                toggleButtonProps={getToggleButtonProps()}
                hasError={props.hasError}
                hasWarning={props.hasWarning}
              />
              {isOpen && !props.isDisabled && !props.isReadOnly && (
                <CalendarMenu
                  {...getMenuProps()}
                  hasError={props.hasError}
                  hasWarning={props.hasWarning}
                >
                  <CalendarHeader
                    monthLabel={getMonthCalendarLabel(
                      calendarDate,
                      intl.locale
                    )}
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
                    {calendarItems.map((item, index) => (
                      <CalendarDay
                        key={item}
                        isToday={isSameDay(today, item)}
                        {...getItemProps({
                          disabled: !getIsDateInRange(
                            item,
                            props.minValue,
                            props.maxValue
                          ),
                          item,
                          onMouseOut: () => {
                            // @ts-ignore
                            setDownshiftHighlightedIndex(null);
                          },
                        })}
                        isHighlighted={index === downshiftHighlightedIndex}
                        isSelected={isSameDay(item, props.value)}
                      >
                        {getCalendarDayLabel(item)}
                      </CalendarDay>
                    ))}
                  </CalendarContent>
                </CalendarMenu>
              )}
            </div>
          );
        }}
      </Downshift>
    </Constraints.Horizontal>
  );
};

DateInput.displayName = 'DateInput';

DateInput.isEmpty = (value?: string) => value === '';

export default DateInput;
