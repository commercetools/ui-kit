import moment from 'moment-timezone';

export default function parseDateTime(
  type,
  value,
  options = { locale: 'en', timeZone: moment.tz.guess() }
) {
  switch (type) {
    case 'time':
      // When passing a time, the timezone should not be considered.
      // Timezone offsets are depending on the date. Since we have no date we
      // can't reliably use timezones. So all this needs to do is format the
      // given time HH:mm to ISO time format HH.mm.ss.SSS
      return moment(value, 'LT')
        .locale(options.locale)
        .format('HH:mm:ss.SSS');
    case 'datetime':
      // when passing a datetime, the timezone should be considered.
      // E.g. the date is 2017-01-01T00:00:00. If we parse this date to an ISO
      // string we get 2016-12-31T23:00:00.000Z. This will be sent to the server.
      // Later on the client we can read the APIs UTC ISO string again and
      // recreate the original timezoned date by simply calling moment/Date with
      // the APIs UTC ISO string.
      return moment(value, 'L LT')
        .tz(options.timeZone)
        .locale(options.locale)
        .toISOString();
    case 'date':
      // when passing a date, the timezone should not be considered.
      // E.g. the date is 2017-01-01. If we parse this date to an ISO string we
      // get 2016-12-31T23:00:00.000Z, the timezone information will be stripped
      // off and the remaining date string 2016-12-31 will be sent to the server
      // but the time information 23:00:00 is lost, so there is no way of
      // recreating the date on the client.
      return moment(value, 'L')
        .locale(options.locale)
        .format('YYYY-MM-DD');
    default:
      return value;
  }
}
