// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/page-gear.react.svg

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

const SvgPageGear = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <defs>
      <path
        d="m12.553 4-.062-.059h-.045l.062.059h.045Zm3.824 6.086H11V4.941H5V19.06h4.779a.97.97 0 1 1 0 1.941h-5.53C3.567 21 3 20.467 3 19.794V4.206C3 3.533 3.566 3 4.25 3h9.032L18 7.441c.24.226.377.537.377.863v2.403a1 1 0 0 1-2 0v-.62Zm-.914-2.328L13.06 5.494v2.264h2.404Zm4.488 9.183.976.742a.223.223 0 0 1 .055.288l-.925 1.558c-.055.099-.176.139-.282.099l-1.152-.45c-.24.175-.5.328-.782.44l-.176 1.193a.224.224 0 0 1-.226.189h-1.85a.224.224 0 0 1-.228-.189l-.175-1.192a3.404 3.404 0 0 1-.782-.442l-1.152.45a.236.236 0 0 1-.282-.098l-.926-1.558a.223.223 0 0 1 .056-.288l.976-.742v-.882l-.976-.743a.218.218 0 0 1-.056-.288l.926-1.556c.055-.1.176-.14.282-.1l1.152.45c.24-.175.5-.328.782-.44l.175-1.193a.224.224 0 0 1 .227-.189h1.85c.116 0 .213.081.227.189l.176 1.193c.282.112.541.26.782.44l1.152-.45a.236.236 0 0 1 .282.1l.925 1.556a.223.223 0 0 1-.055.288l-.976.743v.882Zm-3.438 1.134c.893 0 1.62-.706 1.62-1.575 0-.868-.727-1.575-1.62-1.575-.892 0-1.619.707-1.619 1.575 0 .869.727 1.575 1.62 1.575Z"
        id="page-gear_react_svg__a"
      />
    </defs>
    <use xlinkHref="#page-gear_react_svg__a" fillRule="evenodd" />
  </svg>
);

SvgPageGear.displayName = 'SvgPageGear';

const PageGearIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgPageGear {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

PageGearIcon.displayName = 'PageGearIcon';
export default PageGearIcon;
