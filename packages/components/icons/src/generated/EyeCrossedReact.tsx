// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/eye-crossed.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Theme } from '@emotion/react';
import { warning } from '@commercetools-uikit/utils';
import { css, ClassNames, useTheme } from '@emotion/react';
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

const SvgEyeCrossed = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.6 6.487 13.776 8.37a3.327 3.327 0 0 0-1.254-.244c-1.895 0-3.432 1.587-3.432 3.544 0 .458.084.894.237 1.296L8.295 14.03a5.068 5.068 0 0 1-.577-2.36c0-1.421.578-2.703 1.505-3.608a9.877 9.877 0 0 0-1.728.886l-.121.078c-.126.084-.249.17-.367.256-.712.52-1.256 1.072-1.609 1.556-.08.11-.146.211-.202.305a2.441 2.441 0 0 0-.155.302.846.846 0 0 0-.068.224l.003.02a1.272 1.272 0 0 0 .066.205c.066.16.18.365.356.607.353.484.897 1.035 1.609 1.556.242.177.499.347.77.509l-1 1.033C4.833 14.355 3.6 12.72 3.6 11.67 3.6 9.78 7.595 6 12.522 6c1.082 0 2.119.182 3.078.487Zm-4.776 8.542c.389.158.812.245 1.254.245 1.895 0 3.432-1.587 3.432-3.544a3.64 3.64 0 0 0-.237-1.296l1.032-1.065c.368.702.577 1.506.577 2.36 0 1.421-.578 2.703-1.505 3.608a9.967 9.967 0 0 0 2.216-1.22c.712-.52 1.256-1.072 1.609-1.556.115-.159.204-.302.27-.427a2.393 2.393 0 0 0 .087-.18.848.848 0 0 0 .068-.224.391.391 0 0 0-.012-.061 1.184 1.184 0 0 0-.056-.164 3.123 3.123 0 0 0-.357-.607c-.353-.484-.897-1.035-1.609-1.556a9.785 9.785 0 0 0-.77-.509l1-1.033C19.767 9.045 21 10.68 21 11.73c0 1.89-3.994 5.67-8.922 5.67A10.18 10.18 0 0 1 9 16.913l1.824-1.884ZM19.59 3.242a.826.826 0 1 1 1.168 1.168L4.41 20.758a.826.826 0 0 1-1.168-1.168L19.59 3.242Z"
      fill="#1A1A1A"
      fillRule="evenodd"
    />
  </svg>
);

SvgEyeCrossed.displayName = 'SvgEyeCrossed';

const EyeCrossedIcon = (props: Props) => {
  const theme = useTheme();
  return (
    <ClassNames>
      {({ css: createClass }) => (
        <SvgEyeCrossed
          {...props}
          className={createClass(getIconStyles(props, theme))}
        />
      )}
    </ClassNames>
  );
};

EyeCrossedIcon.displayName = 'EyeCrossedIcon';
export default EyeCrossedIcon;
