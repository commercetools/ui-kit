// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/plus-bold.react.svg

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

export const getIconStyles = (props: Props, theme: Theme) => css`
  * {
    fill: ${getColor(props.color, theme)};
  }
  &,
  image {
    ${getSizeStyle(props.size)};
  }
  flex-shrink: 0;
`;

const SvgPlusBold = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="plus-bold_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="plus-bold_react_svg__MC-icon-set"
        transform="translate(-240 -120)"
        fillRule="nonzero"
        fill="#000"
      >
        <g id="plus-bold_react_svg__CRUD" transform="translate(24 120)">
          <g id="plus-bold_react_svg__Add-Bold" transform="translate(216)">
            <path
              d="M13.844 10.334v-3.51c0-.97-.784-1.755-1.75-1.755-.967 0-1.75.785-1.75 1.755v3.51h-3.5c-.967 0-1.75.785-1.75 1.754 0 .97.783 1.755 1.75 1.755h3.5v3.51c0 .97.783 1.755 1.75 1.755.966 0 1.75-.786 1.75-1.755v-3.51h3.5c.966 0 1.75-.785 1.75-1.755 0-.969-.784-1.754-1.75-1.754h-3.5z"
              id="plus-bold_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgPlusBold.displayName = 'SvgPlusBold';

const PlusBoldIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgPlusBold {...props} css={getIconStyles(props, theme)} />;
};

PlusBoldIcon.displayName = 'PlusBoldIcon';
export default PlusBoldIcon;
