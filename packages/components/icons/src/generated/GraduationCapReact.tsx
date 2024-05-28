// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/graduation-cap.react.svg
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
const SvgGraduationCap = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M11.538 19.01a1.66 1.66 0 0 1-.818-.214l-4.3-2.323a1.7 1.7 0 0 1-.667-.634 1.7 1.7 0 0 1-.237-.893v-4.129l-2.064-1.14a.84.84 0 0 1-.344-.322.9.9 0 0 1-.108-.43.9.9 0 0 1 .108-.43.84.84 0 0 1 .344-.323l7.268-3.957q.195-.108.398-.162a1.66 1.66 0 0 1 1.237.162l8.193 4.473a.8.8 0 0 1 .334.312.87.87 0 0 1 .118.44v5.506a.83.83 0 0 1-.248.613.83.83 0 0 1-.612.248.83.83 0 0 1-.613-.248.83.83 0 0 1-.247-.613V9.871l-1.72.946v4.13q0 .494-.237.892-.237.397-.667.634l-4.301 2.323a1.656 1.656 0 0 1-.817.215m0-6.903 5.892-3.182-5.892-3.183-5.893 3.183zm0 5.183 4.3-2.322V11.72l-3.462 1.914a1.755 1.755 0 0 1-1.269.16 1.7 1.7 0 0 1-.408-.16L7.237 11.72v3.248z" />
  </svg>
);
SvgGraduationCap.displayName = 'SvgGraduationCap';
const GraduationCapIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgGraduationCap
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);
GraduationCapIcon.displayName = 'GraduationCapIcon';
export default GraduationCapIcon;
