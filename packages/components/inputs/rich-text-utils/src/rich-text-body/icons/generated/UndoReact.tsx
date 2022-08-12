// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/rich-text-body/icons/svg/undo.react.svg

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

const SvgUndo = (props: SVGProps) => (
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
        d="M12.458 7.41a8.524 8.524 0 0 0-6.7 3.246L3.796 8.693c-.437-.438-.795-.29-.795.33v7.335c0 .618.024.593.643.593h7.286c.619 0 .767-.358.33-.795l-2.243-2.243a6.283 6.283 0 0 1 5.697-3.64 6.283 6.283 0 0 1 6.277 6.085 8.542 8.542 0 0 0-8.531-8.948Z"
        id="undo_react_svg__a"
      />
    </defs>
    <use fill="#1A1A1A" xlinkHref="#undo_react_svg__a" fillRule="evenodd" />
  </svg>
);

SvgUndo.displayName = 'SvgUndo';

const UndoIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgUndo {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

UndoIcon.displayName = 'UndoIcon';
export default UndoIcon;
