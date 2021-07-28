// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/subdirectory-arrow.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Theme } from '@emotion/react';
import React from 'react';
import { warning } from '@commercetools-uikit/utils';
import { css, useTheme } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
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

const getColor = (color: Props['color'], theme: Theme) => {
  if (!color) return 'inherit';
  const overwrittenVars = { ...vars, ...theme };
  let iconColor;

  switch (color) {
    case 'solid':
      iconColor = overwrittenVars.colorSolid;
      break;

    case 'neutral60':
      iconColor = overwrittenVars.colorNeutral60;
      break;

    case 'surface':
      iconColor = overwrittenVars.colorSurface;
      break;

    case 'info':
      iconColor = overwrittenVars.colorInfo;
      break;

    case 'primary':
      iconColor = overwrittenVars.colorPrimary;
      break;

    case 'primary40':
      iconColor = overwrittenVars.colorPrimary40;
      break;

    case 'warning':
      iconColor = overwrittenVars.colorWarning;
      break;

    case 'error':
      iconColor = overwrittenVars.colorError;
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

export const getIconStyles = (props: Props, theme: Theme) => css`
  *:not([fill='none']) {
    fill: ${getColor(props.color, theme)};
  }
  &,
  image {
    ${getSizeStyle(props.size)};
  }
  flex-shrink: 0;
`;

const SvgSubdirectoryArrow = (props: Props) => (
  <svg
    width={11}
    height={18}
    viewBox="0 0 11 18"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <defs>
      <path
        d="M16.404 17v-1.625c0-.102.04-.19.118-.264a.394.394 0 01.28-.111c.107 0 .2.037.279.111l2.78 2.625a.351.351 0 010 .527l-2.78 2.626a.393.393 0 01-.28.111.393.393 0 01-.279-.111.35.35 0 01-.118-.264V19H10a1 1 0 01-1-1V4a1 1 0 112 0v13h5.404z"
        id="subdirectory-arrow_react_svg__path-1"
      />
    </defs>
    <g
      id="subdirectory-arrow_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="subdirectory-arrow_react_svg__Component-/-icon-/-12px-/-suplink--"
        transform="translate(-9 -3)"
      >
        <g id="subdirectory-arrow_react_svg__Component-/-icon-/-24px-/-suplink">
          <mask id="subdirectory-arrow_react_svg__mask-2" fill="#fff">
            <use xlinkHref="#subdirectory-arrow_react_svg__path-1" />
          </mask>
          <use
            id="subdirectory-arrow_react_svg__Mask"
            fill="#1A1A1A"
            xlinkHref="#subdirectory-arrow_react_svg__path-1"
          />
        </g>
      </g>
    </g>
  </svg>
);

SvgSubdirectoryArrow.displayName = 'SvgSubdirectoryArrow';

const SubdirectoryArrowIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgSubdirectoryArrow {...props} css={getIconStyles(props, theme)} />;
};

SubdirectoryArrowIcon.displayName = 'SubdirectoryArrowIcon';
export default SubdirectoryArrowIcon;
