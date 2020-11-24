// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/arrow-right.react.svg

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

const SvgArrowRight = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="arrow-right_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="arrow-right_react_svg__MC-icon-set"
        transform="translate(-96 -1032)"
        fill="#000"
      >
        <g id="arrow-right_react_svg__Directions" transform="translate(24 888)">
          <g
            id="arrow-right_react_svg__Arrow-Right"
            transform="translate(72 144)"
          >
            <path
              d="M18.238 14.798h-4.705V4.668c0-.79-.66-1.43-1.473-1.43-.814 0-1.473.64-1.473 1.43v10.13H5.762l6.298 6.44 6.178-6.44z"
              id="arrow-right_react_svg__shape"
              transform="rotate(-90 12 12.238)"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgArrowRight.displayName = 'SvgArrowRight';

const ArrowRightIcon = (props) => {
  const theme = useTheme();
  return <SvgArrowRight {...props} css={getIconStyles(props, theme)} />;
};

ArrowRightIcon.propTypes = iconPropTypes;
export default ArrowRightIcon;
