// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/table.react.svg

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

const SvgTable = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="table_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="table_react_svg__MC-icon-set"
        transform="translate(-240 -600)"
        fill="#000"
      >
        <g id="table_react_svg__Grid-display" transform="translate(24 600)">
          <g id="table_react_svg__Table" transform="translate(216)">
            <path
              d="M20.458 4.51a1.676 1.676 0 00-1.22-.5H4.728c-.476 0-.882.167-1.22.5A1.628 1.628 0 003 5.713v12.94c0 .47.17.87.507 1.203.339.334.745.5 1.22.5h14.51c.476 0 .883-.166 1.221-.5.338-.333.507-.734.507-1.202V5.713c0-.468-.169-.87-.507-1.203zm-9.166 14.484H4.727a.335.335 0 01-.242-.1.325.325 0 01-.103-.24V6.734h6.91v12.26zm8.291-.34a.325.325 0 01-.102.24.335.335 0 01-.243.1h-6.564V6.734h6.91v11.92z"
              id="table_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgTable.displayName = 'SvgTable';

const TableIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgTable {...props} css={getIconStyles(props, theme)} />;
};

TableIcon.displayName = 'TableIcon';
export default TableIcon;
