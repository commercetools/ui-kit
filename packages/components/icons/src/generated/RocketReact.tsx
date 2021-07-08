// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/rocket.react.svg

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
export const getSizeDimensions = (size: Props['size']) => {
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

export const getColor = (color: Props['color'], theme: Theme) => {
  if (!color) return 'inherit';
  const overwrittenVars = { ...vars, ...theme }; // @ts-expect-error

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

const getIconStyles = (props: Props, theme: Theme) => css`
  * {
    fill: ${getColor(props.color, theme)};
  }
  ${getSizeStyle(props.size)};
  flex-shrink: 0;
`;

const SvgRocket = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="rocket_react_svg__Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <g id="rocket_react_svg__Rocket">
        <g id="rocket_react_svg__Group-5">
          <g
            id="rocket_react_svg__Group-2"
            transform="translate(3 3)"
            fill="#1A1A1A"
            fillRule="nonzero"
          >
            <g id="rocket_react_svg__Group-4">
              <path
                d="M17.539.068a9.168 9.168 0 00-4.084.427 9.17 9.17 0 00-3.482 2.174l-2.29 2.29-.044.005-3.257.42a.207.207 0 00-.12.058l-3.14 3.141a.205.205 0 00.108.347l2.415.448.622.622-.157.085-.993.538a.206.206 0 00-.047.326l3.767 3.767a.206.206 0 00.325-.048l.623-1.15.622.622.008.04.44 2.375a.205.205 0 00.347.108l3.14-3.14a.205.205 0 00.06-.12l.425-3.302.032-.032 2.257-2.257a9.173 9.173 0 002.175-3.482 9.172 9.172 0 00.426-4.083.205.205 0 00-.178-.179z"
                id="rocket_react_svg__Stroke-1"
              />
              <g id="rocket_react_svg__Group-3" transform="translate(0 12.316)">
                <path
                  d="M4.523 1.01a.405.405 0 010 .574L1.618 4.489a.404.404 0 11-.573-.573L3.95 1.01a.405.405 0 01.573 0z"
                  id="rocket_react_svg__Stroke-3"
                />
                <path
                  d="M5.449 1.937a.405.405 0 010 .573l-1.31 1.308a.405.405 0 11-.572-.573l1.308-1.308a.405.405 0 01.574 0z"
                  id="rocket_react_svg__Stroke-5"
                />
                <path
                  d="M2 1.681a.406.406 0 010 .573L.693 3.564a.404.404 0 01-.573 0 .405.405 0 010-.574L1.427 1.68a.406.406 0 01.574 0z"
                  id="rocket_react_svg__Stroke-7"
                />
                <path
                  d="M3.065 1.304a.5.5 0 11-1 0 .5.5 0 011 0z"
                  id="rocket_react_svg__Stroke-9"
                />
                <path
                  d="M3.598 4.368a.5.5 0 11-1 0 .5.5 0 011 0z"
                  id="rocket_react_svg__Stroke-11"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgRocket.displayName = 'SvgRocket';

const RocketIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgRocket {...props} css={getIconStyles(props, theme)} />;
};

RocketIcon.displayName = 'RocketIcon';
export default RocketIcon;
