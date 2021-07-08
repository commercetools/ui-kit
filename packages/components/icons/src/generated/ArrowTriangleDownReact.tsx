// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/arrow-triangle-down.react.svg

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

const SvgArrowTriangleDown = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="arrow-triangle-down_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="arrow-triangle-down_react_svg__MC-icon-set"
        transform="translate(-240 -1032)"
        fill="#000"
      >
        <g
          id="arrow-triangle-down_react_svg__Directions"
          transform="translate(24 888)"
        >
          <path
            d="M12 20L3 5h18"
            transform="translate(216 144)"
            id="arrow-triangle-down_react_svg__Arrow-Triangle-Down"
          />
        </g>
      </g>
    </g>
  </svg>
);

SvgArrowTriangleDown.displayName = 'SvgArrowTriangleDown';

const ArrowTriangleDownIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgArrowTriangleDown {...props} css={getIconStyles(props, theme)} />;
};

ArrowTriangleDownIcon.displayName = 'ArrowTriangleDownIcon';
export default ArrowTriangleDownIcon;
