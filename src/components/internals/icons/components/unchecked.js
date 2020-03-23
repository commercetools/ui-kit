import React from 'react';
import { getIconStyles, iconPropTypes } from '../create-styled-icon';
import Unchecked from '../raw-components/unchecked';

const Component = (props) => (
  <Unchecked {...props} css={(theme) => getIconStyles(props, theme)} />
);

Component.displayName = 'UncheckedIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
