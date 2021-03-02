// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/graduation-cap.react.svg

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

const SvgGraduationCap = (props: Props) => <svg width={24} height={24} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}><g id="graduation-cap_react_svg__Component-/-icon-/-24px-/-GraduationCap" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd"><path d="M15.872 17.068L12 19l-3.872-1.932c-.772-.445-1.065-1.24-1.087-2.146-.092-.57 0-2.18 0-2.922L12 14.906 16.96 12c0 .742.091 2.352-.001 2.922-.021.905-.315 1.7-1.087 2.146zM12 4l9 4.802-1.375.734v4.093a.702.702 0 01.515.672c0 .386-.32.699-.714.699a.707.707 0 01-.714-.7c0-.318.217-.586.515-.67V9.747c-2.41 1.285-4.82 2.568-7.227 3.857C9.003 12 6 10.403 3 8.802L12 4z" id="graduation-cap_react_svg__learn" fill="#1A1A1A" /></g></svg>;

SvgGraduationCap.displayName = "SvgGraduationCap";

const GraduationCapIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgGraduationCap {...props} css={getIconStyles(props, theme)} />;
};

GraduationCapIcon.displayName = "GraduationCapIcon";
export default GraduationCapIcon;