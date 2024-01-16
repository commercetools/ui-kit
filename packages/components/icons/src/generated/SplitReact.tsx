// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/split.react.svg
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
const SvgSplit = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M3 11.885q0-.39.265-.655a.89.89 0 0 1 .655-.264h3.678q1.287 0 1.908-.391.621-.39 1.218-1.035l1.31 1.31q-.252.275-.54.53-.287.252-.609.505.437.322.77.656.334.332.655.677a10.5 10.5 0 0 0 1.862 1.587q1.058.713 3.702.758l-.805-.804a.86.86 0 0 1-.253-.632q0-.38.253-.656a.9.9 0 0 1 .656-.276q.378 0 .654.276l2.368 2.368a.8.8 0 0 1 .196.299q.057.16.057.345 0 .183-.057.345a.8.8 0 0 1-.196.298l-2.39 2.391a.9.9 0 0 1-.632.265.86.86 0 0 1-.656-.265.87.87 0 0 1-.253-.643q0-.392.253-.644l.805-.828q-3.288-.045-4.678-1.011-1.392-.966-2.265-1.931a8.7 8.7 0 0 0-1.298-1.196q-.633-.46-2.035-.46H3.92a.9.9 0 0 1-.655-.263.9.9 0 0 1-.265-.656m12.713-5.333a8 8 0 0 1 1.011-.127 50 50 0 0 1 1.15-.057l-.828-.828a.86.86 0 0 1-.253-.632q0-.38.276-.655A.87.87 0 0 1 17.713 4q.39 0 .643.253l2.391 2.39a.8.8 0 0 1 .196.3q.057.16.057.344t-.057.345a.8.8 0 0 1-.196.299l-2.39 2.39a.84.84 0 0 1-.644.266.927.927 0 0 1-.897-.932q0-.368.253-.644l.782-.804q-.483 0-.909.046-.424.045-.793.092zm-4.046 1.977a8 8 0 0 1 1.126-.885q.644-.426 1.586-.747l.437 1.77a4.86 4.86 0 0 0-1.839 1.172z" />
  </svg>
);
SvgSplit.displayName = 'SvgSplit';
const SplitIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgSplit {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
SplitIcon.displayName = 'SplitIcon';
export default SplitIcon;
