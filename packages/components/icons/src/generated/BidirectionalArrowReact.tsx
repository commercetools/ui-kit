// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/bidirectional-arrow.react.svg
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
const SvgBidirectionalArrow = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="m14.97 13.01-3.24-3.24a.8.8 0 0 1-.19-.293 1 1 0 0 1-.057-.337q0-.18.056-.338a.8.8 0 0 1 .191-.292l3.24-3.24q.27-.27.63-.27t.63.27.27.64q0 .373-.27.643L14.543 8.24H20.1a.87.87 0 0 1 .64.258q.26.26.26.642a.87.87 0 0 1-.26.64.87.87 0 0 1-.64.26h-5.558l1.688 1.688q.27.27.27.63t-.27.63a.94.94 0 0 1-.618.292q-.35.023-.642-.27m-7.2 5.377q.27.27.63.281t.63-.258l3.24-3.24a.8.8 0 0 0 .192-.293q.056-.156.056-.337-.001-.18-.056-.337a.8.8 0 0 0-.192-.293l-3.24-3.24a.86.86 0 0 0-.63-.27q-.36 0-.63.27a.88.88 0 0 0-.27.64q0 .373.27.643l1.688 1.687H3.9a.87.87 0 0 0-.64.258.87.87 0 0 0-.26.642q0 .383.26.64.257.26.64.26h5.557L7.77 17.128q-.27.27-.27.63t.27.63" />
  </svg>
);
SvgBidirectionalArrow.displayName = 'SvgBidirectionalArrow';
const BidirectionalArrowIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgBidirectionalArrow
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
BidirectionalArrowIcon.displayName = 'BidirectionalArrowIcon';
export default BidirectionalArrowIcon;
