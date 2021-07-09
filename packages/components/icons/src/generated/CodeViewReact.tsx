// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/code-view.react.svg

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

const SvgCodeView = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="code-view_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="code-view_react_svg__MC-icon-set"
        transform="translate(-240 -552)"
        fill="#000"
      >
        <g id="code-view_react_svg__Views" transform="translate(24 552)">
          <g id="code-view_react_svg__Code-View" transform="translate(216)">
            <path
              d="M8.381 17.89a.317.317 0 01-.237.11.316.316 0 01-.237-.11l-4.804-5.137a.36.36 0 010-.507L7.907 7.11A.316.316 0 018.144 7c.09 0 .169.037.237.11l.516.551A.36.36 0 019 7.915a.36.36 0 01-.103.253L4.845 12.5l4.052 4.332a.36.36 0 01.103.253.36.36 0 01-.103.254l-.516.551zM15.62 7.11a.317.317 0 01.237-.11c.089 0 .168.036.237.11l4.804 5.137a.36.36 0 010 .507l-4.804 5.136a.316.316 0 01-.237.11.316.316 0 01-.237-.11l-.516-.551a.36.36 0 01-.103-.254.36.36 0 01.103-.253l4.052-4.332-4.052-4.332A.36.36 0 0115 7.915a.36.36 0 01.103-.254l.516-.551zm-1.83 2.343l-2.767 6.704-1.456-.072 2.767-6.705 1.456.073z"
              id="code-view_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgCodeView.displayName = 'SvgCodeView';

const CodeViewIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgCodeView {...props} css={getIconStyles(props, theme)} />;
};

CodeViewIcon.displayName = 'CodeViewIcon';
export default CodeViewIcon;
