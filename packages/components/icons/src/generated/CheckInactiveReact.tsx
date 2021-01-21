// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/check-inactive.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Theme } from '@emotion/react';
import React from 'react';
import invariant from 'tiny-invariant';
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
const defaultProps = {
  color: 'solid',
  size: 'big',
} as const;
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

const SvgCheckInactive = (props: Props) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      id="check-inactive_react_svg__Icons"
      stroke="none"
      strokeWidth={1}
      fillRule="evenodd"
    >
      <g
        id="check-inactive_react_svg__MC-icon-set"
        transform="translate(-24 -360)"
      >
        <g id="check-inactive_react_svg__Notices" transform="translate(24 312)">
          <g
            id="check-inactive_react_svg__Check-Inactive"
            transform="translate(0 48)"
          >
            <path
              d="M12 21a9 9 0 110-18 9 9 0 010 18zm-6-9.495v.99c0 .291.224.505.5.505h11c.271 0 .5-.226.5-.505v-.99a.495.495 0 00-.5-.505h-11c-.271 0-.5.226-.5.505z"
              id="check-inactive_react_svg__shape"
              fill="#000"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

SvgCheckInactive.displayName = 'SvgCheckInactive';

const CheckInactiveIcon = (props: Props = defaultProps) => {
  const theme = useTheme();
  return <SvgCheckInactive {...props} css={getIconStyles(props, theme)} />;
};

CheckInactiveIcon.displayName = 'CheckInactiveIcon';
export default CheckInactiveIcon;
