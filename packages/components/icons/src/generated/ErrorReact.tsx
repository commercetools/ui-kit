// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/error.react.svg
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
const SvgError = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M12 21a8.8 8.8 0 0 1-3.511-.709 9 9 0 0 1-2.857-1.933 9.2 9.2 0 0 1-1.923-2.868A8.8 8.8 0 0 1 3 11.979q0-1.869.709-3.502a9.1 9.1 0 0 1 1.923-2.846 9.1 9.1 0 0 1 2.857-1.922A8.8 8.8 0 0 1 12 3q1.869 0 3.512.709a9.1 9.1 0 0 1 2.857 1.922 9.1 9.1 0 0 1 1.922 2.846A8.7 8.7 0 0 1 21 11.98a8.8 8.8 0 0 1-.709 3.511 9.2 9.2 0 0 1-1.922 2.868 9 9 0 0 1-2.857 1.933A8.8 8.8 0 0 1 12 21m0-2.277q2.814 0 4.768-1.965 1.956-1.966 1.955-4.78 0-1.052-.31-2.04a6.4 6.4 0 0 0-.936-1.847l-9.365 9.365q.816.645 1.826.955 1.01.312 2.062.312m-5.477-2.857 9.343-9.386a6.5 6.5 0 0 0-1.836-.902q-.977-.3-2.03-.301-2.814 0-4.768 1.943-1.955 1.945-1.955 4.759 0 1.052.31 2.04.313.989.936 1.847" />
  </svg>
);
SvgError.displayName = 'SvgError';
const ErrorIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgError {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
ErrorIcon.displayName = 'ErrorIcon';
export default ErrorIcon;
