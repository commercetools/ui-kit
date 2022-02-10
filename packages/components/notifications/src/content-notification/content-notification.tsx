import type { MessageDescriptor } from 'react-intl';

import { Children, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import {
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  CheckBoldIcon,
} from '@commercetools-uikit/icons';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';

type TContentNotificationProps = {
  /**
   * Determines the color/type of notification.
   */
  type: 'error' | 'info' | 'warning' | 'success';

  /**
   * An `intl` message object that will be rendered with `FormattedMessage`.
   * <br />
   * Required if `children` is not provided.
   */
  intlMessage?: MessageDescriptor & {
    values?: Record<string, React.ReactNode>;
  };

  /**
   * The content of the notification.
   * <br />
   * Required if `intlMessage` is not provided.
   */
  children?: ReactNode;
};

const warnIfMissingContent = (props: TContentNotificationProps) => {
  const hasContent =
    Boolean(props.intlMessage) || Boolean(Children.count(props.children));

  warning(
    hasContent,
    [
      'Warning: Failed prop type:',
      `The prop \`intlMessage\` is marked as required in \`Link\``,
      'but its value is `undefined`',
    ].join(' ')
  );
  warning(
    hasContent,
    [
      'Warning: Failed prop type:',
      `The prop \`children\` is marked as required in \`Link\``,
      'but its value is `undefined`',
    ].join(' ')
  );
};

const getIconContainerBackgroundColour = (props: TContentNotificationProps) => {
  switch (props.type) {
    case 'error':
      return vars.colorError;
    case 'info':
      return vars.colorInfo;
    case 'warning':
      return vars.colorWarning;
    case 'success':
      return vars.colorPrimary;
    default:
      return '';
  }
};

const getIconByType = (props: TContentNotificationProps) => {
  switch (props.type) {
    case 'error':
      return ErrorIcon;
    case 'info':
      return InfoIcon;
    case 'warning':
      return WarningIcon;
    default:
      return CheckBoldIcon;
  }
};

const NotificationIcon = (props: TContentNotificationProps) => {
  const Icon = getIconByType(props);

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        border-radius: ${vars.borderRadius6} 0 0 ${vars.borderRadius6};
        border-width: 0;
        padding: ${vars.spacingS} ${vars.spacingM};
        background-color: ${getIconContainerBackgroundColour(props)};
        svg {
          margin: 0 -3px;
        }
      `}
    >
      <Icon color="surface" />
    </div>
  );
};
NotificationIcon.displayName = 'NotificationIcon';

const getContentBorderColor = (props: TContentNotificationProps) => {
  switch (props.type) {
    case 'error':
      return vars.colorError;
    case 'info':
      return vars.colorInfo;
    case 'warning':
      return vars.colorWarning;
    case 'success':
      return vars.colorPrimary;
    default:
      return '';
  }
};

const ContentNotification = (props: TContentNotificationProps) => {
  warnIfMissingContent(props);

  return (
    <div
      {...filterDataAttributes(props)}
      css={css`
        display: flex;
        align-items: stretch;
        text-align: left;
        word-break: break-word;
        hyphens: auto;
        font-size: ${vars.fontSizeDefault};
        color: ${vars.colorSolid};
        font-family: inherit;
      `}
    >
      <NotificationIcon type={props.type} />
      <div
        css={css`
          flex-grow: 1;
          display: flex;
          align-items: center;
          padding: ${vars.spacingS};
          background: ${vars.colorSurface};
          border-radius: 0 ${vars.borderRadius6} ${vars.borderRadius6} 0;
          border-width: 1px;
          border-style: solid;
          border-color: ${getContentBorderColor(props)};
        `}
      >
        {props.intlMessage ? (
          <div>
            <FormattedMessage {...props.intlMessage} />
          </div>
        ) : (
          props.children
        )}
      </div>
    </div>
  );
};
ContentNotification.displayName = 'ContentNotification';

export default ContentNotification;
