// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/gear.react.svg

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

const SvgGear = (props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="gear_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="gear_react_svg__MC-icon-set"
        transform="translate(-168 -744)"
        fill="#000"
      >
        <g id="gear_react_svg__Actions" transform="translate(24 648)">
          <g id="gear_react_svg__Pin" transform="translate(144 96)">
            <path
              d="M13.993 2.982l.235 2.102a7.241 7.241 0 012.625 1.515l1.937-.851 2 3.468-1.71 1.25c.104.49.163.996.163 1.516s-.06 1.026-.164 1.516l1.711 1.25-2 3.468-1.937-.851a7.241 7.241 0 01-2.625 1.515l-.235 2.102h-4L9.76 18.88a7.241 7.241 0 01-2.625-1.515l-1.937.851-2-3.468 1.71-1.25a7.269 7.269 0 01-.164-1.516c0-.52.06-1.026.165-1.516l-1.711-1.25 2-3.468 1.937.851A7.241 7.241 0 019.76 5.084l.234-2.102h4zm-2 4.625a4.366 4.366 0 00-4.375 4.375 4.366 4.366 0 004.375 4.375 4.366 4.366 0 004.375-4.375 4.366 4.366 0 00-4.375-4.375z"
              id="gear_react_svg__Combined-Shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgGear.displayName = 'SvgGear';

const GearIcon = (props) => {
  const theme = useTheme();
  return <SvgGear {...props} css={getIconStyles(props, theme)} />;
};

GearIcon.propTypes = iconPropTypes;
export default GearIcon;
