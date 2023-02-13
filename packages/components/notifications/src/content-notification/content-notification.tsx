import type { MessageDescriptor } from 'react-intl';

import { Children, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/react';
import { designTokens, useTheme } from '@commercetools-uikit/design-system';
import {
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  CheckBoldIcon,
  InformationIcon,
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
    values?: Record<string, ReactNode>;
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
      return designTokens.backgroundColorForContentNotificationIconWhenError;
    case 'info':
      return designTokens.backgroundColorForContentNotificationIconWhenInfo;
    case 'warning':
      return designTokens.backgroundColorForContentNotificationIconWhenWarning;
    case 'success':
      return designTokens.backgroundColorForContentNotificationIconWhenSuccess;
    default:
      return '';
  }
};

const getIconByType = (
  props: TContentNotificationProps,
  isNewTheme: boolean
) => {
  switch (props.type) {
    case 'error':
      return ErrorIcon;
    case 'info':
      return isNewTheme ? InformationIcon : InfoIcon;
    case 'warning':
      return WarningIcon;
    default:
      return CheckBoldIcon;
  }
};

const getIconContainerBorderColor = (props: TContentNotificationProps) => {
  switch (props.type) {
    case 'error':
      return designTokens.borderColorForContentNotificationWhenError;
    case 'info':
      return designTokens.borderColorForContentNotificationWhenInfo;
    case 'warning':
      return designTokens.borderColorForContentNotificationWhenWarning;
    case 'success':
      return designTokens.borderColorForContentNotificationWhenSuccess;
    default:
      return '';
  }
};

const getIconColor = (props: TContentNotificationProps) => {
  switch (props.type) {
    case 'error':
      return designTokens.fontColorForContentNotificationIconWhenError;
    case 'info':
      return designTokens.fontColorForContentNotificationIconWhenInfo;
    case 'warning':
      return designTokens.fontColorForContentNotificationIconWhenWarning;
    case 'success':
      return designTokens.fontColorForContentNotificationIconWhenSuccess;
    default:
      return '';
  }
};

const NotificationIcon = (props: TContentNotificationProps) => {
  const { isNewTheme } = useTheme();
  const Icon = getIconByType(props, isNewTheme);
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        border-radius: ${designTokens.borderRadiusForContentNotificationIcon};
        border-width: ${designTokens.borderWidthForContentNotificationIcon};
        border-style: solid;
        border-color: ${getIconContainerBorderColor(props)};
        border-right: 0;
        padding: ${designTokens.paddingForContentNotificationIcon};
        background-color: ${getIconContainerBackgroundColour(props)};
        fill: ${getIconColor(props)};
        svg {
          margin: 0 -3px;
        }
      `}
    >
      <Icon />
    </div>
  );
};
NotificationIcon.displayName = 'NotificationIcon';

const getContentBorderColor = (props: TContentNotificationProps) => {
  switch (props.type) {
    case 'error':
      return designTokens.borderColorForContentNotificationWhenError;
    case 'info':
      return designTokens.borderColorForContentNotificationWhenInfo;
    case 'warning':
      return designTokens.borderColorForContentNotificationWhenWarning;
    case 'success':
      return designTokens.borderColorForContentNotificationWhenSuccess;
    default:
      return '';
  }
};

const getContainerBackgroundColor = (props: TContentNotificationProps) => {
  switch (props.type) {
    case 'error':
      return designTokens.backgroundColorForContentNotificationWhenError;
    case 'info':
      return designTokens.backgroundColorForContentNotificationWhenInfo;
    case 'warning':
      return designTokens.backgroundColorForContentNotificationWhenWarning;
    case 'success':
      return designTokens.backgroundColorForContentNotificationWhenSuccess;
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
        font-size: ${designTokens.fontSizeForContentNotification};
        color: ${designTokens.fontColorForContentNotification};
        font-family: inherit;
      `}
    >
      <NotificationIcon type={props.type} />
      <div
        css={css`
          flex-grow: 1;
          display: flex;
          align-items: center;
          padding: ${designTokens.paddingForContentNotification};
          background-color: ${getContainerBackgroundColor(props)};
          border-radius: ${designTokens.borderRadiusForContentNotification};
          border-width: 1px;
          border-style: solid;
          border-color: ${getContentBorderColor(props)};
          border-left-width: ${designTokens.borderLeftWidthForContentNotification};
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
