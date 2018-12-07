import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { injectIntl } from 'react-intl';
import CalendarBody from '../../internals/calendar-body';
import CalendarMenu from '../../internals/calendar-menu';
import CalendarHeader from '../../internals/calendar-header';
import CalendarCalendar from '../../internals/calendar-calendar';
import CalendarDay from '../../internals/calendar-day';
import Constraints from '../../constraints';
import messages from './messages';
import filterDataAttributes from '../../../utils/filter-data-attributes';
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
} from '../../../utils/calendar';

class DateInput extends React.Component {
  static displayName = 'DateInput';
  static propTypes = {
    intl: PropTypes.shape({
      locale: PropTypes.string.isRequired,
    }).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    isDisabled: PropTypes.bool,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
  };
  inputRef = React.createRef();
  state = {
    calendarDate: this.props.value || getToday(),
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
  handleBlur = () => {
    if (this.props.onBlur)
      this.props.onBlur({
        target: {
          id: this.props.id,
          name: this.props.name,
        },
      });
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
          inputId={this.props.id}
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
            inputValue,
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
            const today = getToday();

            return (
              <div onFocus={this.props.onFocus} onBlur={this.handleBlur}>
                <CalendarBody
                  inputRef={this.inputRef}
                  inputProps={getInputProps({
                    name: this.props.name,
                    placeholder:
                      typeof this.props.placeholder === 'string'
                        ? this.props.placeholder
                        : this.props.intl.formatMessage(messages.placeholder),
                    disabled: this.props.isDisabled,
                    onMouseEnter: () => {
                      // we remove the highlight so that the user can use the
                      // arrow keys to move the cursor when hovering
                      if (isOpen) setHighlightedIndex(null);
                    },
                    onKeyDown: event => {
                      if (event.key === 'Enter' && inputValue.trim() === '') {
                        clearSelection();
                      }
                    },
                    onFocus: openMenu,
                    onClick: openMenu,
                    ...filterDataAttributes(this.props),
                  })}
                  hasSelection={Boolean(selectedItem)}
                  onClear={clearSelection}
                  isOpen={isOpen}
                  isDisabled={this.props.isDisabled}
                  toggleButtonProps={getToggleButtonProps({
                    disabled: this.props.isDisabled,
                  })}
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
                    <CalendarCalendar>
                      {weekdays.map(weekday => (
                        <CalendarDay key={weekday} type="heading">
                          {weekday}
                        </CalendarDay>
                      ))}
                      {paddingDays.map((day, index) => (
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
                              setHighlightedIndex(null);
                            },
                          })}
                          isHighlighted={index === highlightedIndex}
                          isSelected={isSameDay(item, this.props.value)}
                        >
                          {getCalendarDayLabel(item)}
                        </CalendarDay>
                      ))}
                    </CalendarCalendar>
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

export default injectIntl(DateInput);
