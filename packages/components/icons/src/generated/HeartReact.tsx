// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/heart.react.svg

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

const SvgHeart = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m10.65 19.8-1.725-1.575a68.212 68.212 0 0 1-4.787-4.813C2.713 11.821 2 10.067 2 8.15c0-1.567.525-2.875 1.575-3.925C4.625 3.175 5.933 2.65 7.5 2.65c.883 0 1.717.187 2.5.562.783.375 1.45.888 2 1.538a5.962 5.962 0 0 1 2-1.538 5.721 5.721 0 0 1 2.5-.562c1.567 0 2.875.525 3.925 1.575C21.475 5.275 22 6.583 22 8.15c0 1.917-.708 3.675-2.125 5.275a59.847 59.847 0 0 1-4.825 4.825l-1.7 1.55a1.89 1.89 0 0 1-1.35.55 1.89 1.89 0 0 1-1.35-.55Zm.4-13.05c-.483-.683-1-1.204-1.55-1.563-.55-.358-1.217-.537-2-.537-1 0-1.833.333-2.5 1s-1 1.5-1 2.5c0 .867.308 1.787.925 2.762a19.053 19.053 0 0 0 2.213 2.838 38.261 38.261 0 0 0 2.65 2.575c.908.8 1.645 1.458 2.212 1.975.567-.517 1.304-1.175 2.213-1.975a38.57 38.57 0 0 0 2.65-2.575 19.09 19.09 0 0 0 2.212-2.838c.617-.975.925-1.895.925-2.762 0-1-.333-1.833-1-2.5s-1.5-1-2.5-1c-.783 0-1.45.179-2 .537-.55.359-1.067.88-1.55 1.563a1.138 1.138 0 0 1-.95.5 1.138 1.138 0 0 1-.95-.5Z" />
  </svg>
);

SvgHeart.displayName = 'SvgHeart';

const HeartIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgHeart {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

HeartIcon.displayName = 'HeartIcon';
export default HeartIcon;
