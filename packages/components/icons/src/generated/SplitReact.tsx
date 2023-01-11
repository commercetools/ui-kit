// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/split.react.svg

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
    | 'inherit';
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

    case 'inherit':
      iconColor = designTokens.colorInherit;
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
    return designTokens.colorInherit;
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

const SvgSplit = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path d="M3 11.885c0-.26.088-.479.265-.655a.888.888 0 0 1 .655-.264h3.678c.858 0 1.494-.13 1.908-.391.414-.26.82-.606 1.218-1.035l1.31 1.31c-.168.184-.348.36-.54.53-.191.168-.394.336-.609.505.291.215.548.433.77.656.223.222.44.447.655.677a10.474 10.474 0 0 0 1.862 1.587c.705.475 1.94.728 3.702.758l-.805-.804a.857.857 0 0 1-.253-.632c0-.253.084-.472.253-.656a.896.896 0 0 1 .656-.276c.252 0 .47.092.654.276l2.368 2.368a.811.811 0 0 1 .196.299c.038.107.057.222.057.345 0 .122-.019.237-.057.345a.81.81 0 0 1-.196.298l-2.39 2.391a.9.9 0 0 1-.632.265.858.858 0 0 1-.656-.265.872.872 0 0 1-.253-.643c0-.261.084-.476.253-.644l.805-.828c-2.192-.03-3.751-.367-4.678-1.011-.928-.644-1.683-1.288-2.265-1.931a8.67 8.67 0 0 0-1.298-1.196c-.422-.306-1.1-.46-2.035-.46H3.92a.89.89 0 0 1-.655-.263.89.89 0 0 1-.265-.656Zm12.713-5.333a7.637 7.637 0 0 1 1.011-.127 49.78 49.78 0 0 1 1.15-.057l-.828-.828a.858.858 0 0 1-.253-.632c0-.253.092-.471.276-.655A.872.872 0 0 1 17.713 4c.26 0 .475.084.643.253l2.391 2.39a.811.811 0 0 1 .196.3c.038.107.057.222.057.344 0 .123-.019.238-.057.345a.811.811 0 0 1-.196.299l-2.39 2.39a.844.844 0 0 1-.644.266.927.927 0 0 1-.897-.932c0-.245.084-.46.253-.644l.782-.804c-.322 0-.625.015-.909.046-.283.03-.547.061-.793.092l-.436-1.793Zm-4.046 1.977a8.088 8.088 0 0 1 1.126-.885c.43-.284.958-.533 1.586-.747l.437 1.77a4.859 4.859 0 0 0-1.839 1.172l-1.31-1.31Z" />
  </svg>
);

SvgSplit.displayName = 'SvgSplit';

const SplitIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgSplit {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

SplitIcon.displayName = 'SplitIcon';
export default SplitIcon;
