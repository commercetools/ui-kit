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
  getDaysInMonth,
  getDateInMonth,
  getToday,
  changeMonth,
  getPaddingDayCount,
  getWeekdayNames,
  getCalendarLabel,
  isSameDay,
  getCalendarDayLabel,
  createCalendarItems,
  createItemToString,
  parseInputToDate,
} from './utils';

class DateCalendar extends React.Component {
  static displayName = 'DateCalendar';
  static propTypes = {
    intl: PropTypes.shape({
      locale: PropTypes.string.isRequired,
    }).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  inputRef = React.createRef();
  state = {
    calendarDate:
      this.props.value.length === 2 ? this.props.value[0] : getToday(),
    suggestedItems: [],
    highlightedIndex:
      this.props.value === '' ? null : getDateInMonth(this.props.value) - 1,
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
  showPrevYear = () => {
    this.setState(prevState => {
      const nextYear = changeMonth(prevState.calendarDate, -12);
      return {
        calendarDate: nextYear,
        // select last day in next month
        highlightedIndex: getDaysInMonth(nextYear) - 1,
      };
    });
  };
  showNextYear = () => {
    this.setState(prevState => {
      const nextYear = changeMonth(prevState.calendarDate, 12);
      return {
        calendarDate: nextYear,
        // select last day in next month
        highlightedIndex: getDaysInMonth(nextYear) - 1,
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
  handleChange = date => {
    this.inputRef.current.setSelectionRange(0, 100);
    this.emit(date);
  };
  emit = value =>
    this.props.onChange({
      target: {
        id: this.props.id,
        name: this.props.name,
        // when cleared the value is null, but we always want it to be an
        // empty string when there is no value.
        value: value || '',
      },
    });
  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Downshift
          key={this.props.intl.locale}
          itemToString={createItemToString(this.props.intl.locale)}
          selectedItem={this.props.value === '' ? null : this.props.value}
          highlightedIndex={this.state.highlightedIndex}
          onChange={this.handleChange}
          onStateChange={changes => {
            /* eslint-disable no-prototype-builtins */
            if (changes.hasOwnProperty('inputValue')) {
              // input changed because user typed
              if (changes.type === Downshift.stateChangeTypes.changeInput) {
                const date = parseInputToDate(
                  changes.inputValue,
                  this.props.intl.locale
                );
                this.setState(
                  date === ''
                    ? {
                        suggestedItems: [],
                        highlightedIndex: null,
                      }
                    : {
                        suggestedItems: [date],
                        highlightedIndex: getDateInMonth(date) - 1,
                        calendarDate: date,
                      }
                );
              } else {
                // input changed because user selected a date
                this.setState({
                  suggestedItems: [],
                  highlightedIndex: null,
                });
              }
            }

            if (changes.hasOwnProperty('highlightedIndex')) {
              this.setState({ highlightedIndex: changes.highlightedIndex });
            }

            // ensure calendar always opens on selected item, or on current
            // month when there is no selected item
            if (changes.hasOwnProperty('isOpen') && changes.isOpen) {
              this.setState({
                calendarDate:
                  this.props.value === '' ? getToday() : this.props.value,
              });
            }
            /* eslint-enable no-prototype-builtins */
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
            setHighlightedIndex,
            selectedItem,
            isOpen,
          }) => {
            const calendarItems = createCalendarItems(
              this.state.calendarDate,
              this.props.intl
            );

            const paddingDays = do {
              const weekday = getPaddingDayCount(
                this.state.calendarDate,
                this.props.intl.locale
              );
              Array(weekday).fill();
            };

            const weekdays = getWeekdayNames(this.props.intl.locale);

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
                  hasSelection={Boolean(selectedItem)}
                  onClear={clearSelection}
                  isOpen={isOpen}
                  toggleButtonProps={getToggleButtonProps()}
                />
                {isOpen && (
                  <DateCalendarMenu {...getMenuProps()}>
                    <DateCalendarHeader
                      label={getCalendarLabel(
                        this.state.calendarDate,
                        this.props.intl.locale
                      )}
                      onPrevMonthClick={this.showPrevMonth}
                      onTodayClick={this.showToday}
                      onNextMonthClick={this.showNextMonth}
                      onPrevYearClick={this.showPrevYear}
                      onNextYearClick={this.showNextYear}
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
                      {calendarItems.map((item, index) => (
                        <DateCalendarDay
                          key={item}
                          {...getItemProps({
                            item,
                            onMouseOut: () => {
                              setHighlightedIndex(null);
                            },
                          })}
                          isHighlighted={index === highlightedIndex}
                          isSelected={isSameDay(item, this.props.value)}
                        >
                          {getCalendarDayLabel(item)}
                        </DateCalendarDay>
                      ))}
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

export default injectIntl(DateCalendar);
