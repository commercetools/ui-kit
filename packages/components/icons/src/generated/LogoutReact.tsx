// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/logout.react.svg

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

const SvgLogout = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.763 18.105c-1.358.878-2.953 1.398-4.65 1.398-2.886 0-5.567-1.495-6.993-3.835-1.46-2.373-1.46-5.298-.034-7.703 1.46-2.34 4.107-3.835 6.992-3.835 1.596 0 3.123.455 4.413 1.268l-.883 1.3a7.005 7.005 0 0 0-3.53-.975c-2.308 0-4.48 1.138-5.6 3.055a5.882 5.882 0 0 0 0 6.143c1.12 1.917 3.292 3.055 5.6 3.055 1.358 0 2.614-.39 3.7-1.105l.985 1.234Zm4.616-6.24-3.7-3.478v1.95h-5.906v3.055h5.906v1.983l3.7-3.51Z"
      fillRule="evenodd"
    />
  </svg>
);

SvgLogout.displayName = 'SvgLogout';

const LogoutIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgLogout {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

LogoutIcon.displayName = 'LogoutIcon';
export default LogoutIcon;
