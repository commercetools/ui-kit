// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/terminal.react.svg

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

const SvgTerminal = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="terminal_react_svg__Component-/-icon-/-24px-/-Terminal"
      stroke="none"
      strokeWidth={1}
      fill="#1A1A1A"
      fillRule="evenodd"
    >
      <path
        d="M5.753 13.405l2.796-2.75a.427.427 0 01.612 0 .41.41 0 010 .602l-2.49 2.448 2.49 2.449a.41.41 0 010 .601.435.435 0 01-.306.13.435.435 0 01-.306-.13l-2.796-2.727a.42.42 0 01-.131-.301.47.47 0 01.13-.322zm4.413 2.856l3.015-5.498c.11-.215.372-.28.59-.172.219.108.284.365.175.58l-3.015 5.498a.461.461 0 01-.393.237c-.066 0-.131-.022-.197-.043-.218-.13-.306-.387-.175-.602zm4.763-4.983a.41.41 0 010-.6.427.427 0 01.612 0l2.797 2.748a.42.42 0 01.13.3.42.42 0 01-.13.302l-2.797 2.749a.436.436 0 01-.306.129.434.434 0 01-.306-.13.41.41 0 010-.6l2.49-2.45-2.49-2.448zM3 17.034c0 .838.677 1.504 1.53 1.504H19.56c.852 0 1.53-.666 1.53-1.504V8.873H3v8.161z"
        id="terminal_react_svg__Fill-1"
      />
      <path
        d="M8.086 6.504c0-.482.385-.879.853-.879.469 0 .853.397.853.879s-.384.878-.853.878c-.468 0-.853-.396-.853-.878zm-2.324 0c0-.482.384-.879.853-.879.468 0 .853.397.853.879s-.385.878-.853.878c-.469 0-.853-.396-.853-.878zm-2.325 0c0-.482.385-.879.853-.879.468 0 .853.397.853.879s-.385.878-.853.878c-.468 0-.853-.396-.853-.878zm1.092-1.658C3.677 4.846 3 5.535 3 6.4v1.667h18.09V6.4c0-.844-.699-1.555-1.529-1.555H4.529z"
        id="terminal_react_svg__Fill-4"
      />
    </g>
  </svg>
);

SvgTerminal.displayName = 'SvgTerminal';

const TerminalIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgTerminal {...props} css={getIconStyles(props, theme)} />;
};

TerminalIcon.displayName = 'TerminalIcon';
export default TerminalIcon;
