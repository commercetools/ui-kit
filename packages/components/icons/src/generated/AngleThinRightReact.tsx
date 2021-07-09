// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/angle-thin-right.react.svg

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

const SvgAngleThinRight = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="angle-thin-right_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="angle-thin-right_react_svg__MC-icon-set"
        transform="translate(-96 -936)"
        fill="#000"
      >
        <g
          id="angle-thin-right_react_svg__Directions"
          transform="translate(24 888)"
        >
          <g
            id="angle-thin-right_react_svg__Angle-Thin-Right"
            transform="translate(72 48)"
          >
            <path
              d="M16.024 20.325c-.117 0-.196-.037-.274-.15l-8.633-8.25a.353.353 0 010-.525l8.633-8.288c.157-.15.39-.15.547 0a.353.353 0 010 .526l-8.36 8.024 8.36 7.988a.353.353 0 010 .525.342.342 0 01-.274.15h.001z"
              id="angle-thin-right_react_svg__shape"
              transform="rotate(180 11.707 11.663)"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgAngleThinRight.displayName = 'SvgAngleThinRight';

const AngleThinRightIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgAngleThinRight {...props} css={getIconStyles(props, theme)} />;
};

AngleThinRightIcon.displayName = 'AngleThinRightIcon';
export default AngleThinRightIcon;
