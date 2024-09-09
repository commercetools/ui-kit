// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'pnpm generate-icons'.
// Original SVG file: src/svg/group-add.react.svg
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
const SvgGroupAdd = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path
      fill="#1A1A1A"
      d="M12.375 11.963q.544-.6.834-1.37Q13.5 9.826 13.5 9t-.29-1.594a4.3 4.3 0 0 0-.835-1.368q1.125.15 1.875.993Q15 7.875 15 9t-.75 1.969q-.75.843-1.875.994M16.087 18q.207-.338.31-.722t.103-.778v-.75q0-.675-.3-1.284a3.8 3.8 0 0 0-.787-1.078 8.2 8.2 0 0 1 1.771.871q.816.535.816 1.491v.75q0 .62-.44 1.06T16.5 18zM18 11.25h-.75a.73.73 0 0 1-.534-.216.73.73 0 0 1-.216-.534q0-.319.216-.534a.73.73 0 0 1 .534-.216H18V9q0-.319.216-.534a.73.73 0 0 1 .534-.216q.318 0 .534.216A.73.73 0 0 1 19.5 9v.75h.75q.318 0 .534.216A.73.73 0 0 1 21 10.5q0 .319-.216.534a.73.73 0 0 1-.534.216h-.75V12q0 .319-.216.534a.73.73 0 0 1-.534.216.73.73 0 0 1-.534-.216A.73.73 0 0 1 18 12zM9 12a2.9 2.9 0 0 1-2.119-.881A2.9 2.9 0 0 1 6 9q0-1.237.881-2.119A2.9 2.9 0 0 1 9 6q1.237 0 2.119.881.88.882.881 2.119 0 1.237-.881 2.119A2.9 2.9 0 0 1 9 12m-6 4.5v-.6q0-.638.328-1.172.329-.534.872-.816a11 11 0 0 1 2.363-.871q1.2-.291 2.437-.291t2.438.29 2.362.873q.543.28.872.815T15 15.9v.6q0 .62-.44 1.06-.442.44-1.06.44h-9q-.618 0-1.06-.44A1.45 1.45 0 0 1 3 16.5m6-6q.619 0 1.06-.44.44-.442.44-1.06t-.44-1.06A1.44 1.44 0 0 0 9 7.5q-.619 0-1.06.44Q7.5 8.383 7.5 9t.44 1.06q.442.44 1.06.44m-4.5 6h9v-.6a.73.73 0 0 0-.375-.638 9.8 9.8 0 0 0-2.044-.759 8.7 8.7 0 0 0-4.162 0 9.8 9.8 0 0 0-2.044.76.73.73 0 0 0-.375.637z"
    />
  </svg>
);
SvgGroupAdd.displayName = 'SvgGroupAdd';
const GroupAddIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgGroupAdd {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
GroupAddIcon.displayName = 'GroupAddIcon';
export default GroupAddIcon;
