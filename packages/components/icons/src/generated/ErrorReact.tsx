// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/error.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import { warning } from '@commercetools-uikit/utils';
import { css, ClassNames } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
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
export type SVGProps = Props & {
  className: string;
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

const getColor = (color: Props['color']) => {
  if (!color) return 'inherit';
  let iconColor;

  switch (color) {
    case 'solid':
      iconColor = designTokens.colorSolid;
      break;

    case 'neutral60':
      iconColor = designTokens.colorNeutral60;
      break;

    case 'surface':
      iconColor = designTokens.colorSurface;
      break;

    case 'info':
      iconColor = designTokens.colorInfo;
      break;

    case 'primary':
      iconColor = designTokens.colorPrimary;
      break;

    case 'primary40':
      iconColor = designTokens.colorPrimary40;
      break;

    case 'warning':
      iconColor = designTokens.colorWarning;
      break;

    case 'error':
      iconColor = designTokens.colorError;
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

export const getIconStyles = (props: Props) => css`
  *:not([fill='none']) {
    fill: ${getColor(props.color)};
  }
  &,
  image {
    ${getSizeStyle(props.size)};
  }
  flex-shrink: 0;
`;

const SvgError = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 22a9.738 9.738 0 0 1-3.9-.788 10.099 10.099 0 0 1-3.175-2.137c-.9-.9-1.612-1.958-2.137-3.175A9.738 9.738 0 0 1 2 12c0-1.383.263-2.683.788-3.9a10.099 10.099 0 0 1 2.137-3.175c.9-.9 1.958-1.612 3.175-2.137A9.738 9.738 0 0 1 12 2c1.383 0 2.683.263 3.9.788a10.098 10.098 0 0 1 3.175 2.137c.9.9 1.613 1.958 2.137 3.175A9.738 9.738 0 0 1 22 12a9.738 9.738 0 0 1-.788 3.9 10.098 10.098 0 0 1-2.137 3.175c-.9.9-1.958 1.613-3.175 2.137A9.738 9.738 0 0 1 12 22Zm0-1.5c2.367 0 4.375-.825 6.025-2.475 1.65-1.65 2.475-3.658 2.475-6.025a8.262 8.262 0 0 0-.525-2.925 8.863 8.863 0 0 0-1.475-2.55L6.525 18.5a8.015 8.015 0 0 0 2.537 1.488c.942.341 1.921.512 2.938.512Zm-6.475-3.025 11.95-11.95a8.569 8.569 0 0 0-2.55-1.5A8.262 8.262 0 0 0 12 3.5c-2.367 0-4.375.825-6.025 2.475C4.325 7.625 3.5 9.633 3.5 12c0 1.017.183 1.996.55 2.938a9.247 9.247 0 0 0 1.475 2.537Z"
      fill="#000"
    />
  </svg>
);

SvgError.displayName = 'SvgError';

const ErrorIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgError {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

ErrorIcon.displayName = 'ErrorIcon';
export default ErrorIcon;
