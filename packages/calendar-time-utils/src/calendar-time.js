// Difference of this file to utils.js is that this file
// respects the timezone and uses full iso date strings instead of
// just YYYY-MM-DD.

import moment from 'moment-timezone';
import { parseTime } from '@commercetools-uikit/utils';

export const getDaysInMonth = (day, timeZone) =>
  moment.tz(day, timeZone).daysInMonth();
export const changeDateInMonth = (day, timeZone, dayOfMonth) =>
  moment.tz(day, timeZone).date(dayOfMonth).toISOString();

export const changeTime = (dateString, timeZone, parsedTime) => {
  const date = moment.tz(dateString, timeZone);
  date.hours(parsedTime.hours);
  date.minutes(parsedTime.minutes);
  date.seconds(parsedTime.seconds);
  date.seconds(parsedTime.seconds);
  date.milliseconds(parsedTime.milliseconds);
  return date.toISOString();
};

export const getPreviousDay = (day) =>
  moment(day).subtract(1, 'day').format('YYYY-MM-DD');

export const formatTime = (day, locale, timeZone) => {
  const date = moment.tz(day, timeZone).locale(locale);
  if (date.milliseconds()) return date.format('HH:mm:ss.SSS');
  if (date.seconds()) return date.format('LTS'); // 5:13:51 PM
  return date.format('LT'); // 5:13 PM
};

export const formatDate = (day, locale, timeZone) => {
  const date = moment(day, moment.ISO_8601, locale).tz(timeZone).format('L');
  const time = formatTime(day, locale, timeZone);
  return `${date} ${time}`;
};

export const getDateInMonth = (day, timeZone) =>
  moment.tz(day, timeZone).date();

export const getToday = (timeZone) =>
  moment.tz(timeZone).startOf('day').toISOString();

export const changeMonth = (day, timeZone, delta) =>
  moment.tz(day, timeZone).add(delta, 'month').toISOString();

export const getPaddingDayCount = (day, locale, timeZone) => {
  const firstDayOfWeek = moment.localeData(locale).firstDayOfWeek();
  const firstDayOfMonth = moment
    .tz(day, timeZone)
    // .tz(timeZone)
    .startOf('month')
    .day();

  // ensure number is always positive
  return (firstDayOfMonth - firstDayOfWeek + 7) % 7;
};

export const getWeekdayNames = (locale) => {
  const weekDays = moment.localeData(locale).weekdaysMin();
  const firstDay = moment.localeData(locale).firstDayOfWeek();
  return [...weekDays.slice(firstDay), ...weekDays.slice(0, firstDay)];
};

export const getStartOf = (day, timeZone) =>
  moment.tz(day, timeZone).startOf('day').toISOString();

export const getMonthCalendarLabel = (day, locale) =>
  moment(day, moment.ISO_8601, locale).format('MMMM');
export const getYearCalendarLabel = (day, locale) =>
  moment(day, moment.ISO_8601, locale).format('YYYY');
export const isSameDay = (a, b) => moment(a).isSame(b, 'day');
export const getCalendarDayLabel = (day, timeZone) =>
  moment.tz(day, timeZone).format('D');

export const createItemDateTimeToString = (locale, timeZone) => (item) =>
  item ? formatDate(item, locale, timeZone) : '';

export const createCalendarItems = (day, timeString, intl, timeZone) => {
  const parsedTime = parseTime(timeString);

  return Array.from({ length: getDaysInMonth(day, timeZone) }).map((_, i) => {
    const dayOfMonth = i + 1;
    let date = changeDateInMonth(day, timeZone, dayOfMonth);
    if (parsedTime) {
      date = changeTime(date, timeZone, parsedTime);
    }
    return date;
  });
};

export const createSuggestedItems = (inputValue, timeZone) => {
  if (inputValue.startsWith('t')) return [getToday(timeZone)];
  return [];
};

export const parseInputText = (text, locale, timeZone) => {
  const parts = text.split(' ');
  const dateString = parts[0];
  const timeString = parts.slice(1).join(' ');
  if (!dateString) return '';

  const date = moment.tz(
    dateString,
    moment.localeData(locale).longDateFormat('L'),
    timeZone
  );
  if (!date.isValid()) return '';

  // enable parsing a date only
  if (!timeString) return date.startOf('day').toISOString();

  const parsedTime = parseTime(timeString);
  if (parsedTime) {
    date.hours(parsedTime.hours);
    date.minutes(parsedTime.minutes);
    date.seconds(parsedTime.seconds);
    date.seconds(parsedTime.seconds);
    date.milliseconds(parsedTime.milliseconds);
    return date.toISOString();
  }
  return '';
};
