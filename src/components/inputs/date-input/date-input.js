import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { useIntl } from 'react-intl';
import Constraints from '@commercetools-uikit/constraints';
import { filterDataAttributes } from '@commercetools-uikit/utils';
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
  isDateInRange,
} from '@commercetools-uikit/calendar-utils';
import CalendarBody from '../../internals/calendar-body';
import CalendarMenu from '../../internals/calendar-menu';
import CalendarHeader from '../../internals/calendar-header';
import CalendarContent from '../../internals/calendar-content';
import CalendarDay from '../../internals/calendar-day';
import messages from './messages';

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

  const { onChange } = props;
  const emit = React.useCallback(
    value =>
      onChange({
        target: {
          id: props.id,
          name: props.name,
          // when cleared the value is null, but we always want it to be an
          // empty string when there is no value.
          value: value || '',
        },
      }),
    [onChange, props.id, props.name]
  );

  const handleChange = React.useCallback(
    date => {
      inputRef.current.setSelectionRange(0, 100);
      emit(date);
    },
    [inputRef, emit]
  );

  const { onBlur } = props;
  const handleBlur = React.useCallback(() => {
    if (onBlur)
      onBlur({
        target: {
          id: props.id,
          name: props.name,
        },
      });
  }, [onBlur, props.id, props.name]);

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
                  // we only do this for readOnly because the input
                  // doesn't ignore these events, unlike when its disabled
                  onFocus: props.isReadOnly ? undefined : openMenu,
                  onClick: props.isReadOnly ? undefined : openMenu,
                  ...filterDataAttributes(props),
                })}
                hasSelection={Boolean(selectedItem)}
                onClear={clearSelection}
                isOpen={isOpen}
                isDisabled={props.isDisabled}
                isReadOnly={props.isReadOnly}
                toggleButtonProps={getToggleButtonProps()}
                hasError={props.hasError}
                hasWarning={props.hasWarning}
              />
              {isOpen && !props.isDisabled && !props.isReadOnly && (
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
                          disabled: !isDateInRange(
                            item,
                            props.minValue,
                            props.maxValue
                          ),
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
  isReadOnly: PropTypes.bool,
  hasError: PropTypes.bool,
  hasWarning: PropTypes.bool,
  minValue: PropTypes.string,
  maxValue: PropTypes.string,
};

export default DateInput;
