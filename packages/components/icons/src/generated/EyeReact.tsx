// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/eye.react.svg

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

const SvgEye = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 16c1.25 0 2.313-.437 3.188-1.312S16.5 12.75 16.5 11.5c0-1.25-.437-2.313-1.312-3.188S13.25 7 12 7c-1.25 0-2.313.437-3.188 1.312S7.5 10.25 7.5 11.5c0 1.25.437 2.313 1.312 3.188S10.75 16 12 16Zm0-1.8c-.75 0-1.387-.263-1.912-.788A2.601 2.601 0 0 1 9.3 11.5c0-.75.263-1.388.788-1.913A2.603 2.603 0 0 1 12 8.8c.75 0 1.388.262 1.913.787.525.525.787 1.163.787 1.913s-.262 1.387-.787 1.912A2.605 2.605 0 0 1 12 14.2Zm0 4.8c-2.433 0-4.65-.68-6.65-2.038-2-1.358-3.45-3.179-4.35-5.462.9-2.283 2.35-4.104 4.35-5.463C7.35 4.679 9.567 4 12 4c2.433 0 4.65.679 6.65 2.037 2 1.359 3.45 3.18 4.35 5.463-.9 2.283-2.35 4.104-4.35 5.462C16.65 18.321 14.433 19 12 19Zm0-2a9.545 9.545 0 0 0 5.188-1.488A9.77 9.77 0 0 0 20.8 11.5a9.777 9.777 0 0 0-3.612-4.013A9.55 9.55 0 0 0 12 6a9.55 9.55 0 0 0-5.188 1.487A9.777 9.777 0 0 0 3.2 11.5a9.77 9.77 0 0 0 3.612 4.012A9.545 9.545 0 0 0 12 17Z"
      fill="#000"
    />
  </svg>
);

SvgEye.displayName = 'SvgEye';

const EyeIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgEye {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

EyeIcon.displayName = 'EyeIcon';
export default EyeIcon;
