// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/tree-structure.react.svg
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
const SvgTreeStructure = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M16.5 20.2q-.743 0-1.27-.528a1.73 1.73 0 0 1-.53-1.272v-.9h-1.8q-.743 0-1.27-.528a1.73 1.73 0 0 1-.53-1.272V8.5H9.3v.9q0 .743-.53 1.27-.527.53-1.27.53H4.8q-.743 0-1.27-.53A1.73 1.73 0 0 1 3 9.4V5.8q0-.742.53-1.272A1.73 1.73 0 0 1 4.8 4h2.7q.743 0 1.27.528.53.53.53 1.272v.9h5.4v-.9q0-.742.53-1.272A1.73 1.73 0 0 1 16.5 4h2.7q.743 0 1.272.528Q21 5.058 21 5.8v3.6q0 .743-.528 1.27-.53.53-1.272.53h-2.7q-.743 0-1.27-.53a1.73 1.73 0 0 1-.53-1.27v-.9h-1.8v7.2h1.8v-.9q0-.742.53-1.272A1.73 1.73 0 0 1 16.5 13h2.7q.743 0 1.272.528.528.53.528 1.272v3.6q0 .742-.528 1.272a1.74 1.74 0 0 1-1.272.528zM4.8 5.8v3.6zm11.7 9v3.6zm0-9v3.6zm0 3.6h2.7V5.8h-2.7zm0 9h2.7v-3.6h-2.7zm-11.7-9h2.7V5.8H4.8z" />
  </svg>
);
SvgTreeStructure.displayName = 'SvgTreeStructure';
const TreeStructureIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgTreeStructure
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
TreeStructureIcon.displayName = 'TreeStructureIcon';
export default TreeStructureIcon;
