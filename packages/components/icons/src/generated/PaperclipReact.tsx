// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/paperclip.react.svg
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
const SvgPaperclip = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11.95 21c-1.38 0-2.55-.48-3.51-1.44S7 17.43 7 16.05V6.6c0-.99.353-1.837 1.057-2.542C8.762 3.353 9.61 3 10.6 3c.99 0 1.838.353 2.543 1.058.704.705 1.057 1.552 1.057 2.542v8.55c0 .63-.217 1.162-.652 1.597a2.173 2.173 0 0 1-1.598.653c-.63 0-1.162-.217-1.598-.652A2.173 2.173 0 0 1 9.7 15.15V7.275a.653.653 0 0 1 .675-.675.656.656 0 0 1 .675.675v7.875c0 .255.086.469.26.64.171.174.385.26.64.26a.872.872 0 0 0 .642-.26.87.87 0 0 0 .258-.64V6.6c0-.63-.217-1.162-.652-1.597A2.173 2.173 0 0 0 10.6 4.35c-.63 0-1.162.218-1.598.653A2.173 2.173 0 0 0 8.35 6.6v9.45c0 .99.353 1.837 1.058 2.543.705.704 1.552 1.057 2.542 1.057.99 0 1.838-.352 2.543-1.057.704-.706 1.057-1.553 1.057-2.543V7.275a.653.653 0 0 1 .675-.675.656.656 0 0 1 .675.675v8.775c0 1.38-.48 2.55-1.44 3.51S13.33 21 11.95 21Z" />
  </svg>
);
SvgPaperclip.displayName = 'SvgPaperclip';
const PaperclipIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgPaperclip {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
PaperclipIcon.displayName = 'PaperclipIcon';
export default PaperclipIcon;
