// This component is based on the experimental Date Picker example
// https://react-select.com/advanced#experimental
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import omit from 'lodash.omit';
import chrono from 'chrono-node';
import Select, { components as SelectComponents } from 'react-select';
import Constraints from '../../constraints';
import styles from './date-input.mod.css';

// TODO
// - allow navigation with arrow keys (allow going up/down)
// - enable typing "today", "tomorrow" (in locale)
// - show value as "10.08.2017 (Tomorrow)" (in locale)

const CalendarConnector = React.createContext();

const isValidDate = date => Boolean(date) && !isNaN(date.getTime());

const createOptionForDate = (day, locale) => {
  const date =
    moment.isMoment(day) && day.locale() === locale
      ? day
      : moment(day).locale(locale);
  return {
    date,
    value: date.format('YYYY-MM-DD'),
    label: date.calendar(null, {
      sameDay: 'Do MMM YYYY [(Today)]',
      nextDay: 'Do MMM YYYY [(Tomorrow)]',
      nextWeek: '[Next] dddd (Do MMM YYYY)',
      lastDay: 'Do MMM YYYY [(Yesterday)]',
      lastWeek: '[Last] dddd (Do MMM YYYY)',
      sameElse: 'Do MMMM YYYY',
    }),
  };
};

const createCalendarOptions = (day, locale) => {
  const daysInMonth = Array.from({ length: moment(day).daysInMonth() }).map(
    (_, i) => {
      const dayOfMonth = i + 1;
      const date = moment(day)
        .locale(locale)
        .date(dayOfMonth);
      return { ...createOptionForDate(date, locale), display: 'calendar' };
    }
  );

  const label = moment(day)
    .locale(locale)
    .format('MMMM YYYY');

  // group for the calendar
  return { label, options: daysInMonth };
};

const defaultOptions = [
  // ...['today', 'tomorrow', 'yesterday'].map(i =>
  //   createOptionForDate(chrono.parseDate(i))
  // ),
];

const suggestions = [
  'sunday',
  'saturday',
  'friday',
  'thursday',
  'wednesday',
  'tuesday',
  'monday',
  'december',
  'november',
  'october',
  'september',
  'august',
  'july',
  'june',
  'may',
  'april',
  'march',
  'february',
  'january',
  'yesterday',
  'tomorrow',
  'today',
].reduce((acc, str) => {
  for (let i = 1; i < str.length; i += 1) {
    acc[str.substr(0, i)] = str;
  }
  return acc;
}, {});

const suggest = str =>
  str
    .split(/\b/)
    .map(i => suggestions[i] || i)
    .join('');

const daysHeaderStyles = {
  marginTop: '5px',
  paddingTop: '5px',
  paddingLeft: '2%',
  borderTop: '1px solid #eee',
};
const daysHeaderItemStyles = {
  color: '#999',
  cursor: 'default',
  fontSize: '75%',
  fontWeight: '500',
  display: 'inline-block',
  width: '12%',
  margin: '0 1%',
  textAlign: 'center',
};
const daysContainerStyles = {
  paddingTop: '5px',
  paddingLeft: '2%',
};

const headingStyles = {
  display: 'inline-block',
};

const Group = props => {
  const Heading = props.Heading;
  return (
    <CalendarConnector.Consumer>
      {({ month, setMonth, locale }) => {
        // const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        const days = [...moment.localeData(locale).weekdaysMin()];
        const firstDayOfWeek = moment.localeData(locale).firstDayOfWeek();
        // Rearrange so that week starts at Su/Monday
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
              style={headingStyles}
              theme={props.theme}
              getStyles={props.getStyles}
              cx={props.cx}
              {...props.headingProps}
            >
              <button
                onClick={() => {
                  setMonth(
                    moment(month)
                      .subtract(1, 'month')
                      .toDate()
                  );
                }}
                className={styles.prevMonth}
              >
                {'❮'}
              </button>
              <button
                onClick={() => {
                  setMonth(
                    moment(month)
                      .add(1, 'month')
                      .toDate()
                  );
                }}
                className={styles.nextMonth}
              >
                {'❯'}
              </button>
              {props.label}
            </Heading>
            <button
              onClick={() => {
                const today = moment();
                props.selectOption(createOptionForDate(today, locale));
              }}
              className={styles.today}
            >
              Today
            </button>
            <div style={daysHeaderStyles}>
              {days.map((day, i) => (
                <span key={`${i}-${day}`} style={daysHeaderItemStyles}>
                  {day}
                </span>
              ))}
            </div>
            <div style={daysContainerStyles}>{props.children}</div>
          </div>
        );
      }}
    </CalendarConnector.Consumer>
  );
};
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

class DateInput extends Component {
  static displayName = 'DateInput';

  static propTypes = {
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
    intl: PropTypes.shape({
      formatDate: PropTypes.func,
    }).isRequired,
  };

  state = {
    prevValue: this.props.value,
    suggestedOptions: defaultOptions,
    month: do {
      const date = new Date(this.props.value);
      isValidDate(date) ? date : new Date();
    },
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
          else chrono.parseDate(suggest(value.toLowerCase()));
        };
        this.setState(prevState => ({
          month: date || prevState.month,
          suggestedOptions: date
            ? [createOptionForDate(date, this.props.intl.locale)]
            : [],
        }));
        break;
      }
      default:
        break;
    }
  };

  standardDateToOption = standardDate => {
    if (!standardDate) return undefined;

    const date = new Date(standardDate);
    return isValidDate(date)
      ? createOptionForDate(date, this.props.intl.locale)
      : undefined;
  };

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <CalendarConnector.Provider
          value={{
            locale: this.props.intl.locale,
            month: this.state.month,
            setMonth: month => this.setState({ month }),
          }}
        >
          <Select
            {...omit(this.props, ['horizontalConstraint'])}
            components={{ Group, Option }}
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
              createCalendarOptions(this.state.month, this.props.intl.locale),
            ]}
            value={this.standardDateToOption(this.props.value)}
            isClearable={this.props.isClearable}
          />
        </CalendarConnector.Provider>
      </Constraints.Horizontal>
    );
  }
}

export default injectIntl(DateInput);
