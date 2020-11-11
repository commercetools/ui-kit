import React from 'react';
import { useTheme } from 'emotion-theming';
import {
  getIconStyles,
  iconPropTypes,
} from '../../../../../src/components/internals/icons/create-styled-icon';
import CheckInactive from '../raw-components/check-inactive';

const Component = (props) => {
  const theme = useTheme();
  return <CheckInactive {...props} css={getIconStyles(props, theme)} />;
};

Component.displayName = 'CheckInactiveIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
