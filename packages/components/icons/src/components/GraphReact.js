// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/graph.react.svg

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

const SvgGraphreact = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="graph_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="graph_react_svg__MC-icon-set"
        transform="translate(-168 -72)"
        fill="#000"
      >
        <g id="graph_react_svg__Application" transform="translate(24 24)">
          <g id="graph_react_svg__Graph" transform="translate(144 48)">
            <path
              d="M3 12.51c0-.282.215-.51.498-.51h4.004a.5.5 0 01.498.51v7.98c0 .282-.215.51-.498.51H3.498A.5.5 0 013 20.49v-7.98zM9.51 3.5c0-.276.216-.5.498-.5h4.005c.275 0 .498.228.498.5v17c0 .276-.215.5-.498.5h-4.005a.501.501 0 01-.497-.5v-17zM16 8.494A.49.49 0 0116.498 8h4.004c.275 0 .498.226.498.494v12.012a.49.49 0 01-.498.494h-4.004a.499.499 0 01-.498-.494V8.494z"
              id="graph_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgGraphreact.displayName = 'SvgGraphreact';

const Component = (props) => {
  const theme = useTheme();
  return <SvgGraphreact {...props} css={getIconStyles(props, theme)} />;
};

Component.propTypes = iconPropTypes;
export default Component;
