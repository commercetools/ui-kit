// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/eye.react.svg
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
const SvgEye = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 15.818c1.023 0 1.892-.358 2.608-1.073.716-.716 1.074-1.586 1.074-2.609 0-1.022-.358-1.892-1.074-2.608-.716-.716-1.585-1.073-2.608-1.073-1.023 0-1.892.357-2.608 1.073-.716.716-1.074 1.586-1.074 2.608 0 1.023.358 1.893 1.074 2.609.716.715 1.585 1.073 2.608 1.073Zm0-1.473a2.129 2.129 0 0 1-1.564-.644c-.43-.43-.645-.951-.645-1.565 0-.613.215-1.135.645-1.565.429-.43.95-.644 1.564-.644.614 0 1.135.215 1.565.644.43.43.644.952.644 1.565a2.13 2.13 0 0 1-.644 1.565c-.43.43-.951.644-1.565.644Zm0 3.928a9.471 9.471 0 0 1-5.44-1.668c-1.637-1.11-2.824-2.6-3.56-4.469.736-1.868 1.923-3.358 3.56-4.47A9.474 9.474 0 0 1 12 6c1.99 0 3.805.556 5.44 1.667 1.637 1.111 2.824 2.601 3.56 4.47-.736 1.867-1.923 3.357-3.56 4.468A9.471 9.471 0 0 1 12 18.273Zm0-1.637a7.81 7.81 0 0 0 4.245-1.217 7.994 7.994 0 0 0 2.955-3.283 8 8 0 0 0-2.955-3.283A7.813 7.813 0 0 0 12 7.636c-1.54 0-2.956.406-4.245 1.217A8 8 0 0 0 4.8 12.136a7.995 7.995 0 0 0 2.955 3.283A7.81 7.81 0 0 0 12 16.636Z" />
  </svg>
);
SvgEye.displayName = 'SvgEye';
const EyeIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgEye {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
EyeIcon.displayName = 'EyeIcon';
export default EyeIcon;
