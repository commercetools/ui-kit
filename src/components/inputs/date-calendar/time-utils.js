// Difference of this file to utils.js is that this file
// respects the timezone and uses full iso date strings instead of
// just YYYY-MM-DD.

import moment from 'moment';

export const getDaysInMonth = (day, timeZone) =>
  moment.tz(day, timeZone).daysInMonth();
export const changeDateInMonth = (day, timeZone, dayOfMonth) =>
  moment
    .tz(day, timeZone)
    .date(dayOfMonth)
    .toISOString();

export const changeTime = (dateString, timeZone, parsedTime) => {
  const date = moment.tz(dateString, timeZone);
  date.hours(parsedTime.hours);
  date.minutes(parsedTime.minutes);
  date.seconds(parsedTime.seconds);
  date.seconds(parsedTime.seconds);
  date.milliseconds(parsedTime.milliseconds);
  return date.toISOString();
};

export const formatTime = (day, timeZone) =>
  moment.tz(day, timeZone).format('LT');

export const getDateInMonth = (day, timeZone) =>
  moment.tz(day, timeZone).date();
export const getToday = timeZone =>
  moment
    .tz(timeZone)
    .startOf('day')
    .toISOString();
export const formatDate = (day, timeZone) =>
  moment.tz(day, timeZone).format('L');
export const changeMonth = (day, timeZone, delta) =>
  moment
    .tz(day, timeZone)
    .add(delta, 'month')
    .format('YYYY-MM-DD');
export const getPaddingDayCount = (day, timeZone) =>
  moment
    .tz(day, timeZone)
    .startOf('month')
    .day();
export const getWeekdayNames = locale =>
  moment.localeData(locale).weekdaysMin();

export const getStartOf = (day, timeZone) =>
  moment
    .tz(day, timeZone)
    .startOf('day')
    .toISOString();

export const getCalendarLabel = day => moment(day).format('MMMM YYYY');
export const isSameDay = (a, b) => moment(a).isSame(b, 'day');
export const getCalendarDayLabel = day => moment(day).format('D');
