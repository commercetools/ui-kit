// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/verified.react.svg

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

const SvgVerified = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    role="img"
    {...props}
  >
    <path
      d="m6.7 19.3-2.75-.6a.942.942 0 0 1-.6-.388.926.926 0 0 1-.175-.687L3.45 14.8l-1.875-2.15a.934.934 0 0 1-.25-.65c0-.25.083-.466.25-.65L3.45 9.2l-.275-2.825a.926.926 0 0 1 .175-.687.943.943 0 0 1 .6-.388l2.75-.6 1.45-2.45a.929.929 0 0 1 .55-.425c.233-.066.467-.058.7.025l2.6 1.1 2.6-1.1c.233-.083.467-.091.7-.025a.93.93 0 0 1 .55.425L17.3 4.7l2.75.6c.25.05.45.18.6.388.15.208.208.437.175.687L20.55 9.2l1.875 2.15c.167.184.25.4.25.65s-.083.467-.25.65L20.55 14.8l.275 2.825a.927.927 0 0 1-.175.687.943.943 0 0 1-.6.388l-2.75.6-1.45 2.45a.93.93 0 0 1-.55.425 1.119 1.119 0 0 1-.7-.025l-2.6-1.1-2.6 1.1a1.119 1.119 0 0 1-.7.025.93.93 0 0 1-.55-.425L6.7 19.3Zm3.55-4.45a.948.948 0 0 0 .7.275.949.949 0 0 0 .7-.275l4.25-4.25c.2-.2.3-.438.3-.713 0-.274-.1-.512-.3-.712-.2-.2-.437-.3-.712-.3-.275 0-.513.1-.713.3L10.95 12.7 9.5 11.275a.974.974 0 0 0-.712-.263.98.98 0 0 0-.688.288.948.948 0 0 0-.275.7c0 .284.092.517.275.7l2.15 2.15Z"
      fill="#000"
    />
  </svg>
);

SvgVerified.displayName = 'SvgVerified';

const VerifiedIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgVerified {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

VerifiedIcon.displayName = 'VerifiedIcon';
export default VerifiedIcon;
