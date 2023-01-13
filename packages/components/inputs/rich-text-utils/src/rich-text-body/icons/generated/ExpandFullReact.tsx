// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/rich-text-body/icons/svg/expand-full.react.svg
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
const SvgExpandFull = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m14.902 13.93.086.074 4.62 4.62v-2.967a.696.696 0 0 1 1.386-.095l.006.095v4.647a.696.696 0 0 1-.601.69l-.095.006h-4.647a.696.696 0 0 1-.095-1.386l.095-.006h2.967l-4.62-4.62a.696.696 0 0 1 .898-1.058Zm-4.906.074c.245.244.27.626.074.898l-.074.086-4.62 4.62h2.967a.696.696 0 0 1 .095 1.386L8.343 21H3.696a.696.696 0 0 1-.69-.601L3 20.304v-4.647a.696.696 0 0 1 1.386-.095l.006.095v2.967l4.62-4.62a.696.696 0 0 1 .984 0ZM8.448 3a.71.71 0 0 1 .096 1.413l-.096.006H5.422l4.57 4.57a.71.71 0 0 1-.915 1.078l-.088-.075-4.57-4.57v3.026a.71.71 0 0 1-1.413.097L3 8.449v-4.74a.71.71 0 0 1 .613-.703L3.71 3h4.738ZM20.29 3a.71.71 0 0 1 .71.71v4.738a.71.71 0 1 1-1.42 0V5.423l-4.569 4.57a.708.708 0 0 1-1.003 0 .71.71 0 0 1 0-1.004l4.57-4.57h-3.026a.71.71 0 1 1 0-1.419Z"
      fill="#1A1A1A"
      fillRule="evenodd"
    />
  </svg>
);
SvgExpandFull.displayName = 'SvgExpandFull';
const ExpandFullIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgExpandFull {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
ExpandFullIcon.displayName = 'ExpandFullIcon';
export default ExpandFullIcon;
