import React from 'react';
import { getIconStyles, iconPropTypes } from '../create-styled-icon';
import Checked from '../raw-components/checked';

const Component = (props) => (
  <Checked {...props} css={(theme) => getIconStyles(props, theme)} />
);

Component.displayName = 'CheckedIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
