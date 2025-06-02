import { ReactNode } from 'react';
import type { Props as IntlMessage } from 'react-intl/src/components/message';
import Text from '@commercetools-uikit/text';

export type TIntlMessageDescriptor = IntlMessage;

export type TWarningMessageProps = {
  id?: string;
  intlMessage?: TIntlMessageDescriptor;
  children?: ReactNode;
};

const WarningMessage = (props: TWarningMessageProps) => (
  <Text.Detail id={props.id} intlMessage={props.intlMessage} tone="warning">
    {props.children}
  </Text.Detail>
);

WarningMessage.displayName = 'WarningMessage';

export default WarningMessage;
