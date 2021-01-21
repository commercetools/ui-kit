// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/search.react.svg

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

const SvgSearch = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="search_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="search_react_svg__MC-icon-set"
        transform="translate(-96 -744)"
        fill="#000"
      >
        <g id="search_react_svg__Actions" transform="translate(24 648)">
          <g id="search_react_svg__Search" transform="translate(72 96)">
            <path
              d="M5.556 12.14a4.832 4.832 0 010-4.81A4.782 4.782 0 019.7 4.924c1.71 0 3.29.917 4.145 2.406a4.832 4.832 0 010 4.81A4.782 4.782 0 019.7 14.547c-1.71 0-3.29-.917-4.145-2.405m15.18 7.427l-5.713-5.742a6.752 6.752 0 00.48-7.458A6.694 6.694 0 009.702 3a6.694 6.694 0 00-5.803 3.368 6.765 6.765 0 000 6.735 6.676 6.676 0 009.85 2l5.715 5.745a.896.896 0 001.273 0 .909.909 0 000-1.28"
              id="search_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgSearch.displayName = 'SvgSearch';

const SearchIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgSearch {...props} css={getIconStyles(props, theme)} />;
};

SearchIcon.displayName = 'SearchIcon';
SearchIcon.defaultProps = defaultProps;
export default SearchIcon;
