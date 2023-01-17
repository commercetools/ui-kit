// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/flame.react.svg

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

const SvgFlame = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path d="M4 13.613c0 1.613.416 3.07 1.248 4.368a8.009 8.009 0 0 0 3.286 2.943 4.91 4.91 0 0 1-.904-1.478 4.649 4.649 0 0 1-.319-1.707c0-.645.12-1.252.357-1.82a4.59 4.59 0 0 1 1.07-1.542l3.413-3.363 3.44 3.363c.458.458.806.972 1.044 1.541.237.569.356 1.176.356 1.821a4.65 4.65 0 0 1-.318 1.707 4.911 4.911 0 0 1-.904 1.478 8.009 8.009 0 0 0 3.286-2.943c.832-1.299 1.248-2.755 1.248-4.368a8.168 8.168 0 0 0-.956-3.872 8.102 8.102 0 0 0-2.636-2.955.52.52 0 0 0-.484-.064c-.17.06-.323.166-.458.319a2.029 2.029 0 0 1-.7.573 1.934 1.934 0 0 1-.854.19 2.015 2.015 0 0 1-1.465-.585 1.95 1.95 0 0 1-.599-1.452V3.933c0-.357-.148-.624-.445-.802-.298-.179-.59-.174-.88.012-2.122 1.308-3.79 2.887-5.005 4.738C4.607 9.732 4 11.643 4 13.613Zm8.151-.459-2.343 2.293a3.013 3.013 0 0 0-.726 1.044c-.161.39-.242.807-.242 1.248 0 .9.323 1.669.968 2.306S11.234 21 12.15 21s1.699-.318 2.344-.955a3.121 3.121 0 0 0 .968-2.306c0-.441-.085-.857-.255-1.248a3.36 3.36 0 0 0-.713-1.044l-2.344-2.293Z" />
  </svg>
);

SvgFlame.displayName = 'SvgFlame';

const FlameIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgFlame {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

FlameIcon.displayName = 'FlameIcon';
export default FlameIcon;
