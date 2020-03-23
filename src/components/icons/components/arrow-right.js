import React from 'react';
import {
  getIconStyles,
  iconPropTypes,
} from '../../internals/icons/create-styled-icon';
import ArrowRight from '../raw-components/arrow-right';

const Component = (props) => (
  <ArrowRight {...props} css={(theme) => getIconStyles(props, theme)} />
);

Component.displayName = 'ArrowRightIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
