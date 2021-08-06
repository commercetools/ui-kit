import { useState, useRef, useCallback } from 'react';
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
  getIsDateInRange,
  getNextDay,
  getPreviousDay,
  getDaysInMonth,
  CalendarBody,
  CalendarMenu,
  CalendarHeader,
  CalendarContent,
  CalendarDay,
} from '@commercetools-uikit/calendar-utils';
import messages from './messages';

const preventDownshiftDefault = (event) => {
  // eslint-disable-next-line no-param-reassign
  event.nativeEvent.preventDownshiftDefault = true;
};

const DateInput = (props) => {
  const intl = useIntl();
  const [calendarDate, setCalendarDate] = useState(props.value || getToday());
  const [suggestedItems, setSuggestedItems] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(
    props.value === '' ? null : getDateInMonth(props.value) - 1
  );
  const inputRef = useRef();

  const { onChange } = props;
  const emit = useCallback(
    (value) =>
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

  const handleChange = useCallback(
    (date) => {
      inputRef.current.setSelectionRange(0, 100);
      emit(date);
    },
    [inputRef, emit]
  );

  const { onBlur } = props;
  const handleBlur = useCallback(() => {
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

  const jumpMonth = (amount, dayToHighlight = 0) => {
    const nextDate = changeMonth(calendarDate, amount);
    setCalendarDate(nextDate);
    setHighlightedIndex(dayToHighlight);
  };

  return (
    <Constraints.Horizontal max={props.horizontalConstraint}>
      <Downshift
        key={intl.locale}
        inputId={props.id}
        itemToString={createItemToString(intl.locale)}
        selectedItem={props.value === '' ? null : props.value}
        highlightedIndex={highlightedIndex}
        onChange={handleChange}
        onStateChange={(changes) => {
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
                if (getIsDateInRange(date, props.minValue, props.maxValue)) {
                  setHighlightedIndex(getDateInMonth(date) - 1);
                }
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
                  // Unset the aria-labelledby as it interfers with the link
                  // between the <label for> and the <input id>.
                  'aria-labelledby': undefined,
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
                  onKeyDown: (event) => {
                    if (props.isReadOnly) {
                      preventDownshiftDefault(event);
                      return;
                    }
                    if (event.key === 'Enter' && inputValue.trim() === '') {
                      clearSelection();
                    }
                    // ArrowDown
                    if (event.keyCode === 40) {
                      const nextDayToHighlight = getNextDay(
                        calendarItems[highlightedIndex]
                      );
                      if (
                        !getIsDateInRange(
                          nextDayToHighlight,
                          props.minValue,
                          props.maxValue
                        )
                      ) {
                        // if the date to highlight is disabled
                        // then do nothing
                        preventDownshiftDefault(event);
                        return;
                      }
                      if (highlightedIndex + 1 >= calendarItems.length) {
                        // if it's the end of the month
                        // then bypass normal arrow navigation
                        preventDownshiftDefault(event);
                        // then jump to start of next month
                        jumpMonth(1, 0);
                      }
                    }
                    // ArrowUp
                    if (event.keyCode === 38) {
                      const previousDay = getPreviousDay(
                        calendarItems[highlightedIndex]
                      );
                      if (
                        !getIsDateInRange(
                          previousDay,
                          props.minValue,
                          props.maxValue
                        )
                      ) {
                        // if the date to highlight is disabled
                        // then do nothing
                        preventDownshiftDefault(event);
                        return;
                      }
                      if (highlightedIndex <= 0) {
                        // if it's the start of the month
                        // then bypass normal arrow navigation
                        preventDownshiftDefault(event);

                        const numberOfDaysOfPrevMonth =
                          getDaysInMonth(previousDay);
                        // then jump to the last day of the previous month
                        jumpMonth(-1, numberOfDaysOfPrevMonth - 1);
                      }
                    }
                  },
                  // we only do this for readOnly because the input
                  // doesn't ignore these events, unlike when its disabled
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
                    {weekdays.map((weekday) => (
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
                          disabled: !getIsDateInRange(
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

DateInput.isEmpty = (value) => value === '';

DateInput.propTypes = {
  /**
   * Horizontal size limit of the input field.
   */
  horizontalConstraint: PropTypes.oneOf([
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    'scale',
    'auto',
  ]),
  /**
   * The selected date, must either be an empty string or a date formatted as "YYYY-MM-DD".
   */
  value: PropTypes.string.isRequired,
  /**
   * Called when the date changes. Called with an event containing either an empty string (no value) or a string in this format: "YYYY-MM-DD".
   * <br />
   * Signature: `(event) => void`
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Called when the date input gains focus.
   */
  onFocus: PropTypes.func,
  /**
   * Called when the date input loses focus.
   */
  onBlur: PropTypes.func,
  /**
   * Used as the HTML `id` attribute.
   */
  id: PropTypes.string,
  /**
   * Used as the HTML `name` attribute.
   */
  name: PropTypes.string,
  /**
   * Placeholder value to show in the input field
   */
  placeholder: PropTypes.string,
  /**
   * Disables the date picker
   */
  isDisabled: PropTypes.bool,
  /**
   * Disables the date picker menu and makes input field read-only
   */
  isReadOnly: PropTypes.bool,
  /**
   * Indicates the input field has an error
   */
  hasError: PropTypes.bool,
  /**
   * Indicates the input field has a warning
   */
  hasWarning: PropTypes.bool,
  /**
   * A minimum selectable date. Must either be an empty string or a date formatted as "YYYY-MM-DD".
   */
  minValue: PropTypes.string,
  /**
   * A maximum selectable date. Must either be an empty string or a date formatted as "YYYY-MM-DD".
   */
  maxValue: PropTypes.string,
};

export default DateInput;
