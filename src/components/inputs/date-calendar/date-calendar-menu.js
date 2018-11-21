import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './date-calendar-menu.mod.css';

export default class DateCalendarMenu extends Component {
  static displayName = 'DateCalendarMenu';
  static propTypes = {
    children: PropTypes.node.isRequired,
    hasFooter: PropTypes.node,
  };
  render() {
    return (
      <div
        {...this.props}
        className={this.props.hasFooter ? styles.menuWithFooter : styles.menu}
      >
        {this.props.children}
        {this.props.footer}
      </div>
    );
  }
}
