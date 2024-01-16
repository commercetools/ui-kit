// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/eye-crossed.react.svg
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
const SvgEyeCrossed = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="m15.355 12.39-1.187-1.186q.184-.96-.552-1.8-.736-.838-1.902-.654l-1.187-1.186q.348-.164.706-.246T12 7.236q1.534 0 2.608 1.074t1.074 2.608q0 .41-.082.768a3.5 3.5 0 0 1-.245.705m2.618 2.578-1.187-1.145a9 9 0 0 0 1.381-1.3 7.3 7.3 0 0 0 1.033-1.605 8.05 8.05 0 0 0-2.936-3.283Q14.352 6.418 12 6.418q-.594 0-1.166.082a8 8 0 0 0-1.125.245L8.441 5.477A9.1 9.1 0 0 1 12 4.782q3.09 0 5.502 1.707A9.74 9.74 0 0 1 21 10.92a9.6 9.6 0 0 1-1.237 2.24 9 9 0 0 1-1.79 1.81M18.382 20l-3.437-3.395q-.715.225-1.441.337a10 10 0 0 1-1.504.113q-3.09 0-5.502-1.708A9.74 9.74 0 0 1 3 10.918a9.7 9.7 0 0 1 1.084-2.015 9.4 9.4 0 0 1 1.493-1.667l-2.25-2.29L4.473 3.8l15.054 15.055zM6.722 8.382A9 9 0 0 0 5.64 9.548q-.492.634-.839 1.37a8.04 8.04 0 0 0 2.935 3.283Q9.648 15.418 12 15.418q.41 0 .798-.05.389-.052.797-.114l-.736-.777q-.225.062-.43.092A3 3 0 0 1 12 14.6q-1.534 0-2.608-1.073-1.074-1.075-1.074-2.609 0-.225.03-.43.032-.204.093-.429z" />
  </svg>
);
SvgEyeCrossed.displayName = 'SvgEyeCrossed';
const EyeCrossedIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgEyeCrossed {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
EyeCrossedIcon.displayName = 'EyeCrossedIcon';
export default EyeCrossedIcon;
