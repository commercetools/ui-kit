import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { injectIntl } from 'react-intl';
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
} from '@commercetools-uikit/calendar-utils';
import CalendarBody from '../../../../../src/components/internals/calendar-body';
import CalendarMenu from '../../../../../src/components/internals/calendar-menu';
import CalendarHeader from '../../../../../src/components/internals/calendar-header';
import CalendarContent from '../../../../../src/components/internals/calendar-content';
import CalendarDay from '../../../../../src/components/internals/calendar-day';
import messages from './messages';

const preventDownshiftDefault = (event) => {
  // eslint-disable-next-line no-param-reassign
  event.nativeEvent.preventDownshiftDefault = true;
};

const parseRangeText = (text, locale) => {
  const parts = text
    .split(' - ')
    .map((part) => {
      const parsedDate = parseInputToDate(part.trim(), locale);
      return parsedDate === '' ? null : parsedDate;
    })
    .filter(Boolean);
  return parts;
};

const isSameRange = (a, b) => {
  if (a.length !== b.length) return false;
  if (a.length === 0) return true;
  if (a[0] === b[0] && a[1] === b[1]) return true;
  return false;
};

const getRange = ({ item, value, startDate, highlightedItem }) => {
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
    isRangeBetween = isBetween;
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

class DateRangeCalendar extends React.Component {
  static displayName = 'DateRangeCalendar';
  static propTypes = {
    intl: PropTypes.shape({
      locale: PropTypes.string.isRequired,
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    /**
     * Horizontal size limit of the input field.
     */
    horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),
    /**
     * The selected date range, must either be an empty array or an array of two strings holding dates formatted as "YYYY-MM-DD".
     */
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * Called when the date range changes. Called with an event containing either an empty array (no value) or an array holding two string in this format: "YYYY-MM-DD".
     * <br />
     * Signature: `(event) => void`
     */
    onChange: PropTypes.func.isRequired,
    /**
     * Allows the range to be cleared
     */
    isClearable: PropTypes.bool,
    /**
     * Called when the date input gains focus.
     */
    onFocus: PropTypes.func,
    /**
     * Called when the date input loses focus.
     */
    onBlur: PropTypes.func,
    /**
     * Used as the HTML `id` attribute.
     */
    id: PropTypes.string,
    /**
     * Used as the HTML `name` attribute.
     */
    name: PropTypes.string,
    /**
     * Placeholder value to show in the input field
     */
    placeholder: PropTypes.string,
    /**
     * Disables the date picker
     */
    isDisabled: PropTypes.bool,
    /**
     * Disables the date picker menu and makes input field read-only
     */
    isReadOnly: PropTypes.bool,
    /**
     * Indicates the input field has an error
     */
    hasError: PropTypes.bool,
    /**
     * Indicates the input field has warning
     */
    hasWarning: PropTypes.bool,
  };
  static defaultProps = {
    isClearable: true,
  };
  static isEmpty = (range) => range.length === 0;
  static getDerivedStateFromProps(props, state) {
    // We need to update the input value string in case so that is is formatted
    // according to the locale and holds the current value in case the value
    // changes or when the locale changes
    const shouldUpdateInputValue =
      !isSameRange(props.value, state.prevValue) ||
      props.intl.locale !== state.prevLocale;

    if (!shouldUpdateInputValue) return null;

    return {
      prevLocale: props.intl.locale,
      // This is not the input value but the actual value passed to
      // DateRangeCalendar
      prevValue: props.value,
      inputValue: formatRange(props.value, props.intl.locale),
    };
  }
  inputRef = React.createRef();
  state = {
    calendarDate:
      this.props.value.length === 2 ? this.props.value[0] : getToday(),
    suggestedItems: [],
    startDate: null,
    highlightedIndex: null,
    isOpen: false,
    inputValue: formatRange(this.props.value, this.props.intl.locale),
    prevValue: this.props.value,
    prevLocale: this.props.intl.locale,
  };
  jumpMonth = (amount, dayToHighlight = 0) => {
    this.setState((prevState) => {
      const nextDate = changeMonth(prevState.calendarDate, amount);
      return { calendarDate: nextDate, highlightedIndex: dayToHighlight };
    });
  };
  showToday = () => {
    const today = getToday();
    this.setState(
      (prevState) => ({
        calendarDate: today,
        highlightedIndex:
          prevState.suggestedItems.length + getDateInMonth(today) - 1,
      }),
      () => this.inputRef.current.focus()
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
  emit = (unsortedRange) => {
    this.props.onChange({
      target: {
        id: this.props.id,
        name: this.props.name,
        value: unsortedRange.sort(),
      },
    });
  };
  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Downshift
          key={this.props.intl.locale}
          inputId={this.props.id}
          itemToString={createItemRangeToString(this.props.intl.locale)}
          inputValue={this.state.inputValue}
          selectedItem={null}
          highlightedIndex={this.state.highlightedIndex}
          onInputValueChange={(inputValue, changes) => {
            // only attempt to parse input when the user typed into the input
            // field
            if (changes.type !== Downshift.stateChangeTypes.changeInput) return;

            this.setState(() => {
              const parsedRange = parseRangeText(
                inputValue,
                this.props.intl.locale
              );
              if (parsedRange.length === 0)
                return {
                  suggestedItems: [],
                  highlightedIndex: null,
                  inputValue,
                  startDate: null,
                };
              if (parsedRange.length === 1) {
                const calendarDate = parsedRange[0];
                return {
                  suggestedItems: [],
                  highlightedIndex: getDateInMonth(calendarDate) - 1,
                  inputValue,
                  startDate: parsedRange[0],
                  calendarDate,
                };
              }
              if (parsedRange.length === 2) {
                const calendarDate = parsedRange[1];
                return {
                  suggestedItems: [],
                  highlightedIndex: getDateInMonth(calendarDate) - 1,
                  inputValue,
                  startDate: parsedRange[0],
                  calendarDate,
                };
              }
              return null;
            });
          }}
          onStateChange={(changes) => {
            /* eslint-disable no-prototype-builtins */
            this.setState((prevState) => {
              // ensure input value matches prop value when menu is closed
              if (
                changes.type === Downshift.stateChangeTypes.mouseUp ||
                changes.type === Downshift.stateChangeTypes.blurInput
              ) {
                return {
                  highlightedIndex: null,
                  isOpen: false,
                  inputValue: formatRange(
                    this.props.value,
                    this.props.intl.locale
                  ),
                };
              }

              if (changes.hasOwnProperty('selectedItem')) {
                const hasStartedRangeSelection = Boolean(
                  !prevState.startDate && changes.selectedItem
                );
                const hasFinishedRangeSelection = Boolean(
                  prevState.startDate && changes.selectedItem
                );

                return {
                  highlightedIndex: prevState.highlightedIndex,
                  startDate: prevState.startDate ? null : changes.selectedItem,
                  calendarDate: changes.selectedItem,
                  isOpen: !hasFinishedRangeSelection,
                  inputValue: (() => {
                    if (hasFinishedRangeSelection) {
                      return formatRange(
                        [prevState.startDate, changes.selectedItem],
                        this.props.intl.locale
                      );
                    }
                    if (hasStartedRangeSelection) {
                      return formatRange(
                        [changes.selectedItem],
                        this.props.intl.locale
                      );
                    }
                    return '';
                  })(),
                };
              }

              if (changes.hasOwnProperty('isOpen')) {
                return {
                  isOpen: changes.isOpen,
                  highlightedIndex: changes.highlightedIndex || null,
                  inputValue: changes.inputValue || prevState.inputValue,
                  // Reset range selection progress when menu opens/closes
                  startDate: null,
                  // Ensure calendar opens on selected date.
                  // Open on the current day as a fallback.
                  calendarDate:
                    this.props.value.length === 2
                      ? this.props.value[0]
                      : getToday(),
                };
              }

              if (changes.hasOwnProperty('highlightedIndex')) {
                return { highlightedIndex: changes.highlightedIndex };
              }

              return null;
            });
            /* eslint-enable no-prototype-builtins */
          }}
          onChange={(selectedItem) => {
            if (this.state.startDate && selectedItem) {
              this.emit([this.state.startDate, selectedItem]);
            } else {
              this.emit([]);
            }
          }}
          isOpen={this.state.isOpen}
        >
          {({
            getInputProps,
            getMenuProps,
            getItemProps,
            getToggleButtonProps,

            clearSelection,

            highlightedIndex,
            openMenu,
            setHighlightedIndex,
            isOpen,
            inputValue,
          }) => {
            const calendarItems = createCalendarItems(
              this.state.calendarDate,
              this.props.intl
            );
            const allItems = [...this.state.suggestedItems, ...calendarItems];

            const paddingDayCount = getPaddingDayCount(
              this.state.calendarDate,
              this.props.intl.locale
            );
            const paddingDays = Array(paddingDayCount).fill();

            const weekdays = getWeekdayNames(this.props.intl.locale);

            const today = getToday();

            return (
              <div onFocus={this.props.onFocus} onBlur={this.handleBlur}>
                <CalendarBody
                  inputRef={this.inputRef}
                  inputProps={getInputProps({
                    // Unset the aria-labelledby as it interfers with the link
                    // between the <label for> and the <input id>.
                    'aria-labelledby': undefined,
                    name: this.props.name,
                    placeholder:
                      typeof this.props.placeholder === 'string'
                        ? this.props.placeholder
                        : this.props.intl.formatMessage(messages.placeholder),
                    onMouseEnter: () => {
                      // we remove the highlight so that the user can use the
                      // arrow keys to move the cursor when hovering
                      if (isOpen) setHighlightedIndex(null);
                    },
                    onKeyDown: (event) => {
                      if (
                        event.key === 'Enter' &&
                        inputValue.trim() === '' &&
                        // do not clear value when user presses Enter to
                        // select the end date (so only clear when there is no
                        // startDate)
                        !this.state.startDate &&
                        this.props.isClearable
                      ) {
                        clearSelection();
                        this.emit([]);
                      }
                      // ArrowDown
                      if (event.keyCode === 40) {
                        if (highlightedIndex + 1 >= calendarItems.length) {
                          // if it's the end of the month
                          // then bypass normal arrow navigation
                          preventDownshiftDefault(event);
                          // then jump to start of next month
                          this.jumpMonth(1, 0);
                        }
                      }
                      // ArrowUp
                      if (event.keyCode === 38) {
                        const previousDay = getPreviousDay(
                          calendarItems[highlightedIndex]
                        );

                        if (highlightedIndex <= 0) {
                          // if it's the start of the month
                          // then bypass normal arrow navigation
                          preventDownshiftDefault(event);

                          const numberOfDaysOfPrevMonth = getDaysInMonth(
                            previousDay
                          );
                          // then jump to the last day of the previous month
                          this.jumpMonth(-1, numberOfDaysOfPrevMonth - 1);
                        }
                      }
                    },
                    // we only do this for readOnly because the input
                    // doesn't ignore these events, unlike when its disabled
                    onClick: this.props.isReadOnly ? undefined : openMenu,
                    ...filterDataAttributes(this.props),
                  })}
                  hasSelection={this.props.value.length === 2}
                  isClearable={this.props.isClearable}
                  onClear={() => {
                    this.setState({ startDate: null });
                    this.emit([]);
                    clearSelection();
                  }}
                  isOpen={isOpen}
                  isDisabled={this.props.isDisabled}
                  isReadOnly={this.props.isReadOnly}
                  toggleButtonProps={getToggleButtonProps()}
                  hasError={this.props.hasError}
                  hasWarning={this.props.hasWarning}
                />
                {isOpen && !this.props.isDisabled && (
                  <CalendarMenu
                    {...getMenuProps()}
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
                      onPrevMonthClick={() => this.jumpMonth(-1)}
                      onTodayClick={this.showToday}
                      onNextMonthClick={() => this.jumpMonth(1)}
                      onPrevYearClick={() => this.jumpMonth(-12)}
                      onNextYearClick={() => this.jumpMonth(12)}
                    />
                    <CalendarContent>
                      {weekdays.map((weekday) => (
                        <CalendarDay key={weekday} type="heading">
                          {weekday}
                        </CalendarDay>
                      ))}
                      {paddingDays.map((day, index) => (
                        <CalendarDay key={index} type="spacing" />
                      ))}
                      {calendarItems.map((item, index) => {
                        const isHighlighted =
                          this.state.suggestedItems.length + index ===
                          highlightedIndex;
                        const {
                          isRangeStart,
                          isRangeBetween,
                          isRangeEnd,
                        } = getRange({
                          item,
                          value: this.props.value,
                          startDate: this.state.startDate,
                          highlightedItem:
                            allItems[this.state.highlightedIndex],
                        });
                        return (
                          <CalendarDay
                            key={item}
                            isToday={isSameDay(today, item)}
                            {...getItemProps({
                              disabled: this.props.isDisabled,
                              item,
                              onMouseOut: () => {
                                setHighlightedIndex(null);
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
            );
          }}
        </Downshift>
      </Constraints.Horizontal>
    );
  }
}

export default injectIntl(DateRangeCalendar);
