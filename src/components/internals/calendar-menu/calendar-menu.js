import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import classnames from 'classnames';
import styles from './calendar-menu.mod.css';

export default class DateCalendarMenu extends Component {
  static displayName = 'DateCalendarMenu';
  static propTypes = {
    children: PropTypes.node.isRequired,
    hasFooter: PropTypes.bool,
    hasError: PropTypes.bool,
    hasWarning: PropTypes.bool,
  };
  render() {
    return (
      <div
        {...omit(this.props, ['hasFooter', 'hasError', 'hasWarning'])}
        className={classnames(
          this.props.hasFooter ? styles.menuWithFooter : styles.menu,
          {
            [styles.error]: this.props.hasError,
            [styles.warning]: this.props.hasWarning,
          }
        )}
      >
        {this.props.children}
        {this.props.footer}
      </div>
    );
  }
}
