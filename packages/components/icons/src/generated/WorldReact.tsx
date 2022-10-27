// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/world.react.svg

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

const getColor = (color: Props['color']) => {
  if (!color) return 'inherit';
  let iconColor;

  switch (color) {
    case 'solid':
      iconColor = designTokens.colorSolid;
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
    return 'inherit';
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

const SvgWorld = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 22a9.671 9.671 0 0 1-3.875-.788 10.126 10.126 0 0 1-3.187-2.15 10.125 10.125 0 0 1-2.15-3.187A9.67 9.67 0 0 1 2 12a9.64 9.64 0 0 1 .788-3.887 10.164 10.164 0 0 1 2.15-3.175 10.14 10.14 0 0 1 3.187-2.151A9.681 9.681 0 0 1 12 2a9.65 9.65 0 0 1 3.887.787 10.178 10.178 0 0 1 3.175 2.151 10.164 10.164 0 0 1 2.15 3.175A9.64 9.64 0 0 1 22 12a9.671 9.671 0 0 1-.788 3.875 10.125 10.125 0 0 1-2.15 3.187 10.164 10.164 0 0 1-3.175 2.15A9.64 9.64 0 0 1 12 22Zm0-2.05c.433-.6.808-1.225 1.125-1.875.317-.65.575-1.342.775-2.075h-3.8c.2.733.458 1.425.775 2.075.317.65.692 1.275 1.125 1.875Zm-2.6-.4c-.3-.55-.562-1.121-.787-1.713A14.607 14.607 0 0 1 8.05 16H5.1a8.304 8.304 0 0 0 1.812 2.175A7.2 7.2 0 0 0 9.4 19.55Zm5.2 0a7.19 7.19 0 0 0 2.487-1.375A8.295 8.295 0 0 0 18.9 16h-2.95c-.15.633-.337 1.246-.562 1.837a13.89 13.89 0 0 1-.788 1.713ZM4.25 14h3.4a13.365 13.365 0 0 1-.15-2 13.365 13.365 0 0 1 .15-2h-3.4A8.012 8.012 0 0 0 4 12a8.012 8.012 0 0 0 .25 2Zm5.4 0h4.7a13.35 13.35 0 0 0 .15-2 13.35 13.35 0 0 0-.15-2h-4.7a13.584 13.584 0 0 0-.15 2 13.018 13.018 0 0 0 .15 2Zm6.7 0h3.4a8.018 8.018 0 0 0 .25-2 8.018 8.018 0 0 0-.25-2h-3.4a13.6 13.6 0 0 1 .15 2 13.033 13.033 0 0 1-.15 2Zm-.4-6h2.95a8.294 8.294 0 0 0-1.813-2.175A7.19 7.19 0 0 0 14.6 4.45c.3.55.563 1.12.788 1.712.225.592.412 1.205.562 1.838ZM10.1 8h3.8c-.2-.733-.458-1.425-.775-2.075A12.701 12.701 0 0 0 12 4.05c-.433.6-.808 1.225-1.125 1.875-.317.65-.575 1.342-.775 2.075Zm-5 0h2.95c.15-.633.338-1.246.563-1.838C8.838 5.571 9.1 5 9.4 4.45a7.2 7.2 0 0 0-2.488 1.375A8.303 8.303 0 0 0 5.1 8Z" />
  </svg>
);

SvgWorld.displayName = 'SvgWorld';

const WorldIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgWorld {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

WorldIcon.displayName = 'WorldIcon';
export default WorldIcon;
