import React from 'react';
import { useTheme } from 'emotion-theming';
import {
  getIconStyles,
  iconPropTypes,
} from '../../../../../src/components/internals/icons/create-styled-icon';
import Drag from '../raw-components/drag';

const Component = (props) => {
  const theme = useTheme();
  return <Drag {...props} css={getIconStyles(props, theme)} />;
};

Component.displayName = 'DragIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
