// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/paper-bill-inverted.react.svg

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
  const overwrittenVars = { ...vars, ...theme };
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

const SvgPaperBillInverted = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="paper-bill-inverted_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="paper-bill-inverted_react_svg__MC-icon-set"
        transform="translate(-24 -408)"
        fill="#000"
      >
        <g
          id="paper-bill-inverted_react_svg__Switch-states"
          transform="translate(24 408)"
        >
          <g id="paper-bill-inverted_react_svg__Paper-Bill-Inverted">
            <path
              d="M16.324 19.7h-.002v.006L14.913 21l-1.42-1.256V19.7h-.002v.006L12.083 21l-1.42-1.256V19.7h-.002v.006L9.25 21l-1.42-1.256V19.7H7.83v.006L6.42 21 5 19.744V4.342L6.42 3l1.408 1.341V4.4h.003v-.058L9.251 3l1.408 1.341V4.4h.003v-.058L12.082 3l1.407 1.341V4.4h.003v-.058L14.913 3l1.407 1.341V4.4h.004v-.058L17.744 3l1.407 1.341.002 15.365L17.744 21l-1.42-1.256V19.7zM6.857 8.225c0 .258.22.481.49.481h8.64c.272 0 .491-.215.491-.481a.49.49 0 00-.49-.481h-8.64a.485.485 0 00-.49.48zm0 2.886c0 .258.22.481.49.481h8.64c.272 0 .491-.215.491-.48a.49.49 0 00-.49-.482h-8.64a.485.485 0 00-.49.481zm.284 2.887c0 .257.212.48.473.48h4.828a.482.482 0 000-.961H7.614a.482.482 0 00-.473.48z"
              id="paper-bill-inverted_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgPaperBillInverted.displayName = 'SvgPaperBillInverted';

const PaperBillInvertedIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgPaperBillInverted {...props} css={getIconStyles(props, theme)} />;
};

PaperBillInvertedIcon.displayName = 'PaperBillInvertedIcon';
export default PaperBillInvertedIcon;
