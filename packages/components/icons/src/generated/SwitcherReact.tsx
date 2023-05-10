// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/switcher.react.svg
import { useMemo } from 'react';
import { createSequentialId } from '@commercetools-uikit/utils';
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
  titleId: string;
  title?: string;
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
const SvgSwitcher = ({ titleId, title, ...props }: SVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    role="img"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M16.76 16.7v-2.82c0-.266.09-.49.27-.67.18-.18.403-.27.67-.27a.93.93 0 0 1 .669.258.87.87 0 0 1 .27.658v3.784c0 .266-.09.49-.27.669a.907.907 0 0 1-.67.27H7.22l.776.776a.973.973 0 0 1 .294.682.89.89 0 0 1-.27.681.914.914 0 0 1-.67.282.877.877 0 0 1-.647-.259l-2.444-2.443A.891.891 0 0 1 4 17.64c0-.267.086-.486.258-.658l2.42-2.42a.915.915 0 0 1 .671-.283c.258 0 .481.094.67.282a.915.915 0 0 1 .281.67.914.914 0 0 1-.282.67l-.799.799h9.54Zm-9.4-9.4v2.82c0 .266-.09.49-.27.67a.91.91 0 0 1-.67.27.933.933 0 0 1-.67-.258.872.872 0 0 1-.27-.658V6.36c0-.266.09-.49.27-.67.18-.18.404-.27.67-.27H16.9l-.775-.775a.97.97 0 0 1-.293-.682.887.887 0 0 1 .27-.681.915.915 0 0 1 .67-.282c.258 0 .473.086.646.258l2.444 2.444a.891.891 0 0 1 .258.658.891.891 0 0 1-.258.658l-2.42 2.42a.914.914 0 0 1-.67.283.916.916 0 0 1-.67-.282.915.915 0 0 1-.282-.67c0-.259.094-.482.282-.67L16.9 7.3H7.36Z" />
  </svg>
);
SvgSwitcher.displayName = 'SvgSwitcher';
const titleSequentialId = createSequentialId('switcher-icon-title-');
const SwitcherIcon = (props: Props) => {
  const svgTitleId = useMemo(() => titleSequentialId(), []);
  return (
    <ClassNames>
      {({ css: createClass }) => (
        <SvgSwitcher
          {...props}
          titleId={svgTitleId}
          title="Switcher icon"
          className={createClass(getIconStyles(props))}
        />
      )}
    </ClassNames>
  );
};
SwitcherIcon.displayName = 'SwitcherIcon';
export default SwitcherIcon;
