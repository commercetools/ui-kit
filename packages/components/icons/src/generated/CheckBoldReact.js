// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/check-bold.react.svg

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

const SvgCheckBold = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="check-bold_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="check-bold_react_svg__MC-icon-set"
        transform="translate(-96 -696)"
        fill="#000"
      >
        <g id="check-bold_react_svg__Actions" transform="translate(24 648)">
          <g id="check-bold_react_svg__Success" transform="translate(72 48)">
            <path
              d="M19.377 4.716a.745.745 0 00-1.05 0l-9.311 9.312a.745.745 0 01-1.05 0l-2.293-2.293a.745.745 0 00-1.05 0l-1.407 1.407a.745.745 0 000 1.05l4.75 4.749a.745.745 0 001.05 0L20.783 7.173a.745.745 0 000-1.05l-1.406-1.407z"
              id="check-bold_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgCheckBold.displayName = 'SvgCheckBold';

const CheckBoldIcon = (props) => {
  const theme = useTheme();
  return <SvgCheckBold {...props} css={getIconStyles(props, theme)} />;
};

CheckBoldIcon.propTypes = iconPropTypes;
export default CheckBoldIcon;
