// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/rich-text-body/icons/svg/ordered-list.react.svg
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
const SvgOrderedList = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path
      fill="#1A1A1A"
      fillRule="evenodd"
      d="M4.42 16q.673 0 1.063.306t.39.852q0 .456-.247.775a1.25 1.25 0 0 1-.69.439v.02q.524.073.794.358t.27.766q0 .702-.454 1.093-.453.39-1.295.391-.705 0-1.251-.263v-.875q.252.143.554.233t.6.09q.453 0 .67-.173.215-.172.216-.556 0-.342-.25-.485-.248-.144-.794-.143h-.329v-.789h.335q.504 0 .737-.148t.232-.507q0-.552-.616-.552-.214 0-.435.08a2 2 0 0 0-.49.276l-.424-.709q.593-.48 1.414-.479m16.33 1.962a.4.4 0 0 1 .176.037.14.14 0 0 1 .066.055l.008.033v.75q0 .05-.074.088a.4.4 0 0 1-.111.032l-.065.005h-10.5a.4.4 0 0 1-.176-.037.14.14 0 0 1-.066-.056L10 18.837v-.75q0-.051.074-.088a.4.4 0 0 1 .111-.033l.065-.004zM4.526 9q.4 0 .708.169.307.168.477.472a1.4 1.4 0 0 1 .17.694q0 .34-.105.639-.104.299-.321.612-.218.314-.768.893l-.55.597v.047H6V14H3.012v-.725l1.073-1.25q.476-.564.623-.781.146-.218.21-.403t.064-.384q0-.297-.141-.442a.5.5 0 0 0-.379-.145A1 1 0 0 0 3.98 10a2.5 2.5 0 0 0-.489.375L3 9.705q.315-.31.523-.439.208-.127.454-.197Q4.222 9 4.527 9m16.224 2.5a.4.4 0 0 1 .176.037.14.14 0 0 1 .066.056l.008.032v.75q0 .05-.074.088a.4.4 0 0 1-.111.033l-.065.004h-10.5a.4.4 0 0 1-.176-.037.14.14 0 0 1-.066-.056L10 12.375v-.75q0-.05.074-.088a.4.4 0 0 1 .111-.033l.065-.004zM5 3v4h-.852V4.685l.008-.38.014-.416a5 5 0 0 1-.296.277l-.463.369L3 4.026 4.3 3zm15.75 2.038a.4.4 0 0 1 .176.038.14.14 0 0 1 .066.055l.008.032v.75q0 .052-.074.088a.4.4 0 0 1-.111.033l-.065.004h-10.5a.4.4 0 0 1-.176-.037.14.14 0 0 1-.066-.055L10 5.913v-.75q0-.05.074-.087a.4.4 0 0 1 .111-.033l.065-.005z"
    />
  </svg>
);
SvgOrderedList.displayName = 'SvgOrderedList';
const OrderedListIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgOrderedList
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
OrderedListIcon.displayName = 'OrderedListIcon';
export default OrderedListIcon;
