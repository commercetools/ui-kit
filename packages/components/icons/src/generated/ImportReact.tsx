// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/import.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Theme } from '@emotion/react';
import React from 'react';
import invariant from 'tiny-invariant';
import { css, useTheme } from '@emotion/react';
import { customProperties as vars } from '@commercetools-uikit/design-system';
type Props = {
  color:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error';
  size: 'small' | 'medium' | 'big' | 'scale';
};
const defaultProps: Pick<Props, 'color' | 'size'> = {
  color: 'solid',
  size: 'big',
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
    invariant(
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

const SvgImport = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="import_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="import_react_svg__MC-icon-set"
        transform="translate(-240 -216)"
        fill="#000"
      >
        <g id="import_react_svg__Menu" transform="translate(24 168)">
          <g id="import_react_svg__Import" transform="translate(216 48)">
            <path
              d="M3.329 19.855h17.015V3.58H3.33v16.275zM4.5 4.835h14.719V18.6H4.5V4.835zM15.516 17.2h-7.36v-4.057h7.36v4.057zM12.094 6.38c-.141-.194-.375-.194-.516 0L9.562 8.458h1.266v3.719h1.969v-3.72h1.312l-2.015-2.076z"
              id="import_react_svg__shape"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgImport.displayName = 'SvgImport';

const ImportIcon = (props: Props) => {
  const theme = useTheme();
  return <SvgImport {...props} css={getIconStyles(props, theme)} />;
};

ImportIcon.displayName = 'ImportIcon';
ImportIcon.defaultProps = defaultProps;
export default ImportIcon;
