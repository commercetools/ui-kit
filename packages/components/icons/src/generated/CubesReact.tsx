// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/cubes.react.svg
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
const SvgCubes = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m20.837 12.696-4.265-1.558V6.393a.215.215 0 0 0-.145-.203L12.06 4.594a.218.218 0 0 0-.14 0L7.56 6.146a.201.201 0 0 0-.1.074.215.215 0 0 0-.05.136v4.78l-4.26 1.516a.203.203 0 0 0-.1.074.215.215 0 0 0-.05.137v4.823c0 .09.058.172.144.202l4.362 1.5a.22.22 0 0 0 .141 0l4.344-1.493 4.335 1.493a.22.22 0 0 0 .142 0l4.362-1.502a.214.214 0 0 0 .152-.205V12.9a.214.214 0 0 0-.145-.203Zm-5.025-1.885-3.352 1.133V8.356l3.352-1.227v3.682ZM11.99 5.373l3.117 1.162-3.114 1.15-3.29-1.132 3.287-1.18Zm-4.407 8.82-3.29-1.134 3.287-1.18 3.117 1.162-3.114 1.151Zm3.819 3.125L8.05 18.45v-3.588l3.352-1.226v3.682Zm5.001-3.126-3.29-1.133 3.287-1.18 3.118 1.162-3.115 1.151Zm3.819 3.126L16.87 18.45v-3.588l3.352-1.226v3.682Z"
      fillRule="evenodd"
    />
  </svg>
);
SvgCubes.displayName = 'SvgCubes';
const CubesIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgCubes {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
CubesIcon.displayName = 'CubesIcon';
export default CubesIcon;
