import { defineMessages } from 'react-intl';

export default defineMessages({
  today: {
    id: 'UIKit.DateInput.today',
    description:
      'Translation of the word "today" (used for suggestions in code)',
    defaultMessage: 'Today',
  },
  yesterday: {
    id: 'UIKit.DateInput.yesterday',
    description:
      'Translation of the word "yesterday" (used for suggestions in code)',
    defaultMessage: 'Yesterday',
  },
  tomorrow: {
    id: 'UIKit.DateInput.tomorrow',
    description:
      'Translation of the word "tomorrow" (used for suggestions in code)',
    defaultMessage: 'Tomorrow',
  },
  sameDay: {
    id: 'UIKit.DateInput.sameDay',
    description: 'Label for a day (uses moment.js date notation)',
    defaultMessage: '[Today], Do MMM YYYY',
  },
  nextDay: {
    id: 'UIKit.DateInput.nextDay',
    description: 'Label for a day (uses moment.js date notation)',
    defaultMessage: '[Tomorrow], Do MMM YYYY',
  },
  nextWeek: {
    id: 'UIKit.DateInput.nextWeek',
    description: 'Label for a day (uses moment.js date notation)',
    defaultMessage: '[Next] dddd (Do MMM YYYY)',
  },
  lastDay: {
    id: 'UIKit.DateInput.lastDay',
    description: 'Label for a day (uses moment.js date notation)',
    defaultMessage: '[Yesterday], Do MMM YYYY',
  },
  lastWeek: {
    id: 'UIKit.DateInput.lastWeek',
    description: 'Label for a day (uses moment.js date notation)',
    defaultMessage: '[Last] dddd (Do MMM YYYY)',
  },
  sameElse: {
    id: 'UIKit.DateInput.sameElse',
    description: 'Label for a day (uses moment.js date notation)',
    defaultMessage: 'Do MMMM YYYY',
  },
});
