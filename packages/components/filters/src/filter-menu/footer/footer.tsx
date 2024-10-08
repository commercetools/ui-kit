import FlatButton from '@commercetools-uikit/flat-button';
import messages from './messages';
import { CloseBoldIcon } from '@commercetools-uikit/icons';
import { ReactNode } from 'react';
import { css } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
import { useIntl } from 'react-intl';

type TFooterProps = {
  /**
   * controls whether `apply` button in Menu Body Footer is displayed
   */
  renderApplyButton?: () => ReactNode;
  /**
   * controls whether a `clear all` button in Menu Body Footer is displayed
   */
  onClearAllRequest?: () => void;
};

const footerContainerStyles = css`
  border-top: ${designTokens.borderWidth1} solid ${designTokens.colorNeutral90};
  margin-bottom: ${designTokens.spacing20};
  padding-top: ${designTokens.spacing20};

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  div:last-of-type {
    display: flex;
    justify-content: flex-end;
  }
`;

const Footer = ({ renderApplyButton, onClearAllRequest }: TFooterProps) => {
  const intl = useIntl();
  if (!renderApplyButton && !onClearAllRequest) return null;

  return (
    <div css={footerContainerStyles}>
      <div>{renderApplyButton && renderApplyButton()}</div>
      <div>
        {onClearAllRequest && (
          <FlatButton
            icon={<CloseBoldIcon />}
            tone="secondary"
            onClick={onClearAllRequest}
            label={intl.formatMessage(messages.clearAllButtonLabel)}
          />
        )}
      </div>
    </div>
  );
};

Footer.displayName = 'Footer';
export default Footer;
