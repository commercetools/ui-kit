import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { injectIntl } from 'react-intl';
import DateCalendarBody from './date-calendar-body';
import DateCalendarMenu from './date-calendar-menu';
import DateCalendarHeader from './date-calendar-header';
import DateCalendarCalendar from './date-calendar-calendar';
import DateCalendarDay from './date-calendar-day';
import Constraints from '../../constraints';
import {
  createCalendarItems,
  getDateInMonth,
  getToday,
  changeMonth,
  getPaddingDayCount,
  getWeekdayNames,
  getCalendarLabel,
  isSameDay,
  getCalendarDayLabel,
  isBetween as isBetweenDates,
  createItemRangeToString,
  formatRange,
  parseInputToDate,
} from './utils';

const parseRangeText = (text, locale) => {
  const parts = text
    .split(' - ')
    .map(part => {
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

  const isRangeStart = do {
    if (isRangeSelectionInProgress) isStartDate;
    else if (hasSelection) value[0] === item;
    else false;
  };
  const isRangeBetween = do {
    if (isRangeSelectionInProgress) isBetween;
    else if (hasSelection) isBetweenDates(item, value[0], value[1]);
    else false;
  };
  const isRangeEnd = do {
    if (isRangeSelectionInProgress) item === highlightedItem;
    else if (hasSelection) value[1] === item;
    else false;
  };

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
    }).isRequired,
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
  };
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
  jumpMonth = amount => {
    this.setState(prevState => {
      const nextDate = changeMonth(prevState.calendarDate, amount);
      return { calendarDate: nextDate, highlightedIndex: 0 };
    });
  };
  showToday = () => {
    const today = getToday();
    this.setState(
      prevState => ({
        calendarDate: today,
        highlightedIndex:
          prevState.suggestedItems.length + getDateInMonth(today) - 1,
      }),
      () => this.inputRef.current.focus()
    );
  };
  emit = unsortedRange => {
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
          onStateChange={changes => {
            /* eslint-disable no-prototype-builtins */
            this.setState(prevState => {
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
                const hasFinishedRangeSelection =
                  prevState.startDate && changes.selectedItem;
                const hasStartedRangeSelection =
                  !prevState.startDate && changes.selectedItem;

                return {
                  highlightedIndex: prevState.highlightedIndex,
                  startDate: prevState.startDate ? null : changes.selectedItem,
                  isOpen: !hasFinishedRangeSelection,
                  inputValue: do {
                    if (hasFinishedRangeSelection)
                      formatRange(
                        [prevState.startDate, changes.selectedItem],
                        this.props.intl.locale
                      );
                    else if (hasStartedRangeSelection)
                      formatRange(
                        [changes.selectedItem],
                        this.props.intl.locale
                      );
                    else '';
                  },
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
          onChange={selectedItem => {
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

            const paddingDays = do {
              const weekday = getPaddingDayCount(this.state.calendarDate);
              Array(weekday).fill();
            };

            const weekdays = getWeekdayNames('en');
            const today = getToday();

            return (
              <div>
                <DateCalendarBody
                  inputRef={this.inputRef}
                  inputProps={getInputProps({
                    onMouseEnter: () => {
                      // we remove the highlight so that the user can use the
                      // arrow keys to move the cursor when hovering
                      if (isOpen) setHighlightedIndex(null);
                    },
                    onKeyDown: event => {
                      if (event.key === 'Enter' && inputValue.trim() === '') {
                        clearSelection();
                        this.emit([]);
                      }
                    },
                    onFocus: openMenu,
                    onClick: openMenu,
                  })}
                  hasSelection={this.props.value.length === 2}
                  onClear={() => {
                    this.setState({ startDate: null });
                    this.emit([]);
                    clearSelection();
                  }}
                  isOpen={isOpen}
                  toggleButtonProps={getToggleButtonProps()}
                  hasError={this.props.hasError}
                  hasWarning={this.props.hasWarning}
                />
                {isOpen && (
                  <DateCalendarMenu
                    {...getMenuProps()}
                    hasError={this.props.hasError}
                    hasWarning={this.props.hasWarning}
                  >
                    <DateCalendarHeader
                      label={getCalendarLabel(
                        this.state.calendarDate,
                        this.props.intl.locale
                      )}
                      onPrevMonthClick={() => this.jumpMonth(-1)}
                      onTodayClick={this.showToday}
                      onNextMonthClick={() => this.jumpMonth(1)}
                      onPrevYearClick={() => this.jumpMonth(-12)}
                      onNextYearClick={() => this.jumpMonth(12)}
                    />
                    <DateCalendarCalendar>
                      {weekdays.map(weekday => (
                        <DateCalendarDay key={weekday} type="heading">
                          {weekday}
                        </DateCalendarDay>
                      ))}
                      {paddingDays.map((day, index) => (
                        <DateCalendarDay key={index} type="spacing" />
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
                          <DateCalendarDay
                            key={item}
                            isToday={isSameDay(today, item)}
                            {...getItemProps({
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
                          </DateCalendarDay>
                        );
                      })}
                    </DateCalendarCalendar>
                  </DateCalendarMenu>
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
