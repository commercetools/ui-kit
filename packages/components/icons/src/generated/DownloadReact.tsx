// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/download.react.svg

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

const SvgDownload = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 15.575a1.1 1.1 0 0 1-.375-.063.871.871 0 0 1-.325-.212l-3.6-3.6a.948.948 0 0 1-.275-.7c0-.283.092-.517.275-.7.183-.183.42-.28.712-.288.292-.008.53.08.713.263L11 12.15V5c0-.283.096-.521.288-.713A.967.967 0 0 1 12 4a.97.97 0 0 1 .713.287A.97.97 0 0 1 13 5v7.15l1.875-1.875c.183-.183.421-.271.713-.263.291.009.529.105.712.288a.948.948 0 0 1 .275.7.948.948 0 0 1-.275.7l-3.6 3.6c-.1.1-.208.17-.325.212a1.1 1.1 0 0 1-.375.063ZM6 20c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 0 1 4 18v-2a.97.97 0 0 1 .287-.713A.97.97 0 0 1 5 15a.97.97 0 0 1 .713.287A.97.97 0 0 1 6 16v2h12v-2c0-.283.096-.521.288-.713A.967.967 0 0 1 19 15c.283 0 .52.096.712.287.192.192.288.43.288.713v2c0 .55-.196 1.021-.587 1.413A1.928 1.928 0 0 1 18 20H6Z" />
  </svg>
);

SvgDownload.displayName = 'SvgDownload';

const DownloadIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgDownload {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

DownloadIcon.displayName = 'DownloadIcon';
export default DownloadIcon;
