// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/tag-multi.react.svg

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
  &,
  image {
    ${getSizeStyle(props.size)};
  }
  flex-shrink: 0;
`;

const SvgTagMulti = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="tag-multi_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="tag-multi_react_svg__MC-icon-set"
        transform="translate(-168 -216)"
        fill="#000"
      >
        <g id="tag-multi_react_svg__Menu" transform="translate(24 168)">
          <g id="tag-multi_react_svg__Tag-Multi" transform="translate(144 48)">
            <path
              d="M20.72 11.56L12.97 4H7.477C6.772 4 6.2 4.558 6.2 5.246v5.36l7.748 7.56a.974.974 0 001.355 0l5.416-5.285a.918.918 0 000-1.32zM9.055 6.787a.974.974 0 01-1.354 0 .918.918 0 010-1.32.975.975 0 011.354 0 .918.918 0 010 1.32zm-4.38 4.07l2.186 7.955-3.152-.823a.933.933 0 01-.677-1.145l1.644-5.986zm1.816 1.796l6.51 6.351-3.522.921a.961.961 0 01-1.172-.66l-1.816-6.612z"
              id="tag-multi_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgTagMulti.displayName = 'SvgTagMulti';

const TagMultiIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgTagMulti {...props} css={getIconStyles(props, theme)} />;
};

TagMultiIcon.displayName = 'TagMultiIcon';
export default TagMultiIcon;
