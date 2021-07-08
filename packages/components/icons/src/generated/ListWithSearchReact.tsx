// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/list-with-search.react.svg

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
export const getSizeDimensions = (size: Props['size']) => {
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

export const getColor = (color: Props['color'], theme: Theme) => {
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

const getIconStyles = (props: Props, theme: Theme) => css`
  * {
    fill: ${getColor(props.color, theme)};
  }
  ${getSizeStyle(props.size)};
  flex-shrink: 0;
`;

const SvgListWithSearch = (props: Props) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="list-with-search_react_svg__Page-1"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="list-with-search_react_svg__list-with-search-icon|-magnifying-glass"
        transform="translate(-18 -442)"
        fill="#000"
      >
        <g
          id="list-with-search_react_svg__Component-/-icon-/-24px-/-list-with-search"
          transform="translate(18 442)"
        >
          <g
            id="list-with-search_react_svg__list-with-search-icon"
            transform="translate(4 4)"
          >
            <path
              d="M23.735 21.952a.927.927 0 00-.308-.662l-5.31-4.736a7.795 7.795 0 01-1.882 1.883l4.734 5.311a.929.929 0 001.341.039l1.155-1.155a.927.927 0 00.27-.68z"
              id="list-with-search_react_svg__Path"
              fillRule="nonzero"
            />
            <path
              d="M19.123 9.94c0-4.764-3.876-8.64-8.64-8.64-4.764 0-8.64 3.876-8.64 8.64 0 4.764 3.876 8.64 8.64 8.64 4.764 0 8.64-3.876 8.64-8.64zm-8.64 6.583A6.59 6.59 0 013.9 9.94a6.59 6.59 0 016.583-6.583 6.59 6.59 0 016.583 6.583 6.59 6.59 0 01-6.583 6.583z"
              id="list-with-search_react_svg__Shape"
              fillRule="nonzero"
            />
            <path
              d="M9.697 10.776l-.917-.972a.5.5 0 00-.728 0l-.713.756a.5.5 0 000 .686l2.358 2.499 4.339-4.599a.5.5 0 000-.686l-.714-.756a.5.5 0 00-.727 0l-2.898 3.072z"
              id="list-with-search_react_svg__Path-2"
              fillRule="nonzero"
            />
            <path
              d="M2.421 15.001L.6 15a.6.6 0 01-.592-.503L0 14.4v-1.8a.6.6 0 01.503-.592L.6 12l.611.001a9.443 9.443 0 001.21 3zM21.4 12a.6.6 0 01.6.6v1.8a.6.6 0 01-.6.6l-2.821.001c.564-.91.978-1.92 1.21-3L21.4 12zM1.052 9H.6a.6.6 0 01-.592-.503L0 8.4V6.6a.6.6 0 01.503-.592L.6 6h1.28a9.438 9.438 0 00-.828 3zM21.4 6a.6.6 0 01.6.6v1.8a.6.6 0 01-.6.6h-1.452a9.438 9.438 0 00-.829-3H21.4zm0-6a.6.6 0 01.6.6v1.8a.6.6 0 01-.6.6h-4.477A9.466 9.466 0 0010.5.5 9.466 9.466 0 004.077 3H.6a.6.6 0 01-.592-.503L0 2.4V.6A.6.6 0 01.503.008L.6 0h20.8z"
              id="list-with-search_react_svg__Combined-Shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgListWithSearch.displayName = 'SvgListWithSearch';

const ListWithSearchIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgListWithSearch {...props} css={getIconStyles(props, theme)} />;
};

ListWithSearchIcon.displayName = 'ListWithSearchIcon';
export default ListWithSearchIcon;
