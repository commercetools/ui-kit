import moment from 'moment-timezone';

// Allow users to type things like "january" or "monday" and turn it into
// a date as a suggestion.
// Respects locales  when making the suggestions.
// Translations for locales are taken from moment data and from
// the passed messages.
//
// eslint-disable-next-line import/prefer-default-export
export function suggestDate(rawWord, locale, messages, timeZone = 'UTC') {
  const word = rawWord.toLowerCase();

  const matches = entry => entry.toLowerCase().startsWith(word);
  if (matches(messages.today)) {
    const today = moment.tz(timeZone).startOf('day');
    return today;
  }

  if (matches(messages.yesterday)) {
    return moment
      .tz(timeZone)
      .startOf('day')
      .subtract(1, 'day');
  }

  if (matches(messages.tomorrow)) {
    return moment
      .tz(timeZone)
      .startOf('day')
      .add(1, 'day');
  }

  // weekdays is an array with index 0 being sunday
  const weekdays = moment.localeData(locale).weekdays();
  // weekday is a number and starts with sunday being 0
  const matchedWeekay = weekdays.findIndex(matches);
  if (matchedWeekay !== -1) {
    const weekday = moment().weekday();

    // we subtract so that we always match in the current week,
    // then we adjust so that matches are always in the future when typing
    // weekdays
    const suggestedDayDelta = do {
      const delta = matchedWeekay - weekday;
      delta < 0 ? delta + 7 : delta;
    };

    return moment
      .tz(timeZone)
      .startOf('day')
      .add(suggestedDayDelta, 'day');
  }

  const date = moment.tz(
    word,
    moment.localeData(locale).longDateFormat('L'),
    timeZone
  );
  if (date?.isValid()) return date;

  return null;
}
