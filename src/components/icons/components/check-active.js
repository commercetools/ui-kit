import React from 'react';
import { css } from '@emotion/core';
import { getColor, getSizeStyle, iconPropTypes } from '../create-styled-icon';
import CheckActive from '../raw-components/check-active';

const Component = props => (
  <CheckActive
    {...props}
    css={theme => css`
      * {
        fill: ${getColor(props.color, theme)};
      }

      ${getSizeStyle(props.size)}
    `}
  />
);

Component.displayName = 'CheckActiveIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
