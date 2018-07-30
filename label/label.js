import React from 'react';
import PropTypes from 'prop-types';
import Text from '../typography/text';
import RequiredIndicator from './required-indicator';
import styles from './label.mod.css';

const Label = props => (
  <label className={styles.label} htmlFor={props.htmlFor}>
    <Text.Body tone={props.tone} isBold={props.isBold}>
      {props.children}
    </Text.Body>
    {props.isRequiredIndicatorVisible && <RequiredIndicator />}
  </label>
);

Label.propTypes = {
  // FIXME: Add proper tone when tones are refactored
  tone: PropTypes.oneOf(['primary', 'inverted']),
  children: PropTypes.node.isRequired,
  isBold: PropTypes.bool,
  isRequiredIndicatorVisible: PropTypes.bool,
  htmlFor: PropTypes.string,
};

Label.defaultProps = {
  isBold: false,
};

export default Label;
