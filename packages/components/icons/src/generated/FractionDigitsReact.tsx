// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/fraction-digits.react.svg
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
const SvgFractionDigits = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <g fillRule="evenodd">
      <path
        fill="#1A1A1A"
        fillRule="nonzero"
        d="M4.686 11.162q0-.492.263-.744.264-.252.768-.252.486 0 .753.258.266.258.266.738 0 .463-.27.73-.269.266-.75.266-.491 0-.76-.26-.27-.261-.27-.736m9.158-3.445q0 2.244-.736 3.322-.735 1.078-2.264 1.078-1.483 0-2.236-1.113t-.753-3.287q0-2.268.733-3.343.732-1.075 2.256-1.075 1.482 0 2.241 1.125t.759 3.293m-4.19 0q0 1.576.273 2.259.272.682.917.682.633 0 .914-.691.28-.691.281-2.25 0-1.577-.284-2.265-.285-.688-.911-.688-.639 0-.914.688-.276.69-.276 2.265m11.04 0q0 2.244-.736 3.322-.735 1.078-2.265 1.078-1.482 0-2.235-1.113t-.753-3.287q0-2.268.732-3.343.733-1.075 2.256-1.075 1.483 0 2.242 1.125t.758 3.293m-4.19 0q0 1.576.272 2.259.273.682.917.682.633 0 .914-.691t.282-2.25q0-1.577-.285-2.265-.284-.688-.91-.688-.639 0-.915.688-.275.69-.275 2.265"
      />
      <g fill="#1A1A1A" fillRule="nonzero">
        <path d="m7.002 18.017-.004-2 10.5-.019.004 2z" />
        <path d="M16.945 13.581v6.869l4.145-3.466z" />
      </g>
    </g>
  </svg>
);
SvgFractionDigits.displayName = 'SvgFractionDigits';
const FractionDigitsIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgFractionDigits
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
FractionDigitsIcon.displayName = 'FractionDigitsIcon';
export default FractionDigitsIcon;
