// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/drag.react.svg
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
const SvgDrag = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M8.25 21c-.619 0-1.148-.22-1.588-.66A2.167 2.167 0 0 1 6 18.75c0-.619.22-1.149.662-1.59.44-.44.97-.66 1.588-.66.619 0 1.149.22 1.59.66.44.441.66.971.66 1.59a2.17 2.17 0 0 1-.66 1.59c-.441.44-.971.66-1.59.66ZM15 21c-.619 0-1.148-.22-1.588-.66a2.167 2.167 0 0 1-.662-1.59c0-.619.22-1.149.662-1.59.44-.44.97-.66 1.588-.66.619 0 1.149.22 1.59.66.44.441.66.971.66 1.59a2.17 2.17 0 0 1-.66 1.59c-.441.44-.971.66-1.59.66Zm-6.75-6.75c-.619 0-1.148-.22-1.588-.662A2.164 2.164 0 0 1 6 12c0-.619.22-1.149.662-1.59.44-.44.97-.66 1.588-.66.619 0 1.149.22 1.59.66.44.441.66.971.66 1.59 0 .619-.22 1.148-.66 1.588-.441.442-.971.662-1.59.662Zm6.75 0c-.619 0-1.148-.22-1.588-.662A2.164 2.164 0 0 1 12.75 12c0-.619.22-1.149.662-1.59.44-.44.97-.66 1.588-.66.619 0 1.149.22 1.59.66.44.441.66.971.66 1.59 0 .619-.22 1.148-.66 1.588-.441.442-.971.662-1.59.662ZM8.25 7.5c-.619 0-1.148-.22-1.588-.662A2.164 2.164 0 0 1 6 5.25c0-.619.22-1.148.662-1.588C7.102 3.22 7.631 3 8.25 3c.619 0 1.149.22 1.59.662.44.44.66.97.66 1.588 0 .619-.22 1.148-.66 1.588-.441.441-.971.662-1.59.662Zm6.75 0c-.619 0-1.148-.22-1.588-.662a2.164 2.164 0 0 1-.662-1.588c0-.619.22-1.148.662-1.588C13.851 3.22 14.382 3 15 3c.619 0 1.149.22 1.59.662.44.44.66.97.66 1.588 0 .619-.22 1.148-.66 1.588-.441.441-.971.662-1.59.662Z" />
  </svg>
);
SvgDrag.displayName = 'SvgDrag';
const DragIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgDrag {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
DragIcon.displayName = 'DragIcon';
export default DragIcon;
