// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/rich-text-body/icons/svg/expand-full.react.svg

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

const SvgExpandFull = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="expand-full_react_svg__Component-/-icon-/-16px-/-Richtext-/-Expand"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="expand-full_react_svg__Component-/-icon-/-16px-/-Richtext-/-Indent"
        fill="#1A1A1A"
      >
        <g
          id="expand-full_react_svg__full-size-copy-3"
          transform="translate(3 3)"
        >
          <path
            d="M11.902 10.93l.086.074 4.62 4.62v-2.967a.696.696 0 011.386-.095l.006.095v4.647a.696.696 0 01-.601.69l-.095.006h-4.647a.696.696 0 01-.095-1.386l.095-.006h2.967l-4.62-4.62a.696.696 0 01.898-1.058zm-4.906.074c.245.244.27.626.074.898l-.074.086-4.62 4.62h2.967a.696.696 0 01.095 1.386L5.343 18H.696a.696.696 0 01-.69-.601L0 17.304v-4.647a.696.696 0 011.386-.095l.006.095v2.967l4.62-4.62a.696.696 0 01.984 0zM5.448 0a.71.71 0 01.096 1.413l-.096.006H2.422l4.57 4.57a.71.71 0 01-.915 1.078l-.088-.075-4.57-4.57v3.026a.71.71 0 01-1.413.097L0 5.449V.709A.71.71 0 01.613.007L.71 0h4.738zM17.29 0a.71.71 0 01.71.71v4.738a.71.71 0 11-1.42 0V2.423l-4.569 4.57a.708.708 0 01-1.003 0 .71.71 0 010-1.004l4.57-4.57h-3.026a.71.71 0 110-1.419z"
            id="expand-full_react_svg__Combined-Shape"
          />
        </g>
      </g>
    </g>
  </svg>
);

SvgExpandFull.displayName = 'SvgExpandFull';

const ExpandFullIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgExpandFull {...props} css={getIconStyles(props, theme)} />;
};

ExpandFullIcon.displayName = 'ExpandFullIcon';
ExpandFullIcon.defaultProps = defaultProps;
export default ExpandFullIcon;
