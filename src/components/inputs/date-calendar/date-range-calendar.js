import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { injectIntl } from 'react-intl';
import DateCalendarBody from './date-calendar-body';
import DateCalendarMenu from './date-calendar-menu';
import DateCalendarHeader from './date-calendar-header';
import DateCalendarCalendar from './date-calendar-calendar';
import DateCalendarDay from './date-calendar-day';
import DateCalendarSuggestions from './date-calendar-suggestions';
import DateCalendarSuggestion from './date-calendar-suggestion';
import Constraints from '../../constraints';
import {
  getDaysInMonth,
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
} from './utils';

const parseRangeText = text => {
  // TODO parse more formats, but format them all to YYYY-MM-DD
  const isValid = str => /^\d{4}-\d{2}-\d{2}$/.test(str);
  const parts = text
    .split(' - ')
    .map(part => {
      const cleanedPart = part.trim().replace(' -', '');
      if (isValid(cleanedPart)) return cleanedPart;
      return null;
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
  };
  static getDerivedStateFromProps(props, state) {
    if (isSameRange(props.value, state.prevValue)) return null;
    return {
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
  };
  showPrevMonth = () => {
    this.setState(prevState => ({
      calendarDate: changeMonth(prevState.calendarDate, -1),
      // select first day in next month
      highlightedIndex: prevState.suggestedItems.length,
    }));
  };
  showNextMonth = () => {
    this.setState(prevState => {
      const nextMonth = changeMonth(prevState.calendarDate, 1);
      return {
        calendarDate: nextMonth,
        highlightedIndex:
          // select last day in next month
          prevState.suggestedItems.length + getDaysInMonth(nextMonth) - 1,
      };
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
          itemToString={createItemRangeToString(this.props.intl.locale)}
          inputValue={this.state.inputValue}
          selectedItem={null}
          highlightedIndex={this.state.highlightedIndex}
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

              if (changes.hasOwnProperty('inputValue')) {
                const parsedRange = parseRangeText(changes.inputValue);
                if (parsedRange.length === 0)
                  return {
                    suggestedItems: [],
                    highlightedIndex: null,
                    inputValue: changes.inputValue,
                    startDate: null,
                  };
                if (parsedRange.length === 1) {
                  const calendarDate = parsedRange[0];
                  return {
                    suggestedItems: [],
                    highlightedIndex: getDateInMonth(calendarDate) - 1,
                    inputValue: changes.inputValue,
                    startDate: parsedRange[0],
                    calendarDate,
                  };
                }
                if (parsedRange.length === 2) {
                  const calendarDate = parsedRange[1];
                  return {
                    suggestedItems: [],
                    highlightedIndex: getDateInMonth(calendarDate) - 1,
                    inputValue: changes.inputValue,
                    startDate: parsedRange[0],
                    calendarDate,
                  };
                }
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
                />
                {isOpen && (
                  <DateCalendarMenu {...getMenuProps()}>
                    {this.state.suggestedItems.length > 0 && (
                      <DateCalendarSuggestions>
                        {this.state.suggestedItems.map((item, index) => (
                          <DateCalendarSuggestion
                            key={`${item[0]} - ${item[1]}`}
                            {...getItemProps({ item })}
                            isHighlighted={index === highlightedIndex}
                          >
                            Suggestion {item[0] - item[1]}
                          </DateCalendarSuggestion>
                        ))}
                      </DateCalendarSuggestions>
                    )}
                    <DateCalendarHeader
                      label={getCalendarLabel(
                        this.state.calendarDate,
                        this.props.intl.locale
                      )}
                      onPrevMonthClick={this.showPrevMonth}
                      onTodayClick={this.showToday}
                      onNextMonthClick={this.showNextMonth}
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
