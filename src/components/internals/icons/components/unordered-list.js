import React from 'react';
import { getIconStyles, iconPropTypes } from '../create-styled-icon';
import UnorderedList from '../raw-components/unordered-list';

const Component = (props) => (
  <UnorderedList {...props} css={(theme) => getIconStyles(props, theme)} />
);

Component.displayName = 'UnorderedListIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
