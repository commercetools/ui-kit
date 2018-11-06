// This component is based on the experimental Date Picker example
// https://react-select.com/advanced#experimental
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import mapValues from 'lodash.mapvalues';
import Select, { components as SelectComponents } from 'react-select';
import { suggestDate } from '../../../utils/suggest-date';
import Constraints from '../../constraints';
import messages from './messages';
import styles from './date-time-input.mod.css';
import ClearIndicator from '../../internals/clear-indicator';
import CalendarDropdownIndicator from '../../internals/calendar-dropdown-indicator';
import createDateSelectStyles from '../../internals/create-date-select-styles';
import { AngleLeftIcon, AngleRightIcon } from '../../icons';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import SecondaryIconButton from '../../buttons/secondary-icon-button';

const formatTime = date => {
  if (date.milliseconds()) return date.format('HH:mm:ss.SSS');
  if (date.seconds()) return date.format('LTS'); // 5:13:51 PM
  return date.format('LT'); // 5:13 PM
};

const setFocus = (selectRef, option) => {
  // eslint-disable-next-line no-param-reassign
  selectRef.current.select.scrollToFocusedOptionOnUpdate = true;
  selectRef.current.select.setState({
    focusedOption: option,
    focusedValue: null,
  });
};

// Tries to find the first match for which there is a date and time,
// otherwise returns with a date only.
// Example
//  splitDateTimeString('Monday @ 4pm', [' at ', ' @ '])
//  => ['Monday', '4pm']
export const splitDateTimeString = (value, separators) => {
  let result = [];
  const clean = list =>
    list
      .filter(s => typeof s === 'string')
      .map(s => s.trim())
      .filter(s => s.length > 0);
  separators.forEach(separator => {
    const intermediateResult = value.split(new RegExp(separator, 'i'));
    if (result.length === 0) result = clean(intermediateResult);
    else if (intermediateResult.length > result.length)
      result = clean(intermediateResult);
  });
  return result;
};

// COPIED FROM time-input.js
// Attempts to parse a string containing a time in either 12h or 24h format,
// with precision of up to three milliseconds
// Valid inputs:
//   13:00
//   3:00
//   3 PM
//   14:5 am
//   13:00:00.000
//   13:00:60
//   13:00:59.908
// Returns an object containing
//   { hours, minutes, seconds, milliseconds }
// or null
export const parseTime = rawTime => {
  if (!rawTime || typeof rawTime !== 'string') return null;

  const time = rawTime.trim().toLowerCase();

  const match = time.match(
    /^(\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:\.(\d{1,3}))?)?)?\s*(am|pm)?$/
  );
  if (!match) return null;

  // As we accept eg "3 AM" there might not be a value for minutes, seconds or
  // milliseconds, so we default them
  let [
    ,
    hours,
    minutes = '00',
    seconds = '00',
    milliseconds = '000',
    // eslint-disable-next-line prefer-const
    amPm,
  ] = match;
  minutes = Number(minutes);
  seconds = Number(seconds);
  // Parses the number as a fraction to ensure that .5, .05 and .005 are
  // parsed correctily (they are 500, 50 and 5 respectively).
  milliseconds = Number(`0.${milliseconds}`) * 1000;
  // edge-case: allow 24:00, but nothing over it
  hours =
    Number(hours) === 24 && minutes === 0 && seconds === 0 && milliseconds === 0
      ? 0
      : Number(hours);

  if (amPm) {
    if (hours > 12) return null;
    if (hours === 0) return null;
    if (minutes > 59) return null;
  } else {
    if (hours > 23) return null;
    if (minutes > 59) return null;
  }
  if (seconds > 59) return null;
  if (milliseconds > 999) return null;

  // 12 pm (just like 24:00) would be on the next day, so we treat it as an
  // invalid value to avoid edge cases like the day jumping forward
  // if (amPm === 'pm' && Number(hours) === 12) return null;

  const hourOffset = do {
    if (amPm === 'am' && hours === 12) -12;
    else if (amPm === 'am') 0;
    else if (amPm === 'pm' && hours !== 12) 12;
    else 0;
  };

  return {
    hours: Number(hours) + hourOffset,
    minutes,
    seconds,
    milliseconds,
  };
};

const CalendarConnector = React.createContext();

const isValidDate = date => Boolean(date) && !isNaN(date.getTime());

const createOptionForDate = (day, timeZone, intl) => {
  // convert date to time zone
  const date = moment(day)
    .locale(intl.locale)
    .tz(timeZone);

  const hasMilliseconds = date.milliseconds() > 0;
  const hasSeconds = hasMilliseconds || date.seconds() > 0;
  const formatters = mapValues(
    {
      sameDay: intl.formatMessage(messages.sameDay),
      nextDay: intl.formatMessage(messages.nextDay),
      nextWeek: intl.formatMessage(messages.nextWeek),
      lastDay: intl.formatMessage(messages.lastDay),
      lastWeek: intl.formatMessage(messages.lastWeek),
      sameElse: intl.formatMessage(messages.sameElse),
    },
    format => {
      // Ensures the exact time is displayed, instead of minute precision only.
      //
      // This format replacement is kinda risky, but it's a nice workaround over
      // using plenty of dedicated messages to each format.
      if (hasMilliseconds) return format.replace(' LT', ' HH:mm:ss.SSS');
      if (hasSeconds) return format.replace(' LT', ' LTS');
      return format;
    }
  );

  return {
    date,
    value: date.toISOString(),
    label: date.calendar(null, formatters),
  };
};

const createCalendarOptions = (day, timeZone, intl, time) => {
  const daysInMonth = Array.from({
    length: moment(day)
      .tz(timeZone)
      .daysInMonth(),
  }).map((_, i) => {
    const dayOfMonth = i + 1;
    const date = moment(day)
      .tz(timeZone)
      .hours(time ? time.hours : 0)
      .minutes(time ? time.minutes : 0)
      .seconds(time ? time.seconds : 0)
      .milliseconds(time ? time.milliseconds : 0)
      .locale(intl.locale)
      .date(dayOfMonth);
    return {
      ...createOptionForDate(date, timeZone, intl),
      display: 'calendar',
    };
  });

  const groupLabel = moment
    .tz(day, timeZone)
    .locale(intl.locale)
    .format('MMMM YYYY');

  // group for the calendar
  return { label: groupLabel, options: daysInMonth, display: 'calendarGroup' };
};

const defaultOptions = [];

class PlainTimePicker extends React.Component {
  static displayName = 'TimePicker';

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    timeInputRef: PropTypes.object,
    value: PropTypes.string,
    isDisabled: PropTypes.bool,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
  };

  render() {
    return (
      <div>
        <input
          ref={this.props.timeInputRef}
          type="text"
          className={styles.timeInput}
          value={this.props.value}
          onChange={this.props.onChange}
          onBlur={this.props.onBlur}
          onKeyDown={event => {
            event.stopPropagation();
          }}
          onKeyUp={event => {
            event.stopPropagation();
            if (event.key === 'Enter') {
              this.props.onSubmit();
            }
          }}
        />
      </div>
    );
  }
}

const TimePicker = injectIntl(PlainTimePicker);

class MenuList extends React.Component {
  static displayName = 'MenuList';
  menuListRef = React.createRef();

  isTimeValid = time => {
    // valid times are either empty strings or parseable times
    const parsedTime = parseTime(time);
    return !(!parsedTime && time.trim() !== '');
  };

  render() {
    return (
      <div ref={this.menuListRef}>
        <SelectComponents.MenuList {...this.props} />
        {this.props.getValue().length > 0 && (
          <CalendarConnector.Consumer>
            {({
              selectRef,
              closeMenu,
              timeInputRef,
              time,
              setTime,
              onChange,
              timeZone,
            }) => (
              <TimePicker
                timeInputRef={timeInputRef}
                onBlur={event => {
                  if (
                    selectRef.current.select.controlRef &&
                    !selectRef.current.select.controlRef.contains(
                      event.relatedTarget
                    ) &&
                    selectRef.current.select.menuListRef &&
                    !selectRef.current.select.menuListRef.contains(
                      event.relatedTarget
                    )
                  ) {
                    closeMenu();
                  }

                  // reset date if time was not valid
                  if (!this.isTimeValid(time)) onChange('');
                }}
                onSubmit={() => {
                  if (!this.isTimeValid(time)) onChange('');

                  // close
                  closeMenu();
                }}
                value={time}
                onChange={event => {
                  const nextTime = event.target.value;
                  setTime(nextTime);

                  // tell the parent in case the time is valid
                  const value = this.props.getValue()?.[0]?.date;
                  // We can only update the parent when there is a date already
                  if (!value) return;

                  const parsedTime = parseTime(nextTime);
                  if (parsedTime) {
                    onChange(
                      moment
                        .tz(value, timeZone)
                        .hour(parsedTime.hours)
                        .minute(parsedTime.minutes)
                        .second(parsedTime.seconds)
                        .millisecond(parsedTime.milliseconds)
                        .toISOString()
                    );
                  } else {
                    onChange(value.toISOString());
                  }
                  // onChange()
                }}
              />
            )}
          </CalendarConnector.Consumer>
        )}
      </div>
    );
  }
}

class Menu extends React.Component {
  static displayName = 'MenuList';
  render() {
    const { innerProps, ...remainingProps } = this.props;
    return (
      <CalendarConnector.Consumer>
        {({ keepMenuOpen }) => (
          <SelectComponents.Menu
            {...remainingProps}
            innerProps={{
              ...innerProps,
              onMouseDown: event => {
                if (event.target.nodeName !== 'INPUT') {
                  innerProps.onMouseDown(event);
                } else {
                  keepMenuOpen();
                }
              },
            }}
          />
        )}
      </CalendarConnector.Consumer>
    );
  }
}

const Group = injectIntl(props => {
  const Heading = props.Heading;
  return (
    <CalendarConnector.Consumer>
      {({ month, setMonth, locale }) => {
        // const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        // This code is modifying `days`, so we need to create a fresh array
        // to avoid manipulating the moment data
        const days = [...moment.localeData(locale).weekdaysMin()];
        const firstDayOfWeek = moment.localeData(locale).firstDayOfWeek();
        // Rearrange so that week starts at Sunday/Monday depending on locale
        Array.from({ length: firstDayOfWeek }).forEach(() => {
          days.push(days.shift());
        });
        return (
          <div
            aria-label={props.label}
            style={props.getStyles('group', props)}
            {...props.innerProps}
          >
            <Heading
              theme={props.theme}
              getStyles={props.getStyles}
              cx={props.cx}
              {...props.headingProps}
            >
              <div className={styles.headingControls}>
                <SecondaryIconButton
                  label="prev month"
                  onClick={() => {
                    setMonth(
                      moment(month)
                        .subtract(1, 'month')
                        .toDate()
                    );
                  }}
                  icon={<AngleLeftIcon size="medium" />}
                />
                <div className={styles.month}>{props.label}</div>
                <SecondaryIconButton
                  label="next month"
                  onClick={() => {
                    setMonth(
                      moment(month)
                        .add(1, 'month')
                        .toDate()
                    );
                  }}
                  icon={<AngleRightIcon size="medium" />}
                />
              </div>
            </Heading>
            <div className={styles.daysHeaderContainer}>
              <div className={styles.daysHeader}>
                {days.map(day => (
                  <span key={day} className={styles.daysHeaderItem}>
                    {day}
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.daysContainerContainer}>
              <div className={styles.daysContainer}>{props.children}</div>
            </div>
          </div>
        );
      }}
    </CalendarConnector.Consumer>
  );
});
Group.displayName = 'Group';

const Option = props => (
  <CalendarConnector.Consumer>
    {({ locale }) => {
      if (props.data.display === 'calendar') {
        const today = new Date();
        const optionStyles = props.getStyles('option', {
          ...props,
          today: props.data.date.isSame(today, 'day'),
        });
        // Indent the first day of the month (date() === 1) in so that it starts
        // at the appropriate position.
        // Further respect the start of the week depending on the locale to
        // adjust the indentation.
        if (props.data.date.date() === 1) {
          const firstDayOfWeek = moment.localeData(locale).firstDayOfWeek();
          const indentBy = props.data.date.day() - firstDayOfWeek;
          if (indentBy) {
            optionStyles.marginLeft = `${indentBy * 14 + 1}%`;
          }
        }

        return (
          <span {...props.innerProps} style={optionStyles} ref={props.innerRef}>
            {props.data.date.format('D')}
          </span>
        );
      }
      return <SelectComponents.Option {...props} />;
    }}
  </CalendarConnector.Consumer>
);
Option.displayName = 'Option';

// This component is used so that we can enhance the keyboard navigation
class SelectContainer extends Component {
  static displayName = 'SelectContainer';
  render() {
    return (
      <CalendarConnector.Consumer>
        {({ selectRef, month, setMonth }) => (
          <SelectComponents.SelectContainer
            {...this.props}
            innerProps={{
              ...this.props.innerProps,
              onKeyDown: event => {
                if (
                  this.props.isDisabled ||
                  !this.props.isFocused ||
                  !selectRef.current.state.menuIsOpen ||
                  selectRef.current.select.state.focusedOption?.display !==
                    'calendar'
                ) {
                  this.props.innerProps.onKeyDown(event);
                  return;
                }

                const changeMonth = delta =>
                  setMonth(
                    moment(month)
                      .add(delta, 'month')
                      .toDate()
                  );

                // allow users to navigate months by pressing shift + left/right
                if (event.key === 'ArrowLeft' && event.shiftKey) {
                  changeMonth(-1);
                  return;
                }
                if (event.key === 'ArrowRight' && event.shiftKey) {
                  changeMonth(1);
                  return;
                }

                const calendar = this.props.options.find(
                  o => o.display === 'calendarGroup'
                );
                const dayIndex = calendar.options.findIndex(
                  o => o === selectRef.current.select.state.focusedOption
                );

                const nextOptionIndex = (() => {
                  switch (event.key) {
                    case 'ArrowUp':
                      return dayIndex - 7;
                    case 'ArrowDown':
                      return dayIndex + 7;
                    case 'ArrowLeft':
                      return dayIndex - 1;
                    case 'ArrowRight':
                      return dayIndex + 1;
                    default:
                      return null;
                  }
                })();

                if (nextOptionIndex === null) {
                  this.props.innerProps.onKeyDown(event);
                  return;
                }

                // avoid moving cursor in text
                event.preventDefault();
                // allow navigating to suggested options and between months
                // when using keyboard
                // Arrow Up/Down navigates within current month and results
                // Arrow Left/Right can be used to change months
                if (nextOptionIndex < 0) {
                  // when there is a custom option
                  if (
                    this.props.options.length > 1 &&
                    event.key === 'ArrowUp'
                  ) {
                    setFocus(selectRef, this.props.options[0]);
                  } else if (event.key === 'ArrowLeft') {
                    changeMonth(-1);
                  }
                } else if (nextOptionIndex >= calendar.options.length) {
                  if (event.key === 'ArrowDown') {
                    setFocus(selectRef, null);
                  } else if (event.key === 'ArrowRight') {
                    changeMonth(1);
                  }
                } else {
                  const nextOption =
                    calendar.options[
                      Math.max(
                        Math.min(nextOptionIndex, calendar.options.length - 1),
                        0
                      )
                    ];
                  setFocus(selectRef, nextOption);
                }
              },
            }}
          />
        )}
      </CalendarConnector.Consumer>
    );
  }
}

class DateTimeInput extends Component {
  static displayName = 'DateTimeInput';

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    timeZone: PropTypes.string,
    isClearable: PropTypes.bool,
    isAutofocussed: PropTypes.bool,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    intl: PropTypes.shape({
      locale: PropTypes.string.isRequired,
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
    isDisabled: PropTypes.bool,
    hasWarning: PropTypes.bool,
    hasError: PropTypes.bool,
  };

  static defaultProps = {
    timeZone: 'UTC',
  };

  state = {
    prevValue: this.props.value,
    suggestedOptions: defaultOptions,
    month: do {
      const date = new Date(this.props.value);
      isValidDate(date) ? date : new Date();
    },
    openCount: 0,
    time: '',
  };

  static getDerivedStateFromProps(props, state) {
    if (state.prevValue === props.value) return null;

    return {
      prevValue: props.value,
      suggestedOptions: defaultOptions,
      month: do {
        const date = new Date(props.value);
        isValidDate(date) ? date : new Date();
      },
    };
  }

  handleChange = option => {
    // We close the calendar in case the user types "today" or "today at 3pm"
    // or "09/18/2018 at 2pm" and selectes the suggested option
    if (option?.display !== 'calendar') {
      this.setState({ openCount: 0 });
    } else {
      // set the time in case there is no time yet
      this.setState(prevState => ({
        time:
          prevState.time === ''
            ? moment()
                .tz(this.props.timeZone)
                .locale(this.props.intl.locale)
                .startOf('day')
                .format('LT')
            : prevState.time,
      }));
    }
    this.props.onChange(option ? option.value : '');
  };

  handleInputChange = (value, { action }) => {
    switch (action) {
      case 'menu-close': {
        const date = new Date(this.props.value);
        this.setState({ month: isValidDate(date) ? date : new Date() });
        break;
      }
      case 'set-value':
        // openCount needs to be 3 because onMenuClose runs twice
        // once naturally, and once because the select loses focus when the
        // input gets focused
        this.setState({ openCount: 3 }, () => {
          // Wait for setState so that timeInput has a chance to mount,
          // otherwise "current" will not be defined
          // When the user types "today" or a date and presses enter, then we
          // take that time and submit right away. The user does not get a
          // chance to enter a time. They should type "today at 4pm" if they
          // want to specify a time
          if (this.timeInputRef.current) {
            this.timeInputRef.current.focus();
            this.timeInputRef.current.setSelectionRange(
              0,
              this.state.time.length
            );
          }
        });
        break;
      case 'input-change': {
        if (!value) {
          this.setState({ suggestedOptions: defaultOptions });
          return;
        }

        const separators = this.props.intl
          .formatMessage(messages.dateTimeSeparators)
          .split('|');

        const [dateString, timeString] = splitDateTimeString(value, separators);

        // Attempt to parse dates in locale
        // This helps to avoid the mixup of month and day for US/other notations
        const date = do {
          const localeDate = moment.tz(
            dateString,
            moment.localeData(this.props.intl.locale).longDateFormat('L'),
            this.props.intl.locale,
            this.props.timeZone
          );

          if (localeDate.isValid()) localeDate;
          else
            suggestDate(
              dateString,
              this.props.intl.locale,
              {
                today: this.props.intl.formatMessage(messages.today),
                yesterday: this.props.intl.formatMessage(messages.yesterday),
                tomorrow: this.props.intl.formatMessage(messages.tomorrow),
              },
              this.props.timeZone
            );
        };

        const parsedTime = parseTime(timeString);
        if (parsedTime) {
          date
            .hours(parsedTime.hours)
            .minutes(parsedTime.minutes)
            .seconds(parsedTime.seconds)
            .milliseconds(parsedTime.milliseconds);
        }

        this.setState(prevState => ({
          month: date || prevState.month,
          suggestedOptions: date
            ? [createOptionForDate(date, this.props.timeZone, this.props.intl)]
            : [],
          time: parsedTime ? formatTime(date) : '',
          openCount: 1,
        }));
        break;
      }
      default:
        break;
    }
  };

  standardDateToOption = standardDate => {
    if (!standardDate) return null;

    const date = moment(standardDate, moment.ISO_8601)
      .tz(this.props.timeZone)
      .locale(this.props.intl.locale);
    return moment.isMoment(date) || isValidDate(date)
      ? createOptionForDate(date, this.props.timeZone, this.props.intl)
      : null;
  };

  selectRef = React.createRef();
  timeInputRef = React.createRef();

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div {...filterDataAttributes(this.props)}>
          <CalendarConnector.Provider
            value={{
              locale: this.props.intl.locale,
              month: this.state.month,
              setMonth: month => this.setState({ month }),
              keepMenuOpen: cb => this.setState({ openCount: 2 }, cb),
              closeMenu: () => this.setState({ openCount: 0 }),
              selectRef: this.selectRef,
              timeInputRef: this.timeInputRef,
              time: this.state.time,
              setTime: time => this.setState({ time }),
              onChange: this.props.onChange,
              timeZone: this.props.timeZone,
              hasError: this.props.hasError,
              hasWarning: this.props.hasWarning,
              openMenu: () => this.setState({ openCount: 1 }),
            }}
          >
            <Select
              ref={this.selectRef}
              inputId={this.props.id}
              name={this.props.name}
              styles={createDateSelectStyles({
                hasWarning: this.props.hasWarning,
                hasError: this.props.hasError,
              })}
              components={{
                Group,
                Option,
                MenuList,
                Menu,
                SelectContainer,
                // styling
                DropdownIndicator: CalendarDropdownIndicator,
                ClearIndicator,
              }}
              filterOption={null}
              isMulti={false}
              isOptionSelected={(option, value) =>
                value.some(i => i.date.isSame(option.date, 'day'))
              }
              maxMenuHeight={380}
              onChange={this.handleChange}
              onInputChange={this.handleInputChange}
              onFocus={this.props.onFocus}
              onBlur={this.props.onBlur}
              options={[
                ...this.state.suggestedOptions,
                createCalendarOptions(
                  this.state.month,
                  this.props.timeZone,
                  this.props.intl,
                  parseTime(this.state.time)
                ),
              ]}
              value={this.standardDateToOption(this.props.value)}
              isClearable={this.props.isClearable}
              autoFocus={this.props.isAutofocussed}
              menuIsOpen={this.state.openCount > 0}
              onMenuOpen={() => {
                this.setState(prevState => ({
                  openCount: prevState.openCount + 1,
                  time: this.props.value
                    ? formatTime(
                        moment
                          .tz(
                            this.props.value,
                            moment.ISO_8601,
                            this.props.timeZone
                          )
                          .locale(this.props.intl.locale)
                      )
                    : '',
                }));
              }}
              onMenuClose={() => {
                this.setState(prevState => ({
                  openCount: Math.max(prevState.openCount - 1, 0),
                }));
              }}
            />
          </CalendarConnector.Provider>
        </div>
      </Constraints.Horizontal>
    );
  }
}

export default injectIntl(DateTimeInput);
