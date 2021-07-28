// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/camera.react.svg

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

const getColor = (color: Props['color'], theme: Theme) => {
  if (!color) return 'inherit';
  const overwrittenVars = { ...vars, ...theme };
  let iconColor;

  switch (color) {
    case 'solid':
      iconColor = overwrittenVars.colorSolid;
      break;

    case 'neutral60':
      iconColor = overwrittenVars.colorNeutral60;
      break;

    case 'surface':
      iconColor = overwrittenVars.colorSurface;
      break;

    case 'info':
      iconColor = overwrittenVars.colorInfo;
      break;

    case 'primary':
      iconColor = overwrittenVars.colorPrimary;
      break;

    case 'primary40':
      iconColor = overwrittenVars.colorPrimary40;
      break;

    case 'warning':
      iconColor = overwrittenVars.colorWarning;
      break;

    case 'error':
      iconColor = overwrittenVars.colorError;
      break;

    default:
      break;
  }

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
  *:not([fill='none']) {
    fill: ${getColor(props.color, theme)};
  }
  &,
  image {
    ${getSizeStyle(props.size)};
  }
  flex-shrink: 0;
`;

const SvgCamera = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.444 17.149v-7.87a.602.602 0 00-.594-.608h-4.164l-.782-2.13H10.06l-.782 2.13H5.113a.6.6 0 00-.592.609v7.869a.6.6 0 00.592.608H18.85a.602.602 0 00.594-.608m1.185-7.87v7.87c0 1.006-.798 1.824-1.779 1.824H5.113c-.98 0-1.777-.818-1.777-1.824v-7.87c0-1.006.797-1.826 1.777-1.826h3.345l.782-2.128h5.483l.783 2.128h3.344c.98 0 1.78.82 1.78 1.827zm-5.154 1.642c-.719-1.277-2.057-2.07-3.492-2.07-1.437 0-2.776.793-3.494 2.07a4.245 4.245 0 000 4.14c.718 1.278 2.057 2.07 3.494 2.07 1.435 0 2.773-.792 3.492-2.07a4.245 4.245 0 000-4.14zm-.935 3.587a2.94 2.94 0 01-2.56 1.517 2.942 2.942 0 01-2.558-1.517 3.11 3.11 0 010-3.034 2.943 2.943 0 012.56-1.517c1.056 0 2.031.58 2.558 1.517.529.939.529 2.096 0 3.034z"
      fillRule="evenodd"
    />
  </svg>
);

SvgCamera.displayName = 'SvgCamera';

const CameraIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgCamera {...props} css={getIconStyles(props, theme)} />;
};

CameraIcon.displayName = 'CameraIcon';
export default CameraIcon;
