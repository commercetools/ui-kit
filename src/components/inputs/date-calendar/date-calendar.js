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

const preventDownshiftDefault = event => {
  // eslint-disable-next-line no-param-reassign
  event.nativeEvent.preventDownshiftDefault = true;
};

const createKeyDownHandler = ({
  isOpen,
  setHighlightedIndex,
  clearSelection,
  closeMenu,
  inputValue,
  highlightedItemType,
  highlightedIndex,
  allItems,
  openMenu,
  inputRef,
  suggestedItems,
  showNextMonth,
  showPrevMonth,
  emit,
  locale,
}) => event => {
  const preventCursorJump = () => {
    event.preventDefault();
  };

  // allow closing menu when pressing enter on empty input
  if (
    event.key === 'Enter' &&
    inputValue.trim() === '' &&
    highlightedIndex === null
  ) {
    preventDownshiftDefault(event);
    clearSelection();
    closeMenu();
    emit('');
    return;
  }

  if (
    event.key === 'Enter' &&
    inputValue.trim() !== '' &&
    highlightedIndex === null
  ) {
    preventDownshiftDefault(event);
    closeMenu();

    emit(parseInputToDate(inputValue, locale));
    inputRef.current.setSelectionRange(0, 100);
    return;
  }

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
                console.log('parsed', date);
                if (date === '') {
                  this.setState({
                    suggestedItems: [],
                    highlightedIndex: null,
                  });
                } else {
                  this.setState({
                    suggestedItems: [date],
                    highlightedIndex: null,
                    calendarDate: date,
                  });
                }
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
            closeMenu,
            inputValue,
            setHighlightedIndex,
            selectedItem,
            isOpen,
          }) => {
            const suggestedItems = this.state.suggestedItems;
            const calendarItems = createCalendarItems(
              this.state.calendarDate,
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
                    onKeyDown: createKeyDownHandler({
                      isOpen,
                      setHighlightedIndex,
                      clearSelection,
                      closeMenu,
                      inputValue,
                      highlightedItemType,
                      highlightedIndex,
                      allItems,
                      openMenu,
                      suggestedItems,
                      inputRef: this.inputRef,
                      showNextMonth: this.showNextMonth,
                      showPrevMonth: this.showPrevMonth,
                      emit: this.emit,
                      locale: this.props.intl.locale,
                    }),
                    onFocus: openMenu,
                    onClick: openMenu,
                  })}
                  hasSelection={Boolean(selectedItem)}
                  onClear={clearSelection}
                  isOpen={isOpen}
                  toggleButtonProps={getToggleButtonProps({
                    onKeyDown: createKeyDownHandler({
                      isOpen,
                      setHighlightedIndex,
                      clearSelection,
                      closeMenu,
                      inputValue,
                      highlightedItemType,
                      highlightedIndex,
                      allItems,
                      openMenu,
                      suggestedItems,
                      inputRef: this.inputRef,
                      showNextMonth: this.showNextMonth,
                      showPrevMonth: this.showPrevMonth,
                      emit: this.emit,
                      locale: this.props.intl.locale,
                    }),
                  })}
                />
                {isOpen && (
                  <DateCalendarMenu {...getMenuProps()}>
                    {suggestedItems.length > 0 && (
                      <DateCalendarSuggestions>
                        {suggestedItems.map((item, index) => (
                          <DateCalendarSuggestion
                            key={item}
                            {...getItemProps({ item })}
                            isHighlighted={index === highlightedIndex}
                          >
                            Suggestion {item}
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
                      {calendarItems.map((item, index) => (
                        <DateCalendarDay
                          key={item}
                          {...getItemProps({
                            item,
                            onMouseOut: () => {
                              setHighlightedIndex(null);
                            },
                          })}
                          isHighlighted={
                            suggestedItems.length + index === highlightedIndex
                          }
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
