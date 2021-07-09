// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/nested-view.react.svg

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

const SvgNestedView = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="nested-view_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="nested-view_react_svg__MC-icon-set"
        transform="translate(-168 -552)"
        fill="#000"
      >
        <g id="nested-view_react_svg__Views" transform="translate(24 552)">
          <g id="nested-view_react_svg__Nested-View" transform="translate(144)">
            <path
              d="M16.235 7.176H3.53A.53.53 0 013 6.647V4.53A.53.53 0 013.53 4h12.705a.53.53 0 01.53.53v2.117a.53.53 0 01-.53.53zM20.538 14H9.462C9.207 14 9 13.776 9 13.5v-2c0-.276.207-.5.462-.5h11.076c.255 0 .462.224.462.5v2c0 .276-.207.5-.462.5zm0 6H9.462C9.207 20 9 19.776 9 19.5v-2c0-.276.207-.5.462-.5h11.076c.255 0 .462.224.462.5v2c0 .276-.207.5-.462.5zM7.01 19c.317 0 .573.224.573.5s-.256.5-.573.5H3.573C3.257 20 3 19.776 3 19.5v-10c0-.276.257-.5.573-.5.316 0 .573.224.573.5V13H7.01c.317 0 .573.224.573.5s-.256.5-.573.5H4.146v5H7.01z"
              id="nested-view_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgNestedView.displayName = 'SvgNestedView';

const NestedViewIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgNestedView {...props} css={getIconStyles(props, theme)} />;
};

NestedViewIcon.displayName = 'NestedViewIcon';
export default NestedViewIcon;
