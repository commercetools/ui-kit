// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/rocket.react.svg

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

const SvgRocket = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path
      d="M7.1 11.35c.233-.467.475-.917.725-1.35.25-.433.525-.867.825-1.3l-1.4-.275-2.1 2.1 1.95.825Zm12.05-6.875c-1.167.033-2.412.375-3.737 1.025A13.487 13.487 0 0 0 11.8 8.1c-.7.7-1.325 1.45-1.875 2.25S8.967 11.9 8.7 12.6l2.85 2.825c.7-.267 1.45-.675 2.25-1.225s1.55-1.175 2.25-1.875a13.563 13.563 0 0 0 2.6-3.6c.65-1.317.992-2.558 1.025-3.725a.574.574 0 0 0-.037-.2.493.493 0 0 0-.288-.288.572.572 0 0 0-.2-.037Zm-5.5 6a1.921 1.921 0 0 1-.575-1.413c0-.558.192-1.029.575-1.412.383-.383.858-.575 1.425-.575.567 0 1.042.192 1.425.575.383.383.575.854.575 1.412a1.92 1.92 0 0 1-.575 1.413c-.383.383-.858.575-1.425.575-.567 0-1.042-.192-1.425-.575Zm-.85 6.55L13.625 19l2.1-2.1-.275-1.4c-.433.3-.867.57-1.3.812-.433.242-.883.48-1.35.713Zm8.775-13.35c.133 1.833-.167 3.62-.9 5.362s-1.892 3.405-3.475 4.988l.5 2.475c.067.333.05.658-.05.975-.1.317-.267.592-.5.825L14 21.45a.978.978 0 0 1-.9.287.894.894 0 0 1-.725-.587l-1.525-3.575L6.575 13.3 3 11.775a.924.924 0 0 1-.6-.725.951.951 0 0 1 .275-.9L5.825 7c.233-.233.513-.4.838-.5.325-.1.654-.117.987-.05l2.475.5c1.583-1.583 3.246-2.742 4.988-3.475 1.741-.733 3.529-1.033 5.362-.9.133.017.267.054.4.112a1.137 1.137 0 0 1 .587.588c.059.133.096.267.113.4Zm-17.65 12.3c.583-.583 1.296-.88 2.137-.888.842-.008 1.555.28 2.138.863s.87 1.296.862 2.137c-.008.842-.304 1.555-.887 2.138-.417.417-1.112.775-2.087 1.075-.975.3-2.321.567-4.038.8.233-1.717.5-3.063.8-4.038.3-.975.658-1.67 1.075-2.087Zm1.425 1.4c-.167.167-.333.471-.5.913a6.453 6.453 0 0 0-.35 1.337 7.03 7.03 0 0 0 1.338-.337c.441-.159.745-.321.912-.488.2-.2.308-.442.325-.725a.907.907 0 0 0-.275-.725.947.947 0 0 0-.725-.288 1.035 1.035 0 0 0-.725.313Z"
      fill="#000"
    />
  </svg>
);

SvgRocket.displayName = 'SvgRocket';

const RocketIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgRocket {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

RocketIcon.displayName = 'RocketIcon';
export default RocketIcon;
