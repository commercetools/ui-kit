// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/plugin.react.svg

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

const SvgPlugin = (props: SVGProps) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path d="M8.354 20.5H4.846a1.78 1.78 0 0 1-1.304-.542A1.78 1.78 0 0 1 3 18.654v-3.508c.738 0 1.385-.234 1.938-.703.554-.47.831-1.066.831-1.79 0-.722-.277-1.319-.83-1.788A2.908 2.908 0 0 0 3 10.16V6.655c0-.508.18-.942.542-1.304a1.778 1.778 0 0 1 1.304-.542h3.692c0-.646.224-1.193.67-1.639.446-.446.992-.669 1.638-.669.646 0 1.193.223 1.639.67.446.445.669.992.669 1.638h3.692c.508 0 .943.18 1.305.542.36.362.541.796.541 1.304v3.692c.646 0 1.193.223 1.639.67.446.445.669.992.669 1.638 0 .646-.223 1.192-.67 1.638-.445.447-.991.67-1.638.67v3.692c0 .508-.18.942-.541 1.304a1.78 1.78 0 0 1-1.305.542h-3.508c0-.77-.242-1.423-.726-1.962-.485-.538-1.073-.807-1.766-.807-.692 0-1.28.269-1.765.807-.485.539-.727 1.193-.727 1.962Zm-3.508-1.846h1.962c.369-1.015.961-1.73 1.777-2.146.815-.416 1.569-.623 2.261-.623.693 0 1.446.207 2.262.623.815.415 1.407 1.13 1.777 2.146h1.961v-5.539h1.846c.123 0 .231-.046.323-.138a.443.443 0 0 0 0-.646.443.443 0 0 0-.323-.139h-1.846V6.654h-5.538V4.808a.443.443 0 0 0-.139-.323.443.443 0 0 0-.646 0 .443.443 0 0 0-.138.323v1.846H4.846v2.03c.83.308 1.5.824 2.008 1.547s.761 1.53.761 2.423c0 .877-.253 1.677-.761 2.4a4.307 4.307 0 0 1-2.008 1.57v2.03Z" />
  </svg>
);

SvgPlugin.displayName = 'SvgPlugin';

const PluginIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgPlugin {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);

PluginIcon.displayName = 'PluginIcon';
export default PluginIcon;
