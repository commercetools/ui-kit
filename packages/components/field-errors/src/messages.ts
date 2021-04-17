import { defineMessages } from 'react-intl';

export default defineMessages({
  missingRequiredField: {
    id: 'UIKit.FieldErrors.missingRequiredField',
    description: 'Error message for missing required value',
    defaultMessage: 'This field is required. Provide a value.',
  },
  invalidNegativeNumber: {
    id: 'UIKit.FieldErrors.invalidNegativeNumber',
    description: 'Error message when negative number is used',
    defaultMessage: 'Negative number is not supported.',
  },
  invalidFractionalNumber: {
    id: 'UIKit.FieldErrors.invalidFractionalNumber',
    description: 'Error message when fractional number is used',
    defaultMessage: 'A whole number is required.',
  },
});
