// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/icons/svg/radio-option-checked.react.svg

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
export const getSizeDimensions = (size: Props['size']) => {
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

export const getColor = (color: Props['color'], theme: Theme) => {
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

const getIconStyles = (props: Props, theme: Theme) => css`
  * {
    fill: ${getColor(props.color, theme)};
  }
  ${getSizeStyle(props.size)};
  flex-shrink: 0;
`;

const SvgRadioOptionChecked = (props: Props) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="radio-option-checked_react_svg__ATOM---Checkboxes---Radio-buttons"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="radio-option-checked_react_svg__Checkboxes-Radio-Buttons"
        transform="translate(-402 -725)"
      >
        <g
          id="radio-option-checked_react_svg__RadioButton-active-default"
          transform="translate(402 725)"
        >
          <circle
            id="radio-option-checked_react_svg__background"
            stroke="#AFAFAF"
            fill="#FFF"
            cx={8}
            cy={8}
            r={7.5}
          />
          <g id="radio-option-checked_react_svg__borderAndContent">
            <circle
              id="radio-option-checked_react_svg__border"
              stroke="#AFAFAF"
              fill="#FFF"
              cx={8}
              cy={8}
              r={7.5}
            />
            <circle
              id="radio-option-checked_react_svg__content"
              fill="#20AD92"
              cx={8}
              cy={8}
              r={4}
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgRadioOptionChecked.displayName = 'SvgRadioOptionChecked';

const RadioOptionCheckedIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgRadioOptionChecked {...props} css={getIconStyles(props, theme)} />;
};

RadioOptionCheckedIcon.displayName = 'RadioOptionCheckedIcon';
export default RadioOptionCheckedIcon;
