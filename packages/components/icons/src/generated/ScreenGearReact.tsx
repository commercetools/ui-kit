// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/screen-gear.react.svg

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

const SvgScreenGear = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.51 5.661H5.701v-.9h10.807v.9ZM3.9 14.708h2.702v.9H3.901a.9.9 0 0 1-.901-.9V3.901A.9.9 0 0 1 3.9 3h14.41a.9.9 0 0 1 .901.9v3.603h-.9V3.901H3.9v10.807Zm15.519.2 1.465 1.114a.335.335 0 0 1 .083.432l-1.389 2.337c-.083.149-.263.21-.423.149l-1.73-.676c-.36.264-.75.493-1.173.662l-.264 1.79a.336.336 0 0 1-.34.284H12.87a.336.336 0 0 1-.34-.284l-.264-1.79a5.11 5.11 0 0 1-1.173-.662l-1.73.676a.354.354 0 0 1-.423-.149l-1.389-2.337a.335.335 0 0 1 .084-.432L9.1 14.907v-1.324L7.635 12.47a.327.327 0 0 1-.084-.432l1.39-2.338a.343.343 0 0 1 .423-.148l1.729.675c.36-.263.75-.493 1.173-.662l.264-1.79a.336.336 0 0 1 .34-.283h2.778c.174 0 .32.121.34.283l.264 1.79a5.11 5.11 0 0 1 1.174.662l1.729-.675c.153-.054.34 0 .423.148l1.39 2.338a.335.335 0 0 1-.084.432l-1.465 1.114v1.324ZM9.304 7.462H5.702v-.901h3.602v.9Zm4.955 9.146c1.34 0 2.43-1.06 2.43-2.364 0-1.303-1.09-2.364-2.43-2.364s-2.43 1.06-2.43 2.364c0 1.304 1.09 2.364 2.43 2.364Z"
      fillRule="evenodd"
    />
  </svg>
);

SvgScreenGear.displayName = 'SvgScreenGear';

const ScreenGearIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgScreenGear {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

ScreenGearIcon.displayName = 'ScreenGearIcon';
export default ScreenGearIcon;
