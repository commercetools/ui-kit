import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import styles from './date-calendar.mod.css';

const createCalendarItems = day =>
  Array.from({ length: moment(day).daysInMonth() }).map((_, i) => {
    const dayOfMonth = i + 1;
    const date = moment(day).date(dayOfMonth);
    return date;
  });

// eslint-disable-next-line arrow-body-style
const createSuggestedItems = inputValue => {
  if (inputValue.startsWith('t'))
    return [[moment().startOf('week'), moment().endOf('week')]];
  return [];
};

const parseRangeText = text => {
  // TODO parse more formats, but format them all to YYYY-MM-DD
  const isValid = str => /^\d{4}-\d{2}-\d{2}$/.test(str);
  const parts = text
    .split(' - ')
    .map(part => {
      const cleanedPart = part.trim().replace(' -', '');
      if (isValid(cleanedPart)) return cleanedPart;
      return null;
    })
    .filter(Boolean);
  return parts;
};

const preventDownshiftDefault = event => {
  // eslint-disable-next-line no-param-reassign
  event.nativeEvent.preventDownshiftDefault = true;
};

const createButtonKeyDownHandler = ref => event => {
  if (event.key === 'Enter') return;
  event.preventDefault();
  ref.current.focus();
};

const getRange = ({ item, value, startDate, highlightedItem }) => {
  const isRangeSelectionInProgress = startDate;
  const hasSelection = value.length === 2;
  const formattedItem = item.format('YYYY-MM-DD');
  const isStartDate = formattedItem === startDate;

  const isBetween =
    highlightedItem &&
    (item.isBetween(startDate, highlightedItem) ||
      item.isBetween(highlightedItem, startDate));

  const isRangeStart = do {
    if (isRangeSelectionInProgress) isStartDate;
    else if (hasSelection) value[0] === formattedItem;
    else false;
  };
  const isRangeBetween = do {
    if (isRangeSelectionInProgress) isBetween;
    else if (hasSelection) item.isBetween(value[0], value[1]);
    else false;
  };
  const isRangeEnd = do {
    if (isRangeSelectionInProgress)
      formattedItem === highlightedItem?.format('YYYY-MM-DD');
    else if (hasSelection) value[1] === formattedItem;
    else false;
  };

  return {
    isRangeStart,
    isRangeBetween,
    isRangeEnd,
  };
};

const createItemToString = (/* intl */) => item => {
  if (Array.isArray(item))
    return item.map(i => (i ? i.format('L') : '')).join(' ');
  return item ? moment(item).format('L') : '';
};

const createKeyDownHandler = ({
  isOpen,
  setHighlightedIndex,
  clearSelection,
  closeMenu,
  highlightedItemType,
  highlightedIndex,
  allItems,
  openMenu,
  inputValue,
  suggestedDates,
  showNextMonth,
  showPrevMonth,
  emit,
}) => event => {
  const preventCursorJump = () => {
    event.preventDefault();
  };

  // allow closing menu when pressing enter on empty input
  if (
    event.key === 'Enter' &&
    inputValue.trim() === '' &&
    highlightedIndex === null
  ) {
    preventDownshiftDefault(event);
    clearSelection();
    closeMenu();
    emit([]);
    return;
  }

  const arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

  if (highlightedItemType !== 'none') {
    // User presses arrow keys while something is highlighted,
    // so we want to prevent the cursor from jumping
    if (arrowKeys.includes(event.key)) preventCursorJump();
  }

  if (event.key === 'ArrowLeft') {
    if (highlightedItemType === 'none') return;
    preventDownshiftDefault(event);

    if (highlightedIndex === suggestedDates.length) {
      showPrevMonth();
    } else {
      setHighlightedIndex(
        do {
          if (highlightedIndex === 0) null;
          else Math.max(highlightedIndex - 1, 0);
        }
      );
    }
    return;
  }
  if (event.key === 'ArrowRight') {
    if (highlightedItemType === 'none') return;
    preventDownshiftDefault(event);
    if (highlightedIndex === allItems.length - 1) {
      showNextMonth();
    } else {
      setHighlightedIndex(Math.min(highlightedIndex + 1, allItems.length - 1));
    }
    return;
  }

  if (event.key === 'ArrowDown') {
    preventDownshiftDefault(event);

    // reopens menu after in cases user focues the input,
    // then selects a value (menu closes) and then presses
    // the down key
    if (!isOpen) openMenu();

    setHighlightedIndex(
      do {
        if (highlightedItemType === 'none') 0;
        else if (highlightedItemType === 'calendarItem')
          Math.min(highlightedIndex + 7, allItems.length - 1);
        else highlightedIndex + 1;
      }
    );
  }
  if (event.key === 'ArrowUp') {
    preventDownshiftDefault(event);
    setHighlightedIndex(
      do {
        if (highlightedIndex === 0) null;
        else if (highlightedIndex === null) null;
        else if (highlightedItemType === 'calendarItem')
          Math.max(
            highlightedIndex - 7,
            Math.max(suggestedDates.length - 1, 0)
          );
        else highlightedIndex - 1;
      }
    );
  }
};

class DateRangeCalendar extends React.Component {
  static displayName = 'DateRangeCalendar';
  static propTypes = {
    intl: PropTypes.shape({
      locale: PropTypes.string.isRequired,
    }).isRequired,
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
  };
  inputRef = React.createRef();
  state = {
    calendarDate: moment(),
    suggestedDates: [],
    startDate: null,
    highlightedIndex: null,
    isOpen: false,
    inputValue:
      this.props.value.length === 2
        ? `${this.props.value[0]} - ${this.props.value[1]}`
        : '',
  };
  showPrevMonth = () => {
    this.setState(prevState => ({
      calendarDate: prevState.calendarDate.clone().subtract(1, 'month'),
      // select first day in next month
      highlightedIndex: prevState.suggestedDates.length,
    }));
  };
  showNextMonth = () => {
    this.setState(prevState => {
      const nextMonth = prevState.calendarDate.clone().add(1, 'month');
      return {
        calendarDate: nextMonth,
        highlightedIndex:
          // select last day in next month
          prevState.suggestedDates.length + nextMonth.daysInMonth() - 1,
      };
    });
  };
  showToday = () => {
    const today = moment();
    this.setState(
      prevState => ({
        calendarDate: today,
        highlightedIndex: prevState.suggestedDates.length + today.date() - 1,
      }),
      () => this.inputRef.current.focus()
    );
  };
  emit = unsortedRange => {
    this.props.onChange({
      target: {
        id: this.props.id,
        name: this.props.name,
        value: unsortedRange.sort(),
      },
    });
  };
  render() {
    return (
      <Downshift
        itemToString={createItemToString(this.props.intl)}
        inputValue={this.state.inputValue}
        selectedItem={null}
        highlightedIndex={this.state.highlightedIndex}
        onStateChange={changes => {
          // on focus
          // {"isOpen":true,"type":"__autocomplete_unknown__"}

          // on hover item
          // {"highlightedIndex":18,"type":"__autocomplete_item_mouseenter__"}

          // on item click
          // {"isOpen":false,"highlightedIndex":null,"selectedItem":"2018-11-18T23:00:00.000Z","inputValue":"11/19/2018","type":"__autocomplete_click_item__"}

          // on second item click
          // {"isOpen":false,"highlightedIndex":null,"selectedItem":"2018-11-21T23:00:00.000Z","inputValue":"11/22/2018","type":"__autocomplete_click_item__"}

          // on type
          // {"type":"__autocomplete_change_input__","inputValue":"f"}

          /* eslint-disable no-prototype-builtins */

          this.setState(prevState => {
            // ensure input value matches prop value when menu is closed
            if (
              changes.type === Downshift.stateChangeTypes.mouseUp ||
              changes.type === Downshift.stateChangeTypes.blurInput
            ) {
              return {
                highlightedIndex: null,
                isOpen: false,
                inputValue:
                  this.props.value.length === 2
                    ? `${this.props.value[0]} - ${this.props.value[1]}`
                    : '',
              };
            }

            if (changes.hasOwnProperty('selectedItem')) {
              const hasFinishedRangeSelection =
                prevState.startDate && changes.selectedItem;
              const hasStartedRangeSelection =
                !prevState.startDate && changes.selectedItem;

              return {
                highlightedIndex: prevState.highlightedIndex,
                startDate: prevState.startDate
                  ? null
                  : changes.selectedItem.format('YYYY-MM-DD'),
                isOpen: !hasFinishedRangeSelection,
                inputValue: do {
                  if (hasFinishedRangeSelection)
                    [
                      prevState.startDate,
                      changes.selectedItem.format('YYYY-MM-DD'),
                    ]
                      .sort()
                      .join(' - ');
                  else if (hasStartedRangeSelection)
                    `${changes.selectedItem.format('YYYY-MM-DD')} -`;
                  else '';
                },
              };
            }

            if (changes.hasOwnProperty('isOpen')) {
              return {
                isOpen: changes.isOpen,
                highlightedIndex: changes.highlightedIndex || null,
                inputValue: changes.inputValue || prevState.inputValue,
                startDate: changes.isOpen ? prevState.startDate : null,
              };
            }

            if (changes.hasOwnProperty('inputValue')) {
              const suggestedDates = createSuggestedItems(
                changes.inputValue,
                this.props.intl
              );
              const parsedRange = parseRangeText(changes.inputValue);
              if (parsedRange.length === 0)
                return {
                  suggestedDates,
                  highlightedIndex: suggestedDates.length > 0 ? 0 : null,
                  inputValue: changes.inputValue,
                  startDate: null,
                };
              if (parsedRange.length === 1) {
                const calendarDate = moment(parsedRange[0]);
                return {
                  suggestedDates,
                  highlightedIndex:
                    suggestedDates.length + calendarDate.date() - 1,
                  inputValue: changes.inputValue,
                  startDate: parsedRange[0],
                  calendarDate,
                };
              }
              if (parsedRange.length === 2) {
                const calendarDate = moment(parsedRange[1]);
                return {
                  suggestedDates,
                  highlightedIndex:
                    suggestedDates.length + calendarDate.date() - 1,
                  inputValue: changes.inputValue,
                  startDate: parsedRange[0],
                  calendarDate,
                };
              }
            }

            if (changes.hasOwnProperty('highlightedIndex')) {
              return { highlightedIndex: changes.highlightedIndex };
            }

            return null;
          });
          /* eslint-enable no-prototype-builtins */
        }}
        onChange={selectedItem => {
          if (this.state.startDate && selectedItem) {
            this.emit([
              this.state.startDate,
              selectedItem.format('YYYY-MM-DD'),
            ]);
          } else {
            this.emit([]);
          }
        }}
        isOpen={this.state.isOpen}
      >
        {({
          getInputProps,
          getMenuProps,
          getItemProps,
          getToggleButtonProps,

          clearSelection,

          highlightedIndex,
          openMenu,
          closeMenu,
          setHighlightedIndex,
          isOpen,
        }) => {
          const calendarItems = createCalendarItems(
            this.state.calendarDate,
            this.props.intl
          );
          const allItems = [...this.state.suggestedDates, ...calendarItems];

          const highlightedItemType = do {
            if (highlightedIndex === null) 'none';
            else if (highlightedIndex < this.state.suggestedDates.length)
              'suggestedItem';
            else 'calendarItem';
          };

          const paddingDays = do {
            const weekday = this.state.calendarDate.startOf('month').day();
            Array(weekday).fill();
          };

          const weekdays = moment.localeData('en').weekdaysMin();

          return (
            <div>
              <input
                ref={this.inputRef}
                {...getInputProps({
                  onMouseEnter: () => {
                    // we remove the highlight so that the user can use the
                    // arrow keys to move the cursor when hovering
                    if (isOpen) setHighlightedIndex(null);
                  },
                  onKeyDown: createKeyDownHandler({
                    isOpen,
                    setHighlightedIndex,
                    clearSelection,
                    closeMenu,
                    highlightedItemType,
                    highlightedIndex,
                    allItems,
                    openMenu,
                    inputValue: this.state.inputValue,
                    suggestedDates: this.state.suggestedDates,
                    showNextMonth: this.showNextMonth,
                    showPrevMonth: this.showPrevMonth,
                    emit: this.emit,
                  }),
                  onFocus: openMenu,
                  onClick: openMenu,
                })}
              />
              <button
                {...getToggleButtonProps({
                  onKeyDown: createKeyDownHandler({
                    isOpen,
                    setHighlightedIndex,
                    clearSelection,
                    closeMenu,
                    highlightedItemType,
                    highlightedIndex,
                    allItems,
                    openMenu,
                    inputValue: this.state.inputValue,
                    suggestedDates: this.state.suggestedDates,
                    showNextMonth: this.showNextMonth,
                    showPrevMonth: this.showPrevMonth,
                    emit: this.emit,
                  }),
                })}
              >
                {isOpen ? 'close' : 'open'}
              </button>
              {this.props.value.length === 2 ? (
                <button
                  onClick={() => {
                    this.setState({ startDate: null });
                    this.emit([]);
                    clearSelection();
                  }}
                >
                  x
                </button>
              ) : null}
              <div {...getMenuProps({ className: styles.menu })}>
                {isOpen ? (
                  <React.Fragment>
                    <ul className={styles.suggestions}>
                      {this.state.suggestedDates.map((item, index) => (
                        <li
                          key={`${item[0].format(
                            'YYYY-MM-DD'
                          )} - ${item[1].format('YYYY-MM-DD')}`}
                          {...getItemProps({
                            item,
                            style: {
                              backgroundColor:
                                index === highlightedIndex ? 'gray' : null,
                            },
                          })}
                        >
                          Suggestion{' '}
                          {item[0].format('YYYY-MM-DD') -
                            item[1].format('YYYY-MM-DD')}
                        </li>
                      ))}
                    </ul>
                    {this.state.calendarDate.format('YYYY-MM')}
                    <button
                      type="button"
                      onClick={this.showPrevMonth}
                      onKeyDown={createButtonKeyDownHandler(this.inputRef)}
                    >
                      -
                    </button>
                    <button type="button" onClick={this.showToday}>
                      o
                    </button>
                    <button
                      type="button"
                      onClick={this.showNextMonth}
                      onKeyDown={createButtonKeyDownHandler(this.inputRef)}
                    >
                      +
                    </button>
                    <ul className={styles.calendar}>
                      {weekdays.map(weekday => (
                        <li key={weekday} className={styles.weekday}>
                          {weekday}
                        </li>
                      ))}
                      {paddingDays.map((day, index) => (
                        <li key={index} />
                      ))}
                      {calendarItems.map((item, index) => {
                        const isHighlighted =
                          this.state.suggestedDates.length + index ===
                          highlightedIndex;
                        const {
                          isRangeStart,
                          isRangeBetween,
                          isRangeEnd,
                        } = getRange({
                          item,
                          value: this.props.value,
                          startDate: this.state.startDate,
                          highlightedItem:
                            allItems[this.state.highlightedIndex],
                        });

                        return (
                          <li
                            key={item.format('YYYY-MM-DD')}
                            {...getItemProps({
                              item,
                              style: {
                                backgroundColor: do {
                                  if (isHighlighted) 'black';
                                  else if (isRangeStart || isRangeEnd) 'gray';
                                  else if (isRangeBetween) 'red';
                                  else null;
                                },
                                color: do {
                                  if (isHighlighted) 'white';
                                  else if (isRangeStart || isRangeEnd) 'white';
                                  else if (isRangeBetween) 'black';
                                  else null;
                                },
                              },
                            })}
                          >
                            {item.format('DD')}
                          </li>
                        );
                      })}
                    </ul>
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          );
        }}
      </Downshift>
    );
  }
}

export default injectIntl(DateRangeCalendar);
