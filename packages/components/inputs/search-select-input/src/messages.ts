import { defineMessages } from 'react-intl';

export default defineMessages({
  noOptionsMessage: {
    id: 'UIKit.SearchSelectInput.noOptionsMessage',
    description:
      'Text of search select dropdown when no options match search text',
    defaultMessage: 'No matches found for your search term',
  },
  loadingOptionsMessage: {
    id: 'UIKit.SearchSelectInput.loadingOptionsMessage',
    description: 'Text showed while the options are being loaded',
    defaultMessage: 'Loading exact matches',
  },
  placeholderMessage: {
    id: 'UIKit.SearchSelectInput.placeholderMessage',
    description: 'Placeholder text for the input',
    defaultMessage: 'Search by…',
  },
  searchSelectInputAsFilterPlaceholder: {
    id: 'UIKit.SearchSelectInput.searchSelectInputAsFilterPlaceholder',
    description: 'Placeholder text for the input',
    defaultMessage: 'Search',
  },
});
