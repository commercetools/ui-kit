import React from 'react';
import {
  getIconStyles,
  iconPropTypes,
} from '../../internals/icons/create-styled-icon';
import Clipboard from '../raw-components/clipboard';

const Component = (props) => (
  <Clipboard {...props} css={(theme) => getIconStyles(props, theme)} />
);

Component.displayName = 'ClipboardIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
