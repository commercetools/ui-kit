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
const SvgSidebarCollapse = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path
      fill="#1A1A1A"
      d="M4.5 21c-.412 0-.766-.147-1.06-.44A1.445 1.445 0 0 1 3 19.5v-15c0-.412.147-.766.44-1.06.294-.293.648-.44 1.06-.44h15c.413 0 .766.147 1.06.44.293.294.44.648.44 1.06v15c0 .413-.147.766-.44 1.06-.294.293-.647.44-1.06.44h-15Zm0-1.5h15v-15h-15v15Z"
    />
    <path
      fill="#1A1A1A"
      fillRule="evenodd"
      d="M12.642 12.005c0-.103.013-.2.041-.291a.7.7 0 0 1 .14-.253l3.058-3.596a.544.544 0 0 1 .455-.203.6.6 0 0 1 .454.223.81.81 0 0 1 .182.544.81.81 0 0 1-.182.544l-2.578 3.032 2.595 3.052c.12.143.179.32.174.535a.832.832 0 0 1-.19.534.58.58 0 0 1-.464.214.58.58 0 0 1-.463-.214l-3.04-3.576a.7.7 0 0 1-.14-.253.99.99 0 0 1-.042-.292Z"
      clipRule="evenodd"
    />
    <path
      fill="#1A1A1A"
      d="M3.963 4.768c0-.798.648-1.446 1.446-1.446h4.34c.798 0 1.446.648 1.446 1.446v14.465c0 .799-.648 1.446-1.446 1.446h-4.34a1.446 1.446 0 0 1-1.446-1.446V4.768Z"
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