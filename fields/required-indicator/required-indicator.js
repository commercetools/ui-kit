// NOTE: this component is duplicated in `app-shell/from-core`.
// It's a temporary solution to avoid importing `core` components from AppShell.
// Be careful when you change something here, remember to duplicate the changes.
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './required-indicator.mod.css';

const RequiredIndicator = ({ uncolored }) => (
  <em className={classnames({ [styles.colored]: !uncolored })}>{'*'}</em>
);
RequiredIndicator.displayName = 'RequiredIndicator';
RequiredIndicator.propTypes = {
  uncolored: PropTypes.bool,
};

export default RequiredIndicator;
