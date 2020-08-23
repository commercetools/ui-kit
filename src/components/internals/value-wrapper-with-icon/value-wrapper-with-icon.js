import React from 'react';
import PropTypes from 'prop-types';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { components as defaultComponents } from 'react-select';

const ValueWrapperWithIcon = ({ children, ...props }) => {
  const ValueComponent =
    props.valueType === 'multiValue'
      ? defaultComponents.MultiValue
      : defaultComponents.SingleValue;

  return (
    <ValueComponent {...props}>
      <SpacingsInline alignItems="center" scale="xs">
        {props.selectProps.iconLeft &&
          React.cloneElement(props.selectProps.iconLeft, {
            size: 'medium',
          })}
        <span>{children}</span>
        {props.selectProps.iconRight &&
          React.cloneElement(props.selectProps.iconRight, {
            size: 'small',
          })}
      </SpacingsInline>
    </ValueComponent>
  );
};
ValueWrapperWithIcon.propTypes = {
  children: PropTypes.node,
  valueType: PropTypes.oneOf(['singleValue', 'multiValue']),
  selectProps: PropTypes.shape({
    iconLeft: PropTypes.node,
    iconRight: PropTypes.node,
  }),
};
ValueWrapperWithIcon.displayName = 'ValueWrapperWithIcon';

export default ValueWrapperWithIcon;

/* eslint-disable react/display-name */
const customComponents = {
  SingleValue: (props) => (
    <ValueWrapperWithIcon {...props} valueType="singleValue" />
  ),
  MultiValue: (props) => (
    <ValueWrapperWithIcon {...props} valueType="multiValue" />
  ),
};
/* eslint-enable react/display-name */

export { customComponents };
