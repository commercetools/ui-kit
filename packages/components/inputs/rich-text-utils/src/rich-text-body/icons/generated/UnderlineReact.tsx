// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/rich-text-body/icons/svg/underline.react.svg

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

const SvgUnderline = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="underline_react_svg__Component-/-icon-/-24px-/-Richtext-/-Underline"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="underline_react_svg__Component-/-icon-/-16px-/-Richtext-/-Underline"
        fill="#1A1A1A"
      >
        <g id="underline_react_svg__U" transform="translate(4.5 3)">
          <path
            d="M15 16.625v1.25H0v-1.25h15zM4.19.223v9.642c0 1.234.313 2.18.938 2.84.626.661 1.546.991 2.76.991 1.156 0 2.048-.332 2.673-.995.626-.664.939-1.616.939-2.856V.223h1.595v9.562c0 1.684-.472 3.008-1.417 3.972-.945.963-2.243 1.445-3.894 1.445-1.652 0-2.93-.485-3.833-1.455-.904-.97-1.356-2.305-1.356-4.003V.223H4.19z"
            id="underline_react_svg__Combined-Shape"
          />
        </g>
      </g>
    </g>
  </svg>
);

SvgUnderline.displayName = 'SvgUnderline';

const UnderlineIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgUnderline {...props} css={getIconStyles(props, theme)} />;
};

UnderlineIcon.displayName = 'UnderlineIcon';
export default UnderlineIcon;
