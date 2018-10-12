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
import styles from './date-range-input.mod.css';

// TODO
// - allow navigation with arrow keys (allow going up/down)

const rangeSeparator = ' - ';

// basically a dumb version of deepEquals which works with ranges only
const rangeEqual = (a, b) => {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  return a[0] === b[0] && a[1] === b[1];
};

const createDayLabel = (date, intl) =>
  date.calendar(null, {
    sameDay: intl.formatMessage(messages.sameDay),
    nextDay: intl.formatMessage(messages.nextDay),
    nextWeek: intl.formatMessage(messages.nextWeek),
    lastDay: intl.formatMessage(messages.lastDay),
    lastWeek: intl.formatMessage(messages.lastWeek),
    sameElse: intl.formatMessage(messages.sameElse),
  });

const createRangeLabel = (range, intl) => {
  const format = standardDate =>
    createDayLabel(moment(standardDate).locale(intl.locale), intl);
  return range[0] === range[1]
    ? `${format(range[0])}`
    : `${format(range[0])}${rangeSeparator}${format(range[1])}`;
};

const isValidDate = date => Boolean(date) && !isNaN(date.getTime());

const getMonthFromRange = value => {
  const today = new Date();
  if (value.length === 0) return today;
  const date = new Date(value[0]);
  return isValidDate(date) ? date : new Date();
};

const CalendarConnector = React.createContext();

const sort = dates =>
  moment(dates[0]).isBefore(dates[1], 'day') ? dates : [...dates].reverse();

const createOptionForDate = (day, intl) => {
  const date =
    moment.isMoment(day) && day.locale() === intl.locale
      ? day
      : moment(day).locale(intl.locale);
  return {
    date,
    value: date.format('YYYY-MM-DD'),
    label: createDayLabel(date, intl),
  };
};

const createCalendarGroup = (day, intl) => {
  const daysInMonth = Array.from({ length: moment(day).daysInMonth() }).map(
    (_, i) => {
      const dayOfMonth = i + 1;
      const date = moment(day)
        .locale(intl.locale)
        .date(dayOfMonth);
      return {
        ...createOptionForDate(date, intl),
        display: 'calendar',
      };
    }
  );

  const label = moment(day)
    .locale(intl.locale)
    .format('MMMM YYYY');

  // group for the calendar
  return { label, options: daysInMonth };
};

const defaultOptions = [];

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
  margin: '1px 1%',
  textAlign: 'center',
  borderRadius: '4px',
  border: '1px solid transparent',
});

const Option = props => (
  <CalendarConnector.Consumer>
    {({ locale, range, rangeTarget, setRangeTarget }) => {
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

        // highlight range
        const selectionRange = (() => {
          switch (range.length) {
            case 1:
              return rangeTarget
                ? sort([range[0], rangeTarget])
                : // Simulate a one-day range when only one day has been
                  // selected so far so that we can check the match as
                  // a usual match
                  [range[0], range[0]];
            case 2:
              return range;
            // There is no selection, so there is no range
            case 0:
            default:
              return null;
          }
        })();

        const isSelected =
          selectionRange &&
          moment(props.value).isBetween(
            selectionRange[0],
            selectionRange[1],
            'day',
            '[]'
          );

        const isSelectionStart =
          selectionRange &&
          moment(props.value).isSame(selectionRange[0], 'day');
        const isSelectionEnd =
          selectionRange &&
          moment(props.value).isSame(selectionRange[1], 'day');

        if (isSelected && !props.isFocused) {
          optionStyles.backgroundColor = '#eee';
        }
        if (isSelectionStart) {
          optionStyles.borderLeft = '1px solid #9c9c9c';
          optionStyles.backgroundColor = 'rgb(222, 235, 255)';
        }
        if (isSelectionEnd) {
          optionStyles.borderRight = '1px solid #9c9c9c';
          optionStyles.backgroundColor = 'rgb(222, 235, 255)';
        }
        return (
          <span
            {...props.innerProps}
            style={optionStyles}
            ref={props.innerRef}
            onMouseOver={event => {
              if (range.length === 1) setRangeTarget(props.value);
              props.innerProps.onMouseOver(event);
            }}
          >
            {props.data.date.format('D')}
          </span>
        );
      }
      return <SelectComponents.Option {...props} />;
    }}
  </CalendarConnector.Consumer>
);
Option.displayName = 'Option';

class DateRangeInput extends Component {
  static displayName = 'DateRangeInput';

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.string),
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
    month: getMonthFromRange(this.props.value),
    range: [],
    rangeTarget: null,
    // As it doesn't seem possible to prevent the menu from closing in the
    // input handler, we manually keep track of the state in the parent.
    // 0 means the input is closed, all numbers > 0 mean that it is open.
    // We set the openCount to 2 to prevent it from auto-closen after the first
    // date of the range is selected.
    openCount: 0,
  };

  static getDerivedStateFromProps(props, state) {
    if (rangeEqual(state.prevValue, props.value)) return null;

    return {
      prevValue: props.value,
      suggestedOptions: defaultOptions,
      month: getMonthFromRange(props.value),
      range: props.value.length === 0 ? props.value : state.range,
      rangeTarget: props.value.length === 0 ? null : state.rangeTarget,
    };
  }

  // Allow users to type things like "january" or "monday" and turn it into
  // a date as a suggestion.
  // Respects locales when making the suggestions.
  // Translations for locales are taken from moment data and from
  // our own translations.
  // eslint-disable-next-line arrow-body-style
  suggest = rawWord =>
    suggestDate(rawWord, this.props.intl.locale, {
      today: this.props.intl.formatMessage(messages.today),
      yesterday: this.props.intl.formatMessage(messages.yesterday),
      tomorrow: this.props.intl.formatMessage(messages.tomorrow),
    });

  handleChange = option => {
    // user cleared the value
    if (!option) {
      this.setState({ range: [], rangeTarget: null }, () => {
        this.props.onChange([]);
      });
      return;
    }
    // user selected a range
    if (Array.isArray(option.value)) {
      // close menu when range is selected
      this.setState(
        { range: option.value, rangeTarget: null, openCount: 0 },
        () => {
          this.props.onChange(option.value || []);
        }
      );
      return;
    }
    // user selected a single day
    if (typeof option.value === 'string') {
      this.setState(
        prevState => {
          switch (prevState.range.length) {
            case 1: {
              // sort range so that earlier date is always first
              const sortedRange = sort([prevState.range[0], option.value]);
              return {
                range: sortedRange,
                rangeTarget: null,
              };
            }
            case 0:
            case 2:
              return { range: [option.value] };
            default:
              throw new Error(
                `DateRangePicker: Unexpected range ${prevState.range.toString()}`
              );
          }
        },
        () => {
          if (this.state.range.length === 2) {
            this.props.onChange(this.state.range);
          }
        }
      );
      return;
    }
    throw new Error(`DateRangePicker: Unexpected value ${option.value}`);
  };

  handleInputChange = (value, { action }) => {
    switch (action) {
      case 'set-value': {
        this.setState(prevState => ({
          openCount:
            prevState.range.length === 0 || prevState.range.length === 2
              ? // Sets openCount to 2 to prevent the menu from closing
                // after the selection has been made.
                2
              : prevState.openCount,
        }));
        break;
      }
      case 'input-change': {
        if (!value) {
          this.setState({ suggestedOptions: defaultOptions });
          return;
        }

        const hasSeparator = value.includes(rangeSeparator);

        if (!hasSeparator) {
          // Attempt to parse dates in locale before falling back to chrono
          // This helps to avoid the mixup of month and day for US/other notations
          const date = do {
            const localeDate = moment(
              value,
              moment.localeData(this.props.intl.locale).longDateFormat('L'),
              this.props.intl.locale
            );

            if (localeDate.isValid()) localeDate;
            else this.suggest(value);
          };
          this.setState(prevState => ({
            month: date || prevState.month,
            suggestedOptions: date
              ? [createOptionForDate(date, this.props.intl)]
              : [],
          }));
        } else {
          const [rangeStart, rangeEnd] = value
            .split(rangeSeparator)
            .map(str => str.trim());

          const rangeStartDate = this.suggest(rangeStart);
          const rangeEndDate = this.suggest(rangeEnd);
          if (rangeStartDate?.isValid() && rangeEndDate?.isValid()) {
            this.setState({
              suggestedOptions: [
                this.rangeToOption([
                  rangeStartDate.format('YYYY-MM-DD'),
                  rangeEndDate.format('YYYY-MM-DD'),
                ]),
              ],
            });
          }
        }

        break;
      }
      default:
        break;
    }
  };

  // This function needs to return null instead of undefined, otherwise
  // react-select will not remove the selected value
  rangeToOption = range => {
    if (!range || range.length !== 2) return null;

    const start = new Date(range[0]);
    const end = new Date(range[1]);
    return isValidDate(start) && isValidDate(end)
      ? {
          label: createRangeLabel(range, this.props.intl),
          value: range,
        }
      : null;
  };

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <CalendarConnector.Provider
          value={{
            locale: this.props.intl.locale,
            month: this.state.month,
            setMonth: month => this.setState({ month }),
            range: this.state.range,
            rangeTarget: this.state.rangeTarget,
            setRangeTarget: rangeTarget => this.setState({ rangeTarget }),
          }}
        >
          <Select
            id={this.props.id}
            name={this.props.name}
            components={{ Group, Option }}
            filterOption={null}
            isMulti={false}
            maxMenuHeight={380}
            onChange={this.handleChange}
            onInputChange={this.handleInputChange}
            options={[
              ...this.state.suggestedOptions,
              createCalendarGroup(this.state.month, this.props.intl),
            ]}
            value={this.rangeToOption(this.props.value)}
            isClearable={this.props.isClearable}
            autoFocus={this.props.isAutofocussed}
            menuIsOpen={this.state.openCount > 0}
            onBlur={() => {
              this.setState({ range: [], rangeTarget: null });
              // reset input when range selection is aborted by closing,
              // also remove any value in case there was one
              if (!rangeEqual(this.props.value, this.state.range)) {
                if (this.props.value.length !== 0) this.props.onChange([]);
              }
            }}
            onMenuOpen={() => {
              this.setState(prevState => ({
                openCount: prevState.openCount + 1,
                range: this.props.value.length === 2 ? this.props.value : [],
                rangeTarget: null,
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

export default injectIntl(DateRangeInput);
