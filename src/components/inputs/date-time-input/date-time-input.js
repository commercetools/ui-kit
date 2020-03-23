import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { injectIntl } from 'react-intl';
import Constraints from '@commercetools-uikit/constraints';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import {
  changeTime,
  formatTime,
  getDateInMonth,
  getToday,
  changeMonth,
  getPaddingDayCount,
  getWeekdayNames,
  getStartOf,
  getMonthCalendarLabel,
  getYearCalendarLabel,
  isSameDay,
  getCalendarDayLabel,
  createItemDateTimeToString,
  createCalendarItems,
  createSuggestedItems,
  parseInputText,
} from '@commercetools-uikit/calendar-time-utils';
import { parseTime } from '../../../utils/parse-time';
import CalendarBody from '../../internals/calendar-body';
import CalendarMenu from '../../internals/calendar-menu';
import CalendarHeader from '../../internals/calendar-header';
import CalendarContent from '../../internals/calendar-content';
import CalendarDay from '../../internals/calendar-day';
import TimeInput from './time-input';
import messages from './messages';

const activationTypes = [
  Downshift.stateChangeTypes.keyDownEnter,
  Downshift.stateChangeTypes.clickItem,
];

const preventDownshiftDefault = (event) => {
  // eslint-disable-next-line no-param-reassign
  event.nativeEvent.preventDownshiftDefault = true;
};

// This keeps the menu open when the user focuses the time input (thereby
// blurring the regular input/toggle button)
const createBlurHandler = (timeInputRef) => (event) => {
  event.persist();
  if (event.relatedTarget === timeInputRef.current) {
    preventDownshiftDefault(event);
  }
};

class DateTimeInput extends React.Component {
  static displayName = 'DateTimeInput';
  static propTypes = {
    intl: PropTypes.shape({
      locale: PropTypes.string.isRequired,
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    timeZone: PropTypes.string.isRequired,
    id: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    isDisabled: PropTypes.bool,
    isReadOnly: PropTypes.bool,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
  };
  inputRef = React.createRef();
  timeInputRef = React.createRef();
  state = {
    calendarDate: getToday(this.props.timeZone),
    suggestedItems: [],
    highlightedIndex:
      this.props.value === ''
        ? null
        : getDateInMonth(this.props.value, this.props.timeZone) - 1,
    timeString: '',
  };
  jumpMonths = (amount) => {
    this.setState((prevState) => {
      const nextDate = changeMonth(
        prevState.calendarDate,
        this.props.timeZone,
        amount
      );
      return { calendarDate: nextDate, highlightedIndex: 0 };
    });
  };
  showToday = () => {
    const today = getToday(this.props.timeZone);
    this.setState(
      (prevState) => ({
        calendarDate: today,
        highlightedIndex:
          prevState.suggestedItems.length +
          getDateInMonth(today, this.props.timeZone) -
          1,
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
  handleTimeChange = (event) => {
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
  emit = (value) =>
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
          // Setting the key to the timeZone conveniently forces a rerender
          // when the time-zone changes. Otherwise we'd need to make
          // inputValue a controlled property so that we can update
          // the displayed value as downshift seems to ignore an updated
          // itemToString function.
          key={`${this.props.timeZone}:${this.props.intl.locale}`}
          inputId={this.props.id}
          itemToString={createItemDateTimeToString(
            this.props.intl.locale,
            this.props.timeZone
          )}
          selectedItem={this.props.value === '' ? null : this.props.value}
          highlightedIndex={this.state.highlightedIndex}
          onChange={this.emit}
          stateReducer={(state, changes) => {
            if (activationTypes.includes(changes.type)) {
              return { ...changes, isOpen: true };
            }

            return changes;
          }}
          onStateChange={(changes) => {
            /* eslint-disable no-prototype-builtins */
            this.setState(
              (prevState) => {
                if (activationTypes.includes(changes.type)) {
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
                    changes.inputValue,
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
                    timeString:
                      changes.isOpen && this.props.value !== ''
                        ? formatTime(
                            this.props.value,
                            this.props.intl.locale,
                            this.props.timeZone
                          )
                        : '',
                    // ensure calendar always opens on selected item, or on
                    // current month when there is no selected item
                    calendarDate:
                      this.props.value === '' ? getToday() : this.props.value,
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
            inputValue,
            isOpen,
          }) => {
            const suggestedItems = this.state.suggestedItems;
            const calendarItems = createCalendarItems(
              this.state.calendarDate,
              this.state.timeString,
              this.props.intl,
              this.props.timeZone
            );

            const paddingDayCount = getPaddingDayCount(
              this.state.calendarDate,
              this.props.intl.locale,
              this.props.timeZone
            );
            const paddingDays = Array(paddingDayCount).fill();

            const weekdays = getWeekdayNames(this.props.intl.locale);
            const today = getToday();

            const isTimeInputVisible =
              Boolean(this.props.value) && this.props.value !== '';

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
                    onMouseEnter: () => {
                      // we remove the highlight so that the user can use the
                      // arrow keys to move the cursor when hovering
                      if (isOpen) setHighlightedIndex(null);
                    },
                    onKeyDown: (event) => {
                      // parse input when user presses enter on regular input,
                      // close menu and notify parent
                      if (event.key === 'Enter' && highlightedIndex === null) {
                        preventDownshiftDefault(event);

                        const parsedDate = parseInputText(
                          inputValue,
                          this.props.intl.locale,
                          this.props.timeZone
                        );

                        this.emit(parsedDate);

                        closeMenu();
                      }
                    },
                    onFocus: this.props.isReadOnly ? undefined : openMenu,
                    onClick: this.props.isReadOnly ? undefined : openMenu,
                    onBlur: createBlurHandler(this.timeInputRef),
                    onChange: (event) => {
                      // keep timeInput and regular input in sync when user
                      // types into regular input
                      if (!isOpen) return;

                      const time = event.target.value.split(' ')[1];
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
                      placeholder={this.props.intl.formatMessage(
                        messages.timePlaceholder
                      )}
                      value={this.state.timeString}
                      onChange={this.handleTimeChange}
                      onKeyDown={(event) => {
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
