import React from 'react';
import { FormattedMessage } from 'react-intl';
import ErrorMessage from '../../messages/error-message';
import messages from './messages';

const RequiredValueErrorMessage = () => (
  <ErrorMessage>
    <FormattedMessage {...messages.missingRequiredField} />
  </ErrorMessage>
);

RequiredValueErrorMessage.displayName = 'RequiredValueErrorMessage';

export default RequiredValueErrorMessage;
