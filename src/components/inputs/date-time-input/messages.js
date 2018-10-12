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
    defaultMessage: '[Today], Do MMM YYYY',
  },
  nextDay: {
    id: 'UIKit.DateTimeInput.nextDay',
    description: 'Label for a day (uses moment.js date notation)',
    defaultMessage: '[Tomorrow], Do MMM YYYY',
  },
  nextWeek: {
    id: 'UIKit.DateTimeInput.nextWeek',
    description: 'Label for a day (uses moment.js date notation)',
    defaultMessage: '[Next] dddd (Do MMM YYYY)',
  },
  lastDay: {
    id: 'UIKit.DateTimeInput.lastDay',
    description: 'Label for a day (uses moment.js date notation)',
    defaultMessage: '[Yesterday], Do MMM YYYY',
  },
  lastWeek: {
    id: 'UIKit.DateTimeInput.lastWeek',
    description: 'Label for a day (uses moment.js date notation)',
    defaultMessage: '[Last] dddd (Do MMM YYYY)',
  },
  sameElse: {
    id: 'UIKit.DateTimeInput.sameElse',
    description: 'Label for a day (uses moment.js date notation)',
    defaultMessage: 'Do MMMM YYYY',
  },
});
