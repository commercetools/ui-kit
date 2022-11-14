// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/lock.react.svg

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

const SvgLock = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path
      d="M6 22c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 0 1 4 20V10c0-.55.196-1.021.588-1.413A1.925 1.925 0 0 1 6 8h1V6c0-1.383.488-2.563 1.463-3.538C9.438 1.487 10.617 1 12 1s2.563.487 3.538 1.462C16.513 3.437 17 4.617 17 6v2h1c.55 0 1.021.196 1.413.587.391.392.587.863.587 1.413v10c0 .55-.196 1.021-.587 1.413A1.928 1.928 0 0 1 18 22H6Zm0-2h12V10H6v10Zm6-3c.55 0 1.021-.196 1.413-.587.391-.392.587-.863.587-1.413s-.196-1.021-.587-1.413A1.928 1.928 0 0 0 12 13c-.55 0-1.02.196-1.412.587A1.927 1.927 0 0 0 10 15c0 .55.196 1.021.588 1.413.391.391.862.587 1.412.587ZM9 8h6V6c0-.833-.292-1.542-.875-2.125A2.893 2.893 0 0 0 12 3c-.833 0-1.542.292-2.125.875A2.893 2.893 0 0 0 9 6v2ZM6 20V10v10Z"
      fill="#000"
    />
  </svg>
);

SvgLock.displayName = 'SvgLock';

const LockIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgLock {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

LockIcon.displayName = 'LockIcon';
export default LockIcon;
