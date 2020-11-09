import React from 'react';
import { useTheme } from 'emotion-theming';
import {
  getIconStyles,
  iconPropTypes,
} from '../../../../../src/components/internals/icons/create-styled-icon';
import ScreenUser from '../raw-components/screen-user';

const Component = (props) => {
  const theme = useTheme();
  return <ScreenUser {...props} css={getIconStyles(props, theme)} />;
};

Component.displayName = 'ScreenUserIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
