import { defineMessages } from 'react-intl';

export default defineMessages({
  missingRequiredField: {
    id: 'UIKit.LocalizedTextInput.missingRequiredField',
    description: 'Error message for missing required value',
    defaultMessage: 'This field is required. Provide at least one value.',
  },
  show: {
    id: 'UIKit.LocalizedTextInput.show',
    description: 'Label of language expansion button',
    defaultMessage: 'Show all languages ({remainingLanguages})',
  },
  hide: {
    id: 'UIKit.LocalizedTextInput.hide',
    description: 'Label of language collapse button',
    defaultMessage: 'Hide languages ({remainingLanguages})',
  },
});
