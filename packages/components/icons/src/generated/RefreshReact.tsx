// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/refresh.react.svg

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

const SvgRefresh = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="refresh_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="refresh_react_svg__MC-icon-set"
        transform="translate(-168 -984)"
        fillRule="nonzero"
        fill="#000"
      >
        <g id="refresh_react_svg__Directions" transform="translate(24 888)">
          <g id="refresh_react_svg__Refresh" transform="translate(144 96)">
            <path
              d="M18.257 5.329c-3.59-3.217-9.137-3.101-12.586.347-3.542 3.595-3.542 9.41.026 12.98a9.145 9.145 0 006.477 2.669 9.19 9.19 0 006.476-2.67 9.176 9.176 0 002.326-3.965 1.041 1.041 0 00-.74-1.295 1.041 1.041 0 00-1.295.74 7.006 7.006 0 01-1.798 3.04 7.052 7.052 0 01-9.965 0 7.052 7.052 0 010-9.965 7.053 7.053 0 019.567-.37l-1.153 1.153a.354.354 0 00-.101.285.445.445 0 00.135.298.445.445 0 00.298.134l4.075.234a.355.355 0 00.285-.102.354.354 0 00.102-.284l-.234-4.076a.445.445 0 00-.135-.298.445.445 0 00-.297-.135.354.354 0 00-.285.101L18.257 5.33z"
              id="refresh_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgRefresh.displayName = 'SvgRefresh';

const RefreshIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgRefresh {...props} css={getIconStyles(props, theme)} />;
};

RefreshIcon.displayName = 'RefreshIcon';
export default RefreshIcon;
