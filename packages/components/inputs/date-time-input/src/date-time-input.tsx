import {
  useRef,
  useCallback,
  useState,
  type FocusEventHandler,
  type MouseEventHandler,
  type KeyboardEvent,
  type FocusEvent,
} from 'react';
import type { DurationInputArg1 } from 'moment';
import { useCombobox } from 'downshift';
import { useIntl } from 'react-intl';
import Constraints from '@commercetools-uikit/constraints';
import {
  filterDataAttributes,
  parseTime,
  warning,
} from '@commercetools-uikit/utils';
import {
  changeTime,
  formatTime,
  formatDefaultTime,
  getDateInMonth,
  getToday,
  changeMonth,
  getPaddingDayCount,
  getWeekdayNames,
  getStartOf,
  getLocalizedDateTimeFormatPattern,
  getMonthCalendarLabel,
  getYearCalendarLabel,
  isSameDay,
  getCalendarDayLabel,
  createItemDateTimeToString,
  createCalendarItems,
  createSuggestedItems,
  parseInputText,
  getPreviousDay,
  getDaysInMonth,
} from '@commercetools-uikit/calendar-time-utils';
import {
  CalendarBody,
  CalendarMenu,
  CalendarHeader,
  CalendarContent,
  CalendarDay,
} from '@commercetools-uikit/calendar-utils';
import TimeInput from './time-input';

type TKeyboardEventWithPreventDefault<T extends HTMLElement> =
  KeyboardEvent<T> & {
    nativeEvent: KeyboardEvent['nativeEvent'] & {
      preventDownshiftDefault?: boolean;
    };
  };

type TFocusEventWithPreventDefault<T extends HTMLElement> = FocusEvent<T> & {
  nativeEvent: KeyboardEvent['nativeEvent'] & {
    preventDownshiftDefault?: boolean;
  };
};

type TPreventDownshiftDefaultEvent =
  | TKeyboardEventWithPreventDefault<HTMLInputElement | HTMLButtonElement>
  | TFocusEventWithPreventDefault<HTMLInputElement | HTMLButtonElement>;

const preventDownshiftDefault = (event: TPreventDownshiftDefaultEvent) => {
  event.nativeEvent.preventDownshiftDefault = true;
};

type TCustomEvent = {
  target: {
    id?: string;
    name?: string;
    value?: string;
  };
};

export type TDateTimeInputProps = {
  /**
   * Indicate if the value entered in the input is invalid.
   */
  'aria-invalid'?: boolean;
  /**
   * HTML ID of an element containing an error message related to the input.
   */
  'aria-errormessage'?: string;
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
   * The selected date, must either be an empty string or a date formatted in ISO 8601 (e.g. "2018-10-04T09:00:00.000Z").
   */
  value: string;
  /**
   * Called when the date changes. Called with an event containing an empty string (no value) or a string in this format: "YYYY-MM-DD".
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
   * Specifies the time zone in which the calendar and selected values are shown. It also influences how entered dates and times are parsed.
   * Get list of timezone with moment.tz.names()
   */
  timeZone: string;
  /**
   * Used as the HTML id attribute.
   */
  id?: string;
  /**
   * Used as the HTML name attribute.
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
   * Disables the date picker menu and sets the input field as read-only
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
   * The time that will be used by default when a user selects a calendar day.
   * It must follow the "HH:mm" pattern (eg: 04:30, 13:25, 23:59)
   */
  defaultDaySelectionTime?: string;
  /**
   * Indicates the appearance of the input.
   * Filter appearance removes borders and box shadows, and calendar is always open.
   */
  appearance?: 'default' | 'filter';
};

type TActivationTypes =
  | typeof useCombobox.stateChangeTypes.InputKeyDownEnter
  | typeof useCombobox.stateChangeTypes.ItemClick;

const activationTypes: TActivationTypes[] = [
  useCombobox.stateChangeTypes.InputKeyDownEnter,
  useCombobox.stateChangeTypes.ItemClick,
];

const DateTimeInput = (props: TDateTimeInputProps) => {
  const intl = useIntl();

  const inputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const itemToString = createItemDateTimeToString(
    intl.locale,
    props.timeZone
  ) as (item: string | null) => string;

  const [calendarDate, setCalendarDate] = useState<string>(
    getToday(props.timeZone)
  );
  const [suggestedItems, setSuggestedItems] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(
    props.value === '' ? null : getDateInMonth(props.value, props.timeZone) - 1
  );
  const [timeString, setTimeString] = useState<string>(
    props.defaultDaySelectionTime
      ? formatDefaultTime(props.defaultDaySelectionTime, intl.locale)
      : ''
  );

  if (!props.isReadOnly) {
    warning(
      typeof props.onChange === 'function',
      'DateTimeInput: onChange is required when input is not read only.'
    );
  }

  const appearance = props.appearance || 'default';

  const emit = useCallback(
    (value: string | null) =>
      props.onChange?.({
        target: {
          id: props.id,
          name: props.name,
          value: value || '',
        },
      }),
    [props.onChange, props.id, props.name]
  );

  const handleBlur = useCallback(() => {
    if (props.onBlur)
      props.onBlur({
        target: {
          id: props.id,
          name: props.name,
        },
      });
  }, [props.onBlur, props.id, props.name]);

  const handleTimeChange = useCallback(
    (event: TCustomEvent) => {
      const parsedTime = parseTime(event.target.value);
      setTimeString(event.target.value ?? '');
      if (props.value === '') return;
      let date = getStartOf(props.value, props.timeZone);
      if (parsedTime) {
        date = changeTime(date, props.timeZone, parsedTime);
      }
      emit(date);
    },
    [props.value, props.timeZone, emit]
  );

  const jumpMonths = useCallback(
    (amount: DurationInputArg1, dayToHighlight = 0) => {
      setCalendarDate((prevDate) =>
        changeMonth(prevDate, props.timeZone, amount)
      );
      setHighlightedIndex(dayToHighlight);
    },
    [props.timeZone]
  );

  const showToday = useCallback(() => {
    const today = getToday(props.timeZone);
    setCalendarDate(today);
    setHighlightedIndex(
      suggestedItems.length + getDateInMonth(today, props.timeZone) - 1
    );
    inputRef.current?.focus();
  }, [props.timeZone, suggestedItems.length]);

  const calendarItems = createCalendarItems(
    calendarDate,
    timeString,
    props.timeZone
  );
  const allItems = [...suggestedItems, ...calendarItems];

  const {
    getInputProps,
    getMenuProps,
    getItemProps,
    getToggleButtonProps,
    selectItem,
    setInputValue: setDownshiftInputValue,
    setHighlightedIndex: setDownshiftHighlightedIndex,
    closeMenu,
    isOpen,
    highlightedIndex: downshiftHighlightedIndex,
    selectedItem,
  } = useCombobox({
    inputId: props.id,
    items: allItems,
    itemToString,
    selectedItem: props.value === '' ? null : props.value,
    highlightedIndex: highlightedIndex ?? -1,
    stateReducer: (state, { type, changes }) => {
      if (
        type === useCombobox.stateChangeTypes.InputBlur &&
        document.activeElement === timeInputRef.current
      ) {
        return { ...changes, isOpen: state.isOpen };
      }
      if (activationTypes.includes(type as TActivationTypes)) {
        return { ...changes, isOpen: true };
      }
      return changes;
    },
    onSelectedItemChange: ({ selectedItem: newItem }) => {
      emit(newItem);
    },
    onStateChange: (changes) => {
      if (activationTypes.includes(changes.type as TActivationTypes)) {
        setTimeString((prev) =>
          changes.selectedItem
            ? formatTime(changes.selectedItem, intl.locale, props.timeZone)
            : prev
        );
        setTimeout(() => {
          timeInputRef.current?.focus();
          timeInputRef.current?.setSelectionRange(
            0,
            timeInputRef.current?.value?.length ?? 0
          );
        }, 0);
        return;
      }

      if (changes.hasOwnProperty('inputValue')) {
        const newSuggestedItems = createSuggestedItems(
          changes.inputValue as string,
          props.timeZone
        );
        setSuggestedItems(newSuggestedItems);
        setHighlightedIndex(newSuggestedItems.length > 0 ? 0 : null);
        return;
      }

      if (changes.hasOwnProperty('isOpen')) {
        setTimeString(
          changes.isOpen && props.value !== ''
            ? formatTime(props.value, intl.locale, props.timeZone)
            : timeString
        );
        setCalendarDate(
          props.value === ''
            ? getToday(props.timeZone)
            : getStartOf(props.value, props.timeZone)
        );
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

  const paddingDayCount = getPaddingDayCount(
    calendarDate,
    intl.locale,
    props.timeZone
  );
  const paddingDays = Array(paddingDayCount).fill(undefined);
  const weekdays = getWeekdayNames(intl.locale);
  const today = getToday(props.timeZone);
  const isTimeInputVisible = Boolean(props.value) && props.value !== '';
  const shouldShowCalendar =
    (isOpen && !props.isDisabled) ||
    (appearance === 'filter' && !props.isDisabled);

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <div onFocus={props.onFocus} onBlur={handleBlur}>
        <CalendarBody
          inputRef={inputRef}
          appearance={appearance}
          inputProps={getInputProps({
            'aria-invalid': props['aria-invalid'],
            'aria-errormessage': props['aria-errormessage'],
            'aria-labelledby': undefined,
            name: props.name,
            placeholder:
              typeof props.placeholder === 'string'
                ? props.placeholder
                : getLocalizedDateTimeFormatPattern(intl.locale, 'full'),
            onMouseEnter: () => {
              if (isOpen) setDownshiftHighlightedIndex(-1);
            },
            onKeyDown: (
              event: TKeyboardEventWithPreventDefault<
                HTMLInputElement | HTMLButtonElement
              >
            ) => {
              if (props.isReadOnly) {
                preventDownshiftDefault(event);
                return;
              }
              if (event.key === 'Enter' && downshiftHighlightedIndex === -1) {
                preventDownshiftDefault(event);
                // Use inputRef for keyDown (event.target.value unreliable on keydown)
                const currentInputValue =
                  inputRef.current?.value ??
                  (event.target as HTMLInputElement).value ??
                  '';
                const parsedDate = parseInputText(
                  currentInputValue,
                  intl.locale,
                  props.timeZone
                );
                if (!parsedDate) return;
                emit(parsedDate);
                closeMenu();
              }
              if (event.key === 'ArrowDown') {
                if (
                  Number(downshiftHighlightedIndex) + 1 >=
                  calendarItems.length
                ) {
                  preventDownshiftDefault(event);
                  jumpMonths(1, 0);
                }
              }
              if (event.key === 'ArrowUp') {
                const previousDay = getPreviousDay(
                  calendarItems[Number(downshiftHighlightedIndex)]
                );
                if (Number(downshiftHighlightedIndex) <= 0) {
                  preventDownshiftDefault(event);
                  const numberOfDaysOfPrevMonth = getDaysInMonth(
                    previousDay,
                    props.timeZone
                  );
                  jumpMonths(-1, numberOfDaysOfPrevMonth - 1);
                }
              }
            },
            onClick: props.isReadOnly
              ? (preventDownshiftDefault as unknown as MouseEventHandler<HTMLInputElement>)
              : undefined,
            onBlur: (
              event: TFocusEventWithPreventDefault<HTMLInputElement>
            ) => {
              if (event.relatedTarget === timeInputRef.current) {
                preventDownshiftDefault(event);
                return;
              }
              // Use event.target.value — more reliable than inputRef since downshift
              // may have already reset inputRef's value via controlled rendering.
              const currentInputValue =
                (event.target as HTMLInputElement).value || '';
              const parsedDate = parseInputText(
                currentInputValue,
                intl.locale,
                props.timeZone
              );
              if (currentInputValue.length > 0 && !parsedDate) {
                // Invalid input: reset to last valid formatted value
                setDownshiftInputValue(
                  itemToString(props.value === '' ? null : props.value)
                );
                return;
              }
              emit(parsedDate);
              if (parsedDate) {
                // After a valid blur, ensure display shows canonical format
                setDownshiftInputValue(itemToString(parsedDate));
              }
            },
            onChange: (event: TCustomEvent) => {
              if (!isOpen) return;
              const time = event.target.value?.split(' ')[1];
              if (!time) return;
              const parsedTime = parseTime(time);
              if (!parsedTime) {
                setTimeString('');
                return;
              }
              let date = getToday(props.timeZone);
              date = changeTime(date, props.timeZone, parsedTime);
              setTimeString(formatTime(date, intl.locale, props.timeZone));
            },
            ...filterDataAttributes(props),
          })}
          hasSelection={Boolean(selectedItem)}
          onClear={() => {
            selectItem(null);
            setDownshiftInputValue('');
          }}
          isOpen={isOpen}
          isCondensed={props.isCondensed}
          isDisabled={props.isDisabled}
          isReadOnly={props.isReadOnly}
          toggleButtonProps={getToggleButtonProps({
            onBlur: (
              event: TFocusEventWithPreventDefault<HTMLButtonElement>
            ) => {
              if (event.relatedTarget === timeInputRef.current) {
                preventDownshiftDefault(event);
              }
            },
          })}
          hasError={props.hasError}
          hasWarning={props.hasWarning}
        />
        {shouldShowCalendar && (
          <CalendarMenu
            {...getMenuProps({}, { suppressRefError: true })}
            hasFooter={true}
            hasError={props.hasError}
            hasWarning={props.hasWarning}
            appearance={appearance}
          >
            <CalendarHeader
              monthLabel={getMonthCalendarLabel(
                calendarDate,
                intl.locale,
                props.timeZone
              )}
              yearLabel={getYearCalendarLabel(
                calendarDate,
                intl.locale,
                props.timeZone
              )}
              onPrevMonthClick={() => jumpMonths(-1)}
              onTodayClick={showToday}
              onNextMonthClick={() => jumpMonths(1)}
              onPrevYearClick={() => jumpMonths(-12)}
              onNextYearClick={() => jumpMonths(12)}
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
                    item,
                    onMouseOut: () => {
                      setDownshiftHighlightedIndex(-1);
                    },
                  })}
                  isHighlighted={
                    suggestedItems.length + index === downshiftHighlightedIndex
                  }
                  isSelected={isSameDay(item, props.value)}
                >
                  {getCalendarDayLabel(item, props.timeZone)}
                </CalendarDay>
              ))}
            </CalendarContent>
            <TimeInput
              isDisabled={!isTimeInputVisible}
              timeInputRef={timeInputRef}
              placeholder={getLocalizedDateTimeFormatPattern(
                intl.locale,
                'time'
              )}
              value={timeString}
              onChange={handleTimeChange}
              onKeyDown={(event) => {
                if (event.key === 'ArrowUp') {
                  setDownshiftHighlightedIndex(-1);
                  inputRef.current?.focus();
                  return;
                }
                if (event.key === 'Enter') {
                  setDownshiftHighlightedIndex(-1);
                  inputRef.current?.focus();
                  inputRef.current?.setSelectionRange(0, 100);
                  closeMenu();
                }
              }}
            />
          </CalendarMenu>
        )}
      </div>
    </Constraints.Horizontal>
  );
};

DateTimeInput.displayName = 'DateTimeInput';

export default DateTimeInput;
