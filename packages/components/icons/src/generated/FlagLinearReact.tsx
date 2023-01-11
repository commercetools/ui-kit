// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/flag-linear.react.svg

/* eslint-disable @typescript-eslint/no-unused-vars */
import { warning } from '@commercetools-uikit/utils';
import { css, ClassNames } from '@emotion/react';
import { designTokens } from '@commercetools-uikit/design-system';
export type Props = {
  color?:
    | 'solid'
    | 'neutral60'
    | 'surface'
    | 'info'
    | 'primary'
    | 'primary40'
    | 'warning'
    | 'error'
    | 'inherit';
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

const getColor = (color: Props['color']) => {
  if (!color) return 'inherit';
  let iconColor;

  switch (color) {
    case 'solid':
      iconColor = designTokens.colorSolid;
      break;

    case 'inherit':
      iconColor = designTokens.colorInherit;
      break;

    case 'neutral60':
      iconColor = designTokens.colorNeutral60;
      break;

    case 'surface':
      iconColor = designTokens.colorSurface;
      break;

    case 'info':
      iconColor = designTokens.colorInfo;
      break;

    case 'primary':
      iconColor = designTokens.colorPrimary;
      break;

    case 'primary40':
      iconColor = designTokens.colorPrimary40;
      break;

    case 'warning':
      iconColor = designTokens.colorWarning;
      break;

    case 'error':
      iconColor = designTokens.colorError;
      break;

    default:
      break;
  }

  if (!iconColor) {
    warning(
      color,
      `ui-kit/Icon: the specified color '${color}' is not supported.`
    );
    return designTokens.colorInherit;
  }

  return iconColor;
};

export const getIconStyles = (props: Props) => css`
  *:not([fill='none']) {
    fill: ${getColor(props.color)};
  }
  &,
  image {
    ${getSizeStyle(props.size)};
  }
  flex-shrink: 0;
`;

const SvgFlagLinear = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path d="M5.059 21c-.3 0-.552-.102-.755-.305A1.024 1.024 0 0 1 4 19.941V4.06c0-.3.101-.552.304-.755C4.507 3.1 4.759 3 5.059 3h7.597c.247 0 .467.08.662.238.194.16.317.362.37.61l.265 1.27h4.87c.3 0 .552.1.754.304.204.203.305.454.305.754v8.471c0 .3-.101.551-.305.754a1.022 1.022 0 0 1-.754.305h-5.479c-.247 0-.467-.08-.662-.238a1.048 1.048 0 0 1-.37-.61l-.265-1.27h-5.93v6.353c0 .3-.1.552-.303.754a1.025 1.025 0 0 1-.755.305Zm9.159-7.412h3.547V7.235h-5.56l-.423-2.117H6.118v6.353h7.676l.424 2.117Z" />
  </svg>
);

SvgFlagLinear.displayName = 'SvgFlagLinear';

const FlagLinearIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgFlagLinear {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

FlagLinearIcon.displayName = 'FlagLinearIcon';
export default FlagLinearIcon;
