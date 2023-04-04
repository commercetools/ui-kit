// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/chain.react.svg
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
const SvgChain = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M7.5 17c-1.245 0-2.306-.439-3.183-1.317C3.439 14.806 3 13.745 3 12.5c0-1.245.439-2.306 1.317-3.184C5.194 8.439 6.255 8 7.5 8h2.7c.255 0 .469.086.642.258a.873.873 0 0 1 .258.642.87.87 0 0 1-.258.64.872.872 0 0 1-.642.26H7.5c-.75 0-1.388.262-1.912.787A2.604 2.604 0 0 0 4.8 12.5c0 .75.263 1.387.788 1.912A2.604 2.604 0 0 0 7.5 15.2h2.7c.255 0 .469.086.642.258a.873.873 0 0 1 .258.642.87.87 0 0 1-.258.64.872.872 0 0 1-.642.26H7.5Zm1.8-3.6a.869.869 0 0 1-.64-.26.869.869 0 0 1-.26-.64c0-.255.086-.469.26-.642a.87.87 0 0 1 .64-.258h5.4c.255 0 .469.086.642.258a.873.873 0 0 1 .258.642.87.87 0 0 1-.258.64.872.872 0 0 1-.642.26H9.3Zm4.5 3.6a.869.869 0 0 1-.64-.26.869.869 0 0 1-.26-.64c0-.255.086-.469.26-.642a.87.87 0 0 1 .64-.258h2.7c.75 0 1.387-.262 1.913-.787A2.604 2.604 0 0 0 19.2 12.5c0-.75-.262-1.387-.787-1.912A2.604 2.604 0 0 0 16.5 9.8h-2.7a.869.869 0 0 1-.64-.26.869.869 0 0 1-.26-.64c0-.255.086-.469.26-.642A.87.87 0 0 1 13.8 8h2.7c1.245 0 2.306.439 3.184 1.316.877.878 1.316 1.939 1.316 3.184s-.439 2.306-1.316 3.183C18.806 16.561 17.745 17 16.5 17h-2.7Z" />
  </svg>
);
SvgChain.displayName = 'SvgChain';
const ChainIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgChain {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
ChainIcon.displayName = 'ChainIcon';
export default ChainIcon;
