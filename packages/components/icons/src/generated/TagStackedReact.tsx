// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/tag-stacked.react.svg

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

const SvgTagStacked = (props: Props) => <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}><path fillRule="evenodd" d="M17.524 14.792a.07.07 0 01.003.004c.59.644.644 1.36.073 1.915-2.197 2.331-3.448 3.638-3.782 3.95-.488.453-1.072.453-1.644-.007L7 15.633v-5.155l.9.887v1.84l4.847 4.705c.21.168.323.168.48.022.311-.29 1.567-1.601 3.753-3.92.178-.173.186-.31-.14-.63l-.678-.766.596-.668c.15.148.739.787.769.848.59.644.644 1.36.073 1.915l-.076.08zm-.62.656c-1.767 1.872-2.79 2.936-3.086 3.212-.488.454-1.072.454-1.644-.006l-4.273-4.147v.698l4.846 4.705c.21.168.323.168.48.022.311-.29 1.567-1.601 3.753-3.92.165-.161.184-.29-.075-.564zM11.49 3.001l5.852 6.442a.744.744 0 010 1.07l-4.022 4.145a.79.79 0 01-1.099 0L6 8.357V4.01C6 3.452 6.464 3 7.036 3h4.454zM7.028 6.07a.79.79 0 001.098 0 .744.744 0 000-1.071.79.79 0 00-1.098 0 .744.744 0 000 1.07z" /></svg>;

SvgTagStacked.displayName = "SvgTagStacked";

const TagStackedIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgTagStacked {...props} css={getIconStyles(props, theme)} />;
};

TagStackedIcon.displayName = "TagStackedIcon";
export default TagStackedIcon;