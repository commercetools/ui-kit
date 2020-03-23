import React from 'react';
import { getIconStyles, iconPropTypes } from '../create-styled-icon';
import Subscript from '../raw-components/subscript';

const Component = (props) => (
  <Subscript {...props} css={(theme) => getIconStyles(props, theme)} />
);

Component.displayName = 'SubscriptIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
