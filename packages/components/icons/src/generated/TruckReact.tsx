// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/truck.react.svg
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
const SvgTruck = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M7.09 18.09a2.37 2.37 0 0 1-1.738-.715 2.37 2.37 0 0 1-.716-1.739q-.675 0-1.155-.48A1.58 1.58 0 0 1 3 14V6.636q0-.675.481-1.155.48-.48 1.155-.481h9.819q.675 0 1.156.481.48.48.48 1.155v1.637h2.045q.206 0 .369.082.163.081.286.245l2.045 2.72a.7.7 0 0 1 .123.226q.04.122.041.265v3.007a.8.8 0 0 1-.236.583.8.8 0 0 1-.582.235h-.818q0 1.023-.716 1.739a2.37 2.37 0 0 1-1.739.716 2.37 2.37 0 0 1-1.738-.716 2.37 2.37 0 0 1-.716-1.739h-4.91q0 1.023-.715 1.739a2.37 2.37 0 0 1-1.74.716m0-1.636a.8.8 0 0 0 .584-.235.8.8 0 0 0 .235-.583.8.8 0 0 0-.235-.582.8.8 0 0 0-.583-.236.8.8 0 0 0-.583.236.8.8 0 0 0-.235.582.8.8 0 0 0 .235.583.8.8 0 0 0 .583.235M4.637 6.637V14h.655a2.8 2.8 0 0 1 .798-.593q.45-.225 1.002-.225t1.002.225.798.593h5.563V6.636zm12.273 9.819a.8.8 0 0 0 .583-.236.8.8 0 0 0 .235-.583.8.8 0 0 0-.235-.582.8.8 0 0 0-.583-.236.8.8 0 0 0-.582.236.8.8 0 0 0-.236.582.8.8 0 0 0 .235.583.8.8 0 0 0 .583.235m-.818-4.091h3.477l-1.84-2.455H16.09z" />
  </svg>
);
SvgTruck.displayName = 'SvgTruck';
const TruckIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgTruck {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
TruckIcon.displayName = 'TruckIcon';
export default TruckIcon;
