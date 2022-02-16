// Difference of this file to utils.js is that this file
// respects the timezone and uses full iso date strings instead of
// just YYYY-MM-DD.

import moment, {
  DurationInputArg1,
  MomentInput,
  LocaleSpecifier,
} from 'moment-timezone';
import { parseTime } from '@commercetools-uikit/utils';

type ParsedTime = {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

export const getDaysInMonth = (day: MomentInput, timeZone: string) =>
  moment.tz(day, timeZone).daysInMonth();

export const changeDateInMonth = (
  day: MomentInput,
  timeZone: string,
  dayOfMonth: number
) => moment.tz(day, timeZone).date(dayOfMonth).toISOString();

export const changeTime = (
  dateString: string,
  timeZone: string,
  parsedTime: ParsedTime
) => {
  const date = moment.tz(dateString, timeZone);
  date.hours(parsedTime.hours);
  date.minutes(parsedTime.minutes);
  date.seconds(parsedTime.seconds);
  date.seconds(parsedTime.seconds);
  date.milliseconds(parsedTime.milliseconds);
  return date.toISOString();
};

export const getPreviousDay = (day: MomentInput) =>
  moment(day).subtract(1, 'day').format('YYYY-MM-DD');

export const formatTime = (
  day: MomentInput,
  locale: LocaleSpecifier,
  timeZone: string
) => {
  const date = moment.tz(day, timeZone).locale(locale);
  if (date.milliseconds()) return date.format('HH:mm:ss.SSS');
  if (date.seconds()) return date.format('LTS'); // 5:13:51 PM
  return date.format('LT'); // 5:13 PM
};

export const formatDate = (
  day: MomentInput,
  locale: string,
  timeZone: string
) => {
  const date = moment(day, moment.ISO_8601, locale).tz(timeZone).format('L');
  const time = formatTime(day, locale, timeZone);
  return `${date} ${time}`;
};

export const getDateInMonth = (day: MomentInput, timeZone: string): number =>
  moment.tz(day, timeZone).date();

export const getToday = (timeZone: string) =>
  moment.tz(timeZone).startOf('day').toISOString();

export const changeMonth = (
  day: MomentInput,
  timeZone: string,
  delta: DurationInputArg1
) => moment.tz(day, timeZone).add(delta, 'month').toISOString();

export const getPaddingDayCount = (
  day: MomentInput,
  locale: string,
  timeZone: string
) => {
  const firstDayOfWeek = moment.localeData(locale).firstDayOfWeek();
  const firstDayOfMonth = moment.tz(day, timeZone).startOf('month').day();

  // ensure number is always positive
  return (firstDayOfMonth - firstDayOfWeek + 7) % 7;
};

export const getWeekdayNames = (locale: string) => {
  const weekDays = moment.localeData(locale).weekdaysMin();
  const firstDay = moment.localeData(locale).firstDayOfWeek();
  return [...weekDays.slice(firstDay), ...weekDays.slice(0, firstDay)];
};

export const getStartOf = (day: MomentInput, timeZone: string) =>
  moment.tz(day, timeZone).startOf('day').toISOString();

export const getMonthCalendarLabel = (day: MomentInput, locale: string) =>
  moment(day, moment.ISO_8601, locale).format('MMMM');
export const getYearCalendarLabel = (day: MomentInput, locale: string) =>
  moment(day, moment.ISO_8601, locale).format('YYYY');
export const isSameDay = (a: MomentInput, b: MomentInput) =>
  moment(a).isSame(b, 'day');
export const getCalendarDayLabel = (day: MomentInput, timeZone: string) =>
  moment.tz(day, timeZone).format('D');

export const createItemDateTimeToString =
  (locale: string, timeZone: string) => (item: string | null) =>
    item ? formatDate(item, locale, timeZone) : '';

export const createCalendarItems = (
  day: MomentInput,
  timeString: string,
  // @deprecated
  // @ts-ignore
  intl,
  timeZone: string
) => {
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

export const createSuggestedItems = (inputValue: string, timeZone: string) => {
  if (inputValue.startsWith('t')) return [getToday(timeZone)];
  return [];
};

export const parseInputText = (
  text: string,
  locale: string,
  timeZone: string
) => {
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
