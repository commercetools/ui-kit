import moment from 'moment';

export const getDaysInMonth = day => moment(day).daysInMonth();
export const getDateInMonth = day => moment(day).date();
export const getToday = () => moment().format('YYYY-MM-DD');
export const formatDate = day => moment(day).format('L');
export const changeMonth = (day, delta) =>
  moment(day)
    .add(delta, 'month')
    .format('YYYY-MM-DD');
export const getPaddingDayCount = day =>
  moment(day)
    .startOf('month')
    .day();
export const getWeekdayNames = locale =>
  moment.localeData(locale).weekdaysMin();

export const getCalendarLabel = day => moment(day).format('MMMM YYYY');
export const isSameDay = (a, b) => moment(a).isSame(b, 'day');
export const getCalendarDayLabel = day => moment(day).format('D');

export const isBetween = (item, start, end) => {
  const itemDate = moment(item);
  const startDate = moment(start);
  const endDate = moment(end);
  return (
    itemDate.isBetween(startDate, endDate) ||
    itemDate.isBetween(endDate, startDate)
  );
};

const changeDateInMonth = (day, dayOfMonth) =>
  moment(day)
    .date(dayOfMonth)
    .format('YYYY-MM-DD');

export const createCalendarItems = day =>
  Array.from({ length: getDaysInMonth(day) }).map((_, i) => {
    const dayOfMonth = i + 1;
    const date = changeDateInMonth(day, dayOfMonth);
    return date;
  });

// replace
// `${this.props.value[0]} - ${this.props.value[1]}`
// look for "inputValue:"
