// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/warning.react.svg

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

const SvgWarning = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path d="M3.866 19.786a.795.795 0 0 1-.745-.439.857.857 0 0 1 0-.877l8.112-14.032c.16-.292.416-.438.767-.438.35 0 .607.146.767.438L20.88 18.47c.161.293.161.585 0 .877a.795.795 0 0 1-.745.439H3.866ZM12 10.139a.848.848 0 0 0-.624.252.85.85 0 0 0-.253.625v2.63c0 .25.084.457.253.625a.846.846 0 0 0 .624.253.85.85 0 0 0 .625-.253.848.848 0 0 0 .252-.624v-2.631a.851.851 0 0 0-.252-.626.851.851 0 0 0-.625-.251Zm0 7.016a.85.85 0 0 0 .625-.253.848.848 0 0 0 .252-.624.848.848 0 0 0-.252-.625.85.85 0 0 0-.625-.252.846.846 0 0 0-.624.252.846.846 0 0 0-.253.625c0 .248.084.456.253.624a.846.846 0 0 0 .624.253Zm-6.621.877H18.62L12 6.63l-6.621 11.4Z" />
  </svg>
);

SvgWarning.displayName = 'SvgWarning';

const WarningIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgWarning {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

WarningIcon.displayName = 'WarningIcon';
export default WarningIcon;
