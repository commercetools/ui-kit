// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/cart.react.svg

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

const SvgCart = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="cart_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="cart_react_svg__MC-icon-set"
        transform="translate(-96 -216)"
        fill="#000"
      >
        <g id="cart_react_svg__Menu" transform="translate(24 168)">
          <g id="cart_react_svg__Cart" transform="translate(72 48)">
            <path
              d="M16.491 18.583a1.298 1.298 0 011.124-.658c.463 0 .893.252 1.124.658.232.406.232.91 0 1.316a1.298 1.298 0 01-1.124.659c-.462 0-.893-.252-1.124-.658a1.337 1.337 0 010-1.317zm-5.032 0c.231.406.231.91 0 1.316a1.299 1.299 0 01-1.124.659c-.462 0-.893-.252-1.124-.658a1.337 1.337 0 010-1.317 1.298 1.298 0 011.124-.658c.462 0 .893.252 1.124.658zm-1.555-5.481L6.778 4.808l-2.32-.598a.615.615 0 01.303-1.19l2.932.755 1.036 2.749h10.353c.76 0 1.358.625 1.353 1.451l-.877 4.035c-.027.742-.623 1.334-1.334 1.334l-3.626.212-3.55.207-.057.044a7.94 7.94 0 00-.787.672c-.04.038-.04.038-.078.077-.513.52-.654.829-.631.953.054.292.516.557 1.097.567.339.005 1.94.005 4.403 0a3917.64 3917.64 0 004.474-.01c.338 0 .61.285.61.624.001.338-.27.62-.608.62a4176.62 4176.62 0 01-6.208.01c-1.783 0-2.45-.001-2.691-.005-1.16-.02-2.104-.658-2.275-1.579-.16-.86.536-1.77 1.607-2.634z"
              id="cart_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgCart.displayName = 'SvgCart';

const CartIcon = (props) => {
  const theme = useTheme();
  return <SvgCart {...props} css={getIconStyles(props, theme)} />;
};

CartIcon.propTypes = iconPropTypes;
export default CartIcon;
