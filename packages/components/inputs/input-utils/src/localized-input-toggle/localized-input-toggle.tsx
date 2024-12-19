import { css } from '@emotion/react';
import type { MessageDescriptor } from 'react-intl';
import { MouseEvent, KeyboardEvent, ReactElement } from 'react';
import { useIntl } from 'react-intl';
import FlatButton from '@commercetools-uikit/flat-button';
import { WorldIcon } from '@commercetools-uikit/icons';
import messages from '../messages/localized-input';

export type TLocalizedInputToggleProps = {
  icon?: ReactElement;
  isOpen?: boolean;
  onClick: (
    event:
      | MouseEvent<HTMLButtonElement>
      | KeyboardEvent<HTMLButtonElement>
      | boolean
  ) => void;
  isDisabled?: boolean;
  showMessage?: string | MessageDescriptor;
  hideMessage?: string | MessageDescriptor;
  remainingLocalizations?: number;
};

const LocalizedInputToggle = ({
  hideMessage = messages.hide,
  showMessage = messages.show,
  ...props
}: TLocalizedInputToggleProps) => {
  const intl = useIntl();
  const labelMessage = props.isOpen ? hideMessage : showMessage;
  const label =
    typeof labelMessage === 'string'
      ? labelMessage
      : intl.formatMessage(labelMessage, {
          remainingLanguages: props.remainingLocalizations,
        });
  return (
    <div
      css={css`
        align-self: flex-start;
      `}
    >
      <FlatButton
        icon={props.icon ? props.icon : <WorldIcon />}
        label={label}
        onClick={props.onClick}
        isDisabled={props.isDisabled}
      />
    </div>
  );
};

LocalizedInputToggle.displayName = 'LocalizedInputToggle';
export default LocalizedInputToggle;
