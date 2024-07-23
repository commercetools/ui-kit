import { defineMessages } from 'react-intl';

export default defineMessages({
  belowMinError: {
    id: 'UIKit.NumberField.belowMinError',
    description: 'An error message to show when the value is below the minimum',
    defaultMessage: 'Value must be greater than or equal to {min}.',
  },
  aboveMaxError: {
    id: 'UIKit.NumberField.aboveMaxError',
    description: 'An error message to show when the value is above the maximum',
    defaultMessage: 'Value must be less than or equal to {max}.',
  },
});
