// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/world.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import { warning } from '@commercetools-uikit/utils';
import { css, ClassNames } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
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
      iconColor = customProperties.colorSolid;
      break;

    case 'neutral60':
      iconColor = customProperties.colorNeutral60;
      break;

    case 'surface':
      iconColor = customProperties.colorSurface;
      break;

    case 'info':
      iconColor = customProperties.colorInfo;
      break;

    case 'primary':
      iconColor = customProperties.colorPrimary;
      break;

    case 'primary40':
      iconColor = customProperties.colorPrimary40;
      break;

    case 'warning':
      iconColor = customProperties.colorWarning;
      break;

    case 'error':
      iconColor = customProperties.colorError;
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
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.708 7.36V7.35h-.005A9.003 9.003 0 0 0 12 3c-4.963 0-9 4.037-9 9 0 1.694.471 3.28 1.288 4.635v.014h.009A9.003 9.003 0 0 0 12 21c4.963 0 9-4.037 9-9a8.947 8.947 0 0 0-1.292-4.64Zm-6.192 12.905a8.378 8.378 0 0 1-1.219.132V16.65h3.828c-.592 1.664-1.5 2.962-2.609 3.616ZM7.875 16.65h3.827v3.748a8.403 8.403 0 0 1-1.218-.131c-1.11-.655-2.017-1.953-2.61-3.617Zm2.608-12.914a8.384 8.384 0 0 1 1.22-.132V7.35H7.874c.592-1.663 1.499-2.961 2.608-3.616Zm5.642 3.616h-3.828V3.603c.415.014.822.06 1.22.132 1.109.655 2.016 1.953 2.608 3.616Zm.193.595c.337 1.137.534 2.414.56 3.756h-4.58V7.946h4.02Zm-4.616 0v3.756h-4.58c.026-1.342.223-2.62.56-3.756h4.02Zm-5.174 3.756H3.603A8.347 8.347 0 0 1 4.64 7.946h2.428a14.859 14.859 0 0 0-.54 3.756Zm0 .596c.024 1.331.214 2.606.54 3.756H4.64a8.346 8.346 0 0 1-1.037-3.756h2.925Zm.595 0h4.58v3.756H7.68a14.271 14.271 0 0 1-.558-3.756Zm5.174 3.756v-3.756h4.58a14.289 14.289 0 0 1-.558 3.756h-4.022Zm5.175-3.756h2.925a8.347 8.347 0 0 1-1.038 3.756h-2.427c.326-1.15.515-2.425.54-3.756Zm0-.596a14.859 14.859 0 0 0-.54-3.756h2.427a8.347 8.347 0 0 1 1.038 3.756h-2.925Zm1.525-4.35h-2.25c-.44-1.306-1.065-2.421-1.826-3.232a8.447 8.447 0 0 1 4.076 3.231ZM9.08 4.12c-.761.81-1.385 1.926-1.827 3.231h-2.25A8.449 8.449 0 0 1 9.08 4.12ZM5.002 16.649h2.25c.442 1.306 1.066 2.42 1.827 3.232a8.45 8.45 0 0 1-4.077-3.232Zm9.92 3.231c.76-.81 1.384-1.925 1.825-3.231h2.25a8.45 8.45 0 0 1-4.076 3.231Z"
      fillRule="evenodd"
    />
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
