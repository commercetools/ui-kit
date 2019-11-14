import React from 'react';
import { css } from '@emotion/core';
import { getColor, getSizeStyle, iconPropTypes } from '../create-styled-icon';
import CaretDown from '../raw-components/caret-down';

const Component = props => (
  <CaretDown
    {...props}
    css={theme => css`
      * {
        fill: ${getColor(props.color, theme)};
      }

      ${getSizeStyle(props.size)}
    `}
  />
);

Component.displayName = 'CaretDownIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
