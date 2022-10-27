// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/view-grid-plus.react.svg

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

const SvgViewGridPlus = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M5 11c-.55 0-1.021-.196-1.413-.588A1.925 1.925 0 0 1 3 9V5c0-.55.196-1.021.587-1.413A1.928 1.928 0 0 1 5 3h4c.55 0 1.021.196 1.413.587.391.392.587.863.587 1.413v4c0 .55-.196 1.02-.587 1.412A1.927 1.927 0 0 1 9 11H5Zm0 10c-.55 0-1.021-.196-1.413-.587A1.928 1.928 0 0 1 3 19v-4c0-.55.196-1.021.587-1.413A1.928 1.928 0 0 1 5 13h4c.55 0 1.021.196 1.413.587.391.392.587.863.587 1.413v4c0 .55-.196 1.021-.587 1.413A1.928 1.928 0 0 1 9 21H5Zm10-10c-.55 0-1.02-.196-1.412-.588A1.923 1.923 0 0 1 13 9V5c0-.55.196-1.021.588-1.413A1.925 1.925 0 0 1 15 3h4c.55 0 1.021.196 1.413.587.391.392.587.863.587 1.413v4c0 .55-.196 1.02-.587 1.412A1.927 1.927 0 0 1 19 11h-4Zm0 10c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 0 1 13 19v-4c0-.55.196-1.021.588-1.413A1.925 1.925 0 0 1 15 13h4c.55 0 1.021.196 1.413.587.391.392.587.863.587 1.413v4c0 .55-.196 1.021-.587 1.413A1.928 1.928 0 0 1 19 21h-4ZM5 9h4V5H5v4Zm10 0h4V5h-4v4Zm0 10h4v-4h-4v4ZM5 19h4v-4H5v4Z" />
  </svg>
);

SvgViewGridPlus.displayName = 'SvgViewGridPlus';

const ViewGridPlusIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgViewGridPlus
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);

ViewGridPlusIcon.displayName = 'ViewGridPlusIcon';
export default ViewGridPlusIcon;
