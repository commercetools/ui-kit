// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/user-linear.react.svg

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

const SvgUserLinear = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.689 15.91c-.518-.68-.434-1.668.196-2.217l2.462-2.142.304-.265.22.337a8.775 8.775 0 0 0 .986 1.198c.728.735 1.445 1.163 2.065 1.148.244-.006.59-.16 1.002-.446.273-.19.566-.432.869-.713a14.468 14.468 0 0 0 1.167-1.219l.228-.274.272.233 2.276 1.961c.762.656.824 1.812.149 2.552l-.164.191a24.653 24.653 0 0 1-1.952 2.001 14.098 14.098 0 0 1-1.807 1.424c-.52.336-1.008.577-1.462.71-.531.154-1.097.134-1.688-.041-1.042-.31-2.126-1.084-3.218-2.18a18.461 18.461 0 0 1-1.905-2.257Zm3.12-3.839-2.461 2.142c-.352.306-.401.885-.09 1.295l.13.182a17.777 17.777 0 0 0 1.703 1.991c1.019 1.022 2.017 1.735 2.923 2.004.467.138.896.153 1.288.04.38-.112.81-.323 1.278-.625.54-.35 1.118-.81 1.714-1.353a23.969 23.969 0 0 0 2.06-2.136 1.1 1.1 0 0 0-.078-1.578L15 12.073l.5-.042a15.151 15.151 0 0 1-1.228 1.285 8.884 8.884 0 0 1-.946.773c-.514.358-.973.562-1.386.572-.865.02-1.732-.496-2.583-1.356A9.46 9.46 0 0 1 8.284 12l.525.072Zm6.636-4.211c0 2.272-2.013 4.514-3.71 4.514-1.699 0-3.712-2.242-3.712-4.514 0-2.554 1.523-4.514 3.711-4.514 2.188 0 3.711 1.96 3.711 4.514Zm-6.722 0c0 1.906 1.72 3.821 3.011 3.821 1.291 0 3.011-1.915 3.011-3.821 0-2.206-1.256-3.822-3.01-3.822-1.756 0-3.012 1.616-3.012 3.822Z"
      fillRule="nonzero"
    />
  </svg>
);

SvgUserLinear.displayName = 'SvgUserLinear';

const UserLinearIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgUserLinear {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

UserLinearIcon.displayName = 'UserLinearIcon';
export default UserLinearIcon;
