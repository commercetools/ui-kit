// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/angle-up-down.react.svg

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

const SvgAngleUpDown = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M8.05 8.15a.748.748 0 0 1-.225-.55c0-.217.075-.4.225-.55l3.425-3.425a.76.76 0 0 1 .25-.175.734.734 0 0 1 .537 0c.092.033.18.092.263.175L15.95 7.05c.15.15.225.333.225.55 0 .217-.075.4-.225.55a.748.748 0 0 1-.55.225.748.748 0 0 1-.55-.225L12 5.3 9.15 8.15a.748.748 0 0 1-.55.225.748.748 0 0 1-.55-.225ZM12 20.7a.724.724 0 0 1-.525-.225L8.05 17.05a.748.748 0 0 1-.225-.55c0-.217.075-.4.225-.55a.748.748 0 0 1 .55-.225c.217 0 .4.075.55.225L12 18.8l2.85-2.85a.748.748 0 0 1 .55-.225c.217 0 .4.075.55.225.15.15.225.333.225.55 0 .217-.075.4-.225.55l-3.425 3.425a.763.763 0 0 1-.25.175.735.735 0 0 1-.275.05Z" />
  </svg>
);

SvgAngleUpDown.displayName = 'SvgAngleUpDown';

const AngleUpDownIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgAngleUpDown
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);

AngleUpDownIcon.displayName = 'AngleUpDownIcon';
export default AngleUpDownIcon;
