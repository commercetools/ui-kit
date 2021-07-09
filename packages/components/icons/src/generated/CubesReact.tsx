// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/cubes.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Theme } from '@emotion/react';
import React from 'react';
import { warning } from '@commercetools-uikit/utils';
import { css, useTheme } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
export type Props = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size?: 'small' | 'medium' | 'big' | 'scale';
};
const iconSizes = {
  small: 12,
  medium: 16,
  big: 24,
} as const;

const getSizeDimensions = (size: Props['size']) => {
  switch (size) {
    case 'scale':
      return {
        width: '100%',
        height: 'auto',
      };

    case 'small':
    case 'medium':
    case 'big':
      return {
        width: `${iconSizes[size]}px`,
        height: `${iconSizes[size]}px`,
      };

    default:
      return {
        width: `${iconSizes.big}px`,
        height: `${iconSizes.big}px`,
      };
  }
};

const getSizeStyle = (size: Props['size']) => {
  const dimensions = getSizeDimensions(size);

  switch (size) {
    case 'scale':
      return `
        &:not(:root) {
          width: ${dimensions.width};
          height: ${dimensions.height};
        }
      `;

    default:
      return `
        width: ${dimensions.width};
        height: ${dimensions.height};
      `;
  }
};

const capitalize = (value: string) => value[0].toUpperCase() + value.slice(1);

const getColor = (color: Props['color'], theme: Theme) => {
  if (!color) return 'inherit';
  const overwrittenVars = { ...vars, ...theme };
  const iconColor = overwrittenVars[`color${capitalize(color)}`];

  if (!iconColor) {
    warning(
      color,
      `ui-kit/Icon: the specified color '${color}' is not supported.`
    );
    return 'inherit';
  }

  return iconColor;
};

export const getIconStyles = (props: Props, theme: Theme) => css`
  * {
    fill: ${getColor(props.color, theme)};
  }
  ${getSizeStyle(props.size)};
  flex-shrink: 0;
`;

const SvgCubes = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="cubes_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="cubes_react_svg__MC-icon-set"
        transform="translate(-240 -24)"
        fill="#000"
      >
        <g id="cubes_react_svg__Application" transform="translate(24 24)">
          <g id="cubes_react_svg__Cubes" transform="translate(216)">
            <path
              d="M20.837 12.696l-4.265-1.558V6.393a.215.215 0 00-.145-.203L12.06 4.594a.218.218 0 00-.14 0L7.56 6.146a.201.201 0 00-.1.074.215.215 0 00-.05.136v4.78l-4.26 1.516a.203.203 0 00-.1.074.215.215 0 00-.05.137v4.823c0 .09.058.172.144.202l4.362 1.5a.22.22 0 00.141 0l4.344-1.493 4.335 1.493a.22.22 0 00.142 0l4.362-1.502a.214.214 0 00.152-.205V12.9a.214.214 0 00-.145-.203zm-5.025-1.885l-3.352 1.133V8.356l3.352-1.227v3.682zM11.99 5.373l3.117 1.162-3.114 1.15-3.29-1.132 3.287-1.18zm-4.407 8.82l-3.29-1.134 3.287-1.18 3.117 1.162-3.114 1.151zm3.819 3.125L8.05 18.45v-3.588l3.352-1.226v3.682zm5.001-3.126l-3.29-1.133 3.287-1.18 3.118 1.162-3.115 1.151zm3.819 3.126L16.87 18.45v-3.588l3.352-1.226v3.682z"
              id="cubes_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgCubes.displayName = 'SvgCubes';

const CubesIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgCubes {...props} css={getIconStyles(props, theme)} />;
};

CubesIcon.displayName = 'CubesIcon';
export default CubesIcon;
