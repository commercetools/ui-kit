// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/angle-up-down.react.svg

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
  ${getSizeStyle(props.size)};
  flex-shrink: 0;
`;

const SvgAngleUpDown = (props: Props) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="angle-up-down_react_svg__AngleUpDownIcon"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="angle-up-down_react_svg__Component-/-icon-/-16px-/-angle-/-down-"
        fill="#1A1A1A"
      >
        <path
          d="M23.84 19.142l-.801-.86a.491.491 0 00-.37-.171.49.49 0 00-.368.172l-6.3 6.752-6.302-6.752a.491.491 0 00-.368-.172.49.49 0 00-.37.172l-.8.859a.562.562 0 00-.161.395c0 .149.054.28.16.395l7.471 8.007c.107.115.23.172.37.172a.49.49 0 00.368-.172l7.471-8.007a.562.562 0 00.16-.395.563.563 0 00-.16-.395z"
          id="angle-up-down_react_svg__shape"
        />
        <path
          d="M23.84 5.03l-.801-.858a.491.491 0 00-.37-.172.49.49 0 00-.368.172l-6.3 6.752-6.302-6.752A.491.491 0 009.331 4a.49.49 0 00-.37.172l-.8.86A.562.562 0 008 5.425c0 .15.054.28.16.395l7.471 8.007c.107.115.23.172.37.172a.49.49 0 00.368-.172l7.471-8.007a.562.562 0 00.16-.395.563.563 0 00-.16-.395z"
          id="angle-up-down_react_svg__shape"
          transform="matrix(1 0 0 -1 0 18)"
        />
      </g>
    </g>
  </svg>
);

SvgAngleUpDown.displayName = 'SvgAngleUpDown';

const AngleUpDownIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgAngleUpDown {...props} css={getIconStyles(props, theme)} />;
};

AngleUpDownIcon.displayName = 'AngleUpDownIcon';
export default AngleUpDownIcon;
