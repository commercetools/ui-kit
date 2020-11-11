import React from 'react';
import { useTheme } from 'emotion-theming';
import {
  getIconStyles,
  iconPropTypes,
} from '../../../../../src/components/internals/icons/create-styled-icon';
import AngleUp from '../raw-components/angle-up';

const Component = (props) => {
  const theme = useTheme();
  return <AngleUp {...props} css={getIconStyles(props, theme)} />;
};

Component.displayName = 'AngleUpIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
