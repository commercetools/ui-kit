import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { customProperties } from '@commercetools-uikit/design-system';
import { components as defaultComponents } from 'react-select';

const getDefaultComponent = (type) => {
  if (type === 'singleValue') return defaultComponents.SingleValue;
  if (type === 'placeholder') return defaultComponents.Placeholder;
  return React.Fragment;
};

const WrapperWithIcon = ({ children, ...props }) => {
  const Component = getDefaultComponent(props.type);

  return (
    <React.Fragment>
      {props.selectProps.iconLeft &&
        React.cloneElement(props.selectProps.iconLeft, {
          size: 'big',
        })}
      <span
        // react-select uses absolute positioning for the SingleValue/Placeholder
        // the icon has a fixed size of 24px (== SpacingsXl), therefore we can use a fixed margin
        // spacingsXs is the margin between the icon and value
        css={css`
          margin-left: ${customProperties.spacingXl +
          customProperties.spacingXs};
        `}
      >
        <Component {...props}>{children}</Component>
      </span>
    </React.Fragment>
  );
};
WrapperWithIcon.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['singleValue', 'placeholder']),
  selectProps: PropTypes.shape({
    iconLeft: PropTypes.node,
  }),
};
WrapperWithIcon.displayName = 'WrapperWithIcon';

export default WrapperWithIcon;

/* eslint-disable react/display-name */
const customComponents = {
  SingleValue: (props) => <WrapperWithIcon {...props} type="singleValue" />,
  Placeholder: (props) => <WrapperWithIcon {...props} type="placeholder" />,
};
/* eslint-enable react/display-name */

export { customComponents };
