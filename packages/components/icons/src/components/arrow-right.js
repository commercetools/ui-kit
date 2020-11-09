import React from 'react';
import { useTheme } from 'emotion-theming';
import {
  getIconStyles,
  iconPropTypes,
} from '../../../../../src/components/internals/icons/create-styled-icon';
import ArrowRight from '../raw-components/arrow-right';

const Component = (props) => {
  const theme = useTheme();
  return <ArrowRight {...props} css={getIconStyles(props, theme)} />;
};

Component.displayName = 'ArrowRightIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
