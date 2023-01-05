// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/arrows.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import { warning } from '@commercetools-uikit/utils';
import { css, ClassNames } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
export type Props = {
  color?:
    | 'solid'
    | 'neutral40'
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

    case 'neutral40':
      iconColor = designTokens.colorNeutral40;
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

const SvgArrows = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path d="M12 10.12a.907.907 0 0 1-.67-.27.907.907 0 0 1-.27-.67V6.22l-1.034 1.033a.914.914 0 0 1-.67.282.915.915 0 0 1-.67-.282.915.915 0 0 1-.281-.67c0-.258.094-.481.282-.67l2.655-2.655a.83.83 0 0 1 .306-.2C11.758 3.02 11.875 3 12 3c.125 0 .243.02.352.058a.83.83 0 0 1 .306.2l2.679 2.68a.876.876 0 0 1 .27.669.96.96 0 0 1-.294.67.928.928 0 0 1-.681.282.928.928 0 0 1-.682-.282l-1.01-1.058V9.18c0 .266-.09.49-.27.67a.91.91 0 0 1-.67.27ZM12 21c-.125 0-.243-.02-.352-.06a.82.82 0 0 1-.306-.199l-2.679-2.678a.874.874 0 0 1-.27-.67.956.956 0 0 1 .294-.67.987.987 0 0 1 .693-.294.805.805 0 0 1 .67.294l1.01 1.058V14.82c0-.267.09-.49.27-.67.18-.18.404-.27.67-.27s.49.09.67.27c.18.18.27.403.27.67v2.96l1.034-1.057a.853.853 0 0 1 .658-.282c.266 0 .493.094.681.282a.929.929 0 0 1 .282.682.929.929 0 0 1-.282.681l-2.655 2.655a.82.82 0 0 1-.306.2c-.11.04-.227.059-.352.059Zm4.723-5.687a.987.987 0 0 1-.294-.693.805.805 0 0 1 .294-.67l1.058-1.01H14.82a.907.907 0 0 1-.67-.27.907.907 0 0 1-.27-.67c0-.266.09-.49.27-.67.18-.18.403-.27.67-.27h2.96l-1.057-1.034a.853.853 0 0 1-.282-.658c0-.266.094-.493.282-.681a.929.929 0 0 1 .682-.282c.266 0 .493.094.681.282l2.655 2.655a.83.83 0 0 1 .2.306c.04.11.059.227.059.352 0 .125-.02.243-.058.352a.83.83 0 0 1-.2.306l-2.68 2.679a.873.873 0 0 1-.669.27.957.957 0 0 1-.67-.294Zm-10.81 0-2.655-2.655a.82.82 0 0 1-.199-.306C3.02 12.242 3 12.125 3 12c0-.125.02-.243.06-.352a.82.82 0 0 1 .198-.306l2.68-2.679a.877.877 0 0 1 .646-.258c.258 0 .481.094.67.282a.89.89 0 0 1 .27.681.973.973 0 0 1-.294.682l-1.01 1.01h2.96c.266 0 .49.09.67.27.18.18.27.404.27.67s-.09.49-.27.67a.91.91 0 0 1-.67.27H6.22l1.057 1.034a.853.853 0 0 1 .282.658.928.928 0 0 1-.282.681.928.928 0 0 1-.682.282.928.928 0 0 1-.681-.282Z" />
  </svg>
);

SvgArrows.displayName = 'SvgArrows';

const ArrowsIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgArrows {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

ArrowsIcon.displayName = 'ArrowsIcon';
export default ArrowsIcon;
