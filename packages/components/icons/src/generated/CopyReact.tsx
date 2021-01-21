// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/copy.react.svg

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

const SvgCopy = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="copy_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="copy_react_svg__MC-icon-set"
        transform="translate(-240 -696)"
        fill="#000"
      >
        <g id="copy_react_svg__Actions" transform="translate(24 648)">
          <g id="copy_react_svg__Copy" transform="translate(216 48)">
            <path
              d="M16.91 15.324h-.564v2.762h.563v-2.762zm1.124 0h-.614v2.762h.614v-2.762zm-3.323 0h-1.075v2.762h1.075v-2.762zm1.125 2.762h-.614v-2.762h.614v2.762zM3.052 3.102v12.836H7.5V14.76H4.227V4.33H14.66v3.22h1.227V3.102H3.052zM7.5 20.336h12.784V7.552H7.5v12.784zM8.625 8.727h10.432V19.16H8.625V8.727z"
              id="copy_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgCopy.displayName = 'SvgCopy';

const CopyIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgCopy {...props} css={getIconStyles(props, theme)} />;
};

CopyIcon.displayName = 'CopyIcon';
CopyIcon.defaultProps = defaultProps;
export default CopyIcon;
