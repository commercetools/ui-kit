import { defineMessages } from 'react-intl';

export default defineMessages({
  today: {
    id: 'UIKit.DateTimeInput.today',
    description:
      'Translation of the word "today" (used for suggestions in code)',
    defaultMessage: 'Today',
  },
  yesterday: {
    id: 'UIKit.DateTimeInput.yesterday',
    description:
      'Translation of the word "yesterday" (used for suggestions in code)',
    defaultMessage: 'Yesterday',
  },
  tomorrow: {
    id: 'UIKit.DateTimeInput.tomorrow',
    description:
      'Translation of the word "tomorrow" (used for suggestions in code)',
    defaultMessage: 'Tomorrow',
  },
  sameDay: {
    id: 'UIKit.DateTimeInput.sameDay',
    description: 'Label for a day (uses moment.js date notation)',
    defaultMessage: '[Today at] LT',
  },
  nextDay: {
    id: 'UIKit.DateTimeInput.nextDay',
    description: 'Label for a day (uses moment.js date notation)',
    defaultMessage: '[Tomorrow at] LT',
  },
  nextWeek: {
    id: 'UIKit.DateTimeInput.nextWeek',
    description: 'Label for a day (uses moment.js date notation)',
    defaultMessage: '[Next] dddd, Do MMM YYYY [at] LT',
  },
  lastDay: {
    id: 'UIKit.DateTimeInput.lastDay',
    description: 'Label for a day (uses moment.js date notation)',
    defaultMessage: '[Yesterday at] LT',
  },
  lastWeek: {
    id: 'UIKit.DateTimeInput.lastWeek',
    description: 'Label for a day (uses moment.js date notation)',
    defaultMessage: '[Last] dddd, Do MMM YYYY [at] LT',
  },
  sameElse: {
    id: 'UIKit.DateTimeInput.sameElse',
    description: 'Label for a day (uses moment.js date notation)',
    defaultMessage: 'Do MMMM YYYY [at] LT',
  },
  timePickerPlaceholder: {
    id: 'UIKit.DateTimeInput.timePickerPlaceholder',
    description: 'Placeholder for the time input',
    defaultMessage: 'Time (e.g. 3:15 pm)',
  },
  dateTimeSeparators: {
    id: 'UIKit.DateTimeInput.dateTimeSeparators',
    description: 'Separators for date and time which inputs will be split by',
    defaultMessage: ' at |@',
  },
});
