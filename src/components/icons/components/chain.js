import React from 'react';
import { getIconStyles, iconPropTypes } from '../create-styled-icon';
import Chain from '../raw-components/chain';

const Component = props => (
  <Chain {...props} css={theme => getIconStyles(props, theme)} />
);

Component.displayName = 'ChainIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
