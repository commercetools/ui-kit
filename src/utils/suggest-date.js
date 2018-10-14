import moment from 'moment';

// Allow users to type things like "january" or "monday" and turn it into
// a date as a suggestion.
// Respects locales  when making the suggestions.
// Translations for locales are taken from moment data and from
// the passed messages.
//
// eslint-disable-next-line import/prefer-default-export
export function suggestDate(rawWord, locale, messages) {
  const word = rawWord.toLowerCase();

  const matches = entry => entry.toLowerCase().startsWith(word);
  if (matches(messages.today)) {
    const today = moment.utc().startOf('day');
    return today;
  }

  if (matches(messages.yesterday)) {
    return moment
      .utc()
      .startOf('day')
      .subtract(1, 'day');
  }

  if (matches(messages.tomorrow)) {
    return moment
      .utc()
      .startOf('day')
      .add(1, 'day');
  }

  // weekdays is an array with index 0 being sunday
  const weekdays = moment.localeData(locale).weekdays();
  // weekday is a number and starts with sunday being 0
  const matchedWeekay = weekdays.findIndex(matches);
  if (matchedWeekay !== -1) {
    const weekday = moment().weekday();
    return (
      moment
        .utc()
        .startOf('day')
        // we subtract so that we always match in the current week
        .add(matchedWeekay - weekday, 'day')
    );
  }

  const months = moment.localeData(locale).months();
  const matchedMonth = months.findIndex(matches);
  if (matchedMonth !== -1) {
    const month = moment.utc().month();
    return (
      moment
        .utc()
        // we subtract so that we always match in the current year
        .add(matchedMonth - month, 'month')
        // always show first of month
        .date(1)
    );
  }

  const date = moment.utc(word, moment.localeData(locale).longDateFormat('L'));
  if (date?.isValid()) return date;

  return null;
}
