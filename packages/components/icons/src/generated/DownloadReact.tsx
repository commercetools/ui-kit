// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/download.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Theme } from '@emotion/react';
import React from 'react';
import invariant from 'tiny-invariant';
import { css, useTheme } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
type Props = {
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
const defaultProps = {
  color: 'solid',
  size: 'big',
} as const;
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

const SvgDownload = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="download_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <g id="download_react_svg__MC-icon-set" transform="translate(-170 -944)">
        <g
          id="download_react_svg__Actions"
          transform="translate(24 752)"
          fill="#000"
          fillRule="nonzero"
        >
          <g id="download_react_svg__Download" transform="translate(146 192)">
            <path
              d="M10.875 13.14V3.5a.5.5 0 01.5-.5H12.6a.5.5 0 01.5.5v9.662l4.804-4.844a.472.472 0 01.345-.151c.13 0 .246.05.346.151l.751.758a.482.482 0 010 .697l-7.002 7.061a.473.473 0 01-.346.152.473.473 0 01-.345-.152L4.65 9.773a.481.481 0 010-.697l.751-.758a.473.473 0 01.346-.151c.13 0 .246.05.346.151l4.782 4.823zM3.5 18.77h17a.5.5 0 01.5.5v1.23a.5.5 0 01-.5.5h-17a.5.5 0 01-.5-.5v-1.23a.5.5 0 01.5-.5z"
              id="download_react_svg__Shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgDownload.displayName = 'SvgDownload';

const DownloadIcon = (props: Props = defaultProps) => {
  const theme = useTheme();
  return <SvgDownload {...props} css={getIconStyles(props, theme)} />;
};

DownloadIcon.displayName = 'DownloadIcon';
export default DownloadIcon;
