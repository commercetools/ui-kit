// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/pin-gear.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Theme } from '@emotion/react';
import React from 'react';
import { invariant } from '@commercetools-uikit/utils';
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

const SvgPinGear = (props: Props) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <defs>
      <path
        d="M19.938 16.541l.976.742a.223.223 0 01.056.288l-.925 1.557c-.056.1-.176.14-.282.1l-1.152-.45c-.241.175-.5.328-.782.44l-.176 1.193a.224.224 0 01-.227.189h-1.85a.224.224 0 01-.227-.189l-.176-1.193a3.404 3.404 0 01-.782-.44l-1.151.45a.236.236 0 01-.283-.1l-.925-1.557a.223.223 0 01.056-.288l.976-.742v-.882l-.976-.743a.218.218 0 01-.056-.288l.925-1.557c.056-.099.176-.139.283-.099l1.151.45c.241-.175.5-.328.782-.44l.176-1.193a.224.224 0 01.227-.189h1.85c.116 0 .213.081.227.189l.176 1.192c.282.113.541.261.782.441l1.152-.45a.236.236 0 01.282.1l.925 1.556a.223.223 0 01-.056.288l-.976.743v.882zm-3.437 1.134c.893 0 1.62-.707 1.62-1.575 0-.869-.727-1.575-1.62-1.575-.893 0-1.62.706-1.62 1.575 0 .868.727 1.575 1.62 1.575z"
        id="pin-gear_react_svg__path-1"
      />
    </defs>
    <g
      id="pin-gear_react_svg__Table-manager"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <g id="pin-gear_react_svg__pin-settings" transform="translate(-3 -3)">
        <g id="pin-gear_react_svg__Component-/-icon-/-12px-/-screen-gear--">
          <mask id="pin-gear_react_svg__mask-2" fill="#fff">
            <use xlinkHref="#pin-gear_react_svg__path-1" />
          </mask>
          <use
            id="pin-gear_react_svg__shape"
            fill="#1A1A1A"
            xlinkHref="#pin-gear_react_svg__path-1"
          />
        </g>
        <path
          d="M9.91 14.732v6.522H8.191v-6.522H4.04c.273-1.122.798-1.683 1.576-1.683.002 0 .002-2.314 0-6.942-1.145-.093-1.718-.654-1.718-1.683h10.269c-.14 1.122-.7 1.683-1.682 1.683.003 0 .003.988 0 2.964h-1.7V6.107H7.332v6.942H12v1.683H9.91z"
          id="pin-gear_react_svg__Path-2"
          fill="#1A1A1A"
          transform="rotate(35 9.033 12.838)"
        />
      </g>
    </g>
  </svg>
);

SvgPinGear.displayName = 'SvgPinGear';

const PinGearIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgPinGear {...props} css={getIconStyles(props, theme)} />;
};

PinGearIcon.displayName = 'PinGearIcon';
export default PinGearIcon;
