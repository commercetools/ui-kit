// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/fraction-digits.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Theme } from '@emotion/react';
import React from 'react';
import invariant from 'tiny-invariant';
import { css, useTheme } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
type Props = {
  color:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
};
const defaultProps: Pick<Props, 'color' | 'size'> = {
  color: 'solid',
  size: 'big',
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

const SvgFractionDigits = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="fraction-digits_react_svg__HP-icon-17"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <path
        d="M4.686 11.162c0-.328.087-.576.263-.744.176-.168.432-.252.768-.252.324 0 .575.086.753.258.177.172.266.418.266.738 0 .309-.09.552-.27.73-.179.177-.429.266-.75.266-.327 0-.581-.087-.76-.26-.18-.174-.27-.42-.27-.736zm9.158-3.445c0 1.496-.245 2.603-.736 3.322-.49.719-1.245 1.078-2.264 1.078-.989 0-1.734-.37-2.236-1.113-.502-.742-.753-1.838-.753-3.287 0-1.512.245-2.626.733-3.343.488-.717 1.24-1.075 2.256-1.075.988 0 1.735.375 2.241 1.125s.759 1.847.759 3.293zm-4.19 0c0 1.05.091 1.804.273 2.259.181.455.487.682.917.682.422 0 .726-.23.914-.691.187-.461.281-1.211.281-2.25 0-1.051-.095-1.806-.284-2.265-.19-.459-.493-.688-.911-.688-.426 0-.73.23-.914.688-.184.46-.276 1.214-.276 2.265zm11.04 0c0 1.496-.246 2.603-.736 3.322-.49.719-1.245 1.078-2.265 1.078-.988 0-1.733-.37-2.235-1.113-.502-.742-.753-1.838-.753-3.287 0-1.512.244-2.626.732-3.343.489-.717 1.24-1.075 2.256-1.075.989 0 1.736.375 2.242 1.125.505.75.758 1.847.758 3.293zm-4.19 0c0 1.05.09 1.804.272 2.259.182.455.488.682.917.682.422 0 .727-.23.914-.691.188-.461.282-1.211.282-2.25 0-1.051-.095-1.806-.285-2.265-.189-.459-.493-.688-.91-.688-.426 0-.731.23-.915.688-.183.46-.275 1.214-.275 2.265z"
        id="fraction-digits_react_svg___00"
        fill="#1A1A1A"
        fillRule="nonzero"
      />
      <g
        id="fraction-digits_react_svg__Group"
        transform="translate(6 13)"
        fill="#1A1A1A"
        fillRule="nonzero"
      >
        <path
          id="fraction-digits_react_svg__Line-3"
          d="M1.002 5.017l-.004-2 10.5-.019.004 2z"
        />
        <path
          id="fraction-digits_react_svg__Path-2"
          d="M10.945.581V7.45l4.145-3.466z"
        />
      </g>
    </g>
  </svg>
);

SvgFractionDigits.displayName = 'SvgFractionDigits';

const FractionDigitsIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgFractionDigits {...props} css={getIconStyles(props, theme)} />;
};

FractionDigitsIcon.displayName = 'FractionDigitsIcon';
FractionDigitsIcon.defaultProps = defaultProps;
export default FractionDigitsIcon;
