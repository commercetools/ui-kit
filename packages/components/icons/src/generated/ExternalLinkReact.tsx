// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/external-link.react.svg

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

const SvgExternalLink = (props: Props) => <svg width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}><g id="external-link_react_svg__Component-/-icon-/-24px-/-external-window" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><path d="M17.822 4.788l-6.534 6.533a.984.984 0 001.391 1.391l6.532-6.53v2.184a.895.895 0 001.789 0V3.893A.89.89 0 0020.106 3h-4.473a.895.895 0 000 1.788h2.19zM21 9.522v9.235C21 19.996 20.107 21 19.005 21H4.995C3.893 21 3 19.994 3 18.757V7.243C3 6.004 3.893 5 4.995 5H10.2a.9.9 0 110 1.8H5.313c-.287 0-.513.269-.513.6v11.2c0 .325.23.6.513.6h13.374c.287 0 .513-.269.513-.6v-4.8a.9.9 0 111.8 0V9.522z" id="external-link_react_svg__Shape" fill="#1A1A1A" /></g></svg>;

SvgExternalLink.displayName = "SvgExternalLink";

const ExternalLinkIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgExternalLink {...props} css={getIconStyles(props, theme)} />;
};

ExternalLinkIcon.displayName = "ExternalLinkIcon";
export default ExternalLinkIcon;