// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/import.react.svg
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
  size?: 'small' | 'medium' | 'big' | 'scale' | '10' | '20' | '30' | '40';
};
export type SVGProps = Props & {
  className: string;
};
const iconSizes = {
  small: 12,
  medium: 16,
  big: 24,
  '10': 12,
  '20': 16,
  '30': 20,
  '40': 24,
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
    case '10':
    case '20':
    case '30':
    case '40':
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
const SvgImport = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M12 16.022q-.479 0-.801-.324a1.09 1.09 0 0 1-.324-.801V6.853l-2.11 2.11a1.08 1.08 0 0 1-.787.337q-.45 0-.816-.366a1.05 1.05 0 0 1-.322-.802q.013-.463.322-.773l4.05-4.05a1 1 0 0 1 .366-.24Q11.775 3 12 3t.422.07a1 1 0 0 1 .365.24l4.05 4.05q.338.336.323.8-.013.465-.323.774a1.14 1.14 0 0 1-.8.351q-.465.014-.803-.322l-2.109-2.11v8.044q0 .479-.323.8a1.1 1.1 0 0 1-.802.325m-6.75 4.5q-.928 0-1.588-.66A2.17 2.17 0 0 1 3 18.272v-2.25q0-.478.323-.802.324-.323.802-.323t.802.323q.323.324.323.802v2.25h13.5v-2.25q0-.478.324-.802.323-.323.801-.323t.801.323q.324.324.324.802v2.25a2.17 2.17 0 0 1-.66 1.59q-.662.66-1.59.66z" />
  </svg>
);
SvgImport.displayName = 'SvgImport';
const ImportIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgImport {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
ImportIcon.displayName = 'ImportIcon';
export default ImportIcon;
