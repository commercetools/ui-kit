// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/rich-text-body/icons/svg/unordered-list.react.svg

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

const SvgUnorderedList = (props: SVGProps) => (
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
        d="M5.625 17a.36.36 0 0 1 .264.111c.055.056.09.12.104.19l.007.074v2.25a.36.36 0 0 1-.111.264.363.363 0 0 1-.19.104L5.625 20h-2.25a.36.36 0 0 1-.264-.111.364.364 0 0 1-.104-.19L3 19.625v-2.25a.36.36 0 0 1 .111-.264.366.366 0 0 1 .19-.104L3.375 17h2.25Zm15.125 1a.39.39 0 0 1 .176.037.145.145 0 0 1 .066.056l.008.032v.75c0 .034-.025.063-.074.088a.35.35 0 0 1-.111.033L20.75 19h-10.5a.389.389 0 0 1-.176-.037.144.144 0 0 1-.066-.056L10 18.875v-.75c0-.034.025-.063.074-.088a.352.352 0 0 1 .111-.033L10.25 18h10.5ZM5.625 10a.36.36 0 0 1 .264.111c.055.056.09.12.104.19l.007.074v2.25a.36.36 0 0 1-.111.264.365.365 0 0 1-.19.104L5.625 13h-2.25a.361.361 0 0 1-.264-.111.364.364 0 0 1-.104-.19L3 12.625v-2.25a.36.36 0 0 1 .111-.264.364.364 0 0 1 .19-.104L3.375 10h2.25Zm15.125 1a.39.39 0 0 1 .176.037c.05.025.074.054.074.088v.75c0 .034-.025.063-.074.088a.39.39 0 0 1-.176.037h-10.5a.39.39 0 0 1-.176-.037c-.05-.025-.074-.054-.074-.088v-.75c0-.034.025-.063.074-.088A.389.389 0 0 1 10.25 11ZM5.625 4c.102 0 .19.037.264.111.055.056.09.12.104.19L6 4.375v2.25a.36.36 0 0 1-.111.264.363.363 0 0 1-.19.104L5.625 7h-2.25a.36.36 0 0 1-.264-.111.364.364 0 0 1-.104-.19L3 6.625v-2.25a.36.36 0 0 1 .111-.264.364.364 0 0 1 .19-.104L3.375 4h2.25Zm4.625 1h10.5a.39.39 0 0 1 .176.037.145.145 0 0 1 .066.056l.008.032v.75c0 .034-.025.063-.074.088a.35.35 0 0 1-.111.033L20.75 6h-10.5a.388.388 0 0 1-.176-.037.145.145 0 0 1-.066-.056L10 5.875v-.75c0-.034.025-.063.074-.088a.35.35 0 0 1 .111-.033L10.25 5h10.5Z"
        id="unordered-list_react_svg__a"
      />
    </defs>
    <use
      fill="#1A1A1A"
      xlinkHref="#unordered-list_react_svg__a"
      fillRule="evenodd"
    />
  </svg>
);

SvgUnorderedList.displayName = 'SvgUnorderedList';

const UnorderedListIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgUnorderedList
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);

UnorderedListIcon.displayName = 'UnorderedListIcon';
export default UnorderedListIcon;
