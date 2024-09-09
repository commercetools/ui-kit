// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'pnpm generate-icons'.
// Original SVG file: src/svg/world.react.svg
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
  /**
   * The size of the icon. 'small', 'medium', 'big' have been deprecated in favor of '10', '20', '30', '40'.
   */
  size?: 'small' | 'medium' | 'big' | 'scale' | '10' | '20' | '30' | '40';
};
export type SVGProps = Props & {
  className: string;
};
const iconSizes = {
  small: 12,
  medium: 16,
  big: 24,
  '10': 12,
  '20': 16,
  '30': 20,
  '40': 24,
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
    case '10':
    case '20':
    case '30':
    case '40':
      return {
        width: `${iconSizes[size]}px`,
        height: `${iconSizes[size]}px`,
      };
    default:
      return {
        width: `${iconSizes['40']}px`,
        height: `${iconSizes['40']}px`,
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
const SvgWorld = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M12 21a8.7 8.7 0 0 1-3.488-.71 9.1 9.1 0 0 1-2.868-1.934 9.1 9.1 0 0 1-1.935-2.869A8.7 8.7 0 0 1 3 12q0-1.867.71-3.498a9.2 9.2 0 0 1 1.934-2.858 9.1 9.1 0 0 1 2.868-1.936A8.7 8.7 0 0 1 12 3q1.867 0 3.498.708a9.2 9.2 0 0 1 2.858 1.936 9.2 9.2 0 0 1 1.935 2.858A8.7 8.7 0 0 1 21 12q0 1.845-.71 3.488a9.1 9.1 0 0 1-1.934 2.868 9.2 9.2 0 0 1-2.858 1.935A8.7 8.7 0 0 1 12 21m0-1.845q.585-.81 1.012-1.687.428-.878.698-1.868h-3.42q.27.99.698 1.868.427.876 1.012 1.687m-2.34-.36a12.4 12.4 0 0 1-.708-1.542 13 13 0 0 1-.507-1.653H5.79q.653 1.125 1.63 1.958a6.5 6.5 0 0 0 2.24 1.237m4.68 0a6.5 6.5 0 0 0 2.238-1.238A7.5 7.5 0 0 0 18.21 15.6h-2.655q-.203.855-.506 1.653-.304.8-.709 1.542M5.025 13.8h3.06q-.067-.45-.102-.89a12 12 0 0 1 0-1.82q.034-.44.102-.89h-3.06q-.112.45-.17.89A7 7 0 0 0 4.8 12a7.2 7.2 0 0 0 .225 1.8m4.86 0h4.23q.068-.45.102-.89a12 12 0 0 0 0-1.82q-.035-.44-.102-.89h-4.23A12 12 0 0 0 9.75 12a12 12 0 0 0 .135 1.8m6.03 0h3.06q.112-.45.17-.89A7 7 0 0 0 19.2 12a7.2 7.2 0 0 0-.225-1.8h-3.06a12 12 0 0 1 .135 1.8 12 12 0 0 1-.135 1.8m-.36-5.4h2.655a7.5 7.5 0 0 0-1.632-1.958 6.5 6.5 0 0 0-2.238-1.237q.404.743.71 1.54.302.8.505 1.655m-5.265 0h3.42q-.27-.99-.698-1.868A11.4 11.4 0 0 0 12 4.845q-.585.81-1.012 1.688A10.7 10.7 0 0 0 10.29 8.4m-4.5 0h2.655q.203-.855.507-1.654a12.4 12.4 0 0 1 .708-1.541 6.5 6.5 0 0 0-2.24 1.237A7.5 7.5 0 0 0 5.79 8.4" />
  </svg>
);
SvgWorld.displayName = 'SvgWorld';
const WorldIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgWorld {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
WorldIcon.displayName = 'WorldIcon';
export default WorldIcon;
