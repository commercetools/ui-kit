import React from 'react';
import Text from '@commercetools-uikit/text';

type TIntlMessageDescriptor = {
  id: string | number;
  description?: string | object;
  defaultMessage: string;
};

type TWarningMessageProps = {
  intlMessage?: TIntlMessageDescriptor;
  children?: React.ReactNode;
};

const WarningMessage = (props: TWarningMessageProps) => (
  <Text.Detail intlMessage={props.intlMessage} tone="warning">
    {props.children}
  </Text.Detail>
);

WarningMessage.displayName = 'WarningMessage';

export default WarningMessage;
