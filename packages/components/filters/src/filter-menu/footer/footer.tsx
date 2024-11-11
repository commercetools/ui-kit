import { type ReactNode, type MouseEvent, type KeyboardEvent } from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import FlatButton from '@commercetools-uikit/flat-button';
import { CloseBoldIcon } from '@commercetools-uikit/icons';
import { useIntl } from 'react-intl';
import messages from './messages';

type TFooterProps = {
  /**
   * controls whether `apply` button in Menu Body Footer is displayed
   */
  renderApplyButton?: () => ReactNode;
  /**
   * controls whether a `clear all` button in Menu Body Footer is displayed
   */
  onClearRequest?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
  ) => void;
};

const footerContainerStyles = css`
  border-top: ${designTokens.borderWidth1} solid ${designTokens.colorNeutral90};

  padding-top: ${designTokens.spacing20};

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 100%;
  div:last-of-type {
    display: flex;
    justify-content: flex-end;
  }
`;

const Footer = ({ renderApplyButton, onClearRequest }: TFooterProps) => {
  const intl = useIntl();
  if (!renderApplyButton && !onClearRequest) return null;

  return (
    <footer css={footerContainerStyles}>
      <div>{renderApplyButton && renderApplyButton()}</div>
      <div>
        {onClearRequest && (
          <FlatButton
            icon={<CloseBoldIcon />}
            tone="secondary"
            onClick={onClearRequest}
            label={intl.formatMessage(messages.clearAllButtonLabel)}
          />
        )}
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
export default Footer;
