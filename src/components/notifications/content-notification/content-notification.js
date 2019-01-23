import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { ErrorIcon, WarningIcon, InfoIcon, CheckBoldIcon } from '../../icons';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import vars from '../../../../materials/custom-properties.json';

const getIconContainerBackgroundColour = props => {
  switch (props.type) {
    case 'error':
      return vars['--color-red'];
    case 'info':
      return vars['--color-blue'];
    case 'warning':
      return vars['--color-orange'];
    case 'success':
      return vars['--color-green'];
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
          border-radius: ${vars['--border-radius-6']} 0 0
            ${vars['--border-radius-6']};
          border-width: 0;
          padding: ${vars['--spacing-8']} ${vars['--spacing-16']};
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
      return vars['--color-red'];
    case 'info':
      return vars['--color-blue'];
    case 'warning':
      return vars['--color-orange'];
    case 'success':
      return vars['--color-green'];
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
          font-size: ${vars['--font-size-default']};
          color: ${vars['--color-black']};
          font-family: ${vars['--font-family-default']};
        `}
      >
        <NotificationIcon type={this.props.type} theme="white" />
        <div
          css={css`
            flex-grow: 1;
            display: flex;
            align-items: center;
            padding: ${vars['--spacing-8']};
            background: ${vars['--color-white']};
            border-radius: 0 ${vars['--border-radius-6']}
              ${vars['--border-radius-6']} 0;
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
