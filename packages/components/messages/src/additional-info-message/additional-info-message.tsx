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
  message: string | ReactNode | TIntlMessageDescriptor;
};

const AdditionalInfoMessage = (props: TAdditionalInfoMessageProps) => {
  // We use a `Text.Detail` component prop if the receive message is a react-intl message descriptor
  if (
    props.message &&
    typeof props.message === 'object' &&
    'id' in props.message
  ) {
    return (
      <Text.Detail id={props.id} intlMessage={props.message} tone="tertiary" />
    );
  }

  return (
    <Text.Detail id={props.id} tone="tertiary">
      {props.message}
    </Text.Detail>
  );
};

AdditionalInfoMessage.displayName = 'AdditionalInfoMessage';

export default AdditionalInfoMessage;
