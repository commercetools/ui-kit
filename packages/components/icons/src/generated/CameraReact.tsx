// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/camera.react.svg

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

const SvgCamera = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 17.35c1.2 0 2.208-.408 3.025-1.225.817-.817 1.225-1.833 1.225-3.05 0-1.2-.408-2.204-1.225-3.012C14.208 9.254 13.2 8.85 12 8.85c-1.217 0-2.23.404-3.037 1.213-.809.808-1.213 1.812-1.213 3.012 0 1.217.404 2.233 1.213 3.05.808.817 1.82 1.225 3.037 1.225ZM3.5 21c-.4 0-.75-.15-1.05-.45-.3-.3-.45-.65-.45-1.05V6.675c0-.383.15-.73.45-1.037.3-.309.65-.463 1.05-.463h3.675l1.375-1.65c.133-.183.3-.317.5-.4.2-.083.417-.125.65-.125h4.6c.233 0 .45.042.65.125.2.083.367.217.5.4l1.375 1.65H20.5c.383 0 .73.154 1.038.463.308.308.462.654.462 1.037V19.5c0 .4-.154.75-.462 1.05-.309.3-.655.45-1.038.45h-17Zm17-1.5V6.675h-17V19.5h17Z"
      fill="#000"
    />
  </svg>
);

SvgCamera.displayName = 'SvgCamera';

const CameraIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgCamera {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

CameraIcon.displayName = 'CameraIcon';
export default CameraIcon;
