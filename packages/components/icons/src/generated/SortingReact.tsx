// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
// This file is created with 'yarn generate-icons'.
// Original SVG file: src/svg/sorting.react.svg
import { warning, createSequentialId } from '@commercetools-uikit/utils';
import { useMemo } from 'react';
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
const SvgSorting = ({ titleId, title, ...props }: SVGProps) => (
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
    <path d="M14 17.804V12c0-.266.09-.49.27-.67.18-.18.404-.27.67-.27s.49.09.67.27c.18.18.27.404.27.67v5.804l1.762-1.762a.92.92 0 0 1 .646-.27.877.877 0 0 1 .67.27.88.88 0 0 1 .294.645.877.877 0 0 1-.27.67l-3.384 3.384a.82.82 0 0 1-.306.2c-.11.04-.227.059-.352.059-.125 0-.243-.02-.352-.06a.82.82 0 0 1-.306-.199l-3.384-3.383a.876.876 0 0 1-.258-.646c0-.259.094-.482.282-.67a.993.993 0 0 1 .658-.27c.25-.008.47.082.658.27L14 17.804ZM8.36 6.196 6.598 7.958c-.204.204-.43.298-.682.282a.951.951 0 0 1-.634-.282.915.915 0 0 1-.282-.67c0-.258.086-.473.258-.646l3.384-3.384a.83.83 0 0 1 .306-.2C9.058 3.02 9.175 3 9.3 3c.126 0 .243.02.353.058a.83.83 0 0 1 .305.2l3.384 3.384a.891.891 0 0 1 .258.658.891.891 0 0 1-.258.658.914.914 0 0 1-.67.282.916.916 0 0 1-.67-.282L10.24 6.196V12c0 .266-.09.49-.27.67a.91.91 0 0 1-.67.27.907.907 0 0 1-.669-.27.907.907 0 0 1-.27-.67V6.196Z" />
  </svg>
);
SvgSorting.displayName = 'SvgSorting';
const titleSequentialId = createSequentialId('sorting-icon-title-');
const SortingIcon = (props: Props) => {
  const svgTitleId = useMemo(() => titleSequentialId(), []);
  return (
    <ClassNames>
      {({ css: createClass }) => (
        <SvgSorting
          {...props}
          titleId={svgTitleId}
          title="Sorting icon"
          className={createClass(getIconStyles(props))}
        />
      )}
    </ClassNames>
  );
};
SortingIcon.displayName = 'SortingIcon';
export default SortingIcon;
