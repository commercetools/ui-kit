// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/pin-gear.react.svg

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

const SvgPinGear = (props: SVGProps) => (
  <svg
    width={18}
    height={18}
    viewBox="0 0 18 18"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <defs>
      <path
        d="m19.938 16.541.976.742a.223.223 0 0 1 .056.288l-.925 1.557c-.056.1-.176.14-.282.1l-1.152-.45c-.241.175-.5.328-.782.44l-.176 1.193a.224.224 0 0 1-.227.189h-1.85a.224.224 0 0 1-.227-.189l-.176-1.193a3.404 3.404 0 0 1-.782-.44l-1.151.45a.236.236 0 0 1-.283-.1l-.925-1.557a.223.223 0 0 1 .056-.288l.976-.742v-.882l-.976-.743a.218.218 0 0 1-.056-.288l.925-1.557c.056-.099.176-.139.283-.099l1.151.45c.241-.175.5-.328.782-.44l.176-1.193a.224.224 0 0 1 .227-.189h1.85c.116 0 .213.081.227.189l.176 1.192c.282.113.541.261.782.441l1.152-.45a.236.236 0 0 1 .282.1l.925 1.556a.223.223 0 0 1-.056.288l-.976.743v.882Zm-3.437 1.134c.893 0 1.62-.707 1.62-1.575 0-.869-.727-1.575-1.62-1.575-.893 0-1.62.706-1.62 1.575 0 .868.727 1.575 1.62 1.575Z"
        id="pin-gear_react_svg__a"
      />
    </defs>
    <g fillRule="evenodd">
      <use xlinkHref="#pin-gear_react_svg__a" transform="translate(-3 -3)" />
      <path d="m5.664 11.893-3.74 5.342-1.407-.985 3.74-5.342-3.4-2.382c.867-.762 1.619-.92 2.256-.475.001.002 1.329-1.894 3.982-5.686C6.21 1.63 6.063.844 6.653 0c0-.003 2.803 1.96 8.412 5.89-.758.839-1.539.977-2.343.414.002.001-.565.81-1.7 2.428l-1.394-.976 1.7-2.428-2.826-1.98L4.52 9.038l2.11 1.477 1.712 1.2-.965 1.378-1.713-1.2Z" />
    </g>
  </svg>
);

SvgPinGear.displayName = 'SvgPinGear';

const PinGearIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgPinGear {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

PinGearIcon.displayName = 'PinGearIcon';
export default PinGearIcon;
