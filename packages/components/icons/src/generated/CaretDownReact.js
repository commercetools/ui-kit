// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/caret-down.react.svg

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

const SvgCaretDown = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="caret-down_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="caret-down_react_svg__MC-icon-set"
        transform="translate(-168 -936)"
        fill="#000"
      >
        <g id="caret-down_react_svg__Directions" transform="translate(24 888)">
          <g
            id="caret-down_react_svg__Caret-Down"
            transform="translate(144 48)"
          >
            <path
              d="M20.666 7.405a1.052 1.052 0 00-.791-.353H4.125c-.305 0-.568.117-.791.353A1.18 1.18 0 003 8.243c0 .323.111.602.334.838l7.875 8.34c.223.236.486.354.791.354.305 0 .568-.118.791-.354l7.875-8.34A1.18 1.18 0 0021 8.243c0-.322-.112-.602-.334-.838z"
              id="caret-down_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgCaretDown.displayName = 'SvgCaretDown';

const CaretDownIcon = (props) => {
  const theme = useTheme();
  return <SvgCaretDown {...props} css={getIconStyles(props, theme)} />;
};

CaretDownIcon.propTypes = iconPropTypes;
export default CaretDownIcon;
