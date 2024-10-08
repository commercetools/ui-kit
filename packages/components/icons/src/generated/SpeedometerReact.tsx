// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/speedometer.react.svg
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
const SvgSpeedometer = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M10.605 14.35q.54.54 1.395.528.855-.01 1.26-.618l3.803-5.692q.203-.316-.057-.574-.259-.259-.573-.056L10.74 11.74q-.608.405-.64 1.237-.035.834.505 1.373M5.79 18.4q-.473 0-.9-.225t-.675-.63A8.936 8.936 0 0 1 3 13q0-1.867.71-3.5a9.2 9.2 0 0 1 1.934-2.857 9.1 9.1 0 0 1 2.868-1.935A8.7 8.7 0 0 1 12 4q1.013 0 1.957.213.945.215 1.823.642.473.247.55.675.08.427-.235.81a.79.79 0 0 1-.495.248 1 1 0 0 1-.562-.068A6.8 6.8 0 0 0 12 5.8q-2.993 0-5.096 2.103Q4.8 10.008 4.8 13q0 .945.258 1.867A7.4 7.4 0 0 0 5.79 16.6h12.42q.517-.855.754-1.778a7.7 7.7 0 0 0 .236-1.912 6.3 6.3 0 0 0-.19-1.54 6.8 6.8 0 0 0-.553-1.452.86.86 0 0 1-.09-.608.9.9 0 0 1 .316-.518q.36-.315.787-.18.428.136.63.585.405.856.63 1.767t.27 1.901q0 1.282-.303 2.453a9 9 0 0 1-.912 2.227q-.247.405-.675.63t-.9.225z" />
  </svg>
);
SvgSpeedometer.displayName = 'SvgSpeedometer';
const SpeedometerIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgSpeedometer
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
SpeedometerIcon.displayName = 'SpeedometerIcon';
export default SpeedometerIcon;
