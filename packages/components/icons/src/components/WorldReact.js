// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/world.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import { css, useTheme } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
const iconSizes = {
  small: 12,
  medium: 16,
  big: 24,
};

const getSizeStyle = (size) => {
  switch (size) {
    case 'scale':
      return `
        &:not(:root) {
          width: 100%;
          height: auto;
        }
      `;

    case 'small':
    case 'medium':
    case 'big':
      return `
        width: ${iconSizes[size]}px;
        height: ${iconSizes[size]}px;
      `;

    default:
      return `
        width: ${iconSizes.big}px;
        height: ${iconSizes.big}px;
      `;
  }
};

const capitalize = (s) => s[0].toUpperCase() + s.slice(1);

const getColor = (color, theme) => {
  if (!color) return 'inherit';
  const overwrittenVars = { ...vars, ...theme };
  const iconColor = overwrittenVars[`color${capitalize(color)}`];

  if (!iconColor) {
    invariant(
      color,
      `ui-kit/Icon: the specified color '${color}' is not supported.`
    );
    return 'inherit';
  }

  return iconColor;
};

const getIconStyles = (props, theme) => css`
  * {
    fill: ${getColor(props.color, theme)};
  }
  ${getSizeStyle(props.size)};
  flex-shrink: 0;
`;

const iconPropTypes = {
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

const SvgWorldreact = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="world_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="world_react_svg__MC-icon-set"
        transform="translate(-96 -24)"
        fill="#000"
      >
        <g id="world_react_svg__Application" transform="translate(24 24)">
          <g id="world_react_svg__World" transform="translate(72)">
            <path
              d="M19.708 7.36V7.35h-.005A9.003 9.003 0 0012 3c-4.963 0-9 4.037-9 9 0 1.694.471 3.28 1.288 4.635v.014h.009A9.003 9.003 0 0012 21c4.963 0 9-4.037 9-9a8.947 8.947 0 00-1.292-4.64zm-6.192 12.905a8.378 8.378 0 01-1.219.132V16.65h3.828c-.592 1.664-1.5 2.962-2.609 3.616zM7.875 16.65h3.827v3.748a8.403 8.403 0 01-1.218-.131c-1.11-.655-2.017-1.953-2.61-3.617zm2.608-12.914a8.384 8.384 0 011.22-.132V7.35H7.874c.592-1.663 1.499-2.961 2.608-3.616zm5.642 3.616h-3.828V3.603c.415.014.822.06 1.22.132 1.109.655 2.016 1.953 2.608 3.616zm.193.595c.337 1.137.534 2.414.56 3.756h-4.58V7.946h4.02zm-4.616 0v3.756h-4.58c.026-1.342.223-2.62.56-3.756h4.02zm-5.174 3.756H3.603A8.347 8.347 0 014.64 7.946h2.428a14.859 14.859 0 00-.54 3.756zm0 .596c.024 1.331.214 2.606.54 3.756H4.64a8.346 8.346 0 01-1.037-3.756h2.925zm.595 0h4.58v3.756H7.68a14.271 14.271 0 01-.558-3.756zm5.174 3.756v-3.756h4.58a14.289 14.289 0 01-.558 3.756h-4.022zm5.175-3.756h2.925a8.347 8.347 0 01-1.038 3.756h-2.427c.326-1.15.515-2.425.54-3.756zm0-.596a14.859 14.859 0 00-.54-3.756h2.427a8.347 8.347 0 011.038 3.756h-2.925zm1.525-4.35h-2.25c-.44-1.306-1.065-2.421-1.826-3.232a8.447 8.447 0 014.076 3.231zM9.08 4.12c-.761.81-1.385 1.926-1.827 3.231h-2.25A8.449 8.449 0 019.08 4.12zM5.002 16.649h2.25c.442 1.306 1.066 2.42 1.827 3.232a8.45 8.45 0 01-4.077-3.232zm9.92 3.231c.76-.81 1.384-1.925 1.825-3.231h2.25a8.45 8.45 0 01-4.076 3.231z"
              id="world_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgWorldreact.displayName = 'SvgWorldreact';

const Component = (props) => {
  const theme = useTheme();
  return <SvgWorldreact {...props} css={getIconStyles(props, theme)} />;
};

Component.propTypes = iconPropTypes;
export default Component;
