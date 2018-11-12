import moment from 'moment';

// returns a list of week days starting at the day specified by the locale
export default locale => {
  const weekDays = moment.localeData(locale).weekdaysMin();
  const firstDay = moment.localeData(locale).firstDayOfWeek();
  return [...weekDays.slice(firstDay), ...weekDays.slice(0, firstDay)];
};
