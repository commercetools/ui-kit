import React from 'react';
import {
  getIconStyles,
  iconPropTypes,
} from '../../internals/icons/create-styled-icon';
import RightTriangleFilled from '../raw-components/right-triangle-filled';

const Component = (props) => (
  <RightTriangleFilled
    {...props}
    css={(theme) => getIconStyles(props, theme)}
  />
);

Component.displayName = 'RightTriangleFilledIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
