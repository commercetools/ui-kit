// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/icons/svg/checked.react.svg

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

const SvgChecked = (props: Props) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="checked_react_svg__ATOM---Checkboxes---Radio-buttons"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="checked_react_svg__Checkboxes-Radio-Buttons"
        transform="translate(-177 -725)"
      >
        <g
          id="checked_react_svg__checkbox-active-default"
          transform="translate(177 724)"
        >
          <rect
            id="checked_react_svg__background"
            fill="#FFF"
            x={0}
            y={1}
            width={16}
            height={16}
            rx={4}
          />
          <g
            id="checked_react_svg__borderAndContent"
            transform="translate(0 .5)"
          >
            <rect
              id="checked_react_svg__border"
              stroke="#AFAFAF"
              x={0.5}
              y={1}
              width={15}
              height={15}
              rx={4}
            />
            <path
              d="M12.918 3.759a.497.497 0 00-.7 0L6.011 9.966a.497.497 0 01-.7 0L3.78 8.438a.497.497 0 00-.699 0l-.938.938a.497.497 0 000 .7l3.167 3.165a.497.497 0 00.7 0l7.845-7.845a.496.496 0 000-.7l-.938-.937z"
              id="checked_react_svg__content"
              fill="#20AD92"
              fillRule="nonzero"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgChecked.displayName = 'SvgChecked';

const CheckedIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgChecked {...props} css={getIconStyles(props, theme)} />;
};

CheckedIcon.displayName = 'CheckedIcon';
export default CheckedIcon;
