import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { getColor, getSizeStyle } from '../create-styled-icon';
import AngleLeft from '../raw-components/AngleLeft';

const Component = props => (
  <AngleLeft
    css={css`
      * {
        fill: ${getColor(props.color)};
      }

      ${getSizeStyle(props.size)}
    `}
  />
);

Component.displayName = 'AngleLeftIcon';

const componentPropTypes = {
  color: PropTypes.oneOf([
    'solid',
    'neutral60',
    'surface',
    'info',
    'primary',
    'primary40',
    'warning',
    'error',
  ]),
  size: PropTypes.oneOf(['small', 'medium', 'big', 'scale']),
};

if (process.env.NODE_ENV !== 'production') {
  Component.propTypes = componentPropTypes;
}

export default Component;
