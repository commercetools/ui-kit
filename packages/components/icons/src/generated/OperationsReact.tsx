// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/operations.react.svg
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
const SvgOperations = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <g fillRule="nonzero">
      <path d="M8 11c-.542 0-1 .458-1 1 0 .56.458 1 1 1 .56 0 1-.458 1-1s-.44-1-1-1M16 11c-.56 0-1 .458-1 1 0 .56.458 1 1 1s1-.44 1-1c0-.542-.458-1-1-1M12 11c-.56 0-1 .458-1 1 0 .56.458 1 1 1 .56 0 1-.458 1-1s-.44-1-1-1" />
      <path d="M21 14.5h-1.79l.027-.13a7 7 0 0 0 .13-1.009l.007-.098q.015-.182.017-.367c0-3.635-2.59-5.532-6.195-5.89v2.225L9.555 6.11 13.195 3l.001 2.241c4.592.364 7.958 3.04 7.958 7.655q-.002.124-.011.245l-.009.142a9 9 0 0 1-.118 1.127zM10.881 21v-2.235c-4.649-.316-7.826-2.994-7.826-7.66 0-.11.008-.218.015-.326l.01-.146c.018-.36.056-.711.114-1.043l.015-.09H5l-.028.131c-.07.336-.115.7-.135 1.111l-.008.121q-.01.12-.011.241c0 3.685 2.402 5.585 6.062 5.896v-2.255l3.642 3.145z" />
    </g>
  </svg>
);
SvgOperations.displayName = 'SvgOperations';
const OperationsIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgOperations {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
OperationsIcon.displayName = 'OperationsIcon';
export default OperationsIcon;
