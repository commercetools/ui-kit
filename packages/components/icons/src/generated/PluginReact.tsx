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
    | 'error'
    | 'success';
  size?: 'small' | 'medium' | 'big' | 'scale' | '10' | '20' | '30' | '40';
};
export type SVGProps = Props & {
  className: string;
};
const iconSizes = {
  small: 12,
  medium: 16,
  big: 24,
  '10': 12,
  '20': 16,
  '30': 20,
  '40': 24,
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
    case '10':
    case '20':
    case '30':
    case '40':
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
    case 'success':
      iconColor = designTokens.colorSuccess;
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
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M8.354 20.5H4.846a1.78 1.78 0 0 1-1.304-.542A1.78 1.78 0 0 1 3 18.654v-3.508q1.108 0 1.938-.703.831-.705.831-1.79t-.83-1.788A2.9 2.9 0 0 0 3 10.162V6.654q0-.761.542-1.304a1.78 1.78 0 0 1 1.304-.542h3.692q0-.97.67-1.639.669-.669 1.638-.669.97 0 1.639.67.669.668.669 1.638h3.692q.762 0 1.305.542.54.543.541 1.304v3.692q.97 0 1.639.67.669.668.669 1.638t-.67 1.638q-.668.67-1.638.67v3.692q0 .762-.541 1.304a1.78 1.78 0 0 1-1.305.542h-3.508q0-1.154-.726-1.962-.727-.807-1.766-.807-1.038 0-1.765.807-.727.809-.727 1.962m-3.508-1.846h1.962q.553-1.522 1.777-2.146t2.261-.623q1.039 0 2.262.623 1.222.622 1.777 2.146h1.961v-5.539h1.846q.185 0 .323-.138a.443.443 0 0 0 0-.646.44.44 0 0 0-.323-.139h-1.846V6.654h-5.538V4.808a.44.44 0 0 0-.139-.323.443.443 0 0 0-.646 0 .44.44 0 0 0-.138.323v1.846H4.846v2.03q1.245.462 2.008 1.547.761 1.084.761 2.423 0 1.316-.761 2.4a4.3 4.3 0 0 1-2.008 1.57z" />
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
