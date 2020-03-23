import React from 'react';
import {
  getIconStyles,
  iconPropTypes,
} from '../../internals/icons/create-styled-icon';
import Paperclip from '../raw-components/paperclip';

const Component = (props) => (
  <Paperclip {...props} css={(theme) => getIconStyles(props, theme)} />
);

Component.displayName = 'PaperclipIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
