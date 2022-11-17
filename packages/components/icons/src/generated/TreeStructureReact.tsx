// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/tree-structure.react.svg

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

const SvgTreeStructure = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path d="M17 21c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 0 1 15 19v-1h-2c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 0 1 11 16V8H9v1c0 .55-.196 1.02-.588 1.412A1.923 1.923 0 0 1 7 11H4c-.55 0-1.02-.196-1.412-.588A1.923 1.923 0 0 1 2 9V5c0-.55.196-1.021.588-1.413A1.925 1.925 0 0 1 4 3h3c.55 0 1.02.196 1.412.587C8.804 3.979 9 4.45 9 5v1h6V5c0-.55.196-1.021.588-1.413A1.925 1.925 0 0 1 17 3h3c.55 0 1.021.196 1.413.587.391.392.587.863.587 1.413v4c0 .55-.196 1.02-.587 1.412A1.927 1.927 0 0 1 20 11h-3c-.55 0-1.02-.196-1.412-.588A1.923 1.923 0 0 1 15 9V8h-2v8h2v-1c0-.55.196-1.021.588-1.413A1.925 1.925 0 0 1 17 13h3c.55 0 1.021.196 1.413.587.391.392.587.863.587 1.413v4c0 .55-.196 1.021-.587 1.413A1.928 1.928 0 0 1 20 21h-3ZM4 5v4-4Zm13 10v4-4Zm0-10v4-4Zm0 4h3V5h-3v4Zm0 10h3v-4h-3v4ZM4 9h3V5H4v4Z" />
  </svg>
);

SvgTreeStructure.displayName = 'SvgTreeStructure';

const TreeStructureIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgTreeStructure
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);

TreeStructureIcon.displayName = 'TreeStructureIcon';
export default TreeStructureIcon;
