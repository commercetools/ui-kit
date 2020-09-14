import { defineMessages } from 'react-intl';

export default defineMessages({
  noOptionsMessage: {
    id: 'UIKit.SearchSelectInput.noOptionsMessage',
    description:
      'Text of search select dropdown when no options match search text',
    defaultMessage: 'No exact matches found',
  },
  loadingOptionsMessage: {
    id: 'UIKit.SearchSelectInput.loadingOptionsMessage',
    description: 'Text showing while the options are being loaded',
    defaultMessage: 'Loading exact matches',
  },
});
