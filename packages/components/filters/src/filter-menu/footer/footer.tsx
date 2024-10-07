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

const mainContainerStyles = css`
  height: auto;
  width: 100%;
   };
`;
const footerContainerStyles = css`
  /* horizontal divider */
  height: ${designTokens.borderWidth1};
  background-color: ${designTokens.colorNeutral90};
  margin-top: ${designTokens.spacingS};

  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  & > div:first-of-type {
    margin-top: ${designTokens.spacingS};
  }

  & > div:last-of-type {
    margin-top: ${designTokens.spacingS};
    display: flex;
    justify-content: flex-end;
  }
`;

const Footer = ({ renderApplyButton, onClearAllRequest }: TFooterProps) => {
  const intl = useIntl();
  if (!renderApplyButton && !onClearAllRequest) return null;

  return (
    <div css={mainContainerStyles}>
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
    </div>
  );
};

Footer.displayName = 'Footer';
export default Footer;
