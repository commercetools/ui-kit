import React from 'react';
import { getIconStyles, iconPropTypes } from '../create-styled-icon';
import Redo from '../raw-components/redo';

const Component = (props) => (
  <Redo {...props} css={(theme) => getIconStyles(props, theme)} />
);

Component.displayName = 'RedoIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
