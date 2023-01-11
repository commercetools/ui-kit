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
    | 'inherit';
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

    case 'inherit':
      iconColor = designTokens.colorInherit;
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
    return designTokens.colorInherit;
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
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path d="M10.605 14.35c.36.36.825.536 1.395.528.57-.007.99-.213 1.26-.618l3.803-5.692c.135-.21.116-.402-.057-.574-.172-.173-.364-.191-.573-.056L10.74 11.74c-.405.27-.619.682-.64 1.237-.024.556.145 1.013.505 1.373ZM5.79 18.4c-.315 0-.615-.075-.9-.225-.285-.15-.51-.36-.675-.63A8.936 8.936 0 0 1 3 13c0-1.245.236-2.411.71-3.5a9.161 9.161 0 0 1 1.934-2.857 9.133 9.133 0 0 1 2.868-1.935A8.713 8.713 0 0 1 12 4c.675 0 1.328.071 1.957.213.63.143 1.238.357 1.823.642.315.165.499.39.55.675.054.285-.025.555-.235.81a.785.785 0 0 1-.495.248.995.995 0 0 1-.563-.068A6.788 6.788 0 0 0 12 5.8c-1.995 0-3.694.701-5.096 2.103C5.501 9.306 4.8 11.005 4.8 13c0 .63.086 1.252.258 1.867A7.39 7.39 0 0 0 5.79 16.6h12.42c.345-.57.596-1.163.754-1.778a7.692 7.692 0 0 0 .236-1.912 6.25 6.25 0 0 0-.19-1.54 6.817 6.817 0 0 0-.553-1.452.863.863 0 0 1-.09-.608.891.891 0 0 1 .316-.518c.24-.21.502-.27.787-.18.285.09.495.286.63.585.27.57.48 1.16.63 1.767.15.607.24 1.241.27 1.901 0 .855-.101 1.672-.303 2.453a9 9 0 0 1-.912 2.227c-.165.27-.39.48-.675.63-.285.15-.585.225-.9.225H5.79Z" />
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
