import {
  createRef,
  Component,
  type FocusEventHandler,
  type KeyboardEvent,
  type RefObject,
  type FocusEvent,
} from 'react';
import type { DurationInputArg1, MomentInput } from 'moment';
import Downshift from 'downshift';
import { injectIntl, type WrappedComponentProps } from 'react-intl';
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

const activationTypes = [
  Downshift.stateChangeTypes.keyDownEnter,
  Downshift.stateChangeTypes.clickItem,
];

type TActivationTypes = (typeof activationTypes)[number];

type TPreventDownshiftDefaultEvent = {
  relatedTarget?: unknown;
  nativeEvent?: {
    preventDownshiftDefault?: boolean;
  };
} & KeyboardEvent<HTMLInputElement | HTMLButtonElement>;

type TCreateBlurHandlerEvent = TPreventDownshiftDefaultEvent &
  FocusEvent<HTMLButtonElement>;

const preventDownshiftDefault = (event: TPreventDownshiftDefaultEvent) => {
  event.nativeEvent.preventDownshiftDefault = true;
};

// This keeps the menu open when the user focuses the time input (thereby
// blurring the regular input/toggle button)
const createBlurHandler =
  (timeInputRef: RefObject<HTMLInputElement>, cb: () => void = () => {}) =>
  (event: TCreateBlurHandlerEvent) => {
    event.persist();

    if (event.relatedTarget === timeInputRef.current) {
      preventDownshiftDefault(event);
    }

    cb();
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
   * Get list of timezone with `moment.tz.names()` [See moment docs](https://momentjs.com/timezone/docs/#/data-loading/getting-zone-names/)
   */
  timeZone: string;
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
   * It must follow the “HH:mm” pattern (eg: 04:30, 13:25, 23:59)
   */
  defaultDaySelectionTime?: string;
} & WrappedComponentProps;

type TDateTimeInputState = {
  calendarDate?: string;
  suggestedItems?: string[];
  highlightedIndex?: number | null;
  timeString?: string;
  startDate?: MomentInput;
  inputValue?: MomentInput;
};

class DateTimeInput extends Component<
  TDateTimeInputProps,
  TDateTimeInputState
> {
  static displayName = 'DateTimeInput';

  inputRef = createRef<HTMLInputElement>();
  timeInputRef = createRef<HTMLInputElement>();
  state = {
    calendarDate: getToday(this.props.timeZone),
    suggestedItems: [],
    highlightedIndex:
      this.props.value === ''
        ? null
        : getDateInMonth(this.props.value, this.props.timeZone) - 1,
    timeString: this.props.defaultDaySelectionTime
      ? formatDefaultTime(
          this.props.defaultDaySelectionTime,
          this.props.intl.locale
        )
      : '',
  };

  jumpMonths = (amount: DurationInputArg1, dayToHighlight = 0) => {
    this.setState((prevState) => {
      const nextDate = changeMonth(
        prevState.calendarDate,
        this.props.timeZone,
        amount
      );
      return { calendarDate: nextDate, highlightedIndex: dayToHighlight };
    });
  };
  showToday = () => {
    const today = getToday(this.props.timeZone);
    this.setState(
      (prevState) => ({
        calendarDate: today,
        highlightedIndex:
          (prevState.suggestedItems || []).length +
          getDateInMonth(today, this.props.timeZone) -
          1,
      }),
      () => this.inputRef.current?.focus()
    );
  };
  handleBlur = () => {
    if (this.props.onBlur)
      this.props.onBlur({
        target: {
          id: this.props.id,
          name: this.props.name,
        },
      });
  };
  handleTimeChange = (event: TCustomEvent) => {
    const parsedTime = parseTime(event.target.value);

    this.setState({ timeString: event.target.value });

    // We can't update the parent when there is no value
    if (this.props.value === '') return;

    let date = getStartOf(this.props.value, this.props.timeZone);
    if (parsedTime) {
      date = changeTime(date, this.props.timeZone, parsedTime);
    }
    this.emit(date);
  };
  emit = (value: string | null) =>
    this.props.onChange?.({
      target: {
        id: this.props.id,
        name: this.props.name,
        // when cleared the value is null, but we always want it to be an
        // empty string when there is no value.
        value: value || '',
      },
    });
  render() {
    if (!this.props.isReadOnly) {
      warning(
        typeof this.props.onChange === 'function',
        'DateTimeInput: `onChange` is required when input is not read only.'
      );
    }

    return (
      <Constraints.Horizontal max={this.props.horizontalConstraint}>
        <Downshift
          // Setting the key to the timeZone conveniently forces a rerender
          // when the time-zone changes. Otherwise we'd need to make
          // inputValue a controlled property so that we can update
          // the displayed value as downshift seems to ignore an updated
          // itemToString function.
          key={`${this.props.timeZone}:${this.props.intl.locale}`}
          inputId={this.props.id}
          itemToString={
            createItemDateTimeToString(
              this.props.intl.locale,
              this.props.timeZone
            ) as (item: string | null) => string
          }
          selectedItem={this.props.value === '' ? null : this.props.value}
          highlightedIndex={this.state.highlightedIndex}
          onChange={this.emit}
          stateReducer={(_, changes) => {
            if (activationTypes.includes(changes.type as TActivationTypes)) {
              return { ...changes, isOpen: true };
            }

            return changes;
          }}
          onStateChange={(changes) => {
            this.setState(
              (prevState) => {
                if (
                  activationTypes.includes(changes.type as TActivationTypes)
                ) {
                  return {
                    startDate: changes.isOpen ? prevState.startDate : null,
                    inputValue: changes.inputValue || prevState.inputValue,
                    timeString: changes.selectedItem
                      ? formatTime(
                          changes.selectedItem,
                          this.props.intl.locale,
                          this.props.timeZone
                        )
                      : prevState.timeString,
                  };
                }

                if (changes.hasOwnProperty('inputValue')) {
                  const suggestedItems = createSuggestedItems(
                    changes.inputValue as string,
                    this.props.timeZone
                  );
                  return {
                    suggestedItems,
                    highlightedIndex: suggestedItems.length > 0 ? 0 : null,
                  };
                }

                if (changes.hasOwnProperty('isOpen')) {
                  return {
                    inputValue: changes.inputValue || prevState.inputValue,
                    startDate: changes.isOpen ? prevState.startDate : null,
                    // set time input value to time from value when menu is opened
                    // or to the current timeString which equals to defaultDaySelectionTime prop
                    timeString:
                      changes.isOpen && this.props.value !== ''
                        ? formatTime(
                            this.props.value,
                            this.props.intl.locale,
                            this.props.timeZone
                          )
                        : this.state.timeString,
                    // ensure calendar always opens on selected item, or on
                    // current month when there is no selected item
                    calendarDate:
                      this.props.value === ''
                        ? getToday(this.props.timeZone)
                        : this.props.value,
                  };
                }

                if (changes.hasOwnProperty('highlightedIndex')) {
                  return { highlightedIndex: changes.highlightedIndex };
                }
                return null;
              },
              () => {
                if (
                  activationTypes.includes(changes.type as TActivationTypes)
                ) {
                  this.timeInputRef.current?.focus();
                  this.timeInputRef.current?.setSelectionRange(
                    0,
                    this.state.timeString.length
                  );
                }
              }
            );
          }}
        >
          {({
            getInputProps,
            getMenuProps,
            getItemProps,
            getToggleButtonProps,
            clearSelection,
            highlightedIndex,
            openMenu,
            closeMenu,
            setHighlightedIndex,
            selectedItem,
            inputValue,
            isOpen,
          }) => {
            const suggestedItems = this.state.suggestedItems;
            const calendarItems = createCalendarItems(
              this.state.calendarDate,
              this.state.timeString,
              this.props.timeZone
            );

            const paddingDayCount = getPaddingDayCount(
              this.state.calendarDate,
              this.props.intl.locale,
              this.props.timeZone
            );
            const paddingDays = Array(paddingDayCount).fill(undefined);

            const weekdays = getWeekdayNames(this.props.intl.locale);
            const today = getToday(this.props.timeZone);

            const isTimeInputVisible =
              Boolean(this.props.value) && this.props.value !== '';

            return (
              <div onFocus={this.props.onFocus} onBlur={this.handleBlur}>
                <CalendarBody
                  inputRef={this.inputRef}
                  inputProps={getInputProps({
                    /* ARIA */
                    'aria-invalid': this.props['aria-invalid'],
                    'aria-errormessage': this.props['aria-errormessage'],
                    // Unset the aria-labelledby as it interfers with the link
                    // between the <label for> and the <input id>.
                    'aria-labelledby': undefined,
                    name: this.props.name,
                    placeholder:
                      typeof this.props.placeholder === 'string'
                        ? this.props.placeholder
                        : getLocalizedDateTimeFormatPattern(
                            this.props.intl.locale,
                            'full'
                          ),
                    onMouseEnter: () => {
                      // we remove the highlight so that the user can use the
                      // arrow keys to move the cursor when hovering
                      if (isOpen) setHighlightedIndex(-1);
                    },
                    onKeyDown: (event: TPreventDownshiftDefaultEvent) => {
                      if (this.props.isReadOnly) {
                        preventDownshiftDefault(event);
                        return;
                      }
                      // parse input when user presses enter on regular input,
                      // close menu and notify parent
                      if (event.key === 'Enter' && highlightedIndex === null) {
                        preventDownshiftDefault(event);

                        const parsedDate = parseInputText(
                          inputValue as string,
                          this.props.intl.locale,
                          this.props.timeZone
                        );

                        // If there is no parsed date, don't clear and submit. Instead, give
                        // the user a chance to fix the value.
                        if (!parsedDate) return;

                        this.emit(parsedDate);

                        closeMenu();
                      }
                      // ArrowDown
                      if (event.key === 'ArrowDown') {
                        if (
                          Number(highlightedIndex) + 1 >=
                          calendarItems.length
                        ) {
                          // if it's the end of the month
                          // then bypass normal arrow navigation
                          preventDownshiftDefault(event);
                          // then jump to start of next month
                          this.jumpMonths(1, 0);
                        }
                      }
                      // ArrowUp
                      if (event.key === 'ArrowUp') {
                        const previousDay = getPreviousDay(
                          calendarItems[Number(highlightedIndex)]
                        );

                        if (Number(highlightedIndex) <= 0) {
                          // if it's the start of the month
                          // then bypass normal arrow navigation
                          preventDownshiftDefault(event);
                          const numberOfDaysOfPrevMonth = getDaysInMonth(
                            previousDay,
                            this.props.timeZone
                          );
                          // then jump to the last day of the previous month
                          this.jumpMonths(-1, numberOfDaysOfPrevMonth - 1);
                        }
                      }
                    },
                    onClick: this.props.isReadOnly ? undefined : openMenu,
                    // validate the input on blur, and emit the value if it's valid
                    onBlur: createBlurHandler(this.timeInputRef, () => {
                      const inputValue = this.inputRef.current?.value || '';
                      const parsedDate = parseInputText(
                        inputValue,
                        this.props.intl.locale,
                        this.props.timeZone
                      );

                      if (inputValue.length > 0 && !parsedDate) return;
                      this.emit(parsedDate);
                    }),
                    onChange: (event: TCustomEvent) => {
                      // keep timeInput and regular input in sync when user
                      // types into regular input
                      if (!isOpen) return;

                      const time = event.target.value?.split(' ')[1];
                      if (!time) return;

                      const parsedTime = parseTime(time);
                      this.setState(() => {
                        if (!parsedTime) return { timeString: '' };

                        let date = getToday(this.props.timeZone);
                        if (parsedTime) {
                          date = changeTime(
                            date,
                            this.props.timeZone,
                            parsedTime
                          );
                        }
                        return {
                          timeString: formatTime(
                            date,
                            this.props.intl.locale,
                            this.props.timeZone
                          ),
                        };
                      });
                    },
                    ...filterDataAttributes(this.props),
                  })}
                  hasSelection={Boolean(selectedItem)}
                  onClear={clearSelection}
                  isOpen={isOpen}
                  isCondensed={this.props.isCondensed}
                  isDisabled={this.props.isDisabled}
                  isReadOnly={this.props.isReadOnly}
                  toggleButtonProps={getToggleButtonProps({
                    onBlur: createBlurHandler(this.timeInputRef),
                  })}
                  hasError={this.props.hasError}
                  hasWarning={this.props.hasWarning}
                />
                {isOpen && !this.props.isDisabled && (
                  <CalendarMenu
                    {...getMenuProps()}
                    hasFooter={true}
                    hasError={this.props.hasError}
                    hasWarning={this.props.hasWarning}
                  >
                    <CalendarHeader
                      monthLabel={getMonthCalendarLabel(
                        this.state.calendarDate,
                        this.props.intl.locale
                      )}
                      yearLabel={getYearCalendarLabel(
                        this.state.calendarDate,
                        this.props.intl.locale
                      )}
                      onPrevMonthClick={() => this.jumpMonths(-1)}
                      onTodayClick={this.showToday}
                      onNextMonthClick={() => this.jumpMonths(1)}
                      onPrevYearClick={() => this.jumpMonths(-12)}
                      onNextYearClick={() => this.jumpMonths(12)}
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
                            disabled: this.props.isDisabled,
                            item,
                            onMouseOut: () => {
                              setHighlightedIndex(-1);
                            },
                          })}
                          isHighlighted={
                            suggestedItems.length + index === highlightedIndex
                          }
                          isSelected={isSameDay(item, this.props.value)}
                        >
                          {getCalendarDayLabel(item, this.props.timeZone)}
                        </CalendarDay>
                      ))}
                    </CalendarContent>
                    <TimeInput
                      isDisabled={!isTimeInputVisible}
                      timeInputRef={this.timeInputRef}
                      placeholder={getLocalizedDateTimeFormatPattern(
                        this.props.intl.locale,
                        'time'
                      )}
                      value={this.state.timeString}
                      onChange={this.handleTimeChange}
                      onKeyDown={(event) => {
                        if (event.key === 'ArrowUp') {
                          setHighlightedIndex(-1);
                          this.inputRef.current?.focus();
                          return;
                        }

                        if (event.key === 'Enter') {
                          setHighlightedIndex(-1);
                          this.inputRef.current?.focus();
                          this.inputRef.current?.setSelectionRange(0, 100);
                          closeMenu();
                        }
                      }}
                    />
                  </CalendarMenu>
                )}
              </div>
            );
          }}
        </Downshift>
      </Constraints.Horizontal>
    );
  }
}

export default injectIntl(DateTimeInput);
