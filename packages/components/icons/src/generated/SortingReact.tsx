// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/sorting.react.svg
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
const SvgSorting = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M14 17.804V12q0-.4.27-.67t.67-.27q.4 0 .67.27t.27.67v5.804l1.762-1.762a.92.92 0 0 1 .646-.27.88.88 0 0 1 .67.27.88.88 0 0 1 .294.645.88.88 0 0 1-.27.67l-3.384 3.384a.8.8 0 0 1-.306.2q-.165.06-.352.059-.188 0-.352-.06a.8.8 0 0 1-.306-.199l-3.384-3.383a.88.88 0 0 1-.258-.646q0-.388.282-.67a1 1 0 0 1 .658-.27q.376-.012.658.27zM8.36 6.196 6.598 7.958q-.305.306-.682.282a.95.95 0 0 1-.634-.282.92.92 0 0 1-.282-.67q0-.387.258-.646l3.384-3.384a.8.8 0 0 1 .306-.2Q9.113 3 9.3 3q.188 0 .353.058a.8.8 0 0 1 .305.2l3.384 3.384a.9.9 0 0 1 .258.658.9.9 0 0 1-.258.658.91.91 0 0 1-.67.282.92.92 0 0 1-.67-.282L10.24 6.196V12q0 .4-.27.67a.9.9 0 0 1-.67.27.9.9 0 0 1-.669-.27.9.9 0 0 1-.27-.67z" />
  </svg>
);
SvgSorting.displayName = 'SvgSorting';
const SortingIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgSorting {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
SortingIcon.displayName = 'SortingIcon';
export default SortingIcon;
