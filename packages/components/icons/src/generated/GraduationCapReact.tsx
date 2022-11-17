// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/graduation-cap.react.svg

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

const SvgGraduationCap = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path d="M11.975 20.775c-.133 0-.258-.013-.375-.038a1.22 1.22 0 0 1-.35-.137L5.5 17.45a1.548 1.548 0 0 1-.563-.55 1.465 1.465 0 0 1-.212-.775v-5.1L2.2 9.65a.615.615 0 0 1-.288-.275A.827.827 0 0 1 1.825 9c0-.133.03-.258.087-.375A.615.615 0 0 1 2.2 8.35l9.05-4.95a1.58 1.58 0 0 1 .35-.15c.117-.033.242-.05.375-.05s.258.017.375.05c.117.033.233.083.35.15l9.9 5.375a.86.86 0 0 1 .3.3c.067.117.1.242.1.375v6.725a.729.729 0 0 1-.75.75.729.729 0 0 1-.75-.75v-6.3l-2.275 1.15v5.1c0 .283-.07.542-.213.775-.141.233-.329.417-.562.55L12.7 20.6a1.221 1.221 0 0 1-.35.137 1.788 1.788 0 0 1-.375.038Zm0-7.475L19.85 9l-7.875-4.225L4.15 9l7.825 4.3Zm0 6 5.75-3.175v-4.2l-5.025 2.7a1.225 1.225 0 0 1-.35.137 1.788 1.788 0 0 1-.737 0 1.253 1.253 0 0 1-.338-.137l-5.05-2.75v4.25l5.75 3.175Z" />
  </svg>
);

SvgGraduationCap.displayName = 'SvgGraduationCap';

const GraduationCapIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgGraduationCap
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);

GraduationCapIcon.displayName = 'GraduationCapIcon';
export default GraduationCapIcon;
