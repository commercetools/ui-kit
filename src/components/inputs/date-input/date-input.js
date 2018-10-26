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
import createSelectStyles from '../../internals/create-select-styles';
import { AngleLeftIcon, AngleRightIcon, CalendarIcon } from '../../icons';
import SecondaryIconButton from '../../buttons/secondary-icon-button';
import vars from '../../../../materials/custom-properties.json';

const createDateInputStyles = ({ hasWarning, hasError }) => {
  const selectStyles = createSelectStyles({ hasWarning, hasError });
  return {
    ...selectStyles,
    control: (base, state) => ({
      ...selectStyles.control(base, state),
      flex: 1,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    }),
    option: (base, state) => ({
      ...selectStyles.option(base, state),
      backgroundColor: do {
        if (state.isSelected) vars['--color-green'];
        else if (state.isFocused) vars['--token-background-color-input-hover'];
        else base.backgroundColor;
      },
      color: do {
        if (state.isSelected) vars['--color-white'];
        else vars['--token-font-color-default'];
      },
    }),
    groupHeading: (base, state) => ({
      ...selectStyles.groupHeading(base, state),
      padding: 0,
    }),
    clearIndicator: base => ({
      ...base,
      marginTop: '3px',
      padding: 0,
    }),
  };
};

class Control extends React.Component {
  static displayName = 'Control';
  render() {
    return (
      <CalendarConnector.Consumer>
        {({ selectRef, hasError, hasWarning }) => (
          <div className={styles.controlContainer}>
            <SelectComponents.Control {...this.props} />
            <div
              className={do {
                if (this.props.isDisabled) styles.controlCalendarDisabled;
                else if (hasError) styles.controlCalendarError;
                else if (hasWarning) styles.controlCalendarWarning;
                else if (this.props.isFocused) styles.controlCalendarFocused;
                else styles.controlCalendar;
              }}
              onClick={() => selectRef.current.select.focus()}
            >
              <CalendarIcon
                size="big"
                theme={this.props.isDisabled ? 'grey' : 'black'}
              />
            </div>
          </div>
        )}
      </CalendarConnector.Consumer>
    );
  }
}

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

const getOptionStyles = defaultStyles => ({
  ...defaultStyles,
  display: 'inline-block',
  width: '12%',
  margin: `0 1% ${vars['--spacing-4']} 1%`,
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

// This component is used so that we can enhance the keyboard navigation
class SelectContainer extends Component {
  static displayName = 'SelectContainer';
  render() {
    return (
      <CalendarConnector.Consumer>
        {({ selectRef }) => (
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

                if (nextOptionIndex !== null) {
                  const nextOption =
                    calendar.options[
                      Math.max(
                        Math.min(nextOptionIndex, calendar.options.length - 1),
                        0
                      )
                    ];
                  setFocus(selectRef, nextOption);
                } else {
                  this.props.innerProps.onKeyDown(event);
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
        <CalendarConnector.Provider
          value={{
            locale: this.props.intl.locale,
            month: this.state.month,
            setMonth: month => this.setState({ month }),
            selectRef: this.selectRef,
            hasError: this.props.hasError,
            hasWarning: this.props.hasWarning,
          }}
        >
          <Select
            ref={this.selectRef}
            inputId={this.props.id}
            name={this.props.name}
            styles={createDateInputStyles({
              hasWarning: this.props.hasWarning,
              hasError: this.props.hasError,
            })}
            components={{
              Group,
              Option,
              SelectContainer,
              // styling
              Control,
              DropdownIndicator: () => null,
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
            options={[
              ...this.state.suggestedOptions,
              createCalendarOptions(this.state.month, this.props.intl),
            ]}
            value={this.standardDateToOption(this.props.value)}
            isClearable={this.props.isClearable}
            isDisabled={this.props.isDisabled}
            autoFocus={this.props.isAutofocussed}
            // The only reason to have this is so that clicking
            // the CalendarIcon in Control can open the menu using
            // selectRef.current.select.focus()
            openMenuOnFocus={true}
          />
        </CalendarConnector.Provider>
      </Constraints.Horizontal>
    );
  }
}

export default injectIntl(DateInput);
