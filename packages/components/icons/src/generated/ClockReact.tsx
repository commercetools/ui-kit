// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/clock.react.svg
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
const SvgClock = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M14.363 15.623a.826.826 0 0 0 .607.247c.24 0 .45-.09.63-.27a.853.853 0 0 0 .248-.63.853.853 0 0 0-.248-.63l-2.7-2.7V8.377a.835.835 0 0 0-.258-.63A.893.893 0 0 0 12 7.5a.87.87 0 0 0-.64.258.872.872 0 0 0-.26.642v3.577a.927.927 0 0 0 .27.653l2.993 2.992ZM12 21a8.759 8.759 0 0 1-3.51-.71 9.082 9.082 0 0 1-2.857-1.922 9.082 9.082 0 0 1-1.924-2.858A8.759 8.759 0 0 1 3 12c0-1.245.236-2.415.71-3.51a9.082 9.082 0 0 1 1.923-2.857A9.095 9.095 0 0 1 8.49 3.708 8.769 8.769 0 0 1 12 3c1.245 0 2.415.236 3.51.708a9.095 9.095 0 0 1 2.857 1.925 9.082 9.082 0 0 1 1.924 2.857A8.759 8.759 0 0 1 21 12a8.759 8.759 0 0 1-.71 3.51 9.082 9.082 0 0 1-1.922 2.857 9.082 9.082 0 0 1-2.858 1.924A8.759 8.759 0 0 1 12 21Zm0-1.8c1.995 0 3.694-.701 5.097-2.103C18.499 15.694 19.2 13.995 19.2 12c0-1.995-.701-3.694-2.103-5.097C15.694 5.501 13.995 4.8 12 4.8c-1.995 0-3.694.701-5.096 2.103C5.501 8.306 4.8 10.005 4.8 12c0 1.995.701 3.694 2.104 5.097C8.306 18.499 10.005 19.2 12 19.2Z" />
  </svg>
);
SvgClock.displayName = 'SvgClock';
const ClockIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgClock {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
ClockIcon.displayName = 'ClockIcon';
export default ClockIcon;
