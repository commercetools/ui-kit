import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';
import styles from './date-calendar-menu.mod.css';

export default class DateCalendarMenu extends Component {
  static displayName = 'DateCalendarMenu';
  static propTypes = {
    children: PropTypes.node.isRequired,
    hasFooter: PropTypes.bool,
  };
  render() {
    return (
      <div
        {...omit(this.props, ['hasFooter'])}
        className={this.props.hasFooter ? styles.menuWithFooter : styles.menu}
      >
        {this.props.children}
        {this.props.footer}
      </div>
    );
  }
}
