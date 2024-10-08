// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/diamond.react.svg
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
const SvgDiamond = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <g clipPath="url(#diamond_react_svg__a)">
      <path
        fill="#000"
        fillRule="evenodd"
        d="M7.618 4.036q-.122.04-.235.101c-.135.078-4.205 4.954-4.305 5.16a.92.92 0 0 0 .004.748c.083.162 8.103 9.819 8.31 10.006a.887.887 0 0 0 1.215 0c.208-.187 8.228-9.843 8.31-10.006a.91.91 0 0 0 .005-.748c-.04-.083-1.003-1.266-2.138-2.629-1.98-2.375-2.074-2.483-2.251-2.57l-.185-.09-4.3-.007c-3.43-.004-4.327.003-4.43.035m1.976.944q-.342 1.067-.704 2.126l-.7 2.087-1.91.009c-1.662.007-1.905.002-1.89-.038.01-.026.801-.987 1.759-2.135l1.74-2.089h.854c.663 0 .853.009.851.04m4.511 2.085c.386 1.16.694 2.117.685 2.126-.024.024-5.556.024-5.58 0-.013-.012 1.253-3.87 1.382-4.212.012-.03.311-.038 1.413-.03l1.397.008zm3.746-.036c.958 1.148 1.75 2.11 1.76 2.135.014.04-.23.045-1.892.038l-1.908-.009-.701-2.087a121 121 0 0 1-.704-2.126c-.002-.031.188-.04.85-.04h.855zm-9.631 3.2c.05.124 2.675 7.665 2.698 7.756.01.035-1.459-1.707-3.261-3.869s-3.278-3.945-3.278-3.96c0-.018.793-.03 1.899-.03h1.899zm6.557-.044c-.016.098-2.76 7.972-2.777 7.972s-2.76-7.874-2.777-7.972c-.01-.056.083-.058 2.777-.058s2.787.002 2.777.058m4.844-.03c0 .016-1.476 1.798-3.278 3.961s-3.271 3.904-3.261 3.869c.023-.091 2.647-7.632 2.698-7.756l.043-.102h1.9c1.105 0 1.898.011 1.898.028"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="diamond_react_svg__a">
        <path fill="#fff" d="M3 4h18v17H3z" />
      </clipPath>
    </defs>
  </svg>
);
SvgDiamond.displayName = 'SvgDiamond';
const DiamondIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgDiamond {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
DiamondIcon.displayName = 'DiamondIcon';
export default DiamondIcon;
