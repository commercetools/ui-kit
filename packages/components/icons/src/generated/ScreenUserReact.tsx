// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/screen-user.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Theme } from '@emotion/react';
import React from 'react';
import { warning } from '@commercetools-uikit/utils';
import { css, useTheme } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
type Props = {
  color?: 'solid' | 'neutral60' | 'surface' | 'info' | 'primary' | 'primary40' | 'warning' | 'error';
  size?: 'small' | 'medium' | 'big' | 'scale';
};
const iconSizes = ({
  small: 12,
  medium: 16,
  big: 24
} as const);

const getSizeStyle = (size: Props['size']) => {
  switch (size) {
    case 'scale':
      return `
        &:not(:root) {
          width: 100%;
          height: auto;
        }
      `;

    case 'small':
    case 'medium':
    case 'big':
      return `
        width: ${iconSizes[size]}px;
        height: ${iconSizes[size]}px;
      `;

    default:
      return `
        width: ${iconSizes.big}px;
        height: ${iconSizes.big}px;
      `;
  }
};

const capitalize = (value: string) => value[0].toUpperCase() + value.slice(1);

const getColor = (color: Props['color'], theme: Theme) => {
  if (!color) return 'inherit';
  const overwrittenVars = { ...vars,
    ...theme
  }; // @ts-expect-error

  const iconColor = overwrittenVars[`color${capitalize(color)}`];

  if (!iconColor) {
    warning(color, `ui-kit/Icon: the specified color '${color}' is not supported.`);
    return 'inherit';
  }

  return iconColor;
};

const getIconStyles = (props: Props, theme: Theme) => css`
  * {
    fill: ${getColor(props.color, theme)};
  }
  ${getSizeStyle(props.size)};
  flex-shrink: 0;
`;

const SvgScreenUser = (props: Props) => <svg width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}><g id="screen-user_react_svg__Icons" stroke="none" strokeWidth={1} fillRule="evenodd"><g id="screen-user_react_svg__MC-icon-set" transform="translate(-96 -552)" fill="#000"><g id="screen-user_react_svg__Views" transform="translate(24 552)"><g id="screen-user_react_svg__Screen-User" transform="translate(72)"><path d="M16.5 6.6H5.7v-.9h10.8v.9zM3.9 14.7h2.7v.9H3.9a.9.9 0 01-.9-.9V3.9a.9.9 0 01.9-.9h14.4a.9.9 0 01.9.9v3.6h-.9V3.9H3.9v10.8zm5.4-6.3H5.7v-.9h3.6v.9zm4.95-.9a3.37 3.37 0 013.375 3.375 3.37 3.37 0 01-3.375 3.375 3.37 3.37 0 01-3.375-3.375A3.37 3.37 0 0114.25 7.5zM21 21H7.5v-1.125c0-2.25 4.5-3.488 6.75-3.488S21 17.625 21 19.875V21z" id="screen-user_react_svg__shape" /></g></g></g></g></svg>;

SvgScreenUser.displayName = "SvgScreenUser";

const ScreenUserIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgScreenUser {...props} css={getIconStyles(props, theme)} />;
};

ScreenUserIcon.displayName = "ScreenUserIcon";
export default ScreenUserIcon;