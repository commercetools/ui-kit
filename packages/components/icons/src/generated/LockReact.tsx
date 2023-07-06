// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/lock.react.svg
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
const SvgLock = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M6.714 21a1.65 1.65 0 0 1-1.21-.503A1.652 1.652 0 0 1 5 19.286v-8.572c0-.471.168-.875.504-1.21A1.65 1.65 0 0 1 6.714 9h.857V7.286c0-1.186.418-2.197 1.254-3.033C9.661 3.418 10.671 3 11.857 3s2.197.418 3.033 1.253c.835.836 1.253 1.847 1.253 3.033V9H17c.471 0 .875.168 1.211.503.336.336.503.74.503 1.211v8.572c0 .471-.167.875-.503 1.21-.336.336-.74.504-1.211.504H6.714Zm0-1.714H17v-8.572H6.714v8.572Zm5.143-2.572c.472 0 .875-.167 1.211-.503.336-.336.503-.74.503-1.211 0-.471-.167-.875-.503-1.211a1.653 1.653 0 0 0-1.21-.503 1.65 1.65 0 0 0-1.211.503c-.336.336-.504.74-.504 1.211 0 .471.168.875.504 1.211a1.65 1.65 0 0 0 1.21.503ZM9.286 9h5.143V7.286a2.48 2.48 0 0 0-.75-1.822 2.48 2.48 0 0 0-1.822-.75 2.48 2.48 0 0 0-1.821.75c-.5.5-.75 1.107-.75 1.822V9ZM6.714 19.286v-8.572 8.572Z" />
  </svg>
);
SvgLock.displayName = 'SvgLock';
const LockIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgLock {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
LockIcon.displayName = 'LockIcon';
export default LockIcon;
