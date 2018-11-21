import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import { parseTime } from './parse-time';
import DateCalendarBody from './date-calendar-body';
import DateCalendarMenu from './date-calendar-menu';
import DateCalendarHeader from './date-calendar-header';
import DateCalendarCalendar from './date-calendar-calendar';
import DateCalendarDay from './date-calendar-day';
import DateCalendarSuggestions from './date-calendar-suggestions';
import DateCalendarSuggestion from './date-calendar-suggestion';
import DateCalendarTimeInput from './date-calendar-time-input';
import Constraints from '../../constraints';

const activationTypes = [
  Downshift.stateChangeTypes.keyDownEnter,
  Downshift.stateChangeTypes.clickItem,
];

const createCalendarItems = (day, timeString) => {
  const parsedTime = parseTime(timeString);

  return Array.from({ length: moment(day).daysInMonth() }).map((_, i) => {
    const dayOfMonth = i + 1;
    const date = moment(day)
      .date(dayOfMonth)
      .startOf('day');
    if (parsedTime) {
      date.hours(parsedTime.hours);
      date.minutes(parsedTime.minutes);
      date.seconds(parsedTime.seconds);
      date.seconds(parsedTime.seconds);
      date.milliseconds(parsedTime.milliseconds);
    }
    return date;
  });
};

// eslint-disable-next-line arrow-body-style
const createSuggestedItems = inputValue => {
  if (inputValue.startsWith('t')) return [moment()];
  return [];
};

const preventDownshiftDefault = event => {
  // eslint-disable-next-line no-param-reassign
  event.nativeEvent.preventDownshiftDefault = true;
};

const parseInputText = text => {
  const [dateString, timeString] = text.split(' ');
  if (!dateString) return null;

  const date = moment(dateString, 'MM/DD/YYYY');
  if (!date.isValid()) return null;

  // enable parsing a date only
  if (!timeString) return date.startOf('day');

  const parsedTime = parseTime(timeString);
  if (parsedTime) {
    date.hours(parsedTime.hours);
    date.minutes(parsedTime.minutes);
    date.seconds(parsedTime.seconds);
    date.seconds(parsedTime.seconds);
    date.milliseconds(parsedTime.milliseconds);
    return date;
  }
  return null;
};

const createItemToString = (/* intl */) => item =>
  item ? moment(item).format('L LT') : '';

const createKeyDownHandler = ({
  isOpen,
  setHighlightedIndex,
  // clearSelection,
  // closeMenu,
  highlightedItemType,
  highlightedIndex,
  allItems,
  openMenu,
  suggestedItems,
  showNextMonth,
  showPrevMonth,
  timeInputRef,
  // emit,
}) => event => {
  const preventCursorJump = () => {
    event.preventDefault();
  };

  const arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

  if (highlightedItemType !== 'none') {
    // user presses arrow keys while something is highlighted,
    // so we want to prevent the cursor from jumping
    if (arrowKeys.includes(event.key)) preventCursorJump();
    // user types while something was highlighted, so we
    // want to remove the highlight, which in turn
    // allows the user to use the arrow keys
    else setHighlightedIndex(null);
  }

  if (event.key === 'ArrowLeft') {
    if (highlightedItemType === 'none') return;
    preventDownshiftDefault(event);

    if (highlightedIndex === suggestedItems.length) {
      showPrevMonth();
    } else {
      setHighlightedIndex(
        do {
          if (highlightedIndex === 0) null;
          else Math.max(highlightedIndex - 1, 0);
        }
      );
    }
    return;
  }
  if (event.key === 'ArrowRight') {
    if (highlightedItemType === 'none') return;
    preventDownshiftDefault(event);
    if (highlightedIndex === allItems.length - 1) {
      showNextMonth();
    } else {
      setHighlightedIndex(Math.min(highlightedIndex + 1, allItems.length - 1));
    }
    return;
  }

  if (event.key === 'ArrowDown') {
    preventDownshiftDefault(event);

    if (highlightedIndex === allItems.length - 1 && isOpen) {
      setHighlightedIndex(null);
      timeInputRef.current.focus();
      return;
    }

    // reopens menu after in cases user focues the input,
    // then selects a value (menu closes) and then presses
    // the down key
    if (!isOpen) openMenu();

    setHighlightedIndex(
      do {
        if (highlightedItemType === 'none') 0;
        else if (highlightedItemType === 'calendarItem')
          Math.min(highlightedIndex + 7, allItems.length - 1);
        else highlightedIndex + 1;
      }
    );
  }
  if (event.key === 'ArrowUp') {
    preventDownshiftDefault(event);
    setHighlightedIndex(
      do {
        if (highlightedIndex === 0) null;
        else if (highlightedIndex === null) null;
        else if (highlightedItemType === 'calendarItem')
          Math.max(
            highlightedIndex - 7,
            Math.max(suggestedItems.length - 1, 0)
          );
        else highlightedIndex - 1;
      }
    );
  }
};

// This keeps the menu open when the user focuses the time input (thereby
// blurring the regular input/toggle button)
const createBlurHandler = timeInputRef => event => {
  event.persist();
  if (event.relatedTarget === timeInputRef.current) {
    preventDownshiftDefault(event);
  }
};

class DateTimeCalendar extends React.Component {
  static displayName = 'DateTimeCalendar';
  static propTypes = {
    intl: PropTypes.shape({
      locale: PropTypes.string.isRequired,
    }).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  inputRef = React.createRef();
  timeInputRef = React.createRef();
  state = {
    calendarDate: moment(),
    suggestedDates: [],
    highlightedIndex:
      this.props.value === '' ? null : moment(this.props.value).date() - 1,
    timeString: '',
  };
  showPrevMonth = () => {
    this.setState(prevState => ({
      calendarDate: prevState.calendarDate.clone().subtract(1, 'month'),
      // select first day in next month
      highlightedIndex: prevState.suggestedDates.length,
    }));
  };
  showNextMonth = () => {
    this.setState(prevState => {
      const nextMonth = prevState.calendarDate.clone().add(1, 'month');
      return {
        calendarDate: nextMonth,
        highlightedIndex:
          // select last day in next month
          prevState.suggestedDates.length + nextMonth.daysInMonth() - 1,
      };
    });
  };
  showToday = () => {
    const today = moment();
    this.setState(
      prevState => ({
        calendarDate: today,
        highlightedIndex: prevState.suggestedDates.length + today.date() - 1,
      }),
      () => this.inputRef.current.focus()
    );
  };
  handleChange = date => {
    const value = date ? date.toISOString() : '';
    this.emit(value);
  };
  handleTimeChange = event => {
    const parsedTime = parseTime(event.target.value);

    this.setState({ timeString: event.target.value });

    // We can't update the parent when there is no value
    if (this.props.value === '') return;

    const date = moment(this.props.value).startOf('day');
    if (parsedTime) {
      date.hours(parsedTime.hours);
      date.minutes(parsedTime.minutes);
      date.seconds(parsedTime.seconds);
      date.seconds(parsedTime.seconds);
      date.milliseconds(parsedTime.milliseconds);
    }
    this.emit(date.toISOString());
  };
  emit = value =>
    this.props.onChange({
      target: {
        id: this.props.id,
        name: this.props.name,
        value,
      },
    });
  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <Downshift
          itemToString={createItemToString(this.props.intl)}
          selectedItem={this.props.value === '' ? null : this.props.value}
          highlightedIndex={this.state.highlightedIndex}
          onChange={this.handleChange}
          stateReducer={(state, changes) => {
            if (activationTypes.includes(changes.type)) {
              return {
                ...changes,
                isOpen: true,
              };
            }

            return changes;
          }}
          onStateChange={changes => {
            /* eslint-disable no-prototype-builtins */
            this.setState(
              prevState => {
                if (activationTypes.includes(changes.type)) {
                  return {
                    startDate: changes.isOpen ? prevState.startDate : null,
                    inputValue: changes.inputValue || prevState.inputValue,
                    timeString: changes.selectedItem
                      ? changes.selectedItem.format('LT')
                      : prevState.timeString,
                  };
                }

                if (changes.hasOwnProperty('inputValue')) {
                  const suggestedItems = createSuggestedItems(
                    changes.inputValue,
                    this.props.intl
                  );
                  return {
                    suggestedDates: suggestedItems,
                    highlightedIndex: suggestedItems.length > 0 ? 0 : null,
                  };
                }

                if (changes.hasOwnProperty('isOpen')) {
                  return {
                    inputValue: changes.inputValue || prevState.inputValue,
                    startDate: changes.isOpen ? prevState.startDate : null,
                    // set time input value to time from value when menu is opened
                    timeString: changes.isOpen
                      ? moment(this.props.value).format('LT')
                      : '',
                  };
                }

                if (changes.hasOwnProperty('highlightedIndex')) {
                  return { highlightedIndex: changes.highlightedIndex };
                }
                return null;
              },
              () => {
                if (activationTypes.includes(changes.type)) {
                  this.timeInputRef.current.focus();
                  this.timeInputRef.current.setSelectionRange(
                    0,
                    this.state.timeString.length
                  );
                }
              }
            );
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
            closeMenu,
            setHighlightedIndex,
            selectedItem,
            isOpen,
          }) => {
            const suggestedItems = this.state.suggestedDates;
            const calendarItems = createCalendarItems(
              this.state.calendarDate,
              this.state.timeString,
              this.props.intl
            );
            const allItems = [...suggestedItems, ...calendarItems];

            const highlightedItemType = do {
              if (highlightedIndex === null) 'none';
              else if (highlightedIndex < suggestedItems.length)
                'suggestedItem';
              else 'calendarItem';
            };

            const paddingDays = do {
              const weekday = this.state.calendarDate.startOf('month').day();
              Array(weekday).fill();
            };

            const weekdays = moment.localeData('en').weekdaysMin();

            const isTimeInputVisible =
              this.props.value && this.props.value !== '';

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
                      // parse input when user presses enter on regular input,
                      // close menu and notify parent
                      if (event.key === 'Enter' && highlightedIndex === null) {
                        preventDownshiftDefault(event);
                        closeMenu();

                        const parsedDate = parseInputText(
                          this.state.inputValue
                        );
                        // this.setState({
                        //   inputValue: parsedDate ? parsedDate.format('L LT') : '',
                        // });
                        this.emit(parsedDate ? parsedDate.toISOString() : '');
                        return;
                      }

                      createKeyDownHandler({
                        isOpen,
                        setHighlightedIndex,
                        highlightedItemType,
                        highlightedIndex,
                        allItems,
                        openMenu,
                        suggestedItems,
                        showNextMonth: this.showNextMonth,
                        showPrevMonth: this.showPrevMonth,
                        timeInputRef: this.timeInputRef,
                      })(event);
                    },
                    onFocus: openMenu,
                    onClick: openMenu,
                    onBlur: createBlurHandler(this.timeInputRef),
                    onChange: event => {
                      // keep timeInput and regular input in sync when user
                      // types into regular input
                      if (!isOpen) return;

                      const time = event.target.value.split(' ')[1];
                      if (!time) return;

                      const parsedTime = parseTime(time);
                      this.setState(() => {
                        if (!parsedTime) return { timeString: '' };

                        const date = moment();
                        if (parsedTime) {
                          date.hours(parsedTime.hours);
                          date.minutes(parsedTime.minutes);
                          date.seconds(parsedTime.seconds);
                          date.seconds(parsedTime.seconds);
                          date.milliseconds(parsedTime.milliseconds);
                        }
                        return { timeString: date.format('LT') };
                      });
                    },
                  })}
                  hasSelection={Boolean(selectedItem)}
                  onClear={clearSelection}
                  isOpen={isOpen}
                  toggleButtonProps={getToggleButtonProps({
                    onKeyDown: createKeyDownHandler({
                      isOpen,
                      setHighlightedIndex,
                      highlightedItemType,
                      highlightedIndex,
                      allItems,
                      openMenu,
                      suggestedItems,
                      showNextMonth: this.showNextMonth,
                      showPrevMonth: this.showPrevMonth,
                      timeInputRef: this.timeInputRef,
                    }),
                    onBlur: createBlurHandler(this.timeInputRef),
                  })}
                />
                {isOpen && (
                  <DateCalendarMenu
                    {...getMenuProps()}
                    hasFooter={isTimeInputVisible}
                  >
                    {suggestedItems.length > 0 && (
                      <DateCalendarSuggestions>
                        {suggestedItems.map((item, index) => (
                          <DateCalendarSuggestion
                            key={item.format('YYYY-MM-DD')}
                            {...getItemProps({ item })}
                            isHighlighted={index === highlightedIndex}
                          >
                            Suggestion {item.format('YYYY-MM-DD')}
                          </DateCalendarSuggestion>
                        ))}
                      </DateCalendarSuggestions>
                    )}
                    <DateCalendarHeader
                      label={this.state.calendarDate.format('MMMM YYYY')}
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
                      {calendarItems.map((item, index) => (
                        <DateCalendarDay
                          key={item.format('YYYY-MM-DD')}
                          {...getItemProps({
                            item,
                            onMouseOut: () => {
                              setHighlightedIndex(null);
                            },
                          })}
                          isHighlighted={
                            suggestedItems.length + index === highlightedIndex
                          }
                          isSelected={item.isSame(this.props.value, 'day')}
                        >
                          {item.format('DD')}
                        </DateCalendarDay>
                      ))}
                    </DateCalendarCalendar>
                    {isTimeInputVisible && (
                      <DateCalendarTimeInput
                        timeInputRef={this.timeInputRef}
                        value={this.state.timeString}
                        onChange={this.handleTimeChange}
                        onKeyDown={event => {
                          if (event.key === 'ArrowUp') {
                            setHighlightedIndex(null);
                            this.inputRef.current.focus();
                            return;
                          }

                          if (event.key === 'Enter') {
                            setHighlightedIndex(null);
                            this.inputRef.current.focus();
                            this.inputRef.current.setSelectionRange(0, 100);
                            closeMenu();
                          }
                        }}
                      />
                    )}
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

export default injectIntl(DateTimeCalendar);
