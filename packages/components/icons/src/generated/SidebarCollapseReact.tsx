// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/sidebar-collapse.react.svg
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
const SvgSidebarCollapse = (props: SVGProps) => (
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
      d="M4.5 21q-.618 0-1.06-.44A1.45 1.45 0 0 1 3 19.5v-15q0-.618.44-1.06Q3.883 3 4.5 3h15q.62 0 1.06.44.44.442.44 1.06v15q0 .62-.44 1.06T19.5 21zm0-1.5h15v-15h-15z"
    />
    <path
      fill="#1A1A1A"
      fillRule="evenodd"
      d="M12.642 12.006q0-.156.041-.292a.7.7 0 0 1 .14-.253l3.058-3.596a.54.54 0 0 1 .455-.203.6.6 0 0 1 .454.223.8.8 0 0 1 .182.544.8.8 0 0 1-.182.544l-2.578 3.032 2.595 3.052q.18.214.174.535a.83.83 0 0 1-.19.534.58.58 0 0 1-.464.214.58.58 0 0 1-.463-.214l-3.04-3.576a.7.7 0 0 1-.14-.253 1 1 0 0 1-.042-.292"
      clipRule="evenodd"
    />
    <path
      fill="#1A1A1A"
      d="M3.963 4.768c0-.798.648-1.446 1.446-1.446h4.34c.798 0 1.446.648 1.446 1.446v14.465c0 .799-.648 1.446-1.446 1.446h-4.34a1.446 1.446 0 0 1-1.446-1.446z"
    />
  </svg>
);
SvgSidebarCollapse.displayName = 'SvgSidebarCollapse';
const SidebarCollapseIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgSidebarCollapse
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
SidebarCollapseIcon.displayName = 'SidebarCollapseIcon';
export default SidebarCollapseIcon;
