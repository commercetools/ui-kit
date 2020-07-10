import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ErrorMessage } from '@commercetools-uikit/messages';
import messages from '../../../../../src/components/internals/messages/localized-input';

const RequiredValueErrorMessage = () => (
  <ErrorMessage>
    <FormattedMessage {...messages.missingRequiredField} />
  </ErrorMessage>
);

RequiredValueErrorMessage.displayName = 'RequiredValueErrorMessage';

export default RequiredValueErrorMessage;
