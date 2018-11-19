import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ErrorIcon, WarningIcon, InfoIcon, SuccessIcon } from '../../icons';
import filterDataAttributes from '../../../utils/filter-data-attributes';
import styles from './content-notification.mod.css';

class NotificationIcon extends React.PureComponent {
  static displayName = 'NotificationIcon';
  static propTypes = {
    type: PropTypes.oneOf(['error', 'info', 'warning', 'success']).isRequired,
    theme: PropTypes.string.isRequired,
  };

  render() {
    const Icon = do {
      if (this.props.type === 'error') ErrorIcon;
      else if (this.props.type === 'info') InfoIcon;
      else if (this.props.type === 'warning') WarningIcon;
      else SuccessIcon;
    };

    return (
      <div className={styles.iconContainer}>
        <Icon theme="white" />
      </div>
    );
  }
}

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
        className={classnames(styles.notification, styles[this.props.type])}
      >
        <NotificationIcon type={this.props.type} theme="white" />
        <div className={styles.content}>{this.props.children}</div>
      </div>
    );
  }
}
