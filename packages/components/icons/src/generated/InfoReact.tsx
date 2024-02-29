// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/info.react.svg
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
    | 'error'
    | 'success';
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
    case 'success':
      iconColor = designTokens.colorSuccess;
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
const SvgInfo = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M12 16.5a.87.87 0 0 0 .642-.26.87.87 0 0 0 .258-.64v-3.623a.84.84 0 0 0-.258-.63A.9.9 0 0 0 12 11.1a.87.87 0 0 0-.64.258.87.87 0 0 0-.26.642v3.623q0 .382.26.63a.9.9 0 0 0 .64.247m0-7.2a.87.87 0 0 0 .642-.26.87.87 0 0 0 .258-.64.87.87 0 0 0-.258-.642A.87.87 0 0 0 12 7.5a.87.87 0 0 0-.64.258.87.87 0 0 0-.26.642q0 .383.26.64.257.26.64.26M12 21a8.8 8.8 0 0 1-3.51-.71 9.1 9.1 0 0 1-2.857-1.922 9.1 9.1 0 0 1-1.924-2.858A8.8 8.8 0 0 1 3 12q0-1.867.71-3.51a9.1 9.1 0 0 1 1.923-2.857A9.1 9.1 0 0 1 8.49 3.708 8.8 8.8 0 0 1 12 3q1.867 0 3.51.708a9.1 9.1 0 0 1 2.858 1.925A9.1 9.1 0 0 1 20.29 8.49 8.8 8.8 0 0 1 21 12a8.8 8.8 0 0 1-.71 3.51 9.1 9.1 0 0 1-1.922 2.858 9.1 9.1 0 0 1-2.858 1.923A8.8 8.8 0 0 1 12 21" />
  </svg>
);
SvgInfo.displayName = 'SvgInfo';
const InfoIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgInfo {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
InfoIcon.displayName = 'InfoIcon';
export default InfoIcon;
