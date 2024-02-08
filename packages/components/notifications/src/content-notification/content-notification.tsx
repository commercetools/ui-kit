import type { MessageDescriptor } from 'react-intl';

import {
  Children,
  type ReactNode,
  type MouseEvent,
  type KeyboardEvent,
} from 'react';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/react';
import AccessibleButton from '@commercetools-uikit/accessible-button';
import { designTokens } from '@commercetools-uikit/design-system';
import {
  ErrorIcon,
  WarningIcon,
  CheckBoldIcon,
  CloseBoldIcon,
  InformationIcon,
} from '@commercetools-uikit/icons';
import { filterDataAttributes, warning } from '@commercetools-uikit/utils';

export type TContentNotificationProps = {
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
   * When provided, a close button will be rendered and this callback will be
   * called when it is clicked.
   */
  onRemove?: (
    event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
  ) => void;

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

const getIconByType = (props: TContentNotificationProps) => {
  switch (props.type) {
    case 'error':
      return ErrorIcon;
    case 'info':
      return InformationIcon;
    case 'warning':
      return WarningIcon;
    default:
      return CheckBoldIcon;
  }
};

const getIconColor = (props: TContentNotificationProps) => {
  switch (props.type) {
    case 'error':
      return designTokens.colorError;
    case 'info':
      return designTokens.colorInfo;
    case 'warning':
      return designTokens.colorWarning;
    case 'success':
      return designTokens.colorPrimary;
    default:
      return '';
  }
};

const NotificationTypeIcon = (props: TContentNotificationProps) => {
  const Icon = getIconByType(props);
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
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
NotificationTypeIcon.displayName = 'NotificationTypeIcon';

const NotificationCloseIcon = (
  props: Pick<TContentNotificationProps, 'onRemove'>
) => (
  <AccessibleButton
    label="Remove"
    onClick={props.onRemove}
    css={css`
      display: flex;
      align-items: center;
      fill: ${designTokens.colorSolid};
      &:hover {
        fill: ${designTokens.colorNeutral40};
      }
    `}
  >
    <CloseBoldIcon size="medium" />
  </AccessibleButton>
);
NotificationCloseIcon.displayName = 'NotificationCloseIcon';

const getContentBorderColor = (props: TContentNotificationProps) => {
  switch (props.type) {
    case 'error':
      return designTokens.colorError85;
    case 'info':
      return designTokens.colorInfo85;
    case 'warning':
      return designTokens.colorWarning85;
    case 'success':
      return designTokens.colorPrimary85;
    default:
      return '';
  }
};

const getContainerBackgroundColor = (props: TContentNotificationProps) => {
  switch (props.type) {
    case 'error':
      return designTokens.colorError95;
    case 'info':
      return designTokens.colorInfo95;
    case 'warning':
      return designTokens.colorWarning95;
    case 'success':
      return designTokens.colorPrimary95;
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
        font-size: ${designTokens.fontSize30};
        color: ${designTokens.colorSolid};
        font-family: inherit;
        background-color: ${getContainerBackgroundColor(props)};
        border-radius: ${designTokens.borderRadius4};
        border-width: 1px;
        border-style: solid;
        border-color: ${getContentBorderColor(props)};
        padding: ${designTokens.spacing20} ${designTokens.spacing30};
      `}
    >
      <NotificationTypeIcon type={props.type} />
      <div
        css={css`
          flex-grow: 1;
          display: flex;
          align-items: center;
          padding: 0 ${designTokens.spacing30} 0 ${designTokens.spacing20};
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
      {props.onRemove && <NotificationCloseIcon onRemove={props.onRemove} />}
    </div>
  );
};
ContentNotification.displayName = 'ContentNotification';

export default ContentNotification;
