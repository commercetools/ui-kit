import { defineMessages } from 'react-intl';

export default defineMessages({
  missingRequiredField: {
    id: 'UIKit.LocalizedMoneyInput.missingRequiredField',
    description: 'Error message for missing required value',
    defaultMessage: 'This field is required. Provide at least one value.',
  },
  show: {
    id: 'UIKit.LocalizedMoneyInput.show',
    description: 'Show all currencies button',
    defaultMessage: 'Show all currencies ({remainingCurrencies})',
  },
  hide: {
    id: 'UIKit.LocalizedMoneyInput.hide',
    description: 'Hide currencies button',
    defaultMessage: 'Hide currencies ({remainingCurrencies})',
  },
});
