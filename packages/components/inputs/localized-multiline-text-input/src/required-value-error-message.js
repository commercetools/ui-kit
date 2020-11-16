import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ErrorMessage } from '@commercetools-uikit/messages';
import { messagesLocalizedInput } from '@commercetools-uikit/input-utils';

const RequiredValueErrorMessage = () => (
  <ErrorMessage>
    <FormattedMessage {...messagesLocalizedInput.missingRequiredField} />
  </ErrorMessage>
);

RequiredValueErrorMessage.displayName = 'RequiredValueErrorMessage';

export default RequiredValueErrorMessage;
