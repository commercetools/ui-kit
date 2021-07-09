// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/angle-right.react.svg

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

const SvgAngleRight = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="angle-right_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="angle-right_react_svg__MC-icon-set"
        transform="translate(-96 -888)"
        fill="#000"
      >
        <g id="angle-right_react_svg__Directions" transform="translate(24 888)">
          <g id="angle-right_react_svg__Angle-Right" transform="translate(72)">
            <path
              d="M21.11 7.797l-.902-.909a.567.567 0 00-.415-.182.567.567 0 00-.414.182l-7.087 7.146-7.087-7.146a.567.567 0 00-.415-.182.567.567 0 00-.414.182l-.902.91a.576.576 0 000 .836l8.403 8.474c.12.12.258.181.415.181.156 0 .294-.06.414-.181l8.404-8.474a.577.577 0 000-.837z"
              id="angle-right_react_svg__shape"
              transform="rotate(-90 12.292 11.998)"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgAngleRight.displayName = 'SvgAngleRight';

const AngleRightIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgAngleRight {...props} css={getIconStyles(props, theme)} />;
};

AngleRightIcon.displayName = 'AngleRightIcon';
export default AngleRightIcon;
