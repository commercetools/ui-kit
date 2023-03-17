import { ReactNode } from 'react';
import Text from '@commercetools-uikit/text';
import { filterDataAttributes } from '@commercetools-uikit/utils';

export type TIntlMessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage: string;
  values?: Record<string, ReactNode>;
};

export type TErrorMessageProps = {
  id?: string;
  intlMessage?: TIntlMessageDescriptor;
  children?: ReactNode;
};

const ErrorMessage = (props: TErrorMessageProps) => (
  <Text.Detail
    id={props.id}
    intlMessage={props.intlMessage}
    tone="negative"
    {...filterDataAttributes(props)}
  >
    {props.children}
  </Text.Detail>
);
ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
