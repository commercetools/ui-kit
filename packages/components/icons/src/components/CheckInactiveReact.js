// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/check-inactive.react.svg

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

const SvgCheckInactivereact = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="check-inactive_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="check-inactive_react_svg__MC-icon-set"
        transform="translate(-24 -360)"
      >
        <g id="check-inactive_react_svg__Notices" transform="translate(24 312)">
          <g
            id="check-inactive_react_svg__Check-Inactive"
            transform="translate(0 48)"
          >
            <path
              d="M12 21a9 9 0 110-18 9 9 0 010 18zm-6-9.495v.99c0 .291.224.505.5.505h11c.271 0 .5-.226.5-.505v-.99a.495.495 0 00-.5-.505h-11c-.271 0-.5.226-.5.505z"
              id="check-inactive_react_svg__shape"
              fill="#000"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgCheckInactivereact.displayName = 'SvgCheckInactivereact';

const Component = (props) => {
  const theme = useTheme();
  return <SvgCheckInactivereact {...props} css={getIconStyles(props, theme)} />;
};

Component.propTypes = iconPropTypes;
export default Component;
