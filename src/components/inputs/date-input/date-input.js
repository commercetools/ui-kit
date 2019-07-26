import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { useIntl } from 'react-intl';
import CalendarBody from '../../internals/calendar-body';
import CalendarMenu from '../../internals/calendar-menu';
import CalendarHeader from '../../internals/calendar-header';
import CalendarContent from '../../internals/calendar-content';
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

const DateInput = props => {
  const intl = useIntl();
  const [calendarDate, setCalendarDate] = React.useState(
    props.value || getToday()
  );
  const [suggestedItems, setSuggestedItems] = React.useState([]);
  const [highlightedIndex, setHighlightedIndex] = React.useState(
    props.value === '' ? null : getDateInMonth(props.value) - 1
  );
  const inputRef = React.useRef();

  const emit = React.useCallback(
    value =>
      props.onChange({
        target: {
          id: props.id,
          name: props.name,
          // when cleared the value is null, but we always want it to be an
          // empty string when there is no value.
          value: value || '',
        },
      }),
    [props.id, props.name]
  );

  const handleChange = React.useCallback(
    date => {
      inputRef.current.setSelectionRange(0, 100);
      emit(date);
    },
    [inputRef]
  );

  const handleBlur = React.useCallback(() => {
    if (props.onBlur)
      props.onBlur({
        target: {
          id: props.id,
          name: props.name,
        },
      });
  }, [props.id, props.name]);

  const showToday = () => {
    const today = getToday();
    setCalendarDate(today);
    setHighlightedIndex(suggestedItems.length + getDateInMonth(today) - 1);
    inputRef.current.focus();
  };

  const jumpMonth = amount => {
    const nextDate = changeMonth(calendarDate, amount);
    setCalendarDate(nextDate);
    setHighlightedIndex(0);
  };

  return (
    <Constraints.Horizontal constraint={props.horizontalConstraint}>
      <Downshift
        key={intl.locale}
        inputId={props.id}
        itemToString={createItemToString(intl.locale)}
        selectedItem={props.value === '' ? null : props.value}
        highlightedIndex={highlightedIndex}
        onChange={handleChange}
        onStateChange={changes => {
          /* eslint-disable no-prototype-builtins */
          if (changes.hasOwnProperty('inputValue')) {
            // input changed because user typed
            if (changes.type === Downshift.stateChangeTypes.changeInput) {
              const date = parseInputToDate(changes.inputValue, intl.locale);
              if (date === '') {
                setSuggestedItems([]);
                setHighlightedIndex(null);
              } else {
                setSuggestedItems([date]);
                setHighlightedIndex(getDateInMonth(date) - 1);
                setCalendarDate(date);
              }
            } else {
              // input changed because user selected a date
              setSuggestedItems([]);
              setHighlightedIndex(null);
            }
          }

          if (changes.hasOwnProperty('highlightedIndex')) {
            setHighlightedIndex(changes.highlightedIndex);
          }

          // ensure calendar always opens on selected item, or on current
          // month when there is no selected item
          if (changes.hasOwnProperty('isOpen') && changes.isOpen) {
            setCalendarDate(props.value === '' ? getToday() : props.value);
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

          highlightedIndex: downshiftHighlightedIndex,
          openMenu,
          setHighlightedIndex: setDownshiftHighlightedIndex,
          selectedItem,
          isOpen,
          inputValue,
        }) => {
          const calendarItems = createCalendarItems(calendarDate, intl);

          const paddingDayCount = getPaddingDayCount(calendarDate, intl.locale);
          const paddingDays = Array(paddingDayCount).fill();

          const weekdays = getWeekdayNames(intl.locale);
          const today = getToday();

          return (
            <div onFocus={props.onFocus} onBlur={handleBlur}>
              <CalendarBody
                inputRef={inputRef}
                inputProps={getInputProps({
                  name: props.name,
                  placeholder:
                    typeof props.placeholder === 'string'
                      ? props.placeholder
                      : intl.formatMessage(messages.placeholder),
                  disabled: props.isDisabled,
                  onMouseEnter: () => {
                    // we remove the highlight so that the user can use the
                    // arrow keys to move the cursor when hovering
                    if (isOpen) setDownshiftHighlightedIndex(null);
                  },
                  onKeyDown: event => {
                    if (event.key === 'Enter' && inputValue.trim() === '') {
                      clearSelection();
                    }
                  },
                  onFocus: openMenu,
                  onClick: openMenu,
                  ...filterDataAttributes(props),
                })}
                hasSelection={Boolean(selectedItem)}
                onClear={clearSelection}
                isOpen={isOpen}
                isDisabled={props.isDisabled}
                toggleButtonProps={getToggleButtonProps({
                  disabled: props.isDisabled,
                })}
                hasError={props.hasError}
                hasWarning={props.hasWarning}
              />
              {isOpen && !props.isDisabled && (
                <CalendarMenu
                  {...getMenuProps()}
                  hasError={props.hasError}
                  hasWarning={props.hasWarning}
                >
                  <CalendarHeader
                    monthLabel={getMonthCalendarLabel(
                      calendarDate,
                      intl.locale
                    )}
                    yearLabel={getYearCalendarLabel(calendarDate, intl.locale)}
                    onPrevMonthClick={() => jumpMonth(-1)}
                    onTodayClick={showToday}
                    onNextMonthClick={() => jumpMonth(1)}
                    onPrevYearClick={() => jumpMonth(-12)}
                    onNextYearClick={() => jumpMonth(12)}
                  />
                  <CalendarContent>
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
                          disabled: props.isDisabled,
                          item,
                          onMouseOut: () => {
                            setDownshiftHighlightedIndex(null);
                          },
                        })}
                        isHighlighted={index === downshiftHighlightedIndex}
                        isSelected={isSameDay(item, props.value)}
                      >
                        {getCalendarDayLabel(item)}
                      </CalendarDay>
                    ))}
                  </CalendarContent>
                </CalendarMenu>
              )}
            </div>
          );
        }}
      </Downshift>
    </Constraints.Horizontal>
  );
};

DateInput.displayName = 'DateInput';

DateInput.isEmpty = value => value === '';

DateInput.propTypes = {
  horizontalConstraint: PropTypes.oneOf(['m', 'l', 'xl', 'scale']),
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

export default DateInput;
