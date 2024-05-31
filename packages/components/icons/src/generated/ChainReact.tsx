// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/chain.react.svg
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
const SvgChain = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M7.5 17q-1.867 0-3.183-1.317Q3 14.367 3 12.5t1.317-3.184Q5.632 8 7.5 8h2.7q.383 0 .642.258a.87.87 0 0 1 .258.642.87.87 0 0 1-.258.64.87.87 0 0 1-.642.26H7.5q-1.126 0-1.912.787A2.6 2.6 0 0 0 4.8 12.5q0 1.125.788 1.912A2.6 2.6 0 0 0 7.5 15.2h2.7q.383 0 .642.258a.87.87 0 0 1 .258.642.87.87 0 0 1-.258.64.87.87 0 0 1-.642.26zm1.8-3.6a.87.87 0 0 1-.64-.26.87.87 0 0 1-.26-.64q0-.383.26-.642a.87.87 0 0 1 .64-.258h5.4q.383 0 .642.258a.87.87 0 0 1 .258.642.87.87 0 0 1-.258.64.87.87 0 0 1-.642.26zm4.5 3.6a.87.87 0 0 1-.64-.26.87.87 0 0 1-.26-.64q0-.383.26-.642a.87.87 0 0 1 .64-.258h2.7q1.125 0 1.913-.787A2.6 2.6 0 0 0 19.2 12.5q0-1.125-.787-1.912A2.6 2.6 0 0 0 16.5 9.8h-2.7a.87.87 0 0 1-.64-.26.87.87 0 0 1-.26-.64q0-.383.26-.642A.87.87 0 0 1 13.8 8h2.7q1.867 0 3.184 1.316Q21 10.633 21 12.5t-1.316 3.183Q18.367 17 16.5 17z" />
  </svg>
);
SvgChain.displayName = 'SvgChain';
const ChainIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgChain {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
ChainIcon.displayName = 'ChainIcon';
export default ChainIcon;
