// Difference of this file to utils.js is that this file
// respects the timezone and uses full iso date strings instead of
// just YYYY-MM-DD.

import moment, {
  DurationInputArg1,
  MomentInput,
  LocaleSpecifier,
} from 'moment-timezone';
import { parseTime, warning } from '@commercetools-uikit/utils';
import { DATE_FORMAT_LOCALIZED_MAPPINGS } from './formats';

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

export const formatDefaultTime = (time: string, locale: LocaleSpecifier) => {
  const today = moment();
  if (moment(time, 'HH:mm', true).isValid()) {
    const [hour, minute] = time.split(':');
    today.set({
      hour: parseInt(hour, 10),
      minute: parseInt(minute, 10),
    });
    return moment(today).locale(locale).format('LT'); // 5:13 PM
  } else {
    warning(
      false,
      `DataTimeInput: the specified defaultDaySelectionTime '${time}' is not supported. The format should be hh:mm, e.g. 11:10. Using 00:00 as default time.`
    );
    today.set({
      hour: 0,
      minute: 0,
    });
    return moment(today).locale(locale).format('LT'); // 12:00 AM
  }
};

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

export const getMonthCalendarLabel = (
  day: MomentInput,
  locale: string,
  timeZone?: string
) =>
  timeZone
    ? moment.tz(day, timeZone).locale(locale).format('MMMM')
    : moment(day, moment.ISO_8601, locale).format('MMMM');
export const getYearCalendarLabel = (
  day: MomentInput,
  locale: string,
  timeZone?: string
) =>
  timeZone
    ? moment.tz(day, timeZone).locale(locale).format('YYYY')
    : moment(day, moment.ISO_8601, locale).format('YYYY');
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

const getIntlDatePattern = (locale: string): string => {
  const formatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = formatter.formatToParts(new Date(2020, 0, 15));
  return parts
    .map((part) => {
      switch (part.type) {
        case 'day':
          return 'DD';
        case 'month':
          return 'MM';
        case 'year':
          return 'YYYY';
        case 'literal':
          return part.value;
        default:
          return '';
      }
    })
    .join('');
};

const getIntlTimePattern = (locale: string): string => {
  const formatter = new Intl.DateTimeFormat(locale, {
    timeStyle: 'short',
  });
  // Use 2:30 AM so the hour is single-digit, allowing us to detect padding
  const parts = formatter.formatToParts(new Date(2020, 0, 15, 2, 30));
  const hasDayPeriod = parts.some((p) => p.type === 'dayPeriod');

  return parts
    .map((part) => {
      switch (part.type) {
        case 'hour': {
          const padded = part.value.length === 2;
          if (hasDayPeriod) {
            return padded ? 'hh' : 'h';
          }
          return padded ? 'HH' : 'H';
        }
        case 'minute':
          return 'mm';
        case 'dayPeriod':
          return 'A';
        case 'literal':
          // Normalize unicode whitespace (e.g. U+202F narrow no-break space)
          // to regular spaces for consistent placeholder text
          return part.value.replace(/\s/g, ' ');
        default:
          return '';
      }
    })
    .join('');
};

const localizedDateFormatPatternCache = new Map<string, string>();
export const getLocalizedDateTimeFormatPattern = (
  locale: string,
  formatType: 'date' | 'time' | 'full' = 'date'
): string => {
  const key = `${locale}::${formatType}`;
  if (localizedDateFormatPatternCache.has(key)) {
    return localizedDateFormatPatternCache.get(key)!;
  }

  let localizedFormat = '';
  switch (formatType) {
    case 'date':
      localizedFormat = getIntlDatePattern(locale);
      break;
    case 'time':
      localizedFormat = getIntlTimePattern(locale);
      break;
    case 'full':
      localizedFormat = `${getIntlDatePattern(locale)} - ${getIntlTimePattern(
        locale
      )}`;
      break;
    default:
      throw new Error(
        `CalendarTime.getLocalizedDateTimeFormatPattern: Unknown format type '${formatType}'`
      );
  }

  // We try to get the localization both with the whole locale (e.g. 'en-GB')
  // and the generic language code (e.g. 'en').
  const [languageCode] = locale.split('-');
  const localeMappings = Object.entries(
    DATE_FORMAT_LOCALIZED_MAPPINGS[locale] ||
      DATE_FORMAT_LOCALIZED_MAPPINGS[languageCode] ||
      {}
  );

  // In case we don't have a translation for the locale, we fallback to the
  // Intl-derived pattern.
  let pattern = localizedFormat;
  if (localeMappings && localeMappings.length > 0) {
    pattern = localeMappings.reduce(
      (localizedPattern, [token, mappedValue]) => {
        return localizedPattern.replace(token, mappedValue);
      },
      localizedFormat
    );
  }

  localizedDateFormatPatternCache.set(key, pattern);
  return pattern;
};
