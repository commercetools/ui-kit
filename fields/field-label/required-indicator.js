import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './required-indicator.mod.css';

const RequiredIndicator = props => (
  <em className={classnames({ [styles.highlighted]: !props.isMuted })}>
    {'*'}
  </em>
);
RequiredIndicator.displayName = 'RequiredIndicator';
RequiredIndicator.propTypes = {
  isMuted: PropTypes.bool,
};
RequiredIndicator.defaultProps = {
  isMuted: false,
};

export default RequiredIndicator;
