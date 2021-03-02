// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/information.react.svg

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

const SvgInformation = (props: Props) => <svg width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}><g id="information_react_svg__Icons" stroke="none" strokeWidth={1} fillRule="evenodd"><g id="information_react_svg__MC-icon-set" transform="translate(-168 -360)" fill="#000"><g id="information_react_svg__Notices" transform="translate(24 312)"><g id="information_react_svg__Information" transform="translate(144 48)"><path d="M11.856 4.773a1.932 1.932 0 110 3.863 1.932 1.932 0 010-3.863zm3.112 14.81H9.173a.966.966 0 110-1.932h.966v-5.795h-.966a.966.966 0 110-1.932h3.864c.533 0 .966.433.966.966v6.761h.965a.966.966 0 010 1.932z" id="information_react_svg__shape" /></g></g></g></g></svg>;

SvgInformation.displayName = "SvgInformation";

const InformationIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgInformation {...props} css={getIconStyles(props, theme)} />;
};

InformationIcon.displayName = "InformationIcon";
export default InformationIcon;