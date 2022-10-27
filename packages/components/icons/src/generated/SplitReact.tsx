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
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M2 12c0-.283.096-.52.288-.712A.965.965 0 0 1 3 11h4c.933 0 1.625-.142 2.075-.425.45-.283.892-.658 1.325-1.125l1.425 1.425c-.183.2-.379.392-.587.575-.209.183-.43.367-.663.55.317.233.596.471.838.713.241.241.479.487.712.737a11.384 11.384 0 0 0 2.025 1.725c.767.517 2.108.792 4.025.825l-.875-.875a.932.932 0 0 1-.275-.687c0-.275.092-.513.275-.713.2-.2.438-.3.713-.3.275 0 .512.1.712.3L21.3 16.3c.1.1.171.208.213.325.041.117.062.242.062.375s-.02.258-.062.375a.883.883 0 0 1-.213.325l-2.6 2.6a.978.978 0 0 1-.687.288.933.933 0 0 1-.713-.288.948.948 0 0 1-.275-.7c0-.283.092-.517.275-.7l.875-.9c-2.383-.033-4.079-.4-5.087-1.1-1.009-.7-1.83-1.4-2.463-2.1a9.446 9.446 0 0 0-1.412-1.3C8.754 13.167 8.017 13 7 13H3a.967.967 0 0 1-.712-.287A.968.968 0 0 1 2 12Zm13.825-5.8c.333-.067.7-.113 1.1-.138.4-.025.817-.045 1.25-.062l-.9-.9A.933.933 0 0 1 17 4.412c0-.275.1-.512.3-.712a.948.948 0 0 1 .7-.275c.283 0 .517.092.7.275l2.6 2.6c.1.1.171.208.213.325.041.117.062.242.062.375s-.02.258-.062.375a.883.883 0 0 1-.213.325l-2.6 2.6c-.2.2-.433.296-.7.288a1.008 1.008 0 0 1-.975-1.013c0-.267.092-.5.275-.7L18.15 8c-.35 0-.68.017-.988.05a52.44 52.44 0 0 0-.862.1l-.475-1.95Zm-4.4 2.15c.35-.333.758-.654 1.225-.962.467-.309 1.042-.58 1.725-.813L14.85 8.5c-.45.167-.833.358-1.15.575-.317.217-.6.45-.85.7L11.425 8.35Z" />
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
