import moment from 'moment';

export const getDaysInMonth = (day) => moment(day).daysInMonth();
export const getDateInMonth = (day) => moment(day).date();
export const getToday = () => moment().format('YYYY-MM-DD');
export const formatDate = (day, locale) =>
  day ? moment(day, 'YYYY-MM-DD', locale).format('L') : '';
export const changeMonth = (day, delta) =>
  moment(day).add(delta, 'month').format('YYYY-MM-DD');

export const getPaddingDayCount = (day, locale) => {
  const firstDayOfWeek = moment.localeData(locale).firstDayOfWeek();
  const firstDayOfMonth = moment(day).startOf('month').day();

  // ensure number is always positive
  return (firstDayOfMonth - firstDayOfWeek + 7) % 7;
};

export const getWeekdayNames = (locale) => {
  const weekDays = moment.localeData(locale).weekdaysMin();
  const firstDay = moment.localeData(locale).firstDayOfWeek();
  return [...weekDays.slice(firstDay), ...weekDays.slice(0, firstDay)];
};

export const getMonthCalendarLabel = (day, locale) =>
  moment(day, 'YYYY-MM-DD', locale).format('MMMM');
export const getYearCalendarLabel = (day, locale) =>
  moment(day, 'YYYY-MM-DD', locale).format('YYYY');
export const isSameDay = (a, b) => moment(a).isSame(b, 'day');
export const getCalendarDayLabel = (day) => moment(day).format('D');

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
  moment(day).date(dayOfMonth).format('YYYY-MM-DD');

export const createCalendarItems = (day) =>
  Array.from({ length: getDaysInMonth(day) }).map((_, i) => {
    const dayOfMonth = i + 1;
    const date = changeDateInMonth(day, dayOfMonth);
    return date;
  });

export const createItemRangeToString = (locale) => (item) =>
  Array.isArray(item)
    ? item.map((i) => (i ? formatDate(i, locale) : '')).join(' - ')
    : formatDate(item, locale);

export const createItemToString = (locale) => (item) =>
  item ? formatDate(item, locale) : '';

export const formatRange = (range, locale) =>
  range
    .sort()
    .map((item) => formatDate(item, locale))
    .join(' - ');

export const parseInputToDate = (text, locale) => {
  const localeDate = moment(
    text,
    moment.localeData(locale).longDateFormat('L'),
    locale
  );

  if (localeDate.isValid()) return localeDate.format('YYYY-MM-DD');
  return '';
};

export const getIsDateInRange = (item, min, max) => {
  const itemDate = moment(item);

  if (min && max) {
    return itemDate.isBetween(min, max, null, []);
  }
  if (min && !max) {
    return itemDate.isSameOrAfter(min);
  }
  if (!min && max) {
    return itemDate.isSameOrBefore(max);
  }
  return true;
};

export const getExampleDateStrings = () => ({
  currentDate: moment().format('YYYY-MM-DD'),
  preselectedDate: moment().add(3, 'days').format('YYYY-MM-DD'),
  minDate: moment().format('YYYY-MM-DD'),
  maxDate: moment().add(1, 'year').format('YYYY-MM-DD'),
});
