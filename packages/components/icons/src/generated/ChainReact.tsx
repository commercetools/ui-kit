// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/chain.react.svg

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

const SvgChain = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="chain_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="chain_react_svg__MC-icon-set"
        transform="translate(-96 -504)"
        fill="#000"
      >
        <g id="chain_react_svg__Images" transform="translate(24 504)">
          <g id="chain_react_svg__Chain" transform="translate(72)">
            <path
              d="M9.421 17.912l2.93-2.928 1.698 1.699-2.929 2.929a4.316 4.316 0 01-3.06 1.266 4.314 4.314 0 01-3.062-1.266l-.73-.73A4.301 4.301 0 013 15.82a4.3 4.3 0 011.268-3.06l2.929-2.93 1.699 1.7-2.929 2.929a1.914 1.914 0 00-.564 1.361c0 .515.2.999.564 1.362l.73.73c.751.752 1.973.751 2.724 0zm9.46-13.644l.73.73A4.3 4.3 0 0120.88 8.06a4.3 4.3 0 01-1.268 3.061l-2.929 2.93-1.699-1.7 2.929-2.929c.363-.364.564-.847.564-1.362 0-.514-.2-.998-.564-1.361l-.73-.73a1.913 1.913 0 00-1.363-.565c-.514 0-.998.2-1.361.564l-2.93 2.93-1.698-1.7 2.929-2.929A4.3 4.3 0 0115.82 3c1.157 0 2.244.45 3.062 1.268zm-10.549 11.2c-.47-.468-.47-1.23 0-1.699l5.438-5.437a1.201 1.201 0 111.699 1.7l-5.438 5.437a1.198 1.198 0 01-1.699 0z"
              id="chain_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgChain.displayName = 'SvgChain';

const ChainIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgChain {...props} css={getIconStyles(props, theme)} />;
};

ChainIcon.displayName = 'ChainIcon';
export default ChainIcon;
