import React from 'react';
import {
  getIconStyles,
  iconPropTypes,
} from '../../internals/icons/create-styled-icon';
import Minimize from '../raw-components/minimize';

const Component = (props) => (
  <Minimize {...props} css={(theme) => getIconStyles(props, theme)} />
);

Component.displayName = 'MinimizeIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
