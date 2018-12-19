import { defineMessages } from 'react-intl';

export default defineMessages({
  missingRequiredField: {
    id: 'UIKit.LocalizedMoneyInput.missingRequiredField',
    description: 'Error message for missing required value',
    defaultMessage: 'This field is required. Provide at least one value.',
  },
  show: {
    id: 'UIKit.LocalizedMoneyInput.show',
    description: '',
    defaultMessage: 'Show all currencies ({remainingCurrencies})',
  },
  hide: {
    id: 'UIKit.LocalizedMoneyInput.hide',
    description: '',
    defaultMessage: 'Hide currencies ({remainingCurrencies})',
  },
});
