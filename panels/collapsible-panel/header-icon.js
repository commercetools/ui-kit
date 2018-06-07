import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { AngleDownIcon, AngleRightIcon } from '../../icons';
import styles from './collapsible-panel.mod.css';

const HeaderIcon = props => (
  <div
    className={classnames(
      styles['header-icon'],
      styles[`header-icon-${props.tone}`]
    )}
  >
    {props.isClosed ? (
      <AngleRightIcon theme="white" size="small" />
    ) : (
      <AngleDownIcon theme="white" size="small" />
    )}
  </div>
);
HeaderIcon.displayName = 'HeaderIcon';
HeaderIcon.propTypes = {
  tone: PropTypes.oneOf(['urgent', 'primary']),
  isClosed: PropTypes.bool.isRequired,
};

HeaderIcon.defaultProps = {
  tone: 'primary',
};

export default HeaderIcon;
