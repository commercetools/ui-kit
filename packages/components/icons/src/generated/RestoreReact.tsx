// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/restore.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import { warning } from '@commercetools-uikit/utils';
import { css, ClassNames } from '@emotion/react';
import { customProperties } from '@commercetools-uikit/design-system';
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
      iconColor = customProperties.colorSolid;
      break;

    case 'neutral60':
      iconColor = customProperties.colorNeutral60;
      break;

    case 'surface':
      iconColor = customProperties.colorSurface;
      break;

    case 'info':
      iconColor = customProperties.colorInfo;
      break;

    case 'primary':
      iconColor = customProperties.colorPrimary;
      break;

    case 'primary40':
      iconColor = customProperties.colorPrimary40;
      break;

    case 'warning':
      iconColor = customProperties.colorWarning;
      break;

    case 'error':
      iconColor = customProperties.colorError;
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

const SvgRestore = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M17.42 8.314a.777.777 0 0 1 1.305-.843 8.545 8.545 0 1 1-5.88-3.81.777.777 0 0 1-.235 1.535 6.991 6.991 0 1 0 4.81 3.118Zm-6.976-.676a.777.777 0 0 1 1.553-.019l.063 5.111a.777.777 0 1 1-1.554.02l-.062-5.112Zm4.278 6.133a.777.777 0 1 1-.757 1.356l-3.06-1.709a.777.777 0 1 1 .757-1.356l3.06 1.709Zm1.845-3.443a.332.332 0 0 1-.184-.173.332.332 0 0 1-.014-.253l1.015-3.06a.296.296 0 0 1 .403-.188l2.996 1.19a.331.331 0 0 1 .184.173.332.332 0 0 1 .015.253.296.296 0 0 1-.16.184l-4.011 1.87a.296.296 0 0 1-.244.004Z" />
  </svg>
);

SvgRestore.displayName = 'SvgRestore';

const RestoreIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgRestore {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

RestoreIcon.displayName = 'RestoreIcon';
export default RestoreIcon;
