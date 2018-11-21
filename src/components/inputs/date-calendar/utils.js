import moment from 'moment';

export const getDaysInMonth = day => moment(day).daysInMonth();
export const changeDateInMonth = (day, dayOfMonth) =>
  moment(day)
    .date(dayOfMonth)
    .format('YYYY-MM-DD');
export const getDateInMonth = day => moment(day).date();
export const getToday = () => moment().format('YYYY-MM-DD');
export const formatDate = day => moment(day).format('L');
export const changeMonth = (day, delta) =>
  moment(day)
    .add(delta, 'month')
    .format('YYYY-MM-DD');
export const getPaddingDayCount = day =>
  moment(day)
    .startOf('month')
    .day();
export const getWeekdayNames = locale =>
  moment.localeData(locale).weekdaysMin();

export const getCalendarLabel = day => moment(day).format('MMMM YYYY');
export const isSameDay = (a, b) => moment(a).isSame(b, 'day');
export const getCalendarDayLabel = day => moment(day).format('D');
