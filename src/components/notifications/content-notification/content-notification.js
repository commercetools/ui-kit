import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { ErrorIcon, WarningIcon, InfoIcon, CheckBoldIcon } from '../../icons';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import vars from '../../../../materials/custom-properties';

const getIconContainerBackgroundColour = props => {
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

const getIconByType = type => {
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

class NotificationIcon extends React.PureComponent {
  static displayName = 'NotificationIcon';
  static propTypes = {
    type: PropTypes.oneOf(['error', 'info', 'warning', 'success']).isRequired,
    theme: PropTypes.string.isRequired,
  };

  render() {
    const Icon = getIconByType(this.props.type);
    return (
      <div
        css={css`
          display: flex;
          align-items: center;
          border-radius: ${vars.borderRadius6} 0 0 ${vars.borderRadius6};
          border-width: 0;
          padding: ${vars.spacingS} ${vars.spacingM};
          background-color: ${getIconContainerBackgroundColour(this.props)};
          svg {
            margin: 0 -3px;
          }
        `}
      >
        <Icon theme="white" />
      </div>
    );
  }
}

const getContentBorderColor = props => {
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

export default class ContentNotification extends React.PureComponent {
  static displayName = 'ContentNotification';

  static propTypes = {
    type: PropTypes.oneOf(['error', 'info', 'warning', 'success']).isRequired,
    children: PropTypes.node,
  };

  render() {
    return (
      <div
        {...filterDataAttributes(this.props)}
        css={css`
          display: flex;
          align-items: stretch;
          text-align: left;
          word-break: break-word;
          hyphens: auto;
          font-size: ${vars.fontSizeDefault};
          color: ${vars.colorSolid};
          font-family: ${vars.fontFamilyDefault};
        `}
      >
        <NotificationIcon type={this.props.type} theme="white" />
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
            border-color: ${getContentBorderColor(this.props)};
          `}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}
