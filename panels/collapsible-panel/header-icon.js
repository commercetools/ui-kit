import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { AngleDownIcon, AngleRightIcon } from '../../icons';
import styles from './collapsible-panel.mod.css';

const getArrowTheme = tone => (tone === 'urgent' ? 'white' : 'black');

const HeaderIcon = props => (
  <div
    className={classnames(
      styles['header-icon'],
      styles[`header-icon-${props.tone}`],
      {
        [styles['header-icon-small']]: props.size === 'small',
      }
    )}
  >
    {props.isClosed ? (
      <AngleRightIcon theme={getArrowTheme(props.tone)} size={props.size} />
    ) : (
      <AngleDownIcon theme={getArrowTheme(props.tone)} size={props.size} />
    )}
  </div>
);

HeaderIcon.displayName = 'HeaderIcon';
HeaderIcon.propTypes = {
  tone: PropTypes.oneOf(['urgent', 'primary']),
  isClosed: PropTypes.bool.isRequired,
  size: PropTypes.string.isRequired,
};

HeaderIcon.defaultProps = {
  tone: 'primary',
};

export default HeaderIcon;
