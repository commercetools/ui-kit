// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/import.react.svg

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

const SvgImport = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path d="M12 16a.965.965 0 0 1-.712-.288A.965.965 0 0 1 11 15V7.85L9.125 9.725c-.2.2-.433.3-.7.3-.267 0-.508-.108-.725-.325a.93.93 0 0 1-.287-.713A.975.975 0 0 1 7.7 8.3l3.6-3.6c.1-.1.208-.171.325-.213.117-.041.242-.062.375-.062s.258.02.375.062a.883.883 0 0 1 .325.213l3.6 3.6c.2.2.296.437.287.712a.976.976 0 0 1-.287.688c-.2.2-.437.304-.712.312a.93.93 0 0 1-.713-.287L13 7.85V15c0 .283-.096.52-.287.712A.968.968 0 0 1 12 16Zm-6 4c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 0 1 4 18v-2a.97.97 0 0 1 .287-.713A.97.97 0 0 1 5 15a.97.97 0 0 1 .713.287A.97.97 0 0 1 6 16v2h12v-2c0-.283.096-.521.288-.713A.967.967 0 0 1 19 15c.283 0 .52.096.712.287.192.192.288.43.288.713v2c0 .55-.196 1.021-.587 1.413A1.928 1.928 0 0 1 18 20H6Z" />
  </svg>
);

SvgImport.displayName = 'SvgImport';

const ImportIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgImport {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

ImportIcon.displayName = 'ImportIcon';
export default ImportIcon;
