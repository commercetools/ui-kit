import { ReactNode } from 'react';
import Text from '@commercetools-uikit/text';

export type TIntlMessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage: string;
  values?: Record<string, ReactNode>;
};

export type TWarningMessageProps = {
  id?: string;
  intlMessage?: TIntlMessageDescriptor;
  children?: ReactNode;
};

const WarningMessage = (props: TWarningMessageProps) => (
  <Text.Detail intlMessage={props.intlMessage} tone="warning">
    {props.children}
  </Text.Detail>
);

WarningMessage.displayName = 'WarningMessage';

export default WarningMessage;
