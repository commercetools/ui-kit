// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/revert.react.svg
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
const SvgRevert = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M7.132 20.27a1.12 1.12 0 0 1-.824-.334 1.117 1.117 0 0 1-.332-.822c0-.328.11-.602.332-.823a1.12 1.12 0 0 1 .824-.333h7.05c1.213 0 2.267-.385 3.162-1.156.897-.77 1.345-1.733 1.345-2.889 0-1.156-.448-2.119-1.345-2.89-.895-.77-1.95-1.155-3.163-1.155h-7.28l2.195 2.196c.212.212.318.481.318.809 0 .327-.106.597-.318.809a1.096 1.096 0 0 1-.809.318c-.327 0-.597-.106-.809-.318l-4.16-4.16a1.02 1.02 0 0 1-.246-.376A1.288 1.288 0 0 1 3 8.712c0-.154.024-.298.072-.433.048-.135.13-.26.246-.376l4.16-4.16c.212-.212.482-.318.81-.318.327 0 .596.106.808.318.212.212.318.481.318.809 0 .327-.106.597-.318.809L6.9 7.557h7.281c1.869 0 3.473.606 4.812 1.82C20.33 10.59 21 12.102 21 13.913c0 1.81-.67 3.323-2.007 4.536-1.34 1.214-2.943 1.82-4.812 1.82h-7.05Z" />
  </svg>
);
SvgRevert.displayName = 'SvgRevert';
const RevertIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgRevert {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
RevertIcon.displayName = 'RevertIcon';
export default RevertIcon;
