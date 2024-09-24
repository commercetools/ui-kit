// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/export.react.svg
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
    | 'error'
    | 'success';
  /**
   * The size of the icon. 'small', 'medium', 'big' have been deprecated in favor of '10', '20', '30', '40'.
   */
  size?: 'small' | 'medium' | 'big' | 'scale' | '10' | '20' | '30' | '40';
};
export type SVGProps = Props & {
  className: string;
};
const iconSizes = {
  small: 12,
  medium: 16,
  big: 24,
  '10': 12,
  '20': 16,
  '30': 20,
  '40': 24,
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
    case '10':
    case '20':
    case '30':
    case '40':
      return {
        width: `${iconSizes[size]}px`,
        height: `${iconSizes[size]}px`,
      };
    default:
      return {
        width: `${iconSizes['40']}px`,
        height: `${iconSizes['40']}px`,
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
    case 'success':
      iconColor = designTokens.colorSuccess;
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
const SvgExport = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path
      fill="#1A1A1A"
      d="M4.938 21q-.8 0-1.369-.587A1.96 1.96 0 0 1 3 19V5q0-.824.57-1.412Q4.138 3 4.937 3H19q.8 0 1.369.587.57.588.57 1.413v1q0 .424-.28.713a.92.92 0 0 1-.69.287.92.92 0 0 1-.69-.287A.98.98 0 0 1 19 6V5H4.938v14H19v-1q0-.424.279-.712a.92.92 0 0 1 .69-.288q.412 0 .69.288.28.287.28.712v1q0 .824-.57 1.413Q19.799 21 19 21zm12.767-8H9.783a.92.92 0 0 1-.69-.287.98.98 0 0 1-.279-.713q0-.424.279-.713a.92.92 0 0 1 .69-.287h7.922l-1.817-1.9a1 1 0 0 1-.278-.687.95.95 0 0 1 .278-.713.9.9 0 0 1 .679-.275q.411 0 .678.275l3.488 3.6a.9.9 0 0 1 .206.325Q21 11.8 21 12q0 .2-.06.375a.9.9 0 0 1-.207.325l-3.488 3.6a.93.93 0 0 1-.666.287.89.89 0 0 1-.69-.287.96.96 0 0 1-.267-.7q0-.425.266-.7z"
    />
  </svg>
);
SvgExport.displayName = 'SvgExport';
const ExportIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgExport {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
ExportIcon.displayName = 'ExportIcon';
export default ExportIcon;
