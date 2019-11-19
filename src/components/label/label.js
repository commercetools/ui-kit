import React from 'react';
import PropTypes from 'prop-types';
import { Body } from '@commercetools-uikit/text';
import RequiredIndicator from './required-indicator';

const Label = props => (
  <label htmlFor={props.htmlFor}>
    <Body tone={props.tone} isBold={props.isBold}>
      {props.children}
      {props.isRequiredIndicatorVisible && <RequiredIndicator />}
    </Body>
  </label>
);

Label.displayName = 'Label';

Label.propTypes = {
  // FIXME: Add proper tone when tones are refactored
  tone: PropTypes.oneOf(['primary', 'inverted']),
  children: PropTypes.node.isRequired,
  isBold: PropTypes.bool,
  isRequiredIndicatorVisible: PropTypes.bool,
  htmlFor: PropTypes.string,
};

export default Label;
