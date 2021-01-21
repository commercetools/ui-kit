// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/chain-broken.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Theme } from '@emotion/react';
import React from 'react';
import invariant from 'tiny-invariant';
import { css, useTheme } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
type Props = {
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

const getSizeStyle = (size: Props['size']) => {
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

const capitalize = (value: string) => value[0].toUpperCase() + value.slice(1);

const getColor = (color: Props['color'], theme: Theme) => {
  if (!color) return 'inherit';
  const overwrittenVars = { ...vars, ...theme }; // @ts-expect-error

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

const getIconStyles = (props: Props, theme: Theme) => css`
  * {
    fill: ${getColor(props.color, theme)};
  }
  ${getSizeStyle(props.size)};
  flex-shrink: 0;
`;

const SvgChainBroken = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="chain-broken_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="chain-broken_react_svg__MC-icon-set"
        transform="translate(-168 -504)"
        fill="#000"
      >
        <g id="chain-broken_react_svg__Images" transform="translate(24 504)">
          <g
            id="chain-broken_react_svg__Chain-Broken"
            transform="translate(144)"
          >
            <path
              d="M9.892 16.62l2.297-2.297 1.332 1.332-2.297 2.298a3.385 3.385 0 01-2.4.992c-.87 0-1.74-.33-2.401-.992l-.573-.573a3.373 3.373 0 01-.995-2.401c0-.907.354-1.76.995-2.4l2.297-2.298 1.332 1.333-2.297 2.297a1.501 1.501 0 00-.442 1.068c0 .403.158.783.442 1.068l.573.573a1.513 1.513 0 002.137 0zm1.653-7.072l-1.332-1.333 2.297-2.297a3.373 3.373 0 012.4-.994c.907 0 1.76.353 2.401.994l.573.573c.641.641.995 1.494.995 2.4 0 .908-.354 1.76-.995 2.402l-2.297 2.297-1.332-1.333 2.297-2.297c.284-.285.442-.665.442-1.068 0-.404-.158-.783-.442-1.068l-.573-.573a1.5 1.5 0 00-1.068-.442c-.404 0-.783.157-1.069.442l-2.297 2.297zM8.72 7.829l-.604.603-2.574-2.574.603-.604L8.719 7.83zm.71-1.229V3h.771v3.6h-.771zM3 10.2v-.771h3.6v.771H3zm12.392 5.465l.604-.603 2.574 2.574-.603.604-2.575-2.575zm-1.85 5.078v-3.857h.772v3.857h-.771zm3.6-6.686v-.771h3.6v.771h-3.6z"
              id="chain-broken_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgChainBroken.displayName = 'SvgChainBroken';

const ChainBrokenIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgChainBroken {...props} css={getIconStyles(props, theme)} />;
};

ChainBrokenIcon.displayName = 'ChainBrokenIcon';
export default ChainBrokenIcon;
