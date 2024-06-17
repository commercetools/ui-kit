// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/switcher.react.svg
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
  /**
   * The size of the icon. 'small', 'medium', 'big' have been deprecated in favor of '10', '20', '30', '40'.
   */
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
        width: `${iconSizes['40']}px`,
        height: `${iconSizes['40']}px`,
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
const SvgSwitcher = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M16.76 16.7v-2.82q0-.4.27-.67t.67-.27a.93.93 0 0 1 .669.258.87.87 0 0 1 .27.658v3.784q0 .4-.27.669a.9.9 0 0 1-.67.27H7.22l.776.776a.97.97 0 0 1 .294.682.9.9 0 0 1-.27.681.91.91 0 0 1-.67.282.88.88 0 0 1-.647-.259l-2.444-2.443A.9.9 0 0 1 4 17.64q0-.4.258-.658l2.42-2.42a.92.92 0 0 1 .671-.283q.387 0 .67.282a.92.92 0 0 1 .281.67.91.91 0 0 1-.282.67l-.799.799zm-9.4-9.4v2.82q0 .4-.27.67a.9.9 0 0 1-.67.27.93.93 0 0 1-.67-.258.87.87 0 0 1-.27-.658V6.36q0-.4.27-.67t.67-.27H16.9l-.775-.775a.97.97 0 0 1-.293-.682.89.89 0 0 1 .27-.681.92.92 0 0 1 .67-.282q.387 0 .646.258l2.444 2.444a.9.9 0 0 1 .258.658.9.9 0 0 1-.258.658l-2.42 2.42a.91.91 0 0 1-.67.283.92.92 0 0 1-.67-.282.92.92 0 0 1-.282-.67q0-.388.282-.67L16.9 7.3z" />
  </svg>
);
SvgSwitcher.displayName = 'SvgSwitcher';
const SwitcherIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgSwitcher {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
SwitcherIcon.displayName = 'SwitcherIcon';
export default SwitcherIcon;
