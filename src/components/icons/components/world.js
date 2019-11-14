import React from 'react';
import { css } from '@emotion/core';
import { getColor, getSizeStyle, iconPropTypes } from '../create-styled-icon';
import World from '../raw-components/world';

const Component = props => (
  <World
    {...props}
    css={theme => css`
      * {
        fill: ${getColor(props.color, theme)};
      }

      ${getSizeStyle(props.size)}
    `}
  />
);

Component.displayName = 'WorldIcon';

// we do this to enable treeshaking
// please see https://github.com/alex996/react-css-spinners/issues/1
if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = iconPropTypes;
}

export default Component;
