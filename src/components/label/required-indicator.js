import React from 'react';
import styles from './required-indicator.mod.css';

const RequiredIndicator = () => <em className={styles.highlighted}>{'*'}</em>;
RequiredIndicator.displayName = 'RequiredIndicator';

export default RequiredIndicator;
