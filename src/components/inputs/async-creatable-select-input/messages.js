import { defineMessages } from 'react-intl';

export default defineMessages({
  createLabel: {
    id: 'UIKit.AsyncCreatableSelectInput.createLabel',
    description: 'Text of dropdown when creating option',
    defaultMessage: 'Create "{inputValue}"',
  },
  noOptionsMessageWithInputValue: {
    id: 'UIKit.AsyncCreatableSelectInput.noOptionsMessageWithInputValue',
    description: 'Text of dropdown when no options match search text',
    defaultMessage: 'No options',
  },
  noOptionsMessageWithoutInputValue: {
    id: 'UIKit.AsyncCreatableSelectInput.noOptionsMessageWithoutInputValue',
    description: 'Text of dropdown when no options exist',
    defaultMessage: 'No options',
  },
});
