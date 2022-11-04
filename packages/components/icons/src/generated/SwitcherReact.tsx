// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/switcher.react.svg

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

const SvgSwitcher = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17 17v-3c0-.283.096-.521.288-.713A.967.967 0 0 1 18 13a.99.99 0 0 1 .712.275.926.926 0 0 1 .288.7V18c0 .283-.096.52-.288.712A.965.965 0 0 1 18 19H6.85l.825.825c.2.2.304.442.313.725a.947.947 0 0 1-.288.725c-.2.2-.437.3-.712.3A.933.933 0 0 1 6.3 21.3l-2.6-2.6a.948.948 0 0 1-.275-.7c0-.283.092-.517.275-.7l2.575-2.575c.2-.2.438-.3.713-.3.275 0 .512.1.712.3.2.2.3.438.3.713 0 .275-.1.512-.3.712l-.85.85H17ZM7 7v3c0 .283-.096.52-.287.712A.968.968 0 0 1 6 11a.992.992 0 0 1-.713-.275.927.927 0 0 1-.287-.7V6a.97.97 0 0 1 .287-.713A.97.97 0 0 1 6 5h11.15l-.825-.825c-.2-.2-.304-.442-.312-.725a.944.944 0 0 1 .287-.725c.2-.2.438-.3.713-.3.275 0 .504.092.687.275l2.6 2.6a.948.948 0 0 1 .275.7.948.948 0 0 1-.275.7l-2.575 2.575c-.2.2-.437.3-.712.3a.974.974 0 0 1-.713-.3c-.2-.2-.3-.438-.3-.713 0-.275.1-.512.3-.712l.85-.85H7Z"
      fill="#000"
    />
  </svg>
);

SvgSwitcher.displayName = 'SvgSwitcher';

const SwitcherIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgSwitcher {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

SwitcherIcon.displayName = 'SwitcherIcon';
export default SwitcherIcon;
