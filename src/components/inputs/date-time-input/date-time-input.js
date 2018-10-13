// This component is based on the experimental Date Picker example
// https://react-select.com/advanced#experimental
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import Select, { components as SelectComponents } from 'react-select';
import { suggestDate } from '../../../utils/suggest-date';
import Constraints from '../../constraints';
import messages from './messages';
import styles from './date-time-input.mod.css';

// TODO build rightbad into parseTime, as there is a bug in parseTime right now.
// Bug: When parseTime is called with 00:00:00.75 it will return
//   milliseconds: 75 instead of milliseconds: 750!
// rightPad fixes this "accidentally" in TimeInput, but parseTime should
// do the right thing. So we should add rightPad into parseTime
const rightPad = (value, length = 3) => String(value).padEnd(length, '0');

// TODO
// - allow navigation with arrow keys (allow going up/down)

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
// Returns an array containing
//   [hours, minutes, seconds, milliseconds]
// or null
const parseTime = rawTime => {
  if (!rawTime || typeof rawTime !== 'string') return null;

  const time = rawTime.trim().toLowerCase();

  const match = time.match(
    /^(\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:\.(\d{1,3}))?)?)?\s*(am|pm)?$/
  );
  if (!match) return null;

  // As we accept eg "3 AM" there might not be a value for minutes, seconds or
  // milliseconds, so we default them
  const [
    ,
    hours,
    minutes = '00',
    seconds = '00',
    milliseconds = '000',
    amPm,
  ] = match;
  if (Number(minutes) > 59) return null;
  if (amPm && Number(hours) > 12) return null;
  if (!amPm && Number(hours) > 23) return null;
  if (Number(seconds) > 59) return null;
  if (Number(milliseconds) > 999) return null;

  return {
    hours: Number(hours) + (amPm === 'pm' ? 12 : 0),
    minutes: Number(minutes),
    seconds: Number(seconds),
    milliseconds: Number(rightPad(milliseconds)),
    hasSeconds: Number(seconds) !== 0 || Number(milliseconds) !== 0,
    hasMilliseconds: Number(milliseconds) !== 0,
    amPm,
  };
};

const CalendarConnector = React.createContext();

const isValidDate = date => Boolean(date) && !isNaN(date.getTime());

const createOptionForDate = (day, intl) => {
  const date = moment.utc(day).locale(intl.locale);
  // moment.isMoment(day) && day.locale() === intl.locale
  //   ? day
  //   : moment(day).locale(intl.locale);

  return {
    date,
    value: date.toISOString(),
    // label: date.toISOString(),
    label: date.calendar(null, {
      sameDay: intl.formatMessage(messages.sameDay),
      nextDay: intl.formatMessage(messages.nextDay),
      nextWeek: intl.formatMessage(messages.nextWeek),
      lastDay: intl.formatMessage(messages.lastDay),
      lastWeek: intl.formatMessage(messages.lastWeek),
      sameElse: intl.formatMessage(messages.sameElse),
    }),
  };
};

const createCalendarOptions = (day, intl) => {
  const daysInMonth = Array.from({ length: moment(day).daysInMonth() }).map(
    (_, i) => {
      const dayOfMonth = i + 1;
      const date = moment
        .utc(day)
        .hours(0)
        .minutes(0)
        .seconds(0)
        .milliseconds(0)
        .locale(intl.locale)
        .date(dayOfMonth);
      return {
        ...createOptionForDate(date, intl),
        display: 'calendar',
      };
    }
  );

  const groupLabel = moment
    .utc(day)
    .locale(intl.locale)
    .format('MMMM YYYY');

  // group for the calendar
  return { label: groupLabel, options: daysInMonth };
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
          placeholder={this.props.intl.formatMessage(
            messages.timePickerPlaceholder
          )}
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
                        .utc(value)
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
                <button
                  onClick={() => {
                    setMonth(
                      moment(month)
                        .subtract(1, 'month')
                        .toDate()
                    );
                  }}
                  className={styles.prevMonth}
                  type="button"
                >
                  {'❮'}
                </button>
                <div className={styles.month}>{props.label}</div>
                <button
                  onClick={() => {
                    setMonth(
                      moment(month)
                        .add(1, 'month')
                        .toDate()
                    );
                  }}
                  className={styles.nextMonth}
                  type="button"
                >
                  {'❯'}
                </button>
              </div>
            </Heading>
            <div className={styles.daysHeader}>
              {days.map(day => (
                <span key={day} className={styles.daysHeaderItem}>
                  {day}
                </span>
              ))}
            </div>
            <div className={styles.daysContainer}>{props.children}</div>
          </div>
        );
      }}
    </CalendarConnector.Consumer>
  );
});
Group.displayName = 'Group';

const getOptionStyles = defaultStyles => ({
  ...defaultStyles,
  display: 'inline-block',
  width: '12%',
  margin: '0 1%',
  textAlign: 'center',
  borderRadius: '4px',
});

const Option = props => (
  <CalendarConnector.Consumer>
    {({ locale }) => {
      if (props.data.display === 'calendar') {
        const defaultStyles = props.getStyles('option', props);
        const optionStyles = getOptionStyles(defaultStyles);
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
        // highlight today
        const today = new Date();
        if (props.data.date.isSame(today, 'day')) {
          optionStyles.fontWeight = 'bold';
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

class DateTimeInput extends Component {
  static displayName = 'DateTimeInput';

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    isClearable: PropTypes.bool,
    isAutofocussed: PropTypes.bool,
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    intl: PropTypes.shape({
      locale: PropTypes.string.isRequired,
      formatMessage: PropTypes.func.isRequired,
    }).isRequired,
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
        this.setState({ openCount: 3, time: '' }, () => {
          // wait for setState so that timeInput has a chance to mount,
          // otherwise "current" will not be defined
          this.timeInputRef.current.focus();
        });
        break;
      case 'input-change': {
        if (!value) {
          this.setState({ suggestedOptions: defaultOptions });
          return;
        }

        // Attempt to parse dates in locale before falling back to chrono
        // This helps to avoid the mixup of month and day for US/other notations
        const date = do {
          const localeDate = moment(
            value,
            moment.localeData(this.props.intl.locale).longDateFormat('L'),
            this.props.intl.locale
          );

          if (localeDate.isValid()) localeDate;
          else
            suggestDate(value, this.props.intl.locale, {
              today: this.props.intl.formatMessage(messages.today),
              yesterday: this.props.intl.formatMessage(messages.yesterday),
              tomorrow: this.props.intl.formatMessage(messages.tomorrow),
            });
        };
        this.setState(prevState => ({
          month: date || prevState.month,
          suggestedOptions: date
            ? [createOptionForDate(date, this.props.intl)]
            : [],
        }));
        break;
      }
      default:
        break;
    }
  };

  standardDateToOption = standardDate => {
    if (!standardDate) return null;

    const date = moment(standardDate, moment.ISO_8601).toDate();
    return isValidDate(date)
      ? createOptionForDate(date, this.props.intl)
      : null;
  };

  selectRef = React.createRef();
  timeInputRef = React.createRef();

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
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
          }}
        >
          <Select
            ref={this.selectRef}
            id={this.props.id}
            name={this.props.name}
            components={{ Group, Option, MenuList, Menu }}
            filterOption={null}
            isMulti={false}
            isOptionSelected={(option, value) =>
              value.some(i => i.date.isSame(option.date, 'day'))
            }
            maxMenuHeight={380}
            onChange={this.handleChange}
            onInputChange={this.handleInputChange}
            options={[
              ...this.state.suggestedOptions,
              createCalendarOptions(this.state.month, this.props.intl),
            ]}
            value={this.standardDateToOption(this.props.value)}
            isClearable={this.props.isClearable}
            autoFocus={this.props.isAutofocussed}
            menuIsOpen={this.state.openCount > 0}
            onMenuOpen={() => {
              this.setState(prevState => ({
                openCount: prevState.openCount + 1,
              }));
            }}
            onMenuClose={() => {
              this.setState(prevState => ({
                openCount: Math.max(prevState.openCount - 1, 0),
              }));
            }}
          />
        </CalendarConnector.Provider>
      </Constraints.Horizontal>
    );
  }
}

export default injectIntl(DateTimeInput);
