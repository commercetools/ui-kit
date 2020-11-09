import React from 'react';
import { useTheme } from 'emotion-theming';
import { getIconStyles, iconPropTypes } from '../create-styled-icon';
import RadioOptionChecked from '../raw-components/radio-option-checked';

const Component = (props) => {
  const theme = useTheme();
  return <RadioOptionChecked {...props} css={getIconStyles(props, theme)} />;
};

Component.displayName = 'RadioOptionCheckedIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
