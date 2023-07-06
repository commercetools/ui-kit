// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/calendar.react.svg
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
const SvgCalendar = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M12.1 13.8a.869.869 0 0 1-.64-.26.869.869 0 0 1-.26-.64c0-.255.086-.469.26-.642A.87.87 0 0 1 12.1 12c.255 0 .469.086.642.258A.873.873 0 0 1 13 12.9a.87.87 0 0 1-.258.64.872.872 0 0 1-.642.26Zm-3.6 0a.872.872 0 0 1-.642-.26.87.87 0 0 1-.258-.64c0-.255.086-.469.258-.642A.873.873 0 0 1 8.5 12c.255 0 .469.086.642.258a.873.873 0 0 1 .258.642.87.87 0 0 1-.258.64.872.872 0 0 1-.642.26Zm7.2 0a.869.869 0 0 1-.64-.26.869.869 0 0 1-.26-.64c0-.255.086-.469.26-.642A.87.87 0 0 1 15.7 12a.87.87 0 0 1 .64.258c.174.173.26.387.26.642a.869.869 0 0 1-.26.64.869.869 0 0 1-.64.26Zm-3.6 3.6a.869.869 0 0 1-.64-.26.869.869 0 0 1-.26-.64c0-.255.086-.469.26-.64a.869.869 0 0 1 .64-.26c.255 0 .469.086.642.26a.87.87 0 0 1 .258.64.87.87 0 0 1-.258.64.872.872 0 0 1-.642.26Zm-3.6 0a.872.872 0 0 1-.642-.26.87.87 0 0 1-.258-.64.87.87 0 0 1 .258-.64.872.872 0 0 1 .642-.26c.255 0 .469.086.642.26a.87.87 0 0 1 .258.64.87.87 0 0 1-.258.64.872.872 0 0 1-.642.26Zm7.2 0a.869.869 0 0 1-.64-.26.869.869 0 0 1-.26-.64c0-.255.086-.469.26-.64a.869.869 0 0 1 .64-.26c.255 0 .469.086.64.26.174.171.26.385.26.64a.869.869 0 0 1-.26.64.869.869 0 0 1-.64.26ZM5.8 21c-.495 0-.919-.176-1.272-.528A1.736 1.736 0 0 1 4 19.2V6.6c0-.495.176-.919.528-1.27.353-.354.777-.53 1.272-.53h.9v-.9c0-.255.086-.469.258-.642A.873.873 0 0 1 7.6 3c.255 0 .469.086.642.258A.873.873 0 0 1 8.5 3.9v.9h7.2v-.9c0-.255.086-.469.26-.642A.87.87 0 0 1 16.6 3a.87.87 0 0 1 .64.258c.174.173.26.387.26.642v.9h.9c.495 0 .919.176 1.272.53.352.351.528.775.528 1.27v12.6c0 .495-.176.919-.528 1.272A1.736 1.736 0 0 1 18.4 21H5.8Zm0-1.8h12.6v-9H5.8v9Zm0-10.8h12.6V6.6H5.8v1.8Zm0 0V6.6v1.8Z" />
  </svg>
);
SvgCalendar.displayName = 'SvgCalendar';
const CalendarIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgCalendar {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
CalendarIcon.displayName = 'CalendarIcon';
export default CalendarIcon;
