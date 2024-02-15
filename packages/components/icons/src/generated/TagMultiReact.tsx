// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/tag-multi.react.svg
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
const SvgTagMulti = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="m4.796 18.121-.763-.314a1.58 1.58 0 0 1-.932-1.01 1.9 1.9 0 0 1 .079-1.416l1.616-3.503zm3.594 1.976q-.742 0-1.27-.527a1.73 1.73 0 0 1-.527-1.27v-5.389l2.38 6.602q.068.157.135.304.068.145.18.28zm4.626-.09q-.72.27-1.393-.067a1.87 1.87 0 0 1-.943-1.055L6.683 7.925a1.76 1.76 0 0 1 .045-1.403q.315-.685 1.033-.932l6.782-2.47q.718-.27 1.392.067.675.337.943 1.056l3.998 10.959q.27.718-.045 1.404-.315.684-1.033.931zm-1.932-10.69a.87.87 0 0 0 .64-.258.87.87 0 0 0 .259-.64.87.87 0 0 0-.258-.64.87.87 0 0 0-.64-.258.87.87 0 0 0-.64.258.87.87 0 0 0-.259.64q0 .382.259.64a.87.87 0 0 0 .64.259m1.303 8.984 6.782-2.47L15.17 4.826 8.39 7.297zM8.39 7.297l6.781-2.47z" />
  </svg>
);
SvgTagMulti.displayName = 'SvgTagMulti';
const TagMultiIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgTagMulti {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
TagMultiIcon.displayName = 'TagMultiIcon';
export default TagMultiIcon;
