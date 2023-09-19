import moment from 'moment';
import inRange from 'lodash/inRange';
import type { MomentInput, DurationInputArg1 } from 'moment';

export const getDaysInMonth = (day: MomentInput) => moment(day).daysInMonth();
export const getDateInMonth = (day: MomentInput) => moment(day).date();
export const getToday = () => moment().format('YYYY-MM-DD');
export const formatDate = (day: MomentInput, locale: string) =>
  day ? moment(day, 'YYYY-MM-DD', locale).format('L') : '';
export const changeMonth = (day: MomentInput, delta: DurationInputArg1) =>
  moment(day).add(delta, 'month').format('YYYY-MM-DD');

export const getNextDay = (day: MomentInput) =>
  moment(day).add(1, 'day').format('YYYY-MM-DD');
export const getPreviousDay = (day: MomentInput) =>
  moment(day).subtract(1, 'day').format('YYYY-MM-DD');

export const getPaddingDayCount = (day: MomentInput, locale: string) => {
  const firstDayOfWeek = moment.localeData(locale).firstDayOfWeek();
  const firstDayOfMonth = moment(day).startOf('month').day();
  const paddingDayCount = (firstDayOfMonth - firstDayOfWeek + 7) % 7;

  // ensure number is always positive
  return inRange(paddingDayCount, 0, 6) ? paddingDayCount : 0;
};

export const getWeekdayNames = (locale: string) => {
  const weekDays = moment.localeData(locale).weekdaysMin();
  const firstDay = moment.localeData(locale).firstDayOfWeek();
  return [...weekDays.slice(firstDay), ...weekDays.slice(0, firstDay)];
};

export const getMonthCalendarLabel = (day: MomentInput, locale: string) =>
  moment(day, 'YYYY-MM-DD', locale).format('MMMM');
export const getYearCalendarLabel = (day: MomentInput, locale: string) =>
  moment(day, 'YYYY-MM-DD', locale).format('YYYY');
export const isSameDay = (a: MomentInput, b: MomentInput) =>
  moment(a).isSame(b, 'day');
export const getCalendarDayLabel = (day: MomentInput) =>
  moment(day).format('D');

export const isBetween = (
  item: MomentInput,
  start: MomentInput,
  end: MomentInput
) => {
  const itemDate = moment(item);
  const startDate = moment(start);
  const endDate = moment(end);
  return (
    itemDate.isBetween(startDate, endDate) ||
    itemDate.isBetween(endDate, startDate)
  );
};

const changeDateInMonth = (day: MomentInput, dayOfMonth: number) =>
  moment(day).date(dayOfMonth).format('YYYY-MM-DD');

export const createCalendarItems = (day: MomentInput) =>
  Array.from({ length: getDaysInMonth(day) }).map((_, i) => {
    const dayOfMonth = i + 1;
    const date = changeDateInMonth(day, dayOfMonth);
    return date;
  });

export const createItemRangeToString =
  (locale: string) => (item: MomentInput) =>
    Array.isArray(item)
      ? item.map((i) => (i ? formatDate(i, locale) : '')).join(' - ')
      : formatDate(item, locale);

export const createItemToString = (locale: string) => (item: MomentInput) =>
  item ? formatDate(item, locale) : '';

export const formatRange = (range: MomentInput[], locale: string) =>
  range
    .sort()
    .map((item) => formatDate(item, locale))
    .join(' - ');

export const parseInputToDate = (text: MomentInput, locale: string) => {
  const localeDate = moment(
    text,
    moment.localeData(locale).longDateFormat('L'),
    locale
  );

  if (localeDate.isValid()) return localeDate.format('YYYY-MM-DD');
  return '';
};

export const getIsDateInRange = (
  item: MomentInput,
  min: MomentInput,
  max: MomentInput
) => {
  const itemDate = moment(item);

  if (min && max) {
    return itemDate.isBetween(min, max, null, '[]');
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
