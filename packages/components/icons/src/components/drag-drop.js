import React from 'react';
import {
  getIconStyles,
  iconPropTypes,
} from '../../../../../src/components/internals/icons/create-styled-icon';
import DragDrop from '../raw-components/drag-drop';

const Component = (props) => (
  <DragDrop {...props} css={(theme) => getIconStyles(props, theme)} />
);

Component.displayName = 'DragDropIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
