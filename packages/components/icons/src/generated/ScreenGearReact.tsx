// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/screen-gear.react.svg

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

const SvgScreenGear = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path d="M5 21c-.55 0-1.021-.196-1.413-.587A1.928 1.928 0 0 1 3 19V5c0-.55.196-1.021.587-1.413A1.928 1.928 0 0 1 5 3h14c.55 0 1.021.196 1.413.587.391.392.587.863.587 1.413v14c0 .55-.196 1.021-.587 1.413A1.928 1.928 0 0 1 19 21H5Zm0-2h14V5H5v14Zm6.4-2h1.2a.432.432 0 0 0 .3-.113.595.595 0 0 0 .175-.287l.225-1.1c.2-.083.388-.17.563-.262a4.42 4.42 0 0 0 .537-.338l1.075.325c.117.033.225.03.325-.012a.559.559 0 0 0 .25-.213l.6-1a.375.375 0 0 0 .05-.325.681.681 0 0 0-.175-.3l-.825-.725c.033-.233.05-.45.05-.65s-.017-.417-.05-.65l.825-.725a.681.681 0 0 0 .175-.3.375.375 0 0 0-.05-.325l-.6-1a.559.559 0 0 0-.25-.213.482.482 0 0 0-.325-.012L14.4 9.1a4.415 4.415 0 0 0-.537-.338A7.272 7.272 0 0 0 13.3 8.5l-.225-1.1a.601.601 0 0 0-.175-.288.434.434 0 0 0-.3-.112h-1.2a.434.434 0 0 0-.3.112.601.601 0 0 0-.175.288L10.7 8.5c-.2.083-.388.17-.563.262A4.42 4.42 0 0 0 9.6 9.1l-1.075-.325a.482.482 0 0 0-.325.012.559.559 0 0 0-.25.213l-.6 1a.375.375 0 0 0-.05.325.681.681 0 0 0 .175.3l.825.725c-.033.233-.05.45-.05.65s.017.417.05.65l-.825.725a.681.681 0 0 0-.175.3.375.375 0 0 0 .05.325l.6 1c.067.1.15.171.25.213.1.041.208.045.325.012L9.6 14.9c.183.133.362.246.537.338.175.091.363.179.563.262l.225 1.1a.595.595 0 0 0 .175.287.432.432 0 0 0 .3.113Zm.6-3c-.55 0-1.02-.196-1.412-.588A1.923 1.923 0 0 1 10 12c0-.55.196-1.021.588-1.413A1.925 1.925 0 0 1 12 10c.55 0 1.021.196 1.413.587.391.392.587.863.587 1.413s-.196 1.02-.587 1.412A1.927 1.927 0 0 1 12 14Zm-7 5V5v14Z" />
  </svg>
);

SvgScreenGear.displayName = 'SvgScreenGear';

const ScreenGearIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgScreenGear {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

ScreenGearIcon.displayName = 'ScreenGearIcon';
export default ScreenGearIcon;
