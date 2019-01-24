import React from 'react';
import styles from './required-indicator.mod.css';

type RequiredIndicatorProps = {};

const RequiredIndicator: React.FC<RequiredIndicatorProps> = () => (
  <em className={styles.highlighted}>{'*'}</em>
);
RequiredIndicator.displayName = 'RequiredIndicator';

export default RequiredIndicator;
