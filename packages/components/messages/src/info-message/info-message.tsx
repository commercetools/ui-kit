import { ReactNode } from 'react';
import Text from '@commercetools-uikit/text';

export type TIntlMessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage: string;
  values?: Record<string, ReactNode>;
};

export type TInfoMessageProps = {
  id?: string;
  intlMessage?: TIntlMessageDescriptor;
  children?: ReactNode;
};

const InfoMessage = (props: TInfoMessageProps) => (
  <Text.Detail id={props.id} intlMessage={props.intlMessage} tone="tertiary">
    {props.children}
  </Text.Detail>
);

InfoMessage.displayName = 'InfoMessage';

export default InfoMessage;
