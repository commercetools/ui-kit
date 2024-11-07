import { defineMessages } from 'react-intl';

export default defineMessages({
  createLabel: {
    id: 'UIKit.CreatableSelectInput.createLabel',
    description: 'Text of dropdown when creating option',
    defaultMessage: 'Create "{inputValue}"',
  },
  noOptionsMessageWithInputValue: {
    id: 'UIKit.SelectInput.noOptionsMessageWithInputValue',
    description: 'Text of dropdown when no options match search text',
    defaultMessage: 'No options',
  },
  noOptionsMessageWithoutInputValue: {
    id: 'UIKit.SelectInput.noOptionsMessageWithoutInputValue',
    description: 'Text of dropdown when no options exist',
    defaultMessage: 'No options',
  },
  placeholder: {
    id: 'UIKit.SelectInput.placeholder',
    description: 'Default input placeholder text',
    defaultMessage: 'Select...',
  },
  selectInputAsFilterPlaceholder: {
    id: 'UIKit.SelectInput.selectInputAsFilterPlaceholder',
    description: 'Default input placeholder text when used as filter',
    defaultMessage: 'Search',
  },
  loadingOptions: {
    id: 'UIKit.SelectInput.loadingOptions',
    description: 'Default input loading text',
    defaultMessage: 'Loading...',
  },
});
