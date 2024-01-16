// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/arrows.react.svg
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
const SvgArrows = (props: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    {...props}
  >
    <path d="M12 10.12a.9.9 0 0 1-.67-.27.9.9 0 0 1-.27-.67V6.22l-1.034 1.033a.91.91 0 0 1-.67.282.92.92 0 0 1-.67-.282.92.92 0 0 1-.281-.67q0-.387.282-.67l2.655-2.655a.8.8 0 0 1 .306-.2Q11.813 3 12 3q.188 0 .352.058a.8.8 0 0 1 .306.2l2.679 2.68a.88.88 0 0 1 .27.669.96.96 0 0 1-.294.67.93.93 0 0 1-.681.282.93.93 0 0 1-.682-.282l-1.01-1.058V9.18q0 .4-.27.67a.9.9 0 0 1-.67.27M12 21q-.188 0-.352-.06a.8.8 0 0 1-.306-.199l-2.679-2.678a.87.87 0 0 1-.27-.67.96.96 0 0 1 .294-.67.99.99 0 0 1 .693-.294.8.8 0 0 1 .67.294l1.01 1.058V14.82q0-.4.27-.67t.67-.27q.4 0 .67.27t.27.67v2.96l1.034-1.057a.85.85 0 0 1 .658-.282q.399 0 .681.282a.93.93 0 0 1 .282.682.93.93 0 0 1-.282.681l-2.655 2.656a.8.8 0 0 1-.306.199Q12.188 21 12 21m4.723-5.687a.99.99 0 0 1-.294-.693.8.8 0 0 1 .294-.67l1.058-1.01H14.82a.9.9 0 0 1-.67-.27.9.9 0 0 1-.27-.67q0-.4.27-.67t.67-.27h2.96l-1.057-1.034a.85.85 0 0 1-.282-.658q0-.399.282-.681a.93.93 0 0 1 .682-.282q.399 0 .681.282l2.656 2.655a.8.8 0 0 1 .2.306Q21 11.813 21 12q0 .188-.058.352a.8.8 0 0 1-.2.306l-2.68 2.679a.87.87 0 0 1-.669.27.96.96 0 0 1-.67-.294m-10.81 0-2.655-2.655a.8.8 0 0 1-.199-.306Q3 12.188 3 12q0-.188.06-.352a.8.8 0 0 1 .198-.306l2.68-2.679a.88.88 0 0 1 .646-.258q.387 0 .67.282a.9.9 0 0 1 .27.681.97.97 0 0 1-.294.682l-1.01 1.01h2.96q.4 0 .67.27t.27.67-.27.67a.9.9 0 0 1-.67.27H6.22l1.057 1.034a.85.85 0 0 1 .282.658.93.93 0 0 1-.282.681.93.93 0 0 1-.682.282.93.93 0 0 1-.681-.282" />
  </svg>
);
SvgArrows.displayName = 'SvgArrows';
const ArrowsIcon = (props: Props) => (
  <ClassNames>
    {({ css: createClass }) => (
      <SvgArrows {...props} className={createClass(getIconStyles(props))} />
    )}
  </ClassNames>
);
ArrowsIcon.displayName = 'ArrowsIcon';
export default ArrowsIcon;
