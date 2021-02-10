// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/pin-linear.react.svg

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

const SvgPinLinear = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="pin-linear_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="pin-linear_react_svg__MC-icon-set"
        transform="translate(-240 -744)"
        fill="#000"
      >
        <g id="pin-linear_react_svg__Actions" transform="translate(24 648)">
          <g
            id="pin-linear_react_svg__Pin-active"
            transform="translate(216 96)"
          >
            <path
              d="M8.833 13.351h3.435V6.41H8.833v6.942zm7.728 1.683c0-.93-.769-1.683-1.717-1.683h-.859V6.407c.932-.019 1.682-.764 1.682-1.681H5.398c0 .93.77 1.683 1.718 1.683v6.942h-.859c-.949 0-1.717.754-1.717 1.683h5.152v6.522h1.717v-6.522h5.152z"
              id="pin-linear_react_svg__shape"
              transform="rotate(35 10.55 13.14)"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgPinLinear.displayName = 'SvgPinLinear';

const PinLinearIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgPinLinear {...props} css={getIconStyles(props, theme)} />;
};

PinLinearIcon.displayName = 'PinLinearIcon';
export default PinLinearIcon;
