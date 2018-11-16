import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import styles from './date-calendar.mod.css';
import {
  createCalendarItems,
  createSuggestedItems,
  preventDownshiftDefault,
  createButtonKeyDownHandler,
} from './utils';

const createItemToString = (/* intl */) => item =>
  item ? moment(item).format('L') : '';

class DateCalendar extends React.Component {
  static displayName = 'DateCalendar';
  static propTypes = {
    intl: PropTypes.shape({
      locale: PropTypes.string.isRequired,
    }).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  inputRef = React.createRef();
  state = {
    calendarDate: moment(),
    suggestedDates: [],
    highlightedIndex: null,
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
  handleChange = date => {
    this.inputRef.current.setSelectionRange(0, 100);
    const value = date ? date.format('YYYY-MM-DD') : '';
    this.props.onChange({
      target: {
        id: this.props.id,
        name: this.props.name,
        value,
      },
    });
  };
  render() {
    return (
      <Downshift
        itemToString={createItemToString(this.props.intl)}
        selectedItem={this.props.value === '' ? null : this.props.value}
        highlightedIndex={this.state.highlightedIndex}
        onChange={this.handleChange}
        onStateChange={changes => {
          // eslint-disable-next-line no-prototype-builtins
          if (changes.hasOwnProperty('inputValue')) {
            const suggestedItems = createSuggestedItems(
              changes.inputValue,
              this.props.intl
            );
            this.setState({
              suggestedDates: suggestedItems,
              highlightedIndex: suggestedItems.length > 0 ? 0 : null,
            });
          }

          // eslint-disable-next-line no-prototype-builtins
          if (changes.hasOwnProperty('highlightedIndex')) {
            this.setState({ highlightedIndex: changes.highlightedIndex });
          }
        }}
      >
        {({
          getInputProps,
          getMenuProps,
          getItemProps,
          getToggleButtonProps,

          clearSelection,

          highlightedIndex,
          openMenu,
          setHighlightedIndex,
          selectedItem,
          isOpen,
        }) => {
          const suggestedItems = this.state.suggestedDates;
          const calendarItems = createCalendarItems(
            this.state.calendarDate,
            this.props.intl
          );
          const allItems = [...suggestedItems, ...calendarItems];

          const highlightedItemType = do {
            if (highlightedIndex === null) 'none';
            else if (highlightedIndex < suggestedItems.length) 'suggestedItem';
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
                  onKeyDown: event => {
                    const preventCursorJump = () => {
                      event.preventDefault();
                    };

                    const arrowKeys = [
                      'ArrowLeft',
                      'ArrowRight',
                      'ArrowUp',
                      'ArrowDown',
                    ];

                    if (highlightedItemType !== 'none') {
                      // user presses arrow keys while something is highlighted,
                      // so we want to prevent the cursor from jumping
                      if (arrowKeys.includes(event.key)) preventCursorJump();
                      // user types while something was highlighted, so we
                      // want to remove the highlight, which in turn
                      // allows the user to use the arrow keys
                      else setHighlightedIndex(null);
                    }

                    if (event.key === 'ArrowLeft') {
                      if (highlightedItemType === 'none') return;
                      preventDownshiftDefault(event);

                      if (highlightedIndex === suggestedItems.length) {
                        this.showPrevMonth();
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
                        this.showNextMonth();
                      } else {
                        setHighlightedIndex(
                          Math.min(highlightedIndex + 1, allItems.length - 1)
                        );
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
                              Math.max(suggestedItems.length - 1, 0)
                            );
                          else highlightedIndex - 1;
                        }
                      );
                    }
                  },
                  onFocus: openMenu,
                  onClick: openMenu,
                })}
              />
              <button {...getToggleButtonProps()}>
                {isOpen ? 'close' : 'open'}
              </button>
              {selectedItem ? (
                <button onClick={clearSelection}>x</button>
              ) : null}
              <div {...getMenuProps({ className: styles.menu })}>
                {isOpen ? (
                  <React.Fragment>
                    <ul className={styles.suggestions}>
                      {suggestedItems.map((item, index) => (
                        <li
                          key={item.format('YYYY-MM-DD')}
                          {...getItemProps({
                            item,
                            style: {
                              backgroundColor:
                                index === highlightedIndex ? 'gray' : null,
                            },
                          })}
                        >
                          Suggestion {item.format('YYYY-MM-DD')}
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
                      {calendarItems.map((item, index) => (
                        <li
                          key={item.format('YYYY-MM-DD')}
                          {...getItemProps({
                            item,
                            style: {
                              backgroundColor:
                                suggestedItems.length + index ===
                                highlightedIndex
                                  ? 'gray'
                                  : null,
                            },
                          })}
                        >
                          {item.format('DD')}
                        </li>
                      ))}
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

export default injectIntl(DateCalendar);
