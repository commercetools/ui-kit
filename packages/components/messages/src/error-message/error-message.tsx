import { ReactNode } from 'react';
import Text from '@commercetools-uikit/text';
import { filterDataAttributes } from '@commercetools-uikit/utils';

type TIntlMessageDescriptor = {
  id: string;
  description?: string | object;
  defaultMessage: string;
};

type TErrorMessageProps = {
  intlMessage?: TIntlMessageDescriptor;
  children?: ReactNode;
};

const ErrorMessage = (props: TErrorMessageProps) => (
  <Text.Detail
    intlMessage={props.intlMessage}
    tone="negative"
    {...filterDataAttributes(props)}
  >
    {props.children}
  </Text.Detail>
);
ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
