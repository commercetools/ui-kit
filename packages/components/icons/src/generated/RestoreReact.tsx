// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/restore.react.svg
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
const SvgRestore = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="m13 11.6 2.5 2.5a.948.948 0 0 1 .275.7.948.948 0 0 1-.275.7.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275l-2.8-2.8a1.03 1.03 0 0 1-.3-.725V8c0-.283.096-.521.288-.713A.967.967 0 0 1 12 7a.97.97 0 0 1 .713.287A.97.97 0 0 1 13 8v3.6ZM12 21c-2.017 0-3.825-.596-5.425-1.788-1.6-1.191-2.675-2.745-3.225-4.662-.083-.3-.054-.583.088-.85a.947.947 0 0 1 .662-.5.828.828 0 0 1 .763.187c.225.192.379.43.462.713a6.571 6.571 0 0 0 2.513 3.55A6.922 6.922 0 0 0 12 19c1.95 0 3.604-.68 4.962-2.038C18.321 15.604 19 13.95 19 12c0-1.95-.68-3.604-2.038-4.963C15.604 5.679 13.95 5 12 5a6.75 6.75 0 0 0-3.225.8A7.431 7.431 0 0 0 6.25 8H8a.97.97 0 0 1 .713.287A.97.97 0 0 1 9 9c0 .283-.096.52-.287.712A.968.968 0 0 1 8 10H4a.965.965 0 0 1-.712-.288A.965.965 0 0 1 3 9V5c0-.283.096-.521.288-.713A.967.967 0 0 1 4 4a.97.97 0 0 1 .713.287A.97.97 0 0 1 5 5v1.35a8.73 8.73 0 0 1 3.113-2.475A8.928 8.928 0 0 1 12 3c1.25 0 2.421.237 3.513.712a9.168 9.168 0 0 1 2.85 1.925 9.167 9.167 0 0 1 1.925 2.85A8.715 8.715 0 0 1 21 12c0 1.25-.237 2.42-.712 3.512a9.151 9.151 0 0 1-1.925 2.85 9.158 9.158 0 0 1-2.85 1.926A8.715 8.715 0 0 1 12 21Z" />
  </svg>
);
SvgRestore.displayName = 'SvgRestore';
const RestoreIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgRestore {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
RestoreIcon.displayName = 'RestoreIcon';
export default RestoreIcon;
