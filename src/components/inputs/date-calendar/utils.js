import moment from 'moment';

export const createCalendarItems = day =>
  Array.from({ length: moment(day).daysInMonth() }).map((_, i) => {
    const dayOfMonth = i + 1;
    const date = moment(day).date(dayOfMonth);
    return date;
  });

// eslint-disable-next-line arrow-body-style
export const createSuggestedItems = inputValue => {
  if (inputValue.startsWith('t')) return [moment()];
  return [];
};

export const preventDownshiftDefault = event => {
  // eslint-disable-next-line no-param-reassign
  event.nativeEvent.preventDownshiftDefault = true;
};

export const createButtonKeyDownHandler = ref => event => {
  if (event.key === 'Enter') return;
  event.preventDefault();
  ref.current.focus();
};
