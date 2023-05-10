// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/camera.react.svg
import { useMemo } from 'react';
import { createSequentialId } from '@commercetools-uikit/utils';
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
  titleId: string;
  title?: string;
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
const SvgCamera = ({ titleId, title, ...props }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M12 16.915c1.08 0 1.988-.367 2.723-1.102.734-.736 1.102-1.65 1.102-2.745 0-1.08-.367-1.984-1.102-2.712C13.986 9.63 13.08 9.265 12 9.265c-1.095 0-2.006.364-2.734 1.091-.727.728-1.091 1.632-1.091 2.712 0 1.095.364 2.01 1.091 2.745.728.734 1.639 1.102 2.734 1.102ZM4.35 20.2c-.36 0-.675-.135-.945-.405A1.295 1.295 0 0 1 3 18.85V7.307c0-.345.135-.656.405-.933.27-.278.585-.417.945-.417h3.308l1.237-1.484c.12-.165.27-.285.45-.36.18-.076.375-.113.585-.113h4.14c.21 0 .405.037.585.112.18.075.33.196.45.36l1.238 1.485h3.307c.345 0 .656.14.934.417.277.277.416.589.416.934V18.85c0 .36-.139.675-.416.945-.278.27-.589.405-.934.405H4.35Zm15.3-1.35V7.307H4.35V18.85h15.3Z" />
  </svg>
);
SvgCamera.displayName = 'SvgCamera';
const titleSequentialId = createSequentialId('camera-icon-title-');
const CameraIcon = (props: Props) => {
  const svgTitleId = useMemo(() => titleSequentialId(), []);
  return (
    <ClassNames>
      {({ css: createClass }) => (
        <SvgCamera
          {...props}
          titleId={svgTitleId}
          title="Camera icon"
          className={createClass(getIconStyles(props))}
        />
      )}
    </ClassNames>
  );
};
CameraIcon.displayName = 'CameraIcon';
export default CameraIcon;
