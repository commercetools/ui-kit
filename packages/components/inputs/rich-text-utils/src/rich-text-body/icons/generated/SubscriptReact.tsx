// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/rich-text-body/icons/svg/subscript.react.svg

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

const SvgSubscript = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="subscript_react_svg__Component-/-icon-/-24px-/-Richtext-/-Sub-script"
      stroke="none"
      strokeWidth={1}
      fill="#333"
      fillRule="nonzero"
    >
      <path
        id="subscript_react_svg__x"
        transform="matrix(1 0 0 -1 0 19.645)"
        d="M6.609 9.708L3.18 4.5h3.294l2.067 3.39 2.085-3.39h3.294l-3.466 5.208 3.628 5.437h-3.304l-2.237-3.647-2.248 3.647H3z"
      />
      <path
        d="M21.044 19.5h-5.988v-1.26l2.15-2.174c.637-.652 1.053-1.104 1.248-1.356.195-.252.336-.485.422-.7.086-.215.129-.438.129-.668 0-.344-.095-.6-.284-.768-.19-.168-.443-.252-.76-.252-.331 0-.653.076-.966.229a4.99 4.99 0 00-.978.65l-.985-1.166c.422-.36.772-.613 1.05-.762a3.85 3.85 0 01.907-.342c.328-.08.696-.12 1.102-.12.535 0 1.008.097 1.418.293.41.195.728.468.955.82.226.351.34.754.34 1.207 0 .394-.07.765-.208 1.11-.139.346-.354.7-.645 1.064-.29.363-.804.88-1.538 1.552l-1.101 1.038v.082h3.732V19.5z"
        id="subscript_react_svg__2"
      />
    </g>
  </svg>
);

SvgSubscript.displayName = 'SvgSubscript';

const SubscriptIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgSubscript {...props} css={getIconStyles(props, theme)} />;
};

SubscriptIcon.displayName = 'SubscriptIcon';
SubscriptIcon.defaultProps = defaultProps;
export default SubscriptIcon;
