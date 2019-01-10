import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { AngleDownIcon, AngleRightIcon } from '../../icons';
import styles from './collapsible-panel.mod.css';

const getArrowTheme = ({ tone, isDisabled }) => do {
  if (isDisabled) 'grey';
  else if (tone === 'urgent') 'white';
  else 'black';
};

const HeaderIcon = props => (
  <div
    className={classnames(
      styles['header-icon'],
      styles[`header-icon-${props.tone}`],
      {
        [styles['header-icon-disabled']]: props.isDisabled,
        [styles['header-icon-small']]: props.size === 'small',
      }
    )}
  >
    {props.isClosed ? (
      <AngleRightIcon
        theme={getArrowTheme({
          tone: props.tone,
          isDisabled: props.isDisabled,
        })}
        size={props.size}
      />
    ) : (
      <AngleDownIcon
        theme={getArrowTheme({
          tone: props.tone,
          isDisabled: props.isDisabled,
        })}
        size={props.size}
      />
    )}
  </div>
);

HeaderIcon.displayName = 'HeaderIcon';
HeaderIcon.propTypes = {
  tone: PropTypes.oneOf(['urgent', 'primary']),
  isClosed: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  size: PropTypes.string.isRequired,
};

HeaderIcon.defaultProps = {
  tone: 'primary',
};

export default HeaderIcon;
