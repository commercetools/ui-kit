import { ReactNode } from 'react';
import Text from '@commercetools-uikit/text';

export type TIntlMessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage: string;
  values?: Record<string, ReactNode>;
};

export type TAdditionalInfoMessageProps = {
  id?: string;
  intlMessage?: TIntlMessageDescriptor;
  children?: ReactNode;
};

const AdditionalInfoMessage = (props: TAdditionalInfoMessageProps) => (
  <Text.Detail id={props.id} intlMessage={props.intlMessage} tone="tertiary">
    {props.children}
  </Text.Detail>
);

AdditionalInfoMessage.displayName = 'AdditionalInfoMessage';

export default AdditionalInfoMessage;
