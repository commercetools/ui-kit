// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/eye.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Theme } from '@emotion/react';
import React from 'react';
import { warning } from '@commercetools-uikit/utils';
import { css, useTheme } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
type Props = {
  color?: 'solid' | 'neutral60' | 'surface' | 'info' | 'primary' | 'primary40' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'big' | 'scale';
};
const iconSizes = ({
  small: 12,
  medium: 16,
  big: 24
} as const);

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
  const overwrittenVars = { ...vars,
    ...theme
  }; // @ts-expect-error

  const iconColor = overwrittenVars[`color${capitalize(color)}`];

  if (!iconColor) {
    warning(color, `ui-kit/Icon: the specified color '${color}' is not supported.`);
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

const SvgEye = (props: Props) => <svg width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}><g id="eye_react_svg__Component-/-icon-/-24px-/-eye-" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><path d="M3.535 11.65c0-2.454 4.772-5.73 8.756-5.73 3.98 0 8.7 3.27 8.7 5.73 0 2.47-4.72 5.79-8.7 5.79-3.984 0-8.756-3.326-8.756-5.79zm1.4 0c0 1.56 4.06 4.39 7.356 4.39 3.29 0 7.3-2.82 7.3-4.39 0-1.553-4.007-4.33-7.3-4.33-3.299 0-7.356 2.785-7.356 4.33zm7.282 3.16a3 3 0 110-6 3 3 0 010 6z" id="eye_react_svg__Shape" fill="#1A1A1A" /></g></svg>;

SvgEye.displayName = "SvgEye";

const EyeIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgEye {...props} css={getIconStyles(props, theme)} />;
};

EyeIcon.displayName = "EyeIcon";
export default EyeIcon;