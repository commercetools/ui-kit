// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/paper-bill-inverted.react.svg

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

const SvgPaperBillInverted = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path d="M6 22a2.893 2.893 0 0 1-2.125-.875A2.893 2.893 0 0 1 3 19v-2c0-.283.096-.52.288-.712A.965.965 0 0 1 4 16h2V2.725c0-.15.067-.242.2-.275.133-.033.267.017.4.15l.9.9 1.15-1.15a.48.48 0 0 1 .7 0L10.5 3.5l1.15-1.15a.48.48 0 0 1 .7 0L13.5 3.5l1.15-1.15a.48.48 0 0 1 .7 0L16.5 3.5l1.15-1.15a.48.48 0 0 1 .7 0L19.5 3.5l.9-.9c.133-.133.267-.188.4-.163.133.025.2.121.2.288V19c0 .833-.292 1.542-.875 2.125A2.893 2.893 0 0 1 18 22H6Zm12-2c.283 0 .52-.096.712-.288A.965.965 0 0 0 19 19V5H8v11h8c.283 0 .52.096.712.288A.965.965 0 0 1 17 17v2c0 .283.096.52.288.712A.965.965 0 0 0 18 20ZM9.975 9a.926.926 0 0 1-.7-.288A.99.99 0 0 1 9 8c0-.283.096-.521.288-.713A.967.967 0 0 1 10 7h4a.97.97 0 0 1 .713.287A.97.97 0 0 1 15 8c0 .283-.096.52-.287.712A.968.968 0 0 1 14 9H9.975Zm0 3a.926.926 0 0 1-.7-.288A.99.99 0 0 1 9 11c0-.283.096-.521.288-.713A.967.967 0 0 1 10 10h4a.97.97 0 0 1 .713.287A.97.97 0 0 1 15 11c0 .283-.096.52-.287.712A.968.968 0 0 1 14 12H9.975ZM17 9a.965.965 0 0 1-.712-.288A.965.965 0 0 1 16 8c0-.283.096-.521.288-.713A.967.967 0 0 1 17 7c.283 0 .52.096.712.287.192.192.288.43.288.713s-.096.52-.288.712A.965.965 0 0 1 17 9Zm0 3a.965.965 0 0 1-.712-.288A.965.965 0 0 1 16 11c0-.283.096-.521.288-.713A.967.967 0 0 1 17 10c.283 0 .52.096.712.287.192.192.288.43.288.713s-.096.52-.288.712A.965.965 0 0 1 17 12ZM6 20h9v-2H5v1c0 .283.096.52.287.712.192.192.43.288.713.288Zm-1 0v-2 2Z" />
  </svg>
);

SvgPaperBillInverted.displayName = 'SvgPaperBillInverted';

const PaperBillInvertedIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgPaperBillInverted
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);

PaperBillInvertedIcon.displayName = 'PaperBillInvertedIcon';
export default PaperBillInvertedIcon;
