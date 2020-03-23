import React from 'react';
import {
  getIconStyles,
  iconPropTypes,
} from '../../internals/icons/create-styled-icon';
import Filter from '../raw-components/filter';

const Component = (props) => (
  <Filter {...props} css={(theme) => getIconStyles(props, theme)} />
);

Component.displayName = 'FilterIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
