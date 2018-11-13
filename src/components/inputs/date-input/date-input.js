// WARNING
//
// This component relies on the internals of react-select, as it accesses
// instance methods! Be careful when upgrading react-select and ensure this
// component keeps working!
//
// Ultimately, this component should be rewritten without react-select, maybe
// with downshift.

// NOTE
// date-input, date-range-input and date-time-input are all based on
// react-select and behave pretty similar. If you make a change to this
// component, you probably also want to update the other two compnoents!

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
import styles from './date-input.mod.css';
import ClearIndicator from '../../internals/clear-indicator';
import CalendarDropdownIndicator from '../../internals/calendar-dropdown-indicator';
import createDateSelectStyles from '../../internals/create-date-select-styles';
import { AngleLeftIcon, AngleRightIcon } from '../../icons';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import createWeekDays from '../../../utils/create-week-days';
import SecondaryIconButton from '../../buttons/secondary-icon-button';

const CalendarConnector = React.createContext();

const isValidDate = date => Boolean(date) && !isNaN(date.getTime());

const createOptionForDate = (day, intl) => {
  const date =
    moment.isMoment(day) && day.locale() === intl.locale
      ? day
      : moment(day).locale(intl.locale);
  return {
    date,
    value: date.format('YYYY-MM-DD'),
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
  return { label, options: daysInMonth, display: 'calendarGroup' };
};

const setFocus = (selectRef, option) => {
  // eslint-disable-next-line no-param-reassign
  selectRef.current.select.scrollToFocusedOptionOnUpdate = true;
  selectRef.current.select.setState({
    focusedOption: option,
    focusedValue: null,
  });
};

const defaultOptions = [];

const Group = injectIntl(props => {
  const Heading = props.Heading;
  return (
    <CalendarConnector.Consumer>
      {({ month, setMonth, locale }) => {
        const days = createWeekDays(locale);
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
              // Let react-select handle the keyDown event unless the menu
              // is already open. When the menu is open, we want enhance
              // the UX by customizing the keyboard usage.
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

                // Allow the user to navigate up/down the calendar using the
                // arrow keys by jumping for 7 days instead of one.
                // Jumping for 7 days effectively moves the day highlight one
                // week up/down.
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

class DateInput extends Component {
  static displayName = 'DateInput';

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
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

  state = {
    prevValue: this.props.value,
    suggestedOptions: defaultOptions,
    month: do {
      const date = new Date(this.props.value);
      isValidDate(date) ? date : new Date();
    },
    isMenuOpen: false,
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
    if (!standardDate) return undefined;

    const date = new Date(standardDate);
    return isValidDate(date)
      ? createOptionForDate(date, this.props.intl)
      : undefined;
  };

  selectRef = React.createRef();

  render() {
    return (
      <Constraints.Horizontal constraint={this.props.horizontalConstraint}>
        <div {...filterDataAttributes(this.props)}>
          <CalendarConnector.Provider
            value={{
              locale: this.props.intl.locale,
              month: this.state.month,
              setMonth: month => this.setState({ month }),
              selectRef: this.selectRef,
              hasError: this.props.hasError,
              hasWarning: this.props.hasWarning,
              openMenu: () => this.setState({ isMenuOpen: true }),
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
                createCalendarOptions(this.state.month, this.props.intl),
              ]}
              value={this.standardDateToOption(this.props.value)}
              isClearable={this.props.isClearable}
              isDisabled={this.props.isDisabled}
              autoFocus={this.props.isAutofocussed}
              menuIsOpen={this.state.isMenuOpen}
              onMenuOpen={() => this.setState({ isMenuOpen: true })}
              onMenuClose={() => this.setState({ isMenuOpen: false })}
            />
          </CalendarConnector.Provider>
        </div>
      </Constraints.Horizontal>
    );
  }
}

export default injectIntl(DateInput);
