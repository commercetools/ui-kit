// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/close-bold.react.svg

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

const SvgCloseBold = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="close-bold_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="close-bold_react_svg__MC-icon-set"
        transform="translate(-168 -648)"
        fillRule="nonzero"
        fill="#000"
      >
        <g id="close-bold_react_svg__Actions" transform="translate(24 648)">
          <g id="close-bold_react_svg__Close-Bold" transform="translate(144)">
            <path
              d="M14.574 12.044l2.571-2.572c.71-.71.712-1.86.004-2.567a1.816 1.816 0 00-2.568.003L12.01 9.48 9.446 6.916a1.816 1.816 0 00-2.568.003c-.71.71-.712 1.86-.004 2.568l2.564 2.564-2.571 2.571c-.71.71-.712 1.86-.004 2.568a1.816 1.816 0 002.568-.004l2.571-2.571 2.565 2.564a1.816 1.816 0 002.567-.003c.71-.71.712-1.86.004-2.568l-2.564-2.564z"
              id="close-bold_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgCloseBold.displayName = 'SvgCloseBold';

const CloseBoldIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgCloseBold {...props} css={getIconStyles(props, theme)} />;
};

CloseBoldIcon.displayName = 'CloseBoldIcon';
export default CloseBoldIcon;
