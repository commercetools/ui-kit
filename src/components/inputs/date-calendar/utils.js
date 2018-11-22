import moment from 'moment';

export const getDaysInMonth = day => moment(day).daysInMonth();
export const getDateInMonth = day => moment(day).date();
export const getToday = () => moment().format('YYYY-MM-DD');
export const formatDate = (day, locale) =>
  moment(day, 'YYYY-MM-DD', locale).format('L');
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

export const getCalendarLabel = (day, locale) =>
  moment(day, 'YYYY-MM-DD', locale).format('MMMM YYYY');
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

export const createItemRangeToString = locale => item =>
  Array.isArray(item)
    ? item.map(i => (i ? formatDate(i, locale) : '')).join(' - ')
    : formatDate(item, locale);

export const createItemToString = locale => item =>
  item ? formatDate(item, locale) : '';

export const formatRange = (range, locale) =>
  range
    .sort()
    .map(item => formatDate(item, locale))
    .join(' - ');

// replace
// `${this.props.value[0]} - ${this.props.value[1]}`
// look for "inputValue:"
