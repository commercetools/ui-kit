import { defineMessages } from 'react-intl';

export default defineMessages({
  missingRequiredField: {
    id: 'UIKit.LocalizedTextInput.missingRequiredField',
    description: 'Error message for missing required value',
    defaultMessage: 'This field is required. Provide at least one value.',
  },
  expand: {
    id: 'UIKit.LocalizedTextInput.expand',
    description: 'Label of language expansion button',
    defaultMessage: 'Show all languages ({remainingLanguages})',
  },
  collapse: {
    id: 'UIKit.LocalizedTextInput.collapse',
    description: 'Label of language collapse button',
    defaultMessage: 'Hide languages ({remainingLanguages})',
  },
});
