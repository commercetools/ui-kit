import React from 'react';
import { useTheme } from 'emotion-theming';
import { getIconStyles, iconPropTypes } from '../create-styled-icon';
import Subscript from '../raw-components/subscript';

const Component = (props) => {
  const theme = useTheme();
  return <Subscript {...props} css={getIconStyles(props, theme)} />;
};

Component.displayName = 'SubscriptIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
