// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/layers.react.svg
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
const SvgLayers = (props: SVGProps) => (
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
      fill="#000"
      d="M11.996 21a1.5 1.5 0 0 1-.507-.091 1.8 1.8 0 0 1-.466-.253l-7.706-6.009a.71.71 0 0 1-.304-.621.78.78 0 0 1 .332-.623.8.8 0 0 1 .478-.159q.26 0 .47.159L12 19.412l7.707-6.01a.8.8 0 0 1 .956 0q.317.237.327.622a.72.72 0 0 1-.307.623l-7.706 6.009a1.9 1.9 0 0 1-.47.253 1.5 1.5 0 0 1-.51.091m0-4.023a1.5 1.5 0 0 1-.507-.092 1.8 1.8 0 0 1-.466-.253L3.29 10.623a.75.75 0 0 1-.224-.296.9.9 0 0 1 0-.677.75.75 0 0 1 .224-.297l7.734-6.009q.22-.162.47-.253a1.48 1.48 0 0 1 1.017 0q.247.09.466.253l7.733 6.009q.158.132.224.297a.9.9 0 0 1 0 .677.75.75 0 0 1-.224.297l-7.734 6.008a1.9 1.9 0 0 1-.47.253 1.5 1.5 0 0 1-.51.091M12 15.388l6.915-5.4L12 4.588l-6.915 5.4z"
    />
  </svg>
);
SvgLayers.displayName = 'SvgLayers';
const LayersIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgLayers {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
LayersIcon.displayName = 'LayersIcon';
export default LayersIcon;
