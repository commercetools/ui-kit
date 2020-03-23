import React from 'react';
import { getIconStyles, iconPropTypes } from '../create-styled-icon';
import Underline from '../raw-components/underline';

const Component = (props) => (
  <Underline {...props} css={(theme) => getIconStyles(props, theme)} />
);

Component.displayName = 'UnderlineIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
