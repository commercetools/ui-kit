// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/filter.react.svg

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

const SvgFilterreact = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="filter_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="filter_react_svg__MC-icon-set"
        transform="translate(-24 -792)"
        fill="#000"
      >
        <g id="filter_react_svg__Actions" transform="translate(24 648)">
          <g id="filter_react_svg__Filter" transform="translate(0 144)">
            <path
              d="M19.718 3H4.298c-.325 0-.606.143-.756.483-.093.275-.036.695.213.949l5.94 6.476v5.516c0 .227.076.425.228.591l3.085 3.362c.144.167.325.25.542.25a.78.78 0 00.302-.066c.313-.148.47-.407.47-.775v-8.878l5.94-6.476a.996.996 0 00.195-.934.752.752 0 00-.739-.498z"
              id="filter_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgFilterreact.displayName = 'SvgFilterreact';

const Component = (props) => {
  const theme = useTheme();
  return <SvgFilterreact {...props} css={getIconStyles(props, theme)} />;
};

Component.propTypes = iconPropTypes;
export default Component;
