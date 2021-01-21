// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/angle-thin-left.react.svg

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

const SvgAngleThinLeft = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="angle-thin-left_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="angle-thin-left_react_svg__MC-icon-set"
        transform="translate(-24 -936)"
        fill="#000"
      >
        <g
          id="angle-thin-left_react_svg__Directions"
          transform="translate(24 888)"
        >
          <g
            id="angle-thin-left_react_svg__Angle-Thin-Left"
            transform="translate(0 48)"
          >
            <path
              d="M16.336 20.888c-.117 0-.195-.038-.273-.15l-8.634-8.25a.353.353 0 010-.525l8.633-8.288c.157-.15.391-.15.547 0a.353.353 0 010 .525L8.25 12.225l8.36 7.988a.353.353 0 010 .525.342.342 0 01-.274.15z"
              id="angle-thin-left_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgAngleThinLeft.displayName = 'SvgAngleThinLeft';

const AngleThinLeftIcon = (props: Props = defaultProps) => {
  const theme = useTheme();
  return <SvgAngleThinLeft {...props} css={getIconStyles(props, theme)} />;
};

AngleThinLeftIcon.displayName = 'AngleThinLeftIcon';
export default AngleThinLeftIcon;
