// This component is based on the experimental Date Picker example
// https://react-select.com/advanced#experimental
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import omit from 'lodash.omit';
import chrono from 'chrono-node';
import Select, { components as SelectComponents } from 'react-select';
import Constraints from '../../constraints';

const CalendarConnector = React.createContext();

const createOptionForDate = d => {
  const date = moment.isMoment(d) ? d : moment(d);
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

const createCalendarOptions = (day = new Date()) => {
  const daysInMonth = Array.from({ length: moment(day).daysInMonth() }).map(
    (_, i) => {
      const dayOfMonth = i + 1;
      const date = moment(day).date(dayOfMonth);
      return { ...createOptionForDate(date), display: 'calendar' };
    }
  );

  const label = moment(day).format('MMMM YYYY');

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

const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

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

const prevMonthStyles = {
  display: 'inline-block',
  margin: '0 10px',
};

const nextMonthStyles = {
  display: 'inline-block',
  margin: '0 10px',
  float: 'right',
};

const headingStyles = {
  display: 'inline-block',
};

const Group = props => {
  const Heading = props.Heading;
  return (
    <CalendarConnector.Consumer>
      {({ month, setMonth }) => (
        <div
          aria-label={props.label}
          style={props.getStyles('group', props)}
          {...props.innerProps}
        >
          <button
            onClick={() => {
              setMonth(
                moment(month)
                  .subtract(1, 'month')
                  .toDate()
              );
            }}
            style={prevMonthStyles}
          >
            prev
          </button>
          <Heading
            style={headingStyles}
            theme={props.theme}
            getStyles={props.getStyles}
            cx={props.cx}
            {...props.headingProps}
          >
            {props.label}
          </Heading>
          <button
            onClick={() => {
              setMonth(
                moment(month)
                  .add(1, 'month')
                  .toDate()
              );
            }}
            style={nextMonthStyles}
          >
            next
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
      )}
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

const Option = props => {
  if (props.data.display === 'calendar') {
    const defaultStyles = props.getStyles('option', props);
    const styles = getOptionStyles(defaultStyles);
    if (props.data.date.date() === 1) {
      const indentBy = props.data.date.day();
      if (indentBy) {
        styles.marginLeft = `${indentBy * 14 + 1}%`;
      }
    }
    return (
      <span {...props.innerProps} style={styles} ref={props.innerRef}>
        {props.data.date.format('D')}
      </span>
    );
  }
  return <SelectComponents.Option {...props} />;
};
Option.displayName = 'Option';

export default class DateInput extends Component {
  static displayName = 'DateInput';

  static propTypes = {
    horizontalConstraint: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl', 'scale']),
  };

  state = {
    suggestedOptions: defaultOptions,
    month: new Date(),
  };

  handleInputChange = value => {
    const today = new Date();
    if (!value) {
      this.setState({ suggestedOptions: defaultOptions, month: today });
      return;
    }
    const date = chrono.parseDate(suggest(value.toLowerCase()));

    this.setState({
      suggestedOptions: date ? [createOptionForDate(date)] : [],
      month: date || today,
    });
  };

  standardDateToOption = standardDate => {
    if (!standardDate) return undefined;

    const date = new Date(standardDate);
    return isNaN(date.getTime()) ? undefined : createOptionForDate(date);
  };

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <CalendarConnector.Provider
          value={{
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
            onChange={option => {
              this.props.onChange(option.value);
            }}
            onInputChange={this.handleInputChange}
            options={[
              ...this.state.suggestedOptions,
              createCalendarOptions(this.state.month),
            ]}
            value={this.standardDateToOption(this.props.value)}
            isClearable={this.props.isClearable}
          />
        </CalendarConnector.Provider>
      </Constraints.Horizontal>
    );
  }
}
