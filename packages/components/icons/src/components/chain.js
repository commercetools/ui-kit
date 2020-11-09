import React from 'react';
import { useTheme } from 'emotion-theming';
import {
  getIconStyles,
  iconPropTypes,
} from '../../../../../src/components/internals/icons/create-styled-icon';
import Chain from '../raw-components/chain';

const Component = (props) => {
  const theme = useTheme();
  return <Chain {...props} css={getIconStyles(props, theme)} />;
};

Component.displayName = 'ChainIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
