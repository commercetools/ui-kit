// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/chain-broken.react.svg

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

const SvgChainBroken = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path
      d="M14.538 11.676 13.263 10.4h1.275c.179 0 .335.06.47.18.134.118.2.267.2.446a.608.608 0 0 1-.2.459.663.663 0 0 1-.47.19Zm3.555 3.555-1.096-1.096c.776-.149 1.413-.506 1.912-1.073.5-.566.75-1.23.75-1.99 0-.894-.299-1.64-.895-2.236-.596-.596-1.342-.894-2.236-.894h-2.795a.651.651 0 0 1-.67-.671.652.652 0 0 1 .67-.671h2.795c1.267 0 2.33.429 3.186 1.286.857.857 1.286 1.919 1.286 3.186 0 .969-.28 1.819-.838 2.55a5 5 0 0 1-2.069 1.61Zm.962 4.763L3.2 4.163A.656.656 0 0 1 3 3.682c0-.186.067-.347.201-.48A.656.656 0 0 1 3.682 3c.186 0 .347.067.48.201l15.854 15.854c.134.134.201.29.201.47a.644.644 0 0 1-.2.469.656.656 0 0 1-.482.201.656.656 0 0 1-.48-.201Zm-8.34-4.517H7.583c-1.267 0-2.33-.429-3.186-1.286-.858-.857-1.286-1.919-1.286-3.186 0-1.103.331-2.057.995-2.862a4.304 4.304 0 0 1 2.538-1.52l1.252 1.252h-.313c-.895 0-1.64.298-2.236.894-.596.596-.895 1.342-.895 2.236 0 .894.299 1.64.895 2.236.596.596 1.341.894 2.236.894h3.13a.651.651 0 0 1 .671.671.652.652 0 0 1-.67.671Zm.983-3.801H9.574a.652.652 0 0 1-.67-.671.652.652 0 0 1 .67-.67h.783l1.341 1.34Z"
      fill="#000"
    />
  </svg>
);

SvgChainBroken.displayName = 'SvgChainBroken';

const ChainBrokenIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgChainBroken
        {...props}
        className={createClass(getIconStyles(props))}
      />
    )}
  </ClassNames>
);

ChainBrokenIcon.displayName = 'ChainBrokenIcon';
export default ChainBrokenIcon;
