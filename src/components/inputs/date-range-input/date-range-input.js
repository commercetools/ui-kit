// This component is based on the experimental Date Picker example
// https://react-select.com/advanced#experimental
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import memoizeOne from 'memoize-one';
import Select, { components as SelectComponents } from 'react-select';
import { suggestDate } from '../../../utils/suggest-date';
import Constraints from '../../constraints';
import ClearIndicator from '../../internals/clear-indicator';
import messages from './messages';
import styles from './date-range-input.mod.css';
import createSelectStyles from '../../internals/create-select-styles';
import { AngleLeftIcon, AngleRightIcon, CalendarIcon } from '../../icons';
import SecondaryIconButton from '../../buttons/secondary-icon-button';
import vars from '../../../../materials/custom-properties.json';

const rangeSeparator = ' - ';

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
      display: 'inline-block',
      width: '12%',
      margin: `0 1% ${vars['--spacing-8']} 1%`,
      textAlign: 'center',
      borderRadius: '4px',
      border: '1px solid transparent',
      fontWeight: state.today ? 'bold' : 'inherit',
      backgroundColor: do {
        if (state.selectionStart) vars['--color-green'];
        else if (state.selectionEnd) vars['--color-green'];
        else if (state.selected) vars['--color-gray-90'];
        else if (state.isFocused) vars['--token-background-color-input-hover'];
        else base.backgroundColor;
      },
      color: do {
        if (state.selectionStart || state.selectionEnd) vars['--color-white'];
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
        {({ selectRef, hasError, hasWarning, openMenu }) => (
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
              onClick={() => {
                selectRef.current.select.focus();
                openMenu();
              }}
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

// basically a dumb version of deepEquals which works with ranges only
const rangeEqual = (a, b) => {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  return a[0] === b[0] && a[1] === b[1];
};

const setFocus = (selectRef, option, cb) => {
  // eslint-disable-next-line no-param-reassign
  selectRef.current.select.scrollToFocusedOptionOnUpdate = true;
  selectRef.current.select.setState(
    {
      focusedOption: option,
      focusedValue: null,
    },
    cb
  );
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
    createDayLabel(
      moment.utc(standardDate, moment.ISO_8601).locale(intl.locale),
      intl
    );
  return range[0] === range[1]
    ? `${format(range[0])}`
    : `${format(range[0])}${rangeSeparator}${format(range[1])}`;
};

const isValidDate = date =>
  Boolean(date) && typeof date.getTime === 'function' && !isNaN(date.getTime());

const getMonthFromRange = value => {
  const today = moment.utc().startOf('day');
  if (value.length === 0) return today;
  const date = moment.utc(value[0]).startOf('day');
  return isValidDate(date) ? date : today;
};

const CalendarConnector = React.createContext();

const sort = dates =>
  moment(dates[0]).isBefore(dates[1], 'day') ? dates : [...dates].reverse();

const createOptionForDate = (day, intl) => {
  const date =
    moment.isMoment(day) && day.locale() === intl.locale
      ? day
      : moment.utc(day).locale(intl.locale);
  return {
    date,
    value: date.toISOString(),
    label: createDayLabel(date, intl),
  };
};

// memoized so that the options keep the same reference
// This is enables keeping the focused option even when the props change,
// as is the case when selectiong the first option of a range.
// If the memoization is removed, the focused option will jump to the first
// option after selecting the start of a range.
const createCalendarGroup = memoizeOne((day, intl) => {
  const daysInMonth = Array.from({
    length: moment.utc(day).daysInMonth(),
  }).map((_, i) => {
    const dayOfMonth = i + 1;
    const date = moment
      .utc(day)
      .locale(intl.locale)
      .date(dayOfMonth);
    return {
      ...createOptionForDate(date, intl),
      display: 'calendar',
    };
  });

  const label = moment
    .utc(day)
    .locale(intl.locale)
    .format('MMMM YYYY');

  // group for the calendar
  return { label, options: daysInMonth, display: 'calendarGroup' };
});

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

const Option = props => (
  <CalendarConnector.Consumer>
    {({ locale, range, rangeTarget, setRangeTarget }) => {
      if (props.data.display === 'calendar') {
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

        const start = selectionRange && moment.utc(selectionRange[0]);
        const end = selectionRange && moment.utc(selectionRange[1]);

        const isSelected =
          selectionRange &&
          moment.utc(props.value).isBetween(start, end, 'day', '[]');

        const isSelectionStart =
          selectionRange && moment.utc(props.value).isSame(start, 'day');
        const isSelectionEnd =
          selectionRange && moment.utc(props.value).isSame(end, 'day');

        const today = moment.utc().startOf('day');
        const optionStyles = props.getStyles('option', {
          ...props,
          selectionStart: isSelectionStart,
          selected: isSelected,
          selectionEnd: isSelectionEnd,
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

// This component is used so that we can enhance the keyboard navigation
class SelectContainer extends Component {
  static displayName = 'SelectContainer';
  render() {
    return (
      <CalendarConnector.Consumer>
        {({ selectRef, range, setRangeTarget }) => (
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
                  setFocus(selectRef, nextOption, () => {
                    if (range.length === 1) setRangeTarget(nextOption.value);
                  });
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
    isDisabled: PropTypes.bool,
    hasWarning: PropTypes.bool,
    hasError: PropTypes.bool,
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
        this.setState(
          prevState => ({
            openCount:
              prevState.range.length === 0 || prevState.range.length === 2
                ? // Sets openCount to 2 to prevent the menu from closing
                  // after the selection has been made.
                  2
                : prevState.openCount,
          }),
          () => {
            // Ensure that state in react-select reflects the state we pass in.
            // Otherwise the selectRef.current.state.menuIsOpen check in
            // SelectContainer will fail as menuIsOpen would be false, even
            // though the menu is still open
            this.selectRef.current.setState({
              menuIsOpen: this.state.openCount > 0,
            });
          }
        );
        break;
      }
      case 'input-change': {
        if (!value) {
          this.setState({ suggestedOptions: defaultOptions });
          return;
        }

        const [rangeStart, rangeEnd] = value
          .split(rangeSeparator)
          .filter(str => typeof str === 'string')
          .map(str => str.trim());

        const hasRange = rangeStart && rangeEnd;

        if (!hasRange) {
          // Attempt to parse dates in locale before falling back to chrono
          // This helps to avoid the mixup of month and day for US/other notations
          const date = do {
            const localeDate = moment.utc(
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
          const rangeStartDate = this.suggest(rangeStart);
          const rangeEndDate = this.suggest(rangeEnd);
          if (rangeStartDate?.isValid() && rangeEndDate?.isValid()) {
            this.setState({
              suggestedOptions: [
                this.rangeToOption([
                  rangeStartDate.toISOString(),
                  rangeEndDate.toISOString(),
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

    const start = moment.utc(range[0], moment.ISO_8601, true).toDate();
    const end = moment.utc(range[1], moment.ISO_8601, true).toDate();
    return isValidDate(start) && isValidDate(end)
      ? {
          label: createRangeLabel(range, this.props.intl),
          value: range,
        }
      : null;
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
            range: this.state.range,
            rangeTarget: this.state.rangeTarget,
            setRangeTarget: rangeTarget => this.setState({ rangeTarget }),
            selectRef: this.selectRef,
            hasError: this.props.hasError,
            hasWarning: this.props.hasWarning,
            openMenu: () =>
              this.setState(prevState => ({
                openCount: prevState.openCount + 1,
              })),
          }}
        >
          <Select
            ref={this.selectRef}
            id={this.props.id}
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
