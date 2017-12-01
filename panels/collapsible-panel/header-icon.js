import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { AngleDownIcon, AngleRightIcon } from '../../icons';
import styles from './collapsible-panel.mod.css';

const getArrowTheme = tone => (tone === 'urgent' ? 'white' : 'green');

const HeaderIcon = props => (
  <div
    className={classnames(
      styles['header-icon'],
      styles[`header-icon-${props.tone}`]
    )}
  >
    {props.isClosed ? (
      <AngleRightIcon theme={getArrowTheme(props.tone)} size="small" />
    ) : (
      <AngleDownIcon theme={getArrowTheme(props.tone)} size="small" />
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
