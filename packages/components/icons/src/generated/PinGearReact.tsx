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
const SvgPinGear = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={18}
    height={18}
    viewBox="0 0 18 18"
    aria-hidden="true"
    {...props}
  >
    <defs>
      <path
        id="pin-gear_react_svg__a"
        d="m19.938 16.541.976.742a.223.223 0 0 1 .056.288l-.925 1.557c-.056.1-.176.14-.282.1l-1.152-.45c-.241.175-.5.328-.782.44l-.176 1.193a.224.224 0 0 1-.227.189h-1.85a.224.224 0 0 1-.227-.189l-.176-1.193a3.4 3.4 0 0 1-.782-.44l-1.151.45a.236.236 0 0 1-.283-.1l-.925-1.557a.223.223 0 0 1 .056-.288l.976-.742v-.882l-.976-.743a.22.22 0 0 1-.056-.288l.925-1.557c.056-.099.176-.139.283-.099l1.151.45c.241-.175.5-.328.782-.44l.176-1.193a.224.224 0 0 1 .227-.189h1.85c.116 0 .213.081.227.189l.176 1.192q.422.17.782.441l1.152-.45a.236.236 0 0 1 .282.1l.925 1.556a.223.223 0 0 1-.056.288l-.976.743zm-3.437 1.134c.893 0 1.62-.707 1.62-1.575 0-.869-.727-1.575-1.62-1.575s-1.62.706-1.62 1.575c0 .868.727 1.575 1.62 1.575"
      />
    </defs>
    <g fillRule="evenodd">
      <use
        xlinkHref="#pin-gear_react_svg__a"
        fill="#1A1A1A"
        transform="translate(-3 -3)"
      />
      <path
        fill="#1A1A1A"
        d="m5.664 11.893-3.74 5.342-1.407-.985 3.74-5.342-3.4-2.382q1.3-1.143 2.256-.475.002.002 3.982-5.686Q5.768 1.265 6.653 0q0-.005 8.412 5.89-1.137 1.259-2.343.414.003.001-1.7 2.428l-1.394-.976 1.7-2.428-2.826-1.98L4.52 9.038l2.11 1.477 1.712 1.2-.965 1.378z"
      />
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
