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
const SvgRestore = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="m13 11.6 2.5 2.5a.95.95 0 0 1 .275.7.95.95 0 0 1-.275.7.95.95 0 0 1-.7.275.95.95 0 0 1-.7-.275l-2.8-2.8a1.03 1.03 0 0 1-.3-.725V8q0-.425.288-.713A.97.97 0 0 1 12 7a.97.97 0 0 1 .713.287A.97.97 0 0 1 13 8zM12 21q-3.025 0-5.425-1.788-2.4-1.787-3.225-4.662-.125-.45.088-.85a.95.95 0 0 1 .662-.5.83.83 0 0 1 .763.187q.338.288.462.713a6.57 6.57 0 0 0 2.513 3.55A6.92 6.92 0 0 0 12 19q2.925 0 4.962-2.038T19 12q0-2.925-2.038-4.963Q14.925 5 12 5a6.75 6.75 0 0 0-3.225.8A7.4 7.4 0 0 0 6.25 8H8a.97.97 0 0 1 .713.287A.97.97 0 0 1 9 9q0 .424-.287.712A.97.97 0 0 1 8 10H4a.97.97 0 0 1-.712-.288A.97.97 0 0 1 3 9V5q0-.425.288-.713A.97.97 0 0 1 4 4a.97.97 0 0 1 .713.287A.97.97 0 0 1 5 5v1.35a8.7 8.7 0 0 1 3.113-2.475A8.9 8.9 0 0 1 12 3q1.875 0 3.513.712a9.2 9.2 0 0 1 2.85 1.925 9.2 9.2 0 0 1 1.925 2.85A8.7 8.7 0 0 1 21 12q0 1.874-.712 3.512a9.2 9.2 0 0 1-1.925 2.85 9.2 9.2 0 0 1-2.85 1.926A8.7 8.7 0 0 1 12 21" />
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
