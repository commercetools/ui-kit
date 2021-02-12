// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/mail.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Theme } from '@emotion/react';
import React from 'react';
import { warning } from '@commercetools-uikit/utils';
import { css, useTheme } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
type Props = {
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
  const overwrittenVars = { ...vars, ...theme }; // @ts-expect-error

  const iconColor = overwrittenVars[`color${capitalize(color)}`];

  if (!iconColor) {
    warning(
      color,
      `ui-kit/Icon: the specified color '${color}' is not supported.`
    );
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

const SvgMail = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="mail_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="mail_react_svg__MC-icon-set"
        transform="translate(-96 -232)"
        fill="#000"
        fillRule="nonzero"
      >
        <g id="mail_react_svg__CRUD" transform="translate(24 152)">
          <path
            d="M12 13.312L3 6h18l-9 7.312zm-2.244-1.046L3 6.926V17.41l6.756-5.144zm2.398 1.752c-.112.092-.194.093-.308 0l-1.599-1.335-7.221 5.653h17.948l-7.221-5.653-1.599 1.335zm2.112-1.73l6.757-5.34v10.485l-6.757-5.145z"
            transform="translate(72 80)"
            id="mail_react_svg__Mail"
          />
        </g>
      </g>
    </g>
  </svg>
);

SvgMail.displayName = 'SvgMail';

const MailIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgMail {...props} css={getIconStyles(props, theme)} />;
};

MailIcon.displayName = 'MailIcon';
export default MailIcon;
