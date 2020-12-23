/* eslint-disable max-classes-per-file */
import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
import {
  ErrorIcon,
  WarningIcon,
  InfoIcon,
  CheckBoldIcon,
} from '@commercetools-uikit/icons';
import { filterDataAttributes } from '@commercetools-uikit/utils';
import { FormattedMessage } from 'react-intl';
import requiredIf from 'react-required-if';

const getIconContainerBackgroundColour = (props) => {
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

const getIconByType = (type) => {
  switch (type) {
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

const NotificationIcon = (props) => {
  const Icon = getIconByType(props.type);
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
NotificationIcon.propTypes = {
  type: PropTypes.oneOf(['error', 'info', 'warning', 'success']).isRequired,
  theme: PropTypes.string.isRequired,
};

const getContentBorderColor = (props) => {
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

const ContentNotification = (props) => (
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
    <NotificationIcon type={props.type} theme="white" />
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
ContentNotification.displayName = 'ContentNotification';
ContentNotification.propTypes = {
  type: PropTypes.oneOf(['error', 'info', 'warning', 'success']).isRequired,
  children: requiredIf(PropTypes.node, (props) => !props.intlMessage),
  intlMessage: requiredIf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      description: PropTypes.string,
      defaultMessage: PropTypes.string.isRequired,
    }),
    (props) => !React.Children.count(props.children)
  ),
};

export { ContentNotification };
