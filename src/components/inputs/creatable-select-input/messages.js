import { defineMessages } from 'react-intl';

export default defineMessages({
  createLabel: {
    id: 'UIKit.CreatableSelectInput.createLabel',
    description: 'Text of dropdown when creating option',
    defaultMessage: 'Create "{inputValue}"',
  },
  noOptionsMessageWithInputValue: {
    id: 'UIKit.CreatableSelectInput.noOptionsMessageWithInputValue',
    description: 'Text of dropdown when no options match search text',
    defaultMessage: 'No options',
  },
  noOptionsMessageWithoutInputValue: {
    id: 'UIKit.CreatableSelectInput.noOptionsMessageWithoutInputValue',
    description: 'Text of dropdown when no options exist',
    defaultMessage: 'No options',
  },
});
