// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'pnpm generate-icons'.
// Original SVG file: src/svg/stack.react.svg
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
const SvgStack = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M4 15a.97.97 0 0 1-.712-.288A.97.97 0 0 1 3 14q0-.425.288-.713A.97.97 0 0 1 4 13h16q.424 0 .712.287.288.288.288.713 0 .424-.288.712A.97.97 0 0 1 20 15zm0 4a.97.97 0 0 1-.712-.288A.97.97 0 0 1 3 18q0-.424.288-.712A.97.97 0 0 1 4 17h16q.424 0 .712.288A.97.97 0 0 1 21 18q0 .424-.288.712A.97.97 0 0 1 20 19zm0-8a.97.97 0 0 1-.712-.288A.97.97 0 0 1 3 10q0-.425.288-.713A.97.97 0 0 1 4 9h16q.424 0 .712.287Q21 9.575 21 10q0 .424-.288.712A.97.97 0 0 1 20 11zm0-4a.97.97 0 0 1-.712-.287A.97.97 0 0 1 3 6q0-.425.288-.713A.97.97 0 0 1 4 5h16q.424 0 .712.287Q21 5.575 21 6a.97.97 0 0 1-.288.713A.97.97 0 0 1 20 7z" />
  </svg>
);
SvgStack.displayName = 'SvgStack';
const StackIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgStack {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
StackIcon.displayName = 'StackIcon';
export default StackIcon;
