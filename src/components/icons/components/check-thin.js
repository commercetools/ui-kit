import React from 'react';
import {
  getIconStyles,
  iconPropTypes,
} from '../../internals/icons/create-styled-icon';
import CheckThin from '../raw-components/check-thin';

const Component = (props) => (
  <CheckThin {...props} css={(theme) => getIconStyles(props, theme)} />
);

Component.displayName = 'CheckThinIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
